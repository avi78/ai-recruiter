import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <div className="flex flex-col items-center bg-white shadow-lg rounded-3xl p-10 max-w-md w-full space-y-6">
        {/* Logo */}
        <Image
          src="/logo.png"
          alt="NeuroHire Logo"
          width={180}
          height={50}
          className="mb-4"
        />

        {/* Login Illustration */}
        <Image
          src="/login.png"
          alt="Login Illustration"
          width={400}
          height={250}
          className="rounded-xl object-cover w-full h-[200px]"
        />

        {/* Welcome Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Welcome to NeuroHire</h2>
          <p className="text-sm text-muted-foreground">
            Sign in with your Google account to continue
          </p>
        </div>

        {/* Login Button */}
        <Button className="w-full">Login with Google</Button>
      </div>
    </div>
  );
}
