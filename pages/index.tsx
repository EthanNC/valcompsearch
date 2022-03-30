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
import {useQueryClient } from 'react-query'
import Seo from "../components/Seo";
import { AgentList as initialValues } from "../lib/constants";


const ItemComponent: TransferListItemComponent = ({
  data,
  selected,
}: TransferListItemComponentProps) => (
  <Group noWrap id={data.label}>
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
      id={data.label}
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
    router.push(`/results?team=${agents.join('+')}&order=`);
  };

  return (
    <>
      <Seo/>
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
                <Button id="submit" type="submit">Submit</Button>
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
