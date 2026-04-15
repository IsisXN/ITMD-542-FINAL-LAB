export type PhotoItem = {
  id: number;
  title: string;
  category: string;
  image: string;
};

export const photographyItems: PhotoItem[] = [
  { id: 1, title: "Portrait Session", category: "Portrait", image: "/images/placeholder.svg" },
  { id: 2, title: "Event Coverage", category: "Event", image: "/images/placeholder.svg" },
  { id: 3, title: "Outdoor Shoot", category: "Lifestyle", image: "/images/placeholder.svg" },
  { id: 4, title: "Creative Editorial", category: "Editorial", image: "/images/placeholder.svg" },
  { id: 5, title: "Campus Moments", category: "Campus", image: "/images/placeholder.svg" },
  { id: 6, title: "Studio Concept", category: "Studio", image: "/images/placeholder.svg" },
  { id: 7, title: "Brand Visuals", category: "Branding", image: "/images/placeholder.svg" },
  { id: 8, title: "Close-Up Detail", category: "Detail", image: "/images/placeholder.svg" },
  { id: 9, title: "Lifestyle Set", category: "Lifestyle", image: "/images/placeholder.svg" },
];