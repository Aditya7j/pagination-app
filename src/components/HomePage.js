import { useEffect, useState, useRef } from "react";
import "../scss/homePage.scss";
import ProductNavbar from "./ProductNavbar";
import { product_url } from "../constant/url";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        fetch(product_url)
            .then((res) => res.json())
            .then((data) => {
                const categoryMap = {};
                data.products.forEach((p) => {
                    if (!categoryMap[p.category]) categoryMap[p.category] = p;
                });
                setCategories(Object.values(categoryMap));
            })
            .catch((err) => console.error(err));
    }, []);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    };

    return (
        <div className="homepage-wrapper">
            <ProductNavbar />
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay">
                    <div className="hero-content">
                        <h1>Discover Your Perfect Style</h1>
                        <p>Shop the latest trends in fashion, beauty, and accessories.</p>
                    </div>
                </div>
            </section>

            {/* Scrollable Categories Section */}
            <section className="categories-section-wrapper">
                <button className="scroll-btn left" onClick={scrollLeft}>
                    <FaChevronLeft />
                </button>
                <div className="categories-section" ref={scrollRef}>
                    {categories.map((catProd) => (
                        <div key={catProd.category} className="category-card">
                            <img src={catProd.thumbnail} alt={catProd.category} />
                            <span>{catProd.category.toUpperCase()}</span>
                        </div>
                    ))}
                </div>
                <button className="scroll-btn right" onClick={scrollRight}>
                    <FaChevronRight />
                </button>
            </section>
        </div>
    );
};