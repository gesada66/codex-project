export type AgentName =
  | "UIAgent"
  | "APIAgent"
  | "ParseAgent"
  | "IndexAgent"
  | "ChatAgent"
  | "InfraAgent";

export type Task = {
  id: string;
  agent: AgentName;
  payload: Record<string, unknown>;
};

export type Result = {
  id: string;
  ok: boolean;
  output?: unknown;
  error?: string;
};
