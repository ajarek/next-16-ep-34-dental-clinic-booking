import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const payload = await request.json();
  const { serviceId, date, time, patientName, patientEmail, patientPhone } = payload;

  if (!serviceId || !date || !time || !patientName || !patientEmail || !patientPhone) {
    return NextResponse.json({ error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const response = await supabase.from("appointments").insert({
    service_id: serviceId,
    appointment_date: date,
    appointment_time: time,
    patient_name: patientName,
    patient_email: patientEmail,
    patient_phone: patientPhone,
    status: "Oczekująca",
  }).select();

  if (response.error) {
    return NextResponse.json({ error: response.error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, appointment: response.data?.[0] ?? null });
}
