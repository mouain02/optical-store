import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Loader from "../components/common/Loader";
import { authService, orderService, wishlistService } from "../services";
import { setUser } from "../redux/slices/authSlice";
import { formatPrice } from "../utils/helpers";

export default function AccountPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    let active = true;
    setLoading(true);

    Promise.all([authService.getMe(), orderService.getMy(), wishlistService.getAll()])
      .then(([me, userOrders, userWishlist]) => {
        if (!active) return;
        setProfile(me);
        setOrders(userOrders);
        setWishlist(userWishlist);
        reset({
          name: me?.name || "",
          email: me?.email || "",
          phone: me?.phone || "",
          password: "",
        });
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [reset, user]);

  const savedAddresses = useMemo(() => profile?.addresses || [], [profile]);

  const onSubmit = async (values) => {
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      if (values.password) payload.password = values.password;

      const updated = await authService.updateProfile(payload);
      dispatch(setUser(updated));
      setProfile((current) => ({ ...current, ...updated }));
      reset({ ...values, password: "" });
      setMessage("Profile updated successfully.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="section-padding py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="card p-8 md:p-10">
          <p className="text-xs uppercase tracking-widest text-accent mb-3">{t("account.dashboard")}</p>
          <h1 className="text-3xl font-heading uppercase tracking-widest mb-3">{user.name}</h1>
          <p className="text-sm text-gray-600">{user.role === "admin" ? "Manage the store from your dashboard." : "Review your orders, addresses, and wishlist from one place."}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link to="#profile" className="card p-6 hover:shadow-lg transition-shadow">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t("account.profile")}</p>
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-gray-500 mt-2">{user.email}</p>
          </Link>
          <Link to="#orders" className="card p-6 hover:shadow-lg transition-shadow">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t("account.orders")}</p>
            <p className="text-lg font-medium">Track purchases</p>
          </Link>
          <Link to="#addresses" className="card p-6 hover:shadow-lg transition-shadow">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t("account.addresses")}</p>
            <p className="text-lg font-medium">Manage delivery details</p>
          </Link>
          <Link to="#wishlist" className="card p-6 hover:shadow-lg transition-shadow">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t("account.wishlist")}</p>
            <p className="text-lg font-medium">Saved products</p>
          </Link>
          <Link to="#orders" className="card p-6 hover:shadow-lg transition-shadow">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{t("account.orders")}</p>
            <p className="text-lg font-medium">Recent purchases</p>
          </Link>
        </div>

        <div id="profile" className="card p-8 md:p-10 scroll-mt-24">
          <h2 className="text-xl font-heading uppercase tracking-widest mb-6">{t("account.profile")}</h2>
          {loading ? (
            <Loader />
          ) : (
            <form className="space-y-5 max-w-2xl" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="label" htmlFor="name">{t("auth.name")}</label>
                  <input
                    id="name"
                    className="input-field"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && <p className="text-sm text-red-600 mt-2">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="email">{t("auth.email")}</label>
                  <input
                    id="email"
                    type="email"
                    className="input-field"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="label" htmlFor="phone">{t("auth.phone")}</label>
                  <input id="phone" className="input-field" {...register("phone")} />
                </div>
                <div>
                  <label className="label" htmlFor="password">{t("auth.password")}</label>
                  <input
                    id="password"
                    type="password"
                    className="input-field"
                    placeholder="••••••••"
                    {...register("password")}
                  />
                </div>
              </div>

              {message && <p className="text-sm text-green-700">{message}</p>}

              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? t("common.loading") : t("common.save")}
              </button>
            </form>
          )}
        </div>

        <div id="orders" className="card p-8 md:p-10 scroll-mt-24">
          <h2 className="text-xl font-heading uppercase tracking-widest mb-3">{t("account.orders")}</h2>
          {loading ? (
            <Loader />
          ) : orders.length ? (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order._id} className="border border-gray-200 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{t(`order.status.${order.status}`)}</p>
                    <p className="text-sm text-gray-600 mt-2">{order.items?.length || 0} items</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatPrice(order.totalPrice)}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Order history will appear here.</p>
          )}
        </div>

        <div id="addresses" className="card p-8 md:p-10 scroll-mt-24">
          <h2 className="text-xl font-heading uppercase tracking-widest mb-3">{t("account.addresses")}</h2>
          {savedAddresses.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {savedAddresses.map((address) => (
                <div key={address._id} className="border border-gray-200 p-4">
                  <p className="text-sm font-medium">{address.label || address.street}</p>
                  <p className="text-sm text-gray-600 mt-2">{address.street}</p>
                  <p className="text-sm text-gray-600">{address.city}, {address.postalCode}</p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Saved addresses and shipping preferences will appear here.</p>
          )}
        </div>

        <div id="wishlist" className="card p-8 md:p-10 scroll-mt-24">
          <h2 className="text-xl font-heading uppercase tracking-widest mb-3">{t("account.wishlist")}</h2>
          {loading ? (
            <Loader />
          ) : wishlist.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {wishlist.map((item) => (
                <Link key={item._id} to={`/product/${item.slug}`} className="border border-gray-200 p-4 block hover:border-accent transition-colors">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600 mt-2">{formatPrice(item.discountPrice || item.price)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Your saved products will appear here.</p>
          )}
        </div>
      </div>
    </section>
  );
}