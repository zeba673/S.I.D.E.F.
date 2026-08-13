create type public.entity_kind as enum ('person', 'legal_entity', 'asset');
create type public.review_state as enum ('pending', 'reviewing', 'dismissed', 'supported');

create table public.entities (
  id uuid primary key default gen_random_uuid(),
  kind public.entity_kind not null,
  display_name text not null,
  tax_id text,
  jurisdiction text,
  created_at timestamptz not null default now()
);

create unique index entities_tax_id_unique on public.entities (tax_id) where tax_id is not null;

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source_url text,
  access_mode text not null check (access_mode in ('snapshot', 'live')),
  retrieved_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb
);

create table public.facts (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.entities on delete cascade,
  source_id uuid not null references public.sources,
  fact_type text not null,
  amount numeric,
  valid_from date,
  valid_to date,
  confidence numeric not null default 1 check (confidence between 0 and 1),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.relationships (
  id uuid primary key default gen_random_uuid(),
  from_entity_id uuid not null references public.entities on delete cascade,
  to_entity_id uuid not null references public.entities on delete cascade,
  source_id uuid not null references public.sources,
  relationship_type text not null,
  valid_from date,
  valid_to date,
  confidence numeric not null default 1 check (confidence between 0 and 1),
  check (from_entity_id <> to_entity_id)
);

create table public.risk_configs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tolerance_percent numeric not null check (tolerance_percent between 0 and 100),
  informal_income_percent numeric not null check (informal_income_percent between 0 and 300),
  attention_ratio numeric not null check (attention_ratio >= 1),
  minimum_gap numeric not null check (minimum_gap >= 0),
  created_by uuid not null references auth.users,
  created_at timestamptz not null default now()
);

create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.entities on delete cascade,
  config_id uuid not null references public.risk_configs,
  state public.review_state not null default 'pending',
  observed_patrimony numeric not null,
  estimated_capacity numeric not null,
  unexplained_gap numeric not null,
  ratio numeric not null,
  calculation jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.entities enable row level security;
alter table public.sources enable row level security;
alter table public.facts enable row level security;
alter table public.relationships enable row level security;
alter table public.risk_configs enable row level security;
alter table public.alerts enable row level security;

create policy "operator can read entities" on public.entities for select to authenticated using ((select auth.uid()) is not null);
create policy "operator can read sources" on public.sources for select to authenticated using ((select auth.uid()) is not null);
create policy "operator can read facts" on public.facts for select to authenticated using ((select auth.uid()) is not null);
create policy "operator can read relationships" on public.relationships for select to authenticated using ((select auth.uid()) is not null);
create policy "owner manages configs" on public.risk_configs for all to authenticated using ((select auth.uid()) = created_by) with check ((select auth.uid()) = created_by);
create policy "operator can read alerts" on public.alerts for select to authenticated using ((select auth.uid()) is not null);

revoke all on public.entities, public.sources, public.facts, public.relationships, public.risk_configs, public.alerts from anon;
grant select on public.entities, public.sources, public.facts, public.relationships, public.alerts to authenticated;
grant select, insert, update, delete on public.risk_configs to authenticated;

