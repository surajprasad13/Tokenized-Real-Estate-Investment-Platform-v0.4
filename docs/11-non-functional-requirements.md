# 11 — Non-Functional Requirements
## Non-Functional Requirements

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Non-Functional Requirements

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Solution architects, development teams, DevOps, security, QA, operations |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Availability

Initial targets:

| Component | Target |
|---|---:|
| Investor web/API | 99.9% |
| Admin API | 99.9% |
| Database | 99.95% service target where provider supports |
| Background processing | Recoverable rather than strict synchronous SLA |
| Blockchain settlement | Chain-dependent |

External provider outages must not corrupt internal state.

## 2. Performance

Initial target:

- P95 read API < 500 ms.
- P95 write API < 800 ms excluding external settlement.
- Database queries for normal screens < 200 ms target.
- Admin search < 1 second for common queries.

Performance requirements should be validated with realistic datasets.

## 3. Scalability

The system should scale horizontally for:

- API requests.
- Workers.
- Blockchain indexing.
- Notifications.

Database scaling must be planned separately.

## 4. Reliability

Required patterns:

- Idempotency.
- Retries.
- Dead-letter queues.
- Circuit breakers.
- Timeouts.
- Transactional outbox.
- Reconciliation.
- Recovery runbooks.

## 5. Disaster recovery

Initial targets:

```text
RPO ≤ 15 minutes
RTO ≤ 4 hours
```

These are business targets to validate, not guarantees.

## 6. Backup

Required:

- Database PITR.
- Daily snapshots.
- Object versioning.
- Isolated backup account/vault where feasible.
- Restore testing.

A backup that has never been restored is not considered validated.

## 7. Security

Minimum:

- TLS.
- Encryption at rest.
- MFA.
- RBAC.
- KMS/HSM.
- Secrets manager.
- Dependency scanning.
- SAST.
- DAST.
- Container scanning.
- Penetration testing.
- Smart-contract audit.

## 8. Privacy

Controls:

- Data minimization.
- Access logging.
- Encryption.
- Retention policies.
- Data classification.
- Vendor data-processing controls.
- PII redaction from logs.

## 9. Observability

Metrics:

```text
http_requests_total
http_request_duration
queue_depth
job_failures
kyc_processing_duration
payment_success_rate
payment_reconciliation_exceptions
blockchain_indexer_lag
blockchain_tx_failure_rate
distribution_failure_rate
ledger_reconciliation_exceptions
```

## 10. Alerting

Critical alerts:

- Unexpected mint.
- Signing-policy violation.
- Key/custody provider outage.
- Payment reconciliation break.
- Ledger imbalance.
- Indexer divergence.
- Large unauthorized transfer attempt.
- Database replication failure.
- Backup failure.

## 11. Maintainability

Requirements:

- TypeScript strict mode where applicable.
- API contracts.
- Database migration standards.
- Architecture Decision Records.
- Runbooks.
- Event schemas.
- Contract version registry.
- Dependency update policy.

## 12. Testing targets

Critical paths should have:

- Unit tests.
- Integration tests.
- Contract tests.
- E2E tests.
- Failure injection.
- Reconciliation tests.

Coverage percentage alone is not an acceptable quality metric.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
