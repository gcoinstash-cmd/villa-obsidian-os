# SUPABASE_SETUP.md — Villa Obsidian OS Turnkey Database

Quick 3-minute database connection guide for **Villa Obsidian OS** (Architectural Estates & Private Villa Rental Operating System).

---

## ⚡ 1. Run the SQL Migration
1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and create a new project.
2. Navigate to **SQL Editor** -> **New Query**.
3. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
   - Creates `properties`, `inquiries`, `appointments`, `documents`, and `maintenance_requests` tables.
   - Activates Row Level Security (RLS) policies with public read / authenticated broker control.
4. Copy the entire contents of [`supabase/seed.sql`](./supabase/seed.sql) and click **Run** to load initial sample estates and VIP leads.

---

## 🔑 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Fill in your project credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
PORT=3000
```

---

## 🚀 3. Start Development Server
```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. To access the executive broker control deck directly, open:
`http://localhost:3000/admin` (Cheat code: `villa2026`).
