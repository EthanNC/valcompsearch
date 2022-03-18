import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from "../../lib/constants";
import { prisma } from "../../lib/prisma";
// import { matches } from ".prisma/client";

//TODO: Check for duplicates in search
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query.q;
  const cleanQuery = query.toString().replace(/\s/g, "&");
  const excludeQuery = query.toString().replace(/\s/g, "|!");

  const limit = 10;
  const cursor = req.query.cursor ?? "";
  const cursorObj =
    cursor === "" ? undefined : { id: parseInt(cursor as string) };

  const teams = await prisma.matches.findMany({
    where: {
        OR: [
          {
            results_0: { search: cleanQuery },
            results_1: { search: "!" + excludeQuery}
          },
          {
            results_1: { search: cleanQuery },
            results_0: { search: "!" + excludeQuery}
          },
        ],

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
