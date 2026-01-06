/**
 * IndexNow Submission Script
 * 
 * Usage:
 *   node scripts/submit-indexnow.js              # Submit all URLs
 *   node scripts/submit-indexnow.js /en/experience  # Submit single URL
 * 
 * Or via API:
 *   curl "https://mohamedyaakoubi.vercel.app/api/indexnow?all=true"
 *   curl "https://mohamedyaakoubi.vercel.app/api/indexnow?url=/en/experience"
 */

const SITE_URL = process.env.SITE_URL || 'https://www.mohamedyaakoubi.live';

async function submitToIndexNow(urls = null, submitAll = false) {
  const endpoint = `${SITE_URL}/api/indexnow`;
  
  try {
    let response;
    
    if (submitAll || !urls) {
      // Submit all URLs
      console.log('📤 Submitting all URLs to IndexNow...\n');
      response = await fetch(`${endpoint}?all=true`);
    } else {
      // Submit specific URLs
      console.log(`📤 Submitting ${urls.length} URL(s) to IndexNow...\n`);
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls }),
      });
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Success!\n');
      console.log(`Endpoint: ${result.endpoint}`);
      console.log(`Status: ${result.status}`);
      console.log(`URLs submitted: ${result.urlsSubmitted?.length || 0}`);
      console.log('\n💡 Note: IndexNow shares URLs across ALL participating search engines automatically!');
      console.log('   (Bing, Yandex, Seznam, Naver, Amazon, Yep)\n');
    } else {
      console.log('⚠️  Submission failed\n');
      console.log('Results:', JSON.stringify(result, null, 2));
      console.log('\n💡 Tip: If you got status 429 (rate limited), wait a few minutes and try again.');
    }
    
    return result;
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error.message);
    process.exit(1);
  }
}

// Run from command line
const args = process.argv.slice(2);

if (args.length === 0) {
  // Submit all URLs
  submitToIndexNow(null, true);
} else if (args[0] === '--help' || args[0] === '-h') {
  console.log(`
IndexNow Submission Script

Usage:
  node scripts/submit-indexnow.js              Submit all site URLs
  node scripts/submit-indexnow.js /path        Submit a single URL path
  node scripts/submit-indexnow.js /p1 /p2      Submit multiple URL paths

Examples:
  node scripts/submit-indexnow.js
  node scripts/submit-indexnow.js /en/experience
  node scripts/submit-indexnow.js /en/experience /fr/experience /ar/experience
`);
} else {
  // Submit specific URLs
  submitToIndexNow(args, false);
}
