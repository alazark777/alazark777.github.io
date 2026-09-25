---
title: "Clinician Assistant Kit"
description: "An engineering MVP for source-linked, uncertainty-aware outpatient diabetes pre-visit drafts using a React web app, FastAPI agent service, and isolated records MCP server."
date: 2026-09-25
status: "in-progress"
featured: true
tags: ["AI Engineering", "Agents", "FastAPI", "MCP", "Evaluation"]
source_url: "https://github.com/alazark777/clinician-assist"
draft: false
---

The Clinician Assistant Kit is a runnable engineering MVP for generating synthetic outpatient diabetes pre-visit drafts. It is designed to expose source-linked facts, gaps, explicit uncertainty, and unresolved conflicts without diagnosing, prescribing, ordering, or writing source records.

## Architecture

The application uses three independent runtime processes:

1. A React, TypeScript, and Vite web application for the clinician-facing workspace.
2. A FastAPI agent service that owns the bounded coordinator, model adapter, request-scoped authorization, persistence, and feedback flow.
3. A records MCP server that provides read-only access to synthetic patient fixtures.

The web application communicates only with the agent API. The agent service communicates with the records MCP server, and only the records server reads patient files. This keeps the runtime boundaries explicit and makes the records access path easier to inspect.

The agent service supports an offline scripted model port and an OpenAI-compatible adapter. Local SQLite stores runs, profiles, source snapshots, and reviewer feedback. Scrubbed operational events can be sent through a local OpenTelemetry Collector while SQLite remains authoritative if telemetry is unavailable.

## Engineering focus

- Typed HTTP and MCP contracts between independently runnable components
- Bounded agent behavior with explicit tool permissions and request-scoped patient authorization
- Source-linked draft facts, missing-data gaps, uncertainty, and conflict handling
- Synthetic fixtures and evaluator-owned cases for repeatable checks
- Browser journeys, component tests, and evaluation tooling
- Separation between runtime data and evaluator-only scenarios, faults, and expected answers

## Current limits

This is an engineering MVP, not a clinically validated product. The records are synthetic, and the current evidence does not establish clinical readiness. Clinician review, clinical validation, and stronger holdout evaluation remain necessary before making clinical claims.

The repository includes local startup instructions and component-specific checks for the agent service, records MCP server, and web application. The full project and its verification guidance are available in the source repository.
