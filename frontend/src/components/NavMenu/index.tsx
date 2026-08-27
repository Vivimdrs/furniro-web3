import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";

type NavMenuProps = {
    className?: string;
    children?: React.ReactNode;
};
const NavMenu = ({ className, children }: NavMenuProps) => {
    const LinkHover: string = "hover:cursor-pointer hover:scale-105 transition";
    return (
        <ul 
            className={clsx(
                "w-107.5",
                "flex justify-around",
                "font-poppins text-[16px] text-over-primary",
                "lg:justify-between list-none",
                className,
            )}>
            <Link to={"/"} className={clsx(LinkHover)}>
                Home
            </Link>
            <Link to={"/shop"} className={clsx(LinkHover)}>
                Shop
            </Link>
            <a className={clsx(LinkHover)}>About</a>
            <li>
            <NavLink 
                to="/contact" 
                className={({ isActive }) => isActive ? "text-primary font-semibold" : "text-black hover:opacity-75"}
            >
                Contact
            </NavLink>
            </li>
                {children}
        </ul>
    );
};
export default NavMenu;
