'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/language-context'
import { getLiveSimulatorI18n } from '@/data/live-simulator-i18n'
import { H2, IC, Callout, InlineDiff, StatusPill, FadeIn } from '@/components/ApiDocPrimitives'
import { Menu, X, Upload, ChevronDown, ChevronRight, RotateCcw, Eye, EyeOff } from 'lucide-react'

const BASE = 'https://structural-diff-engine.onrender.com'

// ── Types ─────────────────────────────────────────────────────────
interface TransformRule {
  find: string
  replace: string
  isRegex: boolean
}

interface Config {
  simpleMode: boolean
  enableInlineDiff: boolean
  enableSplits: boolean
  enableMerges: boolean
  enableCER: boolean
  enableWER: boolean
  enableSER: boolean
  stripDiacritics: boolean
  positionalMode: boolean
  ignoreColNames: string // comma-separated; converted to string[] on submit
  SIM_CONFIDENT: number
  SIM_MODERATE: number
  SIM_WEAK: number
  TIME_EXACT_TOL: number
  TIME_FUZZY_TOL: number
  SPLIT_COMBINED_MIN: number
  MERGE_COMBINED_MIN: number
  CHAR_DIFF_LIMIT: number
}

interface ColMap {
  transcript: string
  speaker: string
  start_time: string
  end_time: string
}

// ── Defaults ──────────────────────────────────────────────────────
const DEFAULT_CONFIG: Config = {
  simpleMode: false,
  enableInlineDiff: true,
  enableSplits: true,
  enableMerges: true,
  enableCER: true,
  enableWER: true,
  enableSER: true,
  stripDiacritics: false,
  positionalMode: false,
  ignoreColNames: '',
  SIM_CONFIDENT: 0.75,
  SIM_MODERATE: 0.5,
  SIM_WEAK: 0.3,
  TIME_EXACT_TOL: 1.0,
  TIME_FUZZY_TOL: 2.5,
  SPLIT_COMBINED_MIN: 0.35,
  MERGE_COMBINED_MIN: 0.65,
  CHAR_DIFF_LIMIT: 1500,
}

// ── Sample datasets ───────────────────────────────────────────────
interface SampleDataset {
  id:          string
  label:       string
  description: string
  original:    string
  reworked:    string
}

const SAMPLES: SampleDataset[] = [
  /* 1 ─ Language Lab (Basic) ─────────────────────────────────── */
  {
    id: 'language-lab-basic',
    label: 'Language Lab — Basic',
    description: 'Podcast excerpt · no timestamps · MODIFIED + SPLIT + MERGED',
    original: JSON.stringify([
      { speaker: 'Sarah Mitchell', transcript: 'Welcome to The Language Lab the podcast where we break down how AI is changing the way we communicate.' },
      { speaker: 'James Park',     transcript: 'Thanks Sarah glad to be here I have been looking forward to this conversation for weeks.' },
      { speaker: 'Elena Rossi',    transcript: 'That resonates with our work at the localization lab where we focus on Arabic dialect adaptation.' },
      { speaker: 'Elena Rossi',    transcript: 'Standard Arabic models completely fail when you feed them Tunisian or Moroccan dialect input.' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Sarah Mitchell', transcript: 'Welcome to The Language Lab, the podcast where we break down how AI is changing the way we communicate.' },
      { speaker: 'James Park',     transcript: "Thanks, Sarah. Glad to be here — I've been looking forward to this conversation for weeks." },
      { speaker: 'Elena Rossi',    transcript: "That resonates with our work at the localization lab where we focus on Arabic dialect adaptation — standard Arabic models completely fail when you feed them Tunisian or Moroccan dialect input." },
    ], null, 2),
  },

  /* 2 ─ Language Lab (Full) ───────────────────────────────────── */
  {
    id: 'language-lab-full',
    label: 'Language Lab — Full',
    description: 'Same podcast with timestamps + non_speech_events · all statuses',
    original: JSON.stringify([
      { speaker: 'Sarah Mitchell', start_time: 0.00,  end_time: 4.20,  transcript: 'Welcome to The Language Lab, the podcast where we break down how AI is changing the way we communicate.',                          non_speech_events: '[intro jingle]', emotion: 'warm'        },
      { speaker: 'Sarah Mitchell', start_time: 4.20,  end_time: 8.00,  transcript: 'Today we have two fantastic guests joining us to talk about machine translation and quality assurance.',                             non_speech_events: '',               emotion: 'enthusiastic' },
      { speaker: 'James Park',     start_time: 8.00,  end_time: 11.50, transcript: 'Thanks Sarah glad to be here I have been looking forward to this conversation for weeks.',                                           non_speech_events: '',               emotion: 'friendly'    },
      { speaker: 'Elena Rossi',    start_time: 11.50, end_time: 15.00, transcript: 'Same here this is such an important topic right now especially with how fast the field is evolving.',                                 non_speech_events: '',               emotion: 'engaged'     },
      { speaker: 'Sarah Mitchell', start_time: 15.00, end_time: 19.80, transcript: 'James lets start with you. Your team recently published a paper on neural machine translation for low resource languages.',           non_speech_events: '',               emotion: 'curious'     },
      { speaker: 'James Park',     start_time: 19.80, end_time: 26.50, transcript: 'Yes so our main finding was that back translation combined with careful data augmentation can boost BLEU scores by up to twelve points for languages with under fifty thousand parallel sentences.', non_speech_events: '', emotion: 'analytical'  },
      { speaker: 'James Park',     start_time: 26.50, end_time: 30.00, transcript: 'The trick is selecting the right seed data and not just throwing everything at the model.',                                          non_speech_events: '',               emotion: 'technical'   },
      { speaker: 'Elena Rossi',    start_time: 30.00, end_time: 34.50, transcript: 'That resonates with our work at the localization lab where we focus on Arabic dialect adaptation.',                                   non_speech_events: '',               emotion: 'thoughtful'  },
      { speaker: 'Elena Rossi',    start_time: 34.50, end_time: 39.00, transcript: 'Standard Arabic models completely fail when you feed them Tunisian or Moroccan dialect input.',                                       non_speech_events: '',               emotion: 'concerned'   },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Sarah Mitchell', start_time: 0.00,  end_time: 4.20,  transcript: 'Welcome to The Language Lab, the podcast where we break down how AI is changing the way we communicate.',                 non_speech_events: '[intro jingle]', emotion: 'warm'        },
      { speaker: 'Sarah Mitchell', start_time: 4.20,  end_time: 8.00,  transcript: 'Today, we have two fantastic guests joining us to talk about machine translation and quality assurance.',                  non_speech_events: '',               emotion: 'enthusiastic' },
      { speaker: 'James Park',     start_time: 8.00,  end_time: 11.50, transcript: "Thanks, Sarah. Glad to be here — I've been looking forward to this conversation for weeks.",                              non_speech_events: '',               emotion: 'friendly'    },
      { speaker: 'Elena Rossi',    start_time: 11.50, end_time: 15.00, transcript: 'Same here. This is such an important topic right now, especially with how fast the field is evolving.',                    non_speech_events: '',               emotion: 'engaged'     },
      { speaker: 'Sarah Mitchell', start_time: 15.00, end_time: 19.80, transcript: "James, let's start with you. Your team recently published a paper on neural machine translation for low-resource languages.", non_speech_events: '',              emotion: 'curious'     },
      { speaker: 'James Park',     start_time: 19.80, end_time: 23.20, transcript: 'Yes, so our main finding was that back-translation combined with careful data augmentation can boost BLEU scores by up to 12 points.', non_speech_events: '', emotion: 'analytical'  },
      { speaker: 'James Park',     start_time: 23.20, end_time: 26.50, transcript: 'This holds for languages with under 50,000 parallel sentences.',                                                          non_speech_events: '',               emotion: 'analytical'  },
      { speaker: 'James Park',     start_time: 26.50, end_time: 30.00, transcript: 'The trick is selecting the right seed data and not just throwing everything at the model.',                                non_speech_events: '',               emotion: 'technical'   },
      { speaker: 'Elena Rossi',    start_time: 30.00, end_time: 39.00, transcript: 'That resonates with our work at the localization lab where we focus on Arabic dialect adaptation — standard Arabic models completely fail when you feed them Tunisian or Moroccan dialect input.', non_speech_events: '', emotion: 'thoughtful' },
    ], null, 2),
  },

  /* 3 ─ Medical Consultation ──────────────────────────────────── */
  {
    id: 'medical-consultation',
    label: 'Medical Consultation',
    description: 'Doctor–patient exchange · timestamps · MODIFIED + ADDED',
    original: JSON.stringify([
      { speaker: 'Dr. Patel',   start_time: 0.00, end_time: 5.10, transcript: 'Good morning. Can you describe where the pain is located and when it started?' },
      { speaker: 'Patient',     start_time: 5.10, end_time: 10.40, transcript: 'It started about three days ago mostly on the right side below the ribs. Gets worse when I breathe deeply.' },
      { speaker: 'Dr. Patel',   start_time: 10.40, end_time: 14.20, transcript: 'Any fever chills or shortness of breath?' },
      { speaker: 'Patient',     start_time: 14.20, end_time: 18.00, transcript: 'A little shortness of breath yeah but no fever.' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Dr. Patel',   start_time: 0.00, end_time: 5.10, transcript: 'Good morning. Can you describe where the pain is located and when it started?' },
      { speaker: 'Patient',     start_time: 5.10, end_time: 10.40, transcript: 'It started about three days ago, mostly on the right side below the ribs. It gets worse when I breathe deeply.' },
      { speaker: 'Dr. Patel',   start_time: 10.40, end_time: 14.20, transcript: 'Any fever, chills, or shortness of breath?' },
      { speaker: 'Patient',     start_time: 14.20, end_time: 18.00, transcript: 'A little shortness of breath, yeah, but no fever.' },
      { speaker: 'Dr. Patel',   start_time: 18.00, end_time: 22.50, transcript: "I'd like to order a chest X-ray and some bloodwork to rule out a pulmonary issue." },
    ], null, 2),
  },

  /* 4 ─ Job Interview — Split ─────────────────────────────────── */
  {
    id: 'job-interview-split',
    label: 'Job Interview — Split',
    description: 'One long answer re-segmented into two · SPLIT + MODIFIED',
    original: JSON.stringify([
      { speaker: 'Interviewer', transcript: "Tell me about a time you had to deal with a difficult stakeholder and how you resolved it." },
      { speaker: 'Candidate',   transcript: "Sure, at my previous role we had a client who kept changing requirements mid-sprint which was slowing the whole team down, so I set up a weekly alignment call and created a shared changelog so everyone could track decisions in real time and the churn dropped by about sixty percent within two months." },
      { speaker: 'Interviewer', transcript: "That's a great example. How did the team respond to that structure?" },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Interviewer', transcript: "Tell me about a time you had to deal with a difficult stakeholder and how you resolved it." },
      { speaker: 'Candidate',   transcript: "Sure. At my previous role, we had a client who kept changing requirements mid-sprint, which was slowing the whole team down." },
      { speaker: 'Candidate',   transcript: "I set up a weekly alignment call and created a shared changelog so everyone could track decisions in real time — and the churn dropped by about 60% within two months." },
      { speaker: 'Interviewer', transcript: "That's a great example. How did the team respond to that structure?" },
    ], null, 2),
  },

  /* 5 ─ Legal Deposition — Delete ─────────────────────────────── */
  {
    id: 'legal-deposition-delete',
    label: 'Legal Deposition — Delete',
    description: 'Witness statement · a row struck from the record · DELETED + MODIFIED',
    original: JSON.stringify([
      { speaker: 'Attorney',  transcript: 'Mr. Okafor, where were you on the evening of March fourteenth?' },
      { speaker: 'Witness',   transcript: 'I was at home. I did not leave until around nine PM.' },
      { speaker: 'Witness',   transcript: 'Well, I may have briefly stopped at the gas station on Fifth — but only for five minutes.' },
      { speaker: 'Attorney',  transcript: 'And did you speak to anyone at that location?' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Attorney',  transcript: 'Mr. Okafor, where were you on the evening of March 14th?' },
      { speaker: 'Witness',   transcript: 'I was at home. I did not leave until around 9 PM.' },
      { speaker: 'Attorney',  transcript: 'And did you speak to anyone at that location?' },
    ], null, 2),
  },

  /* 6 ─ News Broadcast — Merge ────────────────────────────────── */
  {
    id: 'news-broadcast-merge',
    label: 'News Broadcast — Merge',
    description: 'Anchor lines collapsed into single segment · MERGED + UNCHANGED',
    original: JSON.stringify([
      { speaker: 'Anchor',     start_time: 0.00, end_time: 3.80, transcript: 'Breaking news from the capital this hour.', non_speech_events: '[newsroom ambience]' },
      { speaker: 'Anchor',     start_time: 3.80, end_time: 7.20, transcript: 'Officials have confirmed that the summit scheduled for Friday has been postponed indefinitely.', non_speech_events: '' },
      { speaker: 'Reporter',   start_time: 7.20, end_time: 12.50, transcript: 'Speaking from outside parliament, a senior aide said both parties need more time to align on the trade framework.', non_speech_events: '' },
      { speaker: 'Anchor',     start_time: 12.50, end_time: 16.00, transcript: "We'll bring you live updates as this story develops.", non_speech_events: '' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Anchor',     start_time: 0.00, end_time: 7.20, transcript: 'Breaking news from the capital this hour. Officials have confirmed that the summit scheduled for Friday has been postponed indefinitely.', non_speech_events: '[newsroom ambience]' },
      { speaker: 'Reporter',   start_time: 7.20, end_time: 12.50, transcript: 'Speaking from outside parliament, a senior aide said both parties need more time to align on the trade framework.', non_speech_events: '' },
      { speaker: 'Anchor',     start_time: 12.50, end_time: 16.00, transcript: "We'll bring you live updates as this story develops.", non_speech_events: '' },
    ], null, 2),
  },

  /* 7 ─ Customer Support — All Unchanged ──────────────────────── */
  {
    id: 'customer-support-unchanged',
    label: 'Customer Support — Unchanged',
    description: 'Clean approved call transcript · all rows UNCHANGED',
    original: JSON.stringify([
      { speaker: 'Agent',    start_time: 0.00, end_time: 4.20, transcript: "Thank you for calling support. My name is Leila. How can I help you today?" },
      { speaker: 'Customer', start_time: 4.20, end_time: 9.80, transcript: "Hi Leila, I've been trying to reset my password for the past hour and I keep getting an error message." },
      { speaker: 'Agent',    start_time: 9.80, end_time: 14.30, transcript: "I'm sorry to hear that. Could you please provide me with the email address associated with your account?" },
      { speaker: 'Customer', start_time: 14.30, end_time: 17.50, transcript: "Sure, it's jsmith at inbox dot com." },
      { speaker: 'Agent',    start_time: 17.50, end_time: 23.10, transcript: "Thank you. I can see your account. I'll send a fresh reset link right now — it should arrive within the next two minutes." },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Agent',    start_time: 0.00, end_time: 4.20, transcript: "Thank you for calling support. My name is Leila. How can I help you today?" },
      { speaker: 'Customer', start_time: 4.20, end_time: 9.80, transcript: "Hi Leila, I've been trying to reset my password for the past hour and I keep getting an error message." },
      { speaker: 'Agent',    start_time: 9.80, end_time: 14.30, transcript: "I'm sorry to hear that. Could you please provide me with the email address associated with your account?" },
      { speaker: 'Customer', start_time: 14.30, end_time: 17.50, transcript: "Sure, it's jsmith at inbox dot com." },
      { speaker: 'Agent',    start_time: 17.50, end_time: 23.10, transcript: "Thank you. I can see your account. I'll send a fresh reset link right now — it should arrive within the next two minutes." },
    ], null, 2),
  },

  /* 8 ─ Courtroom Hearing ─────────────────────────────────────── */
  {
    id: 'courtroom-hearing',
    label: 'Courtroom Hearing',
    description: 'Speaker correction + wording edits · MODIFIED rows',
    original: JSON.stringify([
      { speaker: 'Judge',      transcript: 'Counsel, please approach the bench.' },
      { speaker: 'Prosecutor', transcript: "Your Honor the state moves to admit exhibit fourteen into evidence." },
      { speaker: 'Prosecutor', transcript: 'This document clearly establishes the chain of custody for the materials seized on October second.' },
      { speaker: 'Defense',    transcript: "Objection your Honor. The document was obtained without proper authorization and should be inadmissible." },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Judge',      transcript: 'Counsel, please approach the bench.' },
      { speaker: 'Prosecutor', transcript: 'Your Honor, the state moves to admit Exhibit 14 into evidence.' },
      { speaker: 'Prosecutor', transcript: 'This document clearly establishes the chain of custody for the materials seized on October 2nd.' },
      { speaker: 'Defense Attorney', transcript: 'Objection, Your Honor. The document was obtained without proper authorization and should be deemed inadmissible.' },
    ], null, 2),
  },

  /* 9 ─ Tech Conference Q&A ───────────────────────────────────── */
  {
    id: 'tech-conference-qa',
    label: 'Tech Conference Q&A',
    description: 'Panel discussion · timestamps · SPLIT + MERGE + MODIFIED',
    original: JSON.stringify([
      { speaker: 'Moderator',  start_time: 0.00,  end_time: 5.30,  transcript: 'We have time for a few audience questions. Yes, you in the third row.' },
      { speaker: 'Audience',   start_time: 5.30,  end_time: 11.00, transcript: 'My question is for the panel. How do you balance model accuracy with latency in production especially for real-time applications?' },
      { speaker: 'Priya Nair', start_time: 11.00, end_time: 17.50, transcript: "It really depends on the use case. For our recommendation engine we cache embeddings aggressively and accept a small staleness window." },
      { speaker: 'Priya Nair', start_time: 17.50, end_time: 22.80, transcript: 'For anything safety critical like fraud detection we prioritize accuracy and pay the latency cost.' },
      { speaker: 'Tom Yuen',   start_time: 22.80, end_time: 30.00, transcript: "I'd add that quantization and knowledge distillation have been game changers for us. We cut inference time by forty percent with under two percent accuracy loss." },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Moderator',  start_time: 0.00,  end_time: 5.30,  transcript: 'We have time for a few audience questions. Yes, you in the third row.' },
      { speaker: 'Audience',   start_time: 5.30,  end_time: 11.00, transcript: 'My question is for the panel: how do you balance model accuracy with latency in production, especially for real-time applications?' },
      { speaker: 'Priya Nair', start_time: 11.00, end_time: 22.80, transcript: "It really depends on the use case. For our recommendation engine, we cache embeddings aggressively and accept a small staleness window. For anything safety-critical like fraud detection, we prioritize accuracy and pay the latency cost." },
      { speaker: 'Tom Yuen',   start_time: 22.80, end_time: 26.50, transcript: "I'd add that quantization and knowledge distillation have been game-changers for us." },
      { speaker: 'Tom Yuen',   start_time: 26.50, end_time: 30.00, transcript: "We cut inference time by 40% with under 2% accuracy loss." },
    ], null, 2),
  },

  /* 10 ─ Scientific Lecture ────────────────────────────────────── */
  {
    id: 'scientific-lecture',
    label: 'Scientific Lecture',
    description: 'Dense technical rows · terminology corrections · MODIFIED',
    original: JSON.stringify([
      { speaker: 'Prof. Achebe', transcript: 'CRISPR-Cas9 allows researchers to make precise edits to the genome by cutting DNA at a specific sequence and allowing the cells natural repair mechanisms to close the gap.' },
      { speaker: 'Prof. Achebe', transcript: 'The off-target effects remain a concern especially in clinical applications where unintended edits could have serious consequences for the patient.' },
      { speaker: 'Student',      transcript: 'Can the guide RNA be reprogrammed to target multiple sites simultaneously or is it limited to a single cut at a time?' },
      { speaker: 'Prof. Achebe', transcript: 'Excellent question. Multiplexed CRISPR allows editing of several loci in parallel by delivering multiple guide RNAs but the efficiency drops with each additional target.' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Prof. Achebe', transcript: "CRISPR-Cas9 allows researchers to make precise edits to the genome by cutting DNA at a specific sequence and allowing the cell's natural repair mechanisms to close the gap." },
      { speaker: 'Prof. Achebe', transcript: 'Off-target effects remain a major concern, especially in clinical applications where unintended edits could have serious consequences for the patient.' },
      { speaker: 'Student',      transcript: 'Can the guide RNA be reprogrammed to target multiple sites simultaneously, or is it limited to a single cut at a time?' },
      { speaker: 'Prof. Achebe', transcript: 'Excellent question. Multiplexed CRISPR allows editing of several loci in parallel by delivering multiple guide RNAs, but efficiency drops with each additional target.' },
    ], null, 2),
  },

  /* 11 ─ Product Launch Panel ─────────────────────────────────── */
  {
    id: 'product-launch-panel',
    label: 'Product Launch Panel',
    description: 'Live event · non_speech_events · all statuses',
    original: JSON.stringify([
      { speaker: 'Host',    start_time: 0.00,  end_time: 5.00,  transcript: "Welcome everyone. We're here today to unveil something we've been building for the past two years.", non_speech_events: '[applause]'  },
      { speaker: 'Host',    start_time: 5.00,  end_time: 9.50,  transcript: 'A platform that rethinks how teams collaborate across languages and time zones.',                        non_speech_events: ''           },
      { speaker: 'CEO',     start_time: 9.50,  end_time: 15.00, transcript: "Thank you. Building this was one of the hardest and most rewarding challenges of my career.",            non_speech_events: '[applause]'  },
      { speaker: 'CEO',     start_time: 15.00, end_time: 21.00, transcript: 'We started with a simple observation: global teams spend thirty percent of their time just trying to understand each other.',  non_speech_events: '' },
      { speaker: 'CEO',     start_time: 21.00, end_time: 27.00, transcript: 'So we built an AI layer that sits on top of your existing tools and handles context, translation and summarization automatically.', non_speech_events: '' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Host',    start_time: 0.00,  end_time: 9.50,  transcript: "Welcome everyone. We're here today to unveil something we've been building for the past two years — a platform that rethinks how teams collaborate across languages and time zones.", non_speech_events: '[applause]' },
      { speaker: 'CEO',     start_time: 9.50,  end_time: 15.00, transcript: "Thank you. Building this was one of the hardest and most rewarding challenges of my career.",  non_speech_events: '[applause]' },
      { speaker: 'CEO',     start_time: 15.00, end_time: 21.00, transcript: 'We started with a simple observation: global teams spend 30% of their time just trying to understand each other.', non_speech_events: '' },
      { speaker: 'CEO',     start_time: 21.00, end_time: 27.00, transcript: 'So we built an AI layer that sits on top of your existing tools and handles context, translation, and summarization automatically.', non_speech_events: '' },
      { speaker: 'Host',    start_time: 27.00, end_time: 31.00, transcript: "Let's take a look at a live demo.", non_speech_events: '[applause]' },
    ], null, 2),
  },

  /* 12 ─ All-Statuses Showcase ─────────────────────────────────── */
  {
    id: 'all-statuses',
    label: 'All-Statuses Showcase',
    description: 'Minimal dataset engineered to produce every status',
    original: JSON.stringify([
      { speaker: 'A', start_time: 0.00, end_time: 3.00, transcript: 'This line stays exactly as-is.' },
      { speaker: 'A', start_time: 3.00, end_time: 7.00, transcript: 'This line has a minor wording change coming.' },
      { speaker: 'B', start_time: 7.00, end_time: 12.00, transcript: 'First half of split content goes here and it now becomes two separate lines in the reworked version.' },
      { speaker: 'B', start_time: 15.00, end_time: 18.00, transcript: 'First chunk to be merged together.' },
      { speaker: 'B', start_time: 18.00, end_time: 22.00, transcript: 'Second chunk that gets merged into the above.' },
      { speaker: 'C', start_time: 22.00, end_time: 26.00, transcript: 'This row will be deleted in the reworked version.' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'A', start_time: 0.00, end_time: 3.00, transcript: 'This line stays exactly as-is.' },
      { speaker: 'A', start_time: 3.00, end_time: 7.00, transcript: 'This line has a minor wording update applied.' },
      { speaker: 'B', start_time: 7.00, end_time: 9.50, transcript: 'First half of split content goes here.' },
      { speaker: 'B', start_time: 9.50, end_time: 12.00, transcript: 'It now becomes two separate lines in the reworked version.' },
      { speaker: 'B', start_time: 15.00, end_time: 22.00, transcript: 'First chunk to be merged together. Second chunk that gets merged into the above.' },
      { speaker: 'C', start_time: 26.00, end_time: 30.00, transcript: 'This row was added fresh in the reworked version.' },
    ], null, 2),
  },

  /* 13 ─ Arabic Subtitles ─────────────────────────────────────── */
  {
    id: 'arabic-subtitles',
    label: 'Arabic Subtitles',
    description: 'Documentary clip · Arabic content · MODIFIED + MERGED',
    original: JSON.stringify([
      { speaker: 'راوٍ', start_time: 0.00, end_time: 4.50, transcript: 'في قلب الصحراء الكبرى تمتد مساحات شاسعة من الرمال الذهبية' },
      { speaker: 'راوٍ', start_time: 4.50, end_time: 8.20, transcript: 'تتشكل فيها قصص البشر منذ آلاف السنين' },
      { speaker: 'راوٍ', start_time: 8.20, end_time: 13.00, transcript: 'كل أثر تتركه الريح على الكثبان يحكي حكاية صامتة' },
      { speaker: 'عالم', start_time: 13.00, end_time: 18.50, transcript: 'هذه المنطقة تعد من أكثر البيئات تحديا للحياة البشرية على وجه الأرض' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'راوٍ', start_time: 0.00, end_time: 8.20, transcript: 'في قلب الصحراء الكبرى، تمتد مساحات شاسعة من الرمال الذهبية، تتشكّل فيها قصص البشر منذ آلاف السنين.' },
      { speaker: 'راوٍ', start_time: 8.20, end_time: 13.00, transcript: 'وكل أثر تتركه الريح على الكثبان يحكي حكاية صامتة.' },
      { speaker: 'عالم', start_time: 13.00, end_time: 18.50, transcript: 'هذه المنطقة تُعدّ من أكثر البيئات تحديًا للحياة البشرية على وجه الأرض.' },
    ], null, 2),
  },

  /* 14 ─ French Broadcast ──────────────────────────────────────── */
  {
    id: 'french-broadcast',
    label: 'French Broadcast',
    description: 'TV news segment · French · MODIFIED + SPLIT',
    original: JSON.stringify([
      { speaker: 'Présentateur', start_time: 0.00,  end_time: 5.40,  transcript: "Bonsoir. Les négociations commerciales entre l'Union européenne et le Canada ont repris ce matin à Bruxelles après plusieurs semaines de pause." },
      { speaker: 'Présentateur', start_time: 5.40,  end_time: 10.80, transcript: "Les deux parties se disent optimistes quant à la conclusion d'un accord d'ici la fin du mois bien que des points de désaccord subsistent sur les questions agricoles." },
      { speaker: 'Correspondante', start_time: 10.80, end_time: 17.20, transcript: "Sur place, l'atmosphère est constructive selon les délégués que nous avons pu interroger en marge des discussions." },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Présentateur', start_time: 0.00,  end_time: 5.40,  transcript: "Bonsoir. Les négociations commerciales entre l'Union européenne et le Canada ont repris ce matin à Bruxelles, après plusieurs semaines de pause." },
      { speaker: 'Présentateur', start_time: 5.40,  end_time: 8.20,  transcript: "Les deux parties se disent optimistes quant à la conclusion d'un accord d'ici la fin du mois." },
      { speaker: 'Présentateur', start_time: 8.20,  end_time: 10.80, transcript: "Des points de désaccord subsistent néanmoins sur les questions agricoles." },
      { speaker: 'Correspondante', start_time: 10.80, end_time: 17.20, transcript: "Sur place, l'atmosphère est constructive, selon les délégués que nous avons pu interroger en marge des discussions." },
    ], null, 2),
  },

  /* 15 ─ Documentary Narration — Positional ───────────────────── */
  {
    id: 'documentary-positional',
    label: 'Documentary — Positional',
    description: 'Narration with tight timestamps · good for positionalMode · MODIFIED',
    original: JSON.stringify([
      { speaker: 'Narrator', start_time: 0.00,  end_time: 5.80,  transcript: 'The Amazon basin covers more than five and a half million square kilometers making it the worlds largest tropical rainforest.' },
      { speaker: 'Narrator', start_time: 5.80,  end_time: 11.20, transcript: 'It is home to an estimated ten percent of all species on earth many of which have never been catalogued by science.' },
      { speaker: 'Narrator', start_time: 11.20, end_time: 16.50, transcript: 'Every year unprecedented areas of forest are cleared for agriculture and cattle ranching.' },
      { speaker: 'Narrator', start_time: 16.50, end_time: 22.00, transcript: 'Scientists warn that if deforestation continues at the current rate the entire ecosystem could reach a tipping point within a generation.' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Narrator', start_time: 0.00,  end_time: 5.80,  transcript: 'The Amazon basin covers more than 5.5 million square kilometers, making it the world\'s largest tropical rainforest.' },
      { speaker: 'Narrator', start_time: 5.80,  end_time: 11.20, transcript: 'It is home to an estimated 10% of all species on Earth, many of which have never been catalogued by science.' },
      { speaker: 'Narrator', start_time: 11.20, end_time: 16.50, transcript: 'Every year, vast areas of forest are cleared for agriculture and cattle ranching.' },
      { speaker: 'Narrator', start_time: 16.50, end_time: 22.00, transcript: 'Scientists warn that if deforestation continues at the current rate, the entire ecosystem could reach a tipping point within a generation.' },
    ], null, 2),
  },
]

// ── Helpers ───────────────────────────────────────────────────────
function detectColumns(jsonText: string): string[] {
  try {
    const arr = JSON.parse(jsonText)
    if (!Array.isArray(arr) || arr.length === 0) return []
    return Object.keys(arr[0] as object)
  } catch {
    return []
  }
}

function rowCount(jsonText: string): number | null {
  try {
    const arr = JSON.parse(jsonText)
    return Array.isArray(arr) ? arr.length : null
  } catch {
    return null
  }
}

function applyColMapping(
  rows: Record<string, unknown>[],
  map: ColMap,
): Record<string, unknown>[] {
  const active = Object.entries(map).filter(([api, user]) => user && user !== api)
  if (active.length === 0) return rows
  return rows.map((row) => {
    const out: Record<string, unknown> = { ...row }
    active.forEach(([apiField, userField]) => {
      if (userField in row) {
        out[apiField] = row[userField]
        if (userField !== apiField) delete out[userField]
      }
    })
    return out
  })
}

function buildRequestConfig(cfg: Config): Record<string, unknown> {
  const out: Record<string, unknown> = {
    simpleMode:       cfg.simpleMode,
    enableInlineDiff: cfg.enableInlineDiff,
    enableSplits:     cfg.enableSplits,
    enableMerges:    cfg.enableMerges,
    enableCER:       cfg.enableCER,
    enableWER:       cfg.enableWER,
    enableSER:       cfg.enableSER,
    stripDiacritics: cfg.stripDiacritics,
    positionalMode:  cfg.positionalMode,
  }
  if (cfg.ignoreColNames.trim()) {
    out.ignoreColNames = cfg.ignoreColNames.split(',').map((s) => s.trim()).filter(Boolean)
  }
  if (cfg.SIM_CONFIDENT !== 0.75)   out.SIM_CONFIDENT = cfg.SIM_CONFIDENT
  if (cfg.SIM_MODERATE  !== 0.5)    out.SIM_MODERATE  = cfg.SIM_MODERATE
  if (cfg.SIM_WEAK      !== 0.3)    out.SIM_WEAK      = cfg.SIM_WEAK
  if (cfg.TIME_EXACT_TOL !== 1.0)   out.TIME_EXACT_TOL = cfg.TIME_EXACT_TOL
  if (cfg.TIME_FUZZY_TOL !== 2.5)   out.TIME_FUZZY_TOL = cfg.TIME_FUZZY_TOL
  if (cfg.SPLIT_COMBINED_MIN !== 0.35) out.SPLIT_COMBINED_MIN = cfg.SPLIT_COMBINED_MIN
  if (cfg.MERGE_COMBINED_MIN !== 0.65) out.MERGE_COMBINED_MIN = cfg.MERGE_COMBINED_MIN
  if (cfg.CHAR_DIFF_LIMIT !== 1500)    out.CHAR_DIFF_LIMIT    = cfg.CHAR_DIFF_LIMIT
  return out
}

function summarizeCounts(results: Record<string, unknown>[]): Record<string, number> {
  const counts: Record<string, number> = {}
  results.forEach((r) => {
    if ((r.notes as string)?.startsWith('Source row ')) return
    const s = r.status as string
    counts[s] = (counts[s] ?? 0) + 1
  })
  return counts
}

// ── Sub-components ────────────────────────────────────────────────
function Toggle({
  value,
  onChange,
  label,
  desc,
  disabled,
}: {
  value: boolean
  onChange: (v: boolean) => void
  label: string
  desc: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!value)}
      className={`flex items-start gap-3 w-full text-left transition-opacity ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      }`}
    >
      <div
        className={`mt-0.5 w-9 h-5 rounded-full shrink-0 transition-colors relative ${
          value ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            value ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </div>
      <div>
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</span>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
      </div>
    </button>
  )
}

function NumInput({
  value,
  onChange,
  label,
  desc,
  min,
  max,
  step,
}: {
  value: number
  onChange: (v: number) => void
  label: string
  desc: string
  min: number
  max: number
  step: number
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5">
        {label}
      </label>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{desc}</p>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-32 px-2.5 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function ResultRow({
  row,
  idx,
  t,
}: {
  row: Record<string, unknown>
  idx: number
  t: ReturnType<typeof getLiveSimulatorI18n>
}) {
  const [open, setOpen] = useState(false)
  const isTrace = (row.notes as string)?.startsWith('Source row ')
  const tokens = row.transcriptDiff as { type: string; value: string }[] | undefined

  return (
    <div
      className={`border-b border-gray-100 dark:border-gray-800 last:border-0 ${
        isTrace ? 'ml-8' : ''
      }`}
    >
      <button
        type="button"
        className={`flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/40 transition-colors text-left ${
          isTrace ? 'opacity-60' : ''
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-xs text-gray-400 font-mono w-6 text-right shrink-0">
          {isTrace ? '↩' : idx}
        </span>
        <StatusPill status={row.status as string} />
        <span className="flex-1 min-w-0 text-xs text-gray-500 dark:text-gray-400 truncate">
          {row.notes as string}
        </span>
        {tokens && (
          <div className="hidden lg:block flex-1 min-w-0 overflow-hidden">
            <InlineDiff tokens={tokens} />
          </div>
        )}
        {open ? (
          <ChevronDown size={13} className="shrink-0 text-gray-400" />
        ) : (
          <ChevronRight size={13} className="shrink-0 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="px-4 pb-5 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 space-y-4">
          {/* Inline transcript diff */}
          {tokens && (
            <div className="pt-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {t.results.transcriptDiff}
              </p>
              <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3">
                <InlineDiff tokens={tokens} />
              </div>
            </div>
          )}

          {/* Quality scores */}
          {(row.cerScore != null || row.werScore != null || row.serScore != null) && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                {t.results.scores}
              </p>
              <div className="flex flex-wrap gap-4">
                {(['cerScore', 'werScore', 'serScore'] as const).map(
                  (k) =>
                    row[k] != null && (
                      <div key={k} className="text-xs">
                        <span className="text-gray-400 uppercase font-semibold">
                          {k.replace('Score', '').toUpperCase()}
                        </span>
                        <span className="ml-1 font-mono text-gray-800 dark:text-gray-200">
                          {String(row[k])}
                        </span>
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Raw JSON */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {t.results.rawJson}
            </p>
            <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 overflow-x-auto bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-700 p-3 max-h-64">
              {JSON.stringify(row, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
export default function LiveSimulatorClient() {
  const { language } = useLanguage()
  const t = getLiveSimulatorI18n(language)
  const pathname = usePathname()

  // ── State ─────────────────────────────────────────────────────
  const [originalText, setOriginalText]   = useState('')
  const [reworkedText, setReworkedText]   = useState('')
  const [apiKey, setApiKey]               = useState('')
  const [showKey, setShowKey]             = useState(false)
  const [requestId, setRequestId]         = useState('')
  const [config, setConfig]               = useState<Config>(DEFAULT_CONFIG)
  const [transformRules, setTransformRules] = useState<TransformRule[]>([])
  const [showExpert, setShowExpert]       = useState(false)
  const [showTransforms, setShowTransforms] = useState(false)
  const [colMap, setColMap]               = useState<ColMap>({ transcript: '', speaker: '', start_time: '', end_time: '' })
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [samplesOpen, setSamplesOpen]             = useState(false)
  const [loading, setLoading]                     = useState(false)
  const [error, setError]                 = useState<string | null>(null)
  const [results, setResults]             = useState<Record<string, unknown>[] | null>(null)
  const [activeId, setActiveId]           = useState(t.nav.sections[0]?.id ?? '')

  const originalFileRef  = useRef<HTMLInputElement>(null)
  const reworkedFileRef  = useRef<HTMLInputElement>(null)
  const samplesMenuRef   = useRef<HTMLDivElement>(null)

  // Restore API key from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem('sim_api_key')
    if (saved) setApiKey(saved)
  }, [])

  // Right sidebar scroll tracking
  useEffect(() => {
    const ids = t.nav.sections.map((s) => s.id)
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-20% 0px -70% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileSidebarOpen(false)
  }

  const loadSample = (idx: number) => {
    const s = SAMPLES[idx]
    setOriginalText(s.original)
    setReworkedText(s.reworked)
    setResults(null)
    setError(null)
    setSamplesOpen(false)
  }

  // Close samples dropdown on outside click
  useEffect(() => {
    if (!samplesOpen) return
    const handler = (e: MouseEvent) => {
      if (samplesMenuRef.current && !samplesMenuRef.current.contains(e.target as Node)) {
        setSamplesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [samplesOpen])

  const handleFileUpload =
    (side: 'original' | 'reworked') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const text = ev.target?.result as string
        side === 'original' ? setOriginalText(text) : setReworkedText(text)
      }
      reader.readAsText(file)
      e.target.value = ''
    }

  const updateConfig = <K extends keyof Config>(key: K, val: Config[K]) => {
    setConfig((prev) => {
      const next: Config = { ...prev, [key]: val }

      if (key === 'simpleMode') {
        if (val) {
          // simpleMode ON — disables split/merge/scoring only; inline diff is independent
          next.positionalMode  = false
          next.enableSplits    = false
          next.enableMerges    = false
          next.enableCER       = false
          next.enableWER       = false
          next.enableSER       = false
        } else {
          // simpleMode OFF — restore detection and scoring
          next.enableSplits    = true
          next.enableMerges    = true
          next.enableCER       = true
          next.enableWER       = true
          next.enableSER       = true
        }
      }

      if (key === 'positionalMode') {
        if (val) {
          // positionalMode ON — mutually exclusive with simpleMode; no splits/merges/SER
          next.simpleMode      = false
          next.enableSplits    = false
          next.enableMerges    = false
          next.enableSER       = false
          next.enableInlineDiff = true   // inline diff is the core feature of positional mode
        } else {
          // positionalMode OFF — restore
          next.enableSplits    = true
          next.enableMerges    = true
          next.enableSER       = true
        }
      }

      // If both splits & merges are turned off in normal mode, SER requires at least one
      if (
        (key === 'enableSplits' || key === 'enableMerges') &&
        !next.simpleMode &&
        !next.positionalMode &&
        !next.enableSplits &&
        !next.enableMerges
      ) {
        next.enableSER = false
      }

      return next
    })
  }

  const resetAll = () => {
    setOriginalText('')
    setReworkedText('')
    setResults(null)
    setError(null)
    setConfig(DEFAULT_CONFIG)
    setTransformRules([])
    setColMap({ transcript: '', speaker: '', start_time: '', end_time: '' })
  }

  const submitDiff = async () => {
    setError(null)
    setResults(null)

    let original: Record<string, unknown>[]
    let reworked: Record<string, unknown>[]

    try {
      original = JSON.parse(originalText)
      if (!Array.isArray(original)) throw new Error()
    } catch {
      setError(t.errors.parseOriginal)
      return
    }
    try {
      reworked = JSON.parse(reworkedText)
      if (!Array.isArray(reworked)) throw new Error()
    } catch {
      setError(t.errors.parseReworked)
      return
    }
    if (!apiKey.trim()) {
      setError(t.run.noKey)
      return
    }

    const mappedOriginal = applyColMapping(original, colMap)
    const mappedReworked = applyColMapping(reworked, colMap)

    sessionStorage.setItem('sim_api_key', apiKey)
    setLoading(true)

    try {
      const body = {
        original: mappedOriginal,
        reworked: mappedReworked,
        config: {
          ...buildRequestConfig(config),
          ...(transformRules.length > 0 ? { structuralTransforms: transformRules } : {}),
        },
      }
      const res = await fetch(`${BASE}/v1/diff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim(),
          ...(requestId.trim() ? { 'x-request-id': requestId.trim() } : {}),
        },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({})) as { message?: string }
        throw new Error(errData.message ?? `HTTP ${res.status}`)
      }
      const data = await res.json() as { data?: { results?: unknown[] }; results?: unknown[] }
      const rows = (data?.data?.results ?? data?.results ?? []) as Record<string, unknown>[]
      setResults(rows)
      setTimeout(() => scrollTo('results'), 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errors.fetchFailed)
    } finally {
      setLoading(false)
    }
  }

  const counts = results ? summarizeCounts(results) : null
  const detectedCols = detectColumns(originalText)

  // ── Parameter dependency states ──────────────────────────────
  const simpleOn       = config.simpleMode
  const positionalOn   = config.positionalMode
  const splitsDisabled = simpleOn || positionalOn
  const mergesDisabled = simpleOn || positionalOn
  const cerDisabled    = simpleOn
  const werDisabled    = simpleOn
  const serDisabled    = simpleOn || positionalOn || (!config.enableSplits && !config.enableMerges)
  const showSerHint    = !simpleOn && !positionalOn && !config.enableSplits && !config.enableMerges

  const SidebarContent = () => (
    <div className="py-4 pr-4 space-y-4">
      <div className="space-y-0.5">
        <Link
          href={`/${language}/sheetdiff/api-docs`}
          className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {t.breadcrumb.apiDocs}
        </Link>
      </div>
      <div>
        <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {t.nav.guidesLabel}
        </p>
        <div className="space-y-0.5">
          {t.nav.guides.map((g) => {
            const isActive = pathname?.endsWith(`/${g.slug}`)
            return (
              <Link
                key={g.slug}
                href={`/${language}/sheetdiff/api-docs/${g.slug}`}
                className={`w-full block px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {g.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-900 dark:bg-gray-800 border border-gray-700 text-sm text-gray-200 shadow-lg"
          onClick={() => setMobileSidebarOpen((o) => !o)}
        >
          {mobileSidebarOpen ? <X size={15} /> : <Menu size={15} />}
          <span>{t.nav.sectionsBtn}</span>
        </button>
      </div>

      {mobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="max-w-screen-xl mx-auto flex min-h-screen">
        {/* Left sidebar */}
        <aside className="hidden lg:block w-60 xl:w-64 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 dark:border-gray-800 px-4">
          <SidebarContent />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-6 lg:px-10 py-12 max-w-3xl">
          <FadeIn>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link
                href={`/${language}/sheetdiff/api-docs`}
                className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                {t.breadcrumb.apiDocs}
              </Link>
              <span>/</span>
              <span className="text-gray-600 dark:text-gray-300">{t.breadcrumb.current}</span>
            </div>

            {/* Hero */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Live
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  structural-diff-engine.onrender.com
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {t.hero.title}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">{t.hero.subtitle}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{t.hero.intro}</p>
            </div>

            {/* ── Section 1: Data Input ──────────────────────────── */}
            <H2 id="data-input">{t.input.title}</H2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Paste JSON arrays or upload <IC>.json</IC> files. Each element is one row.
              </p>
              <div className="relative" ref={samplesMenuRef}>
                <button
                  type="button"
                  onClick={() => setSamplesOpen(o => !o)}
                  className="text-xs px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1.5 shrink-0 ml-4"
                >
                  <RotateCcw size={11} />
                  {t.input.loadSample}
                  <ChevronDown size={11} className={`transition-transform ${samplesOpen ? 'rotate-180' : ''}`} />
                </button>
                {samplesOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-50 w-72 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden">
                    <div className="max-h-80 overflow-y-auto">
                      {SAMPLES.map((s, i) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => loadSample(i)}
                          className="w-full text-left px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors"
                        >
                          <div className="text-xs font-medium text-gray-800 dark:text-gray-200">{s.label}</div>
                          <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 leading-snug">{s.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {/* Original pane */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-red-400" />
                    {t.input.originalLabel}
                    {(() => {
                      const n = rowCount(originalText)
                      if (n !== null)
                        return (
                          <span className="ml-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px]">
                            {n} {t.input.rows}
                          </span>
                        )
                      if (originalText) return <span className="ml-1 text-red-500 text-xs">{t.input.invalidJson}</span>
                      return null
                    })()}
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="file"
                      ref={originalFileRef}
                      accept=".json"
                      className="hidden"
                      onChange={handleFileUpload('original')}
                    />
                    <button
                      type="button"
                      onClick={() => originalFileRef.current?.click()}
                      className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex items-center gap-1"
                    >
                      <Upload size={11} />
                      {t.input.upload}
                    </button>
                    {originalText && (
                      <button
                        type="button"
                        onClick={() => setOriginalText('')}
                        className="text-xs px-1.5 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                  placeholder={t.input.placeholder}
                  rows={12}
                  spellCheck={false}
                  className="w-full font-mono text-xs px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-red-50/30 dark:bg-red-950/10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>

              {/* Reworked pane */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    {t.input.reworkedLabel}
                    {(() => {
                      const n = rowCount(reworkedText)
                      if (n !== null)
                        return (
                          <span className="ml-1 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 text-[10px]">
                            {n} {t.input.rows}
                          </span>
                        )
                      if (reworkedText) return <span className="ml-1 text-red-500 text-xs">{t.input.invalidJson}</span>
                      return null
                    })()}
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="file"
                      ref={reworkedFileRef}
                      accept=".json"
                      className="hidden"
                      onChange={handleFileUpload('reworked')}
                    />
                    <button
                      type="button"
                      onClick={() => reworkedFileRef.current?.click()}
                      className="text-xs px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors flex items-center gap-1"
                    >
                      <Upload size={11} />
                      {t.input.upload}
                    </button>
                    {reworkedText && (
                      <button
                        type="button"
                        onClick={() => setReworkedText('')}
                        className="text-xs px-1.5 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>
                </div>
                <textarea
                  value={reworkedText}
                  onChange={(e) => setReworkedText(e.target.value)}
                  placeholder={t.input.placeholder}
                  rows={12}
                  spellCheck={false}
                  className="w-full font-mono text-xs px-3 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-emerald-50/30 dark:bg-emerald-950/10 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                />
              </div>
            </div>

            {/* ── Section 2: Authentication ──────────────────────── */}
            <H2 id="authentication">{t.auth.title}</H2>
            <div className="grid sm:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t.auth.apiKeyLabel}
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={t.auth.apiKeyPlaceholder}
                    className="w-full px-3 py-2 pr-9 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey((v) => !v)}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  {t.auth.requestIdLabel}
                </label>
                <input
                  type="text"
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                  placeholder={t.auth.requestIdPlaceholder}
                  className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <Callout type="info">{t.auth.note}</Callout>

            {/* ── Section 3: Column Mapping ──────────────────────── */}
            <H2 id="column-mapping">{t.mapping.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{t.mapping.body}</p>
            {detectedCols.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {(
                  [
                    ['transcript', t.mapping.transcriptField, false],
                    ['speaker',    t.mapping.speakerField,    false],
                    ['start_time', t.mapping.startTimeField,  true],
                    ['end_time',   t.mapping.endTimeField,    true],
                  ] as [keyof ColMap, string, boolean][]
                ).map(([apiField, label, optional]) => (
                  <div key={apiField}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {label}{' '}
                      {optional && (
                        <span className="text-gray-400 font-normal text-xs">{t.mapping.optional}</span>
                      )}
                    </label>
                    <select
                      value={colMap[apiField]}
                      onChange={(e) => setColMap((m) => ({ ...m, [apiField]: e.target.value }))}
                      className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">{t.mapping.none}</option>
                      {detectedCols.map((col) => (
                        <option key={col} value={col}>
                          {col}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mb-8 italic">
                Paste valid JSON in the Original field to auto-detect columns.
              </p>
            )}

            {/* ── Section 4: Config Parameters ──────────────────── */}
            <H2 id="config">{t.config.title}</H2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{t.config.body}</p>

            <div className="space-y-4 mb-6">
              {/* simpleMode — disabled while positionalMode is active */}
              <Toggle
                value={config.simpleMode}
                onChange={(v) => updateConfig('simpleMode', v)}
                label={t.config.simpleMode.label}
                desc={t.config.simpleMode.desc}
                disabled={positionalOn}
              />

              {/* enableInlineDiff — always independent of simpleMode */}
              <Toggle
                value={config.enableInlineDiff}
                onChange={(v) => updateConfig('enableInlineDiff', v)}
                label={t.config.enableInlineDiff.label}
                desc={t.config.enableInlineDiff.desc}
              />

              <Toggle
                value={config.enableSplits}
                onChange={(v) => updateConfig('enableSplits', v)}
                label={t.config.enableSplits.label}
                desc={t.config.enableSplits.desc}
                disabled={splitsDisabled}
              />
              <Toggle
                value={config.enableMerges}
                onChange={(v) => updateConfig('enableMerges', v)}
                label={t.config.enableMerges.label}
                desc={t.config.enableMerges.desc}
                disabled={mergesDisabled}
              />
              <Toggle
                value={config.enableCER}
                onChange={(v) => updateConfig('enableCER', v)}
                label={t.config.enableCER.label}
                desc={t.config.enableCER.desc}
                disabled={cerDisabled}
              />
              <Toggle
                value={config.enableWER}
                onChange={(v) => updateConfig('enableWER', v)}
                label={t.config.enableWER.label}
                desc={t.config.enableWER.desc}
                disabled={werDisabled}
              />
              <Toggle
                value={config.enableSER}
                onChange={(v) => updateConfig('enableSER', v)}
                label={t.config.enableSER.label}
                desc={t.config.enableSER.desc}
                disabled={serDisabled}
              />
              {showSerHint && (
                <p className="text-xs text-amber-600 dark:text-amber-500 ml-12">
                  {t.config.serHint}
                </p>
              )}
              <Toggle
                value={config.stripDiacritics}
                onChange={(v) => updateConfig('stripDiacritics', v)}
                label={t.config.stripDiacritics.label}
                desc={t.config.stripDiacritics.desc}
              />
              <Toggle
                value={config.positionalMode}
                onChange={(v) => updateConfig('positionalMode', v)}
                label={t.config.positionalMode.label}
                desc={t.config.positionalMode.desc}
              />
            </div>

            {/* ignoreColNames text input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-0.5">
                {t.config.ignoreColNames.label}
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">
                {t.config.ignoreColNames.desc}
              </p>
              <input
                type="text"
                value={config.ignoreColNames}
                onChange={(e) => updateConfig('ignoreColNames', e.target.value)}
                placeholder={t.config.ignoreColNames.placeholder}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Expert thresholds collapsible */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden mb-8">
              <button
                type="button"
                onClick={() => setShowExpert((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                {t.config.expertTitle}
                {showExpert ? (
                  <ChevronDown size={15} className="text-gray-400" />
                ) : (
                  <ChevronRight size={15} className="text-gray-400" />
                )}
              </button>
              {showExpert && (
                <div className="px-4 py-5 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 space-y-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">{t.config.expertBody}</p>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <NumInput value={config.SIM_CONFIDENT}    onChange={(v) => updateConfig('SIM_CONFIDENT', v)}    label={t.config.SIM_CONFIDENT.label}    desc={t.config.SIM_CONFIDENT.desc}    min={0} max={1}  step={0.05} />
                    <NumInput value={config.SIM_MODERATE}     onChange={(v) => updateConfig('SIM_MODERATE', v)}     label={t.config.SIM_MODERATE.label}     desc={t.config.SIM_MODERATE.desc}     min={0} max={1}  step={0.05} />
                    <NumInput value={config.SIM_WEAK}         onChange={(v) => updateConfig('SIM_WEAK', v)}         label={t.config.SIM_WEAK.label}         desc={t.config.SIM_WEAK.desc}         min={0} max={1}  step={0.05} />
                    <NumInput value={config.TIME_EXACT_TOL}   onChange={(v) => updateConfig('TIME_EXACT_TOL', v)}   label={t.config.TIME_EXACT_TOL.label}   desc={t.config.TIME_EXACT_TOL.desc}   min={0} max={60} step={0.1}  />
                    <NumInput value={config.TIME_FUZZY_TOL}   onChange={(v) => updateConfig('TIME_FUZZY_TOL', v)}   label={t.config.TIME_FUZZY_TOL.label}   desc={t.config.TIME_FUZZY_TOL.desc}   min={0} max={60} step={0.1}  />
                    <NumInput value={config.SPLIT_COMBINED_MIN} onChange={(v) => updateConfig('SPLIT_COMBINED_MIN', v)} label={t.config.SPLIT_COMBINED_MIN.label} desc={t.config.SPLIT_COMBINED_MIN.desc} min={0} max={1}  step={0.05} />
                    <NumInput value={config.MERGE_COMBINED_MIN} onChange={(v) => updateConfig('MERGE_COMBINED_MIN', v)} label={t.config.MERGE_COMBINED_MIN.label} desc={t.config.MERGE_COMBINED_MIN.desc} min={0} max={1}  step={0.05} />
                    <NumInput value={config.CHAR_DIFF_LIMIT}    onChange={(v) => updateConfig('CHAR_DIFF_LIMIT', v)}    label={t.config.CHAR_DIFF_LIMIT.label}    desc={t.config.CHAR_DIFF_LIMIT.desc}    min={100} max={50000} step={100} />
                  </div>
                </div>
              )}
            </div>

            {/* Transform Rules collapsible */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden mb-8">
              <button
                type="button"
                onClick={() => setShowTransforms((v) => !v)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left text-sm font-medium text-gray-800 dark:text-gray-200"
              >
                <span>
                  {t.config.transformRules.title}
                  {transformRules.length > 0 && (
                    <span className="ml-2 text-xs font-normal text-blue-600 dark:text-blue-400">
                      ({transformRules.length})
                    </span>
                  )}
                </span>
                {showTransforms ? (
                  <ChevronDown size={15} className="text-gray-400" />
                ) : (
                  <ChevronRight size={15} className="text-gray-400" />
                )}
              </button>
              {showTransforms && (
                <div className="px-4 py-5 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {t.config.transformRules.desc}
                  </p>
                  {transformRules.length === 0 && (
                    <p className="text-xs text-gray-400 dark:text-gray-600 italic mb-3">
                      {t.config.transformRules.noRules}
                    </p>
                  )}
                  <div className="space-y-3 mb-4">
                    {transformRules.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={rule.find}
                            onChange={(e) =>
                              setTransformRules((prev) =>
                                prev.map((r, i) => (i === idx ? { ...r, find: e.target.value } : r)),
                              )
                            }
                            placeholder={t.config.transformRules.findPlaceholder}
                            aria-label={t.config.transformRules.findLabel}
                            className="w-full px-2.5 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1.5"
                          />
                          <input
                            type="text"
                            value={rule.replace}
                            onChange={(e) =>
                              setTransformRules((prev) =>
                                prev.map((r, i) => (i === idx ? { ...r, replace: e.target.value } : r)),
                              )
                            }
                            placeholder={t.config.transformRules.replacePlaceholder}
                            aria-label={t.config.transformRules.replaceLabel}
                            className="w-full px-2.5 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-1 pt-1">
                          <label className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {t.config.transformRules.regexLabel}
                          </label>
                          <input
                            type="checkbox"
                            checked={rule.isRegex}
                            onChange={(e) =>
                              setTransformRules((prev) =>
                                prev.map((r, i) => (i === idx ? { ...r, isRegex: e.target.checked } : r)),
                              )
                            }
                            className="w-4 h-4 accent-blue-600"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setTransformRules((prev) => prev.filter((_, i) => i !== idx))}
                          className="mt-0.5 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                          aria-label="Remove rule"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setTransformRules((prev) => [...prev, { find: '', replace: '', isRegex: false }])
                    }
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {t.config.transformRules.addRule}
                  </button>
                </div>
              )}
            </div>

            {/* Run / Reset buttons */}
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={submitDiff}
                disabled={loading}
                className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    {t.run.running}
                  </>
                ) : (
                  t.run.button
                )}
              </button>
              <button
                type="button"
                onClick={resetAll}
                className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {t.run.reset}
              </button>
            </div>

            {/* Error display */}
            {error && (
              <Callout type="warn">{error}</Callout>
            )}

            {/* ── Section 5: Results ────────────────────────────── */}
            {results && (
              <>
                <H2 id="results">{t.results.title}</H2>

                {/* Summary counts */}
                {counts && Object.keys(counts).length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(counts).map(([status, n]) => (
                      <div
                        key={status}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold"
                        style={{}}
                      >
                        <StatusPill status={status} />
                        <span className="text-gray-700 dark:text-gray-300 ml-1">× {n}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 italic">
                  {t.results.traceNote}
                </p>

                {/* Row list */}
                <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                  {results.map((row, i) => (
                    <ResultRow key={i} row={row} idx={i + 1} t={t} />
                  ))}
                </div>
              </>
            )}

            {/* Footer breadcrumb */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-sm text-gray-400 flex justify-between">
              <Link
                href={`/${language}/sheetdiff/api-docs`}
                className="hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                ← {t.breadcrumb.apiDocs}
              </Link>
            </div>
          </FadeIn>
        </main>

        {/* ── Right TOC sidebar ─────────────────────────────────── */}
        <aside className="hidden xl:block w-52 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto pl-6 py-8 border-l border-gray-200 dark:border-gray-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
            {t.nav.onThisPage}
          </p>
          <div className="space-y-0.5">
            {t.nav.sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left text-xs px-2 py-1.5 rounded transition-colors ${
                  activeId === s.id
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
