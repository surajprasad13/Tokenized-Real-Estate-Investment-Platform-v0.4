# Tokenized Real Estate Investment Platform
## Project Repository & Documentation Guide

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Project Repository & Documentation Guide

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Project owners, architects, developers, implementation partners |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

**Engineering/Product Specification — v0.2**

## Purpose

This repository defines a production-oriented blueprint for a platform that enables eligible investors to discover, subscribe to, hold, transfer where legally permitted, receive distributions from, and ultimately exit tokenized real-estate investments.

This is intentionally designed as a **regulated-asset platform** rather than a generic cryptocurrency application. Blockchain provides programmable ownership and settlement; it does not replace securities, tax, AML/KYC, custody, payments, accounting, or real-estate controls.

> **Legal disclaimer:** This repository is a technical and product specification. It is not legal, tax, accounting, investment, or regulatory advice. The live implementation must be reviewed and approved by qualified counsel and compliance professionals for every jurisdiction and offering structure.

## Repository Branch Structure

The repository is organized into two primary branches: `master` and `refer`. The `master` branch contains the controlled product and engineering documentation used for the platform implementation. The `refer` branch is a research/reference branch containing the project NDA and the five reference essays used to inform the platform design.

```text
Tokenized-Real-Estate-Investment-Platform/
│
├── master/
│   ├── README.md
│   ├── docs/
│   │   ├── 01-executive-summary.md
│   │   ├── 02-product-requirements-document.md
│   │   ├── 03-user-roles-and-permissions.md
│   │   ├── 04-functional-requirements.md
│   │   ├── 05-technical-architecture.md
│   │   ├── 06-blockchain-architecture.md
│   │   ├── 07-smart-contract-logic-specification.md
│   │   ├── 08-wallet-architecture-and-requirements.md
│   │   ├── 09-data-model.md
│   │   ├── 10-ui-ux-wireframes.md
│   │   ├── 11-non-functional-requirements.md
│   │   ├── 12-api-and-integration-specification.md
│   │   ├── 13-security-and-key-management.md
│   │   ├── 14-timeline-milestones.md
│   │   ├── 15-legal-commercial-and-compliance.md
│   │   ├── architecture-decision-records.md
│   │   └── review-checklist.md
│   └── workflows/
│       ├── investor-lifecycle.md
│       ├── property-tokenization-workflow.md
│       ├── investment-and-token-purchase-workflow.md
│       ├── token-transfer-workflow.md
│       ├── income-distribution-workflow.md
│       └── property-exit-workflow.md
│
└── refer/
    ├── NDA.docx
    └── refer/
        ├── 01-A-Sharing-Economy-Architecture-for-Blockchain-Based-Real-Estate-Tokenization.pdf
        ├── 02-My-Real-Estate-Revolutionizing-Real-Estate-Transactions-and-Ownership-Management-with-Blockchain-and-NFT.pdf
        ├── 03-Tokenization-of-Real-Estate-Assets.pdf
        ├── 04-Tokenization-of-Real-Estate.pdf
        └── 05-Tokenization-of-Real-Estate-Using-Blockchain-Technology.pdf
```

### Master branch

`master` is the authoritative implementation branch. Requirements, architecture, workflows, data models, APIs, security controls, and compliance specifications in this branch define the current project baseline. Changes to the implementation baseline should follow the documentation change-control rules.

### Refer branch

`refer` is a controlled research and reference branch. It is intentionally separated from the implementation baseline so that academic papers, research material, and confidentiality documents do not become implementation requirements merely by being present in the repository. Reference material may inform architecture decisions, but adopted requirements must be explicitly incorporated into the appropriate `master` documentation and reviewed.

### Reference essays

The reference branch contains five real-estate/blockchain research essays supplied for this project:

1. **A Sharing Economy Architecture for Blockchain-Based Real Estate Tokenization** — discusses a sharing-economy tokenization model, stakeholder responsibilities, governance, compliance, metadata visibility, token standards, and lifecycle design. fileciteturn2file0L1-L6
2. **My Real Estate: Revolutionizing Real Estate Transactions and Ownership Management with Blockchain and NFT**
3. **Tokenization of Real Estate Assets**
4. **Tokenization of Real Estate**
5. **Tokenization of Real Estate Using Blockchain Technology** — describes blockchain, Ethereum, smart contracts, tokenization, and crowdfunding-oriented real-estate investment concepts. fileciteturn1file0L4-L24

The research materials support the project's conceptual foundation around fractional investment, transparency, blockchain-based records, smart contracts, and tokenized real-estate economic rights. They are reference material only; they do not supersede legal/compliance requirements or the approved product and architecture specifications. Research also identifies KYC/AML-gated transfers, revenue distribution, governance, and token-standard selection as important architectural concerns. fileciteturn1file5L400-L413 fileciteturn1file6L508-L529

### NDA

`NDA.docx` is maintained in the `refer` branch as the confidentiality-document template for project participants. It must be customized and reviewed by qualified counsel before execution.

## Repository philosophy

The documents are organized in dependency order:

```text
Business/Product
      ↓
Roles & Functional Requirements
      ↓
Technical Architecture
      ↓
Blockchain / Wallet / Smart Contracts
      ↓
Data / UX / API
      ↓
Security / NFR / Delivery
      ↓
Legal & Compliance
      ↓
Operational Workflows
```

## Reference architecture

```text
                     ┌──────────────────────────────┐
                     │ Web / Mobile / Admin Portal  │
                     └──────────────┬───────────────┘
                                    │
                         CDN / WAF / API Gateway
                                    │
                     ┌──────────────▼───────────────┐
                     │     Application Platform     │
                     │ Auth | API | Domain Services │
                     └──────────────┬───────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
  ┌───────▼────────┐       ┌────────▼────────┐       ┌───────▼────────┐
  │ Compliance     │       │ Investment      │       │ Financial      │
  │ KYC/AML        │       │ Offering/Order  │       │ Ledger/Payment │
  └───────┬────────┘       └────────┬────────┘       └───────┬────────┘
          │                         │                         │
          └─────────────────────────┼─────────────────────────┘
                                    │
                         Event Bus / Workflow Engine
                                    │
             ┌──────────────────────┼───────────────────────┐
             │                      │                       │
      ┌──────▼───────┐       ┌──────▼────────┐       ┌──────▼─────────┐
      │ PostgreSQL   │       │ Object Storage │       │ Blockchain     │
      │ System of   │       │ Documents      │       │ Contracts      │
      │ Record      │       │               │       │ + Indexer      │
      └──────────────┘       └───────────────┘       └──────┬─────────┘
                                                            │
                                                   Custody / MPC / RPC
```

## Core principles

### 1. Compliance is a first-class domain

Eligibility, jurisdiction, investor status, wallet status, transfer restrictions, and required approvals are part of the transaction model.

### 2. Blockchain is not the entire system of record

The blockchain is authoritative for on-chain token state. The application database is authoritative for identity, compliance, documents, workflows, accounting metadata, and operational state. A reconciliation layer detects divergence.

### 3. Never put sensitive PII on-chain

No passport scans, addresses, bank details, KYC case notes, or other unnecessary personal data belongs on a public blockchain.

### 4. Financial state uses a ledger

Do not build the financial system around mutable `balance` fields. Use an append-oriented double-entry ledger and derive balances.

### 5. All important commands are idempotent

Payment webhooks, blockchain events, API requests, and background jobs can arrive more than once.

### 6. High-risk operations use dual control

No individual operator should be able to independently create, approve, and execute high-risk asset movement.

## Initial technology baseline

These are reference choices and may be changed after architecture review:

- Frontend: Next.js/React + TypeScript.
- Backend: TypeScript/Node.js.
- Database: PostgreSQL.
- Cache: Redis.
- Queue/eventing: managed durable messaging.
- Object storage: S3-compatible storage.
- Blockchain: EVM-compatible network selected through documented evaluation.
- Smart contracts: Solidity.
- Cloud: AWS-style managed infrastructure.
- Infrastructure as code: Terraform or equivalent.
- Authentication: OIDC/OAuth 2.0 + MFA.
- KYC/AML: external provider behind an adapter.
- Payments: regulated provider behind an adapter.
- Custody: MPC/HSM/custodian integration behind an adapter.
- Observability: OpenTelemetry-compatible telemetry.
- CI/CD: Git-based pipeline with staged production approval.

## Environment model

| Environment | Purpose | Real assets? |
|---|---|---:|
| local | Developer work | No |
| dev | Shared development | No |
| staging | Production-like testing | No |
| preprod | Final release validation | No |
| production | Live users/assets | Yes |
| DR | Recovery | No live signing |

Production secrets and signing credentials must never be copied into lower environments.

## Definition of done

A production feature requires:

- Product acceptance criteria.
- Unit tests.
- Integration tests.
- E2E coverage for critical paths.
- Security review.
- Observability.
- Audit events.
- Failure/retry behavior.
- Migration/recovery plan.
- Compliance/legal dependency assessment.
- Operational runbook.
- Rollback or forward-recovery strategy.

## Suggested implementation sequence

1. Legal/compliance structure.
2. Domain model and state machines.
3. Identity and onboarding.
4. Offering management.
5. Financial ledger.
6. Payment integration.
7. Wallet/custody integration.
8. Smart contracts.
9. Subscription and issuance.
10. Transfers.
11. Distributions.
12. Exit/redemption.
13. Reconciliation.
14. Security hardening.
15. Production launch.

## Critical launch principle

A token being technically transferable is not sufficient to make the transfer legally or operationally valid. The application, compliance engine, custody layer, and smart contract must enforce the same business intent.


## Documentation Governance

The Markdown documents in this repository are treated as controlled project specifications rather than informal notes. Each document has a defined purpose, audience, version, review status, and relationship to the rest of the specification set.

### Change control

- Requirements changes must identify the affected functional requirements, workflows, data entities, API contracts, and acceptance criteria.
- Architecture changes must be recorded in the Architecture Decision Records and reflected in the relevant technical documents.
- Smart-contract changes require review of token invariants, authorization rules, deployment procedures, upgrade policy, and regression tests before approval.
- Legal or regulatory changes must be reflected in eligibility, transfer restrictions, disclosures, operational controls, and audit requirements.
- Security-sensitive changes require threat-model review and, where appropriate, independent security assessment.

### Implementation rule

No production implementation should rely on an isolated document. Engineers should trace a feature from the PRD and functional requirements through the applicable workflow, data model, API contract, security controls, and acceptance criteria. This traceability is intended to reduce ambiguity between product, legal/compliance, and engineering decisions.

### Controlled-document convention

All formal documents use the same classification, project identification, document-control table, and footer convention. The date shown in a document header identifies the current issued revision of that document; implementation teams should record actual approval and deployment dates separately in project tracking systems.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
