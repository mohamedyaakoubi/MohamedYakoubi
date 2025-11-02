#!/usr/bin/env node

/**
 * Automatically updates service worker cache version
 * Run this before each build/deployment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SW_PATH = path.join(__dirname, '../public/service-worker.js');

try {
  // Get git commit hash (short version)
  let version;
  try {
    const gitHash = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
    version = `v${gitHash}`;
  } catch (e) {
    // Fallback to timestamp if not in git repo
    version = `v${Date.now()}`;
  }

  // Read service worker file
  let swContent = fs.readFileSync(SW_PATH, 'utf-8');

  // Replace cache version
  swContent = swContent.replace(
    /const CACHE_NAME = ['"]mohamed-portfolio-cache-v[^'"]+['"]/,
    `const CACHE_NAME = 'mohamed-portfolio-cache-${version}'`
  );

  // Write back
  fs.writeFileSync(SW_PATH, swContent, 'utf-8');

  console.log(`✅ Service Worker cache updated to: mohamed-portfolio-cache-${version}`);
} catch (error) {
  console.error('❌ Error updating service worker version:', error.message);
  process.exit(1);
}
