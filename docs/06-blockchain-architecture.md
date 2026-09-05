# 06 — Blockchain Architecture
## Blockchain Architecture

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Blockchain Architecture

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Blockchain engineers, solution architects, security, DevOps, technical evaluators |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Purpose of blockchain

The blockchain layer provides:

- Token ownership.
- Transfer history.
- Mint/burn events.
- Programmable restrictions.
- Cryptographic settlement evidence.

It does not provide:

- KYC.
- Legal interpretation.
- Tax calculations.
- Private investor identity.
- Bank settlement.
- Property title.

## 2. Network evaluation

Score candidate networks on:

| Criterion | Weight |
|---|---:|
| Finality/reliability | High |
| Custody support | High |
| Smart-contract maturity | High |
| Cost | Medium |
| Ecosystem | Medium |
| RPC reliability | High |
| Stablecoin support | Medium |
| Institutional tooling | High |
| Upgrade/governance model | High |

Do not select a network solely because its transaction fees are low.

## 3. Contract topology

```text
                 ┌───────────────────┐
                 │ Offering Registry │
                 └─────────┬─────────┘
                           │
                 ┌─────────▼─────────┐
                 │ Security Token    │
                 ├───────────────────┤
                 │ Mint/Burn         │
                 │ Restricted xfer   │
                 │ Freeze/Pause      │
                 └─────────┬─────────┘
                           │
                 ┌─────────▼─────────┐
                 │ Eligibility       │
                 │ Registry / Policy │
                 └───────────────────┘
```

## 4. On-chain/off-chain mapping

```text
On-chain:
  chainId
  contractAddress
  tokenId/class
  wallet
  balance
  txHash
  block
  event

Off-chain:
  investorId
  legal identity
  KYC
  eligibility evidence
  subscription
  bank account
  tax information
  documents
```

## 5. Address registry

Maintain a controlled registry:

```text
ContractRegistry
  network
  chainId
  contractType
  address
  version
  deploymentTx
  deployedAt
  status
```

Only approved contract addresses may receive production transaction requests.

## 6. Indexer

Indexer responsibilities:

1. Discover blocks/events.
2. Decode contract events.
3. Store raw blockchain event.
4. Store normalized event.
5. Handle duplicate delivery.
6. Handle reorgs.
7. Mark finality.
8. Publish internal domain events.

## 7. Reorg handling

Never immediately treat an unfinalized block as permanent.

State:

```text
SEEN
→ INCLUDED
→ CONFIRMING
→ FINAL
```

If reorged:

```text
REORGED
→ REPROCESS
```

## 8. Gas management

Gas policy must define:

- Funding wallet.
- Maximum gas price.
- Retry policy.
- Replacement transaction rules.
- Nonce management.
- Balance monitoring.
- Emergency refill.

## 9. Blockchain transaction state

```text
CREATED
→ SIGNING
→ SUBMITTED
→ INCLUDED
→ CONFIRMING
→ FINAL
```

Failure states:

```text
SIGNING_FAILED
SUBMISSION_FAILED
REVERTED
DROPPED
REORGED
```

## 10. Emergency controls

Monitor and alert on:

- Unexpected mint.
- Unexpected burn.
- Unexpected role change.
- Pause state changes.
- Upgrade.
- Large transfer.
- Contract balance anomalies.
- Indexer lag.

## 11. Chain abstraction

The domain should not directly depend on EVM-specific code.

```text
BlockchainGateway
  submitTransaction()
  getReceipt()
  getFinality()
  getBalance()
  getEvents()
```

The EVM implementation sits underneath this interface.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
