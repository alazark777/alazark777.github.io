---
title: "Appointment Booking Assistant"
description: "A conversational appointment-booking service that searches synthetic availability, prepares a proposal, and requires explicit approval before creating a booking."
date: 2026-10-13
status: "in-progress"
featured: true
tags: ["AI Engineering", "FastAPI", "PostgreSQL", "Agent Systems"]
source_url: "https://github.com/alazark777/booking-assist"
draft: false
---

This learning project models a safe appointment-booking flow with synthetic availability data. A Streamlit client sends chat messages to a server-side FastAPI API, which owns the conversation state, authorization checks, and booking rules.

The assistant can search appointment slots and prepare a proposal. It cannot create a booking until the application records explicit customer approval and validates the proposal's owner, session, expiry, and slot availability. PostgreSQL persists conversations, proposals, and bookings; database constraints and idempotency protect the final write.

The repository includes a mock scheduler adapter, migrations, offline tests, opt-in live evaluations, telemetry, and Azure staging documentation. It is an engineering learning service, not a production scheduling system: a real scheduler, identity provider, notifications, and business rules remain future work.
