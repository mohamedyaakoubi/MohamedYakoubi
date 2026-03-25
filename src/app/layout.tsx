import './globals.css'
import './production-fixes.css'

// Root layout is a passthrough — the [locale]/layout.tsx provides <html> and <body>
// with dynamic lang/dir attributes. This avoids nested <html>/<body> hydration errors.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}