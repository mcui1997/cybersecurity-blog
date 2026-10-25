---
title: your device management tool is also a delete button
date: 2026-03-20
tag: identity
summary: attackers turned microsoft intune against stryker and remotely wiped thousands of devices. no malware needed, just admin access.
source: Cybersecurity Dive — reporting on the Stryker attack and Microsoft Intune (Mar 16, 2026)
tldr:
- an iran-linked hacker claimed an attack on medical device maker stryker that wiped thousands of phones and workstations.
- the wipes reportedly went out through intune, the same tool it uses to manage those devices.
- the fix isn't a new product. it's protecting admin accounts and requiring a second person for destructive actions.
---

## what happened

Cybersecurity Dive covered an attack on Stryker, the medical technology company, where a hacker going by Handala (linked to Iran, per Check Point Research) claimed responsibility. Stryker confirmed in a regulatory filing that its Microsoft environment was affected, and its electronic ordering systems were down.

According to researchers at Halcyon, the attack hit phones and workstations through Microsoft Intune, the device management platform companies use to push software and settings. The payload included remote wipe commands. The hacker also claimed to have stolen 50 TB of data, which hasn't been verified.

How they got in isn't confirmed. Researchers pointed out that pulling this off requires Intune admin or global admin privileges, and Palo Alto's Unit 42 noted that similar attacks have used credentials stolen from legitimate users.

## why i care

This is the purest example of "living off the land" I've seen. No exploit, no custom malware dropped on every laptop. The attacker just used the company's own tool, the way it was designed to be used, with the wrong person at the keyboard.

Every big company has a handful of systems like this: device management, identity providers, CI/CD, cloud consoles. They're powerful because they touch everything. Which means one compromised account in one of those places isn't a small incident. It's a company-wide one.

## what i'd actually do

- phishing-resistant MFA on every admin account for these platforms. not SMS, not "approve this push" fatigue bait.
- require multi-admin approval for destructive bulk actions like wipes. Forrester's Paddy Harrington called this out, and it's the one control that would've made this a lot harder.
- keep the number of global admins small, and audit it regularly. people collect admin roles and never give them back.
- alert on unusual bulk actions. a few hundred wipe commands in an hour should page someone.

## my take

We spend a lot of energy hardening endpoints, then hand a single account the power to erase all of them. Admin consoles are the crown jewels now. They deserve the same "two keys to launch" mindset we'd use for anything else that can't be undone.
