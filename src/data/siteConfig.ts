export type DessertCategory = "Cakes" | "Sundaes" | "Shakes";

export type ProductAvailability = "confirmed" | "unconfirmed" | "unavailable";

export type Product = {
  id: string;
  name: string;
  category: DessertCategory;
  description: string;
  price: string | null;
  image: string;
  imageAlt: string;
  availability: ProductAvailability;
  variants?: string[];
};

export type CategoryInfo = {
  id: string;
  name: DessertCategory;
  description: string;
  image: string;
  imageAlt: string;
};

export type SocialLink = {
  name: string;
  url: string;
};

export type OrderDestination = {
  href: string;
  label: string;
  external: boolean;
} | null;

export const brandConfig = {
  name: "AS Desires",
  tagline: "Every Craving Has a Desire.",
  supportingLine: "Indulge in the Moments You Deserve.",
  contact: {
    email: "",
    phone: "",
    whatsappNumber: "",
    orderUrl: "",
    address: "",
    socials: [] as SocialLink[],
  },
};

export const categories: CategoryInfo[] = [
  {
    id: "cakes",
    name: "Cakes",
    description: "Celebrate little moments and unforgettable occasions.",
    image: "/images/red-velvet-cake.jpg",
    imageAlt: "A slice of red velvet cake with layers of cream frosting",
  },
  {
    id: "sundaes",
    name: "Sundaes",
    description: "Layers of creamy indulgence, delightful toppings, and irresistible flavor.",
    image: "/images/brownie-sundae.jpg",
    imageAlt: "A chocolate brownie sundae layered in a glass coupe",
  },
  {
    id: "shakes",
    name: "Shakes",
    description: "Smooth, creamy, refreshing treats made for your sweet moments.",
    image: "/images/cookies-cream-shake.jpg",
    imageAlt: "A cookies and cream shake in a clear vintage glass",
  },
];

// Replace these sample names, descriptions, prices, images, and availability with the confirmed menu.
export const products: Product[] = [
  {
    id: "chocolate-fudge-cake",
    name: "Chocolate Fudge Cake",
    category: "Cakes",
    description: "Rich cocoa layers finished with a smooth, glossy chocolate ganache.",
    price: null,
    image: "/images/chocolate-fudge-cake.jpg",
    imageAlt: "A slice of chocolate fudge cake with glossy ganache",
    availability: "unconfirmed",
  },
  {
    id: "classic-vanilla-cake",
    name: "Classic Vanilla Cake",
    category: "Cakes",
    description: "Soft vanilla sponge layered with delicate ivory frosting.",
    price: null,
    image: "/images/classic-vanilla-cake.jpg",
    imageAlt: "A slice of vanilla layer cake with ivory frosting",
    availability: "unconfirmed",
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    category: "Cakes",
    description: "Deep red sponge and a smooth, creamy centre in every slice.",
    price: null,
    image: "/images/red-velvet-cake.jpg",
    imageAlt: "A slice of red velvet cake with cream frosting",
    availability: "unconfirmed",
  },
  {
    id: "brownie-sundae",
    name: "Chocolate Brownie Sundae",
    category: "Sundaes",
    description: "Creamy vanilla, brownie pieces, and a generous ribbon of chocolate.",
    price: null,
    image: "/images/brownie-sundae.jpg",
    imageAlt: "A chocolate brownie sundae with vanilla ice cream and chocolate sauce",
    availability: "unconfirmed",
  },
  {
    id: "strawberry-sundae",
    name: "Strawberry Sundae",
    category: "Sundaes",
    description: "Vanilla cream with bright strawberry compote and fresh fruit.",
    price: null,
    image: "/images/strawberry-sundae.jpg",
    imageAlt: "A strawberry sundae with vanilla ice cream and fruit",
    availability: "unconfirmed",
  },
  {
    id: "cookies-cream-shake",
    name: "Cookies & Cream Shake",
    category: "Shakes",
    description: "A thick, creamy shake with plenty of chocolate cookie pieces.",
    price: null,
    image: "/images/cookies-cream-shake.jpg",
    imageAlt: "A creamy cookies and cream shake in a tall glass",
    availability: "unconfirmed",
  },
  {
    id: "chocolate-fudge-shake",
    name: "Chocolate Fudge Shake",
    category: "Shakes",
    description: "A smooth chocolate shake with a rich fudge finish.",
    price: null,
    image: "/images/chocolate-fudge-shake.jpg",
    imageAlt: "A rich chocolate fudge shake in a clear glass",
    availability: "unconfirmed",
  },
  {
    id: "vanilla-dream-shake",
    name: "Vanilla Dream Shake",
    category: "Shakes",
    description: "A cool, creamy vanilla shake with delicate vanilla notes.",
    price: null,
    image: "/images/vanilla-dream-shake.jpg",
    imageAlt: "A creamy vanilla shake in a clear vintage glass",
    availability: "unconfirmed",
  },
];

export const faqs = [
  {
    question: "What desserts does AS Desires offer?",
    answer: "The sample menu features cakes, sundaes, and shakes. Menu items are configurable and should be confirmed before launch.",
  },
  {
    question: "How can I place an order?",
    answer: "Ordering information will appear here once a verified contact channel is configured.",
  },
  {
    question: "Are custom cakes available?",
    answer: "Please contact us to confirm availability and ordering options.",
  },
  {
    question: "What sizes or flavors can I choose?",
    answer: "Options can vary. Please contact AS Desires to confirm the current sizes and flavors.",
  },
  {
    question: "Where does AS Desires deliver?",
    answer: "Delivery coverage has not been provided yet. Please contact AS Desires to confirm whether delivery is available in your area.",
  },
  {
    question: "How can I contact the business?",
    answer: "Verified contact details have not been added yet. Email, phone, or social links can be configured in the site settings before launch.",
  },
];

export function getHttpsUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function getPhoneHref(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) return null;
  const prefix = value.trim().startsWith("+") ? "+" : "";
  return `tel:${prefix}${digits}`;
}

export function getOrderDestination(message: string): OrderDestination {
  const whatsappNumber = brandConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (whatsappNumber.length >= 8 && whatsappNumber.length <= 15) {
    return {
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      label: "Order on WhatsApp",
      external: true,
    };
  }

  const orderUrl = getHttpsUrl(brandConfig.contact.orderUrl);
  if (orderUrl) {
    return { href: orderUrl, label: "Continue to ordering", external: true };
  }

  const email = brandConfig.contact.email.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const subject = encodeURIComponent("AS Desires dessert enquiry");
    return {
      href: `mailto:${email}?subject=${subject}&body=${encodeURIComponent(message)}`,
      label: "Email to enquire",
      external: false,
    };
  }

  const phoneHref = getPhoneHref(brandConfig.contact.phone);
  if (phoneHref) {
    return { href: phoneHref, label: "Call to enquire", external: false };
  }

  return null;
}