"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert("Erro ao entrar com Google");
      console.error(error);
    }
  };

  const loginWithEmail = async () => {
    const email = prompt("Digite seu e-mail:");

    if (!email) return;

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      alert("Erro ao enviar link de login");
      console.error(error);
    } else {
      alert("Te mandei um link mágico no e-mail ✨");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-500 to-yellow-400">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
        <div className="text-4xl mb-2">☀️</div>

        <h1 className="text-2xl font-bold mb-1">Hisummer</h1>
        <p className="text-gray-500 mb-6">
          Sua jornada saudável começa aqui.
        </p>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold mb-3 transition"
        >
          Entrar com Google
        </button>

        <button
          onClick={loginWithEmail}
          className="w-full border border-orange-500 text-orange-500 py-3 rounded-xl font-semibold hover:bg-orange-50 transition"
        >
          Entrar com E-mail
        </button>
      </div>
    </div>
  );
}
