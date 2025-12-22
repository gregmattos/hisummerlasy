"use client";

import {
  Home,
  BarChart3,
  Dumbbell,
  Utensils,
  Droplets,
  MessageCircle,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Início", href: "/dashboard" },
  { icon: BarChart3, label: "Desempenho", href: "/dashboard/performance" },
  { icon: Dumbbell, label: "Treinos", href: "/dashboard/workout" },
  { icon: Utensils, label: "Alimentos", href: "/dashboard/food" },
  { icon: Droplets, label: "Água", href: "/dashboard/water" },
  { icon: MessageCircle, label: "Chat IA", href: "/dashboard/chat" },
  { icon: Settings, label: "Ajustes", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b">
        <Image
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/26322e02-90e0-438b-8afd-848604df69f9.png"
          alt="Hisummer"
          width={42}
          height={42}
        />
        <span className="font-bold text-lg tracking-tight">
          Hisummer
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${
                      isActive
                        ? "bg-orange-500 text-white shadow"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
