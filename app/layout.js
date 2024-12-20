// app/layout.js

"use client";

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <header>
          <h1>Progress Tracker App</h1>
          <nav>
            <ul>
              <li>
                <Link href="/" className={pathname === '/' ? 'active' : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/progress"
                  className={pathname === '/progress' ? 'active' : ''}
                >
                  Progress
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={pathname === '/about' ? 'active' : ''}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {/* ... rest of the code */}
      </body>
    </html>
  );
}

