"use client";
import { useState } from "react";

type Models = {
  ui: string;
  api: string;
  parse: string;
  index: string;
  chat: string;
  infra: string;
};

type Tab = "profile" | "models" | "ingestion" | "theme";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("profile");
  const [profile, setProfile] = useState({ name: "Analyst", email: "analyst@example.com" });
  const [models, setModels] = useState<Models>({
    ui: process.env.NEXT_PUBLIC_NEUROSTACK_MODEL_UI || process.env.NEUROSTACK_MODEL_UI || "gpt-5-low",
    api: process.env.NEXT_PUBLIC_NEUROSTACK_MODEL_API || process.env.NEUROSTACK_MODEL_API || "gpt-5-medium",
    parse: process.env.NEXT_PUBLIC_NEUROSTACK_MODEL_PARSE || process.env.NEUROSTACK_MODEL_PARSE || "gpt-5-medium",
    index: process.env.NEXT_PUBLIC_NEUROSTACK_MODEL_INDEX || process.env.NEUROSTACK_MODEL_INDEX || "gpt-5-medium",
    chat: process.env.NEXT_PUBLIC_NEUROSTACK_MODEL_CHAT || process.env.NEUROSTACK_MODEL_CHAT || "gpt-5-medium",
    infra: process.env.NEXT_PUBLIC_NEUROSTACK_MODEL_INFRA || process.env.NEUROSTACK_MODEL_INFRA || "gpt-5-high",
  });
  const [limits, setLimits] = useState({ maxUploadMb: Number(process.env.NEXT_PUBLIC_MAX_UPLOAD_MB || process.env.MAX_UPLOAD_MB || 50) });

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="card-header flex items-center gap-2">
          {([
            { id: "profile" as const, label: "Profile" },
            { id: "models" as const, label: "Models" },
            { id: "ingestion" as const, label: "Ingestion Limits" },
            { id: "theme" as const, label: "Theme" },
          ] as { id: Tab; label: string }[]).map((t) => (
            <button
              key={t.id}
              className={`btn btn-outline ${tab === t.id ? "ring-2 ring-accent" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="card-content space-y-4">
          {tab === "profile" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="label mb-1">Name</div>
                <input className="input w-full" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <div className="label mb-1">Email</div>
                <input className="input w-full" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </div>
            </div>
          )}

          {tab === "models" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(models).map(([k, v]) => (
                <div key={k}>
                  <div className="label mb-1">{k.toUpperCase()}</div>
                  <input
                    className="input w-full"
                    value={v}
                    onChange={(e) => {
                      const key = k as keyof Models;
                      const val: Models[typeof key] = e.target.value;
                      setModels((prev) => ({ ...prev, [key]: val }));
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "ingestion" && (
            <div>
              <div className="label mb-1">MAX_UPLOAD_MB</div>
              <input
                type="number"
                className="input w-40"
                value={limits.maxUploadMb}
                onChange={(e) => setLimits({ maxUploadMb: Number(e.target.value) })}
              />
            </div>
          )}

          {tab === "theme" && (
            <div className="text-sm text-text/70">Dark theme locked (Emerald Noir).</div>
          )}
        </div>
      </div>
    </div>
  );
}
