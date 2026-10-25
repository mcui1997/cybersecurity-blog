---
title: automakers are a ransomware target now. plan like it
date: 2026-06-26
tag: automotive
summary: bajaj auto disclosed a ransomware attack this month. it's the latest reminder, after jaguar land rover, that car companies are prime targets.
source: Business Today — "What Bajaj Auto ransomware attack says about cyber security risks for Indian automakers" (Jun 24, 2026)
tldr:
- bajaj auto told stock exchanges on june 23 that it had been hit by ransomware, affecting it and its tech subsidiary.
- it hasn't said whether plants were affected, and no group has been named.
- jaguar land rover's 2025 attack halted production for over a month. that's the scenario every automaker should be planning for.
---

## what happened

Business Today reported that Bajaj Auto, the Pune-based two-wheeler maker, disclosed a ransomware attack to stock exchanges on June 23. The incident hit systems at Bajaj Auto and its wholly owned subsidiary, Bajaj Auto Technology Limited. The company reported it to CERT-In and said its technical team, outside experts, and management had responded, and that those steps appeared successful based on what it knew at the time.

What's not known yet: whether production was affected, who was behind it, and whether Bajaj has cyber insurance.

The article puts it next to the September 2025 attack on Jaguar Land Rover, which halted production at plants in the UK and Slovakia for more than a month. That one reportedly cost around 50,000 units of production and £260 million in direct costs, and JLR's lack of cyber insurance made it worse.

## why i care

This one is close to home. I work as a software engineer at an automaker, and these stories hit differently when you can picture the systems involved.

Car companies are a great ransomware target, and not because of the cars themselves. It's the factories. Manufacturing runs on just-in-time everything: parts, scheduling, logistics, all tied together by IT systems. Take those down and the line stops. When every day of downtime costs that much, attackers know the pressure to pay is enormous.

## what i'd actually do

- know which IT systems the plants actually depend on to keep running, and test running without them. most companies find out the hard way.
- segment manufacturing networks from corporate IT. ransomware that lands through email shouldn't be able to reach the line.
- have offline, tested backups for the systems that schedule and track production, not just for email and file shares.
- run a tabletop exercise where the scenario is "we're down for a month." the JLR numbers make a good starting point.

## my take

Every automaker is now a software company with factories attached. That means the risk model has to include "someone encrypts the systems that tell the factory what to build." Resilience isn't a security team problem anymore. It's an operations problem.
