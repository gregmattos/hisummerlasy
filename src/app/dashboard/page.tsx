"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const aguaAtual = 1200;
  const aguaMeta = 2500;

  const progressoAgua = Math.min(
    Math.round((aguaAtual / aguaMeta) * 100),
    100
  );

  useEffect(() => {
    async function checkOnboarding() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("user_profile")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();

      if (!profile || profile.onboarding_completed !== true) {
        router.push("/quiz");
        return;
      }

      setLoading(false);
    }

    checkOnboarding();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Bom dia ☀️
        </h1>
        <p className="text-gray-500 mt-1">
          Vamos cuidar do seu corpo hoje.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Água */}
        <div className="rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">💧 Água</h2>
            <span className="text-sm opacity-80">
              {aguaAtual}/{aguaMeta} ml
            </span>
          </div>

          <div className="w-full bg-white/30 rounded-full h-2 mb-2">
            <div
              className="bg-white h-2 rounded-full transition-all"
              style={{ width: `${progressoAgua}%` }}
            />
          </div>

          <p className="text-sm opacity-90">
            {progressoAgua}% da meta diária
          </p>
        </div>

        {/* Calorias */}
        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 shadow-lg">
          <h2 className="font-semibold text-lg mb-3">🔥 Calorias</h2>
          <p className="text-4xl font-bold leading-none">1.340</p>
          <p className="text-sm opacity-90 mt-1">
            kcal consumidas hoje
          </p>
        </div>

        {/* Exercícios */}
        <div className="rounded-3xl bg-gradient-to-br from-green-500 to-green-600 text-white p-6 shadow-lg">
          <h2 className="font-semibold text-lg mb-3">🏃 Exercícios</h2>
          <p className="text-4xl font-bold leading-none">45</p>
          <p className="text-sm opacity-90 mt-1">
            minutos ativos
          </p>
        </div>
      </div>

      {/* Sequência */}
      <div className="bg-white rounded-3xl p-6 border shadow-sm">
        <h2 className="font-semibold text-lg mb-1">
          🔥 Sequência semanal
        </h2>
        <p className="text-gray-500 mb-4">
          Você está criando um hábito forte.
        </p>

        <div className="flex gap-2">
          {["S", "T", "Q", "Q", "S", "S", "D"].map((dia, index) => {
            const ativo = index < 4;
            return (
              <div
                key={index}
                className={`w-11 h-11 flex items-center justify-center rounded-full font-medium
                  ${
                    ativo
                      ? "bg-orange-500 text-white shadow"
                      : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {dia}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
