---
title: one aws key in a javascript file, 1,500 charities exposed
date: 2026-08-21
tag: cloud
summary: a crm provider for uk charities likely shipped an aws access key in its public javascript. the attacker downloaded everything in about an hour and a half.
source: Infosecurity Magazine — "Exposed AWS Access Key Linked to Data Breach Affecting 1500+ UK Charities" (Aug 13, 2026)
tldr:
- beacon, a crm used by about 1,500 uk charities, says an aws key was likely exposed in public javascript build artifacts.
- the attacker used it to download all the data in the platform, including attachments, in roughly 87 minutes.
- this is the most preventable kind of breach there is, and it still happens constantly.
---

## what happened

Infosecurity Magazine reported on a breach at Beacon, a CRM provider whose customers are UK charities. Beacon said a compromised AWS access key was "potentially exposed in public Javascript build artifacts," likely because of a development mistake.

The attacker used that valid key to access and download all the data in the CRM, attachments included. That covered supporters' names, emails, phone numbers, and donation records. Beacon said there was no payment card or bank data, and no sensitive patient data. About 1,500 charities were affected, which is basically Beacon's entire customer base, and some of them work in areas like healthcare and victim support.

The malicious activity started on July 27 and lasted about an hour and 27 minutes. Beacon reset credentials for everything integrated with AWS and found no sign the attacker tried to stick around.

## why i care

This one's not glamorous. No state actor, no zero-day. A key ended up in a frontend bundle. And yet the impact was total: every customer, all their data.

It's also an easy mistake to make, which is why I wanted to write about it. Frontend build tools happily inline environment variables. One wrong prefix, or one config value that someone assumed was server-only, and it's sitting in a public JS file for anyone who opens dev tools.

## what i'd actually do

- run secret scanning on build output, not just source code. the key wasn't necessarily in the repo, it was in the artifact.
- frontends should never hold cloud credentials. if the browser needs to upload or read something, use short-lived, narrowly scoped signed urls from a backend.
- scope iam keys to the minimum. a key that can read *everything* is a breach waiting for a leak.
- alert on bulk downloads. 87 minutes of pulling an entire database should trip something.

## my take

Every year the attacks get more advanced, and every year a big share of breaches still come down to a leaked key. Fancy defenses are great. But the basics are where most of the actual damage gets prevented, and they're worth automating so nobody has to remember them.
