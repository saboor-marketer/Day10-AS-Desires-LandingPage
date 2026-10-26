import { brandConfig } from "../data/siteConfig";

type BrandMarkProps = {
  className?: string;
};

export default function BrandMark({ className = "" }: BrandMarkProps) {
  const [initials = "AS", ...nameParts] = brandConfig.name.trim().split(/\s+/);

  return (
    <a className={`brand-mark ${className}`} href="#home" aria-label={`${brandConfig.name} home`}>
      <span className="brand-mark__initials">{initials}</span>
      {nameParts.length > 0 && (
        <span className="brand-mark__name">{nameParts.join(" ").toUpperCase()}</span>
      )}
    </a>
  );
}