export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;600&family=Syne:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
