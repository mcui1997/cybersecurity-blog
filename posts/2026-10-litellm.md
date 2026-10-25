---
title: the ai stack is the new supply chain target
date: 2026-10-24
tag: supply chain
summary: attackers used stolen github cli tokens to publish a poisoned litellm release. it ran before your code even imported it.
source: The Hacker News — reporting on the LiteLLM 1.107.0 supply chain compromise (Oct 21, 2026)
tldr:
- a malicious litellm 1.107.0 was published to pypi and docker using what looks like stolen github cli oauth tokens from three engineers.
- the attacker used one account to trigger the release and another to approve it, so the two-person rule didn't help.
- the payload ran at python startup and went after cloud tokens, ai api keys, private keys, and browser data.
---

## what happened

The Hacker News reported that LiteLLM, a popular library and proxy for calling different LLM providers, had a malicious 1.107.0 release pushed to PyPI and Docker. LiteLLM's security lead said the actions came through three engineers' GitHub accounts, apparently via stolen GitHub CLI OAuth tokens. One account triggered the release workflow and another approved it. How the tokens were stolen is still unknown.

The payload was nasty. A `.pth` file made it run at Python startup, before LiteLLM was even imported. It collected cloud tokens, developer credentials, private keys, AI tool credential files, browser data, and environment variables, including saved LiteLLM proxy credentials. It also installed a backdoor that checked in hourly for more code to run.

LiteLLM quarantined the package, revoked the tokens, cut its GitHub org down to a single member, and told users to pin to 1.106.2 by digest. Anyone who installed the bad version should rotate their credentials from a clean machine. The same `.pth` technique showed up in an earlier LiteLLM compromise tied to TeamPCP in March. That's a similarity, not a confirmed attribution.

## why i care

Think about what a library like LiteLLM is: the thing that sits in the middle and holds the API keys for every model provider you use. If you're going to poison one package in the AI stack, that's a smart pick.

And the approval step is what got me. Requiring a second person to approve a release is good practice. But if both "people" are stolen tokens controlled by the same attacker, the control just checks that two accounts clicked a button. It doesn't check that two humans meant it.

## what i'd actually do

- pin dependencies by hash or digest, not just version, for anything that handles credentials.
- treat `gh` cli tokens on laptops like the powerful credentials they are. short sessions, regular re-auth, and a way to revoke them quickly.
- make release approvals require something a stolen token can't fake, like a hardware key or a protected environment with required reviewers.
- don't keep long-lived model provider keys on dev machines when you can avoid it. short-lived or scoped keys limit what a stealer walks away with.

## my take

Looking back at this year, supply chain keeps coming back. Notepad++ in February, TanStack in May, TeamCity in September, LiteLLM now. The common thread isn't sloppy maintainers. It's that the tools we trust most get access to the most, and attackers have figured that out.
