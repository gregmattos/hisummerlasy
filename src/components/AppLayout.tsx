"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const menu = [
  { label: "Início", path: "/dashboard", icon: "🏠" },
  { label: "Água", path: "/agua", icon: "💧" },
  { label: "Refeições", path: "/refeicoes", icon: "🍽️" },
  { label: "Exercícios", path: "/exercicios", icon: "🏃‍♂️" },
  { label: "Chat IA", path: "/chat", icon: "🤖" },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#FFF8EE]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="p-6 text-xl font-bold text-orange-500">
          ☀️ Hisummer
        </div>

        <nav className="flex flex-col gap-1 px-4">
          {menu.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition
                  ${
                    active
                      ? "bg-orange-100 text-orange-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 flex flex-col">
        {/* Header mobile */}
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b">
          <span className="font-bold text-orange-500">☀️ Hisummer</span>
        </header>

        <div className="flex-1 p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
