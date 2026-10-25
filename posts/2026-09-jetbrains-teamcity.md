---
title: jetbrains told everyone to patch teamcity. one of its own servers didn't
date: 2026-09-25
tag: supply chain
summary: attackers used a known, actively exploited teamcity flaw to break into a jetbrains cloud service and pull aws credentials out of an old backup.
source: The Hacker News — reporting on the JetBrains Cadence breach (Sep 5, 2026)
tldr:
- attackers exploited cve-2026-63077, a critical teamcity bug that cisa had already flagged as actively exploited, on a jetbrains cadence server.
- inside, they found a full 2024 server backup with credentials, and pulled aws iam keys out of it.
- the patch existed. the old backup shouldn't have. both are the lesson.
---

## what happened

The Hacker News reported that attackers breached Cadence, a JetBrains-hosted service that lets developers run heavy workloads like ML training on cloud GPUs straight from PyCharm.

The way in was CVE-2026-63077, a critical (CVSS 9.8) deserialization flaw in TeamCity, JetBrains' own CI server. It lets an unauthenticated attacker run OS commands on the server. CISA added it to its Known Exploited Vulnerabilities catalog on August 5. The intrusion ran from August 8 to 24, and JetBrains conceded that the server should have been patched as part of its own vulnerability response.

What was exposed, confirmed or possible: user names, emails, and IP addresses; a full 2024 Cadence server backup containing credentials, config, artifacts, and logs; multiple AWS IAM users and their credentials pulled from that backup; files in S3 buckets; and possibly source code synced from PyCharm projects. JetBrains took the server offline, invalidated the plugin's tokens, published indicators of compromise, and told users to rotate any secrets used in Cadence runs.

## why i care

I'm not writing this to dunk on JetBrains. It's the opposite. If the company that *makes* TeamCity can miss patching one of its own TeamCity servers, it can happen anywhere. Patch management fails at the edges: the side service, the one box a smaller team owns, the thing nobody thinks of as production.

And CI servers are the worst place for that to happen. They sit in the middle of everything, holding credentials to cloud accounts, registries, and repos. Compromise the build server and you don't just get one system, you get the keys to the rest.

## what i'd actually do

- keep a real inventory of ci/cd servers, including the small ones. you can't patch what you forgot you run.
- when something lands on cisa's kev list, treat it as a deadline, not a suggestion.
- delete old backups that contain secrets, or encrypt them with keys that live somewhere else. a two-year-old backup handed the attacker live aws credentials.
- prefer short-lived cloud credentials for build systems so a stolen key expires on its own.

## my take

The vulnerability got the headline, but the backup did the damage. Old data has a way of quietly becoming the most dangerous thing on a server. Patch fast, and clean up what you don't need anymore, because whatever you keep is whatever the attacker gets.
