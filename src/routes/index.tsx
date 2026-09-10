import { createFileRoute } from "@tanstack/react-router";

import { Footer, Header, WhatsAppFab } from "@/components/site/chrome";
import {
  Avaliacoes,
  CtaFinal,
  Galeria,
  Hero,
  Local,
  Servicos,
  Sobre,
  Time,
} from "@/components/site/sections";

const title = "Fabin Barber Shop | Barbearia no Del Lago (Ordem de Chegada)";
const description =
  "Barbearia premium no Del Lago desde 2022. Atendimento rápido por ordem de chegada. Cortes, degradê navalhado e barba na navalha com Fábio e Vitinho.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: "/logo.png" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/logo.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Time />
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
