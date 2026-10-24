import type { ProjectRecord } from "@/types/portfolio";

export const projects: readonly ProjectRecord[] = [
  {
    id: "project-01",
    name: "Booking Platform",
    image: "/projects/booking-platform.png",
    repositories: [
      {
        name: "Front End",
        url: "https://github.com/MohamedAyman-11/Booking-app-clone-front-end",
      },
      {
        name: "Back End",
        url: "https://github.com/MohamedAyman-11/Booking-app-clone-back-end",
      },
    ],
    technologies: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Material UI",
      "Google OAuth",
      "Stripe",
      "Cloudinary",
      "Zod",
    ],
    description:
      "Developed a full-stack accommodation booking platform inspired by Booking.com, featuring property management, reservation workflows, and role-based access for guests, hosts, and administrators. Implemented JWT-based authentication, Google OAuth, RESTful APIs, property reviews, saved listings, and Stripe payment integration. Used MongoDB and Mongoose for data persistence, Cloudinary for image uploads, and TanStack Query for server-state management.",
    featured: true,
    demo: {
      type: "website",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7486857292257353728?compact=1",
    },
  },
  {
    id: "project-02",
    name: "Craveo",
    image: "/projects/craveo.png",
    repositories: [
      {
        name: "Front End",
        url: "https://github.com/MohamedAyman-11/full-stack-food-ordering-app-front-end",
      },
      {
        name: "Back End",
        url: "https://github.com/MohamedAyman-11/full-stack-food-ordering-app-back-end",
      },
    ],
    technologies: [
      "React.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Google OAuth",
      "shadcn/ui",
    ],
    description:
      "Built a full-stack, multi-role food ordering platform with dedicated experiences for customers, administrators, and delivery personnel. Implemented secure authentication, role-based access control, product customization, shopping cart management, order lifecycle tracking, and online payments using Stripe Checkout and webhooks. Developed RESTful APIs with Node.js and Express.js, backed by PostgreSQL and Prisma ORM, with Cloudinary for image management and Zod for request validation.",
    featured: true,
    demo: {
      type: "video",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7510914285334700032?compact=1",
    },
  },
];
