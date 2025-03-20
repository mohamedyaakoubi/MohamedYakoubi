export function StaticSEO() {
  return (
    <div className="text-center pt-2 pb-1 max-w-3xl mx-auto">
      <h1 
        className="text-lg sm:text-xl font-medium m-0 p-0 inline-block seo-title"
        style={{
          // Only use valid CSS properties for inline styles
          // contentVisibility is valid for style attribute
          contentVisibility: 'auto',
        }}
        id="page-title"
      >
        Mohamed Yaakoubi | Emerging AI and Technology Specialist
      </h1>
    </div>
  )
}