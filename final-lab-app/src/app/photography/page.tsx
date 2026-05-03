import Image from "next/image";
import { photographyItems } from "@/data/photography";

export default function PhotographyPage() {
  return (
    <section className="page-shell space-y-10 pb-16">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#bfd7ff]">
          Gallery
        </p>
        <h1 className="text-4xl font-black uppercase text-[#8fb9ff] md:text-6xl">
          Photography
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-[#c9d6ee]">
          This page is designed as a scrollable gallery that showcases my photography from my summer travels to Spain, Italy, and China. 
          Also featuring photos from my time as a hired photographer and Lead media TA for the <span className="font-semibold text-white">Exelon Summer Institute</span> where 
          I tought media classes and photographed for our sponsors. Also showcases some of my freelance work and other events I photographed.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photographyItems.map((photo) => (
          <article
            key={photo.id}
            className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1320] transition duration-300 hover:-translate-y-1 hover:border-[#8fb9ff]/35"
          >
            <div className="overflow-hidden">
              <Image
                src={photo.image}
                alt={photo.title}
                width={800}
                height={800}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="space-y-2 p-5">
              <p className="text-xs uppercase tracking-[0.25em] text-[#bfd7ff]">
                {photo.category}
              </p>
              <h2 className="text-xl font-semibold text-white">{photo.title}</h2>
              <p className="text-sm leading-7 text-[#a9b7d1]">
                Placeholder item for your photography gallery.
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}