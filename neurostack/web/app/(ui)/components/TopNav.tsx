"use client";
import { useState } from "react";

export default function TopNav() {
  const [query, setQuery] = useState("");
  return (
    <header className="h-16 border-b border-surface-600/40 bg-surface flex items-center px-4 gap-3">
      <div className="flex-1" />
      <input
        className="input w-80"
        placeholder="Global search (mock)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="btn btn-outline">Help</button>
      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
        NS
      </div>
    </header>
  );
}

