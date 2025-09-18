// Stubs for agents; swap to OpenAI Agents SDK later
import type { AgentName } from "./types";

type AgentResponse<T = unknown> = { agent: AgentName; input: T };

export async function UIAgent<T = unknown>(input: T): Promise<AgentResponse<T>> {
  return { agent: "UIAgent", input };
}
export async function APIAgent<T = unknown>(input: T): Promise<AgentResponse<T>> {
  return { agent: "APIAgent", input };
}
export async function ParseAgent<T = unknown>(input: T): Promise<AgentResponse<T>> {
  return { agent: "ParseAgent", input };
}
export async function IndexAgent<T = unknown>(input: T): Promise<AgentResponse<T>> {
  return { agent: "IndexAgent", input };
}
export async function ChatAgent<T = unknown>(input: T): Promise<AgentResponse<T>> {
  return { agent: "ChatAgent", input };
}
export async function InfraAgent<T = unknown>(input: T): Promise<AgentResponse<T>> {
  return { agent: "InfraAgent", input };
}
