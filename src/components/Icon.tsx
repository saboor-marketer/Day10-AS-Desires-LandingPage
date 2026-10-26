type IconName = "arrow" | "menu" | "close" | "plus" | "minus";

type IconProps = {
  name: IconName;
  className?: string;
};

export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "arrow" && <path d="M4.5 12h14m-6-6 6 6-6 6" />}
      {name === "menu" && <path d="M3 7h18M3 12h18M3 17h18" />}
      {name === "close" && <path d="m6 6 12 12M18 6 6 18" />}
      {name === "plus" && <path d="M12 5v14M5 12h14" />}
      {name === "minus" && <path d="M5 12h14" />}
    </svg>
  );
}