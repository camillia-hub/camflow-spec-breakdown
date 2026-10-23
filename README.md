# Spec Breakdown

A Camillia camflow that turns a feature-specification task into an ordered set of
right-sized child tasks, each with testable acceptance criteria — ready for the team to
schedule implementation slice by slice.

## What it does

1. **Understands the spec** — reads the task description, comments, and linked
   documents, extracts actors, journeys, entities, integrations, and non-functional
   requirements, and resolves blocking ambiguity with a single batched user question
   (or a recorded assumption when a default is reasonable).
2. **Slices** — vertical, independently reviewable tasks sized to at most about two
   ideal days, ordered by dependency and risk, capped at twelve with the tail grouped
   into a follow-up epic.
3. **Writes acceptance criteria** — each child task carries goal, scope in/out,
   Given/When/Then-style acceptance criteria, dependencies, and an S/M/L size.
4. **Validates and registers** — every spec requirement maps to at least one task
   before the breakdown is registered as child tasks (or left on the task paper with
   the full plan when no task-creation tool is available in the run).

## How it triggers

Task-type camflow. Schedule it on a task that carries the feature specification (in the
description or linked documents), or bind it to a task event in your workspace trigger
bindings.

## Install

Install from the Camillia Community Hub. The hub imports `camflow.yaml` into your
Camillia instance; no other files are required at runtime.

## License

MIT — Copyright (c) 2026 Camillia contributors. See [LICENSE](LICENSE).
