# Investor Lifecycle Workflow
## Investor Lifecycle Workflow

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Investor Lifecycle Workflow

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Product owners, compliance, operations, backend/frontend developers, QA |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Objective

Define the complete investor lifecycle from registration through ongoing ownership and eventual account closure.

## 2. Lifecycle

```text
REGISTER
  ↓
VERIFY CONTACT
  ↓
COMPLETE PROFILE
  ↓
KYC/AML
  ↓
ELIGIBILITY
  ↓
APPROVED
  ↓
WALLET VERIFICATION
  ↓
INVESTMENT READY
  ↓
INVEST
  ↓
HOLD
  ↓
DISTRIBUTIONS / TRANSFERS
  ↓
EXIT / REDEMPTION
  ↓
CLOSED
```

## 3. Registration

Inputs:

- Email.
- Password/passwordless credential.
- Terms acceptance.

Controls:

- Email verification.
- Bot/rate limiting.
- Duplicate-account detection.

## 4. Identity verification

Collect only required data.

Submit to KYC provider.

Normalize result:

```text
PENDING
APPROVED
REJECTED
MANUAL_REVIEW
EXPIRED
```

## 5. Eligibility

Evaluate:

- Jurisdiction.
- Investor type.
- Required qualification/accreditation.
- Offering rules.
- Current compliance state.

Create immutable decision record.

## 6. Wallet binding

Verify ownership/control.

Associate wallet with investor.

Apply wallet risk checks.

## 7. Investment readiness

Investor must satisfy all required gates:

```text
identity approved
AND
eligibility approved
AND
wallet verified
AND
required documents acknowledged
AND
no restriction
```

## 8. Ongoing monitoring

Potential triggers:

- KYC expiration.
- New sanctions result.
- Material profile change.
- Wallet risk alert.
- Regulatory rule change.

## 9. Restriction

When restricted:

```text
Account status = RESTRICTED
Wallet status = RESTRICTED/FROZEN as appropriate
New investment = blocked
Transfer = blocked
Distribution = handled according to legal/operational policy
```

Do not automatically confiscate or move assets.

## 10. Account closure

Before closure:

- Resolve open subscriptions.
- Resolve transfers.
- Resolve distribution exceptions.
- Handle remaining holdings according to legal policy.
- Retain required records.

## 11. Audit

Every material lifecycle transition records:

- Actor.
- Timestamp.
- Reason.
- Previous state.
- New state.
- Correlation ID.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
