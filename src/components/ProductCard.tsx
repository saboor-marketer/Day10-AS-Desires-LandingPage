import Icon from "./Icon";
import type { Product } from "../data/siteConfig";

type ProductCardProps = {
  product: Product;
  onViewDetails: () => void;
};

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.imageAlt}
          width="1122"
          height="1402"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="product-card__content">
        <p className="eyebrow product-card__category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-card__price">{product.price?.trim() || "Price on request"}</p>
        <button
          className="product-card__details"
          type="button"
          aria-haspopup="dialog"
          aria-label={`View details for ${product.name}`}
          onClick={onViewDetails}
        >
          View details <Icon name="arrow" />
        </button>
      </div>
    </article>
  );
}