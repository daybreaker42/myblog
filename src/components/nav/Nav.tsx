import { NavLink } from 'react-router-dom';
import { Moon, Sun, Menu, X, Search } from 'lucide-react';

function Nav({ isDarkMode, setIsDarkMode, isMenuOpen, setIsMenuOpen } : { isDarkMode: boolean, setIsDarkMode: Function, isMenuOpen: boolean, setIsMenuOpen: Function }) {
    // useLocator로 현재 페이지를 가져와서 active 클래스를 추가해준다.
    // const location = useLocation(); // 현재 페이지 경로를 가져옴
    // const path = location.pathname; // 현재 페이지 경로를 가져옴
    return (
    <nav className="fixed top-0 w-full bg-gray-800 border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold cursor-pointer hover:text-blue-400 transition-colors">Tech Blog</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-gray-300 hover:text-white transition-colors">Home</NavLink>
            <NavLink to="/" className="text-gray-300 hover:text-white transition-colors">Projects</NavLink>
            <NavLink to="/" className="text-gray-300 hover:text-white transition-colors">About</NavLink>
            <NavLink to="/" className="text-gray-300 hover:text-white transition-colors">Contact</NavLink>
            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="/" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">Home</NavLink>
            <NavLink to="/" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">Projects</NavLink>
            <NavLink to="/" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">About</NavLink>
            <NavLink to="/" className="block px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition-colors">Contact</NavLink>
          </div>
        </div>
      )}
    </nav>
    );
    // return isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen};
}


export default Nav;