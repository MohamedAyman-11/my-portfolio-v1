import type { ProjectRecord } from "@/types/portfolio";

export const projects: readonly ProjectRecord[] = [
  {
    id: "project-01",
    copy: {
      en: {
        name: "Booking Platform",
        type: "Full-stack booking platform",
        description: "A full-stack accommodation booking platform with property management, reservations, and role-based experiences for guests, hosts, and administrators. It includes JWT authentication, Google OAuth, reviews, and Stripe payments, with MongoDB, Cloudinary, and TanStack Query supporting the experience.",
      },
      ar: {
        name: "Booking Platform",
        type: "منصة حجز متكاملة",
        description: "منصة متكاملة لحجز أماكن الإقامة، تتيح إدارة العقارات والحجوزات، مع تجارب وصلاحيات مخصصة للضيوف والمضيفين والمسؤولين. تشمل تسجيل الدخول باستخدام JWT وGoogle OAuth، وتقييمات العقارات والدفع عبر Stripe، وتعتمد على MongoDB وCloudinary وTanStack Query.",
      },
    },
    image: "/booking.png",
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
    featured: true,
    demo: {
      type: "website",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7486857292257353728?compact=1",
    },
  },
  {
    id: "project-02",
    copy: {
      en: {
        name: "Craveo",
        type: "Full-stack food ordering platform",
        description: "A multi-role food ordering platform for customers, administrators, and delivery teams. It brings together product customization, cart management, order tracking, and Stripe payments, powered by a Node.js and Express.js API with PostgreSQL and Prisma.",
      },
      ar: {
        name: "Craveo",
        type: "منصة متكاملة لطلب الطعام",
        description: "منصة متعددة الأدوار لطلب الطعام، بخدمات مخصصة للعملاء والمسؤولين وفِرق التوصيل. تجمع بين تخصيص المنتجات وإدارة سلة المشتريات وتتبع الطلبات والدفع عبر Stripe، وتعتمد على API مبني باستخدام Node.js وExpress.js مع PostgreSQL وPrisma.",
      },
    },
    image: "/craveo.svg",
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
    featured: true,
    demo: {
      type: "video",
      url: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7510914285334700032?compact=1",
    },
  },
];
