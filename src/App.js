import { Products } from "./components/Product";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetails } from "./components/ProductDetails";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
