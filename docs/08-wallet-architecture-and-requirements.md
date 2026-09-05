# 08 — Wallet Architecture and Requirements
## Wallet Architecture and Requirements

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Wallet Architecture and Requirements

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Security architects, blockchain developers, backend developers, compliance, operations |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Wallet strategies

### Strategy A — Investor self-custody

Pros:

- Investor controls key.
- Lower platform custody responsibility.

Cons:

- More complex UX.
- Recovery is difficult.
- Wallet mistakes can be costly.

### Strategy B — Custodial/MPC wallet

Pros:

- Better operational control.
- Recovery options.
- Institutional transaction policy.

Cons:

- Higher regulatory/operational burden.
- Vendor dependency.

### Strategy C — Hybrid

Allow approved self-custody wallets while offering custody/MPC for investors who need it.

The legal/custody model must determine the production choice.

## 2. Wallet entity

```text
Wallet
  id
  investorId
  network
  chainId
  address
  custodyType
  provider
  status
  verificationStatus
  riskStatus
  createdAt
  verifiedAt
  retiredAt
```

## 3. Wallet states

```text
CREATED
→ VERIFICATION_PENDING
→ VERIFIED
→ ACTIVE
→ RESTRICTED
→ FROZEN
→ RETIRED
```

## 4. Wallet binding

Recommended flow:

```text
Investor starts binding
       ↓
Generate challenge
       ↓
Wallet signs challenge
       ↓
Verify signature
       ↓
Validate network/address
       ↓
Run wallet risk/compliance checks
       ↓
Bind wallet
```

Never ask for:

- Seed phrase.
- Private key.
- Secret recovery phrase.

## 5. Address poisoning protection

UI should not rely only on shortened addresses.

Display:

- Full address on confirmation.
- Network.
- Token.
- Destination.
- Human-readable warning.
- Optional address book/allowlist.

## 6. Wallet replacement

Changing a wallet is sensitive.

Require:

1. Reauthentication.
2. Step-up MFA.
3. Identity verification as required.
4. Cooling-off period if policy requires.
5. Compliance checks.
6. Old-wallet restriction.
7. New-wallet verification.

## 7. MPC/custody integration

Internal interface:

```text
createAccount()
getAddress()
getAccountStatus()
createTransaction()
approveTransaction()
submitTransaction()
getTransaction()
freezeAccount()
```

The platform should never store the custody provider's private signing material.

## 8. Transaction policy

Before signing:

```text
destination allowlisted?
contract allowlisted?
function allowed?
amount below threshold?
approval count sufficient?
wallet active?
compliance valid?
```

## 9. Recovery

For a compromised wallet:

```text
Detect
 ↓
Freeze old wallet
 ↓
Open security/compliance case
 ↓
Verify investor
 ↓
Approve replacement
 ↓
Bind replacement wallet
 ↓
Execute recovery if legally/technically permitted
 ↓
Reconcile
```

## 10. Monitoring

Alert on:

- Wallet binding.
- Wallet replacement.
- Unusual transaction volume.
- High-value transaction.
- Failed signature.
- Provider risk alert.
- Transfer to unusual destination.
- Repeated compliance failures.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
