# Project metrics: archive findings (2026-10-05)

**Sources:**
- `CV_Jose_Picado_2026.pdf` (Experience and Key Projects)
- legacy `js/language.js` (project1–4)

Both are in `/mnt/d/Desktop - Copy/DE101/Portaflio_Jose_Picado_archive_v1/legacy-portfolio-v1/`.

**Status:** candidates only. Each one needs José's yes before it ships (Gate 3, "verified or absent").

| v2 card | Archive match | Metric candidates | Tech | Confidence in mapping |
|---|---|---|---|---|
| Personal Data Platform | **FIRE Tracker**: `/mnt/d/Desktop - Copy/Fire/FIRE_PROJECT`, case study in `docs/portfolio/fire-tracker-case-study.md` (2026-08-17) | **Confirmed in code:** 9 integrity gates (A–I); 445 test functions in 56 files (the case study's "308" is out of date). **From the case study, not checked:** 2,600+ transactions, 130+ source files, 8 months live; 5-provider LLM fallback chain; 100% of Silver/Gold encrypted at rest | Python, DuckDB, Parquet. **Not Polars**: there's no polars import or dependency, so the plan's tag is wrong | Confirmed |
| Multi-Client Validation System | none by that name. Closest: Enterprise Audit System (WWT) | Audit: 500K+ records, 6h → 45 min (92%), automated validation + anomaly detection. The plan's "1M rows" appears nowhere in the archive | Python, Polars, Pandas | Unclear: same system or a different one? |
| ETL Reporting Pipeline | SharePoint-to-Power BI ETL Pipeline (WWT) | 80% less processing time; 350+ concurrent data flows; runs daily with error recovery | Python, OAuth 2.0, SharePoint API, Power BI | Likely |
| Oracle Parts Normalization | Intelligent Data Normalization Tool (WWT); the CV also lists a "part number truncation tool" | 85% fuzzy-match accuracy; 4 h/week of manual entry saved | Python, PyQt6, fuzzy matching | Likely, but which tool? |
| Workday Conversions | Workday Technical Consultant, Data Conversion (Jan 2026–present) | No outcome metric. Scope: legacy ADP / Dayforce / SAP → Workday; HCM, Benefits, Payroll, Payroll History, Learning; full lifecycle through cutover; 4 concurrent implementations (see plan §8) | SQL stored procedures, EIB, iLoad, Workday Studio | Confirmed |

**Not in the v2 list:** Databricks Medallion Architecture (academic). 100K+ transactions, Bronze/Silver/Gold layers, Great Expectations, Streamlit.

**Inconsistencies to resolve:**
- The legacy site dates projects 1–3 to 2024; the CV says 2025.
- The audit system's "95% manual review reduction" appears only on the legacy site, not in the CV.

**This also resolves an open item:** the Workday role started in **January 2026** (CV), which unblocks the About timeline.

## FIRE Tracker: notes for the Personal Data Platform card

- **What it is:** a medallion pipeline (Bronze → Silver → Gold) for household finances. It ingests from Gmail, a bank-portal scraper, PDFs and CSVs. A nine-gate integrity check runs on every run, and a Telegram bot answers questions through tool-calling over DuckDB, so the LLM never does the arithmetic.
- **Strongest story for the positioning:** the silent-ingestion incident. Files were tracked by path, so later and fuller re-downloads were skipped, and a month's income read near zero with no error raised. The fix was a SHA-256 content-hash manifest plus Silver dedup. Gate H (income cliff) was added so that kind of bug gets caught on day one. This is "validation systems" made concrete, so it's a candidate for the large featured card.
- **Privacy:** the site shows process statistics only. No amounts, no bank name, no household details (wedding fund, etc.). The case study already follows this rule.

## Confirmed card content (José, 2026-10-05)

| # | Card | Tier | Tech tag | Metric / scope (verified) |
|---|---|---|---|---|
| 1 | Personal Data Platform (FIRE Tracker) | **Featured (large)** | Python · DuckDB · Parquet | 2,600+ transactions · 130+ source files · 9 integrity gates · 8+ months live |
| 2 | Multi-Client Validation System (= Enterprise Audit System) | Compact | Python · Polars · Pandas | 500K+ records · audit time 6 h → 45 min |
| 3 | ETL Reporting Pipeline (= SharePoint → Power BI) | Compact | Python · OAuth 2.0 · SharePoint API | 80% less processing time · 350+ data flows |
| 4 | Oracle Parts Normalization (= fuzzy-match normalization tool) | Compact | Python · PyQt6 · fuzzy matching | 85% match accuracy · 4 h/week saved |
| 5 | Workday Conversions | Compact | SQL · EIB · Workday | Scope only: 4 implementations · HCM, Payroll + history, Benefits, Learning |

- **Dropped:** "1M rows" (not supported by any source) and "replaced manual spot checks" (never confirmed).
- **Client descriptor:** the Validation System client is "a global cybersecurity company". No names anywhere.
- **"8+ months live":** the case study said 8 months on 2026-08-17. "8+" stays true.
- **Mapping not confirmed by José:** card 3 = SharePoint → Power BI. It wasn't contradicted, so it's treated as confirmed.
- **Still open, non-blocking:** an outcome metric for the finished Benefits engagement. Without one, the card shows scope only.
