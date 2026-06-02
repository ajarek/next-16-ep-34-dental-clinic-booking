-- Supabase schema for Dental Clinic Booking
-- Run this in Supabase SQL editor (or psql with service role key)

-- Enable pgcrypto for gen_random_uuid()
create extension if not exists "pgcrypto";

-- Services (publicly selectable)
create table if not exists services (
  id text primary key,
  name text not null,
  duration_minutes int not null,
  price numeric(10,2) not null,
  description text,
  created_at timestamptz default now()
);

-- Appointments
create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  service_id text references services(id) on delete set null,
  appointment_date date not null,
  appointment_time time not null,
  patient_name text not null,
  patient_email text not null,
  patient_phone text not null,
  status text not null default 'Oczekująca',
  created_at timestamptz default now(),
  created_by uuid
);

-- Business hours per day
create table if not exists business_hours (
  id serial primary key,
  day_of_week int not null,
  open_time time not null,
  close_time time not null,
  break_start time,
  break_end time
);

-- Blocked dates (holidays, vacations)
create table if not exists blocked_dates (
  id serial primary key,
  blocked_date date unique not null,
  reason text
);

-- Sample services (IDs are stable keys used by frontend)
insert into services (id, name, duration_minutes, price, description)
values
  ('consultation','Konsultacja stomatologiczna',30,120,'Szybka diagnoza i plan leczenia'),
  ('hygiene','Higienizacja',45,250,'Profesjonalne oczyszczenie i polerowanie'),
  ('endodontics','Leczenie kanałowe',90,560,'Leczenie zęba pod mikroskopem'),
  ('implantology','Implantologia',120,2500,'Wstawienie implantu z opieką')
on conflict (id) do nothing;
