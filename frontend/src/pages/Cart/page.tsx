import { Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import clsx from "clsx";
import Container from "../../components/Container";
import BenefitsCard from "../../components/BenefitsCard";

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

const formatRs = (value: number) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const Cart = () => {
  const [items, setItems] = useState<CartItem[]>(sampleItems);

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discountPrice
      ? item.price - item.price * (item.discountPrice / 100)
      : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity < 1 ? 1 : quantity }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container className="bg-[#FFF]">
      <div className="w-full font-poppins leading-normal">
        <section
          className={clsx(
            "relative min-h-[316px] overflow-hidden bg-cover bg-center",
          )}
          style={{ backgroundImage: "url('/Images/Background-Banner.svg')" }}
        >
          <div
            className={clsx(
              "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
            )}
          >
            <img
              src="/Logo/Logo.svg"
              alt="Furniro logo"
              className="h-[77px] w-[77px] object-contain"
            />
            <h1
              className={clsx(
                "-mt-4 text-[48px] font-medium leading-[72px] text-black",
              )}
            >
              Cart
            </h1>
            <div className="mt-1 flex items-center gap-2 text-[16px] text-black">
              <span className="font-medium">Home</span>
              <span className="text-[22px]">›</span>
              <span className="font-light">Cart</span>
            </div>
          </div>
        </section>

        <main className="mx-auto min-h-[525px] max-w-[1240px] px-4 py-[72px]">
          <div className="grid gap-[30px] xl:grid-cols-[817px_393px]">
            <div className="min-w-0 overflow-x-auto">
              <div className="min-w-[817px] bg-white">
                <div
                  className={clsx(
                    "grid h-[55px] grid-cols-[142px_177px_156px_106px_162px_74px] items-center bg-[#F9F1E7] text-[16px] font-medium text-black",
                  )}
                >
                  <div />
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Subtotal</div>
                  <div />
                </div>

                <div className="space-y-3 pt-10">
                  {items.length === 0 ? (
                    <div
                      className={clsx(
                        "p-10 text-center text-[16px] font-poppins text-[#9F9F9F]",
                      )}
                    >
                      Your cart is empty.
                    </div>
                  ) : (
                    items.map((item) => {
                      const itemPrice = item.discountPrice
                        ? item.price - item.price * (item.discountPrice / 100)
                        : item.price;
                      return (
                        <div
                          key={item.id}
                          className={clsx(
                            "grid min-h-[105px] grid-cols-[142px_177px_156px_106px_162px_74px] items-center bg-white text-[16px]",
                          )}
                        >
                          <div className="flex h-[105px] w-[105px] items-center justify-center rounded-[10px] bg-[#B88E2F]/20">
                            <img
                              src={item.image}
                              alt={item.name}
                              className={clsx(
                                "h-[95px] w-[105px] object-contain",
                              )}
                            />
                          </div>
                          <p className="text-[#9F9F9F]">{item.name}</p>

                          <div className={clsx("text-[#9F9F9F]")}>
                            Rs. {formatRs(itemPrice)}
                          </div>

                          <div
                            className={clsx(
                              "flex h-[47px] w-[106px] items-center justify-between rounded-[10px] border border-[#9F9F9F] px-2",
                            )}
                          >
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className={clsx(
                                "flex h-full w-6 items-center justify-center text-[16px] hover:text-[#B88E2F]",
                              )}
                            >
                              -
                            </button>
                            <span
                              className={clsx(
                                "text-[16px] font-medium text-black",
                              )}
                            >
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className={clsx(
                                "flex h-full w-6 items-center justify-center text-[16px] hover:text-[#B88E2F]",
                              )}
                            >
                              +
                            </button>
                          </div>

                          <div className={clsx("text-black")}>
                            Rs. {formatRs(itemPrice * item.quantity)}
                          </div>

                          <button
                            type="button"
                            aria-label="Remove item"
                            onClick={() => removeItem(item.id)}
                            className={clsx(
                              "flex h-10 w-10 items-center justify-center text-[#B88E2F] transition hover:bg-[#F8E6C5]",
                            )}
                          >
                            <AiOutlineDelete size={28} />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            <aside className="h-[390px] bg-[#F9F1E7] px-[75px] pt-[15px]">
              <div>
                <h2 className="whitespace-nowrap text-center text-[32px] font-semibold text-black">
                  Cart Totals
                </h2>
                <div className="mt-[63px] flex items-center justify-between text-[16px]">
                  <span className="font-medium text-black">Subtotal</span>
                  <span className="text-[#9F9F9F]">
                    Rs. {formatRs(subtotal)}
                  </span>
                </div>
                <div className="mt-[31px] flex items-center justify-between text-[16px]">
                  <span className="font-medium text-black">Total</span>
                  <span className="whitespace-nowrap text-[20px] font-medium text-[#B88E2F]">
                    Rs. {formatRs(total)}
                  </span>
                </div>
                <Link
                  to={items.length === 0 ? "#" : "/checkout"}
                  onClick={(e) => items.length === 0 && e.preventDefault()}
                  className={clsx(
                    "mx-auto mt-[50px] inline-flex h-[59px] w-[222px] items-center justify-center rounded-[15px] border border-black bg-transparent text-[20px] text-black transition hover:bg-white/50",
                    items.length === 0 && "opacity-50 cursor-not-allowed",
                  )}
                >
                  Check Out
                </Link>
              </div>
            </aside>
          </div>
        </main>

        <BenefitsCard />
      </div>
    </Container>
  );
};

export default Cart;
