import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Footer, Header, WhatsAppFab } from "@/components/site/chrome";
import {
  Avaliacoes,
  CtaFinal,
  Galeria,
  Hero,
  Local,
  Servicos,
  Sobre,
} from "@/components/site/sections";
import { SplashScreen } from "@/components/site/SplashScreen";

const title = "Fabin Barber Shop | Barbearia no Del Lago (Ordem de Chegada)";
const description =
  "Barbearia premium no Del Lago desde 2022. Atendimento rápido por ordem de chegada. Cortes, degradê navalhado e barba na navalha com profissionais qualificados.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "/logo.png" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/logo.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BarberShop",
          name: "Fabin Barber Shop",
          image: "/logo.png",
          telephone: "+5561996979575",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Quadra 59, Lote 02 - Del Lago II",
            addressLocality: "Itapoã",
            addressRegion: "DF",
            postalCode: "71591-465",
            addressCountry: "BR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -15.7483,
            longitude: -47.7686,
          },
          priceRange: "$$",
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
              opens: "09:00",
              closes: "20:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Saturday"],
              opens: "08:00",
              closes: "19:00",
            },
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Sunday"],
              opens: "08:00",
              closes: "13:00",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {/* Splash overlay — sits above everything, removed after animation */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      <Header />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <Galeria />
        <Avaliacoes />
        <Local />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
