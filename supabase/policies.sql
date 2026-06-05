-- Row Level Security (RLS) policies for Dental Clinic Booking
-- Updated to reflect schema changes

-- SERVICES
alter table services enable row level security;
drop policy if exists services_public_select on services;
drop policy if exists services_admin_all on services;
create policy services_public_select on services for select using (true);
create policy services_admin_all on services for all using (
  coalesce(
    auth.jwt() -> 'app_metadata' ->> 'role',
    auth.jwt() -> 'user_metadata' ->> 'role',
    current_setting('jwt.claims.role', true)
  ) = 'admin'
);

-- APPOINTMENTS
alter table appointments enable row level security;
drop policy if exists appointments_public_insert on appointments;
drop policy if exists appointments_staff_select on appointments;
drop policy if exists appointments_staff_update on appointments;
drop policy if exists appointments_admin_delete on appointments;

create policy appointments_public_insert on appointments
  for insert to anon, authenticated with check (true);

create policy appointments_staff_select on appointments
  for select to authenticated using (
    coalesce(
      auth.jwt() -> 'app_metadata' ->> 'role',
      auth.jwt() -> 'user_metadata' ->> 'role',
      current_setting('jwt.claims.role', true)
    ) in ('admin','staff')
  );

create policy appointments_staff_update on appointments
  for update to authenticated using (
    coalesce(
      auth.jwt() -> 'app_metadata' ->> 'role',
      auth.jwt() -> 'user_metadata' ->> 'role',
      current_setting('jwt.claims.role', true)
    ) in ('admin','staff')
  )
  with check (
    coalesce(
      auth.jwt() -> 'app_metadata' ->> 'role',
      auth.jwt() -> 'user_metadata' ->> 'role',
      current_setting('jwt.claims.role', true)
    ) in ('admin','staff')
  );

create policy appointments_admin_delete on appointments
  for delete to authenticated using (
    coalesce(
      auth.jwt() -> 'app_metadata' ->> 'role',
      auth.jwt() -> 'user_metadata' ->> 'role',
      current_setting('jwt.claims.role', true)
    ) = 'admin'
  );

-- BUSINESS HOURS
alter table business_hours enable row level security;
drop policy if exists bh_public_select on business_hours;
drop policy if exists bh_admin_all on business_hours;
create policy bh_public_select on business_hours for select using (true);
create policy bh_admin_all on business_hours for all using (
  coalesce(
    auth.jwt() -> 'app_metadata' ->> 'role',
    auth.jwt() -> 'user_metadata' ->> 'role',
    current_setting('jwt.claims.role', true)
  ) = 'admin'
);

-- BLOCKED DATES
alter table blocked_dates enable row level security;
drop policy if exists blocked_public_select on blocked_dates;
drop policy if exists blocked_admin_all on blocked_dates;
create policy blocked_public_select on blocked_dates for select using (true);
create policy blocked_admin_all on blocked_dates for all using (
  coalesce(
    auth.jwt() -> 'app_metadata' ->> 'role',
    auth.jwt() -> 'user_metadata' ->> 'role',
    current_setting('jwt.claims.role', true)
  ) = 'admin'
);
