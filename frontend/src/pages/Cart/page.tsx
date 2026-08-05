import { Link } from "react-router-dom";
import { useMemo } from "react";
import clsx from "clsx";
import Container from "../../components/Container";
import NumberToStringRP from "../../utils/NumberToStringRP";

type CartItem = {
  id: string;
  name: string;
  slug: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  discountPrice?: number | null;
};

const sampleItems: CartItem[] = [
  {
    id: "cart-A-xl-black",
    name: "Syltherine",
    slug: "syltherine",
    image: "/OurProducts/Syltherine.png",
    color: "#816DFA",
    size: "xl",
    quantity: 2,
    price: 2500000,
    discountPrice: 30,
  },
  {
    id: "cart-B-black-m",
    name: "Leviosa",
    slug: "leviosa",
    image: "/OurProducts/Leviosa.png",
    color: "#000000",
    size: "m",
    quantity: 1,
    price: 2500000,
    discountPrice: null,
  },
];

const Cart = () => {
  const items = useMemo(() => sampleItems, []);

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discountPrice
      ? item.price - item.price * (item.discountPrice / 100)
      : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <Container>
      <div className={clsx("pt-10 pb-20 px-4 w-full")}>
        <div className={clsx("max-w-360 mx-auto", "space-y-6")}>
          <h1 className={clsx("text-[32px] font-semibold")}>Carrinho</h1>

          <div className={clsx("space-y-6")}>
            <div className={clsx("grid gap-6 lg:grid-cols-[1.8fr_1fr]")}>
              <div className={clsx("space-y-6")}>
                {items.map((item) => {
                  const itemPrice = item.discountPrice
                    ? item.price - item.price * (item.discountPrice / 100)
                    : item.price;
                  return (
                    <div
                      key={item.id}
                      className={clsx(
                        "bg-[#F7F7F7] p-4 rounded-[20px] flex flex-col sm:flex-row gap-4",
                      )}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className={clsx(
                          "w-full sm:w-40 h-40 object-cover rounded-[15px]",
                        )}
                      />
                      <div
                        className={clsx(
                          "flex-1 flex flex-col justify-between",
                        )}
                      >
                        <div className={clsx("space-y-2")}>                          
                          <div className={clsx("flex flex-wrap gap-2 items-center")}>
                            <h2 className={clsx("text-[20px] font-semibold")}>{item.name}</h2>
                            <span className={clsx("text-[14px] text-[#666666]")}>{item.slug}</span>
                          </div>
                          <p className={clsx("text-[14px] text-[#666666]")}>Cor: {item.color}</p>
                          <p className={clsx("text-[14px] text-[#666666]")}>Tamanho: {item.size}</p>
                        </div>
                        <div className={clsx("flex items-center gap-3")}>                          
                          <span className={clsx("text-[16px] font-semibold")}>Qtd: {item.quantity}</span>
                        </div>
                      </div>
                      <div className={clsx("flex flex-col justify-between")}>                        
                        <div className={clsx("text-right")}>
                          <p className={clsx("text-[16px] text-[#666666]")}>Preço unitário</p>
                          <p className={clsx("text-[20px] font-semibold")}>R$ {NumberToStringRP(itemPrice)}</p>
                        </div>
                        <div className={clsx("text-[14px] text-[#666666] text-right")}>                          
                          <p>Total</p>
                          <p className={clsx("text-[18px] font-semibold")}>R$ {NumberToStringRP(itemPrice * item.quantity)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <aside className={clsx("bg-[#F7F7F7] p-5 rounded-[20px] flex flex-col gap-4")}>
                <div className={clsx("flex justify-between items-center")}>                  
                  <span className={clsx("text-[16px] text-[#666666]")}>Subtotal</span>
                  <strong className={clsx("text-[24px]")}>R$ {NumberToStringRP(subtotal)}</strong>
                </div>
                <Link
                  to="/"
                  className={clsx(
                    "w-full text-center text-primary text-[16px] font-semibold py-4 rounded-[15px] border border-[#9F9F9F]",
                    "hover:bg-[#E5E5E5] transition",
                  )}
                >
                  Continuar comprando
                </Link>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
