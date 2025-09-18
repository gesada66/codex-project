"use client";
import { useMemo, useState } from "react";

type Doc = { id: string; name: string; type: string; status: string; date: string };

const MOCK_DOCS: Doc[] = Array.from({ length: 18 }).map((_, i) => ({
  id: `D-${1000 + i}`,
  name: i % 3 === 0 ? `Report_${i}.pdf` : i % 3 === 1 ? `Form_${i}.docx` : `Scan_${i}.tiff`,
  type: i % 3 === 0 ? "pdf" : i % 3 === 1 ? "docx" : "image",
  status: ["Parsed", "Indexed", "Pending"][i % 3],
  date: `2025-09-${(i % 28) + 1}`,
}));

export default function DocumentsPage() {
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Doc | null>(null);

  const filtered = useMemo(() => {
    return MOCK_DOCS.filter((d) => (type === "all" || d.type === type) && (status === "all" || d.status === status) && d.name.toLowerCase().includes(q.toLowerCase()));
  }, [type, status, q]);

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="card-content grid grid-cols-1 md:grid-cols-4 gap-3">
          <input className="input" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="image">Image</option>
          </select>
          <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Parsed">Parsed</option>
            <option value="Indexed">Indexed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((d) => (
          <button key={d.id} className="card text-left" onClick={() => setOpen(d)}>
            <div className="card-content space-y-2">
              <div className="h-32 bg-surface-600/20 rounded flex items-center justify-center text-text/50">
                {d.type.toUpperCase()}
              </div>
              <div className="font-medium truncate" title={d.name}>{d.name}</div>
              <div className="flex items-center justify-between text-xs text-text/60">
                <span>{d.date}</span>
                <span className="px-2 py-0.5 rounded bg-accent/20 text-accent">{d.status}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 z-50 flex">
          <div className="ml-auto w-full max-w-xl h-full bg-surface border-l border-surface-600/40 flex flex-col">
            <div className="card-header flex items-center justify-between">
              <div>Preview: {open.name}</div>
              <button className="btn btn-outline" onClick={() => setOpen(null)}>Close</button>
            </div>
            <div className="card-content space-y-3 overflow-auto">
              <div className="h-64 bg-surface-600/20 rounded flex items-center justify-center text-text/50">
                Page thumbnails (mock)
              </div>
              <div className="text-sm">Type: {open.type}</div>
              <div className="text-sm">Status: {open.status}</div>
              <div className="flex gap-2">
                <button className="btn btn-primary">Open in Index</button>
                <button className="btn btn-outline">Parse Again</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

