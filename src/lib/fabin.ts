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
    description: "Na tesoura ou na máquina, do jeito que você gosta. Saí daqui com o cabelo do jeito que imaginou.",
    duration: "40 min",
    price: "R$ 45",
  },
  {
    name: "Corte + Barba",
    description: "O pacote completo pra sair daqui outro. Corte e barba na navalha — tudo no mesmo horário.",
    duration: "1h 10min",
    price: "R$ 75",
  },
  {
    name: "Barba Premium",
    description: "Navalha, toalha quente e produto de qualidade. Pele lisa e sem irritação, do jeito que deve ser.",
    duration: "35 min",
    price: "R$ 40",
  },
  {
    name: "Degradê Navalhado",
    description: "Fade apertado, acabamento na navalha e contorno feito com calma. Sem pressa, sem erro.",
    duration: "50 min",
    price: "R$ 55",
  },
  {
    name: "Pezinho / Acabamento",
    description: "O corte tá bom, mas tá na hora de alinhar. Retoque rápido pra deixar tudo no lugar.",
    duration: "20 min",
    price: "R$ 25",
  },
  {
    name: "Corte Infantil",
    description: "Com calma e sem drama. A gente sabe lidar com os pequenos — o resultado agrada pai e filho.",
    duration: "35 min",
    price: "R$ 40",
  },
];

export const barbers: Barber[] = [
  {
    id: "fabio",
    name: "Fábio",
    role: "Dono & Barbeiro",
    bio: "O Fábio abriu a Fabin em 2022 e desde o primeiro dia a régua nunca baixou. É ele quem dá o tom da casa: capricho no degradê, navalha firme na barba e zero tolerância com serviço mal feito.",
    specialties: ["Degradê navalhado", "Barba na navalha", "Corte social"],
    stars: 5,
  },
  {
    id: "vitinho",
    name: "Vitinho",
    role: "Barbeiro",
    bio: "Vitinho é aquele cara que você para na rua pra perguntar onde cortou. Tá sempre antenado no que tá rolando e executa com uma precisão que fala por si.",
    specialties: ["Cortes modernos", "Freestyle", "Sobrancelha"],
    stars: 5,
  },
  {
    id: "novo",
    name: "Em breve",
    role: "Nova cadeira disponível",
    bio: "Tô ampliando o time. Novo profissional chegando em breve.",
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
    text: "Fui uma vez achando que era barbearia comum. Hoje não troco por nada. O Fábio acerta sem você precisar explicar muito.",
    since: "Cliente desde 2022",
  },
  {
    name: "Rafael Moura",
    text: "Chego, assisto um pouquinho de TV na espera e já tô na cadeira. Sem frescura, sem demora e o resultado é sempre bom demais.",
    since: "Cliente há 2 anos",
  },
  {
    name: "Diego Lima",
    text: "O Vitinho mandou muito bem no freestyle que eu pedi. Já era pra ter feito antes. Semana que vem tô lá de novo.",
    since: "Cliente fiel",
  },
  {
    name: "Marcelo Reis",
    text: "Levei meu filho junto e os dois saíram satisfeitos. Trataram o menino com muita paciência. Vale muito a ida.",
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
