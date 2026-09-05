# Property Exit Workflow
## Property Exit Workflow

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Property Exit Workflow

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Sponsors, asset managers, finance, compliance, investors, engineering, operations |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Objective

Close a tokenized property investment in accordance with its legal and financial terms.

## 2. Workflow

```text
Exit decision
 ↓
Sale process
 ↓
Closing
 ↓
Proceeds confirmation
 ↓
Waterfall calculation
 ↓
Investor snapshot
 ↓
Final entitlements
 ↓
Payment
 ↓
Token redemption/burn
 ↓
Reconciliation
 ↓
Offering closure
```

## 3. Exit planning

Record:

- Exit reason.
- Expected date.
- Sale price.
- Costs.
- Liabilities.
- Approval requirements.
- Investor communications.

## 4. Closing

Only treat proceeds as available when confirmed by finance/custody records.

## 5. Waterfall

Generic:

```text
Gross sale proceeds
- closing costs
- permitted liabilities
- taxes/withholding
- other contractually permitted expenses
= distributable proceeds
```

Exact waterfall must be taken from approved legal documents.

## 6. Holder snapshot

Use a legally defined record-date method.

Do not calculate final ownership from mutable UI state.

## 7. Settlement

For each holder:

1. Determine eligible balance.
2. Calculate gross entitlement.
3. Apply deductions/withholding.
4. Create payment.
5. Confirm payment.
6. Record settlement.
7. Redeem/burn or otherwise settle token according to legal structure.

## 8. Token closure

Possible final state:

```text
ACTIVE
→ REDEMPTION_OPEN
→ REDEEMED
→ CLOSED
```

Transfers should be disabled at the appropriate stage.

## 9. Exceptions

Examples:

- Investor account restricted.
- Payment destination invalid.
- Missing tax information.
- Custody provider unavailable.
- Token balance mismatch.
- Unclaimed proceeds.

Each exception requires an owner and resolution state.

## 10. Final reporting

Generate:

- Investor final statement.
- Distribution report.
- Token supply report.
- Ledger reconciliation.
- Payment reconciliation.
- Audit package.
- Required tax/regulatory reporting.

## 11. Closure gate

Offering cannot be marked closed until:

```text
all required proceeds accounted for
AND
all eligible settlement records created
AND
token state reconciled
AND
financial ledger reconciled
AND
required reports generated
```

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
