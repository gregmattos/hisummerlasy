"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  {
    title: "Qual é seu objetivo?",
    options: ["Emagrecer", "Manter peso", "Ganhar massa"],
  },
  {
    title: "Com que frequência você treina?",
    options: ["Nunca", "1–2x por semana", "3–5x por semana", "Todos os dias"],
  },
  {
    title: "Como está sua alimentação?",
    options: [
      "Nada controlada",
      "Mais ou menos",
      "Bem controlada",
      "Sigo dieta certinha",
    ],
  },
  {
    title: "Quanto você pesa hoje?",
    input: true,
    placeholder: "Ex: 75 kg",
  },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  function handleAnswer(value: string) {
    const updated = [...answers];
    updated[step] = value;
    setAnswers(updated);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // depois a gente salva no Supabase
      router.push("/dashboard");
    }
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

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          {steps[step].title}
        </h1>

        {/* Options */}
        <div className="space-y-3">
          {"options" in steps[step] &&
            steps[step].options?.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className="w-full py-4 rounded-xl border text-left px-4 font-medium hover:bg-orange-100 transition"
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
                onClick={() =>
                  handleAnswer(
                    (document.querySelector(
                      "input"
                    ) as HTMLInputElement)?.value
                  )
                }
                className="w-full py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Continuar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
