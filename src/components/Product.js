import { useEffect, useRef, useState } from "react";
import { Shimmer } from "./Shimmer";
import "../scss/product.scss";
import { Link, useNavigate } from "react-router-dom";
import { img_url } from "../constant/url";
import { FaShoppingCart, FaUser } from "react-icons/fa";

export const Products = () => {
    const [product, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const itemPerPage = 20;
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const navigate = useNavigate();

    // Filter products 
    let filteredProducts = product.filter((item) => {
        const value = search.toLowerCase();
        return (
            item.title.toLowerCase().includes(value) ||
            item.brand?.toLowerCase().includes(value) ||
            item.category.toLowerCase().includes(value)
        )
    });

    // filter-products
    if (filter === "price-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    if (filter === "price-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    }

    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(
            (item) => item.category.includes(categoryFilter)
        );
    }


    //compute paginated data
    const totalPage = Math.ceil(filteredProducts.length / itemPerPage);
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    // genrate dynamic page Number
    const PageArr = Array.from({ length: totalPage }, (_, i) => i + 1);

    // handle page change
    const handlePageChange = (page) => {
        setcurrentPage(page)
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Add Next & Prev Function
    const handleNext = () => {
        if (currentPage < totalPage) {
            setcurrentPage(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setcurrentPage(prev => prev - 1)
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    useEffect(() => {
        setcurrentPage(1)
    }, [search, filter, categoryFilter]);

    useEffect(() => {
        async function getProducts() {
            try {
                const data = await fetch("https://dummyjson.com/products?limit=200");
                const json = await data.json();
                setProducts(json.products);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (err) {
                setError("Something Went Wrong Failed to fetch products.");
                console.error(err);
            }
        }
        getProducts();
    }, []);


    if (error) return <p className="error-message">{error}</p>;
    if (!product.length) return <Shimmer count={12} />;

    return (
        <>
            <div className="navbar-wrapper">
                <Link to="/">
                    <div className="logo-wrapper">
                        <img src={img_url} alt="err" />
                    </div>
                </Link>
                <div className="search-container">
                    <input type="text" placeholder="Search Product" className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-container">
                    <label htmlFor="filter" className="filter-label">Filter:</label>
                    <select id="filter" className="filter-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                    </select>
                </div>

                <div className="filter-container">
                    <label htmlFor="filter" className="filter-label">Category:</label>
                    <select
                        id="filter"
                        className="filter-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="beauty">BEAUTY</option>
                        <option value="fragrances">FRAGRANCES</option>
                        <option value="furniture">FURNITURE</option>
                        <option value="groceries">GROCERIES</option>
                        <option value="kitchen-accessories">KITCHEN</option>
                        <option value="laptops">LAPTOPS</option>
                        <option value="mens-watches">MEN WATCHES</option>
                        <option value="mobile-accessories">MOBILE</option>
                        <option value="skin-care">SKIN CARE</option>
                        <option value="sports-accessories">SPORTS</option>
                        <option value="sunglasses">SUNGLASSES</option>
                        <option value="tablets">TABLETS</option>
                        <option value="womens-dresses">DRESSES</option>
                        <option value="womens-watches">WOMEN WATCHES</option>
                    </select>
                </div>
                <div className="nav-icons">
                    <FaUser className="icon" />
                    <FaShoppingCart className="icon" />
                </div>
            </div>

            {/* Prodcuts section */}
            <>
                <div className="product-grid" >
                    {currentProducts.map((item, i) => (
                        <div className="product-card" key={i} onClick={() => navigate(`/product/${item.id}`)}>
                            <div className="product-image">
                                <img src={item.thumbnail} alt={item.title} />
                            </div>
                            <h1 className="product-title">{item.title}</h1>
                            <div className="product-meta">
                                {item.brand &&
                                    <p className="product-brand">{item.brand}</p>}
                                <p className="product-category">{item.category.toUpperCase()}</p>
                            </div>
                            <p className={`product-stock ${item.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                                {item.stock > 0 ? "In Stock" : "Out of Stock"}
                            </p>
                            <h2 className="product-price">${item.price}</h2>
                        </div>
                    ))}
                </div>
            </>

            {/* Pagination */}
            <div className="pageniated-wrapper">
                <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
                {PageArr.map((page) => (
                    <div
                        key={page}
                        className={`page-no-wrapper ${currentPage === page ? "active" : ""}`}
                        onClick={() => handlePageChange(page)}
                    >
                        {page}
                    </div>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPage}>Next</button>
            </div>
        </>
    );
};