import {
  Button,
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
  Navbar,
  NativeSelect,
} from "@mantine/core";
import { matches } from ".prisma/client";
import { useInfiniteQuery, useQueryClient } from "react-query";
import Router, { useRouter } from "next/router";
import dayjs from "dayjs";
import AgentGroup from "../components/AgentGroup";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect, useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import Seo from "../components/Seo";

function Results() {
  const router = useRouter();
  const searchedTeam = router.query.team;
  const formatTeam = searchedTeam?.toString().replace(/\s/g, "::");
  const searchArray = formatTeam?.split("::");

  const queryOrder = router.query.order
  const [searchOrder, setSearchOrder] = useState(queryOrder);

  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const order = searchOrder !== "Oldest" ? "" : "desc";

  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["matches", searchedTeam, searchOrder || queryOrder],
    async ({ pageParam = "" }) => {

      const formatQuery = searchedTeam?.toString().replace(/\s/g, "+");
      const results = await fetch(
        `/api/search?q=${formatQuery}&cursor=${pageParam}&order=${order}`
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

  useEffect(() => {
    
    queryClient.resetQueries("matches", { exact: true, },  );
  }, [queryClient, searchOrder]);

  if (isLoading) {
    return <Container>Loading...</Container>;
  }
  if (isError) return <div>Error! {JSON.stringify(error)}</div>;

  return (
    <Container>
      <Seo templateTitle="Search Results"/>
      <Navbar height={150} fixed px="xl">
        <Navbar.Section
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            leftIcon={<ArrowIcon />}
            onClick={() => router.push("/")}
            size="xl"
            variant="subtle"
          >
            {" "}
            Back{" "}
          </Button>
          <NativeSelect
            value={searchOrder}
            data={["Newest", "Oldest"]}
            onChange={(event) => setSearchOrder(event.currentTarget.value)}
          />
        </Navbar.Section>
        <AgentGroup agents={searchArray as string[]} size="lg" />
      </Navbar>
      <Space h="xl" />
      <h1>
        <Center> MATCHING </Center>
        <Space h="md" />
      </h1>
      <div style={{ margin: "auto" }}>
        <SimpleGrid
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
          cols={3}
        >
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
                        <Tooltip
                          wrapLines
                          width={220}
                          withArrow
                          transition="fade"
                          transitionDuration={200}
                          label={match.title}
                        >
                          <Title order={3}>{match.title}</Title>
                        </Tooltip>

                        <Space h="md" />

                        {
                          <Group
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              flexWrap: "nowrap",
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
