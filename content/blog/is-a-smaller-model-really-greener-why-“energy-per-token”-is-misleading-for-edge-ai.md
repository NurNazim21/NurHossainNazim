---
title: Is a Smaller Model Really Greener? Why “Energy per Token” Is Misleading for Edge AI
date: 2026-11-20
excerpt: Shrinking AI models is supposed to save electricity—but pushing compression too far can actually make them burn more power. Here is the surprising energy paradox behind running Small Language Models on everyday devices.
cover: /blog/green_inference_cover_llm_quantization_preview.png
coverAlt: LLM quantization for energy-efficient and sustainable AI inference.
tags:
  - Green Computing, Sustainable AI, Edge AI, LLM ,Edge computing, Quantized models
published: true
featured: true
---

Imagine you hire two interns to answer customer emails.

Intern A is fast and cheap. He answers every email in seconds, but he’s right about 1 time in 10.

Intern B is slower and costs more. She takes her time, but she’s right 4 times in 10.

Who’s the better deal? Most people pick Intern A because he looks cheaper. But if every wrong answer has to be redone, Intern A is the expensive one.

This is the question we’re mostly _not_ asking about “green AI” on small devices.

### The shrinking trick everyone loves

To run a language model on something tiny, like a Raspberry Pi or a smart camera, people compress it. The most common method is **quantization**: store each number inside the model with fewer bits. A 16-bit model becomes 8-bit, then 4-bit, then even 3-bit.

The model gets smaller, loads faster, and usually sips less power. Small devices spend a lot of their time waiting for data to arrive from memory, so less data means less waiting, and less waiting means less energy.

Great. Smaller means greener. Case closed?

Not quite.

### Three ways “smaller = greener” can fool you

**1. There’s a point where squeezing backfires.**
Shrink the weights too far and the processor has to _unpack_ them before using them, like vacuum-packed luggage you must reinflate at every stop. On hardware with no native support for odd bit-widths, that unpacking can eat the savings. So 3-bit isn’t automatically better than 4-bit. Sometimes it’s worse.

**2. “Energy per word” rewards rambling.**
The popular way to report efficiency is energy per token (roughly, per word). Every request carries a fixed startup cost, and a long answer spreads that cost across many words. A chatty model can therefore look _more_ efficient per word than a concise one, even when it burns far more energy in total. It’s like judging a car on fuel per kilometer while ignoring that one driver took a detour.

**3. A wrong answer still costs energy.**
Say a model spends 20 joules per answer but is right only 6% of the time. You pay about 330 joules per _correct_ answer. Another model spends 60 joules and is right 40% of the time, which works out to 150 joules per correct answer. The “efficient” model costs more than twice as much to get you something usable. (These numbers are made up to show the idea.)

### The number I wish everyone reported

> **Energy per correct answer = total energy ÷ number of right answers**

It’s simple, and it changes the leaderboard. It punishes cheap-but-useless models, rewards concise ones, and shows the tipping point where saving power stops making sense.

Imagine model cards with this on the label, like calories per serving.

### Things I’d want to know before trusting any “green AI” claim

- **Was the answer wrong, or just badly formatted?** Tiny models often fail because they ignore the output format, not because they lack the knowledge. A strict grader can make a model look broken when it simply didn’t follow instructions.
- **How many times was it tested?** A few hundred questions, run once, can’t reliably separate a real 3-point difference from luck.
- **What hardware, what software?** A trick that helps on one board might do nothing on another with a dedicated AI chip.
- **Was it a real task?** Quiz answers are 5 to 20 words. Real assistants summarize, chat for many turns, and call tools. That’s a very different energy profile.
- **What did making the model cost?** Compressing a model takes energy too. Worth it if it runs a million times. Maybe not if it runs a hundred.

### Try this yourself

You don’t need a lab. A Raspberry Pi, a USB power meter (they’re cheap), and a small open model are enough:

1. Measure the Pi idle for a few minutes.
2. Run the same 50 questions on an 8-bit and a 4-bit version.
3. Record total energy, time, and how many answers were actually correct.
4. Divide. Compare.
