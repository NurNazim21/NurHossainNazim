---
title: 'A heart attack shows up as stillness'
date: '2026-11-18'
excerpt: >-
  Echocardiography records motion, not anatomy. That single fact explains most
  of why finding a myocardial infarction in an ultrasound video is a different
  problem from reading a chest X-ray.
cover: '/blog/stillness-cover.png'
coverAlt: >-
  An ECG trace drawn in red over a faint clinical grid, with a second ghosted
  trace behind it suggesting the previous frame.
tags:
  - echocardiography
  - machine learning
  - research
published: true
featured: true
---

Most people picture a heart attack as a plumbing problem: a vessel blocks, part
of the muscle starves, and something dramatic happens on an ECG. All true. But
there is a second, quieter signature that never shows up on a monitor and only
appears when you watch the muscle move.

A region of heart that has lost its blood supply stops squeezing. Not weakly.
Often it stops outright, while the rest of the muscle carries on contracting
around it. Cardiologists call it a regional wall motion abnormality, and they
find it by eye: one wall thickens and travels inward, its neighbour sits there
looking bored.

That is the thing I am trying to teach a model to notice.

## The signal is motion, not pixels

A chest X-ray is a still image, so the model's job is basically texture and
shape. An echocardiogram is a video, and a single frame of it is close to
useless. At end-diastole the heart is full and relaxed; at end-systole it is
contracted. The information sits in the difference between the two, and in the
way the difference varies across the walls of the left ventricle.

So the unit of learning is not the frame. It is a beat, or a few beats. Change
the frame rate, drop a few frames, or let the sonographer sweep the probe a
little, and the numbers move without the patient changing at all.

## Speckle is not noise you can delete

Ultrasound images have a granular texture called speckle. It comes from
interference between the returning echoes, not from a dirty sensor, and it is
everywhere. The instinct from computer vision is to smooth it away.

Then you notice what you deleted: speckle carries the motion. The pattern shifts
as tissue moves, and the way it shifts is part of how displacement gets
estimated. Denoise too hard and the wall becomes a clean, motionless shape. That
tension between "make the image look nicer" and "keep the evidence" is not a
tuning detail. It is the problem.

## Every view is a different camera angle

In practice, an echo study is a set of windows: apical four-chamber, apical
two-chamber, parasternal long axis, and others. The same heart produces very
different pictures in each, and the probe angle changes the geometry from one
minute to the next.

That is why so many pipelines start with view classification as a separate step.
If the model is fed a mix of views without being told which is which, it can
learn the view and the machine instead of the disease. A network that predicts
"infarct" from the shape of the sector has learned nothing that will survive a
new hospital.

## Labels are opinions until proven otherwise

"Hypokinetic" is a judgement made by a human watching a moving image. Two
experienced readers can disagree on a mild case, and the reference label in a
dataset is often something else entirely: an ECG finding, a troponin value, or
an angiogram. All three are real evidence, and all three can disagree with the
wall motion you are looking at.

This is the part that surprised me most. In medical imaging you do not get a
clean answer key. You get a second opinion, and sometimes a third.

## Splits by patient, or the score is fiction

The most common way to fool yourself is to split a video dataset by frame.
Neighbouring frames from the same recording land in both train and test sets, so
the model recognises the patient, the probe, the room, and reports a beautiful
number.

Split by patient. Split by hospital if you can. Then watch the score drop and
tell yourself that the honest number is the useful one.

> A model that reports 97% on frames from patients it has already met has told
> you nothing about the patient who walks in tomorrow.

## Where the time actually goes

For my Final Year Design Project on myocardial infarction detection from
echocardiography, the interesting work has turned out to be mostly upstream of
the network: sorting views, choosing the end-diastolic and end-systolic frames,
keeping recordings from one patient on one side of a split, and deciding what
"positive" means when the label comes from a different test.

Architecture gets the paper. Data hygiene decides whether the thing works.

## One useful fact to take away

If you ever read about AI for cardiac ultrasound and want a quick sanity check,
find out how the dataset was split. Stanford's EchoNet-Dynamic release in 2020,
about 10,030 apical four-chamber videos, was a turning point for this field
mostly because datasets of that size are rare, not because the model was
exotic. Even now, "ten thousand videos" counts as enormous for echo and as
almost nothing next to the millions of photographs a vision model trains on.

The scarcity is the story. Motion is hard to label, ultrasound is hard to
standardise, and every honest result in this field is bought with careful
labelling rather than with a bigger network.
