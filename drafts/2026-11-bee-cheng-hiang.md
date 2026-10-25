---
title: the ai wrote the code. a human shipped it without opening one email
date: 2026-11-01
tag: ai
summary: singapore's first reported ai-related data breach came down to a few brackets in an ai-written email script, and nobody testing what recipients would actually see.
source: eSecurity Planet — reporting on Singapore's first AI-related data breach (published Oct 5, 2026)
tldr:
- a bee cheng hiang employee used generative ai to write a bulk email script, and it exposed more than 95,000 customer email addresses.
- the code put about 1,000 addresses into each visible recipient batch. the fix was a few brackets.
- singapore's regulator was clear: the ai didn't malfunction. the process around it failed.
---

## what happened

eSecurity Planet covered what's being called Singapore's first reported AI-related data breach. An employee at Bee Cheng Hiang, a food retailer, used generative AI to write code for a bulk marketing email campaign. The prompt didn't say recipient addresses had to stay hidden, and the generated code put customers into visible batches of about 1,000. According to The Straits Times, the broken code and the correct code differed by only a few brackets.

More than 95,000 email addresses were exposed. No other personal data was involved, and the regulator found no sign of misuse. The breach happened in April, and it was made public this fall.

The PDPC's finding is the important part. It said the AI tool didn't malfunction. The cause was human error plus weak testing: one person wrote and tested the code, there was no review, no formal policy for using generative AI, and the employee checked logs but never opened a real test email to see what recipients would see.

## why i care

I use AI to write code all the time, and I'd bet most engineers reading this do too. That's exactly why this story matters. It's not about AI being dangerous. It's about how easy it is to skip the steps we'd normally do when the code shows up instantly and looks right.

"Check the logs" versus "open the email" is the whole lesson. Logs tell you the code ran. Only looking at the actual output tells you it did the right thing.

## what i'd actually do

- anything that touches personal data gets a second reviewer, ai-written or not. bee cheng hiang now requires two people to review bulk emails.
- test the real output with dummy accounts. send yourself the email. look at the headers.
- add guardrails in the system itself, like blocking any send with multiple addresses in one recipient field. don't rely on every prompt being perfect.
- write down how your team uses ai for code. even a short policy beats none.

## my take

AI makes writing code fast. It doesn't make *shipping* code safe. The review and testing steps were always the part that kept us out of trouble, and they matter more now, not less.
