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
          
          {/* Fix the mobile menu button accessibility - COMPLETE REWRITE */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
            
            {/* Icon when menu is closed */}
            <Menu 
              className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
              aria-hidden="true"
            />
            
            {/* Icon when menu is open */}
            <X 
              className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
              aria-hidden="true"
            />
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
        
        {/* Mobile menu with ID for aria-controls */}
        <div
          id="mobile-menu"
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}
        >
          <ul className="flex flex-col space-y-4 mt-4 pt-2 pb-3">
            {["About", "Experience", "Education", "Skills", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <Link 
                  href={`#${item.toLowerCase()}`} 
                  className="text-gray-300 hover:text-white transition duration-300 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}