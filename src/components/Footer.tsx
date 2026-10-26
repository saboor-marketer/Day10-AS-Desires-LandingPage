import BrandMark from "./BrandMark";
import {
  brandConfig,
  getHttpsUrl,
  getPhoneHref,
  type DessertCategory,
} from "../data/siteConfig";

type FooterProps = {
  onCategoryNavigate: (category: DessertCategory) => void;
};

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Desserts", href: "#desserts" },
  { label: "About", href: "#about" },
  { label: "Questions", href: "#faq" },
];

export default function Footer({ onCategoryNavigate }: FooterProps) {
  const { contact } = brandConfig;
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())
    ? contact.email.trim()
    : null;
  const phoneHref = getPhoneHref(contact.phone);
  const socialLinks = contact.socials.flatMap((social) => {
    const safeUrl = getHttpsUrl(social.url);
    return safeUrl ? [{ ...social, safeUrl }] : [];
  });

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__main section-shell">
        <div className="site-footer__brand">
          <BrandMark />
          <p>{brandConfig.tagline}</p>
        </div>

        <div className="site-footer__column">
          <h2>Explore</h2>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.label}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column">
          <h2>Our Desserts</h2>
          <ul>
            {(["Cakes", "Sundaes", "Shakes"] as const).map((category) => (
              <li key={category}>
                <a href="#desserts" onClick={() => onCategoryNavigate(category)}>
                  {category}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__column site-footer__contact">
          <h2>Get in Touch</h2>
          {email || phoneHref || contact.address || socialLinks.length > 0 ? (
            <ul>
              {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
              {phoneHref && <li><a href={phoneHref}>{contact.phone}</a></li>}
              {contact.address && <li className="site-footer__address">{contact.address}</li>}
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a href={social.safeUrl} target="_blank" rel="noopener noreferrer">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="site-footer__note">
              Contact details will appear here once they are confirmed.
            </p>
          )}
        </div>
      </div>
      <div className="site-footer__bottom section-shell">
        <p>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
        <p>{brandConfig.supportingLine}</p>
      </div>
    </footer>
  );
}