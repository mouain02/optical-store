import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { orderService, couponService } from "../services";
import {
  selectCartSubtotal,
  selectCartShipping,
  selectCartTotal,
  setCoupon,
  clearCart,
} from "../redux/slices/cartSlice";
import { formatPrice } from "../utils/helpers";
import ProtectedRoute from "../components/common/ProtectedRoute";

function CheckoutForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const items = useSelector((s) => s.cart.items);
  const coupon = useSelector((s) => s.cart.coupon);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectCartShipping);
  const total = useSelector(selectCartTotal);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applyCoupon = async () => {
    try {
      const result = await couponService.validate(couponCode, subtotal);
      dispatch(setCoupon(result.coupon));
    } catch (err) {
      setError(err.response?.data?.message || t("common.error"));
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      const order = await orderService.create({
        items: items.map((i) => ({
          product: i.product._id,
          quantity: i.quantity,
          variant: i.variant,
          lensOptions: i.lensOptions,
          prescription: i.prescription,
        })),
        shippingAddress: {
          name: data.name,
          phone: data.phone,
          street: data.street,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        },
        paymentMethod: data.paymentMethod || "cod",
        couponCode: coupon?.code,
        customerNote: data.note,
      });
      dispatch(clearCart());
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-padding py-12">
      <h1 className="font-heading text-4xl uppercase tracking-widest mb-8">{t("checkout.title")}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="font-heading text-xl uppercase tracking-widest mb-4">{t("checkout.shippingInfo")}</h2>
          <input {...register("name", { required: true })} placeholder={t("auth.name")} className="input-field" />
          <input {...register("phone", { required: true })} placeholder={t("auth.phone")} className="input-field" />
          <input {...register("street", { required: true })} placeholder="Street" className="input-field" />
          <input {...register("city", { required: true })} placeholder="City" className="input-field" />
          <input {...register("postalCode")} placeholder="Postal Code" className="input-field" />
          <input {...register("country", { required: true })} placeholder="Country" className="input-field" />
          <textarea {...register("note")} placeholder="Note" className="input-field" rows={3} />

          <h2 className="font-heading text-xl uppercase tracking-widest mt-8 mb-4">{t("checkout.paymentMethod")}</h2>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" {...register("paymentMethod")} value="cod" defaultChecked />
            {t("checkout.cod")}
          </label>
          <label className="flex items-center gap-2 text-sm opacity-50">
            <input type="radio" {...register("paymentMethod")} value="online" disabled />
            {t("checkout.online")} (coming soon)
          </label>
        </div>

        <div>
          <div className="border border-gray-200 p-6 sticky top-24">
            <h2 className="font-heading text-xl uppercase tracking-widest mb-4">{t("checkout.orderSummary")}</h2>
            {items.map((i) => (
              <div key={i.key} className="flex justify-between text-sm mb-2">
                <span>{i.product.name} × {i.quantity}</span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t("cart.subtotal")}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>{t("cart.shipping")}</span>
                <span>{shipping === 0 ? t("common.free") : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t">
                <span>{t("cart.total")}</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={t("checkout.coupon")}
                className="input-field flex-1"
              />
              <button type="button" onClick={applyCoupon} className="btn-outline px-4 py-2 text-xs">
                {t("checkout.apply")}
              </button>
            </div>

            {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

            <button type="submit" className="btn-primary w-full mt-6" disabled={loading}>
              {loading ? t("common.loading") : t("checkout.placeOrder")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutForm />
    </ProtectedRoute>
  );
}
