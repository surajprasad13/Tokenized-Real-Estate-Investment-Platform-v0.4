# 12 — API & Integration Specification
## API & Integration Specification

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** API & Integration Specification

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Backend/frontend developers, integration partners, QA, security, DevOps |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. API conventions

Base path:

```text
/v1
```

Use JSON for normal APIs.

Headers:

```http
Authorization: Bearer <token>
Idempotency-Key: <key>
X-Correlation-Id: <id>
```

## 2. Authentication

OIDC/OAuth 2.0.

Tokens must be:

- Short lived.
- Audience restricted.
- Validated server-side.
- Revocable through session management where needed.

## 3. Investor endpoints

```http
GET /v1/me
PATCH /v1/me
GET /v1/me/compliance
GET /v1/me/eligibility
GET /v1/me/wallets
POST /v1/me/wallets/challenges
POST /v1/me/wallets/verify
DELETE /v1/me/wallets/{walletId}
```

## 4. Offering endpoints

```http
GET /v1/offerings
GET /v1/offerings/{offeringId}
GET /v1/offerings/{offeringId}/documents
GET /v1/offerings/{offeringId}/eligibility
```

## 5. Subscription endpoints

```http
POST /v1/offerings/{offeringId}/subscriptions
GET /v1/subscriptions/{subscriptionId}
POST /v1/subscriptions/{subscriptionId}/payment-intent
POST /v1/subscriptions/{subscriptionId}/cancel
```

Example request:

```json
{
  "investmentAmount": "25000.00",
  "currency": "USD",
  "walletId": "wal_123",
  "acknowledgements": [
    "RISK_DISCLOSURE_V4",
    "OFFERING_TERMS_V4"
  ]
}
```

## 6. Transfer endpoints

```http
POST /v1/transfers
GET /v1/transfers/{id}
POST /v1/transfers/{id}/cancel
```

Request:

```json
{
  "offeringId": "off_123",
  "sourceWalletId": "wal_1",
  "destinationAddress": "0x...",
  "amount": "500"
}
```

## 7. Distribution endpoints

Admin:

```http
POST /v1/admin/distributions
POST /v1/admin/distributions/{id}/calculate
GET  /v1/admin/distributions/{id}/entitlements
POST /v1/admin/distributions/{id}/approve
POST /v1/admin/distributions/{id}/execute
```

## 8. Error contract

```json
{
  "error": {
    "code": "TRANSFER_NOT_ELIGIBLE",
    "message": "The destination wallet is not eligible for this offering.",
    "requestId": "req_123"
  }
}
```

Do not reveal sensitive compliance reasoning to unauthorized users.

## 9. Idempotency

For commands that can create financial or asset state:

- Require idempotency key.
- Persist key and resulting resource.
- Return original result for retries.
- Define key retention period.

## 10. Webhooks

Webhook processing:

```text
Receive
 ↓
Verify signature
 ↓
Check timestamp/replay
 ↓
Persist raw event
 ↓
Return success quickly
 ↓
Process asynchronously
 ↓
Update domain state
```

Never perform long-running work before acknowledging a provider webhook unless provider contract requires it.

## 11. KYC adapter

```typescript
interface KycProvider {
  createCase(input: KycInput): Promise<KycCaseRef>;
  getCase(ref: string): Promise<KycStatus>;
  handleWebhook(payload: unknown, signature: string): Promise<void>;
}
```

## 12. Payment adapter

```typescript
interface PaymentProvider {
  createIntent(input: PaymentIntentInput): Promise<PaymentIntent>;
  getIntent(id: string): Promise<PaymentIntent>;
  refund(id: string, amount?: Money): Promise<Refund>;
  handleWebhook(payload: unknown, signature: string): Promise<void>;
}
```

## 13. Custody adapter

```typescript
interface CustodyProvider {
  createWallet(input: CreateWalletInput): Promise<WalletRef>;
  getWallet(ref: string): Promise<CustodyWallet>;
  createTransaction(input: CustodyTransactionInput): Promise<TransactionRef>;
  getTransaction(ref: string): Promise<CustodyTransaction>;
}
```

## 14. Blockchain adapter

```typescript
interface BlockchainGateway {
  submit(input: BlockchainTransaction): Promise<TxSubmission>;
  getReceipt(txHash: string): Promise<TxReceipt | null>;
  getFinality(txHash: string): Promise<FinalityState>;
  getEvents(filter: EventFilter): Promise<BlockchainEvent[]>;
}
```

## 15. API security

- Rate limits.
- Request size limits.
- Schema validation.
- Authentication.
- Authorization.
- Audit events for sensitive actions.
- Replay protection.
- Anti-automation controls where appropriate.

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
