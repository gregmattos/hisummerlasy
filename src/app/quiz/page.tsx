"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const steps = [
  {
    key: "goal",
    title: "Qual é seu objetivo?",
    options: ["Emagrecer", "Manter peso", "Ganhar massa"],
  },
  {
    key: "workout_frequency",
    title: "Com que frequência você treina?",
    options: ["Nunca", "1–2x por semana", "3–5x por semana", "Todos os dias"],
  },
  {
    key: "diet_quality",
    title: "Como está sua alimentação?",
    options: [
      "Nada controlada",
      "Mais ou menos",
      "Bem controlada",
      "Sigo dieta certinha",
    ],
  },
  {
    key: "weight",
    title: "Quanto você pesa hoje?",
    input: true,
    placeholder: "Ex: 75 kg",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function handleAnswer(value: string) {
    const currentKey = steps[step].key;

    const updated = {
      ...answers,
      [currentKey]: value,
    };

    setAnswers(updated);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      await saveToSupabase(updated);
    }
  }

  async function saveToSupabase(data: Record<string, string>) {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Usuário não autenticado");
      return;
    }

    await supabase.from("user_profile").upsert({
      id: user.id,
      ...data,
      onboarding_completed: true,
    });

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Etapa {step + 1}</span>
            <span>{steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all"
              style={{
                width: `${((step + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6 text-center">
          {steps[step].title}
        </h1>

        <div className="space-y-3">
          {"options" in steps[step] &&
            steps[step].options?.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="w-full py-4 rounded-xl border px-4 font-medium hover:bg-orange-100 transition"
              >
                {opt}
              </button>
            ))}

          {"input" in steps[step] && (
            <>
              <input
                type="text"
                placeholder={steps[step].placeholder}
                className="w-full py-4 px-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-orange-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAnswer(
                      (e.target as HTMLInputElement).value
                    );
                  }
                }}
              />

              <button
                disabled={loading}
                onClick={() =>
                  handleAnswer(
                    (document.querySelector(
                      "input"
                    ) as HTMLInputElement)?.value
                  )
                }
                className="w-full py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Finalizar"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
