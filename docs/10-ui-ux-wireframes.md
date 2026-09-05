# 10 — UI/UX Wireframes
## UI/UX Wireframes

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** UI/UX Wireframes

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Product owners, UX/UI designers, frontend developers, QA, implementation partners |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Experience principles

### P-UX-01 Clarity

Use human-readable states:

> “Payment received — waiting for token settlement.”

rather than:

> `TX_STATUS=0x1`

### P-UX-02 Explicit risk

Important risks and fees must be visible before confirmation.

### P-UX-03 No false certainty

Do not show “Completed” until the relevant backend state is actually complete.

### P-UX-04 Progressive disclosure

Show simple information first; expose transaction hashes and technical details on demand.

## 2. Investor dashboard

```text
┌────────────────────────────────────────────────────────────┐
│ Logo     Opportunities   Portfolio   Activity   Documents │
├────────────────────────────────────────────────────────────┤
│ Portfolio value     Invested          Distributions        │
│ $250,000            $220,000          $18,500              │
├────────────────────────────────────────────────────────────┤
│ Holdings                                                   │
│                                                            │
│ Property A     1,250 tokens    $125,000     Active          │
│ Property B       500 tokens     $95,000     Active          │
├────────────────────────────────────────────────────────────┤
│ Recent activity                                            │
│ Subscription confirmed                         Sep 01       │
│ Distribution paid                              Aug 15       │
└────────────────────────────────────────────────────────────┘
```

## 3. Offering page

Sections:

1. Property overview.
2. Investment thesis.
3. Financial summary.
4. Token terms.
5. Fees.
6. Distribution policy.
7. Risks.
8. Documents.
9. Eligibility.
10. Investment form.

## 4. Investment confirmation

Must display:

```text
Investment amount
Token quantity
Price per token
Platform fee
Other applicable fees
Payment method
Offering version
Expected settlement
Key risks
Required acknowledgments
```

Confirmation should require explicit affirmative action.

## 5. Portfolio detail

Show:

- Token balance.
- Acquisition history.
- Distribution history.
- Transfer history.
- Current status.
- Documents.
- Blockchain transaction references.

## 6. Transfer UX

```text
From:
My Wallet A

To:
0x1234...ABCD
[Verify destination]

Asset:
Property A Token

Amount:
[ 500 ]

Checks:
✓ Wallet verified
✓ Recipient eligible
✓ Offering permits transfer
✓ Holding period satisfied

[Request Transfer]
```

## 7. Compliance status

Investor dashboard should clearly show:

```text
Identity verification     ✓ Approved
Eligibility               ✓ Eligible
Wallet                    ✓ Verified
Tax documentation         ⚠ Action required
```

## 8. Admin compliance queue

Columns:

```text
Case ID | Investor | Case Type | Risk | Status | Age | Assignee
```

Actions require reason and audit trail.

## 9. Finance dashboard

```text
Subscriptions
Payments awaiting reconciliation
Distribution batches
Failed payments
Ledger exceptions
Blockchain reconciliation
```

## 10. Accessibility

Target WCAG 2.2 AA.

Requirements:

- Keyboard support.
- Focus management.
- Semantic headings.
- Form labels.
- Accessible error messages.
- Screen-reader status updates.
- No color-only status communication.
- Responsive design.

## 11. Error states

Every workflow should provide:

### Action required

> “We need additional information to complete your verification.”

### Processing

> “Your payment was received. Token settlement is in progress.”

### Failed

> “The transaction could not be completed. No duplicate payment was created.”

### Restricted

> “This transaction requires compliance review.”

## 12. Confirmation safety

For irreversible/high-risk actions:

- Show complete destination.
- Show amount.
- Show asset.
- Show network.
- Show fees.
- Require explicit confirmation.
- Use step-up authentication.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
