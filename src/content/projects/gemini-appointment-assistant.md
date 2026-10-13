---
title: "Gemini Appointment Assistant"
description: "A runnable appointment-booking service that combines a bounded Gemini tool-calling agent with FastAPI, PostgreSQL, and explicit confirmation controls."
date: 2026-10-13
status: "in-progress"
featured: true
tags: ["AI Engineering", "Gemini", "FastAPI", "PostgreSQL", "Agent Systems"]
source_url: "https://github.com/alazark777/booking-assist"
draft: false
---

The Gemini Appointment Assistant is a learning project that models a safe appointment-booking flow with synthetic availability data. A Streamlit client sends chat messages to a server-side FastAPI API; the API owns the Gemini API key, conversation state, authorization checks, and booking rules.

The bounded agent can search synthetic appointment slots and prepare a proposal. It cannot create a booking until the application records an explicit customer approval and validates the proposal's owner, session, expiry, and slot availability. PostgreSQL persists conversations, proposals, and bookings, while database constraints and idempotency protect the final write.

The repository includes a mock scheduler adapter, Alembic migrations, offline tests using a scripted model, opt-in live evaluations, OpenTelemetry support, and infrastructure documentation for Azure staging. It is an engineering learning service rather than a production scheduling system; integrating a real scheduler, identity provider, notifications, and business rules remains future work.
