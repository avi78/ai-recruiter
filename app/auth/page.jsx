"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner"; // ✅ Import toast

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      toast.error("❌ Error sending magic link. Please try again.");
    } else {
      toast.success("✅ Magic link sent! Check your email.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-3xl p-10 max-w-md w-full space-y-6">
        <Image
          src="/logo.png"
          alt="NeuroHire Logo"
          width={180}
          height={50}
          className="mb-4"
        />

        <Image
          src="/login.png"
          alt="Login Illustration"
          width={400}
          height={250}
          className="rounded-xl object-cover w-full h-[200px]"
        />

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Welcome to NeuroHire</h2>
          <p className="text-sm text-muted-foreground">
            Enter your email to get a magic login link
          </p>
        </div>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>
      </div>
    </div>
  );
}
