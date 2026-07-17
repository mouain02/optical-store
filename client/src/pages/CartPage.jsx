import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  selectCartSubtotal,
  selectCartShipping,
  selectCartDiscount,
  selectCartTotal,
} from "../redux/slices/cartSlice";
import { formatPrice, getImageUrl } from "../utils/helpers";
import EmptyState from "../components/common/EmptyState";

export default function CartPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);
  const subtotal = useSelector(selectCartSubtotal);
  const shipping = useSelector(selectCartShipping);
  const discount = useSelector(selectCartDiscount);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="section-padding py-16">
        <EmptyState message={t("cart.empty")} action={
          <Link to="/shop" className="btn-primary mt-4">{t("cart.continueShopping")}</Link>
        } />
      </div>
    );
  }

  return (
    <div className="section-padding py-12">
      <h1 className="font-heading text-4xl uppercase tracking-widest mb-8">{t("cart.title")}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.key} className="flex gap-6 border-b border-gray-100 pb-6">
              <div className="w-24 h-32 bg-gray-100 shrink-0 overflow-hidden">
                <img
                  src={getImageUrl(item.product.images?.[0]?.path)}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                {item.variant?.color && (
                  <p className="text-sm text-gray-500 capitalize">{item.variant.color} / {item.variant.size}</p>
                )}
                {item.lensOptions && (
                  <p className="text-xs text-gray-400 mt-1">
                    {item.lensOptions.type} {item.lensOptions.treatments?.join(", ")}
                  </p>
                )}
                <p className="text-sm font-medium mt-2">{formatPrice(item.price)}</p>
                <div className="flex items-center gap-4 mt-3">
                  <label className="text-xs uppercase tracking-widest">
                    {t("cart.quantity")}
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => dispatch(updateQuantity({ key: item.key, quantity: Number(e.target.value) }))}
                      className="ml-2 w-16 border px-2 py-1 text-sm"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => dispatch(removeFromCart(item.key))}
                    className="text-xs uppercase tracking-widest text-red-600"
                  >
                    {t("cart.remove")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 p-6 h-fit">
          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span>{t("cart.subtotal")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>{t("cart.shipping")}</span>
              <span>{shipping === 0 ? t("common.free") : formatPrice(shipping)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>{t("cart.discount")}</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-medium text-base pt-3 border-t">
              <span>{t("cart.total")}</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary w-full text-center block">
            {t("cart.checkout")}
          </Link>
        </div>
      </div>
    </div>
  );
}
