import clsx from "clsx";
import { Link } from "react-router-dom";

type RightMenuProps = {
    className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
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

            {/* Ícone do Carrinho (Já existente) */}
            <Link to="/cart" className={clsx(LinkHover)} aria-label="Ir para o carrinho">
                <img
                    src="/Icons/shop.svg"
                    alt="Ícone do carrinho"
                    className="max-h-[22.05px]"
                />
            </Link>
        </div>
    );
};
export default RightMenu;
