"use client";
import { useMemo, useState } from "react";

type Job = {
  id: string;
  name: string;
  pages: number;
  status: "Pending" | "Parsing" | "Parsed" | "Error";
  progress: number;
};

export default function ParsePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [options, setOptions] = useState({
    range: "1-",
    ocr: true,
    preset: "Auto",
  });
  const [activePreview, setActivePreview] = useState<"md" | "json">("md");
  const [previewContent, setPreviewContent] = useState<{ md: string; json: string } | null>(null);

  const maxMb = Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB || process.env.MAX_UPLOAD_MB || 50);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files || []) as File[];
    const filtered = newFiles.filter((f) => f.size <= maxMb * 1024 * 1024);
    setFiles((prev) => [...prev, ...filtered]);
  }

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(e.target.files || []) as File[];
    const filtered = picked.filter((f) => f.size <= maxMb * 1024 * 1024);
    setFiles((prev) => [...prev, ...filtered]);
  }

  function onParse() {
    const newJobs: Job[] = files.map((f, i) => ({
      id: `${Date.now()}-${i}`,
      name: f.name,
      pages: Math.max(1, Math.min(12, Math.ceil(f.size / 50000))),
      status: "Parsed",
      progress: 100,
    }));
    setJobs((prev) => [...newJobs, ...prev]);
    setPreviewContent({
      md: `# Preview: ${files[0]?.name || "Untitled"}\n\n- Pages: ~${newJobs[0]?.pages || 1}\n- OCR: ${options.ocr}\n- Range: ${options.range}\n\n## Extract\nMock paragraph...`,
      json: JSON.stringify(
        { name: files[0]?.name || "Untitled", pages: newJobs[0]?.pages || 1, options },
        null,
        2
      ),
    });
  }

  const jobsView = useMemo(() => (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Pages</th>
          <th>Status</th>
          <th>Progress</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((j) => (
          <tr key={j.id}>
            <td className="truncate max-w-[240px]">{j.name}</td>
            <td>{j.pages}</td>
            <td>
              <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">{j.status}</span>
            </td>
            <td>
              <div className="w-28 h-2 bg-surface-600/20 rounded">
                <div className="h-2 bg-accent rounded" style={{ width: `${j.progress}%` }} />
              </div>
            </td>
            <td>
              <button className="btn btn-outline">Open</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ), [jobs]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="card"
            data-testid="parse-dropzone"
          >
            <div className="card-content flex flex-col items-center justify-center py-16 border-2 border-dashed border-surface-600/40 rounded">
              <div className="text-lg">Drop files to upload</div>
              <div className="text-sm text-text/60">Max {maxMb} MB per file</div>
              <input
                type="file"
                multiple
                className="sr-only"
                id="file-input"
                onChange={onPick}
              />
              <label htmlFor="file-input" className="btn btn-outline mt-4 cursor-pointer">Select files</label>
            </div>
          </div>

          <div className="card">
            <div className="card-header">Jobs</div>
            <div className="card-content p-0">{jobsView}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <div className="card-header">Parse Options</div>
            <div className="card-content space-y-3">
              <div>
                <div className="label mb-1">Target pages</div>
                <input
                  className="input w-full"
                  placeholder="e.g. 1-3,5,10-"
                  value={options.range}
                  onChange={(e) => setOptions({ ...options, range: e.target.value })}
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  id="opt-ocr"
                  type="checkbox"
                  checked={options.ocr}
                  onChange={(e) => setOptions({ ...options, ocr: e.target.checked })}
                />
                <label htmlFor="opt-ocr" className="label">OCR</label>
              </div>
              <div>
                <div className="label mb-1">Preset (mock)</div>
                <select
                  className="input w-full"
                  value={options.preset}
                  onChange={(e) => setOptions({ ...options, preset: e.target.value })}
                >
                  <option>Auto</option>
                  <option>Tables</option>
                  <option>Forms</option>
                  <option>Images</option>
                </select>
              </div>
              <button className="btn btn-primary w-full" onClick={onParse} disabled={files.length === 0} data-testid="parse-button">
                Parse {files.length > 0 ? `(${files.length})` : ""}
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header flex items-center gap-2">
              <button
                className={`btn btn-outline ${activePreview === "md" ? "ring-2 ring-accent" : ""}`}
                onClick={() => setActivePreview("md")}
              >
                Markdown
              </button>
              <button
                className={`btn btn-outline ${activePreview === "json" ? "ring-2 ring-accent" : ""}`}
                onClick={() => setActivePreview("json")}
              >
                JSON
              </button>
            </div>
            <div className="card-content">
              {!previewContent ? (
                <div className="text-text/60">Run parse to see preview.</div>
              ) : activePreview === "md" ? (
                <pre className="whitespace-pre-wrap text-sm" data-testid="parse-preview-md">{previewContent.md}</pre>
              ) : (
                <pre className="text-xs whitespace-pre-wrap" data-testid="parse-preview-json">{previewContent.json}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
