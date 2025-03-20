import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react" // Import icons

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm" 
      style={{ minHeight: '64px' }}
    >
      <nav className="container mx-auto px-6 py-3" style={{ minHeight: '64px' }}>
        {/* Add mobile menu button with accessible name */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-xl font-bold">My Portfolio</Link>
          
          <button 
            className="md:hidden text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex justify-center space-x-6" style={{ paddingTop: '8px', paddingBottom: '8px' }}>
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
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <ul className="md:hidden flex flex-col space-y-4 mt-4">
            {["About", "Experience", "Education", "Skills", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-300 hover:text-white transition duration-300 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  )
}