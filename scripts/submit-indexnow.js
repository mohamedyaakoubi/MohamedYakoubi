/**
 * IndexNow Submission Script
 *
 * Calls the site's /api/indexnow route, which submits to IndexNow (shared with Bing, Yandex,
 * Seznam, Naver, Yep, Internet Archive and Amazon; Google does not use IndexNow).
 *
 * Requires INDEXNOW_SECRET to match the value set in the Vercel project's environment variables.
 *
 * Usage (PowerShell):
 *   $env:INDEXNOW_SECRET = "<secret>"; node scripts/submit-indexnow.js                 # every sitemap URL
 *   $env:INDEXNOW_SECRET = "<secret>"; node scripts/submit-indexnow.js /en/experience  # specific paths
 *
 * Submit only after real content changes: IndexNow asks not to resubmit unchanged URLs.
 */

const SITE_URL = process.env.SITE_URL || 'https://www.mohamedyaakoubi.com';
const SECRET = process.env.INDEXNOW_SECRET;

async function submitToIndexNow(urls) {
  if (!SECRET) {
    console.error('❌ INDEXNOW_SECRET is not set. Use the same value as in the Vercel environment variables.');
    process.exit(1);
  }

  const body = urls ? { urls } : { submitAll: true };
  console.log(urls ? `📤 Submitting ${urls.length} URL(s) to IndexNow...\n` : '📤 Submitting every sitemap URL to IndexNow...\n');

  let response;
  let result;
  try {
    response = await fetch(`${SITE_URL}/api/indexnow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SECRET}` },
      body: JSON.stringify(body),
    });
    result = await response.json();
  } catch (error) {
    console.error('❌ Error calling /api/indexnow:', error.message);
    process.exit(1);
  }

  if (response.ok && result.success) {
    console.log(`✅ Submitted ${result.urlsSubmitted} URL(s) (IndexNow status ${result.indexNowStatus}).`);
    return;
  }

  console.error(`⚠️  Submission failed (HTTP ${response.status}).`);
  console.error(JSON.stringify(result, null, 2));
  if (result.indexNowStatus === 429) console.error('\n💡 Rate limited: wait before retrying.');
  if (result.indexNowStatus === 403) console.error('\n💡 Key rejected: check that /<key>.txt is served with the key as its only content.');
  process.exit(1);
}

const args = process.argv.slice(2);

if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
IndexNow Submission Script

Usage:
  node scripts/submit-indexnow.js              Submit every URL in the sitemap
  node scripts/submit-indexnow.js /p1 /p2      Submit specific paths on ${SITE_URL}

Requires the INDEXNOW_SECRET environment variable.
`);
} else {
  submitToIndexNow(args.length > 0 ? args : null);
}
