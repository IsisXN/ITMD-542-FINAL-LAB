"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Organization = "SHPE" | "ALPFA" | "PHOTO_CLUB";

type ProjectEntry = {
  id: string;
  title: string;
  organization: Organization;
  description: string;
  imageUrl: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

const initialForm = {
  title: "",
  organization: "SHPE" as Organization,
  description: "",
  imageUrl: "/images/placeholder.svg",
  displayOrder: 0,
};

export default function ManagePage() {
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  async function loadProjects() {
    const res = await fetch("/api/projects", { cache: "no-store" });
    const data = await res.json();
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const submitLabel = useMemo(() => {
    return editingId ? "Update Entry" : "Create Entry";
  }, [editingId]);

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatusMessage("Saving...");

    const payload = {
      ...form,
      displayOrder: Number(form.displayOrder),
    };

    const res = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setStatusMessage("Something went wrong while saving the entry.");
      return;
    }

    await loadProjects();
    resetForm();
    setStatusMessage(editingId ? "Entry updated successfully." : "Entry created successfully.");
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this entry?");
    if (!confirmed) return;

    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      setStatusMessage("Could not delete the entry.");
      return;
    }

    await loadProjects();
    if (editingId === id) {
      resetForm();
    }
    setStatusMessage("Entry deleted successfully.");
  }

  function handleEdit(project: ProjectEntry) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      organization: project.organization,
      description: project.description,
      imageUrl: project.imageUrl || "/images/placeholder.svg",
      displayOrder: project.displayOrder,
    });
    setStatusMessage("Editing existing entry.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="page-shell space-y-10 pb-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#bfd7ff]">
          Database Manager
        </p>
        <h1 className="text-4xl font-black uppercase text-[#8fb9ff] md:text-6xl">
          Manage Project Entries
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#c9d6ee]">
          This page handles create, read, update, and delete operations for the
          project entries shown on the Projects page.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-card grid gap-5 rounded-[2rem] p-6 md:grid-cols-2"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">Title</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            placeholder="Example: Women in STEM Flyer"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">Organization</label>
          <select
            value={form.organization}
            onChange={(e) =>
              setForm({ ...form, organization: e.target.value as Organization })
            }
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
          >
            <option value="SHPE">SHPE</option>
            <option value="ALPFA">ALPFA</option>
            <option value="PHOTO_CLUB">Photo Club</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-[#dce7fb]">Description</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            placeholder="Describe the flyer, content, or project entry."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">Image Path</label>
          <input
            type="text"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            placeholder="/images/projects/shpe-1.jpg"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[#dce7fb]">Display Order</label>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
            className="w-full rounded-xl border border-white/10 bg-[#0a101b] px-4 py-3 text-white outline-none focus:border-[#8fb9ff]/50"
            min={0}
          />
        </div>

        <div className="flex flex-wrap gap-3 md:col-span-2">
          <button
            type="submit"
            className="rounded-full bg-[#8fb9ff] px-6 py-3 text-sm font-semibold text-[#05070d] transition hover:scale-[1.02]"
          >
            {submitLabel}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-[#dce7fb] transition hover:bg-white/5"
          >
            Clear Form
          </button>
        </div>

        {statusMessage && (
          <p className="md:col-span-2 text-sm text-[#bfd7ff]">{statusMessage}</p>
        )}
      </form>

      <div className="grid gap-5">
        {projects.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-6 text-[#a9b7d1]">
            No entries yet. Create your first project entry above.
          </div>
        ) : (
          projects.map((project) => (
            <article
              key={project.id}
              className="glass-card rounded-[1.5rem] p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#bfd7ff]">
                    {project.organization.replace("_", " ")}
                  </p>
                  <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                  <p className="max-w-3xl leading-7 text-[#c9d6ee]">{project.description}</p>
                  <p className="text-sm text-[#8ea2c3]">
                    Image Path: {project.imageUrl || "No image path set"} | Display Order: {project.displayOrder}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(project)}
                    className="rounded-full border border-[#8fb9ff]/30 px-5 py-2 text-sm font-semibold text-[#dce7fb] transition hover:bg-[#8fb9ff]/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="rounded-full border border-red-400/25 px-5 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-400/10"
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