import Link from "next/link";

const SOCIAL = [
  { href: "https://facebook.com", label: "Facebook", icon: "fa-facebook-f" },
  { href: "https://instagram.com", label: "Instagram", icon: "fa-instagram" },
  { href: "https://x.com", label: "X", icon: "fa-x-twitter" },
  { href: "https://youtube.com", label: "YouTube", icon: "fa-youtube" },
];

export default function Footer() {
  return (
    <footer>
      <div className="footer__container">
        <div className="footer__links">
          <div className="footer__link-wrapper">
            <div className="footer__link-items">
              <h2>Product</h2>
              <Link href="/services">Services</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/signup">Sign Up</Link>
            </div>
            <div className="footer__link-items">
              <h2>Company</h2>
              <Link href="/#features">How it works</Link>
              <Link href="/#pricing">Plans</Link>
              <Link href="/impressum">Impressum</Link>
              <a href="mailto:hello@bankster.example">Contact</a>
            </div>
          </div>
          <div className="footer__link-wrapper">
            <div className="footer__link-items">
              <h2>Follow</h2>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <section className="social__media">
          <div className="social__media-wrap">
            <Link href="/" className="footer__logo">
              Bankster
            </Link>
            <p className="website__rights">
              Bankster {new Date().getFullYear()} © All rights reserved ·{" "}
              <a
                href="https://codewithmaik.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developed by codewithmaik
              </a>
            </p>
            <div className="social__icons-container">
              {SOCIAL.map((s) => (
                <div className="social__icons" key={s.label}>
                  <a
                    href={s.href}
                    className="social__icon-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                  >
                    <i className={`fa-brands ${s.icon}`} aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}
