# 05 — Technical Architecture
## Technical Architecture

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Technical Architecture

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Solution architects, backend/frontend developers, DevOps, security, technical evaluators |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Architectural style

### MVP

Use a modular monolith with asynchronous workers.

```text
                    API
                     │
              ┌──────▼──────┐
              │ Domain App  │
              └──────┬──────┘
                     │
       ┌─────────────┼──────────────┐
       │             │              │
 PostgreSQL        Redis       Message Queue
       │                            │
       └──────────────┬─────────────┘
                      │
               Background Workers
```

This provides domain isolation while avoiding premature microservice complexity.

## 2. Domain modules

Each module owns its business logic:

```text
src/modules/
  identity/
  investors/
  compliance/
  properties/
  offerings/
  subscriptions/
  payments/
  ledger/
  wallets/
  tokens/
  transfers/
  distributions/
  exits/
  documents/
  notifications/
  audit/
  reconciliation/
  blockchain/
```

## 3. Layering

Each module should use:

```text
controller
  ↓
application service
  ↓
domain
  ↓
repository/interface
  ↓
infrastructure
```

Do not place business rules in controllers.

## 4. Transaction boundaries

A database transaction should cover changes that must be atomic within the same database.

Do not hold a DB transaction open while waiting for:

- Payment provider.
- Blockchain confirmation.
- KYC provider.
- Email provider.

Use workflow state and asynchronous processing instead.

## 5. Transactional outbox

For critical domain events:

```text
BEGIN
  update business state
  insert outbox event
COMMIT
```

A publisher later sends the event.

This prevents:

```text
database committed
event lost
```

## 6. Queue processing

Every worker must implement:

- Idempotency.
- Retry.
- Backoff.
- Dead-letter handling.
- Correlation IDs.
- Structured logs.

## 7. PostgreSQL

Recommended controls:

- Encryption at rest.
- PITR.
- Read replicas where necessary.
- Connection pooling.
- Migration tooling.
- Strict role separation.
- Audit extensions/logging as appropriate.

## 8. AWS reference deployment

```text
Internet
  ↓
Route 53
  ↓
CloudFront/WAF
  ↓
Load Balancer/API Gateway
  ↓
ECS/EKS application
  ├── API
  └── Workers
       ↓
  ┌────┴─────────┐
  │              │
RDS PostgreSQL  ElastiCache
  │
S3
  │
KMS
```

Exact services can change after workload analysis.

## 9. Secrets

Use AWS Secrets Manager/Parameter Store or equivalent.

Secrets should be injected at runtime.

## 10. Observability

Every request receives:

```text
request_id
trace_id
actor_id (where appropriate)
tenant_id
```

Never put sensitive PII in logs.

## 11. Data consistency

The system should classify state as:

- Authoritative.
- Derived.
- Pending reconciliation.
- Exception.

Example:

```text
Blockchain token balance = authoritative chain state
Portfolio balance = derived application state
```

## 12. External integration pattern

All providers must sit behind internal interfaces:

```text
KycProvider
PaymentProvider
CustodyProvider
BlockchainProvider
NotificationProvider
```

This allows vendor replacement without rewriting domain logic.

## 13. API/database migration

Use backward-compatible deployment:

```text
Deploy schema additive change
        ↓
Deploy application supporting old + new
        ↓
Backfill
        ↓
Switch reads/writes
        ↓
Remove deprecated schema later
```

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
