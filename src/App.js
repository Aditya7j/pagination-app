// import { Products } from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import { Homepage } from "./components/HomePage";
import { lazy, Suspense } from "react";
import { Shimmer } from "./components/Shimmer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/Register";

const Products = lazy(() => import("./components/Product"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Shimmer />}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
