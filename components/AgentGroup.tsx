import { Avatar, Group, MantineNumberSize } from "@mantine/core";

interface AgentGroupProps {
  agents: Array<string>;
  size?: MantineNumberSize;
  agentsMatch?: string[]
}

function AgentGroup({ agents, size = "md", agentsMatch }: AgentGroupProps) {
  return (
    <Group position="center" spacing="lg">
      {agents.map((agent, idx) => (
        <Avatar
          key={idx}
          src={`/assets/${agent}.png`}
          radius="xl"
          size={size}
          style={{border: "2px", borderColor:"red", borderStyle:`${ agentsMatch?.includes(agent) ? 'solid': ''}`}}
        />
      ))}
    </Group>
  );
}

export default AgentGroup;
