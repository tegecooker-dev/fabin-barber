import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { CalendarDays, Clock, Scissors, User, Send } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { barbers, services, timeSlots, whatsappLink } from "@/lib/fabin";

type BookingContextValue = {
  open: (prefill?: { barber?: string; service?: string }) => void;
};

const BookingContext = createContext<BookingContextValue>({ open: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [barber, setBarber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const value = useMemo<BookingContextValue>(
    () => ({
      open: (prefill) => {
        if (prefill?.barber) setBarber(prefill.barber);
        if (prefill?.service) setService(prefill.service);
        setError("");
        setIsOpen(true);
      },
    }),
    [],
  );

  const activeBarbers = barbers.filter((b) => !b.placeholder);

  function formatDate(value: string) {
    if (!value) return "";
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }

  function submit() {
    const cleanName = name.trim().slice(0, 80);
    if (!cleanName || !service || !barber || !date || !time) {
      setError("Preencha todos os campos para enviar sua solicitação.");
      return;
    }
    const message = [
      "Olá, Fabin Barber Shop! Gostaria de solicitar um agendamento.",
      "",
      `Nome: ${cleanName}`,
      `Serviço: ${service}`,
      `Profissional: ${barber}`,
      `Data: ${formatDate(date)}`,
      `Horário: ${time}`,
      "",
      "Podem confirmar a disponibilidade, por favor?",
    ].join("\n");
    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setIsOpen(false);
  }

  const today = new Date().toISOString().slice(0, 10);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-card sm:max-w-lg">
          <DialogHeader className="text-left">
            <span className="text-eyebrow">Agendamento</span>
            <DialogTitle className="font-display text-3xl font-normal tracking-wide">
              Reserve sua cadeira
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Preencha os dados e enviaremos sua solicitação pronta no WhatsApp para confirmação.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="booking-name" className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <User className="size-3.5 text-gold" /> Nome
              </Label>
              <Input
                id="booking-name"
                value={name}
                maxLength={80}
                placeholder="Seu nome completo"
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Scissors className="size-3.5 text-gold" /> Serviço
              </Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Escolha o serviço" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name} — {s.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <User className="size-3.5 text-gold" /> Profissional
              </Label>
              <Select value={barber} onValueChange={setBarber}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Escolha o profissional" />
                </SelectTrigger>
                <SelectContent>
                  {activeBarbers.map((b) => (
                    <SelectItem key={b.id} value={b.name}>
                      {b.name} — {b.role}
                    </SelectItem>
                  ))}
                  <SelectItem value="Sem preferência">Sem preferência</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="booking-date" className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <CalendarDays className="size-3.5 text-gold" /> Data
                </Label>
                <Input
                  id="booking-date"
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <Clock className="size-3.5 text-gold" /> Horário
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <button
              type="button"
              onClick={submit}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-gold-soft via-gold to-copper px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Send className="size-4" /> Enviar no WhatsApp
            </button>
            <p className="text-center text-xs text-muted-foreground">
              O horário é uma solicitação e será confirmado pela equipe no WhatsApp.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}
