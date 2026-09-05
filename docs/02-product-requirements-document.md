# 02 — Product Requirements Document
## Product Requirements Document

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Product Requirements Document

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Product owners, development teams, QA, compliance, finance, implementation partners |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Product goals

### G-01
Allow eligible investors to access approved tokenized real-estate opportunities.

### G-02
Automate administrative workflows while retaining human approval for regulated or high-risk decisions.

### G-03
Create a verifiable relationship between an investor, a legal interest, an internal ledger position, and a blockchain token position.

### G-04
Provide operational tooling for sponsors, finance, compliance, and support.

## 2. Personas

### P-01 Investor

Needs to:

- Understand an offering.
- Complete onboarding.
- Prove eligibility.
- Invest.
- View ownership.
- Receive distributions.
- Request permitted transfers.
- Download statements.

### P-02 Sponsor

Needs to:

- Create property records.
- Configure offerings.
- Upload documents.
- Monitor fundraising.
- Initiate distributions.
- Manage exit events.

### P-03 Compliance Analyst

Needs to:

- Review KYC/AML cases.
- Investigate alerts.
- Approve eligibility.
- Place restrictions.
- Review transfers.

### P-04 Finance Operator

Needs to:

- Reconcile payments.
- Verify subscriptions.
- Prepare distributions.
- Resolve payout exceptions.
- Produce reports.

### P-05 Platform Administrator

Needs to:

- Manage users.
- Configure non-financial settings.
- Maintain integrations.
- Monitor system health.

## 3. Functional epics

### EPIC-01 Identity

Requirements:

- Email verification.
- MFA.
- Session/device management.
- Account recovery.
- Profile management.

Acceptance:

- Unverified accounts cannot perform investment actions.
- Sensitive actions require step-up authentication.

### EPIC-02 Compliance

Requirements:

- KYC.
- AML/sanctions.
- Eligibility.
- Document evidence.
- Manual review.
- Reverification.

Acceptance:

- No investment may proceed without the required current approval state.

### EPIC-03 Marketplace

Requirements:

- Offering list.
- Filters.
- Eligibility-aware visibility.
- Offering detail.
- Document viewer.

Acceptance:

- Investors cannot receive a false impression that a restricted offering is available to them.

### EPIC-04 Subscription

Requirements:

- Amount selection.
- Token calculation.
- Allocation reservation.
- Payment instruction.
- Confirmation.
- Issuance.

Acceptance:

- Duplicate requests cannot produce duplicate allocations.

### EPIC-05 Portfolio

Requirements:

- Holdings.
- Cost basis.
- Transaction history.
- Distribution history.
- Documents.
- Current/estimated valuation where available.

Acceptance:

- Blockchain and internal records are reconcilable.

### EPIC-06 Transfers

Requirements:

- Destination wallet.
- Compliance check.
- Transfer restriction check.
- Approval.
- Blockchain submission.
- Confirmation.

Acceptance:

- Invalid transfers fail before signing whenever possible.

### EPIC-07 Distributions

Requirements:

- Record-date snapshot.
- Entitlement calculation.
- Withholding inputs.
- Approval.
- Payment.
- Reconciliation.

Acceptance:

- Calculation is reproducible from a stored snapshot and calculation version.

### EPIC-08 Exit

Requirements:

- Sale record.
- Proceeds.
- Waterfall.
- Final distribution.
- Redemption/burn.
- Closure.

## 4. State machines

### Investor

```text
CREATED
  → EMAIL_VERIFIED
  → PROFILE_COMPLETE
  → KYC_PENDING
  → KYC_REVIEW
  → APPROVED
  → RESTRICTED
  → CLOSED
```

Rejected/restricted states must have explicit remediation paths.

### Offering

```text
DRAFT
→ DUE_DILIGENCE
→ COMPLIANCE_REVIEW
→ APPROVED
→ SCHEDULED
→ OPEN
→ FUNDED
→ ACTIVE
→ EXITING
→ CLOSED
```

### Subscription

```text
CREATED
→ RESERVED
→ PAYMENT_PENDING
→ PAYMENT_CONFIRMED
→ ISSUANCE_PENDING
→ ISSUED
→ RECONCILING
→ COMPLETED
```

## 5. Business rules

### BR-001 Eligibility

Eligibility must be evaluated against:

- Investor status.
- Offering status.
- Jurisdiction.
- Investor type.
- Offering-specific requirements.
- Current rule version.

### BR-002 Allocation

The system must not allocate more tokens than the offering's available issuance capacity.

### BR-003 Payment

A client-side success message is never proof of payment.

### BR-004 Issuance

Minting requires both application authorization and contract-level authorization.

### BR-005 Transfer

Transfer approval must expire after a configured period.

### BR-006 Distribution

Entitlements are based on the legally defined record-date methodology.

## 6. Non-functional product expectations

- Mobile-responsive investor interface.
- Accessible forms.
- Clear financial disclosures.
- Transparent asynchronous transaction states.
- Downloadable statements.
- Full audit history for administrators.

## 7. Out of scope for MVP

- Permissionless trading.
- Anonymous wallets.
- Automated legal interpretation.
- Cross-chain bridging.
- Complex derivatives.
- Unreviewed third-party token listings.
- Public order-book trading.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
