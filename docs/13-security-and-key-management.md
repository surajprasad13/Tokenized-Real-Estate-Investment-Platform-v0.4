# 13 — Security & Key Management
## Security & Key Management

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Security & Key Management

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Security architects, blockchain engineers, DevOps, compliance, auditors |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Security objectives

Protect:

1. Investor identity.
2. Investor money.
3. Token ownership.
4. Private/signing keys.
5. Legal documents.
6. Compliance evidence.
7. Administrative privileges.
8. Smart-contract infrastructure.

## 2. Threat model

### Account takeover

Threat:

- Credential stuffing.
- Phishing.
- Session theft.

Controls:

- MFA.
- Rate limiting.
- Device/session management.
- Step-up authentication.
- Suspicious-login detection.

### Wallet substitution

Threat:

Attacker changes destination wallet before investment/withdrawal.

Controls:

- Reauthentication.
- MFA.
- Challenge/signature verification.
- Cooling-off period where appropriate.
- Notification.
- Compliance review.

### Unauthorized mint

Controls:

- Dedicated minter role.
- Contract role policy.
- Issuance IDs.
- Application approval.
- Custody transaction policy.
- Monitoring.

### Insider abuse

Controls:

- RBAC.
- Dual control.
- Just-in-time access.
- Audit logs.
- Separation of duties.
- Anomaly detection.

### Smart-contract exploit

Controls:

- Formal review.
- Audit.
- Fuzzing.
- Invariants.
- Pause.
- Limited upgrade authority.

## 3. Key architecture

```text
Application encryption
       ↓
AWS KMS / HSM
       ↓
Data encryption keys
       ↓
Database/Object encryption

Blockchain signing
       ↓
MPC/HSM/Custody
       ↓
Transaction policy
       ↓
Approval
       ↓
Blockchain
```

## 4. Signing policy

Every production blockchain transaction should be evaluated against:

```text
actor
purpose
contract
function
destination
amount
network
nonce
approval count
```

## 5. Key lifecycle

```text
Generate
→ Store in protected boundary
→ Activate
→ Monitor
→ Rotate where supported
→ Revoke/retire
→ Destroy according to policy
```

## 6. Application secrets

Never store secrets in:

- Git.
- Source code.
- Docker image.
- Plain `.env` files committed to repository.
- Logs.
- Tickets.

## 7. Audit events

Security-sensitive events include:

- Login.
- MFA change.
- Password/recovery event.
- Role assignment.
- Wallet binding.
- Wallet replacement.
- Compliance decision.
- Mint.
- Burn.
- Transfer approval.
- Transfer execution.
- Distribution approval.
- Treasury transaction.
- Contract upgrade.
- Configuration change.

## 8. Secure development lifecycle

```text
Design
 ↓
Threat model
 ↓
Implementation
 ↓
Static analysis
 ↓
Unit/integration tests
 ↓
Security tests
 ↓
Review
 ↓
Staging
 ↓
Production approval
```

## 9. Dependency security

Track:

- Direct dependencies.
- Transitive dependencies.
- Critical CVEs.
- License constraints.
- Container base images.
- Build provenance.

## 10. Incident response

### P0

Examples:

- Key compromise.
- Unauthorized mint.
- Active exploit.
- Major financial theft.

Immediate actions:

1. Freeze affected operations.
2. Notify incident commander.
3. Preserve evidence.
4. Assess scope.
5. Engage legal/compliance.
6. Protect remaining assets.
7. Communicate according to incident policy.
8. Recover and reconcile.

## 11. Security testing

At least:

- SAST.
- DAST.
- Dependency scan.
- Container scan.
- Secret scan.
- Penetration test.
- Smart-contract audit.
- Cloud configuration assessment.

## 12. Recovery

Recovery must be tested, not merely documented.

Test scenarios:

- Database loss.
- Region loss.
- Key provider outage.
- Payment provider outage.
- Blockchain RPC outage.
- Indexer corruption.
- Compromised administrator.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
