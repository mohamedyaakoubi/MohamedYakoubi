/**
 * Thin wrapper around window.gtag for custom GA4 events.
 * Safe to call before GA loads — events will be dropped silently
 * (GA script queues them anyway via dataLayer).
 */

type GtagFn = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GtagFn
  }
}

function track(eventName: string, params?: Record<string, string | number | boolean>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

export function useAnalytics() {
  return {
    /** Playground: user clicked Run Diff */
    trackRunDiff(params: { row_count_original: number; row_count_reworked: number; has_api_key: boolean }) {
      track('api_docs_run_diff', {
        event_category:      'api_docs_playground',
        row_count_original:  params.row_count_original,
        row_count_reworked:  params.row_count_reworked,
        has_api_key:         params.has_api_key,
      })
    },

    /** Playground: diff returned successfully */
    trackDiffSuccess(params: { row_count_results: number; status_code: number }) {
      track('api_docs_diff_success', {
        event_category:    'api_docs_playground',
        row_count_results: params.row_count_results,
        status_code:       params.status_code,
      })
    },

    /** Playground: diff request failed */
    trackDiffError(params: { error_message: string }) {
      track('api_docs_diff_error', {
        event_category: 'api_docs_playground',
        error_message:  params.error_message.slice(0, 100), // GA string limit
      })
    },

    /** Playground: user loaded a sample dataset */
    trackSampleLoaded(params: { sample_index: number }) {
      track('api_docs_sample_loaded', {
        event_category: 'api_docs_playground',
        sample_index:   params.sample_index,
      })
    },

    /** Playground: user uploaded a JSON file */
    trackFileUploaded(params: { side: 'original' | 'reworked' }) {
      track('api_docs_file_uploaded', {
        event_category: 'api_docs_playground',
        side:           params.side,
      })
    },

    /** Playground: reset clicked */
    trackReset() {
      track('api_docs_reset', { event_category: 'api_docs_playground' })
    },

    /** Nav: user copied a code block */
    trackCopyCode(params: { lang: string; section?: string }) {
      track('api_docs_copy_code', {
        event_category: 'api_docs_engagement',
        lang:           params.lang,
        section:        params.section ?? 'unknown',
      })
    },

    /** CTAs: "Request API Access" clicked */
    trackRequestAccess() {
      track('api_docs_request_access', {
        event_category: 'api_docs_cta',
        event_label:    'request_api_access',
      })
    },

    /** CTAs: "View Google Sheets Add-on" clicked */
    trackViewAddon() {
      track('api_docs_view_addon', {
        event_category: 'api_docs_cta',
        event_label:    'view_addon',
      })
    },

    /** Sub-pages: demo step navigated */
    trackDemoStep(params: { step_index: number; step_id: string }) {
      track('api_docs_demo_step', {
        event_category: 'api_docs_demo',
        step_index:     params.step_index,
        step_id:        params.step_id,
      })
    },
  }
}
