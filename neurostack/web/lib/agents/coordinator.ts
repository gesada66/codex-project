// Placeholder coordinator: reads tasks (to be wired later) and routes to agents
import type { Task, Result } from "./types";

export async function runTasks(tasks: Task[]): Promise<Result[]> {
  // For MVP, we return mocked results without calling remote models
  return tasks.map((t) => ({ id: t.id, ok: true, output: { echo: t.payload, agent: t.agent } }));
}

