import { BlogPost, BlogCategory, BlogTheme } from '@/types/blog';
import { postContent as arContent } from './blog/content/ai-built-it/ar';
import { postContent as frContent } from './blog/content/ai-built-it/fr';

type LocaleContent = {
  title: string;
  heroTitle: string;
  description: string;
  content: string;
  heroTag?: string;
  tags?: string[];
};

const localeContentMap: Record<string, Record<string, LocaleContent>> = {
  'ai-built-it-i-broke-it-ai-helped-me-break-it': {
    ar: arContent,
    fr: frContent,
  },
};

// Theme for the first post — AI & Cybersecurity: editorial red accent
export const aiCyberTheme: BlogTheme = {
  accent: '#ff4444',
  accentRgb: '255,68,68',
  heroTag: 'Security Analysis · 24/03/2026',
  cardAccentText: 'text-red-400',
  cardAccentHover: 'hover:text-red-300',
  cardCategoryBg: 'bg-red-500/10',
  cardCategoryText: 'text-red-400',
  cardBorder: 'border-red-500/20',
  cardHoverBorder: 'hover:border-red-500/40',
  cardGradient: 'from-red-600 to-orange-600',
  tagBg: 'bg-red-500/10',
  tagText: 'text-red-300',
  tagBorder: 'border-red-500/20',
};

export const blogCategories: { id: BlogCategory; label: string }[] = [
  { id: "AI & Cybersecurity", label: "AI & Cybersecurity" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "ai-built-it-i-broke-it-ai-helped-me-break-it",
    title: "AI Built It. I Broke It. AI Helped Me Break It.",
    heroTitle: '<span class="hero-safe">AI Built It.</span> <span class="hero-warn">I Broke It.</span><br><em class="hero-danger">AI Helped Me Break It.</em>',
    description: "A story about curiosity, a game campaign, client-side trust, and what happens when AI-assisted development ships without a security lens — analyzed with AI assistance itself.",
    category: "AI & Cybersecurity",
    tags: ["Penetration Testing", "Web Security", "AI-Assisted Development", "Responsible Disclosure", "Vibe Coding", "SecureByDesign", "GameSecurity", "ClientSideTrust"],
    publishedAt: "2026-03-24",
    readingTime: 15,
    author: {
      name: "Mohamed Yaakoubi",
      url: "https://www.mohamedyaakoubi.com",
    },
    theme: aiCyberTheme,
    content: `## 01 — The Starting Point

I came across a game campaign — a web-based platform where real users competed for real prizes over a multi-day schedule. The app was polished. Smooth animations, clean UI, mobile-responsive, multi-language. It had clearly had significant effort put into it.

One detail worth noting upfront: the application was primarily distributed through a mobile app — the game ran inside an embedded in-app browser. Most users would have encountered it on their phones, inside an app, with no way to open DevTools or inspect anything. The web URL existed, but the intended experience was mobile-first and contained.

This is an assumption that creates a false sense of security. An in-app browser does not change what the server sends. The same JavaScript files, the same API responses, the same client bundle — all of it is equally accessible to anyone who opens the URL in a desktop browser. The mobile wrapper is a UX layer, not a security boundary.

Out of analytical curiosity, I did exactly that — opened the URL in a desktop browser and pressed F12.

The first thing I saw was not the app. It was the console.

---

## 02 — The First Signal: The Console

Before any source code analysis, before any API testing — the moment DevTools opened, the browser console was printing a continuous stream of internal application logs.

Not one or two debug lines. Every page. Every action. Every service call.

\`\`\`
[GAME SERVICE] Session started: {sessionId}
[GAME SERVICE] Submitting outcome: {sessionId, roundNumber, score}
[TEAM SERVICE] Team created: {teamId}
[TEAM SERVICE] Invitation sent successfully
[AUTH PROVIDER] 401 error, attempting token refresh
[AUTH PROVIDER] Token refreshed, retrying request
[AUTH PROVIDER] Signing out with locale: {locale}
[LOGIN PAGE] Calling OTP API...
[LOGIN PAGE] OTP API successful
\`\`\`

Session IDs, trial numbers, scores, team IDs, authentication events, token refresh cycles, sign-out triggers — all live, all visible, all in production.

This was the first signal. Not a subtle one.

When an application logs this aggressively in production — across every service, every page, every user action — it tells you one of two things: it was built in a hurry, or it was built with AI assistance and the debug scaffolding was never stripped. In this case, the evidence pointed to both.

It also revealed something about the deployment assumption. The developer distributed the app inside a mobile in-app browser, where most users would never open a console. If users cannot see the console, the logs do not matter. That reasoning, whether conscious or not, is exactly the kind of assumption that leads to shipping debug output into production.

The URL was public. Any desktop browser could open it. And the console was a roadmap to everything that followed.

---

## 03 — The Architecture

Before getting into findings, it helps to understand what we are working with.

The application was a Next.js Client-Side Rendered app backed by a REST API. Three game modes, a team system, a leaderboard, and OTP-based phone authentication.

:::arch
CLIENT (CSR Browser App)
  │
  ├── Game UI ────────────── outcome generated here ⚠️
  ├── Score calculation ──── client-side randomness ⚠️
  ├── Signature signing ──── secret returned from server ⚠️
  └── Console logs ────────── session internals exposed ⚠️

API (REST Backend)
  │
  ├── POST /session/create ──── returns signing secret ⚠️
  ├── POST /session/:id/submit-round ── accepts client values ⚠️
  └── POST /session/:id/submit-result ── accepts client winner ⚠️
:::

The stack itself is modern and reasonable. The vulnerabilities were not in the technology choices — they were in the trust model. Specifically, how much the server trusted the client to report its own game outcomes honestly.

---

## 04 — The Findings

---

### Finding 1 — Client-Controlled Game Outcomes + HMAC Forgery [Critical]

The game generated outcome values entirely in the browser using a client-side random function. These values — the inputs and the computed score — were then sent to the server along with an HMAC signature to prove integrity.

The HMAC scheme was a legitimate security mechanism in concept. The fatal flaw: the signing key was returned by the server in the session creation response.

\`\`\`javascript
// Pattern: signing formula exposed in client bundle
function signOutcome(sessionId, roundNumber, input1, input2, score, timestamp, signingKey) {
  const message = \\\`\\\${sessionId}:\\\${roundNumber}:\\\${input1}:\\\${input2}:\\\${score}:\\\${timestamp}\\\`;
  return HMAC_SHA256(message, signingKey);
}
\`\`\`

Once a player had the signing key, they could forge a valid signature for any outcome values and any score they chose. The server had no way to distinguish a legitimate submission from a forged one — both used the correct key to produce a correct signature.

The abuse path:

\`\`\`javascript
// Step 1 — Create session, capture the signing key from the response
const { sessionId, signingKey } = await createSession();

// Step 2 — For each round, forge maximum outcome values and sign them
for (let round = 1; round <= TOTAL_ROUNDS; round++) {
  const timestamp = Date.now();
  const signature = signOutcome(sessionId, round, MAX_INPUT, MAX_INPUT, MAX_SCORE, timestamp, signingKey);

  // Step 3 — Submit forged outcome — server accepts because signature is valid
  await submitRound({ round, input1: MAX_INPUT, input2: MAX_INPUT, score: MAX_SCORE, timestamp, signature });
}
// Result: maximum possible score registered. Server accepted without question.
\`\`\`

The signing key was the only thing standing between the server and a tampered submission. By returning it in the session response, the scheme protected nothing. The logic was sound. The key distribution was not.

The maximum possible score across all rounds was submitted, accepted, and reflected on the leaderboard.

This class of attack applies to any game mode using the same scheme — if the signing key is returned from any session endpoint, that mode is equally vulnerable.

**Fix:** Generate all outcome values server-side. Never accept game inputs or scores from the client. Never return a signing key in an API response. If the server generates the outcome, there is nothing to forge.

---

### Finding 2 — No Integrity Protection on Round Submission [Critical]

A second game mode — player versus computer — had no integrity mechanism at all. The submission endpoint accepted the complete round results directly from the client, including which player won each round, what each input value was, and the final score.

\`\`\`javascript
// Pattern: client submits its own game result
await submitGameResult({
  score: TOTAL_ROUNDS,
  rounds: [
    { round: 1, playerInput: MAX_VALUE, opponentInput: MIN_VALUE, winner: 'player' },
    { round: 2, playerInput: MAX_VALUE, opponentInput: MIN_VALUE, winner: 'player' },
    { round: 3, playerInput: MAX_VALUE, opponentInput: MIN_VALUE, winner: 'player' }
  ]
});
// Response: { success: true }
\`\`\`

The server had pre-determined the game outcome internally — a result flag existed in the session logic — but never enforced it during submission. The client-provided outcome overrode everything. One API call. Winner: player. Every time.

**Fix:** Determine game outcomes server-side. Never accept outcome values, opponent inputs, or winner determination from the client.

---

### Finding 3 — Verbose Production Console Logs [High]

As described in the opening — the console logs were not incidental. They were pervasive. Every major service, every user action, every authentication event was logging to the browser console in the production build.

This is a direct symptom of AI-generated code. When you ask an AI to add logging to a service, it adds it everywhere — because comprehensive logging is helpful during development. It does not distinguish between development and production contexts unless explicitly asked. It does not add NODE_ENV checks. It does not strip debug statements for deployment. It optimizes for the immediate task.

The result is a live internal debug feed handed to every user who knows how to press F12.

**Fix:** Strip all console.log calls before production builds. Use a logging library with environment-level controls, or add a build step that removes debug output automatically.

---

### Finding 4 — Abandoned Sessions Consume Daily Limit [High]

Starting a game session immediately consumed the user's daily play limit — even if the session expired unused. A network interruption, a closed tab, or a slow connection would silently burn the user's only attempt for that day.

Their progress would show score: 0, status: NOT_PLAYED — but no new session could be created. The daily limit error codes (\`dailyPlayLimitReached\` for solo mode, \`dailyLimitReached\` for team mode) would block any further attempts regardless of whether the session was ever actually played.

This is not a security vulnerability in the traditional sense, but it is a business logic flaw with real consequences for legitimate players. In a campaign with prizes, a user losing their daily attempt to a network timeout is a meaningful UX and fairness issue.

**Fix:** Only consume the daily limit upon successful session completion (sessionCompleted: true), not on session creation.

---

### Finding 5 — Full Game Logic Exposed in Client Bundle [High]

Beyond the console logs and the outcome logic, the client bundle contained significantly more than a rendering layer needs:

- The complete signature formula with its full message construction pattern
- The full scoring algorithm including bonus conditions
- All API route structures across all game modes
- Session lifecycle values for every mode
- A complete internal error code registry across all domains — auth, game logic, team operations, security, and validation
- The signing secret stored in component state, readable via browser developer tools

A motivated analyst could reconstruct the entire backend API surface, business logic, error handling behavior, and security model within 30 minutes of reading the bundle. The console logs accelerated this further — the service labels and action names mapped directly to the relevant code sections.

**Fix:** The client should receive only what it needs to render the current state. Scoring formulas, HMAC implementations, and internal error taxonomies belong on the server.

---

### Findings Summary

| Finding | Severity | Status |
|---------|----------|--------|
| Client-controlled dice + HMAC forgery | Critical | Confirmed exploited |
| No integrity on round submission | Critical | Confirmed exploited |
| Verbose production console logs | High | Confirmed |
| Abandoned sessions consume daily limit | High | Confirmed |
| Full game logic exposed in client bundle | High | Confirmed |

---

## 05 — The Root Cause

Every critical finding shares the same root cause: the server trusted the client.

This is the cardinal sin of competitive game security. In any system where outcomes have real-world value — prizes, leaderboard rankings, monetary rewards — the server must be the sole authority on game state. The client is a display layer. It shows the player what is happening. It does not decide what happens.

The correct architecture:

:::diagram
CLIENT|Create session|SERVER
SERVER|{ sessionId }|CLIENT|No secret. No signing key.
CLIENT|"Generate outcome"|SERVER|Just a trigger.
SERVER|{ input1, input2, score }|CLIENT|Server generates. Server scores.
CLIENT|"Submit round"|SERVER|No values. Server already knows.
SERVER|{ roundResult }|CLIENT
:::

In this model there is nothing to forge. The client never holds values that matter. The HMAC scheme becomes unnecessary entirely — because the server never needs to ask the client to prove anything about game state. The server already has the ground truth.

---

## 06 — The Real Story: AI Built This. And AI Found It.

:::quote
AI coding tools optimize for one thing: <span>making it work.</span>
They are not security engineers.
:::

The application was built with significant AI assistance. The code was clean, well-structured, consistently named, and covered edge cases properly. The developer used AI tooling effectively to build a working, polished product quickly. That is genuinely impressive.

But AI coding tools have a fundamental blind spot: they optimize for correctness, not security.

When you ask an AI to implement outcome generation for a browser game, it will generate it client-side using a random function. That is the correct, idiomatic, working solution for a browser game. The AI does not know your game has real prizes. It does not know that client-side randomness in a competitive context is a critical vulnerability. It produces working code and moves on.

When you ask an AI to implement signature-based verification for game submissions, it will generate a working implementation. It may even suggest returning the signing key from the session endpoint — because that is a natural place to initialize shared state between client and server. It does not reason about the security implication of exposing a cryptographic secret to the party you are trying to defend against.

When you ask an AI to add logging for debugging, it will add statements throughout every service, every component, every action. It will not add environment checks. It will not remind you to strip them before deployment. It optimizes for the immediate task — and the immediate task was making development easier, not preparing for production.

The result is code that:
- Passes every functional test
- Works correctly in development
- Looks professional and well-structured
- Contains security assumptions that were never validated

This is not a failure of intelligence or effort. It is a failure of context. The tool was not given a threat model. It was given feature requirements. It delivered on those requirements completely.

Now here is the part worth sitting with.

**This entire analysis was also conducted with AI assistance.**

The methodology, the source code enumeration, the exploit scripts, the API testing, the structured findings — all developed collaboratively with an AI tool. The same category of tool that introduced these vulnerabilities was used to find them.

This is not a contradiction. It illustrates something precise:

AI tools are force multipliers. They amplify the intentions and the knowledge of the person operating them. A developer using AI to ship fast, without security awareness, ships fast and insecurely. A security analyst using AI to enumerate systematically, with security knowledge, analyzes faster and more thoroughly.

:::alert
**The gap is not the tool. The gap is the workflow.** AI-assisted development without a security review step will consistently produce applications that work perfectly and fail audits.
:::

The tool is neutral. The awareness is not.

---

## 07 — What to Add to Your Workflow

None of this requires a dedicated security team. It requires awareness and a checklist.

1. **Never trust the client for competitive outcomes.** Any value that affects scores, rankings, or prizes must be generated and validated server-side. The client is a display layer.

2. **Never return secrets in API responses.** If you are signing data, the signing key should never travel to the client. If the client has the key, the signature proves nothing.

3. **Strip debug output before shipping.** Set up a build step that removes or disables all console.log calls in production. An in-app mobile browser does not make console logs invisible — it just makes them less convenient to access.

4. **Do not treat mobile distribution as a security boundary.** If your application has a public URL, anyone can open it in a desktop browser. Design for the open web, not for the expected user journey.

5. **Open your own app in DevTools before your users do.** Read your own console. Read your own network requests. Read your own JS bundle. If you can understand your entire business logic from the client, so can anyone else.

6. **Add a security review prompt to your AI workflow.** After generating a feature, explicitly ask: "What are the security implications of this implementation? What could an attacker abuse here?" The tool will not volunteer this — you have to ask.

7. **Treat client input as untrusted by default.** Validate and reconstruct all game-critical values server-side regardless of what the client sends.

---

## Closing

The goal of this post is not to embarrass anyone. Building a full-stack game platform, solo, on a deadline, is genuinely hard. The developer shipped something real users engaged with. That is not nothing.

The goal is to make this pattern visible — because it will happen again. As AI-assisted development becomes the default, the gap between "works correctly" and "works securely" will widen unless developers actively bridge it.

Security is not a feature you add after the fact. It is an architectural decision you make before you write the first line of code.

AI can help you build. Make sure you are the one thinking about security.

---

*All testing described in this post was conducted analytically and in good faith on accounts I controlled. No user data was accessed, extracted, or retained. No systems were damaged.*

*— Written with AI assistance, reviewed with human judgment.*`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getRecentBlogPosts(count: number = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}

export function getLocalizedBlogPost(slug: string, locale: string): BlogPost | undefined {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return undefined;
  if (locale === 'en' || !localeContentMap[slug]?.[locale]) return post;

  const lc = localeContentMap[slug][locale];
  return {
    ...post,
    title: lc.title,
    heroTitle: lc.heroTitle,
    description: lc.description,
    content: lc.content,
    tags: lc.tags || post.tags,
    theme: {
      ...post.theme,
      heroTag: lc.heroTag || post.theme.heroTag,
    },
  };
}

export function getLocalizedBlogPosts(locale: string): BlogPost[] {
  return blogPosts.map(post => getLocalizedBlogPost(post.slug, locale) || post);
}
