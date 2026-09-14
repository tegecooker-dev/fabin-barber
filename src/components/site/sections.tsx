import { useState, useRef } from "react";
import { Clock, MapPin, Navigation, Quote, Star, Expand } from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import heroVideo from "@/assets/snapinsta-1789008038249.mp4";
import fabioImg from "@/assets/barber-fabio.jpg";
import vitinhoImg from "@/assets/barber-vitinho.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

import { WhatsAppIcon } from "./chrome";
import { Lightbox } from "./lightbox";
import { useInView } from "@/hooks/useInView";
import {
  ADDRESS,
  MAPS_EMBED,
  MAPS_URL,
  barbers,
  hours,
  services,
  testimonials,
  whatsappLink,
} from "@/lib/fabin";

const barberImages: Record<string, string> = { fabio: fabioImg, vitinho: vitinhoImg };

// ─── Fade-in wrapper ────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <FadeIn className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="text-eyebrow">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl leading-none text-foreground sm:text-5xl">
        {title}
      </h2>
      <div className={`gold-rule mt-5 h-px w-24 ${center ? "mx-auto" : ""}`} />
      {subtitle ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </FadeIn>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Vídeo de fundo em loop silencioso */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroImg}
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        {/* Fallback para browsers sem suporte a vídeo */}
        <img
          src={heroImg}
          alt="Interior da Fabin Barber Shop"
          className="absolute inset-0 size-full object-cover"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/65 to-ink" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-20 pt-32">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow">Del Lago · Itapoã</span>
          <span className="rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-gold">
            Sem agendamento
          </span>
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-[3.25rem] leading-[0.92] text-foreground sm:text-7xl lg:text-8xl">
          CABELO BOM
          <span className="gold-text block">NÃO ESPERA.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Sem agenda, sem app. Você chega, escolhe seu barbeiro e senta na cadeira.
          Fabin Barber no Del Lago — desde 2022 do mesmo jeito: serviço de qualidade e sem enrolação.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#local"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-soft via-gold to-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Navigation className="size-4" /> Ver no Maps
          </a>
          <a
            href={whatsappLink(
              "Oi! Tô querendo ir aí hoje, como tá o movimento?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <WhatsAppIcon className="size-4" /> Ver movimento no Zap
          </a>
        </div>

        <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-6">
          {[
            { k: "+3", v: "anos de estrada" },
            { k: "5.0", v: "nota dos clientes" },
            { k: "100%", v: "ordem de chegada" },
          ].map((s) => (
            <div key={s.v}>
              <dt className="font-display text-3xl text-gold">{s.k}</dt>
              <dd className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                {s.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ─── Sobre ───────────────────────────────────────────────────────────────────
export function Sobre() {
  return (
    <section id="sobre" className="bg-graphite/40 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <div className="relative">
            <img
              src={g5}
              alt="Ambiente aconchegante da Fabin Barber Shop"
              width={900}
              height={900}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-2 border border-gold/50 bg-ink px-6 py-4 text-center sm:right-6">
              <p className="font-display text-3xl text-gold">2022</p>
              <p className="text-[0.6rem] uppercase tracking-[0.28em] text-muted-foreground">
                Since
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div>
            <SectionHeading
              eyebrow="Sobre nós"
              title="A FABIN É ASSIM"
              center={false}
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                O Fábio abriu a barbearia no Del Lago em 2022 com uma ideia clara: fazer direito ou
                não fazer. Nada de pressa, nada de descuido. Cada atendimento é tratado como se
                fosse o único do dia.
              </p>
              <p>
                A casa é simples, o ar-condicionado tá sempre ligado e não precisa marcar hora.
                Chegou, esperou um pouquinho (às vezes nem isso) e saiu diferente.
              </p>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Sem agendamento prévio",
                "Fábio & Vitinho no comando",
                "Produtos de qualidade",
                "Climatizado e confortável",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Time ────────────────────────────────────────────────────────────────────
// Apenas barbeiros reais — sem card placeholder
const activeBarbers = barbers.filter((b) => !b.placeholder);

export function Time() {
  return (
    <section id="time" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="O time"
          title="QUEM FAZ ACONTECER"
          subtitle="Dois barbeiros, um padrão: não sai daqui feio. Chega e escolhe com quem prefere."
        />

        {/* 2 colunas centradas para os 2 barbeiros */}
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:max-w-3xl lg:mx-auto">
          {activeBarbers.map((b, i) => (
            <FadeIn key={b.id} delay={i * 100}>
              <article
                className={`group flex flex-col border bg-card h-full ${
                  b.id === "fabio" ? "border-gold/50" : "border-border/70"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
                  <img
                    src={barberImages[b.id]}
                    alt={`${b.name}, barbeiro da Fabin Barber Shop`}
                    width={912}
                    height={1104}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {b.id === "fabio" ? (
                    <span className="absolute left-4 top-4 bg-gradient-to-r from-gold-soft via-gold to-copper px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                      Proprietário
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-3xl leading-none text-foreground">{b.name}</h3>
                  <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-copper">
                    {b.role}
                  </p>

                  {b.stars ? (
                    <div className="mt-3 flex items-center gap-1">
                      {Array.from({ length: b.stars }).map((_, i) => (
                        <Star key={i} className="size-4 fill-gold text-gold" />
                      ))}
                      <span className="ml-2 text-xs text-muted-foreground">5.0</span>
                    </div>
                  ) : null}

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{b.bio}</p>

                  {b.specialties.length ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {b.specialties.map((s) => (
                        <li
                          key={s}
                          className="border border-border/70 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <a
                    href={whatsappLink(
                      `Olá, ${b.name}! Vim pelo site da Fabin Barber Shop e gostaria de saber se você está atendendo hoje na barbearia.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-sm bg-whats py-3 text-xs font-semibold uppercase tracking-[0.18em] text-whats-foreground transition-opacity hover:opacity-90"
                  >
                    <WhatsAppIcon className="size-4" /> Falar com {b.name}
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Serviços ─────────────────────────────────────────────────────────────────
export function Servicos() {
  return (
    <section id="servicos" className="bg-graphite/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="O que a gente faz"
          title="SERVIÇOS E PREÇOS"
          subtitle="Sem letra miúda. O que você vê aqui é o que você paga."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <FadeIn key={s.name} delay={i * 60}>
              <article className="flex flex-col gap-4 border border-border/70 bg-card p-6 transition-colors hover:border-gold/60 sm:flex-row sm:items-center sm:justify-between h-full">
                <div className="min-w-0">
                  <h3 className="font-display text-2xl leading-none text-foreground">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-copper">
                    <Clock className="size-3.5" /> {s.duration}
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <p className="font-display text-3xl text-gold">{s.price}</p>
                  <a
                    href="#local"
                    className="inline-flex items-center gap-1.5 rounded-sm border border-gold/70 px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
                  >
                    <Navigation className="size-3" /> Chegar agora
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Galeria ──────────────────────────────────────────────────────────────────
const galleryPhotos = [
  { src: g1, alt: "Degradê masculino finalizado na Fabin Barber Shop" },
  { src: g2, alt: "Barba desenhada na navalha com toalha quente" },
  { src: g3, alt: "Ferramentas clássicas de barbearia" },
  { src: g4, alt: "Cliente com corte social finalizado" },
  { src: g5, alt: "Espera da barbearia com poltronas de couro" },
  { src: g6, alt: "Produtos profissionais de styling" },
];

export function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((cur) =>
      cur === null ? null : (cur - 1 + galleryPhotos.length) % galleryPhotos.length,
    );
  const next = () =>
    setLightboxIndex((cur) =>
      cur === null ? null : (cur + 1) % galleryPhotos.length,
    );

  return (
    <section id="galeria" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Galeria"
          title="O QUE SAI DAQUI"
          subtitle="Alguns trabalhos do dia a dia. O que você vê é o que você vai pedir."
        />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {galleryPhotos.map((p, i) => (
            <FadeIn key={p.alt} delay={i * 55}>
              <figure
                className={`group relative cursor-pointer overflow-hidden bg-graphite ${
                  i === 0 ? "col-span-2 lg:col-span-1" : ""
                }`}
                onClick={() => open(i)}
                role="button"
                tabIndex={0}
                aria-label={`Ampliar: ${p.alt}`}
                onKeyDown={(e) => e.key === "Enter" && open(i)}
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  width={900}
                  height={900}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay with expand icon on hover */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/50">
                  <Expand className="size-8 text-white opacity-0 drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={galleryPhotos}
          current={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}

// ─── Avaliações ───────────────────────────────────────────────────────────────
export function Avaliacoes() {
  return (
    <section id="avaliacoes" className="bg-graphite/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Avaliações"
          title="O QUE FALAM DA GENTE"
          subtitle="Sem filtro. São os próprios clientes."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 80}>
              <blockquote className="relative border border-border/70 bg-card p-7 pt-9 h-full">
                <Quote className="absolute right-6 top-6 size-8 text-gold/25" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 text-base leading-relaxed text-foreground/90">"{t.text}"</p>
                <footer className="mt-5 border-t border-border/50 pt-4">
                  <p className="font-display text-xl tracking-wide text-foreground">{t.name}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-copper">{t.since}</p>
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Local ────────────────────────────────────────────────────────────────────
export function Local() {
  return (
    <section id="local" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Onde estamos"
          title="VENHA NOS VISITAR"
          subtitle="Fácil de chegar, difícil de esquecer."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <FadeIn className="space-y-8">
            <div className="border border-border/70 bg-card p-7">
              <h3 className="flex items-center gap-2 font-display text-2xl tracking-wide text-gold">
                <MapPin className="size-5" /> ENDEREÇO
              </h3>
              <p className="mt-3 text-base text-foreground">{ADDRESS}</p>
              <p className="text-sm text-muted-foreground">Brasília — DF · CEP 71591-465</p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-soft via-gold to-copper px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Navigation className="size-4" /> Como chegar no Google Maps
              </a>
            </div>

            <div className="border border-gold/40 bg-gold/5 p-6">
              <span className="text-eyebrow text-gold">Sem agendamento prévio</span>
              <h4 className="mt-1 font-display text-xl text-foreground">
                ATENDIMENTO POR ORDEM DE CHEGADA
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                É só chegar na barbearia, escolher seu barbeiro de preferência e aguardar sua vez no ar-condicionado.
              </p>
            </div>

            <div className="border border-border/70 bg-card p-7">
              <h3 className="flex items-center gap-2 font-display text-2xl tracking-wide text-gold">
                <Clock className="size-5" /> HORÁRIO DE FUNCIONAMENTO
              </h3>
              <ul className="mt-4 divide-y divide-border/50">
                {hours.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between gap-4 py-3 text-sm"
                  >
                    <span className="text-muted-foreground">{h.day}</span>
                    <span
                      className={
                        h.time === "Fechado" ? "text-muted-foreground/70" : "text-foreground"
                      }
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={100} className="min-h-[340px] overflow-hidden border border-border/70">
            <iframe
              title="Mapa da Fabin Barber Shop"
              src={MAPS_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full min-h-[340px] w-full grayscale-[0.4] contrast-[1.1]"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Final ────────────────────────────────────────────────────────────────
export function CtaFinal() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border/60">
      <img
        src={g4}
        alt=""
        aria-hidden="true"
        width={900}
        height={900}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/85" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
        <FadeIn>
          <span className="text-eyebrow">Bora?</span>
          <h2 className="mt-4 font-display text-4xl leading-none text-foreground sm:text-6xl">
            É SÓ CHEGAR.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Sem frescura, sem agendamento. Aparece no Del Lago ou manda mensagem no zap pra saber
            como tá o movimento.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#local"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-soft via-gold to-copper px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Navigation className="size-4" /> Como Chegar no Del Lago
            </a>
            <a
              href={whatsappLink(
                "Oi! Vi o site de vocês e quero saber como tá o movimento hoje!",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-border px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <WhatsAppIcon className="size-4" /> Falar no WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
