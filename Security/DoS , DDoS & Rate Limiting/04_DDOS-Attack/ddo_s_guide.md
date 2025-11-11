# DDoS (Distributed Denial-of-Service) — Complete Guide

A comprehensive reference covering what DDoS attacks are, how they work, major types, real-world cases, detection signs, and practical prevention & response steps.

---

## 1) What is a DDoS attack?

A **Distributed Denial-of-Service (DDoS)** attack is a malicious attempt to make a server, service, or network unavailable by overwhelming it with traffic or resource requests from multiple sources. Attackers typically use many compromised systems (a *botnet*) or reflection/amplification techniques to flood the target’s bandwidth, processing capacity, or application resources.

---

## 2) How DDoS attacks work — the mechanics

- **Botnets / Command & Control (C2):** Attackers infect many devices (PCs, servers, routers, IoT) with malware, forming a botnet. A central controller instructs those bots to send traffic to the victim simultaneously.

- **IP spoofing + Reflection/Amplification:** The attacker forges the source IP (using the victim’s IP) when sending small requests to open UDP/TCP-based services (e.g., DNS, NTP, memcached, CLDAP). Those third-party servers send larger responses to the victim, amplifying the traffic volume.

- **Resource exhaustion:** Attacks target bandwidth (to saturate the link), connection/state tables (to exhaust firewall/load-balancer/OS state), or application resources (CPU, memory, database connections) by sending heavy or frequent requests.

---

## 3) Main types of DDoS attacks

Security professionals group DDoS attacks into three primary categories:

### 1. Volumetric attacks (bandwidth floods)
Flood the network pipe with high bandwidth (measured in Gbps/Tbps). Common examples include UDP floods, ICMP floods, and amplification attacks (DNS, NTP, memcached). Goal: saturate the victim’s internet link or upstream provider.

### 2. Protocol / state-exhaustion attacks
Exploit protocol handling and state resources on network devices and servers. Examples: SYN floods, ACK/FIN floods, and attacks that exhaust firewall or load-balancer connection tables. These are measured in packets per second (pps) or new-connections-per-second.

### 3. Application-layer attacks (requests per second)
Target the application itself (HTTP/HTTPS, API endpoints) by sending seemingly legitimate requests that are computationally expensive (e.g., heavy DB queries, large uploads) or by maintaining many slow connections (Slowloris). These attacks are stealthier because they look like normal traffic but at high volume.

**Multi-vector attacks** combine several techniques to overwhelm different parts of the infrastructure simultaneously.

---

## 4) Famous / instructive real-world cases

- **Dyn (October 2016)** — The Mirai botnet (infected IoT devices using default credentials) launched attacks against DNS provider Dyn and disrupted many major websites and services. This incident exposed how insecure IoT devices can scale into massive botnets.

- **GitHub (February 2018)** — GitHub experienced a memcached-based amplification attack that peaked at ~1.35 Tbps for a short duration. The attack abused exposed memcached servers to generate massive responses towards GitHub.

- **Record-setting attacks (recent years)** — Security vendors and CDNs have documented attacks peaking in the terabits-per-second range (and beyond), using novel reflection/amplification vectors and increasingly high packet-per-second floods.

---

## 5) How to detect a DDoS — typical signs

- Sudden, sustained spike in traffic (bandwidth or RPS) coming from many IPs or from an amplified single vector.
- High counts of connection attempts, many half-open TCP sessions (indicating SYN floods).
- Application latency increases, timeouts, or sudden errors (database overloads, 5xx errors).
- Identical or very similar request patterns to particular URLs, repeated requests to expensive endpoints, or unusual traffic protocols or ports.

Tools to help detect: NetFlow/sFlow, IDS/IPS logs, CDN/edge telemetry, and server-side logging and monitoring dashboards.

---

## 6) Prevention & mitigation — a layered approach

**Principle:** Reduce attack surface, detect early, and push malicious traffic to scalable scrubbing before it reaches your origin.

### Preparation (before an attack)
- **Use a CDN / Anycast + DDoS protection provider** (e.g., Cloudflare, Akamai, AWS Shield) to distribute and absorb traffic globally.
- **Architect for scale & redundancy:** autoscaling groups, multi-region deployments, and cached static content.
- **Harden or close UDP-based services** (DNS, memcached, NTP, CLDAP) that can be abused for amplification; firewall or restrict access to these services.
- **Enable ingress filtering (BCP-38)** at your networks/ISP to reduce IP spoofing when possible.
- **Enable SYN cookies and tune OS TCP stack** to handle SYN flood attempts.
- **Use WAFs & rate limiting** to protect application endpoints and to throttle abusive clients.

### During an attack (immediate response)
- **Identify & classify traffic:** determine which layer and vector(s) are used, collect top-talkers and payload characteristics.
- **Engage scrubbing/CDN:** redirect traffic to a mitigation service that can scrub malicious packets at scale.
- **Apply rate limits and challenge-response:** throttle suspicious IPs or present CAPTCHAs for suspected bots.
- **Use blackholing selectively:** drop all traffic to a destination only as a last resort when availability is critical and scrubbing isn't an option.

### Long-term
- **Threat intelligence & monitoring:** maintain blocklists, anomaly detection, and logging to learn and adapt to new attack patterns.
- **Run DDoS tests/drills:** simulate attacks and practice incident response procedures.
- **Coordinate with ISP/upstream providers:** have pre-arranged contacts and escalation paths to enable upstream filtering or scrubbing quickly.

---

## 7) Concrete controls you can implement today (quick checklist)

- Put a CDN and WAF in front of public-facing applications.
- Close or firewall exposed services that can be used for amplification (memcached, open DNS resolvers, NTP, SSDP, CLDAP).
- Implement rate limiting per IP and per endpoint, and use progressive throttling for suspicious patterns.
- Enable SYN cookies on servers and harden the TCP/IP stack (increase backlog, tune timeouts).
- Capture NetFlow/sFlow and set alerting thresholds for sudden spikes.
- Prepare an incident response playbook and maintain contact info for your ISP and DDoS vendor.

---

## 8) Legal & operational notes

- **Do not retaliate or "hack back."** Attempting to fight back is likely illegal and usually ineffective.
- **Report incidents** to your ISP and your national cyber incident authority (e.g., CISA in the U.S., local CERTs) so they can support and correlate activity.

---

## 9) Sources (with direct links)

The following authoritative resources were used as references when compiling this guide. Each item includes a direct link and a short note.

- **Cloudflare — What is a DDoS attack?** — Overview, mechanics, and examples.
  https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/

- **Cloudflare — DDoS mitigation & prevention guidance** — Practical mitigations and architecture patterns.
  https://www.cloudflare.com/learning/ddos/ddos-mitigation/

- **Cloudflare Blog (DDoS tag)** — Collection of Cloudflare blog posts and case studies about large attacks and trends.
  https://blog.cloudflare.com/tag/ddos/

- **OWASP — Denial of Service Cheat Sheet** — Application-layer mitigation patterns and developer guidance.
  https://cheatsheetseries.owasp.org/cheatsheets/Denial_of_Service_Cheat_Sheet.html

- **GitHub Blog — DDoS Incident Report (Feb 2018)** — Postmortem of the memcached amplification attack against GitHub.
  https://github.blog/2018-03-01-ddos-incident-report/

- **Wired — GitHub Survived the Biggest DDoS Attack Ever Recorded** — Reporting and technical summary of the memcached attack.
  https://www.wired.com/story/github-ddos-memcached/

- **Krebs on Security — DDoS on Dyn (Oct 2016)** — Investigation and analysis of the Mirai IoT botnet attacks on Dyn.
  https://krebsonsecurity.com/2016/10/ddos-on-dyn/

- **The Guardian — Dyn cyber-attack coverage (Oct 2016)** — News coverage and public impact of the Mirai/Dyn incident.
  https://www.theguardian.com/technology/2016/oct/21/dyn-cyber-attack-mirai-botnet

- **CISA / US-CERT — Mirai and Botnet threats (TA16-288A)** — Official alert and guidance on botnet-driven DDoS threats.
  https://www.cisa.gov/uscert/ncas/alerts/TA16-288A

- **Akamai / Vendor Reports — State of DDoS and threat reports** — Periodic reports from CDNs and security vendors (Akamai, Imperva, Radware) on trends and mitigation.
  https://www.akamai.com/ (search "DDoS report")
  https://www.imperva.com/resources/
  https://www.radware.com/resources/

- **Tom’s Hardware / News coverage of large DDoS incidents** — News reporting on record-setting attacks and mitigation efforts.
  https://www.tomshardware.com/

(If you want, I can replace the generic vendor home pages above with direct links to a specific Akamai/Imperva/Radware whitepaper or Cloudflare quarterly DDoS report — tell me which vendor(s) you prefer and I’ll add the exact papers and publication dates.)

## 10) Next steps I can do for you
 I can do for you

- Export this document with direct URLs & publication dates (MD or PDF).
- Create a one-page DDoS incident response playbook (commands, checklist, contacts).
- Produce detection commands and filters (tcpdump, iptables, NetFlow examples).

Tell me which you'd like and I will add it to the doc.

