
declare global {
  interface PageConfig {
    metadata?: Metadata;
    viewport?: Viewport;
  }
}
// Type definitions for non-standard browser APIs

// Type definitions for non-standard browser APIs
interface Navigator {
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    type?: string;
    downlink?: number;
    rtt?: number;
  };
}

// HTMLLinkElement with non-standard attributes
interface HTMLLinkElement {
  importance?: string;
}

// HTMLImageElement with non-standard attributes
interface HTMLImageElement {
  fetchPriority?: string;
}

// requestIdleCallback
interface Window {
  requestIdleCallback: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback: (handle: number) => void;
}

interface IdleRequestCallback {
  (deadline: IdleDeadline): void;
}

interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
}

interface IdleRequestOptions {
  timeout?: number;
}