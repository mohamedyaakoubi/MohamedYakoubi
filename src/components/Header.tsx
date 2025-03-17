import Link from "next/link"

export default function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm" 
      style={{ minHeight: '64px' }} // Add inline style directly
    >
      <nav className="container mx-auto px-6 py-3" style={{ minHeight: '64px' }}>
        <ul className="flex justify-center space-x-6" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
          {["About", "Experience", "Education", "Skills", "Projects", "Contact"].map((item) => (
            <li key={item}>
              <Link 
                href={`#${item.toLowerCase()}`} 
                className="text-gray-300 hover:text-white transition duration-300"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}