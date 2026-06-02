export interface AppointmentRow {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  service: string;
  date: string;
  time: string;
  status: "Potwierdzona" | "Oczekująca" | "Anulowana" | "Zrealizowana";
}

export const sampleAppointments: AppointmentRow[] = [
  {
    id: "1",
    patientName: "Anna Kowalska",
    patientEmail: "anna.kowalska@example.com",
    patientPhone: "+48 600 123 456",
    service: "Higienizacja",
    date: "2026-06-03",
    time: "10:30",
    status: "Potwierdzona",
  },
  {
    id: "2",
    patientName: "Michał Nowak",
    patientEmail: "m.nowak@example.com",
    patientPhone: "+48 501 987 654",
    service: "Konsultacja stomatologiczna",
    date: "2026-06-03",
    time: "12:00",
    status: "Oczekująca",
  },
  {
    id: "3",
    patientName: "Katarzyna Wiśniewska",
    patientEmail: "kasia.wisniewska@example.com",
    patientPhone: "+48 505 222 333",
    service: "Leczenie kanałowe",
    date: "2026-06-04",
    time: "15:00",
    status: "Zrealizowana",
  },
];

export const scheduleBlocks = [
  { date: "2026-06-15", reason: "Święto państwowe" },
  { date: "2026-06-22", reason: "Urlop lekarza" },
];

export const businessHours = [
  { day: "Poniedziałek", open: "09:00", close: "18:00" },
  { day: "Wtorek", open: "09:00", close: "18:00" },
  { day: "Środa", open: "09:00", close: "18:00" },
  { day: "Czwartek", open: "09:00", close: "18:00" },
  { day: "Piątek", open: "09:00", close: "18:00" },
  { day: "Sobota", open: "Zamknięte", close: "-" },
  { day: "Niedziela", open: "Zamknięte", close: "-" },
];
