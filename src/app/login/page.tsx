"use client";

import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error(error);
      alert("Erro ao entrar com Google");
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
      console.error(error);
      alert("Erro ao enviar link mágico");
    } else {
      alert("Te mandei um link no e-mail ✨");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-500 to-yellow-400">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/26322e02-90e0-438b-8afd-848604df69f9.png"
            alt="Hisummer Logo"
            width={56}
            height={56}
          />
        </div>

        <h1 className="text-2xl font-bold mb-1">Hisummer</h1>
        <p className="text-gray-500 mb-6">
          Sua jornada saudável começa aqui.
        </p>

        {/* Botões */}
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
