// Shimmer.jsx
import "./shimmer.scss";

export const Shimmer = ({ count = 8 }) => {
    return (
        <div className="shimmer-grid">
            {Array.from({ length: count }).map((_, i) => (
                <div className="shimmer-card" key={i}>
                    <div className="shimmer-image shimmer-animate"></div>

                    <div className="shimmer-content">
                        <div className="shimmer-line title shimmer-animate"></div>

                        <div className="shimmer-meta">
                            <div className="shimmer-line small shimmer-animate"></div>
                            <div className="shimmer-line small shimmer-animate"></div>
                        </div>

                        <div className="shimmer-line stock shimmer-animate"></div>
                        <div className="shimmer-line price shimmer-animate"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};