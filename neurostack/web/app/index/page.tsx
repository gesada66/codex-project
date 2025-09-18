"use client";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function IndexAndQueryPage() {
  const [sources] = useState(
    Array.from({ length: 4 }).map((_, i) => ({
      id: `SRC-${i + 1}`,
      page: i + 3,
      excerpt: "…sample excerpt around matched span (mock)…",
    }))
  );
  const [lastBuild, setLastBuild] = useState<string | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Ask me anything about your indexed docs." },
  ]);
  const [input, setInput] = useState("");

  function rebuildIndex() {
    setLastBuild(new Date().toLocaleString());
  }

  function send() {
    if (!input.trim()) return;
    const question = input.trim();
    setMsgs((m) => [...m, { role: "user", content: question }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content: `Mock answer to: "${question}"\n\nSources attached →`,
        },
      ]);
    }, 300);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-1 space-y-4">
        <div className="card">
          <div className="card-header">Index Builder</div>
          <div className="card-content space-y-3">
            <div>
              <div className="label mb-1">Source selection (mock)</div>
              <select className="input w-full">
                <option>All Documents</option>
                <option>Tagged: finance</option>
                <option>Recent (30d)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="opt-chunk" defaultChecked />
              <label htmlFor="opt-chunk" className="label">Chunk by headings</label>
            </div>
            <button className="btn btn-primary w-full" onClick={rebuildIndex}>
              Rebuild Index
            </button>
          </div>
        </div>

        <div className="card" data-testid="index-console">
          <div className="card-header">Index Console</div>
          <div className="card-content space-y-2">
            <div className="text-sm">Sources: All Documents (mock)</div>
            <div className="text-sm">Last build: {lastBuild ?? "never"}</div>
            <div className="text-xs text-text/60">Logs: waiting…</div>
          </div>
        </div>
      </div>

      <div className="xl:col-span-2 grid grid-rows-[1fr_auto] gap-4">
        <div className="card h-[520px] flex" data-testid="chat-card">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="card-header">Query / Chat</div>
            <div className="card-content flex-1 overflow-auto space-y-3">
              {msgs.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] p-3 rounded ${
                    m.role === "user"
                      ? "ml-auto bg-accent/20 text-accent"
                      : "bg-surface"
                  }`}
                >
                  <pre className="whitespace-pre-wrap text-sm">{m.content}</pre>
                </div>
              ))}
            </div>
          </div>
          <div className="w-64 border-l border-surface-600/40 hidden lg:block" data-testid="sources-panel">
            <div className="card-header">Sources</div>
            <div className="card-content space-y-3">
              {sources.map((s) => (
                <div key={s.id} className="text-xs">
                  <div className="font-semibold text-text/80">
                    {s.id} • p.{s.page}
                  </div>
                  <div className="text-text/60">{s.excerpt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="Ask your index…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <button className="btn btn-primary" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
