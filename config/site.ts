import type { Locale } from "@/types/portfolio";
import photo from "@/app/assets/mohamed-ayman.jpeg";

export const site = {
  name: "Mohamed Ayman",
  signature: "Mohamed",
  email: "mohamedaymanhashis13@gmail.com",
  whatsapp: "201030781453",
  location: { en: "Egypt", ar: "مصر" } satisfies Record<Locale, string>,
  photo,
  cvUrl: "/mohamed-ayman-cv.pdf",
  availabilityEnabled: true,
} as const;
