---
title: nobody lost power in poland, and that's not the good news
date: 2026-01-30
tag: infrastructure
summary: a coordinated attack on poland's distributed energy sites bricked real hardware. no blackout, but the lesson is in the details.
source: BleepingComputer — "Cyberattack on Polish energy grid impacted around 30 facilities" (Jan 28, 2026)
tldr:
- in late december, attackers hit distributed energy sites across poland: combined heat and power plants, wind and solar dispatch.
- they wiped windows machines, corrupted device configs, and physically broke some equipment. power kept flowing.
- if you build anything that talks to hardware, "it still works" and "it's secure" are two very different statements.
---

## what happened

BleepingComputer reported this month on a coordinated attack against Poland's energy sector that happened in late December 2025. The targets weren't the giant central power plants. They were distributed energy resources: combined heat and power facilities and the systems that dispatch wind and solar.

Industrial security firm Dragos estimates around 30 sites were hit (at least 12 are confirmed publicly) and puts the affected capacity at about 1.2 GW, roughly 5% of Poland's supply. The attackers went after the operational tech: remote terminal units, edge devices, monitoring and control systems, and the Windows machines at each site. Some configs were corrupted beyond recovery, some hardware was damaged beyond repair, and operators lost remote monitoring at multiple sites.

Dragos attributes it, with moderate confidence, to a Russian group it tracks as Electrum, which overlaps with Sandworm. ESET separately tied Sandworm to failed wiper attempts against the Polish grid.

## why i care

Two things stuck with me.

First, the attackers kept compromising *similar device configurations* across sites. That's what happens when everything is deployed from the same template. Templates are great for engineers. They're also great for attackers, because one working playbook scales to every site.

Second, there was no blackout, and Dragos is explicit that this shouldn't be read as "minor." Grid frequency can still get destabilized, and the timing (winter) looks deliberate. I work at an automaker, and cars are turning into connected, remotely managed fleets of hardware. Same shape of problem: lots of distributed devices, shared configs, remote control channels.

## what i'd actually do

- treat your device templates as security-critical code. review them, version them, and don't let one default credential or open service ship to every unit.
- plan for "the device is gone," not just "the device is compromised." if configs can be wiped, you need a known-good restore path that doesn't depend on the device itself.
- make losing remote visibility a loud alert. operators losing monitoring at multiple sites at once is a signal by itself.

## my take

The headline is "no outage." The real story is that someone was able to destroy physical equipment at dozens of sites at once, and the only reason it didn't get worse is that the targets were small and spread out. Decentralized systems are resilient against failure. That doesn't automatically make them resilient against someone who studies them first.
