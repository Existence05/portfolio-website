import React, { useState, useEffect } from "react";
import { Navbar } from "flowbite-react";
import { DarkThemeToggle } from "flowbite-react";

const Nav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to handle theme changes
    const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // System prefers dark mode
        document.documentElement.classList.add('dark');
      } else {
        // System prefers light mode
        document.documentElement.classList.remove('dark');
      }
    };

    // Initial check
    handleThemeChange(mediaQuery);

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleThemeChange);

    // Scroll handler
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Navbar 
    className={`fixed w-full transition-all duration-300 ${
      isScrolled 
        ? 'z-50 py-1 bg-white dark:bg-black shadow-lg md:bg-white md:dark:bg-black' 
        : 'z-50 py-4 bg-white dark:bg-black md:bg-transparent md:dark:bg-transparent'
    }`}
      fluid
    >
      <Navbar.Brand href="/">
        <img 
          src="./assets/images/hacker.png" 
          className={`mr-3 transition-all duration-300 ${
            isScrolled ? 'h-5 sm:h-7' : 'h-6 sm:h-9'
          }`} 
          alt="Logo" 
        />
        <span className={`self-center whitespace-nowrap font-bold dark:text-white transition-all duration-300 ${
          isScrolled ? 'text-lg' : 'text-2xl'
        }`}>
          Existence
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
        <a
        href="https://www.linkedin.com/in/astitwo-pa71a7023b/"
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden md:flex mx-3 bg-gray-800 hover:bg-gray-900 py-2 px-4 transition-all duration-300 flex items-center gap-2 ${
          isScrolled ? 'scale-90' : 'scale-100'
        }`}
      >
        <svg
          className="w-5 h-5 text-gray-100"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
          <span className="text-white font-medium">LinkedIn</span>
      </a>
        <button
          type="button"
          onClick={() => scrollToSection('contact')}
          className={`          text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold text-center mx-3 md:mr-0 z-10 transition-all duration-300 ${
            isScrolled ? 'text-sm px-3 py-1.5' : 'text-md px-4 py-2'
          }`}
        >
          Contact Me!
        </button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {['home', 'services', 'about', 'contact'].map((section) => (
          <button 
            key={section}
            onClick={() => scrollToSection(section)}
            className={`block pr-4 pl-3 border-b border-gray-100 text-gray-700 hover:bg-gray-50 font-bold dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-red-700 md:dark:hover:bg-transparent md:dark:hover:text-white transition-all duration-300 ${
              isScrolled ? 'text-base text-3xl md:text-lg py-2' : 'text-3xl md:text-xl py-2.5'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Nav;