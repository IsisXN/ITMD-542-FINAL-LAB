"use client";

import { FormEvent, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  requestType: "Photography Session",
  preferredDate: "",
  message: "",
};

export default function BookingPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting request...");

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setMessage("Something went wrong. Please try again.");
      return;
    }

    setForm(initialForm);
    setMessage("Your request was submitted successfully.");
  }

  return (
    <section className="page-shell space-y-10 pb-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#bfd7ff]">
          Creative Request
        </p>
        <h1 className="text-4xl font-black uppercase text-[#8fb9ff] md:text-6xl">
          Book a Session
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#c9d6ee]">
          Submit a request for photography, event coverage, flyer design, or
          creative content support. This form saves the request to the database.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-card grid gap-5 rounded-[2rem] p-6 md:grid-cols-2"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">
            Request Type
          </label>
          <select
            value={form.requestType}
            onChange={(e) => setForm({ ...form, requestType: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
          >
            <option>Photography Session</option>
            <option>Event Coverage</option>
            <option>Flyer Design</option>
            <option>Social Media Content</option>
            <option>Other Creative Request</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">
            Preferred Date
          </label>
          <input
            type="date"
            value={form.preferredDate}
            onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-[#dce7fb]">Message</label>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            placeholder="Tell me what you need, the event details, or the type of content you are looking for."
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-[#8fb9ff] px-6 py-3 text-sm font-semibold text-[#05070d] transition hover:scale-[1.02]"
          >
            Submit Request
          </button>
        </div>

        {message && (
          <p className="md:col-span-2 text-sm text-[#bfd7ff]">{message}</p>
        )}
      </form>
    </section>
  );
}