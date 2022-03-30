import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

//TODO: Check for duplicates in search
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json(new Error("Method not allowed"));
    return;
  }
  if (typeof req.query.q !== "string" || !req.query.q) {
    res.status(400).json({ err: "Invalid query" });
    return;
  }

  const query = req.query.q;

  const cleanQuery = query.toString().replace(/\s/g, "&");
  const excludeQuery = query.toString().replace(/\s/g, "|!");

  const limit = 10;
  const cursor = req.query.cursor ?? "";
  const cursorObj =
    cursor === "" ? undefined : { id: parseInt(cursor as string) };

  const order = req.query.order === "desc" ? "desc" : "";

  const map = req.query.map ?? undefined;
  const mapQuery = map && map !== "all" ? map.toString() : undefined;

  const teams = await prisma.matches.findMany({
    where: {
      AND: [
        { title: { search: mapQuery } },
        {
          OR: [
            {
              results_0: { search: cleanQuery },
              results_1: { search: "!" + excludeQuery },
            },
            {
              results_1: { search: cleanQuery },
              results_0: { search: "!" + excludeQuery },
            },
          ],
        },
      ],
    },
    orderBy: {
      timestamp: order !== "" ? "asc" : "desc",
    },
    skip: cursor !== "" ? 1 : 0,
    cursor: cursorObj,
    take: limit,
  });

  res.json({
    teams,
    nextId: teams.length === limit ? teams[limit - 1].id : undefined,
  });
}
