import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NavMain.css';
import NavLogo from "../navlogo/NavLogo";
import NavCenter from "../navcenter/NavCenter";
import NavRight from "../navright/NavRight";


function NavMain(){
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isHomePage = pathname === '/';
    const showSolidNav = !isHomePage || isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setMenuOpen((open) => !open);
    const closeMenu = () => setMenuOpen(false);

    return(
        <div className={`full-width ${showSolidNav ? 'nav-scrolled' : ''}`}>
        <div className={`nav-main ${menuOpen ? 'nav-open' : ''} ${showSolidNav ? 'nav-main-scrolled' : ''}` }>
            <NavLogo isScrolled={showSolidNav} />
            <button
                className="nav-menu-toggle"
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                onClick={toggleMenu}
            >
                <span />
                <span />
                <span />
            </button>
            <NavCenter isOpen={menuOpen} onNavigate={closeMenu}/>
             <NavRight onNavigate={closeMenu}/>
        </div>

        </div>
    );
}

export default NavMain;
