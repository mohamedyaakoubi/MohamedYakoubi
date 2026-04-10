import type { SampleDataset } from './types'

export const SAMPLES: SampleDataset[] = [
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
      { speaker: 'Dr. Patel', start_time: 0.00,  end_time: 5.10,  transcript: 'Good morning. Can you describe where the pain is located and when it started?' },
      { speaker: 'Patient',   start_time: 5.10,  end_time: 10.40, transcript: 'It started about three days ago mostly on the right side below the ribs. Gets worse when I breathe deeply.' },
      { speaker: 'Dr. Patel', start_time: 10.40, end_time: 14.20, transcript: 'Any fever chills or shortness of breath?' },
      { speaker: 'Patient',   start_time: 14.20, end_time: 18.00, transcript: 'A little shortness of breath yeah but no fever.' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Dr. Patel', start_time: 0.00,  end_time: 5.10,  transcript: 'Good morning. Can you describe where the pain is located and when it started?' },
      { speaker: 'Patient',   start_time: 5.10,  end_time: 10.40, transcript: 'It started about three days ago, mostly on the right side below the ribs. It gets worse when I breathe deeply.' },
      { speaker: 'Dr. Patel', start_time: 10.40, end_time: 14.20, transcript: 'Any fever, chills, or shortness of breath?' },
      { speaker: 'Patient',   start_time: 14.20, end_time: 18.00, transcript: 'A little shortness of breath, yeah, but no fever.' },
      { speaker: 'Dr. Patel', start_time: 18.00, end_time: 22.50, transcript: "I'd like to order a chest X-ray and some bloodwork to rule out a pulmonary issue." },
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
      { speaker: 'Attorney', transcript: 'Mr. Okafor, where were you on the evening of March fourteenth?' },
      { speaker: 'Witness',  transcript: 'I was at home. I did not leave until around nine PM.' },
      { speaker: 'Witness',  transcript: 'Well, I may have briefly stopped at the gas station on Fifth — but only for five minutes.' },
      { speaker: 'Attorney', transcript: 'And did you speak to anyone at that location?' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Attorney', transcript: 'Mr. Okafor, where were you on the evening of March 14th?' },
      { speaker: 'Witness',  transcript: 'I was at home. I did not leave until around 9 PM.' },
      { speaker: 'Attorney', transcript: 'And did you speak to anyone at that location?' },
    ], null, 2),
  },

  /* 6 ─ News Broadcast — Merge ────────────────────────────────── */
  {
    id: 'news-broadcast-merge',
    label: 'News Broadcast — Merge',
    description: 'Anchor lines collapsed into single segment · MERGED + UNCHANGED',
    original: JSON.stringify([
      { speaker: 'Anchor',   start_time: 0.00,  end_time: 3.80,  transcript: 'Breaking news from the capital this hour.',                                                                              non_speech_events: '[newsroom ambience]' },
      { speaker: 'Anchor',   start_time: 3.80,  end_time: 7.20,  transcript: 'Officials have confirmed that the summit scheduled for Friday has been postponed indefinitely.',                         non_speech_events: '' },
      { speaker: 'Reporter', start_time: 7.20,  end_time: 12.50, transcript: 'Speaking from outside parliament, a senior aide said both parties need more time to align on the trade framework.',      non_speech_events: '' },
      { speaker: 'Anchor',   start_time: 12.50, end_time: 16.00, transcript: "We'll bring you live updates as this story develops.",                                                                  non_speech_events: '' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Anchor',   start_time: 0.00,  end_time: 7.20,  transcript: 'Breaking news from the capital this hour. Officials have confirmed that the summit scheduled for Friday has been postponed indefinitely.', non_speech_events: '[newsroom ambience]' },
      { speaker: 'Reporter', start_time: 7.20,  end_time: 12.50, transcript: 'Speaking from outside parliament, a senior aide said both parties need more time to align on the trade framework.',      non_speech_events: '' },
      { speaker: 'Anchor',   start_time: 12.50, end_time: 16.00, transcript: "We'll bring you live updates as this story develops.",                                                                  non_speech_events: '' },
    ], null, 2),
  },

  /* 7 ─ Customer Support — All Unchanged ──────────────────────── */
  {
    id: 'customer-support-unchanged',
    label: 'Customer Support — Unchanged',
    description: 'Clean approved call transcript · all rows UNCHANGED',
    original: JSON.stringify([
      { speaker: 'Agent',    start_time: 0.00,  end_time: 4.20,  transcript: "Thank you for calling support. My name is Leila. How can I help you today?" },
      { speaker: 'Customer', start_time: 4.20,  end_time: 9.80,  transcript: "Hi Leila, I've been trying to reset my password for the past hour and I keep getting an error message." },
      { speaker: 'Agent',    start_time: 9.80,  end_time: 14.30, transcript: "I'm sorry to hear that. Could you please provide me with the email address associated with your account?" },
      { speaker: 'Customer', start_time: 14.30, end_time: 17.50, transcript: "Sure, it's jsmith at inbox dot com." },
      { speaker: 'Agent',    start_time: 17.50, end_time: 23.10, transcript: "Thank you. I can see your account. I'll send a fresh reset link right now — it should arrive within the next two minutes." },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Agent',    start_time: 0.00,  end_time: 4.20,  transcript: "Thank you for calling support. My name is Leila. How can I help you today?" },
      { speaker: 'Customer', start_time: 4.20,  end_time: 9.80,  transcript: "Hi Leila, I've been trying to reset my password for the past hour and I keep getting an error message." },
      { speaker: 'Agent',    start_time: 9.80,  end_time: 14.30, transcript: "I'm sorry to hear that. Could you please provide me with the email address associated with your account?" },
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
      { speaker: 'Judge',            transcript: 'Counsel, please approach the bench.' },
      { speaker: 'Prosecutor',       transcript: 'Your Honor, the state moves to admit Exhibit 14 into evidence.' },
      { speaker: 'Prosecutor',       transcript: 'This document clearly establishes the chain of custody for the materials seized on October 2nd.' },
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
      { speaker: 'Host', start_time: 0.00,  end_time: 5.00,  transcript: "Welcome everyone. We're here today to unveil something we've been building for the past two years.", non_speech_events: '[applause]' },
      { speaker: 'Host', start_time: 5.00,  end_time: 9.50,  transcript: 'A platform that rethinks how teams collaborate across languages and time zones.',                        non_speech_events: '' },
      { speaker: 'CEO',  start_time: 9.50,  end_time: 15.00, transcript: "Thank you. Building this was one of the hardest and most rewarding challenges of my career.",            non_speech_events: '[applause]' },
      { speaker: 'CEO',  start_time: 15.00, end_time: 21.00, transcript: 'We started with a simple observation: global teams spend thirty percent of their time just trying to understand each other.', non_speech_events: '' },
      { speaker: 'CEO',  start_time: 21.00, end_time: 27.00, transcript: 'So we built an AI layer that sits on top of your existing tools and handles context, translation and summarization automatically.', non_speech_events: '' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Host', start_time: 0.00,  end_time: 9.50,  transcript: "Welcome everyone. We're here today to unveil something we've been building for the past two years — a platform that rethinks how teams collaborate across languages and time zones.", non_speech_events: '[applause]' },
      { speaker: 'CEO',  start_time: 9.50,  end_time: 15.00, transcript: "Thank you. Building this was one of the hardest and most rewarding challenges of my career.",  non_speech_events: '[applause]' },
      { speaker: 'CEO',  start_time: 15.00, end_time: 21.00, transcript: 'We started with a simple observation: global teams spend 30% of their time just trying to understand each other.', non_speech_events: '' },
      { speaker: 'CEO',  start_time: 21.00, end_time: 27.00, transcript: 'So we built an AI layer that sits on top of your existing tools and handles context, translation, and summarization automatically.', non_speech_events: '' },
      { speaker: 'Host', start_time: 27.00, end_time: 31.00, transcript: "Let's take a look at a live demo.", non_speech_events: '[applause]' },
    ], null, 2),
  },

  /* 12 ─ All-Statuses Showcase ─────────────────────────────────── */
  {
    id: 'all-statuses',
    label: 'All-Statuses Showcase',
    description: 'Minimal dataset engineered to produce every status',
    original: JSON.stringify([
      { speaker: 'A', start_time: 0.00,  end_time: 3.00,  transcript: 'This line stays exactly as-is.' },
      { speaker: 'A', start_time: 3.00,  end_time: 7.00,  transcript: 'This line has a minor wording change coming.' },
      { speaker: 'B', start_time: 7.00,  end_time: 12.00, transcript: 'First half of split content goes here and it now becomes two separate lines in the reworked version.' },
      { speaker: 'B', start_time: 15.00, end_time: 18.00, transcript: 'First chunk to be merged together.' },
      { speaker: 'B', start_time: 18.00, end_time: 22.00, transcript: 'Second chunk that gets merged into the above.' },
      { speaker: 'C', start_time: 22.00, end_time: 26.00, transcript: 'This row will be deleted in the reworked version.' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'A', start_time: 0.00,  end_time: 3.00,  transcript: 'This line stays exactly as-is.' },
      { speaker: 'A', start_time: 3.00,  end_time: 7.00,  transcript: 'This line has a minor wording update applied.' },
      { speaker: 'B', start_time: 7.00,  end_time: 9.50,  transcript: 'First half of split content goes here.' },
      { speaker: 'B', start_time: 9.50,  end_time: 12.00, transcript: 'It now becomes two separate lines in the reworked version.' },
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
      { speaker: 'راوٍ', start_time: 0.00,  end_time: 4.50,  transcript: 'في قلب الصحراء الكبرى تمتد مساحات شاسعة من الرمال الذهبية' },
      { speaker: 'راوٍ', start_time: 4.50,  end_time: 8.20,  transcript: 'تتشكل فيها قصص البشر منذ آلاف السنين' },
      { speaker: 'راوٍ', start_time: 8.20,  end_time: 13.00, transcript: 'كل أثر تتركه الريح على الكثبان يحكي حكاية صامتة' },
      { speaker: 'عالم', start_time: 13.00, end_time: 18.50, transcript: 'هذه المنطقة تعد من أكثر البيئات تحديا للحياة البشرية على وجه الأرض' },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'راوٍ', start_time: 0.00,  end_time: 8.20,  transcript: 'في قلب الصحراء الكبرى، تمتد مساحات شاسعة من الرمال الذهبية، تتشكّل فيها قصص البشر منذ آلاف السنين.' },
      { speaker: 'راوٍ', start_time: 8.20,  end_time: 13.00, transcript: 'وكل أثر تتركه الريح على الكثبان يحكي حكاية صامتة.' },
      { speaker: 'عالم', start_time: 13.00, end_time: 18.50, transcript: 'هذه المنطقة تُعدّ من أكثر البيئات تحديًا للحياة البشرية على وجه الأرض.' },
    ], null, 2),
  },

  /* 14 ─ French Broadcast ──────────────────────────────────────── */
  {
    id: 'french-broadcast',
    label: 'French Broadcast',
    description: 'TV news segment · French · MODIFIED + SPLIT',
    original: JSON.stringify([
      { speaker: 'Présentateur',  start_time: 0.00,  end_time: 5.40,  transcript: "Bonsoir. Les négociations commerciales entre l'Union européenne et le Canada ont repris ce matin à Bruxelles après plusieurs semaines de pause." },
      { speaker: 'Présentateur',  start_time: 5.40,  end_time: 10.80, transcript: "Les deux parties se disent optimistes quant à la conclusion d'un accord d'ici la fin du mois bien que des points de désaccord subsistent sur les questions agricoles." },
      { speaker: 'Correspondante', start_time: 10.80, end_time: 17.20, transcript: "Sur place, l'atmosphère est constructive selon les délégués que nous avons pu interroger en marge des discussions." },
    ], null, 2),
    reworked: JSON.stringify([
      { speaker: 'Présentateur',  start_time: 0.00,  end_time: 5.40,  transcript: "Bonsoir. Les négociations commerciales entre l'Union européenne et le Canada ont repris ce matin à Bruxelles, après plusieurs semaines de pause." },
      { speaker: 'Présentateur',  start_time: 5.40,  end_time: 8.20,  transcript: "Les deux parties se disent optimistes quant à la conclusion d'un accord d'ici la fin du mois." },
      { speaker: 'Présentateur',  start_time: 8.20,  end_time: 10.80, transcript: "Des points de désaccord subsistent néanmoins sur les questions agricoles." },
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
      { speaker: 'Narrator', start_time: 0.00,  end_time: 5.80,  transcript: "The Amazon basin covers more than 5.5 million square kilometers, making it the world's largest tropical rainforest." },
      { speaker: 'Narrator', start_time: 5.80,  end_time: 11.20, transcript: 'It is home to an estimated 10% of all species on Earth, many of which have never been catalogued by science.' },
      { speaker: 'Narrator', start_time: 11.20, end_time: 16.50, transcript: 'Every year, vast areas of forest are cleared for agriculture and cattle ranching.' },
      { speaker: 'Narrator', start_time: 16.50, end_time: 22.00, transcript: 'Scientists warn that if deforestation continues at the current rate, the entire ecosystem could reach a tipping point within a generation.' },
    ], null, 2),
  },
]
