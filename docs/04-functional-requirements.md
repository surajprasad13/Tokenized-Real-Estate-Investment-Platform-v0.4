# 04 — Functional Requirements
## Functional Requirements

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Functional Requirements

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Development teams, QA, product owners, compliance, finance, operations |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Identity

### FR-ID-001
Users shall register with verified contact information.

### FR-ID-002
MFA shall be required before sensitive financial/wallet operations.

### FR-ID-003
Sessions shall support revocation.

### FR-ID-004
Account recovery shall use stronger identity verification than ordinary login.

## 2. Compliance

### FR-C-001
The system shall create a KYC case.

### FR-C-002
The system shall normalize provider-specific statuses into internal states.

```text
PENDING
IN_REVIEW
APPROVED
REJECTED
EXPIRED
REQUIRES_INFORMATION
```

### FR-C-003
Eligibility shall be versioned.

```text
EligibilityDecision {
  investorId
  offeringId
  ruleVersion
  status
  reasons[]
  decidedAt
  expiresAt
  decidedBy
}
```

### FR-C-004
A compliance hold shall prevent affected transactions.

## 3. Property

Property records shall contain:

- Property ID.
- Legal owner.
- Sponsor.
- Asset type.
- Jurisdiction.
- Acquisition data.
- Valuation data.
- Due diligence state.
- Document references.
- Offering references.

## 4. Offering

An offering shall define:

- Issuer.
- Property.
- Token class.
- Token price.
- Supply.
- Currency.
- Raise target.
- Raise cap.
- Dates.
- Investor eligibility.
- Jurisdiction.
- Distribution rules.
- Fees.
- Transfer rules.
- Legal documents.

### Versioning

Material changes create a new offering version.

Historical subscriptions must retain the version used at subscription time.

## 5. Documents

Document metadata:

- Document ID.
- Type.
- Version.
- Effective date.
- SHA-256 hash.
- Storage location.
- Access policy.
- Uploaded by.
- Approval state.

## 6. Subscription

A subscription must have:

- Unique ID.
- Investor.
- Offering.
- Amount.
- Token quantity.
- Price.
- Fee.
- Payment method.
- Status.
- Idempotency key.

### Reservation

Reservations must expire automatically.

Example:

```text
availableSupply
  - activeReservations
  - issuedSupply
= remainingCapacity
```

## 7. Payment

Track:

- Payment intent.
- Provider.
- Provider reference.
- Currency.
- Amount.
- Status.
- Settlement timestamp.
- Failure reason.
- Refund state.

## 8. Token issuance

Issuance request:

```json
{
  "subscriptionId": "sub_123",
  "wallet": "0x...",
  "tokenAmount": "1000",
  "contractAddress": "0x...",
  "offeringVersion": 4,
  "idempotencyKey": "..."
}
```

## 9. Portfolio

Portfolio is a read model generated from:

- Issuance records.
- Transfers.
- Burns/redemptions.
- Distributions.
- Reconciliation results.

## 10. Notifications

Critical notifications:

- KYC approved/rejected.
- Eligibility changed.
- Payment created.
- Payment confirmed.
- Token issued.
- Transfer approved/rejected.
- Distribution paid.
- Exit initiated.
- Account restricted.

Notifications are informational only; authorization is never based on an email/SMS link.

## 11. Administration

Admins require:

- Search.
- Filtering.
- Case queues.
- Exception queues.
- Approval screens.
- Audit history.
- Export/reporting subject to permissions.

## 12. Search

Search must enforce authorization filters before returning records.

Never fetch all data and filter only in the browser.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
