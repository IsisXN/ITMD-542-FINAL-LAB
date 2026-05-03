export type PhotoItem = {
  id: number;
  title: string;
  category: string;
  image: string;
};

export const photographyItems: PhotoItem[] = [
  { id: 1, title: "Portrait Session", category: "Portrait", image: "/images/portrait.jpg" },
  { id: 2, title: "Event Coverage", category: "Event", image: "/images/event.jpg" },
  { id: 3, title: "Outdoor Shoot", category: "Lifestyle", image: "/images/outside.jpg" },
  { id: 4, title: "Creative Editorial", category: "Editorial", image: "/images/create.jpg" },
  { id: 5, title: "Campus Moments", category: "Italy", image: "/images/Italy.jpg" },
  { id: 6, title: "Studio Concept", category: "Beijing", image: "/images/Beijing.jpg" },
  { id: 7, title: "Brand Visuals", category: "Spain", image: "/images/Spain.jpg" },
  { id: 8, title: "Close-Up Detail", category: "Chicago", image: "/images/Chicago.jpg" },
  { id: 9, title: "Lifestyle Set", category: "Lifestyle", image: "/images/lifestyle.jpg" },
];