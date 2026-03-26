import { useEffect, useState } from "react";
import "./product.scss";

export const Products = () => {
    const [product, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setcurrentPage] = useState(1);
    const itemPerPage = 20;
    const [search, setSearch] = useState("");

    // Filter products 
    const filteredProducts = product.filter((item) => {
        const value = search.toLowerCase();
        return (
            item.title.toLowerCase().includes(value) ||
            item.brand?.toLowerCase().includes(value) ||
            item.category.toLowerCase().includes(value)
        )
    });

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
    }

    // Add Next & Prev Function
    const handleNext = () => {
        if (currentPage < totalPage) {
            setcurrentPage(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setcurrentPage(prev => prev - 1)
        }
    }

    useEffect(() => {
        getProducts();
        setcurrentPage(1)
    }, [search]);

    async function getProducts() {
        try {
            const data = await fetch("https://dummyjson.com/products?limit=200");
            const json = await data.json();
            setProducts(json.products);
        } catch (err) {
            setError("Failed to fetch products.");
            console.error(err);
        }
    }

    if (error) return <p className="error-message">{error}</p>;

    return (
        <>
            <div className="navbar-wrapper">
                <div className="logo-wrapper">
                    <img src="https://img.freepik.com/premium-vector/natural-products-logo_1222-726.jpg" alt="err" />
                </div>
                <div className="search-container">
                    <input type="text" placeholder="Search Product" className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="filter-container">
                    <label htmlFor="filter" className="filter-label">Filter:</label>
                    <select id="filter" className="filter-select">
                        <option value="">Select</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="category">By Category</option>
                    </select>
                </div>
            </div>
            <div className="product-grid">
                {currentProducts.map((item, i) => (
                    <div className="product-card" key={i}>
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