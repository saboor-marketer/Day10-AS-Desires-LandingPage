import { useEffect, useRef, useState } from "react";
import BrandMark from "./BrandMark";
import Icon from "./Icon";
import type { DessertCategory } from "../data/siteConfig";

type NavbarProps = {
  onCategoryNavigate: (category: DessertCategory) => void;
};

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Our Desserts", href: "#desserts" },
  { label: "Cakes", href: "#desserts", category: "Cakes" as const },
  { label: "Sundaes", href: "#desserts", category: "Sundaes" as const },
  { label: "Shakes", href: "#desserts", category: "Shakes" as const },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ onCategoryNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 36);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleNavigation = (category?: DessertCategory) => {
    if (category) onCategoryNavigate(category);
    if (menuOpen) {
      setMenuOpen(false);
      toggleRef.current?.focus();
    }
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-shell">
        <BrandMark />
        <nav
          className={`primary-nav${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          <ul className="primary-nav__list">
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={() => handleNavigation(item.category)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          className="nav-action"
          href="#desserts"
          onClick={() => handleNavigation()}
        >
          Explore Menu <Icon name="arrow" />
        </a>
        <button
          className="nav-toggle"
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}