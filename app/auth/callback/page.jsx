"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error retrieving session:", error.message);
        router.replace("/auth"); // fallback to login
        return;
      }

      if (session?.user) {
        console.log("Session found, redirecting to dashboard...");
        router.replace("/dashboard");
      } else {
        console.warn("No session. Redirecting to login.");
        router.replace("/auth");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="animate-pulse text-lg">Verifying magic link...</p>
    </div>
  );
}
