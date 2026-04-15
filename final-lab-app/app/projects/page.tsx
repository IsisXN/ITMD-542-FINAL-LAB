import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const orgContent = {
  SHPE: {
    title: "SHPE",
    description:
      "I’ve done a considerable amount of work for the Society of Hispanic Professional Engineers and have created content and flyers for their Instagram and newsletter.",
  },
  ALPFA: {
    title: "ALPFA",
    description:
      "The Association of Latino Professionals For America is a student organization that I helped bring to campus. Since its creation in 2025, I have served as vice president and public relations director, creating most of the organization’s flyers and promotional content.",
  },
  PHOTO_CLUB: {
    title: "Photo Club",
    description:
      "I served as public relations director for this club for two years before taking on the role of president. The following are flyers and promotional materials I worked on during my time as PR director.",
  },
};

async function getEntries() {
  return prisma.projectEntry.findMany({
    orderBy: [{ organization: "asc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
  });
}

function SectionImageGrid({
  items,
}: {
  items: {
    id: string;
    title: string;
    imageUrl: string | null;
    description: string;
  }[];
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-white/15 bg-white/5 p-8 text-[#a9b7d1]">
        No project entries added yet for this organization. Add them from the Manage page.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d1320]"
        >
          <Image
            src={item.imageUrl || "/images/placeholder.svg"}
            alt={item.title}
            width={800}
            height={800}
            className="h-56 w-full object-cover"
          />
          <div className="space-y-2 p-4">
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="text-sm leading-7 text-[#a9b7d1]">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function OrgSection({
  id,
  title,
  description,
  reverse,
  items,
}: {
  id: string;
  title: string;
  description: string;
  reverse?: boolean;
  items: {
    id: string;
    title: string;
    imageUrl: string | null;
    description: string;
  }[];
}) {
  return (
    <section
      id={id}
      className="org-anchor-offset rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8"
    >
      <div className={`grid gap-8 md:grid-cols-2 ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-[#bfd7ff]">Organization</p>
          <h2 className="text-4xl font-black uppercase text-[#8fb9ff]">{title}</h2>
          <p className="max-w-xl leading-8 text-[#c9d6ee]">{description}</p>
          <Link
            href="/manage"
            className="inline-flex rounded-full border border-[#8fb9ff]/30 px-5 py-3 text-sm font-semibold text-[#dce7fb] transition hover:bg-[#8fb9ff]/10"
          >
            Manage Entries
          </Link>
        </div>

        <SectionImageGrid items={items} />
      </div>
    </section>
  );
}

export default async function ProjectsPage() {
  const entries = await getEntries();

  const shpeItems = entries.filter((entry) => entry.organization === "SHPE");
  const alpfaItems = entries.filter((entry) => entry.organization === "ALPFA");
  const photoClubItems = entries.filter((entry) => entry.organization === "PHOTO_CLUB");

  const topCards = [
    { id: "shpe", label: "SHPE", image: "/images/placeholder.svg" },
    { id: "alpfa", label: "ALPFA", image: "/images/placeholder.svg" },
    { id: "photo-club", label: "Photo Club", image: "/images/placeholder.svg" },
  ];

  return (
    <section className="page-shell space-y-12 pb-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#bfd7ff]">
          Projects
        </p>
        <h1 className="text-4xl font-black uppercase text-[#8fb9ff] md:text-6xl">
          Organization Work
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#c9d6ee]">
          Hover over the cards below to preview each organization section. Click a card
          to jump directly to that part of the page.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {topCards.map((card) => (
          <a
            key={card.id}
            href={`#${card.id}`}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1320] shadow-xl"
          >
            <Image
              src={card.image}
              alt={card.label}
              width={900}
              height={900}
              className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition duration-300 group-hover:bg-black/65" />
            <div className="absolute inset-0 flex items-end p-6">
              <h2 className="text-3xl font-black uppercase tracking-wide text-white">
                {card.label}
              </h2>
            </div>
          </a>
        ))}
      </div>

      <OrgSection
        id="shpe"
        title={orgContent.SHPE.title}
        description={orgContent.SHPE.description}
        items={shpeItems}
      />

      <OrgSection
        id="alpfa"
        title={orgContent.ALPFA.title}
        description={orgContent.ALPFA.description}
        reverse
        items={alpfaItems}
      />

      <OrgSection
        id="photo-club"
        title={orgContent.PHOTO_CLUB.title}
        description={orgContent.PHOTO_CLUB.description}
        items={photoClubItems}
      />
    </section>
  );
}