---
title: the update button is part of your attack surface
date: 2026-02-27
tag: supply chain
summary: notepad++'s update system was quietly hijacked for months. the app was fine. the path to the app wasn't.
source: BleepingComputer — "Notepad++ update feature hijacked by Chinese state hackers for months" (Feb 2, 2026)
tldr:
- attackers compromised the hosting provider behind notepad++'s updater and redirected select users to malicious update files.
- it ran from june to december 2025, and they got back in once using credentials nobody had rotated.
- signed updates and verified installers aren't optional anymore, even for a free text editor.
---

## what happened

Notepad++ is one of those tools half of us have installed without thinking about it. BleepingComputer reported that its update feature was hijacked for months.

The attackers didn't touch the Notepad++ code. They compromised the server at the hosting provider that ran the update application, intercepted update requests from specific users, and pointed them at servers serving tampered update manifests. Older versions of the updater didn't verify updates strongly enough to notice.

The timeline is the part I keep rereading. It started in June 2025. In September the attacker lost access when the host patched the server's kernel and firmware, then got right back in using internal service credentials that hadn't been changed. The provider finally cut them off on December 2.

The targeting was narrow. Only selected users got redirected, and researcher Kevin Beaumont said he knew of at least three affected organizations that then saw hands-on reconnaissance. Notepad++ says multiple researchers believe a Chinese state-sponsored group was behind it, and Rapid7 tied the campaign to a group called Lotus Blossom.

## why i care

We talk about supply chain attacks like they're always about poisoned packages. This one is quieter: the software was legit, but the *delivery* was compromised. And because the targeting was selective, most users never saw anything wrong. That's what makes it scary. You can't spot a pattern if you're not one of the people being targeted.

The other lesson is boring and important: patching the box didn't fix it, because the attacker already had credentials. Remediation without rotating secrets is just a speed bump.

## what i'd actually do

- if you ship an updater, sign the update metadata *and* the installer, and verify both on the client. notepad++ now does this starting in 8.8.9.
- after any incident, assume every credential on that system is burned. rotate first, investigate second.
- for dev machines at work, know which tools update themselves and from where. that list is usually longer than people think.

## my take

"Keep your software updated" is still good advice. This is a reminder that the update channel needs the same paranoia as the code itself. If I can't verify where an update came from, I don't actually know what I'm installing.
