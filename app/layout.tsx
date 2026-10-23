import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteUrl } from "@/config/deployment";
import type { Locale } from "@/types/portfolio";
import { messages } from "@/lib/messages";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/great-vibes/400.css";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale: Locale = (await cookies()).get("portfolio-locale")?.value === "ar" ? "ar" : "en";
  const { title, description } = messages[locale].metadata;

  return {
    ...(siteUrl ? { metadataBase: new URL(siteUrl), alternates: { canonical: "/" } } : {}),
    title,
    description,
    openGraph: { title, description, type: "website", locale: locale === "ar" ? "ar_EG" : "en_US" },
    twitter: { card: "summary", title, description },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("portfolio-locale")?.value === "ar" ? "ar" : "en";
  const theme = cookieStore.get("portfolio-theme")?.value === "light" ? "light" : "dark";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} data-theme={theme} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');var l=localStorage.getItem('portfolio-locale');var hasTheme=document.cookie.split('; ').some(function(c){return c.indexOf('portfolio-theme=')===0});var hasLocale=document.cookie.split('; ').some(function(c){return c.indexOf('portfolio-locale=')===0});var selectedTheme=t==='light'||t==='dark'?t:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=selectedTheme;var changed=false;if(!hasTheme){document.cookie='portfolio-theme='+selectedTheme+'; Max-Age=31536000; Path=/; SameSite=Lax';changed=true}if((l==='en'||l==='ar')&&!hasLocale){document.cookie='portfolio-locale='+l+'; Max-Age=31536000; Path=/; SameSite=Lax';changed=true}if(changed&&!sessionStorage.getItem('portfolio-preferences-migrated')){sessionStorage.setItem('portfolio-preferences-migrated','1');location.reload()}}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
