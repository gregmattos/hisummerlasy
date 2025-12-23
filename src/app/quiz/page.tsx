"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    goal: "",
    water: "",
    calories: "",
    workouts: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      alert("Usuário não autenticado");
      setLoading(false);
      return;
    }

    const userId = user.id;

    // 1️⃣ Salva perfil
    await supabase.from("profiles").upsert({
      id: userId,
      name: form.name,
      age: Number(form.age),
      goal: form.goal,
    });

    // 2️⃣ Salva onboarding
    await supabase.from("onboarding").upsert({
      user_id: userId,
      daily_water_goal: Number(form.water),
      daily_calorie_goal: Number(form.calories),
      weekly_workout_goal: Number(form.workouts),
      completed: true,
    });

    setLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-1">Bem-vindo 👋</h1>
        <p className="text-gray-600 mb-6">
          Vamos personalizar sua jornada.
        </p>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Seu nome"
            className="w-full p-3 border rounded-xl"
            onChange={handleChange}
          />

          <input
            name="age"
            type="number"
            placeholder="Idade"
            className="w-full p-3 border rounded-xl"
            onChange={handleChange}
          />

          <select
            name="goal"
            className="w-full p-3 border rounded-xl"
            onChange={handleChange}
          >
            <option value="">Seu objetivo</option>
            <option value="emagrecer">Emagrecer</option>
            <option value="manter">Manter peso</option>
            <option value="ganhar">Ganhar massa</option>
          </select>

          <input
            name="water"
            type="number"
            placeholder="Meta diária de água (ml)"
            className="w-full p-3 border rounded-xl"
            onChange={handleChange}
          />

          <input
            name="calories"
            type="number"
            placeholder="Meta diária de calorias"
            className="w-full p-3 border rounded-xl"
            onChange={handleChange}
          />

          <input
            name="workouts"
            type="number"
            placeholder="Exercícios por semana"
            className="w-full p-3 border rounded-xl"
            onChange={handleChange}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Salvando..." : "Começar 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}
