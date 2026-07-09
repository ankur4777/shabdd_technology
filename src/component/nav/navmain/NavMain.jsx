import React, { useState } from 'react';
import './NavMain.css';
import NavLogo from "../navlogo/NavLogo";
import NavCenter from "../navcenter/NavCenter";
import NavRight from "../navright/NavRight";


function NavMain(){
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return(
        <div className='full-width'>
        <div className={`nav-main ${menuOpen ? 'nav-open' : ''}` }>
            <NavLogo />
           
            <button
                className="nav-menu-toggle"
                type="button"
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((isOpen) => !isOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <NavCenter isOpen={menuOpen} onNavigate={closeMenu}/>
             <NavRight onNavigate={closeMenu}/>
        </div>

        </div>
    );
}

export default NavMain;
