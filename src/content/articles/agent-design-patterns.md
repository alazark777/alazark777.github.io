---
title: "Agent Design Patterns: A Field Guide to Loops, Workflows, and Teams"
description: "A practical guide to choosing agent design patterns by locating control, evidence flow, coordination, and human responsibility."
date: 2026-09-23
tags: ["AI Engineering", "Agents", "Evaluation"]
featured: false
draft: false
---

A customer writes: “I was charged twice, and my order still hasn’t arrived.”

An agentic support system could inspect payment and shipping records itself, choosing each next step as evidence comes back. A fixed workflow could send the case through a known sequence. Two specialists could investigate billing and delivery in parallel. A coordinator could split the case into subtasks and combine their findings. A checker could review the proposed reply, while a person approves any refund.

These are all familiar agent design patterns, but they do not describe the same architectural choice. Some govern what one agent does; others describe how an application routes work among components or agents. Review and approval add another layer. The useful question is not simply “Which pattern should I choose?” It is **where should control sit, and how should the system pass evidence and responsibility?**

## Why pattern lists differ

There is no single, mutually exclusive list of agent patterns. Google Cloud uses the term broadly for architectures that organize a single agent or multiple agents. Anthropic makes a useful distinction between a **workflow**, where code determines the path, and an **agent**, where a model directs its process and tool use. Microsoft’s orchestration guide concentrates on patterns for coordinating multiple agents. Their lists overlap because their scopes differ, not necessarily because they disagree. Anthropic notes that tooling details in its article have changed since publication; here, it supports the architectural distinction rather than a current implementation recommendation. ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system); [Anthropic](https://www.anthropic.com/engineering/building-effective-agents); [Microsoft](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns))

It helps to sort the patterns into layers:

| Layer | The design question | Common patterns |
| --- | --- | --- |
| **One agent’s behavior** | Who chooses the next action? | Tool-use loop |
| **Application workflow** | Which step runs next? | Sequence, routing, parallel fan-out and fan-in, bounded loop |
| **Agent coordination** | Who delegates, takes over, or collaborates? | Coordinator and workers, hierarchy, handoff, group discussion |
| **Quality and authority** | Who checks the result or approves an action? | Evaluator and optimizer, human review |

These layers compose. A fixed workflow can call an agent. A coordinator can run parallel workers. A tool-use loop can sit inside one worker. Tools, retrieval, and memory give an agent capabilities or information, but do not by themselves define its control pattern. A human approval gate can protect a consequential action in any of these designs. The number of agents alone does not tell you how autonomous the system is.

## When the path is known: workflow patterns

**Sequential workflow (chain or pipeline).** Each stage has a known place, and one stage’s output becomes the next stage’s input. For the support case, code might identify the order, retrieve its transactions, retrieve its shipment events, and then ask an agent to draft an evidence-based response. Use a sequence when stages and dependencies are stable. A malformed or incorrect early result can contaminate later stages, so validate handoffs and define what happens when information is missing.

The stages do not all need to be agents. A database lookup, schema check, or policy rule can be ordinary application code. Agent calls are useful where interpretation or generation is needed; fixed work is often easier to inspect when it remains explicit.

**Routing (dispatch).** A router chooses one of several known paths based on the request. It might send a delivery-only question to the shipping flow and a billing dispute to the payment flow. Routing works when the possible destinations are known, but mixed requests need deliberate treatment. The opening case involves both billing and delivery; a single-label classifier could silently drop half the task. Allow multiple routes, use a general path, or escalate when the categories overlap.

Routing can be a rule, a classifier, or a model decision. It is not automatically a multi-agent handoff: dispatch can happen once at the start, before any agent does substantive work.

When a system mixes branches, checks, and other patterns, some guides call the code-driven orchestration **custom logic**. Think of it as a way to compose patterns around task-specific conditions, rather than a different way agents communicate. ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system))

**Parallel fan-out and fan-in.** Run independent subtasks at the same time, then gather and reconcile their results. Billing and shipping checks are natural candidates because neither depends on the other. Parallel work can shorten elapsed time when tasks are truly independent, but it can increase compute and model-call costs. Its gather step must handle failures, missing data, and disagreements rather than turn them into a falsely certain answer. Google distinguishes code-controlled parallel dispatch from a model-directed coordinator: both can use several agents, but control is assigned differently. ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system))

Parallel execution is a scheduling shape, not proof of an agent architecture. A program can run fixed API calls concurrently; several model calls can also work in parallel without being autonomous agents.

## When evidence determines the next step: the single-agent loop

A **tool-use loop** gives one agent a bounded way to select actions, inspect observations, and continue. Suppose the payment system returns one captured charge and one pending authorization. The assistant may need to check whether the authorization later settled before it can classify the issue. If each finding changes which source to inspect next, a model-directed loop may fit better than a long set of predefined branches.

ReAct is a research approach for interleaving reasoning and actions so a model can use observations from external sources or environments to update its next move. It describes an agent’s behavior; it is not a synonym for every workflow that repeats steps, nor a multi-agent topology. ([Yao et al., ReAct](https://react-lm.github.io/))

Give the loop structured state: verified customer and order identifiers, records retrieved, unresolved questions, and actions already taken. Define what counts as completion, as well as limits on time, tool calls, and retries. Without those limits, an agent can repeat an unproductive query or keep investigating after the useful evidence is exhausted. Tool permissions should also match the task: permission to read a transaction should not imply permission to refund it.

## When work needs multiple agents: coordination patterns

**Coordinator and workers.** A coordinator decomposes a request, assigns subtasks to specialized agents, and combines their deliverables. Unlike fixed fan-out, it can adapt the assignment to what it learns. For a complicated support case, a billing worker might report transaction status and policy implications while a shipping worker reconstructs delivery events. Give each worker a bounded assignment and a clear output contract; vague tasks can lead to duplicated work or overlooked questions. This pattern adds coordination, context transfer, and model calls, so use it when decomposition or specialization earns that overhead.

A related, more plan-centered variant makes the plan explicit in a **task ledger**: a manager agent tracks goals and progress, then revises or reorders work as findings come back. Microsoft calls this *Magentic orchestration*. The ledger makes the evolving plan visible, but it also adds overhead and can invite unproductive replanning; it fits open-ended work where the steps are not known in advance. ([Microsoft](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns))

**Hierarchical decomposition.** A top-level coordinator delegates to coordinators or specialists below it, which can further divide the work. This is an extension of coordinator-and-worker design for tasks that need several layers of planning. It can represent large, ambiguous work, but each layer adds handoffs, state to track, and places where context can be lost. A hierarchy is not inherently more capable; it is useful only when the problem itself has a meaningful hierarchy. ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system))

**Handoff.** One agent transfers active responsibility to another, often because a specialist is better suited to the next stage or that need becomes clear during the interaction. A billing specialist can take over after the general support agent discovers a payment dispute. The receiving agent needs the relevant evidence, the customer’s goal, and any unresolved issue. Otherwise, handoff can lose context, repeat questions, or leave ownership unclear. If the destination is known at intake, a simpler router may be easier to control. ([Microsoft](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns))

**Group discussion or swarm-style collaboration.** Several agents exchange findings and challenge or build on one another’s proposals. The labels vary: Microsoft’s group-chat pattern uses a manager to control turns in a shared conversation; Google’s “swarm” describes peer-to-peer communication without a central supervisor. Treat these as related forms of collaborative discussion, not exact synonyms. Use them when iterative debate among distinct perspectives is part of the task. Define who can contribute, how disagreement is resolved, and when the discussion stops; otherwise the agents can circle around the same points or converge on a shared mistake. ([Microsoft](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns); [Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system))

## When work repeats or needs approval: loops and oversight

**Multi-agent loop.** Some guides name a workflow-level loop separately: code repeats a known sequence of specialized agents until a state or iteration limit is reached. This differs from the single-agent tool loop: the workflow repeats predefined stages, while an agent loop chooses actions from each new observation. A generator–critic cycle can implement this pattern when the generator and critic are separate agents. Because each cycle can add cost without progress, define an exit condition and fallback. ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system))

**Evaluator–optimizer (generator–critic).** One component produces a candidate; another checks it against explicit criteria and sends actionable feedback for revision. For the support reply, the checker could flag “The draft calls this a duplicate charge, but the second transaction is still pending.” A vague instruction such as “make the answer better” gives the generator little to fix.

This is a feedback pattern, not a separate coordination topology. The evaluator may be another agent, a model call within one agent’s process, or code for directly testable conditions. Google describes review and critique as one implementation of a loop; Anthropic presents evaluator–optimizer as a composable workflow. In all cases, set an iteration limit and a fallback. A critic can share the generator’s blind spots, approve unsupported claims, or keep requesting revisions without improving the result. ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system); [Anthropic](https://www.anthropic.com/engineering/building-effective-agents))

**Human review and approval.** A person can supply missing context, resolve a dispute, or authorize an action. This is an oversight gate that can be placed around any of the patterns above, not a system topology. Keep recommendation and execution separate: the agent may gather evidence and propose a refund while the application requires a person’s approval before issuing it. Make clear what the reviewer is approving—the customer, order, amount, evidence, and action—not merely a model’s general conclusion. ([Google Cloud](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system))

## Choose a pattern by its control problem

| If the main need is… | Start with… | Test for… |
| --- | --- | --- |
| Stable stages and dependencies | Sequential workflow | Early errors flowing downstream |
| Choosing among known destinations | Routing | Mixed requests losing a subtask |
| Independent checks | Parallel fan-out and fan-in | Missing or conflicting results |
| The next action depends on observations | Single-agent tool loop | Repeated calls or unsupported inference |
| A known cycle must repeat until a condition is met | Multi-agent loop | Repetition without progress |
| Dynamic task breakdown | Coordinator and workers | Overlap, omissions, or poor assignments |
| Changing specialist ownership | Handoff | Lost context or unclear responsibility |
| Deliberate multi-perspective discussion | Group discussion or swarm-style collaboration | No convergence or false consensus |
| A candidate must meet review criteria | Evaluator–optimizer | Unbounded revision or shared blind spots |
| Consequential action needs authorization | Human approval gate | Approval detached from the exact action |

A practical support design could combine several: validate the customer and order with a fixed intake workflow; check billing and shipping records in parallel; use a tool loop only if an ambiguous transaction needs investigation; run the draft through a grounded checker; require approval before a refund. If the fixed checks settle the case, there is no reason to add a coordinator or swarm.

Evaluate the complete system on representative cases, not just whether its conversation sounds coherent. Include a real duplicate charge, a pending authorization, split shipments, missing or contradictory records, and a refund the assistant may recommend but cannot issue. Check whether the system resolves the task correctly, exposes uncertainty, respects permissions, and stops when it should; also measure latency and cost. A pattern earns its place when it measurably addresses a need your simpler design cannot meet.

## Sources

- Anthropic, [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), December 19, 2024.
- Google Cloud, [Choose a design pattern for your agentic AI system](https://docs.cloud.google.com/architecture/choose-design-pattern-agentic-ai-system), last reviewed May 28, 2026.
- Microsoft Azure Architecture Center, [AI agent orchestration patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns).
- Shunyu Yao et al., [ReAct: Synergizing Reasoning and Acting in Language Models](https://react-lm.github.io/), paper and project page.
