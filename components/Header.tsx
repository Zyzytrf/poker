import React, { useState } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onShowLogin: () => void;
  onShowRegister: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onShowLogin, onShowRegister, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Trò Chơi", href: "#" },
    { name: "Giải Đấu", href: "#" },
    { name: "Khuyến Mãi", href: "#" },
    { name: "CLB VIP", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-sm border-b border-brand-gray/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="text-3xl font-serif font-bold tracking-wider">
              <span className="text-white">DUBAI</span>
              <span className="text-brand-gold">79</span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-300 hover:text-brand-gold transition-colors duration-300 font-medium">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
               <>
                <span className="text-gray-300 font-medium">Chào mừng, Người chơi</span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-semibold text-white rounded-md bg-brand-gray hover:bg-opacity-80 transition-colors duration-300"
                >
                  Đăng Xuất
                </button>
               </>
            ) : (
               <>
                <button onClick={onShowLogin} className="px-4 py-2 text-sm font-semibold text-white rounded-md hover:bg-brand-gray transition-colors duration-300">
                  Đăng Nhập
                </button>
                <button onClick={onShowRegister} className="px-4 py-2 text-sm font-semibold text-brand-dark bg-brand-gold rounded-md hover:bg-brand-gold-dark transition-colors duration-300 shadow-gold-sm">
                  Đăng Ký
                </button>
               </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-gray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-gold"
            >
              <span className="sr-only">Mở menu chính</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-brand-gold hover:bg-brand-gray">
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-brand-gray">
            <div className="flex items-center px-5 space-x-3">
            {isLoggedIn ? (
                <button onClick={onLogout} className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white bg-brand-gray rounded-md hover:bg-opacity-80 transition-colors duration-300">
                    Đăng Xuất
                </button>
            ) : (
                <>
                <button onClick={onShowLogin} className="flex-1 text-center px-4 py-2 text-sm font-semibold text-white bg-brand-gray rounded-md hover:bg-opacity-80 transition-colors duration-300">
                    Đăng Nhập
                </button>
                <button onClick={onShowRegister} className="flex-1 text-center px-4 py-2 text-sm font-semibold text-brand-dark bg-brand-gold rounded-md hover:bg-brand-gold-dark transition-colors duration-300">
                    Đăng Ký
                </button>
                </>
            )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;