import Image from "next/image";
import Link from "next/link";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2v.217l9 6.3 9-6.3V7H3Zm18 2.657-8.426 5.898a1 1 0 0 1-1.148 0L3 9.657V17h18V9.657Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5Zm-1.69-1.56a1.96 1.96 0 1 0 0-3.92 1.96 1.96 0 0 0 0 3.92ZM20.44 13.05c0-3.47-1.85-5.08-4.31-5.08-1.99 0-2.88 1.1-3.38 1.87V8.5H9.38c.04.89 0 11.5 0 11.5h3.37v-6.42c0-.34.02-.68.13-.93.27-.68.88-1.39 1.9-1.39 1.34 0 1.88 1.03 1.88 2.53V20H20V13.05h.44Z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <section className="page-shell space-y-16 pb-16">
      <div className="grid items-center gap-10 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl md:grid-cols-[1.05fr_1fr] md:p-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black/30">
          <Image
            src="/images/placeholder.svg"
            alt="Profile placeholder"
            width={900}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-[#bfd7ff]">
            Portfolio Showcase
          </p>

          <h1 className="text-5xl font-black uppercase leading-none text-[#8fb9ff] md:text-7xl">
            About Me
          </h1>

          <p className="max-w-xl text-base leading-8 text-[#dce7fb] md:text-lg">
            I am a creative student leader with experience in photography, visual
            storytelling, and organization branding. My work focuses on creating
            polished content, promotional materials, and engaging visuals for
            student organizations and campus communities.
          </p>

          <p className="max-w-xl text-base leading-8 text-[#a9b7d1]">
            This site highlights my photography work and flyer design projects
            created for SHPE, ALPFA, and Photo Club. It is built as a full stack
            Next.js application with a database-backed project manager to support
            create, read, update, and delete functionality.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:isisxn@gmail.com"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0d1320] px-5 py-3 text-sm font-medium text-[#dce7fb] transition hover:border-[#8fb9ff]/50 hover:bg-[#8fb9ff]/10 hover:text-white"
            >
              <EmailIcon />
              <span>Email</span>
            </a>

            <a
              href="https://www.linkedin.com/in/isisxn/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0d1320] px-5 py-3 text-sm font-medium text-[#dce7fb] transition hover:border-[#8fb9ff]/50 hover:bg-[#8fb9ff]/10 hover:text-white"
            >
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/photography"
              className="rounded-full bg-[#8fb9ff] px-6 py-3 text-sm font-semibold text-[#05070d] transition hover:scale-[1.02]"
            >
              View Photography
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-[#8fb9ff]/35 px-6 py-3 text-sm font-semibold text-[#dce7fb] transition hover:bg-[#8fb9ff]/10"
            >
              View Projects
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-card rounded-[1.75rem] p-6">
          <h2 className="mb-3 text-xl font-bold text-[#8fb9ff]">Creative Work</h2>
          <p className="leading-7 text-[#c5d4ee]">
            My work includes flyer design, photography, event visuals, and social
            media content created for student organizations and campus events.
          </p>
        </div>

        <div className="glass-card rounded-[1.75rem] p-6">
          <h2 className="mb-3 text-xl font-bold text-[#8fb9ff]">Leadership</h2>
          <p className="leading-7 text-[#c5d4ee]">
            I have taken on leadership roles in multiple organizations, including
            vice president, public relations director, and president.
          </p>
        </div>

        <div className="glass-card rounded-[1.75rem] p-6">
          <h2 className="mb-3 text-xl font-bold text-[#8fb9ff]">Full Stack Build</h2>
          <p className="leading-7 text-[#c5d4ee]">
            This project uses the Next.js ecosystem with Prisma and PostgreSQL to
            manage persistent project entries through full CRUD functionality.
          </p>
        </div>
      </div>
    </section>
  );
}