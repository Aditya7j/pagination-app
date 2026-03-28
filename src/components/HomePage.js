import { useEffect, useState, useRef } from "react";
import "../scss/homePage.scss";
import ProductNavbar from "./ProductNavbar";
import { product_url } from "../constant/url";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [products, setProduct] = useState([]);
    const [sliceIndex, setSliceIndex] = useState(0);
    const scrollRef = useRef(null);
    const sliceSize = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetch(product_url)
            .then((res) => res.json())
            .then((data) => {
                const categoryMap = {};
                data.products.forEach((p) => {
                    if (!categoryMap[p.category]) categoryMap[p.category] = p;
                });
                setCategories(Object.values(categoryMap));
                setProduct(data.products)
                // setFeaturedProducts(data.products.slice(185, 190));
            })
            .catch((err) => console.error(err));
    }, []);

    // auto rotated featured product
    useEffect(() => {
        if (!products.length) return;

        let currentIndex = 0;

        // initial load
        setFeaturedProducts(products.slice(0, sliceSize));

        const interval = setInterval(() => {
            currentIndex = (currentIndex + sliceSize) % products.length;

            const end = currentIndex + sliceSize;

            // handle wrap-around
            let newSlice;
            if (end <= products.length) {
                newSlice = products.slice(currentIndex, end);
            } else {
                newSlice = [
                    ...products.slice(currentIndex),
                    ...products.slice(0, end - products.length)
                ];
            }

            setFeaturedProducts(newSlice);
        }, 5000);

        return () => clearInterval(interval);
    }, [products]);

    // navigate to product

    const handleCategory = () => {
        navigate("/product")
    }

    const scrollLeft = () => scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    const scrollRight = () => scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });

    return (
        <div className="homepage-wrapper">
            <ProductNavbar />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="stars">
                    {Array.from({ length: 30 }).map((_, i) => (
                        <span
                            key={i}
                            style={{
                                left: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 20 + 8}px`,
                                animationDuration: `${Math.random() * 5 + 3}s`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        >
                            ✰
                        </span>
                    ))}
                </div>
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Discover Your Perfect Style</h1>
                        <p>Shop the latest trends in fashion, beauty, and accessories.</p>
                        <div className="hero-buttons">
                            <button className="btn-primary">Shop Now</button>
                            <button className="btn-secondary">Explore Collection</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="categories-section-wrapper">
                <button className="scroll-btn left" onClick={scrollLeft}><FaChevronLeft /></button>
                <div className="categories-section" ref={scrollRef}>
                    {categories.map((catProd) => (
                        <div key={catProd.category} className="category-card" onClick={handleCategory}>
                            <img src={catProd.thumbnail} alt={catProd.category} />
                            <span>{catProd.category.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
                <button className="scroll-btn right" onClick={scrollRight}><FaChevronRight /></button>
            </section>

            {/* Featured Products */}
            <section className="featured-products">
                <h2>Featured Products</h2>
                <div className="product-grid">
                    {featuredProducts.map((prod) => (
                        <div key={prod.id} className="product-card">
                            <img src={prod.thumbnail} alt={prod.title} />
                            <h3>{prod.title}</h3>
                            <p>${prod.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Promotional Banner */}
            <section className="promo-banner">
                <div className="banner-content">
                    <h2>Summer Sale is Here!</h2>
                    <p>Up to 50% off on selected items. Limited time only.</p>
                    <button className="btn-primary">Shop Sale</button>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="newsletter-section">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Get the latest updates, deals, and offers delivered to your inbox.</p>
                <form className="newsletter-form">
                    <input type="email" placeholder="Enter your email" />
                    <button type="submit">Subscribe</button>
                </form>
            </section>
        </div>
    );
};