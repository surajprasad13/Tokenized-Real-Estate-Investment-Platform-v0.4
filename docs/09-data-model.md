# 09 — Data Model
## Data Model

---

**Classification:** Confidential — For Recipients and Authorized Parties Only  
**Project:** Tokenized Real Estate Investment Platform (TREIP)  
**Document Type:** Data Model

| Document Control | |
|------------------|---|
| **Version** | 1.0 |
| **Date** | 09.01.2026 |
| **Status** | Issued for Review |
| **Audience** | Backend developers, database engineers, solution architects, QA, data/security reviewers |

*This document is part of a formal project documentation set. It is intended for authorized stakeholders, clients, implementation partners, and delivery teams participating in the Tokenized Real Estate Investment Platform initiative. Distribution beyond authorized recipients requires prior written consent.*

---

## 1. Data ownership

The system distinguishes:

### Source-of-truth data

- User identity records.
- Compliance case state.
- Legal offering terms.
- Accounting ledger entries.
- Blockchain transaction records as observed from chain.

### Derived data

- Portfolio balances.
- Dashboard totals.
- Search indexes.
- Reporting aggregates.

Derived data must be rebuildable.

## 2. Core relational model

```text
users
  ├── investor_profiles
  ├── wallets
  ├── compliance_cases
  ├── eligibility_decisions
  ├── subscriptions
  └── organization_memberships

properties
  └── offerings
       ├── token_classes
       ├── offering_versions
       ├── documents
       ├── subscriptions
       ├── holdings
       ├── transfers
       ├── distributions
       └── exits
```

## 3. users

```text
id UUID PK
email CITEXT UNIQUE
status
email_verified_at
mfa_enabled
created_at
updated_at
```

## 4. investor_profiles

```text
id UUID PK
user_id FK
investor_type
legal_name
jurisdiction
country_of_residence
status
created_at
updated_at
```

Sensitive fields should be minimized and encrypted where appropriate.

## 5. wallets

```text
id UUID PK
investor_id FK
network
chain_id
address
custody_type
provider
status
verification_status
verified_at
created_at
```

Unique constraint:

```text
(network, chain_id, normalized_address)
```

## 6. properties

```text
id UUID PK
sponsor_id FK
legal_name
asset_type
jurisdiction
status
valuation_amount
valuation_currency
acquisition_date
created_at
updated_at
```

## 7. offerings

```text
id UUID PK
property_id FK
issuer_entity_id
status
currency
target_amount
maximum_amount
token_price
token_supply
chain_id
contract_address
current_version
start_at
end_at
created_at
```

## 8. offering_versions

```text
id UUID PK
offering_id FK
version_number
terms_json
transfer_rules_json
eligibility_rules_json
effective_at
created_by
approved_by
approved_at
```

Never overwrite a version used by a completed transaction.

## 9. subscriptions

```text
id UUID PK
offering_id FK
investor_id FK
amount
currency
token_quantity
price_per_token
fee_amount
status
reservation_expires_at
payment_id
idempotency_key UNIQUE
created_at
updated_at
```

## 10. ledger

Use:

```text
ledger_accounts
ledger_transactions
ledger_entries
```

Each transaction contains at least two entries.

Example:

```text
Transaction: SUBSCRIPTION_CONFIRMED

Debit:
  Cash/Receivable

Credit:
  Investor Subscription Liability
```

The exact chart of accounts requires finance/accounting design.

## 11. blockchain_transactions

```text
id
chain_id
tx_hash
contract_address
from_address
to_address
nonce
status
block_number
block_hash
finality_status
gas_used
error_code
created_at
confirmed_at
```

Unique:

```text
(chain_id, tx_hash)
```

## 12. transfers

```text
id
offering_id
from_wallet_id
to_wallet_id
quantity
status
compliance_decision_id
blockchain_transaction_id
authorization_expires_at
created_at
settled_at
```

## 13. distributions

```text
id
offering_id
record_date
currency
gross_amount
calculation_version
status
approved_at
completed_at
```

## 14. distribution_entitlements

```text
id
distribution_id
investor_id
wallet_id
eligible_tokens
gross_amount
withholding_amount
net_amount
payment_status
payment_reference
```

## 15. audit_events

```text
id
event_type
actor_type
actor_id
resource_type
resource_id
action
reason
correlation_id
metadata_json
created_at
```

Audit records should be append-only from the application's perspective.

## 16. Data retention

Retention must be defined by:

- Legal requirement.
- Compliance requirement.
- Accounting requirement.
- Privacy requirement.
- Operational necessity.

Do not implement one global retention period for every data class.

## 17. Indexing

Likely indexes:

```text
users(email)
wallets(chain_id, address)
subscriptions(investor_id, status)
subscriptions(offering_id, status)
transfers(offering_id, status)
blockchain_transactions(tx_hash)
audit_events(resource_type, resource_id)
eligibility_decisions(investor_id, offering_id)
```

---

*This document should be read together with the related requirements, architecture, security, legal/compliance, data model, API, and workflow documents referenced by the documentation index. Where requirements conflict, the approved product requirements, legal/compliance constraints, and formally accepted architecture decisions take precedence.*

*Document date: 09.01.2026 | Tokenized Real Estate Investment Platform (TREIP) | Confidential*
