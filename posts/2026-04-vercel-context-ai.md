---
title: one "connect with google" click, and vercel got breached
date: 2026-04-24
tag: ai
summary: an employee connected a third-party ai app to their work google account. that app got breached, and it became the way into vercel.
source: TechCrunch — "App host Vercel says it was hacked and customer data stolen" (Apr 20, 2026)
tldr:
- context ai, an ai workflow tool, had oauth tokens for its users stolen in a breach.
- a vercel employee had connected that app to their corporate google account, which attackers used to get into vercel's internal systems.
- every ai tool you grant access to is now part of your company's attack surface.
---

## what happened

TechCrunch reported that Vercel, the company behind Next.js, confirmed a breach where customer data was stolen. The path in didn't start at Vercel at all.

Context AI makes an office-suite style app that automates workflows across other apps. It confirmed a breach back in March and later said hackers "likely compromised OAuth tokens" for some of its consumer users. One of those users was a Vercel employee who had connected the app to their corporate Google account.

The attackers used that connection to take over the employee's Google account, and from there reached some of Vercel's internal systems, including credentials that weren't encrypted. Vercel contacted customers whose app data and keys were exposed, said the impact could reach "hundreds of users across many organizations," and CEO Guillermo Rauch told customers to rotate keys and credentials marked "non-sensitive." Next.js and Turbopack weren't affected. Who did it is still unclear.

## why i care

This is the shadow AI problem in one story. Everyone is trying new AI tools right now, and the onboarding flow is almost always "sign in with Google" plus a permissions screen nobody reads. That click creates a long-lived token sitting in someone else's infrastructure. If they get breached, you get breached.

The other detail that jumped out: "non-sensitive" environment variables. Labels like that tend to drift. Something gets marked non-sensitive once, and two years later it's holding a key that matters.

## what i'd actually do

- lock down which third-party apps can request oauth access to corporate accounts. allowlist, don't just block known-bad.
- review existing oauth grants. most orgs have never looked, and the list is long.
- treat every secret as sensitive by default. if something truly isn't secret, it probably doesn't need to be an env var.
- when a vendor discloses a breach, check whether anyone at your company connected it. that's the step that gets skipped.

## my take

I'm not anti-AI-tools, I use them constantly. But "I just connected it to try it out" is how a lot of these stories start. The productivity gain is real. So is the token you just handed to a startup's database.
