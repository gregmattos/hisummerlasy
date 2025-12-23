"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  children: React.ReactNode;
  requireOnboarding?: boolean;
};

export default function AuthGuard({ children, requireOnboarding }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // ❌ não logado → login
      if (!session) {
        router.replace("/login");
        return;
      }

      // 🔍 verifica onboarding se necessário
      if (requireOnboarding) {
        const { data } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", session.user.id)
          .single();

        if (!data || !data.onboarding_completed) {
          router.replace("/quiz");
          return;
        }
      }

      setLoading(false);
    };

    checkAuth();
  }, [router, requireOnboarding]);

  if (loading) return null;

  return <>{children}</>;
}
