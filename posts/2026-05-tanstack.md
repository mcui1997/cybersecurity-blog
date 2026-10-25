---
title: no one got phished, and the publish token still got stolen
date: 2026-05-22
tag: supply chain
summary: the tanstack compromise reached openai and mistral without stealing a single password. the attacker got the ci pipeline to do it for them.
source: The Hacker News — reporting on the TanStack supply chain attack (May 15, 2026)
tldr:
- attackers got tanstack's own ci pipeline to leak its publish token, through a cache everyone trusted.
- poisoned packages hit two openai employee devices and one at mistral ai. openai rotated its app signing certificates.
- your build pipeline is production. secure it like production.
---

## what happened

The Hacker News covered the latest wave of TeamPCP's "Mini Shai-Hulud" campaign, which compromised packages tied to TanStack and others. TanStack was clear about what *didn't* happen: no maintainer was phished, no password leaked, no token was lost. Instead, the attacker engineered a path where TanStack's CI pipeline exposed its own publish token at the moment it was created, using a cache the whole chain implicitly trusted.

The malware went after credentials: environment variables, SSH keys, dotenv files, Docker credentials, and AWS keys. At OpenAI, two employee devices were affected and the malware reached a limited set of internal source repos. OpenAI said no user data, production systems, or IP were compromised, but signing certificates for its iOS, macOS, and Windows apps were in those repos, so it revoked and reissued them. Mistral AI also had trojanized SDK releases and one affected developer device.

## why i care

Most supply chain advice is about humans: use MFA, don't click links, protect your tokens. This attack skipped the humans entirely. It went after the pipeline's assumptions. A cache is something we usually think of as a performance detail. Here it became the security boundary nobody was guarding.

The OpenAI piece also shows how far the blast radius goes. Two laptops ended up meaning a certificate rotation, which meant every macOS user of their apps had to update by a deadline. One upstream package, and suddenly it's a customer-facing event.

## what i'd actually do

- treat ci caches as untrusted input. scope them per branch or per workflow, and never let an untrusted job write to a cache a release job reads.
- use short-lived, scoped publish credentials (like trusted publishing with oidc) instead of long-lived tokens.
- pin dependencies and add a cooldown before adopting brand-new versions. a day or two catches a lot of these.
- keep signing keys out of source repos entirely. if a dev laptop can reach them, so can malware on that laptop.

## my take

The scary part isn't the malware. It's that the attack worked by understanding the build system better than the people who built it. The more we automate, the more our pipelines become the thing worth attacking.
