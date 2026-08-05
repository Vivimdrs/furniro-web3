import { Toaster } from "react-hot-toast";
import Container from "./components/Container";
import Header from "./components/Header";
import Home from "./pages/Home/page";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/Product/page";
import Cart from "./pages/Cart/page";

const App = () => {
  return (
    <>
      <Toaster />

      <Container className="bg-[#FFF]">
        <Header />
      </Container>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Container className="bg-primary border-t border-t-[rgba(0,0,0,0.17)]">
        <Footer />
      </Container>
    </>
  );
};

export default App;
