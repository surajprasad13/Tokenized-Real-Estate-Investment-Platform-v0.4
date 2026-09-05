# Income Distribution Workflow
## Income Distribution Workflow

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Income Distribution Workflow

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Finance, operations, compliance, investors, backend engineering, QA |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Objective

Calculate and pay investor entitlements using a reproducible, approved record-date snapshot.

## 2. Workflow

```text
Distribution declaration
 ↓
Record date
 ↓
Snapshot holders
 ↓
Calculate gross entitlement
 ↓
Tax/withholding calculation
 ↓
Exception review
 ↓
Finance approval
 ↓
Payment batch
 ↓
Payment confirmation
 ↓
Reconciliation
 ↓
Statements
```

## 3. Record-date snapshot

Store:

- Distribution ID.
- Record date/time.
- Token contract.
- Block/finality reference where appropriate.
- Eligible wallets.
- Token balances.
- Eligibility state.

The snapshot becomes immutable.

## 4. Calculation

Generic model:

```text
perToken = distributableAmount / eligibleTokenQuantity

investorGross = investorTokens × perToken

investorNet = investorGross - withholding - permitted deductions
```

The actual waterfall must follow the legal offering terms.

## 5. Calculation version

Every calculation stores:

```text
formulaVersion
inputSnapshotId
roundingPolicy
withholdingVersion
calculatedAt
calculatedBy
```

## 6. Approval

Use separation:

```text
prepared by Finance Operator
approved by Finance Approver
executed by authorized payment/custody process
```

## 7. Payment

Each payment receives:

- Distribution ID.
- Investor ID.
- Amount.
- Currency.
- Provider reference.
- Status.

## 8. Failed payment

States:

```text
PAYMENT_PENDING
PAYMENT_SENT
PAYMENT_CONFIRMED
PAYMENT_FAILED
PAYMENT_RETRYING
```

Never mark failed payments as complete.

## 9. Reconciliation

Compare:

```text
Distribution ledger
↔ Payment provider
↔ Bank/custody
↔ Investor entitlement
```

## 10. Completion

Only mark distribution complete when:

- Approved.
- Payment records reconciled.
- Exceptions resolved or formally carried.
- Statements generated.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
