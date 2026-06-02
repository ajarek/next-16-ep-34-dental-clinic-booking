# Supabase setup — Dental Clinic Booking

This guide shows how to deploy the SQL schema and Row-Level Security (RLS) policies for the project.

Prerequisites
- Supabase account and a project
- `SUPABASE_SERVICE_ROLE_KEY` (keep secret) and `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`

1) Run SQL schema
- Open Supabase project → SQL Editor → New query
- Paste the contents of `supabase/schema.sql` and run it.

2) Apply RLS policies
- In the same SQL Editor, paste and run `supabase/policies.sql`.

3) Configure Auth
- In Supabase dashboard → Authentication → Settings:
  - Enable Email sign-ups (or only enable invite/magic link as desired).
  - Configure email templates for confirmations.

4) Assign roles to users (admin / staff)
Supabase does not automatically issue a `role` claim in JWT. You need to set `app_metadata` on a user to include `role` (e.g. `admin` or `staff`). Use the Admin REST API (server-side) with the service role key.

Example (curl):

```bash
curl -X PUT "https://<project>.supabase.co/auth/v1/admin/users/<user-id>" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"app_metadata": {"role": "admin"}}'
```

After updating `app_metadata`, the user's JWT will include `role` in `jwt.claims.role` at next sign-in.

5) Service role vs anon key
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS — use it only from secure server-side code.
- Client-side requests should use the anon key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`) and rely on RLS policies.

6) Testing
- Create a test appointment via the public site (frontend). It should `INSERT` into `appointments` while RLS prevents `SELECT` for anonymous users.
- Log in as an admin (set `role` via step 4), then call the Admin pages — you should be able to `SELECT` and `UPDATE` data.

7) Optional: Create a server-side role assignment flow
- Build an admin UI to set `app_metadata` for a user via server endpoints that call Supabase Admin API using the service role key.

If you want, I can also provide:
- A SQL snippet to create a database function to map numeric `role_id` to text `role` and a trigger to populate a `users` table.
- Example server endpoint to assign roles securely using `supabaseServiceRole`.

*** End of guide ***
