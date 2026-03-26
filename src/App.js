import { Products } from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetails } from "./components/ProductDetails";
import { Footer } from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import { Homepage } from "./components/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
