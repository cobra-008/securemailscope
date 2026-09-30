# SECUREMAILSCOPE

> **Temporal Cryptographic Posture Engine for Email Security**

*Passive PCAP Analysis • Explainable Risk Intelligence • Historical Posture Tracking*

---

## Project Overview

SecureMailScope is a passive email-security analysis system designed to reconstruct and assess the cryptographic posture visible in recorded SMTP, IMAP and POP3 network traffic. Instead of actively probing a live mail server, the system works from PCAP evidence and extracts observable protocol, TLS handshake, certificate and cryptographic characteristics.

The central idea is to move beyond a one-time answer such as "is TLS enabled?" and build a historical view of how a mail server's security posture behaves across observed sessions. SecureMailScope combines deterministic security rules, machine-learning-assisted risk and anomaly analysis, explainability, and historical posture tracking.

### Core Differentiation

- **PASSIVE** — works from recorded network evidence rather than requiring active server probing.
- **EXPLAINABLE** — findings are connected to observable features and rule/model explanations.
- **TEMPORAL** — repeated observations can be compared to identify posture changes and drift.

> *"From what happened on the wire → to how the server's security posture is changing."*

---

## Problem Statement

### EMAIL SECURITY IS MORE THAN "TLS ENABLED"

Email infrastructure can expose multiple security decisions across SMTP, IMAP and POP3. A server may support encrypted communication while still exhibiting protocol-version, certificate, cryptographic or transition-related issues. Therefore, simply checking whether TLS appears in a connection is not sufficient to describe the complete observed cryptographic posture.

### Key Problems

- SMTP / IMAP / POP3 create different protocol paths and security transitions.
- STARTTLS introduces a visible transition from an initially non-TLS protocol conversation into TLS.
- The observed TLS handshake can expose version and cryptographic characteristics that need policy evaluation.
- X.509 certificates contain additional security-relevant information such as validity, key and signature attributes.
- A single PCAP provides a session-level observation, while security posture is better understood across repeated observations.
- A raw packet capture contains evidence, but an analyst still needs structured findings and prioritization.

### Target Outcome Pipeline

```
RAW PCAP → SESSION UNDERSTANDING → POSTURE ASSESSMENT → EXPLAINABLE RISK → HISTORY → PRIORITIZED FINDINGS
```

### Existing Tool Gap

| Tool / Approach | Primary Strength | Gap Addressed by SecureMailScope |
|---|---|---|
| Wireshark | Packet visibility and protocol dissection | Requires analyst interpretation and does not itself provide a temporal posture engine. |
| testssl.sh / SSL Labs | Active TLS configuration testing | Designed around active assessment rather than passive historical PCAP evidence. |
| **SecureMailScope** | Passive PCAP + explainable risk + temporal posture | Connects recorded mail traffic to findings and historical server behavior. |

> *"Existing tools answer different questions."*
> SecureMailScope is designed to connect recorded mail traffic with explainable security findings and historical posture tracking, creating a workflow from packet evidence to security decision support.

---

## Technical Approach

### FROM PACKETS TO SECURITY POSTURE

The processing pipeline is intentionally modular. Each stage produces structured output that can be validated independently before being passed to the next stage.

```
01 OBSERVE       →  PCAP INPUT  |  SMTP • IMAP • POP3
                    Recorded traffic only; no active probing.

02 RECONSTRUCT   →  TCP STREAM
                    Reassemble relevant TCP sessions before protocol and TLS analysis.

03 STARTTLS      →  DETECT SECURITY TRANSITION
                    Identify whether TLS was established, not established, or whether
                    observable downgrade indicators are present.

04 INSPECT TLS   →  HANDSHAKE + X.509
                    Extract observable TLS version, cipher/crypto parameters, key exchange,
                    certificate validity and key/signature attributes.

05 BUILD FEATURES → STRUCTURED SECURITY VECTOR
                    Represent protocol, TLS, certificate, crypto, forward secrecy, expiry
                    and STARTTLS outcomes as structured features.

06 DECIDE        →  RULES + ML + SHAP
                    Rules perform deterministic policy checks; Random Forest assists risk
                    classification; Isolation Forest identifies unusual sessions; SHAP helps
                    explain model decisions.
```

### Detailed Processing Logic

1. **PCAP ingestion** — accept recorded packet captures as the evidence source.
2. **Protocol identification** — classify observed mail traffic and isolate relevant flows.
3. **TCP reconstruction** — reassemble packet fragments into usable application-level streams.
4. **STARTTLS analysis** — locate the transition from the mail protocol conversation to TLS where observable.
5. **TLS parsing** — extract handshake and cryptographic characteristics that are visible in the capture.
6. **Certificate analysis** — inspect available X.509 certificate information and validation indicators.
7. **Feature engineering** — convert raw observations into a structured security vector.
8. **Security evaluation** — apply deterministic rules and ML-assisted analysis.
9. **Explanation** — associate findings with the evidence/features that triggered them.
10. **Persistence** — store observations and findings for historical comparison.

### AI / ML Roles

| Component | Role |
|---|---|
| **Rule Engine** | Deterministic baseline for explicit policy checks and known conditions. |
| **Random Forest** | Risk classification using structured session features. |
| **Isolation Forest** | Identification of sessions that appear unusual relative to observed feature distributions. |
| **SHAP** | Explanation layer showing which features contributed to a model decision. |

> The ML layer is intended to assist analysis rather than replace deterministic security checks. The rule engine provides the transparent baseline, while ML adds classification, anomaly and explanation capabilities.

---

## Technical Architecture

```
PCAP
  → Protocol Identification
  → TCP Stream Reconstruction
  → STARTTLS Analysis
  → TLS Parser
  → X.509 Certificate Engine
  → Feature Builder
  → Rule-based Security Checks + ML/Anomaly Analytics
  → Explainable Risk + Findings
  → SQLite History
  → Posture Drift Detection
  → Dashboard / Report Export
```

### Module Responsibilities

| Module | Responsibility |
|---|---|
| PCAP Input | Loads recorded packet captures and provides the evidence base. |
| Protocol Identifier | Separates SMTP, IMAP and POP3 traffic for downstream processing. |
| TCP Stream Reconstructor | Reassembles packets belonging to the same communication flow. |
| STARTTLS Detector | Identifies the observable transition into TLS and relevant indicators. |
| TLS Handshake Parser | Extracts observable TLS versions and cryptographic handshake attributes. |
| X.509 Certificate Engine | Extracts certificate validity and relevant key/signature information. |
| Feature Builder | Converts observations into structured model/rule inputs. |
| Security Engine | Combines deterministic rules with ML-assisted classification/anomaly analysis. |
| Historical Store | Stores session/posture observations for comparison over time. |
| Posture Drift Engine | Compares current observations with historical baselines. |
| Dashboard / Reports | Presents findings, explanations, posture trends and exportable results. |

### Core Intelligence Loop

```
CURRENT SESSION    →  What happened?
SECURITY ENGINE    →  Is the observed configuration acceptable under selected policy?
HISTORICAL BASELINE → Is this behavior unusual for this server?
POSTURE DRIFT      →  Has the server's cryptographic behavior changed?
EXPLANATION        →  What changed, why was it flagged, and what should be investigated?
```

> **Novelty:** *"NOT JUST 'IS IT WEAK?' BUT 'HAS ITS SECURITY POSTURE CHANGED?'"*
>
> The proposed novelty is the combination of passive mail-traffic evidence, explainable risk analysis and historical per-server cryptographic posture tracking in one workflow.

---

## Feasibility & Technology Stack

| Function | Candidate Technology |
|---|---|
| PCAP / Network Parsing | Scapy / dpkt / PyShark |
| TLS / Certificate Analysis | OpenSSL + Python cryptography |
| Machine Learning | scikit-learn |
| Explainability | SHAP |
| Persistence | SQLite |
| Backend / Visualization | FastAPI + Chart.js / Plotly |
| Reporting | ReportLab or WeasyPrint |
| Controlled Test Infrastructure | Postfix / Dovecot / aiosmtpd + tcpdump / Wireshark |

### Controlled Validation Strategy

Validation uses controlled secure and intentionally weak configurations rather than invented accuracy claims.

- **Secure Configuration** → Generate / capture PCAP → SecureMailScope → Expected secure findings
- **Weak Configuration** → Generate / capture PCAP → SecureMailScope → Expected weakness findings
- **Repeated Configuration** → Multiple captures → Historical Store → Baseline and posture-change analysis

### Challenges and Mitigations

| Challenge | Mitigation |
|---|---|
| Encrypted payload visibility | Focus primarily on observable handshake, certificate, transport and metadata characteristics. |
| PCAP completeness | Distinguish an observed weakness from insufficient evidence when the capture does not contain the necessary information. |
| ML training data | Use controlled secure/weak configurations to create an initial labelled dataset and retain a deterministic rule baseline. |
| Historical baseline | Require enough observations before treating a pattern as a stable baseline. |
| False interpretation | Present evidence and explanation alongside findings rather than only a single opaque score. |

---

## How to Run

### 1. Backend (FastAPI on Port 8000)

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
python pipeline.py
```

The FastAPI server starts on **`http://localhost:8000`**.

| Endpoint | Description |
|---|---|
| `GET /` | Service info & available endpoints |
| `GET /api/sessions` | Latest enriched session data |
| `POST /analyze` | Upload PCAP/JSON for full pipeline analysis |
| `GET /api/history` | List last 10 analysis runs |

Optional — run pipeline on a PCAP file at startup:
```bash
python pipeline.py --pcap test_data/mock_email_traffic.pcap --keylog test_data/mock_session.keylog
```

### 2. Frontend Dashboard (Vite + React on Port 5173)

```bash
cd dashboard
npm install
npm run dev
```

Dashboard available at **`http://localhost:5173`**.

---

## Impact & Benefits

### Security Visibility
- SMTP / IMAP / POP3 identification
- TLS version and cryptographic analysis
- Certificate validation indicators
- Forward-secrecy assessment where observable
- STARTTLS transition indicators
- Session-level security findings

### Analyst Intelligence
- Session → features → findings
- Rule checks + ML classification + anomaly signal
- SHAP explanations for model decisions
- Historical server baseline
- Posture-change and emerging-risk visibility
- Prioritized investigation points instead of raw packet inspection alone

---

## Research & Reference Base

- RFC 3207 — SMTP STARTTLS
- RFC 2595 — Using TLS with IMAP / POP3
- RFC 8314 — Cleartext Considered Obsolete
- RFC 8446 — TLS 1.3
- RFC 5280 — X.509 PKI Certificate Profile
- NIST SP 800-52 Rev. 2 — TLS guidance
- Wireshark documentation — packet and protocol analysis
- scikit-learn — Random Forest / Isolation Forest
- SHAP — model explanation framework

---

## Key Design Principle

> **PASSIVE PCAP + EXPLAINABLE AI + TEMPORAL POSTURE**
>
> *"Not just what happened in one session, but how a mail server's cryptographic posture changes over time."*

---

## Short Pitch

> *"Where active scanners such as testssl.sh give you a snapshot of a server's TLS configuration, SecureMailScope passively analyzes recorded mail traffic to reveal how a server's cryptographic posture is changing over time, with explainable AI-assisted analysis instead of a black-box report."*

---

## Important Technical Boundaries

- Do not claim that PCAP alone always detects a STARTTLS stripping attack. Use wording such as "observable STARTTLS downgrade/stripping indicators."
- Do not treat TLS 1.2 as automatically insecure. Evaluate the observed version against a selected policy.
- Do not treat RSA-2048 or another key size as universally secure without reference to the selected security policy and context.
- Do not present Random Forest as proving that a session is secure. It assists classification; deterministic rules provide the transparent baseline.
- Do not claim that no other tool has ever implemented similar functionality. Describe novelty as the proposed combination of passive PCAP, explainable analysis and temporal posture tracking.
- Do not invent accuracy, detection-rate, number-of-server or performance results. Results should come from controlled experiments after implementation.
- When TLS is established, application payloads are encrypted. The system should focus primarily on observable handshake, certificate, transport and metadata unless decryption secrets are legitimately available.

---

## Suggested 7-Day Prototype Plan

| Time | Work |
|---|---|
| Day 1–2 | Networking/TLS basics, generate controlled test traffic and collect PCAPs. |
| Day 3–4 | Implement protocol identification, TCP reconstruction and initial STARTTLS/TLS parsing. |
| Day 5 | Build certificate analysis and deterministic rule engine. |
| Day 6 | Prepare architecture, feature vector, dashboard concept and presentation. |
| Day 7 | Integrate, test against controlled cases and rehearse the pitch. |

---

## Requirement-to-Module Mapping

| Requirement / Capability | SecureMailScope Module |
|---|---|
| Passive PCAP analysis of SMTP/IMAP/POP3 | PCAP input + protocol identification |
| STARTTLS handling | STARTTLS detector |
| TCP reconstruction | TCP stream reconstructor |
| TLS handshake / version / crypto analysis | TLS handshake parser + feature builder |
| X.509 certificate analysis | Certificate engine |
| Weak crypto / deprecated protocol detection | Rule engine |
| Forward secrecy assessment | TLS feature extraction + policy checks |
| AI risk scoring | Random Forest + structured features |
| Anomaly detection | Isolation Forest |
| Prioritization / recommendations | Security engine + findings layer |
| Historical posture tracking | SQLite history + drift engine |
| JSON / PDF / HTML reporting | Report/export layer |
| Interactive dashboard | FastAPI + Chart.js/Plotly |
