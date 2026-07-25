import { Link } from 'react-router-dom';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import myPic from '../assets/images/pic2.webp'
import useTypingEffect from '../hooks/useTypingEffect';

const navLinks = [
  { label: 'Home', to: '/home', title: 'Home'},
  { label: 'About', to: '/about', title: 'About'}, 
  { label: 'Portfolio', to: '/projects', title: 'Projects'}, 
  { label: 'Contact', to: '/contact', title: 'Contact'},
]

export default function Navbar() {

const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
  setIsOpen(!isOpen);
};

const menuRef = useRef(null);
const buttonRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !buttonRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

document.addEventListener('mousedown', handleClickOutside);

return () => {
  document.removeEventListener('mousedown', handleClickOutside);
};
}, []);

const titles = ["Full-Stack Junior", "Ciego En Potencia", "Autista", "React Developer",]
const typedText = useTypingEffect(titles, 80, 50, 1500);

  return (  
    <nav className="bg-white h-17.5 flex items-center justify-between lg:justify-around px-[5%] sticky top-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.06)]">
      
      {/* Logo */}
      <a href="/home" className="inline-flex w-2xs items-center gap-2 font-semibold text-[1.4rem] text-[#1a1a2e] no-underline">
        <img src={myPic} alt="My face" className="w-auto h-[2.5em] border-2 rounded-sm object-contain" />
        <div className="flex flex-col">  
          <p className="text-xl inset-0 no-underline">Tato <span className="text-blue-500 font-bold">CSV</span></p>
          <p className="text-[.600em] leading-relaxed after:content-['|'] after:animate-ping">
            {typedText}
          </p>
        </div>
      </a>

      {/* Nav links Medium and Wider Screens*/}
      <ul className="hidden md:flex space-x-6 gap-9 list-none">
        {navLinks.map((link) => (
          <li key={link.title}>
            <Link
              to={link.to}
              className="no-underline text-[#2d3748] font-medium text-[0.95rem] transition-colors hover:text-[#4a9eff]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="md:hidden">
        <button 
          onClick={toggleMenu}
          className="md:hidden nav-toggle" 
          aria-label='Toggle Menu'
          ref={buttonRef}
        >
          <FontAwesomeIcon 
          icon={isOpen ? faXmark : faBars} 
          style={{color: "rgb(0, 174, 255)",}}
          className='inline-block! outline-none! origin-center will-change-transform p-0'
          />
        </button>

        {/* Mobile Menu Responsive */}
        <ul className={`
        lg:hidden bg-white absolute top-full left-0 w-full flex flex-col items-left space-y-4 py-6 pl-10 transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
        ref={menuRef}>
          <li><a href="/home" onClick={toggleMenu} className='hover:text-blue-400 block text-lg'>Home</a></li>
          <li><a href="/about" onClick={toggleMenu} className='hover:text-blue-400 block text-lg'>About</a></li>
          <li><a href="/projects" onClick={toggleMenu} className='hover:text-blue-400 block text-lg'>Portfolio</a></li>
          <li><a href="/contact" onClick={toggleMenu} className='hover:text-blue-400 block text-lg'>Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}
