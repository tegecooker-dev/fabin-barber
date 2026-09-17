import { useEffect, useState } from "react";
import { Menu, X, Navigation, Instagram } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  WHATSAPP_DISPLAY,
  whatsappLink,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
} from "@/lib/fabin";
import { useOpenStatus } from "@/hooks/useOpenStatus";
import logoPng from "@/assets/logo.png";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#galeria", label: "Galeria" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#local", label: "Onde estamos" },
];

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.47.13-.62.15-.15.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46s1.06 2.85 1.21 3.05c.15.2 2.09 3.19 5.06 4.47.7.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.75-.71 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.07.81.82-3-.19-.31a8.09 8.09 0 0 1-1.24-4.3c0-4.48 3.65-8.12 8.13-8.12 4.48 0 8.11 3.64 8.11 8.12 0 4.48-3.64 8.11-8.13 8.11Z" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = useOpenStatus();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-ink/95 backdrop-blur-md shadow-lg transition-colors">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3 lg:flex lg:justify-between">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img
            src={logoPng}
            alt="Logo Fabin Barber Shop"
            width={44}
            height={44}
            decoding="async"
            className="size-11 rounded-full object-cover border border-gold/60 bg-ink shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          />
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-xl tracking-[0.14em] text-foreground">
              FABIN BARBER SHOP
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-copper">
                Since 2022
              </span>
              {status.open ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-widest text-emerald-400">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  Aberto · fecha {status.closesAt}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-950/60 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-widest text-red-400">
                  <span className="size-1.5 rounded-full bg-red-400" />
                  {status.opensAt ? `Abre ${status.opensAt}` : "Fechado"}
                </span>
              )}
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram ${INSTAGRAM_HANDLE}`}
            title={`Instagram ${INSTAGRAM_HANDLE}`}
            className="inline-flex size-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href="#local"
            className="inline-flex items-center gap-1.5 rounded-sm border border-gold/70 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            <Navigation className="size-3.5" /> Como Chegar
          </a>
        </nav>

        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="shrink-0 rounded-sm border border-border p-2 text-foreground lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {menuOpen ? (
        <nav className="border-t border-border/60 bg-ink px-5 pb-6 pt-2 lg:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block border-b border-border/40 py-3.5 font-display text-xl tracking-wide text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href="#local"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-soft via-gold to-copper py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground"
            >
              <Navigation className="size-4" /> Como Chegar (Ordem de Chegada)
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-border py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="size-4 text-gold" /> Seguir no Instagram {INSTAGRAM_HANDLE}
            </a>
            <a
              href={whatsappLink(
                "Olá, Fabin Barber Shop! Vim pelo site e gostaria de consultar o movimento/fila hoje.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-whats py-3 text-xs font-semibold uppercase tracking-[0.18em] text-whats transition-colors hover:bg-whats hover:text-whats-foreground"
            >
              <WhatsAppIcon className="size-4" /> Falar no WhatsApp
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(
        "Oi! Vi o site de vocês e queria saber como tá o movimento!",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp ${WHATSAPP_DISPLAY}`}
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whats text-whats-foreground shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] transition-all hover:scale-110 active:scale-95"
    >
      <span className="absolute -inset-1 animate-ping rounded-full bg-whats/30" />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logoPng}
                alt="Logo Fabin Barber Shop"
                width={48}
                height={48}
                decoding="async"
                className="size-12 rounded-full object-cover border border-gold/60 bg-ink shadow-md"
              />
              <div>
                <p className="font-display text-2xl tracking-[0.12em] text-foreground">
                  FABIN BARBER SHOP
                </p>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-copper">
                  Since 2022
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Barbearia clássica com acabamento moderno no Del Lago. Atendimento rápido e direto por
              ordem de chegada.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-widest text-gold">LINKS RÁPIDOS</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-widest text-gold">CONTATO & REDES</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>Quadra 59, Lote 02 — Del Lago II, Itapoã</li>
              <li>
                <a
                  href={whatsappLink("Olá! Gostaria de informações da Fabin Barber Shop.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-gold"
                >
                  <Instagram className="size-4 text-gold" />
                  <span>{INSTAGRAM_HANDLE}</span>
                </a>
              </li>
              <li>Terça a domingo</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg tracking-widest text-gold">ORDEM DE CHEGADA</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Sem burocracia de agendamento. É só chegar, escolher seu profissional e renovar o visual.
            </p>
            <a
              href="#local"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm border border-gold/70 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              <Navigation className="size-3.5" /> Como Chegar
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Fabin Barber Shop. Todos os direitos reservados.</p>
          <p className="tracking-[0.2em] uppercase text-copper">Quadra 59, Lote 02 · Del Lago</p>
        </div>
      </div>
    </footer>
  );
}
