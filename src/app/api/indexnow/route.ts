import { NextRequest, NextResponse } from 'next/server';
import { createHash, timingSafeEqual } from 'node:crypto';
import sitemap from '@/app/sitemap';

// IndexNow configuration. The key is public by design: the file /<key>.txt proves ownership.
const INDEXNOW_KEY = '77da1e9fc3fe46049b0fa484eb89f26e';
const SITE_HOST = 'www.mohamedyaakoubi.com';

// Submit to ONE endpoint only: IndexNow shares every submission with all participating engines
// (Bing, Yandex, Seznam, Naver, Yep, Internet Archive, Amazon). Google does not use IndexNow.
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_URLS_PER_REQUEST = 10_000;

// This route makes the site submit URLs under its IndexNow key, so it must not be callable by
// anyone: requests need `Authorization: Bearer <INDEXNOW_SECRET>`. Without the env var it is off.
function authorize(request: NextRequest): NextResponse | null {
  const secret = process.env.INDEXNOW_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: 'IndexNow submission is disabled: set INDEXNOW_SECRET in the environment.' },
      { status: 503 }
    );
  }
  const header = request.headers.get('authorization') ?? '';
  const given = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  // Hash both sides so the comparison is constant-time and length-independent.
  const digest = (value: string) => createHash('sha256').update(value).digest();
  if (!timingSafeEqual(digest(given), digest(secret))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

// Accepts site-relative paths ("/en/blog") or absolute URLs on this host only.
function toSiteUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.length === 0) return null;
  try {
    const url = new URL(value, `https://${SITE_HOST}`);
    return url.protocol === 'https:' && url.host === SITE_HOST ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const denied = authorize(request);
  if (denied) return denied;

  let body: { urls?: unknown; submitAll?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body must be JSON: { "submitAll": true } or { "urls": [...] }' }, { status: 400 });
  }

  let urlList: string[];
  if (body.submitAll === true) {
    // Derived from the sitemap so new pages and blog posts are never missed.
    urlList = sitemap().map((entry) => entry.url);
  } else if (Array.isArray(body.urls) && body.urls.length > 0) {
    const rejected = body.urls.filter((u) => toSiteUrl(u) === null);
    if (rejected.length > 0) {
      return NextResponse.json({ error: `Only URLs on https://${SITE_HOST} are accepted`, rejected }, { status: 400 });
    }
    urlList = [...new Set(body.urls.map((u) => toSiteUrl(u) as string))];
  } else {
    return NextResponse.json({ error: 'Provide { "submitAll": true } or a non-empty "urls" array' }, { status: 400 });
  }

  if (urlList.length > MAX_URLS_PER_REQUEST) {
    return NextResponse.json({ error: `IndexNow accepts at most ${MAX_URLS_PER_REQUEST} URLs per request` }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Could not reach IndexNow', details: String(error) }, { status: 502 });
  }

  // 200 = submitted, 202 = accepted while the key is validated. Anything else is a real failure
  // (400 bad request, 403 key not valid, 422 URL/host mismatch, 429 rate limited) and is passed on.
  if (upstream.status === 200 || upstream.status === 202) {
    return NextResponse.json({ success: true, indexNowStatus: upstream.status, urlsSubmitted: urlList.length, urls: urlList });
  }
  return NextResponse.json(
    { success: false, indexNowStatus: upstream.status, details: (await upstream.text()).slice(0, 500) },
    { status: 502 }
  );
}

// Submitting has side effects, so GET does nothing.
export function GET() {
  return NextResponse.json(
    { error: 'Use POST with Authorization: Bearer <INDEXNOW_SECRET> and { "submitAll": true } or { "urls": [...] }' },
    { status: 405, headers: { Allow: 'POST' } }
  );
}
