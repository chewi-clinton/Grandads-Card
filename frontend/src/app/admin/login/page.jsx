"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { login, DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (login(email, password)) {
      router.push("/admin");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-foreground px-4">
      <div className="w-full max-w-sm border border-border bg-background p-8">
        <div className="mb-6 flex flex-col items-center">
          <Image src="/images/site/logo.png" alt="Grandad's Cards" width={64} height={64} priority />
          <h1 className="mt-4 text-xl font-bold">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-white p-3 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-white p-3 text-sm"
            />
          </div>

          {error && <p className="text-sm text-[#9e0011]">{error}</p>}

          <button
            type="submit"
            className="w-full bg-accent py-3 text-sm font-bold text-white hover:opacity-90"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Demo credentials &mdash; {DEMO_ADMIN_EMAIL} / {DEMO_ADMIN_PASSWORD}
          <br />
          Real authentication connects once the backend is live.
        </p>
      </div>
    </div>
  );
}
