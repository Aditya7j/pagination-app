import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/productDetails.scss";
import ProductNavbar from "./ProductNavbar";
import { Audio } from "react-loader-spinner";

export const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await fetch(`https://dummyjson.com/products/${id}`);
                const json = await res.json();
                setProduct(json);
                setMainImage(json.thumbnail || json.images[0]);
            } catch (err) {
                setError("Something Went Wrong Failed to fetch products.");
            }
        }
        fetchProduct();
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!product) return (
        <div className="loader-wrapper">
            <Audio
                height="100"
                width="100"
                color="#dd1313"
                ariaLabel="audio-loading"
                wrapperStyle={{}}
                wrapperClass="wrapper-class"
                visible={true}
            />
        </div>
    );

    return (
        <>
            <ProductNavbar />
            <div className="product-details-wrapper">
                {/* Left - Images */}
                <div className="images-section">
                    <div className="main-image">
                        <img src={mainImage} alt={product.title} />
                    </div>
                    {product.images?.length > 1 && (
                        <div className="thumbnail-images">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product.title}-${i}`}
                                    onClick={() => setMainImage(img)}
                                    className={mainImage === img ? "active" : ""}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right - Product Info */}
                <div className="info-section">
                    <h1 className="title">{product.title}</h1>
                    <p className="brand">{product.brand}</p>
                    <p className="category">{product.category.toUpperCase()}</p>

                    <div className="rating">
                        <span>⭐ {product.rating}</span> ({product.reviews.length} reviews)
                    </div>

                    <p className="description">{product.description}</p>

                    <div className="price-stock">
                        <h2 className="price">${product.price}</h2>
                        <p className={product.stock > 0 ? "in-stock" : "out-stock"}>
                            {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </p>
                    </div>

                    <div className="sku-info">
                        <p><strong>SKU:</strong> {product.sku}</p>
                        <p><strong>Weight:</strong> {product.weight} g</p>
                        <p>
                            <strong>Dimensions:</strong> {product.dimensions.width} x{" "}
                            {product.dimensions.height} x {product.dimensions.depth} cm
                        </p>
                    </div>

                    <div className="quantity-add">
                        <input
                            type="number"
                            min={1}
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                        <button className="buy-btn">Add to Cart</button>
                    </div>

                    <div className="extra-info">
                        <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
                        <p><strong>Shipping:</strong> {product.shippingInformation}</p>
                        <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
                    </div>
                </div>
            </div>
        </>
    );
};