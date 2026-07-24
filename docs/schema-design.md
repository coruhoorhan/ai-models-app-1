This document details the database schema for the application, aligning with the core requirements and features.

## Architectural Decisions & Assumptions

*   **Database:** PostgreSQL
*   **Hosting Provider:** Neon.
    *   *Rationale:* Neon offers a serverless PostgreSQL architecture with branch-based database environments. This perfectly complements our Prisma workflow and Git branching strategy, allowing us to spin up isolated database copies for every PR automatically. Since we are implementing our own HTTP-Only Cookie JWT auth (as defined in our API contract) rather than relying on a third-party Auth-as-a-Service like Supabase Auth, Neon provides exactly the flexible, pure Postgres foundation we need without imposing external ecosystem constraints. It also has a generous free tier for our early stages.
*   **ORM:** Prisma
*   **Performance Pattern:** Materialized fields are used for frequently accessed computed data.
    *   `users.current_balance`: Updated via a database transaction whenever a new record is added to `billing_transactions` or `usage_logs` to avoid expensive aggregations on reads.
