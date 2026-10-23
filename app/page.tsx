import Portfolio from "@/components/portfolio";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get("portfolio-locale")?.value;
  const themeCookie = cookieStore.get("portfolio-theme")?.value;
  const initialLocale = localeCookie === "ar" ? "ar" : "en";
  const initialTheme = themeCookie === "light" ? "light" : "dark";
  return <Portfolio initialLocale={initialLocale} initialTheme={initialTheme} />;
}
