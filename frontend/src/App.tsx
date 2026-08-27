import { Toaster } from "react-hot-toast";
import Container from "./components/Container";
import Header from "./components/Header";
import Home from "./pages/Home/page";
import Footer from "./components/Footer";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Product from "./pages/Product/page";
import Shop from "./pages/Shop/page";
import Cart from "./pages/Cart/page";
import NotFoundPage from "./pages/NotFoundPage";
import SignUp from "./pages/Auth/Singup";
import Login from "./pages/Auth/Login";
import Contact from "./pages/Contact/page"; 
import type { JSX } from "react/jsx-runtime";
import Checkout from "./pages/Checkout/page";
import { isAuthenticated } from "./services/auth.service";


const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();

    return isAuthenticated() ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const App = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <>
            <Toaster />
            {!isAuthPage && (
                <Container className="bg-[#FFF]">
                    <Header />
                </Container>
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop/:category?" element={<Shop />} />
                <Route path="/product/:slug" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route 
                    path="/contact" 
                    element={
                        <ProtectedRoute>
                            <Contact />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/checkout" 
                    element={
                        <ProtectedRoute>
                            <Checkout />
                        </ProtectedRoute>
                    } 
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!isAuthPage && (
                <Container className="bg-primary border-t border-t-[rgba(0,0,0,0.17)]">
                    <Footer />
                </Container>
            )}
        </>
    );
};

export default App;
