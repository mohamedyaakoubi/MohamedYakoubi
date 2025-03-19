export function StaticSEO() {
    return (
      // This component adds an H1 tag visible to crawlers but minimal visual impact
      <div style={{position: 'relative', zIndex: 1}}>
        <h1 style={{
          fontSize: '16px',
          margin: '0 auto',
          padding: '10px 0',
          textAlign: 'center',
          color: 'inherit'
        }}>
          Mohamed Yaakoubi | Emerging AI and Technology Specialist
        </h1>
      </div>
    )
  }