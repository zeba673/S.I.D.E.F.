# S.I.D.E.F.

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js deployed on Vercel with Supabase for PostgreSQL, authentication, and storage. The MVP targets the free tiers during private development and demonstration, while remaining portable to a VPS and self-hosted PostgreSQL later.

## Users

The primary operator is the product developer. Government institutions, technical partners, and investors are audiences for findings and demonstrations, but they do not receive direct access to the operational platform in the MVP.

## Product Purpose

S.I.D.E.F. consolidates lawful government and open-source information about real people and legal entities to identify fiscal-patrimonial inconsistencies that merit human investigation. Success means producing a reproducible, understandable lead supported by dated sources and calculations.

## Positioning

S.I.D.E.F. builds a temporal fiscal-patrimonial graph that connects entities, income, assets, and relationships, then explains which evidence and configurable assumptions produced each signal.

## Operating Context

The operator imports controlled datasets and consults selected live public sources, resolves identity matches, reviews alerts, opens an investigation, and exports a supported finding for an authorized recipient. The platform is private and authenticated. Public data remains subject to purpose, provenance, access, and retention controls.

## Capabilities and Constraints

- The system uses identifiable information about real people and legal entities; it does not anonymize operational records.
- Alerts are investigative signals, not findings of guilt or automatic enforcement decisions.
- The initial rule compares known patrimony with accumulated income over a configurable period.
- Thresholds include a tolerance margin and contextual adjustments because income and economic activity may be incompletely observed.
- Every alert preserves its inputs, configuration version, source provenance, calculation, and review status.
- The MVP supports controlled CSV/JSON imports and selected live connectors.
- Free-tier limits require curated datasets rather than population-scale ingestion.
- The central landing workflow remains deliberately open between search and an alert inbox; the MVP will expose both and validate usage before choosing one.

## Brand Commitments

The product is named **S.I.D.E.F. — Sistema Inteligente de Detección de Evasión Fiscal**. The voice is institutional, precise, and avoids accusatory language.

The operational interface should sit alongside Palantir Gotham, Foundry, and AIP in craft and information density. Local references under `Palantir-plantillas/` are a binding quality bar, not assets or layouts to copy.

## Evidence on Hand

- Legal and project background under `Documentación/`.
- Visual references under `Palantir-plantillas/`; these are inspiration only and must not be copied.
- No customer testimonials, validated performance benchmarks, government integrations, or authorized restricted datasets exist yet; future work must not fabricate them.

## Product Principles

- Evidence before inference.
- Human review before communicating a finding.
- Every signal must be reproducible and explainable.
- Configuration must express uncertainty instead of pretending all income is observable.
- Start with a bounded demonstrator that can migrate without a rewrite.

## Accessibility & Inclusion

The web interface will target WCAG 2.1 AA fundamentals: keyboard operation, visible focus, semantic structure, sufficient contrast, and layouts usable on desktop and mobile.
