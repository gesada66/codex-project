export default function Dashboard() {
  const kpis = [
    { label: "Docs Ingested", value: 1287 },
    { label: "Pending Jobs", value: 6 },
    { label: "Chats", value: 42 },
  ];
  const recentDocs = [
    { id: "DOC-001", name: "Policy Handbook.pdf", pages: 48, status: "Indexed", updatedAt: "2025-09-17" },
    { id: "DOC-002", name: "Invoice_2025_09_12.pdf", pages: 3, status: "Parsed", updatedAt: "2025-09-17" },
    { id: "DOC-003", name: "Claims_Report_Q3.docx", pages: 22, status: "Pending", updatedAt: "2025-09-16" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="card">
            <div className="card-content">
              <div className="text-sm text-text/60">{k.label}</div>
              <div className="text-3xl font-semibold mt-1">{k.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="card-header">Activity (placeholder)</div>
          <div className="card-content h-56 flex items-center justify-center text-text/50">
            Chart placeholder
          </div>
        </div>
        <div className="card">
          <div className="card-header">Recent</div>
          <div className="card-content p-0">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Pages</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {recentDocs.map((d) => (
                  <tr key={d.id}>
                    <td className="truncate max-w-[180px]">{d.name}</td>
                    <td>{d.pages}</td>
                    <td>
                      <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                        {d.status}
                      </span>
                    </td>
                    <td>{d.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
