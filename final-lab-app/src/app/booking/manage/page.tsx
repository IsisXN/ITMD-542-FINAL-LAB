"use client";

import { FormEvent, useEffect, useState } from "react";

type BookingStatus = "NEW" | "REVIEWED" | "ACCEPTED" | "DECLINED";

type BookingRequest = {
  id: string;
  name: string;
  email: string;
  requestType: string;
  preferredDate: string | null;
  message: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
};

export default function BookingManagePage() {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [editing, setEditing] = useState<BookingRequest | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  async function loadBookings() {
    const res = await fetch("/api/bookings", { cache: "no-store" });

    if (!res.ok) {
      setStatusMessage("Could not load booking requests.");
      return;
    }

    const data = await res.json();
    setBookings(data);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!editing) return;

    const res = await fetch(`/api/bookings/${editing.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editing),
    });

    if (!res.ok) {
      setStatusMessage("Could not update booking request.");
      return;
    }

    setEditing(null);
    await loadBookings();
    setStatusMessage("Booking request updated.");
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Delete this booking request?");
    if (!confirmed) return;

    const res = await fetch(`/api/bookings/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setStatusMessage("Could not delete booking request.");
      return;
    }

    await loadBookings();
    setStatusMessage("Booking request deleted.");
  }

  return (
    <section className="page-shell space-y-10 pb-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#bfd7ff]">
          Booking Manager
        </p>
        <h1 className="text-4xl font-black uppercase text-[#8fb9ff] md:text-6xl">
          Booking Requests
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#c9d6ee]">
          This page demonstrates reading, updating, and deleting booking requests
          saved in the database.
        </p>
      </div>

      {editing && (
        <form
          onSubmit={handleUpdate}
          className="glass-card grid gap-5 rounded-[2rem] p-6 md:grid-cols-2"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#dce7fb]">Name</label>
            <input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#dce7fb]">Email</label>
            <input
              value={editing.email}
              onChange={(e) => setEditing({ ...editing, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#dce7fb]">
              Request Type
            </label>
            <input
              value={editing.requestType}
              onChange={(e) =>
                setEditing({ ...editing, requestType: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#dce7fb]">Status</label>
            <select
              value={editing.status}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  status: e.target.value as BookingStatus,
                })
              }
              className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            >
              <option value="NEW">New</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="DECLINED">Declined</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-[#dce7fb]">Message</label>
            <textarea
              rows={5}
              value={editing.message}
              onChange={(e) =>
                setEditing({ ...editing, message: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            />
          </div>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#8fb9ff] px-6 py-3 text-sm font-semibold text-[#05070d]"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-[#dce7fb]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {statusMessage && (
        <p className="text-sm text-[#bfd7ff]">{statusMessage}</p>
      )}

      <div className="grid gap-5">
        {bookings.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-6 text-[#a9b7d1]">
            No booking requests yet.
          </div>
        ) : (
          bookings.map((booking) => (
            <article key={booking.id} className="glass-card rounded-[1.5rem] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#bfd7ff]">
                    {booking.status}
                  </p>

                  <h2 className="text-2xl font-bold text-white">
                    {booking.name} — {booking.requestType}
                  </h2>

                  <p className="text-[#c9d6ee]">{booking.email}</p>

                  {booking.preferredDate && (
                    <p className="text-[#a9b7d1]">
                      Preferred date: {booking.preferredDate}
                    </p>
                  )}

                  <p className="max-w-3xl leading-7 text-[#c9d6ee]">
                    {booking.message}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setEditing(booking)}
                    className="rounded-full border border-[#8fb9ff]/30 px-5 py-2 text-sm font-semibold text-[#dce7fb] hover:bg-[#8fb9ff]/10"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="rounded-full border border-red-400/25 px-5 py-2 text-sm font-semibold text-red-200 hover:bg-red-400/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}