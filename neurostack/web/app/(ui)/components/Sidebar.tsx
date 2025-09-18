"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/parse", label: "Parse" },
  { href: "/index", label: "Index + Query / Chat" },
  { href: "/documents", label: "Documents" },
  { href: "/settings", label: "Settings" },
  { href: "/classify", label: "Classify", phase2: true },
  { href: "/extract", label: "Extract", phase2: true },
  { href: "/connectors", label: "Connectors", phase2: true },
  { href: "/figures", label: "Figures Extraction", phase2: true },
  { href: "/usage", label: "Usage & Limits", phase2: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 border-r border-surface-600/40 bg-surface text-text">
      <div className="h-16 flex items-center px-4 text-xl font-semibold tracking-tight border-b border-surface-600/40">
        NeuroStack
      </div>
      <nav className="flex-1 p-2 space-y-1 overflow-auto">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-sm transition-colors ${
                active
                  ? "bg-accent/20 text-accent-100"
                  : item.phase2
                  ? "text-text/40 hover:text-text/80 hover:bg-surface-600/20"
                  : "text-text/70 hover:text-text hover:bg-surface-600/20"
              }`}
              aria-disabled={item.phase2 ? true : undefined}
              onClick={(e) => {
                if (item.phase2) e.preventDefault();
              }}
            >
              {item.label}
              {item.phase2 && (
                <span className="ml-2 text-[10px] uppercase tracking-wide text-text/40">
                  Phase 2
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 text-[11px] text-text/40 border-t border-surface-600/40">
        Emerald Noir • {process.env.NEXT_PUBLIC_DEPLOY_TARGET || "local"}
      </div>
    </aside>
  );
}

