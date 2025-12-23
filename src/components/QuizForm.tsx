"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function QuizForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    goal: "",
    water_goal: "",
    calories_goal: "",
    workouts_per_week: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    const userId = session.user.id;

    const { error } = await supabase
      .from("profiles")
      .update({
        name: form.name,
        age: Number(form.age),
        goal: form.goal,
        water_goal: Number(form.water_goal),
        calories_goal: Number(form.calories_goal),
        workouts_per_week: Number(form.workouts_per_week),
        onboarding_completed: true,
      })
      .eq("id", userId);

    if (error) {
      console.error("Erro ao salvar onboarding:", error);
      alert("Erro ao salvar seus dados. Tente novamente.");
      setLoading(false);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md"
    >
      <h1 className="text-2xl font-bold mb-1">Bem-vindo 👋</h1>
      <p className="text-gray-600 mb-5">
        Vamos personalizar sua jornada.
      </p>

      <input
        name="name"
        placeholder="Seu nome"
        className="input"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="age"
        type="number"
        placeholder="Idade"
        className="input"
        value={form.age}
        onChange={handleChange}
        required
      />

      <select
        name="goal"
        className="input"
        value={form.goal}
        onChange={handleChange}
        required
      >
        <option value="">Seu objetivo</option>
        <option value="emagrecer">Emagrecer</option>
        <option value="manter">Manter peso</option>
        <option value="ganhar_massa">Ganhar massa</option>
      </select>

      <input
        name="water_goal"
        type="number"
        placeholder="Meta diária de água (ml)"
        className="input"
        value={form.water_goal}
        onChange={handleChange}
        required
      />

      <input
        name="calories_goal"
        type="number"
        placeholder="Meta diária de calorias"
        className="input"
        value={form.calories_goal}
        onChange={handleChange}
        required
      />

      <input
        name="workouts_per_week"
        type="number"
        placeholder="Exercícios por semana"
        className="input"
        value={form.workouts_per_week}
        onChange={handleChange}
        required
      />

      <button
        disabled={loading}
        className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
      >
        {loading ? "Salvando..." : "Começar 🚀"}
      </button>
    </form>
  );
}
