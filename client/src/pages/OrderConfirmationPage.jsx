import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { orderService } from "../services";
import { formatPrice } from "../utils/helpers";
import Loader from "../components/common/Loader";

const STATUS_STEPS = [
  "pending",
  "prescription_verification",
  "processing",
  "ready",
  "shipped",
  "delivered",
];

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getById(id).then(setOrder).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!order) return null;

  const currentStep = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="section-padding py-16 max-w-2xl mx-auto text-center">
      <h1 className="font-heading text-4xl uppercase tracking-widest mb-4">{t("order.confirmation")}</h1>
      <p className="text-gray-600 mb-8">{t("order.thankYou")}</p>

      <div className="border border-gray-200 p-8 mb-8 text-left">
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{t("order.orderNumber")}</p>
        <p className="font-medium text-lg mb-6">{order.orderNumber}</p>
        <p className="text-sm mb-2">{t("cart.total")}: <strong>{formatPrice(order.totalPrice)}</strong></p>
        <p className="text-sm capitalize">{t(`order.status.${order.status}`)}</p>
      </div>

      <div className="mb-12">
        <h2 className="font-heading text-xl uppercase tracking-widest mb-6">{t("order.track")}</h2>
        <div className="flex justify-between relative">
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-gray-200" />
          {STATUS_STEPS.map((step, i) => (
            <div key={step} className="relative flex flex-col items-center flex-1">
              <div className={`w-6 h-6 rounded-full z-10 ${i <= currentStep ? "bg-accent" : "bg-gray-200"}`} />
              <span className="text-[10px] uppercase tracking-wider mt-2 text-center hidden sm:block">
                {t(`order.status.${step}`)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Link to="/account" className="btn-primary">{t("account.orders")}</Link>
    </div>
  );
}
