# Cache Management Strategy

## Automatic Cache Busting (Implemented)

### 1. Service Worker Versioning
- **Location**: `public/service-worker.js`
- **Current Version**: Automatically updated on each build
- **How it works**: 
  - Before each build, `scripts/update-sw-version.js` runs automatically
  - Updates cache name with Git commit hash or timestamp
  - Old caches are automatically deleted when new version activates

### 2. Cache Control Headers
- **Location**: `next.config.js` → `headers()` function
- **Strategy**:
  - HTML pages: `max-age=0, must-revalidate` (always check for updates)
  - Service Worker: `max-age=0, must-revalidate` (always fresh)
  - Static assets: `max-age=31536000, immutable` (1 year, never changes)
  - Next.js assets: Automatically versioned with content hash

### 3. Next.js Built-in Features
- JavaScript/CSS files automatically get unique hashes
- Image optimization with content-based caching
- API routes bypass service worker cache

## Deployment Workflow

When you deploy new code:

```bash
npm run build    # Automatically updates service worker version
git add .
git commit -m "Update content"
git push         # Deploy to Vercel
```

The `prebuild` script automatically:
1. Gets current Git commit hash
2. Updates service worker cache version
3. Proceeds with normal build

## Manual Cache Version Update

If needed, manually increment in `public/service-worker.js`:

```javascript
const CACHE_NAME = 'mohamed-portfolio-cache-v3'; // Increment this number
```

## What Happens for Users

1. **First visit**: Downloads and caches assets
2. **Return visit**: Serves from cache (fast)
3. **After deployment**: 
   - Service worker detects new version
   - Downloads new assets in background
   - Next page load uses fresh content
   - Old cache automatically deleted

## Testing Cache Updates

1. Build locally:
   ```bash
   npm run build
   npm start
   ```

2. Check service worker version in browser DevTools:
   - Open DevTools → Application → Service Workers
   - Look for cache name with version

3. Force cache clear (for testing):
   - DevTools → Application → Clear storage → Clear site data

## Files Modified

- ✅ `public/service-worker.js` - Updated to v2, auto-versioning
- ✅ `scripts/update-sw-version.js` - New automated version updater
- ✅ `package.json` - Added prebuild script
- ✅ `next.config.js` - Added cache control headers

## Benefits

✅ Users always get latest content after deployment
✅ Fast loading from cache when nothing changed
✅ No manual version management needed
✅ Automatic old cache cleanup
✅ SEO-friendly (fresh content for crawlers)
