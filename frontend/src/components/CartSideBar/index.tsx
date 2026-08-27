import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartStore";

export const CartSidebar: React.FC = () => {
  const navigate = useNavigate();

  const isCartOpen = useCart((state) => state.isCartOpen);
  const closeCart = useCart((state) => state.closeCart);
  const items = useCart((state) => state.items);
  const removeItem = useCart((state) => state.removeItem);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const subtotal = items.reduce((acc: number, item) => {
    const currentPrice = item.discountPrice ?? item.price;
    return acc + currentPrice * item.quantity;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="relative w-full max-w-[417px] h-[746px] bg-white shadow-2xl flex flex-col p-6 animate-in slide-in-from-right duration-300">
        
          <div className="flex justify-between items-center pb-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button 
              onClick={closeCart} 
              
              aria-label="Fechar carrinho"
            >
                <img
                    src="/Icons/close.svg"
                    alt="Fechar carrinho"
                    className="w-5 h-5"
                />
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto py-6 space-y-6 pr-2">
            {items.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Seu carrinho está vazio.</p>
            ) : (
              items.map((item) => {
                console.log("Nome:", item.name, "| URL da Imagem:", item.image);
                const displayPrice = item.discountPrice ?? item.price;

                return (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <img 
                      src={item.image}
                      alt={item.name} 
                      className="w-[108px] h-[105px] object-cover rounded-xl bg-[#F9F1E7]" 
                    />

                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.quantity} <span className="text-xs">X</span>{" "}
                        <span className="text-[#B88E2F] font-medium">
                          Rs. {displayPrice.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                        </span>
                      </p>
                      {(item.color || item.size) && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.color} {item.size ? `/ ${item.size}` : ""}
                        </p>
                      )}
                    </div>

                    <button 
                      onClick={() => removeItem(item.id)}
                      className="w-5 h-5 rounded-full bg-gray-400 text-white flex items-center justify-center hover:bg-gray-600 transition-colors text-xs font-bold cursor-pointer"
                      title="Remover item"
                    >
                      X
                    </button>
                  </div>
                );
              })
            )}
          </div>

        <div className="border-t border-gray-200 pt-6 mt-auto">
          <div className="flex justify-between items-center mb-6">
            <span className="text-base text-gray-900">Subtotal</span>
            <span className="text-base font-semibold text-[#B88E2F]">
              Rs. {subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                closeCart();
                navigate("/cart");
              }}
              className="flex-1 py-2 px-6 rounded-full border border-black text-black text-xs font-semibold hover:bg-black hover:text-white transition-all text-center tracking-wider uppercase cursor-pointer"
            >
              Cart
            </button>
            <button
              onClick={() => {
                closeCart();
                navigate("/checkout");
              }}
              className="flex-1 py-2 px-6 rounded-full border border-black text-black text-xs font-semibold hover:bg-black hover:text-white transition-all text-center tracking-wider uppercase cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};