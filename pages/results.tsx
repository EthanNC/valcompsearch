import {
  Card,
  Title,
  Container,
  Group,
  SimpleGrid,
  Text,
  Divider,
  Space,
  Center,
  Tooltip,
} from "@mantine/core";
import { matches } from ".prisma/client";
import { useInfiniteQuery } from "react-query";
import Router, { useRouter } from "next/router";
import dayjs from "dayjs";
import AgentGroup from "../components/AgentGroup";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";

// interface QueryKeyType {
//   Data: Data[]
//   pageParam: string;
// }

// const getMoreMatches = async ({ pageParam=''}: QueryKeyType) => {

//   const searchedTeam = Router.query.team;
//   const formatQuery = searchedTeam?.toString().replace(/\s/g, "+");
//   const results = await fetch(`/api/search?q=${formatQuery}&cursor=${pageParam}`).then((resp) => resp.json())
//   return results
// }

// const getMatches = (query: string, cursor = ""): Promise<Data> => {
//   const formatQuery = query?.toString().replace(/\s/g, "+");
//   return fetch(`/api/search?q=${formatQuery}&cursor=${cursor}`).then((resp) => resp.json());
// }
function Results() {
  const router = useRouter();
  const searchedTeam = router.query.team;
  const formatTeam = searchedTeam?.toString().replace(/\s/g, "::");
  const searchArray = formatTeam?.split("::");

  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "matches",
    async ({ pageParam = "" }) => {
      const searchedTeam = Router.query.team;
      const formatQuery = searchedTeam?.toString().replace(/\s/g, "+");
      const results = await fetch(
        `/api/search?q=${formatQuery}&cursor=${pageParam}`
      ).then((resp) => resp.json());
      return results;
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("fetching next page");
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError) return <div>Error! {JSON.stringify(error)}</div>;

  return (
    <Container>
      <h1>
        <Center>  MATCHING </Center>
        <Space h="md"/>
        <AgentGroup agents={searchArray as string[]} size="lg" />
      </h1>
      <div style={{ width: 1000, margin: "auto" }}>
        <SimpleGrid cols={3}>
          {data &&
            data.pages.map((page) => {
              return (
                <Fragment key={page.nextId ?? "lastPage"}>
                  {page.teams?.map((match: matches) => (
                    <Card
                      shadow="sm"
                      p="xl"
                      component="a"
                      href={match.url}
                      target="_blank"
                      key={match.id}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <Tooltip
                            wrapLines
                            width={220}
                            withArrow
                            transition="fade"
                            transitionDuration={200}
                            label={match.title}
                          >
                            <Title
                              style={{
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                              }}
                              order={3}
                            >
                              {match.title}
                            </Title>
                          </Tooltip>
                        </div>
                        <Space h="md" />

                        {
                          <Group
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {
                              <AgentGroup
                                agentsMatch={searchArray}
                                agents={match.results_1
                                  .replace(/::/g, " ")
                                  .replace(/:/g, "")
                                  .split(" ")}
                              />
                            }
                            <Title> VS </Title>
                            <AgentGroup
                              agentsMatch={searchArray}
                              agents={match.results_0
                                .replace(/::/g, " ")
                                .replace(/:/g, "")
                                .split(" ")}
                            />
                          </Group>
                        }
                        <Space h="md" />
                        <Divider />
                        <Text size="xs">
                          {dayjs(match.timestamp.toString()).format(
                            "	dddd, MMMM D, YYYY h:mm A"
                          )}
                        </Text>
                      </div>
                    </Card>
                  ))}
                </Fragment>
              );
            })}

          {isFetchingNextPage ? (
            <div className="loading">Loading...</div>
          ) : null}
        </SimpleGrid>
        <span style={{ visibility: "hidden" }} ref={ref}>
          intersection observer marker
        </span>
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
