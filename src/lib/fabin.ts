export const WHATSAPP_NUMBER = "5561996979575";
export const WHATSAPP_DISPLAY = "+55 61 99697-9575";
export const ADDRESS = "Quadra 59, Lote 02 - Del Lago II, Itapoã";
export const MAPS_URL = "https://maps.app.goo.gl/yJvNWL4X3CX4LDyC6";
export const MAPS_EMBED =
  "https://www.google.com/maps?q=Del+Lago+II+Q+59+FABIN+BARBER+SHOP+-+Itapo%C3%A3,+Bras%C3%ADlia+-+DF&ftid=0x935a3d86ad9d7e71:0xec7a8a79cea89839&output=embed";
export const INSTAGRAM_URL = "https://www.instagram.com/fabinbarbershop/";
export const INSTAGRAM_HANDLE = "@fabinbarbershop";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Barber = {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  stars?: number;
  image?: string;
  placeholder?: boolean;
};

export type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
};

export const services: Service[] = [
  {
    name: "Corte Masculino",
    description: "Corte na tesoura ou máquina, finalizado com toalha quente e styling.",
    duration: "40 min",
    price: "R$ 45",
  },
  {
    name: "Corte + Barba",
    description: "O combo completo: corte sob medida e barba desenhada na navalha.",
    duration: "1h 10min",
    price: "R$ 75",
  },
  {
    name: "Barba Premium",
    description: "Toalha quente, óleos essenciais, navalha e balm hidratante.",
    duration: "35 min",
    price: "R$ 40",
  },
  {
    name: "Degradê Navalhado",
    description: "Fade preciso com acabamento na navalha e contorno milimétrico.",
    duration: "50 min",
    price: "R$ 55",
  },
  {
    name: "Pezinho / Acabamento",
    description: "Retoque rápido de contornos para manter o corte sempre alinhado.",
    duration: "20 min",
    price: "R$ 25",
  },
  {
    name: "Corte Infantil",
    description: "Atendimento paciente e divertido para os pequenos clientes.",
    duration: "35 min",
    price: "R$ 40",
  },
];

export const barbers: Barber[] = [
  {
    id: "fabio",
    name: "Fábio",
    role: "Proprietário & Barbeiro Master",
    bio: "Fundador da Fabin Barber Shop. Referência em degradê navalhado e barba clássica, com mão firme e olhar de detalhe em cada atendimento.",
    specialties: ["Degradê navalhado", "Barba clássica", "Consultoria de visual"],
    stars: 5,
  },
  {
    id: "vitinho",
    name: "Vitinho",
    role: "Barbeiro",
    bio: "Especialista em cortes modernos e freestyle. Domina tendências, disfarçados e acabamentos precisos para quem gosta de estilo autoral.",
    specialties: ["Cortes modernos", "Freestyle", "Sobrancelha"],
    stars: 5,
  },
  {
    id: "novo",
    name: "Em breve",
    role: "Nova cadeira disponível",
    bio: "Estamos ampliando o time para atender você com ainda mais agilidade. Novo profissional chegando na Fabin.",
    specialties: [],
    placeholder: true,
  },
];

export const hours = [
  { day: "Segunda", time: "Fechado" },
  { day: "Terça a Sexta", time: "09:00 — 20:00" },
  { day: "Sábado", time: "08:00 — 19:00" },
  { day: "Domingo", time: "08:00 — 13:00" },
];

export const testimonials = [
  {
    name: "Lucas Andrade",
    text: "Melhor barbearia da região, sem exagero. O Fábio entende exatamente o que você quer e entrega ainda melhor.",
    since: "Cliente desde 2022",
  },
  {
    name: "Rafael Moura",
    text: "Ambiente impecável, atendimento ágil por ordem de chegada e degradê perfeito. Saio de lá renovado.",
    since: "Cliente há 2 anos",
  },
  {
    name: "Diego Lima",
    text: "Fiz corte e barba com o Vitinho e virei cliente fixo. Cuidado com o detalhe é outro nível.",
    since: "Cliente fiel",
  },
  {
    name: "Marcelo Reis",
    text: "Cheguei, não demorou nada e fui atendido com o maior capricho. Atendimento por ordem de chegada excelente e sem enrolação.",
    since: "Cliente recorrente",
  },
];

export const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];
