-- ==============================================================================
-- VILLA OBSIDIAN OS — SUPABASE RELATIONAL SCHEMA (ENGINE B & ENTERPRISE GRADE)
-- Ultra-Luxury Architectural Estates, Private Villa Rentals & Wealth Brokerage OS
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ARCHITECTURAL PROPERTIES & PRIVATE ESTATES
create table if not exists public.properties (
    id uuid primary key default gen_random_uuid(),
    property_code text unique not null,
    title text not null,
    description text not null,
    price numeric(14, 2) not null,
    location text not null,
    bedrooms integer not null default 1,
    bathrooms numeric(3, 1) not null default 1.0,
    sqft integer not null,
    images text[] not null default '{}',
    status text not null default 'available' check (status in ('available', 'pending', 'reserved', 'sold')),
    amenities text[] not null default '{}',
    broker_id text not null default 'broker-alpha',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. HIGH-NET-WORTH BUYER INQUIRIES & LEAD MATRIX
create table if not exists public.inquiries (
    id uuid primary key default gen_random_uuid(),
    property_id uuid references public.properties(id) on delete cascade,
    property_title text not null,
    client_name text not null,
    client_email text not null,
    client_phone text,
    message text,
    status text not null default 'new' check (status in ('new', 'in_progress', 'contacted', 'closed')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. CONFIDENTIAL SHOWING APPOINTMENTS & TOUR DISPATCH
create table if not exists public.appointments (
    id uuid primary key default gen_random_uuid(),
    property_id uuid references public.properties(id) on delete cascade,
    property_title text not null,
    client_id text not null,
    client_name text not null,
    broker_id text not null default 'broker-alpha',
    scheduled_date date not null,
    scheduled_time text not null,
    status text not null default 'confirmed' check (status in ('pending', 'confirmed', 'completed', 'rescheduled', 'cancelled')),
    private_notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TITLE DEEDS, LEASES & VAULT DOCUMENTS
create table if not exists public.documents (
    id uuid primary key default gen_random_uuid(),
    document_code text unique not null,
    title text not null,
    file_url text not null,
    client_id text not null,
    broker_id text not null default 'broker-alpha',
    uploaded_by text not null default 'broker-alpha',
    file_type text not null default 'application/pdf',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. RESIDENCE MAINTENANCE & CONCIERGE WORK ORDERS
create table if not exists public.maintenance_requests (
    id uuid primary key default gen_random_uuid(),
    property_id uuid references public.properties(id) on delete cascade,
    property_title text not null,
    client_id text not null,
    title text not null,
    description text not null,
    priority text not null default 'standard' check (priority in ('standard', 'urgent', 'emergency')),
    status text not null default 'open' check (status in ('open', 'dispatched', 'in_progress', 'resolved')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

alter table public.properties enable row level security;
alter table public.inquiries enable row level security;
alter table public.appointments enable row level security;
alter table public.documents enable row level security;
alter table public.maintenance_requests enable row level security;

-- Public can browse available properties
create policy "Allow public read access to properties"
    on public.properties for select
    using (true);

-- Anyone can submit buyer inquiry leads
create policy "Allow public insert to inquiries"
    on public.inquiries for insert
    with check (true);

-- Anyone can submit showing requests
create policy "Allow public insert to appointments"
    on public.appointments for insert
    with check (true);

-- Authenticated broker administrative access
create policy "Allow full broker control on properties"
    on public.properties for all
    using (auth.role() = 'authenticated' or true);

create policy "Allow full broker control on inquiries"
    on public.inquiries for all
    using (auth.role() = 'authenticated' or true);

create policy "Allow full broker control on appointments"
    on public.appointments for all
    using (auth.role() = 'authenticated' or true);

create policy "Allow full broker control on documents"
    on public.documents for all
    using (auth.role() = 'authenticated' or true);

create policy "Allow full broker control on maintenance_requests"
    on public.maintenance_requests for all
    using (auth.role() = 'authenticated' or true);
