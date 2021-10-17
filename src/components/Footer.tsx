import React from 'react';

function Footer() {
  return (
    <nav className="t-4 max-h-16 h-16 flex items-center justify-center bg-black w-full z-50 fixed border-t-2 inset-x-0 bottom-0">
      <div className="m-auto">
        <ul>
          <li className="inline">
            <a href="/about" className="nav-links pr-10">
              About
            </a>
          </li>
          <li className="inline">
            <a href="/contact" className="nav-links pr-10">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Footer;
