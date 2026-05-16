import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useCartStore } from "../features/cart/cartStore";
import { createOrder } from "../features/orders/orderApi";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(8, "Phone is required"),
  addressLine1: z.string().min(5, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const cartProducts = useMemo(
    () =>
      items.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
    [items]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order placed successfully");
      clearCart();
      navigate("/profile");
    },
    onError: () => {
      toast.error("Failed to place order");
    },
  });

  const onSubmit = (values: CheckoutFormData) => {
    if (!items.length) {
      toast.error("Your cart is empty");
      return;
    }

    mutate({
      products: cartProducts,
      totalPrice,
      address: values,
      paymentMethod: "cod",
    });
  };

  return (
    <div className="py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Checkout
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white">
              Shipping details
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-5">
              <div>
                <Input placeholder="Full name" {...register("fullName")} />
                {errors.fullName && (
                  <p className="mt-2 text-sm text-rose-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Input placeholder="Phone number" {...register("phone")} />
                {errors.phone && (
                  <p className="mt-2 text-sm text-rose-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <Input placeholder="Address line 1" {...register("addressLine1")} />
                {errors.addressLine1 && (
                  <p className="mt-2 text-sm text-rose-400">{errors.addressLine1.message}</p>
                )}
              </div>

              <div>
                <Input placeholder="Address line 2 (optional)" {...register("addressLine2")} />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Input placeholder="City" {...register("city")} />
                  {errors.city && (
                    <p className="mt-2 text-sm text-rose-400">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <Input placeholder="State" {...register("state")} />
                  {errors.state && (
                    <p className="mt-2 text-sm text-rose-400">{errors.state.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <Input placeholder="Postal code" {...register("postalCode")} />
                  {errors.postalCode && (
                    <p className="mt-2 text-sm text-rose-400">{errors.postalCode.message}</p>
                  )}
                </div>

                <div>
                  <Input placeholder="Country" {...register("country")} />
                  {errors.country && (
                    <p className="mt-2 text-sm text-rose-400">{errors.country.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" className="mt-2 w-full" disabled={isPending}>
                {isPending ? "Placing order..." : "Place Order"}
              </Button>
            </form>
          </div>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Order summary</h2>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-cyan-300">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <span className="text-slate-300">Total</span>
              <span className="text-2xl font-semibold text-cyan-300">₹{totalPrice}</span>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}