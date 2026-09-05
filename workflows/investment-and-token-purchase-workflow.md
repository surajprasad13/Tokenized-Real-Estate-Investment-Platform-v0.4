# Investment & Token Purchase Workflow
## Investment & Token Purchase Workflow

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Investment & Token Purchase Workflow

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Investors, finance, compliance, backend/frontend developers, blockchain operations, QA |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Objective

Safely move an investor from an investment intent to a settled token position.

## 2. Sequence

```text
Investor
  ↓
Offering selection
  ↓
Eligibility check
  ↓
Terms/document acknowledgment
  ↓
Subscription creation
  ↓
Allocation reservation
  ↓
Payment intent
  ↓
Payment settlement
  ↓
Final compliance check
  ↓
Issuance authorization
  ↓
Blockchain mint
  ↓
Finality
  ↓
Ledger + portfolio reconciliation
  ↓
Investor notification
```

## 3. Eligibility precheck

Before subscription:

```text
investor approved?
eligibility current?
offering open?
wallet verified?
investment amount valid?
```

## 4. Subscription reservation

Reservation record:

```text
reservationId
subscriptionId
quantity
expiresAt
```

The reservation must be atomically considered when calculating remaining inventory.

## 5. Payment

The payment provider is authoritative for provider settlement state.

Do not trust:

- Browser redirect.
- Client callback.
- Screenshot.
- User-provided transaction ID.

## 6. Final compliance check

Revalidate before issuance because eligibility can change between subscription and payment.

## 7. Mint request

Create unique issuance ID:

```text
ISSUE:<subscription-id>:<version>
```

This prevents duplicate minting.

## 8. Blockchain execution

```text
Create tx
→ approval
→ sign
→ submit
→ monitor
→ finality
```

## 9. Reconciliation

After finality:

- Confirm token balance.
- Confirm transaction.
- Confirm internal holding.
- Confirm ledger entries.
- Mark subscription complete.

## 10. Failure scenarios

### Payment succeeds, mint fails

Keep payment as settled.

Subscription becomes:

```text
ISSUANCE_EXCEPTION
```

Retry issuance safely.

### Mint succeeds, API times out

Do not mint again.

Query chain using issuance reference and reconcile.

### Payment provider webhook duplicated

Idempotently process the event.

### Investor becomes restricted

Stop issuance and create compliance exception.

## 11. Investor communication

Statuses:

```text
Payment required
Payment processing
Payment received
Token settlement pending
Investment complete
Action required
```

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
