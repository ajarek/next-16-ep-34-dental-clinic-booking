import {
  addDays,
  addMinutes,
  format,
  isAfter,
  isBefore,
  isEqual,
  isWeekend,
  parse,
  parseISO,
} from "date-fns";

export type Service = {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
  accent: string;
};

export const services: Service[] = [
  {
    id: "consultation",
    name: "Konsultacja stomatologiczna",
    durationMinutes: 30,
    price: 120,
    description: "Szybka diagnoza i plan leczenia.",
    accent: "bg-sky-100 text-sky-700",
  },
  {
    id: "hygiene",
    name: "Higienizacja",
    durationMinutes: 45,
    price: 250,
    description: "Profesjonalne oczyszczenie i polerowanie.",
    accent: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "endodontics",
    name: "Leczenie kanałowe",
    durationMinutes: 90,
    price: 560,
    description: "Bezbolesne leczenie zęba pod mikroskopem.",
    accent: "bg-violet-100 text-violet-700",
  },
  {
    id: "implantology",
    name: "Implantologia",
    durationMinutes: 120,
    price: 2500,
    description: "Kompleksowe wstawienie implantu z opieką.",
    accent: "bg-fuchsia-100 text-fuchsia-700",
  },
];

export const blockedDates = ["2026-06-15", "2026-06-22", "2026-06-30"];

export const businessHours = {
  open: "09:00",
  close: "18:00",
  breakStart: "13:00",
  breakEnd: "14:00",
};

export function getServiceById(id?: string) {
  return services.find((service) => service.id === id);
}

import { pl } from "date-fns/locale";

export function formatDateLabel(date: Date) {
  return format(date, "EEEE, d MMMM yyyy", { locale: pl });
}

export function formatDateShort(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function formatTimeLabel(time: string) {
  return format(parse(time, "HH:mm", new Date()), "HH:mm");
}

export function getWeekDays(startDate = new Date()) {
  return Array.from({ length: 7 }, (_, index) => addDays(startDate, index));
}

export function isDateBlocked(date: Date) {
  const iso = formatDateShort(date);
  return blockedDates.includes(iso) || isWeekend(date);
}

export function getTimeSlots(durationMinutes: number) {
  const open = parse(businessHours.open, "HH:mm", new Date());
  const close = parse(businessHours.close, "HH:mm", new Date());
  const breakStart = parse(businessHours.breakStart, "HH:mm", new Date());
  const breakEnd = parse(businessHours.breakEnd, "HH:mm", new Date());

  const slots: string[] = [];
  let cursor = open;

  while (isBefore(addMinutes(cursor, durationMinutes), addMinutes(close, 1))) {
    const end = addMinutes(cursor, durationMinutes);
    const isWithinBreak =
      (isEqual(cursor, breakStart) || isAfter(cursor, breakStart)) && isBefore(cursor, breakEnd);
    const overlapsBreak = isAfter(end, breakStart) && isBefore(end, breakEnd);

    if (!isWithinBreak && !overlapsBreak) {
      slots.push(format(cursor, "HH:mm"));
    }

    cursor = addMinutes(cursor, 15);
  }

  return slots;
}

export function parseBookingDate(value?: string) {
  if (!value) return undefined;
  try {
    return parseISO(value);
  } catch {
    return undefined;
  }
}
