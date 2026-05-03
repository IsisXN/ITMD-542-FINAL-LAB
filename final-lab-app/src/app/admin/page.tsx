"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/manage";

  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Checking passcode...");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ passcode }),
    });

    if (!res.ok) {
      setMessage("Incorrect passcode. Please try again.");
      return;
    }

    router.push(from);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card w-full max-w-md space-y-6 rounded-[2rem] p-8"
    >
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#bfd7ff]">
          Protected Area
        </p>
        <h1 className="text-4xl font-black uppercase text-[#8fb9ff]">
          Admin Access
        </h1>
        <p className="mt-4 leading-7 text-[#c9d6ee]">
          Enter the passcode to manage portfolio project entries.
        </p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#dce7fb]">Passcode</label>
        <input
          type="password"
          required
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
          placeholder="Enter passcode"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-[#8fb9ff] px-6 py-3 text-sm font-semibold text-[#05070d] transition hover:scale-[1.02]"
      >
        Continue
      </button>

      {message && <p className="text-sm text-[#bfd7ff]">{message}</p>}
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <section className="page-shell flex min-h-[70vh] items-center justify-center pb-16">
      <Suspense fallback={<p className="text-[#bfd7ff]">Loading...</p>}>
        <AdminLoginForm />
      </Suspense>
    </section>
  );
}