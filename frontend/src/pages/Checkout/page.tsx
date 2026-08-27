import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkoutSchema, type CheckoutFormData } from "../../validations/checkoutSchema";
import { fetchAddressByCep } from "../../services/viaCep";
import { useCart } from "../../context/cartStore";
import NumberToStringRP from "../../utils/NumberToStringRP";
import { useCartStore } from "../../context/cartStore"; 

const Checkout = () => {
  const navigate = useNavigate();
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch("paymentMethod");

  const subtotal = items.reduce((acc, item) => {
    const price = item.discountPrice ?? item.price;
    return acc + price * item.quantity;
  }, 0);

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    setIsFetchingCep(true);
    try {
      const data = await fetchAddressByCep(cep);

      if (data.erro) {
        toast.error("CEP não encontrado.");
        return;
      }

      setValue("countryRegion", "Brasil");
      setValue("streetAddress", data.logradouro);
      setValue("townCity", data.localidade);
      setValue("province", data.uf);
    } catch {
      toast.error("Erro ao buscar o CEP. Tente novamente.");
    } finally {
      setIsFetchingCep(false);
    }
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Pedido:", { ...data, items, subtotal });

    toast.success("Pedido realizado com sucesso!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-360 mx-auto px-4 lg:px-12.5 py-12">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-6">Billing details</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <input
                {...register("firstName")}
                placeholder="First Name"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">{errors.firstName.message}</span>
              )}
            </div>
            <div>
              <input
                {...register("lastName")}
                placeholder="Last Name"
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <input
              {...register("companyName")}
              placeholder="Company Name (Optional)"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <input
              {...register("zipCode")}
              onBlur={handleCepBlur}
              placeholder={isFetchingCep ? "Buscando CEP..." : "ZIP code"}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.zipCode && (
              <span className="text-red-500 text-xs">{errors.zipCode.message}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("countryRegion")}
              placeholder="Country / Region"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.countryRegion && (
              <span className="text-red-500 text-xs">{errors.countryRegion.message}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("streetAddress")}
              placeholder="Street address"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.streetAddress && (
              <span className="text-red-500 text-xs">{errors.streetAddress.message}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("townCity")}
              placeholder="Town / City"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.townCity && (
              <span className="text-red-500 text-xs">{errors.townCity.message}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("province")}
              placeholder="Province"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.province && (
              <span className="text-red-500 text-xs">{errors.province.message}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("phone")}
              placeholder="Phone"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">{errors.phone.message}</span>
            )}
          </div>

          <div className="mb-4">
            <input
              {...register("email")}
              placeholder="Email address"
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>

          <textarea
            {...register("additionalInfo")}
            placeholder="Additional information"
            rows={4}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div>
          <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between font-semibold">
            <span>Product</span>
            <span>Subtotal</span>
          </div>

          {items.map((item) => {
            const price = item.discountPrice ?? item.price;
            return (
              <div key={item.id} className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">
                  {item.name} <span className="text-gray-400">x {item.quantity}</span>
                </span>
                <span>Rp {NumberToStringRP(price * item.quantity)}</span>
              </div>
            );
          })}

          <div className="flex justify-between py-2 border-t border-gray-200 mt-2 text-sm">
            <span>Subtotal</span>
            <span>Rp {NumberToStringRP(subtotal)}</span>
          </div>

          <div className="flex justify-between py-2 font-semibold text-[#B88E2F] border-t border-gray-200">
            <span>Total</span>
            <span>Rp {NumberToStringRP(subtotal)}</span>
          </div>

          <div className="mt-8 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="bank_transfer" {...register("paymentMethod")} />
              Direct Bank Transfer
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="cash" {...register("paymentMethod")} />
              Cash on delivery
            </label>
            {errors.paymentMethod && (
              <span className="text-red-500 text-xs block">{errors.paymentMethod.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={!paymentMethod}
            className="w-full mt-8 py-3 rounded-full border border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Place order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;