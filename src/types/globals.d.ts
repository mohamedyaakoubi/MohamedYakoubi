import { Metadata, Viewport } from 'next';

declare global {
  interface PageConfig {
    metadata?: Metadata;
    viewport?: Viewport;
  }
}