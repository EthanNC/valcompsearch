import {
  Title,
  Text,
  Anchor,
  TransferListItemComponent,
  TransferListItemComponentProps,
  Avatar,
  Group,
  Checkbox,
  TransferListData,
  TransferList,
  Container,
  Button,
  Space,
  Box,
  InputWrapper,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIsFetching, useQueryClient } from 'react-query'

const initialValues: TransferListData = [
  [
    {
      value: "astra",
      label: "Astra",
      image: "/assets/astra.png",
      group: "Controller",
    },
    {
      value: "brimstone",
      label: "Brimstone",
      image: "/assets/brimstone.png",
      group: "Controller",
    },
    {
      value: "omen",
      label: "Omen",
      image: "/assets/omen.png",
      group: "Controller",
    },
    {
      value: "viper",
      label: "Viper",
      image: "/assets/viper.png",
      group: "Controller",
    },

    {
      value: "jett",
      label: "Jett",
      image: "/assets/jett.png",
      group: "Duelist",
    },
    {
      value: "phoenix",
      label: "Phoenix",
      image: "/assets/phoenix.png",
      group: "Duelist",
    },
    {
      value: "neon",
      label: "Neon",
      image: "/assets/neon.png",
      group: "Duelist",
    },
    {
      value: "raze",
      label: "Raze",
      image: "/assets/raze.png",
      group: "Duelist",
    },
    {
      value: "reyna",
      label: "Reyna",
      image: "/assets/reyna.png",
      group: "Duelist",
    },
    {
      value: "yoru",
      label: "Yoru",
      image: "/assets/yoru.png",
      group: "Duelist",
    },

    {
      value: "breach",
      label: "Breach",
      image: "/assets/breach.png",
      group: "Initiator",
    },
    {
      value: "kayo",
      label: "Kay/o",
      image: "/assets/kayo.png",
      group: "Initiator",
    },
    {
      value: "sova",
      label: "Sova",
      image: "/assets/sova.png",
      group: "Initiator",
    },
    {
      value: "skye",
      label: "Skye",
      image: "/assets/skye.png",
      group: "Initiator",
    },

    {
      value: "chamber",
      label: "Chamber",
      image: "/assets/chamber.png",
      group: "Sentinel",
    },
    {
      value: "cypher",
      label: "Cypher",
      image: "/assets/cypher.png",
      group: "Sentinel",
    },
    {
      value: "killjoy",
      label: "Killjoy",
      image: "/assets/killjoy.png",
      group: "Sentinel",
    },
    {
      value: "sage",
      label: "Sage",
      image: "/assets/sage.png",
      group: "Sentinel",
    },
  ],
  [],
];

const ItemComponent: TransferListItemComponent = ({
  data,
  selected,
}: TransferListItemComponentProps) => (
  <Group noWrap>
    <Avatar src={data.image} radius="xl" size="lg" />
    <div style={{ flex: 1 }}>
      <Text size="sm" weight={1000}>
        {data.label}
      </Text>
      <Text size="xs" color="dimmed" weight={400}>
        {data.description}
      </Text>
    </div>
    <Checkbox
      checked={selected}
      onChange={() => {}}
      tabIndex={-1}
      sx={{ pointerEvents: "none" }}
    />
  </Group>
);
interface SearchForm {
  agents: Array<string>;
}

interface Agent {
  value: string;
  image: string;
  label: string;
  group: string;
}
export default function HomePage() {
  const [data, setData] = useState<TransferListData>(initialValues);
  const router = useRouter();
  const isFetchingMatches = useIsFetching(['matches'])
  const queryClient = useQueryClient()

  const form = useForm<SearchForm>({
    initialValues: {
      agents: [""],
    },
  });

  const updateList = (values: TransferListData) => {
    setData(values);
    form.setValues({ agents: values[1].map((a) => a.value) });
  };

  const onSubmit = async ({ agents }: SearchForm) => {
    if (agents.length < 3 || agents.length > 5) return 1;
    queryClient.resetQueries("matches", {exact: true})
    router.push(`/results?team=${agents.join('+')}`);
  };

  return (
    <>
      <Title
        sx={{ fontSize: 100, fontWeight: 900, letterSpacing: -2 }}
        align="center"
        mt={100}
      >
        <Text
          inherit
          variant="gradient"
          component="span"
          sx={{ textTransform: "uppercase" }}
        >
          Valorant
        </Text>{" "}
        Composition Search
      </Title>
      <Text
        color="dimmed"
        align="center"
        size="lg"
        mx="auto"
        mt="xl"
      >
         Select a team of agents and search 
        <Anchor href="https://rib.gg" size="lg">
          {" "}Rib.gg{" "}
        </Anchor>
        for professional Valorant matches.
      </Text>
      <Space h="md" />

      {data[1].length > 0 && (
        //
        <Box sx={{ maxWidth: 400 }} mx="auto">
          <form onSubmit={form.onSubmit((v) => onSubmit(v))}>
            <InputWrapper
              id="agents"
              label="Agents"
              error={
                (form.values.agents.length > 5 &&
                  "Too many agents slected. Max 5") ||
                (form.values.agents.length < 3 &&
                  "Not enough agents selected . Min 3")
              }
            >
              <Group position="center" spacing="lg">
                {data[1].map((agent) => (
                  <Avatar
                    key={agent.value}
                    src={agent.image}
                    radius="xl"
                    size="lg"
                  />
                ))}
              </Group>
              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </InputWrapper>
          </form>
        </Box>
      )}

      <Container size="md" px="xs" mt="md">
        <TransferList
          value={data}
          onChange={updateList}
          nothingFound="No one here"
          titles={["Agent Select", "Team Composition"]}
          listHeight={500}
          breakpoint="sm"
          itemComponent={ItemComponent}
          filter={
            (query, item) =>
              item.label.toLowerCase().includes(query.toLowerCase().trim())
            // || item.description.toLowerCase().includes(query.toLowerCase().trim())
          }
          sx={{ textTransform: "uppercase" }}
        />
      </Container>
    </>
  );
}
