import { Card, Container, Group, List, Text } from "@mantine/core";
import { matches } from ".prisma/client";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import dayjs from "dayjs";

// type Match = {
//   id: number
//   timestamp: string
//   title: string
//   url: string
//   results_0: string
//   results_1: string
// }

const getMatches = (query: string): Promise<matches[]> =>
  fetch(`/api/search?q=${query}`).then((resp) =>
    resp.json()
  );

function Results() {
  const router = useRouter();
  const searchedTeam = router.query.team;
  const formatTeam = searchedTeam?.toString().replace(/\s/g, "::");
  const { data: results, isLoading } = useQuery("matches", () =>
    getMatches(searchedTeam as string)
  );

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <h1>Matches for {formatTeam}</h1>
      <div style={{ width: 600, margin: "auto" }}>
        {results?.map((match: matches, id: number) => (
          <Card
            shadow="sm"
            p="xl"
            component="a"
            href={match.url}
            target="_blank"
            key={id}
          >
            <Card.Section>{match.title}</Card.Section>
            <Group>
              <Text size="md">{match.results_0}</Text>
              <Text size="md">{match.results_1}</Text>
            </Group>
            <Card.Section>
              {dayjs(match.timestamp.toString()).format(
                "	dddd, MMMM D, YYYY h:mm A"
              )}
            </Card.Section>
          </Card>
        ))}
      </div>
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch(
//     `http://localhost:3000/api/search?q=${context?.query?.team}`
//   );
//   const matches = await res.json();

//   // will receive `matches` as a prop at build time
//   return {
//     props: {
//       matches,
//     },
//   };
// };

export default Results;
