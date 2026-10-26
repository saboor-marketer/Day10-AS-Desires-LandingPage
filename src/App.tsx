import { useCallback, useMemo, useState } from "react";
import CategoryCard from "./components/CategoryCard";
import Footer from "./components/Footer";
import Icon from "./components/Icon";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import {
  brandConfig,
  categories,
  faqs,
  getOrderDestination,
  products,
  type DessertCategory,
  type Product,
} from "./data/siteConfig";

type ProductFilter = "All" | DessertCategory;

const filters: ProductFilter[] = ["All", "Cakes", "Sundaes", "Shakes"];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<ProductFilter>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const visibleProducts = useMemo(
    () =>
      activeFilter === "All"
        ? products
        : products.filter((product) => product.category === activeFilter),
    [activeFilter],
  );

  const closeProductDetails = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const selectCategory = useCallback((category: DessertCategory) => {
    setActiveFilter(category);
  }, []);

  const productOrder = selectedProduct
    ? getOrderDestination(
        `Hello ${brandConfig.name}, I would like to ask about ${selectedProduct.name}. Please share the price and availability.`,
      )
    : null;
  const checkoutDestination = getOrderDestination(
    `Hello ${brandConfig.name}, I would like to ask about placing an order.`,
  );

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Navbar onCategoryNavigate={selectCategory} />

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <img
            className="hero__image"
            src="/images/hero-desserts.jpg"
            alt="A chocolate cake, a sundae and a creamy shake arranged on a dark dessert table"
            width="1672"
            height="941"
            fetchPriority="high"
          />
          <div className="hero__shade" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__content">
              <p className="eyebrow hero__eyebrow">Your moment. Your desire.</p>
              <h1 className="hero__title" id="hero-title">
                <span>AS</span> <em>Desires</em>
              </h1>
              <p className="hero__tagline">Every Craving Has a Desire.</p>
              <p className="hero__copy">
                From irresistible cakes to dreamy sundaes and creamy shakes,
                discover the sweet moments worth slowing down for.
              </p>
              <div className="hero__actions">
                <a className="button button--light" href="#categories">
                  Explore Our Desserts <Icon name="arrow" />
                </a>
                <a className="button button--text-light" href="#about">
                  Discover Our Story <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
          <a className="hero__scroll" href="#categories" aria-label="Scroll to discover our desserts">
            <span className="hero__scroll-line" aria-hidden="true" />
            <span>Scroll to discover</span>
          </a>
        </section>

        <section className="category-section section-shell" id="categories" aria-labelledby="categories-title">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">A little something for every craving</p>
              <h2 id="categories-title">Find Your Sweet Spot</h2>
            </div>
            <p className="section-heading__copy">
              Three irresistible ways to satisfy your cravings.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onSelect={selectCategory}
              />
            ))}
          </div>
        </section>

        <section className="menu-section" id="desserts" aria-labelledby="menu-title">
          <div className="section-shell">
            <div className="section-heading section-heading--split menu-heading">
              <div>
                <p className="eyebrow">The menu</p>
                <h2 id="menu-title">Made to Tempt.<br />Crafted to Delight.</h2>
              </div>
              <div className="menu-heading__aside">
                <p>
                  Discover a few sweet possibilities, from celebratory layers
                  to cool, creamy favourites.
                </p>
                <p className="menu-note">
                  Sample menu names. Prices and availability are not yet confirmed.
                </p>
              </div>
            </div>

            <div className="menu-filters" role="group" aria-label="Filter desserts by category">
              {filters.map((filter) => (
                <button
                  className={`menu-filter${activeFilter === filter ? " is-active" : ""}`}
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {visibleProducts.length > 0 ? (
              <div className="product-grid" aria-live="polite">
                {visibleProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <p className="menu-empty" role="status">
                There are no desserts in this category yet. Please check back soon.
              </p>
            )}
          </div>
        </section>

        <section className="story-section section-shell" id="about" aria-labelledby="story-title">
          <div className="story-section__image-wrap">
            <img
              className="story-section__image"
              src="/images/chocolate-fudge-cake.jpg"
              alt="A slice of layered chocolate cake with glossy ganache"
              width="1122"
              height="1402"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="story-section__copy">
            <p className="eyebrow">A thought behind every treat</p>
            <h2 id="story-title">More Than Dessert.<br /><em>A Feeling.</em></h2>
            <p className="story-section__lead">
              At AS Desires, dessert is more than a treat. It is a reason to
              celebrate, a moment to share, and a little indulgence to make an
              ordinary day feel special.
            </p>
            <p className="story-section__signoff">{brandConfig.supportingLine}</p>
            <a className="text-link" href="#desserts">
              Find your sweet moment <Icon name="arrow" />
            </a>
          </div>
        </section>

        <section className="moments-section" id="moments" aria-labelledby="moments-title">
          <div className="section-shell">
            <div className="moments-section__intro">
              <p className="eyebrow">The AS Desires experience</p>
              <h2 id="moments-title">Made for Your Kind of<br /><em>Sweet Moment.</em></h2>
              <p>
                A little sweetness for the milestone, the craving, and the in-between.
              </p>
            </div>
            <div className="moment-list">
              <article className="moment-item">
                <span className="moment-item__number" aria-hidden="true">01</span>
                <div>
                  <h3>Celebrate</h3>
                  <p>Cakes for memorable occasions and the moments worth marking.</p>
                </div>
              </article>
              <article className="moment-item">
                <span className="moment-item__number" aria-hidden="true">02</span>
                <div>
                  <h3>Indulge</h3>
                  <p>Sundaes made for irresistible cravings and one more spoonful.</p>
                </div>
              </article>
              <article className="moment-item">
                <span className="moment-item__number" aria-hidden="true">03</span>
                <div>
                  <h3>Refresh</h3>
                  <p>Creamy shakes for a sweet pause in the everyday.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="faq-section section-shell" id="faq" aria-labelledby="faq-title">
          <div className="faq-section__intro">
            <p className="eyebrow">A few helpful details</p>
            <h2 id="faq-title">Good to<br /><em>Know.</em></h2>
            <p>Answers to a few questions you might have before your next sweet moment.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const panelId = `faq-panel-${index}`;
              return (
                <div className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
                  <h3>
                    <button
                      className="faq-item__button"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                    >
                      <span>{faq.question}</span>
                      <Icon name={isOpen ? "minus" : "plus"} />
                    </button>
                  </h3>
                  <div className="faq-item__answer" id={panelId} hidden={!isOpen}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="final-cta" id="order-cta" aria-labelledby="cta-title">
          <div className="final-cta__copy">
            <p className="eyebrow">Make room for something lovely</p>
            <h2 id="cta-title">Your Next Favorite<br /><em>Dessert Is Waiting.</em></h2>
            <p>
              Explore the menu and find the treat that makes your moment sweeter.
            </p>
            <div className="final-cta__actions">
              <a className="button button--light" href="#desserts">
                Explore the Menu <Icon name="arrow" />
              </a>
              {checkoutDestination && (
                <a
                  className="button button--text-light"
                  href={checkoutDestination.href}
                  target={checkoutDestination.external ? "_blank" : undefined}
                  rel={checkoutDestination.external ? "noopener noreferrer" : undefined}
                >
                  {checkoutDestination.label} <Icon name="arrow" />
                </a>
              )}
            </div>
          </div>
          <div className="final-cta__visual">
            <img
              src="/images/strawberry-sundae.jpg"
              alt="A strawberry and vanilla sundae in a clear glass coupe"
              width="1122"
              height="1402"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>
      </main>

      <Footer onCategoryNavigate={selectCategory} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          orderDestination={productOrder}
          onClose={closeProductDetails}
        />
      )}
    </>
  );
}
