import clsx from "clsx";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartStore";

type RightMenuProps = {
    className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
    const openCart = useCart((state) => state.openCart);
    const items = useCart((state) => state.items);

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";
    return (
        <div className={clsx("flex gap-[33.66px]", className)}>
            {/* Ícone de Usuário (Redireciona para o Login) */}
            <Link to="/login" className={clsx(LinkHover)} aria-label="Ir para login">
                <img
                    src="/Icons/alert.svg" // Ajuste o caminho se o seu ícone tiver outro nome (ex: alert.svg ou user.svg)
                    alt="Ícone de usuário"
                    className="max-h-[20px]"
                />
            </Link>

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
