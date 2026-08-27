import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartStore";
import { useAuth } from "../../context/authStore";
import { logoutService } from "../../services/auth.service";
import toast from "react-hot-toast";

type RightMenuProps = {
    className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
    const navigate = useNavigate();
    const openCart = useCart((state) => state.openCart);
    const items = useCart((state) => state.items);

    const isAuthenticated = useAuth((state) => state.isAuthenticated);
    const userEmail = useAuth((state) => state.userEmail)
    const setAuthenticated = useAuth((state) => state.setAuthenticated);

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";
    const displayName = userEmail ? userEmail.split("@")[0] : "usuário";

    const handleLogout = () => {
        logoutService();
        setAuthenticated(false);
        toast.success("Você saiu da sua conta.");
        navigate("/");
    };

    return (
        <div className={clsx("flex gap-[33.66px]", className)}>
           {isAuthenticated ? (
                <div className="flex items-center gap-3">
                    <span className="font-poppins text-[16px] text-over-primary">
                        Olá, {displayName}
                    </span>
                <button
                    onClick={handleLogout}
                    className={clsx(LinkHover, "text-sm font-medium bg-transparent border-none cursor-pointer")}
                >
                   <img src="/Icons/logout.png" alt="Sair" className="max-h-[20px]" />
                </button>
                </div>
            ) : (
                <Link to="/login" className={clsx(LinkHover)} aria-label="Ir para login">
                    <img className="max-h-[20px]" src="/Icons/alert.svg" alt="Ícone de usuário" />
                </Link>
            )}

            <button 
                onClick={openCart} 
                className={clsx(LinkHover, "relative bg-transparent border-none p-0 flex items-center")}
                aria-label="Abrir carrinho"
            >
                <img
                    src="/Icons/shop.svg"
                    alt="Ícone do carrinho"
                    className="max-h-[22.05px]"
                />
                
                {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#B88E2F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {totalItems}
                    </span>
                )}
            </button>
        </div>
    );
};
export default RightMenu;
