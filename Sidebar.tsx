"use client";

import { Home, BarChart3, Dumbbell, Utensils, Droplets, MessageCircle, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Início", href: "/dashboard" },
  { icon: BarChart3, label: "Desempenho", href: "/dashboard/performance" },
  { icon: Dumbbell, label: "Treino", href: "/dashboard/workout" },
  { icon: Utensils, label: "Alimentos", href: "/dashboard/food" },
  { icon: Droplets, label: "Água", href: "/dashboard/water" },
  { icon: MessageCircle, label: "Chat", href: "/dashboard/chat" },
  { icon: Settings, label: "Ajustes", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg min-h-screen">
      {/* Logo */}
      <div className="p-6 border-b">
        <Image
          src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/26322e02-90e0-438b-8afd-848604df69f9.png"
          alt="Hisummer Logo"
          width={40}
          height={40}
          className="animate-pulse"
        />
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}