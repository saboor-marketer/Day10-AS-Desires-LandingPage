import Icon from "./Icon";
import type { CategoryInfo, DessertCategory } from "../data/siteConfig";

type CategoryCardProps = {
  category: CategoryInfo;
  onSelect: (category: DessertCategory) => void;
};

export default function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <a
      className="category-card"
      href="#desserts"
      onClick={() => onSelect(category.name)}
    >
      <div className="category-card__image-wrap">
        <img
          className="category-card__image"
          src={category.image}
          alt={category.imageAlt}
          width="1122"
          height="1402"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="category-card__body">
        <div>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>
        <span className="category-card__link">
          Explore {category.name} <Icon name="arrow" />
        </span>
      </div>
    </a>
  );
}