import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { matches } from ".prisma/client";

// GET /api/search?q=sova+cypher+astra
//TODO: Check for duplicates in search
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<matches[]>
) {
  const query = req.query;
  const cleanQuery = query.q.toString().replace(/\s/g, "&");

    const team1 = await prisma.matches.findMany({
      where: {
        results_0: {
          search: cleanQuery,
        },
      },
    });
    const team2 = await prisma.matches.findMany({
      where: {
        results_1: {
          search: cleanQuery,
        },
      },

    });

    //if i want to remove remove dulicates
    const teams = [...new Set([...team1, ...team2])];


//   const teams = await prisma.matches.findMany({
//     where: {
//       OR: [
//         {
//           results_0: { search: cleanQuery },
//         },
//         {
//           results_1: { search: cleanQuery },
//         },
//       ],
//     },
//   });

  res.json(teams as matches[]);
}
