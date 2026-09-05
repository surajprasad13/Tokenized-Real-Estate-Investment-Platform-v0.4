# 03 — User Roles and Permissions
## User Roles and Permissions

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** User Roles and Permissions

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Product owners, security architects, developers, compliance, operations |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Authorization model

Use a combination of:

- RBAC.
- Resource-level permissions.
- Organization scoping.
- Offering scoping.
- Jurisdiction rules.
- Transaction-risk thresholds.
- Approval workflows.

A role alone should not be sufficient to execute a high-risk transaction.

## 2. Roles

| Role | Read | Write | Approve | Financial execution |
|---|---|---|---|---|
| Investor | Own data | Own data | No | Own purchases only |
| Support | Limited customer data | Limited | No | No |
| Compliance Analyst | Compliance scope | Case notes | Limited | No |
| Compliance Officer | Compliance scope | Decisions | Yes | No |
| Sponsor Manager | Sponsor scope | Offerings | Limited | No |
| Finance Operator | Finance scope | Reconciliation | Prepare | Limited |
| Finance Approver | Finance scope | Approval | Yes | No independent creation |
| Blockchain Operator | Chain scope | Queue jobs | No | Controlled |
| Custody Operator | Custody scope | Signing requests | Dual control | Controlled |
| Auditor | Read-only | No | No | No |
| Platform Admin | System scope | Configuration | Limited | No by default |
| Emergency Admin | Restricted | Emergency | Dual control | Emergency only |

## 3. Separation of duties

The following should normally be split:

```text
Create payment batch
        ≠
Approve payment batch
        ≠
Execute payment batch
```

And:

```text
Prepare contract upgrade
        ≠
Approve upgrade
        ≠
Execute upgrade
```

And:

```text
Create distribution
        ≠
Approve distribution
        ≠
Release funds
```

## 4. Permission naming

Use granular permission identifiers:

```text
investor.read.self
investor.update.self
offering.read
offering.create
offering.update
offering.publish
compliance.case.read
compliance.case.decide
wallet.bind
wallet.freeze
subscription.create
subscription.approve
payment.reconcile
distribution.create
distribution.approve
distribution.execute
token.mint.request
token.mint.approve
token.mint.execute
token.burn.request
transfer.request
transfer.approve
transfer.execute
contract.upgrade.request
contract.upgrade.approve
contract.upgrade.execute
```

## 5. Contextual policy

Example:

```text
ALLOW transfer.execute
IF
  actor has transfer.execute
  AND transfer.status = APPROVED
  AND approval.notExpired
  AND actor is not original approver
  AND destination is approved
  AND contract address is allowlisted
  AND environment = production
```

## 6. Emergency access

Emergency access must:

- Be time limited.
- Require explicit reason.
- Trigger enhanced audit logging.
- Notify security/compliance.
- Be reviewed after use.

## 7. API authorization

Authorization must happen server-side. The UI hiding a button is not a security control.

## 8. Service authorization

Internal services must authenticate independently.

Do not rely on:

```text
frontend → API → service
```

as proof of identity for downstream services.

Use workload identity, signed service credentials, or equivalent controls.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
