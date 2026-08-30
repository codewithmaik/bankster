"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header>
      <nav
        className={`navbar${scrolled ? " is-scrolled" : ""}`}
        aria-label="Main Navigation"
      >
        <div className="navbar__container">
          <Link href="/" className="navbar-logo">
            Bankster
          </Link>

          <ul className={`navbar__menu${open ? " is-active" : ""}`} id="nav-menu">
            {LINKS.map((link) => (
              <li className="navbar__item" key={link.href}>
                <Link
                  href={link.href}
                  className="navbar__links"
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="navbar__btn mobile">
              <Link href="/signup" className="btn btn--primary">
                Sign Up
              </Link>
            </li>
          </ul>

          <div className="navbar__btn desktop">
            <Link href="/signup" className="btn btn--primary">
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            className="navbar__toggle"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <i
              className={`fa-solid ${open ? "fa-xmark" : "fa-bars"}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
