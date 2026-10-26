import { useEffect, useRef } from "react";
import type { OrderDestination, Product } from "../data/siteConfig";
import Icon from "./Icon";

type ProductModalProps = {
  product: Product;
  orderDestination: OrderDestination;
  onClose: () => void;
};

function availabilityCopy(product: Product): string {
  if (product.availability === "confirmed") return "Availability confirmed.";
  if (product.availability === "unavailable") return "Currently unavailable.";
  return "Please contact us to confirm availability.";
}

export default function ProductModal({
  product,
  orderDestination,
  onClose,
}: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [onClose, product.id]);

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="product-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <div className="product-modal__image-wrap">
          <img
            src={product.image}
            alt={product.imageAlt}
            width="1122"
            height="1402"
          />
        </div>
        <div className="product-modal__details">
          <button
            className="product-modal__close"
            ref={closeRef}
            type="button"
            aria-label="Close product details"
            onClick={onClose}
          >
            <Icon name="close" />
          </button>
          <p className="eyebrow">{product.category}</p>
          <h2 id="product-modal-title">{product.name}</h2>
          <p className="product-modal__description">{product.description}</p>
          <p className="product-modal__price">
            {product.price?.trim() || "Price on request"}
          </p>
          <p className="product-modal__availability">{availabilityCopy(product)}</p>
          {product.variants && product.variants.length > 0 && (
            <div className="product-modal__variants">
              <h3>Options</h3>
              <ul>
                {product.variants.map((variant) => <li key={variant}>{variant}</li>)}
              </ul>
            </div>
          )}
          {orderDestination ? (
            <a
              className="button button--dark product-modal__action"
              href={orderDestination.href}
              target={orderDestination.external ? "_blank" : undefined}
              rel={orderDestination.external ? "noopener noreferrer" : undefined}
            >
              {orderDestination.label} <Icon name="arrow" />
            </a>
          ) : (
            <a
              className="button button--dark product-modal__action"
              href="#contact"
              onClick={onClose}
            >
              Order &amp; contact details <Icon name="arrow" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}