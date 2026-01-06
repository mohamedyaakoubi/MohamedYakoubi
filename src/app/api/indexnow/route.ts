import { NextRequest, NextResponse } from 'next/server';

// IndexNow configuration
const INDEXNOW_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6';
const SITE_HOST = 'www.mohamedyaakoubi.live';

// Primary IndexNow endpoint - all IndexNow-enabled search engines share URLs automatically
// So we only need to submit to ONE endpoint (Yandex works reliably)
// Other engines (Bing, Seznam, Naver, Amazon, Yep) will receive URLs automatically
const PRIMARY_ENDPOINT = 'yandex.com';

// All pages on your site
const ALL_URLS = [
  '/',
  '/en',
  '/fr',
  '/ar',
  '/en/experience',
  '/fr/experience',
  '/ar/experience',
  '/en/projects',
  '/fr/projects',
  '/ar/projects',
  '/en/services',
  '/fr/services',
  '/ar/services',
  '/en/contact',
  '/fr/contact',
  '/ar/contact',
];

interface IndexNowPayload {
  host: string;
  key: string;
  urlList: string[];
}

async function submitToSearchEngine(
  searchEngine: string,
  payload: IndexNowPayload
): Promise<{ engine: string; status: number; success: boolean }> {
  try {
    const response = await fetch(`https://${searchEngine}/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return {
      engine: searchEngine,
      status: response.status,
      success: response.status === 200 || response.status === 202,
    };
  } catch (error) {
    console.error(`Error submitting to ${searchEngine}:`, error);
    return {
      engine: searchEngine,
      status: 500,
      success: false,
    };
  }
}

// POST handler - submit URLs to IndexNow
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urls, submitAll } = body;

    // Determine which URLs to submit
    let urlsToSubmit: string[];
    if (submitAll) {
      urlsToSubmit = ALL_URLS.map(path => `https://${SITE_HOST}${path}`);
    } else if (urls && Array.isArray(urls)) {
      urlsToSubmit = urls.map((url: string) => 
        url.startsWith('http') ? url : `https://${SITE_HOST}${url}`
      );
    } else {
      return NextResponse.json(
        { error: 'Please provide urls array or set submitAll: true' },
        { status: 400 }
      );
    }

    // Prepare payload
    const payload: IndexNowPayload = {
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      urlList: urlsToSubmit,
    };

    // Submit to single endpoint - IndexNow shares URLs across all participating search engines
    const result = await submitToSearchEngine(PRIMARY_ENDPOINT, payload);
    
    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? 'URLs submitted successfully - shared with all IndexNow search engines (Bing, Yandex, Seznam, Naver, Amazon, Yep)' 
        : `Submission failed with status ${result.status}. Try again later if rate limited (429).`,
      urlsSubmitted: urlsToSubmit,
      endpoint: PRIMARY_ENDPOINT,
      status: result.status,
    });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit URLs', details: String(error) },
      { status: 500 }
    );
  }
}

// GET handler - submit a single URL via query parameter
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const submitAll = searchParams.get('all') === 'true';

  if (!url && !submitAll) {
    return NextResponse.json(
      { 
        error: 'Missing url parameter',
        usage: {
          singleUrl: '/api/indexnow?url=/en/experience',
          allUrls: '/api/indexnow?all=true',
        }
      },
      { status: 400 }
    );
  }

  // Prepare URLs
  const urlsToSubmit = submitAll 
    ? ALL_URLS.map(path => `https://${SITE_HOST}${path}`)
    : [`https://${SITE_HOST}${url}`];

  const payload: IndexNowPayload = {
    host: SITE_HOST,
    key: INDEXNOW_KEY,
    urlList: urlsToSubmit,
  };

  // Submit to single endpoint - IndexNow shares URLs across all participating search engines
  const result = await submitToSearchEngine(PRIMARY_ENDPOINT, payload);

  return NextResponse.json({
    success: result.success,
    message: result.success 
      ? 'URLs submitted successfully - shared with all IndexNow search engines (Bing, Yandex, Seznam, Naver, Amazon, Yep)' 
      : `Submission failed with status ${result.status}. Try again later if rate limited (429).`,
    urlsSubmitted: urlsToSubmit,
    endpoint: PRIMARY_ENDPOINT,
    status: result.status,
  });
}
