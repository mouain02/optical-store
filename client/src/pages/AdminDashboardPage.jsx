import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";
import {
  adminService,
  brandService,
  couponService,
  orderService,
  productService,
  reviewService,
} from "../services";
import { formatPrice } from "../utils/helpers";

function Section({ id, title, meta, children }) {
  return (
    <section id={id} className="card p-6 scroll-mt-24">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-heading uppercase tracking-widest mb-2">{title}</h2>
          {meta && <p className="text-xs uppercase tracking-widest text-gray-500">{meta}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [brands, setBrands] = useState([]);
  const [userDrafts, setUserDrafts] = useState({});
  const [couponDraft, setCouponDraft] = useState({
    code: "",
    discountType: "percentage",
    discount: "",
    expiration: "",
    active: true,
    usageLimit: "",
    minOrderAmount: "",
  });
  const [editingCouponId, setEditingCouponId] = useState(null);
  const [savingCoupon, setSavingCoupon] = useState(false);
  const [brandDraft, setBrandDraft] = useState({ name: "", logo: "" });
  const [editingBrandId, setEditingBrandId] = useState(null);
  const [savingBrand, setSavingBrand] = useState(false);
  const [productDraft, setProductDraft] = useState({
    name: "",
    description: "",
    brand: "",
    category: "sunglasses",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    gender: "unisex",
    frameShape: "",
    frameMaterial: "",
    colors: "",
    sizes: "",
    requiresPrescription: false,
    supportsLensCustomization: false,
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [savingUserId, setSavingUserId] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  useEffect(() => {
    let active = true;

    Promise.all([
      adminService.getDashboard(),
      adminService.getUsers(),
      productService.getAdminAll(),
      orderService.getAdminAll(),
      reviewService.getAdminAll(),
      couponService.getAll(),
      brandService.getAll(),
    ])
      .then(([dashboardData, userData, productData, orderData, reviewData, couponData, brandData]) => {
        if (!active) return;
        setDashboard(dashboardData);
        setUsers(userData);
        setProducts(productData);
        setOrders(orderData);
        setReviews(reviewData);
        setCoupons(couponData);
        setBrands(brandData);
        setUserDrafts(
          Object.fromEntries(
            userData.map((user) => [
              user._id,
              {
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                role: user.role || "customer",
              },
            ])
          )
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const stats = dashboard?.stats
    ? [
      { label: t("admin.stats.revenue"), value: formatPrice(dashboard.stats.revenue || 0) },
      { label: t("admin.stats.orders"), value: dashboard.stats.orders || 0 },
      { label: t("admin.stats.customers"), value: dashboard.stats.customers || 0 },
      { label: t("admin.stats.products"), value: dashboard.stats.products || 0 },
    ]
    : [];

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "users", label: t("admin.users") },
    { key: "products", label: t("admin.products") },
    { key: "orders", label: t("admin.orders") },
    { key: "reviews", label: t("admin.reviews") },
    { key: "coupons", label: t("admin.coupons") },
    { key: "brands", label: t("admin.brands") },
  ];

  const updateUserDraft = (id, field, value) => {
    setUserDrafts((current) => ({
      ...current,
      [id]: { ...current[id], [field]: value },
    }));
  };

  const resetCouponDraft = () => {
    setEditingCouponId(null);
    setCouponDraft({
      code: "",
      discountType: "percentage",
      discount: "",
      expiration: "",
      active: true,
      usageLimit: "",
      minOrderAmount: "",
    });
  };

  const startEditCoupon = (coupon) => {
    setEditingCouponId(coupon._id);
    setCouponDraft({
      code: coupon.code || "",
      discountType: coupon.discountType || "percentage",
      discount: coupon.discount ?? "",
      expiration: coupon.expiration ? new Date(coupon.expiration).toISOString().slice(0, 10) : "",
      active: Boolean(coupon.active),
      usageLimit: coupon.usageLimit ?? "",
      minOrderAmount: coupon.minOrderAmount ?? "",
    });
  };

  const saveCoupon = async (event) => {
    event.preventDefault();
    setSavingCoupon(true);
    setFeedback("");

    const payload = {
      code: couponDraft.code,
      discountType: couponDraft.discountType,
      discount: Number(couponDraft.discount),
      expiration: couponDraft.expiration || null,
      active: couponDraft.active,
      usageLimit: Number(couponDraft.usageLimit) || 0,
      minOrderAmount: Number(couponDraft.minOrderAmount) || 0,
    };

    try {
      const saved = editingCouponId
        ? await couponService.update(editingCouponId, payload)
        : await couponService.create(payload);

      setCoupons((current) => {
        if (editingCouponId) {
          return current.map((coupon) => (coupon._id === editingCouponId ? saved : coupon));
        }
        return [saved, ...current];
      });
      setFeedback(`Coupon ${editingCouponId ? "updated" : "created"} in database.`);
      resetCouponDraft();
    } finally {
      setSavingCoupon(false);
    }
  };

  const deleteCoupon = async (id) => {
    setFeedback("");
    await couponService.remove(id);
    setCoupons((current) => current.filter((coupon) => coupon._id !== id));
    if (editingCouponId === id) resetCouponDraft();
    setFeedback("Coupon removed from database.");
  };

  const resetBrandDraft = () => {
    setEditingBrandId(null);
    setBrandDraft({ name: "", logo: "" });
  };

  const startEditBrand = (brand) => {
    setEditingBrandId(brand._id);
    setBrandDraft({ name: brand.name || "", logo: brand.logo || "" });
  };

  const saveBrand = async (event) => {
    event.preventDefault();
    setSavingBrand(true);
    setFeedback("");

    try {
      const saved = editingBrandId
        ? await brandService.update(editingBrandId, brandDraft)
        : await brandService.create(brandDraft);

      setBrands((current) => {
        if (editingBrandId) {
          return current.map((brand) => (brand._id === editingBrandId ? saved : brand));
        }
        return [saved, ...current];
      });
      setFeedback(`Brand ${editingBrandId ? "updated" : "created"} in database.`);
      resetBrandDraft();
    } finally {
      setSavingBrand(false);
    }
  };

  const deleteBrand = async (id) => {
    setFeedback("");
    await brandService.remove(id);
    setBrands((current) => current.filter((brand) => brand._id !== id));
    if (editingBrandId === id) resetBrandDraft();
    setFeedback("Brand removed from database.");
  };

  const resetProductDraft = () => {
    setEditingProductId(null);
    setProductImages([]);
    setProductDraft({
      name: "",
      description: "",
      brand: brands[0]?._id || "",
      category: "sunglasses",
      price: "",
      discountPrice: "",
      stock: "",
      sku: "",
      gender: "unisex",
      frameShape: "",
      frameMaterial: "",
      colors: "",
      sizes: "",
      requiresPrescription: false,
      supportsLensCustomization: false,
    });
  };

  const startEditProduct = (product) => {
    setEditingProductId(product._id);
    setProductDraft({
      name: product.name || "",
      description: product.description || "",
      brand: product.brand?._id || product.brand || brands[0]?._id || "",
      category: product.category || "sunglasses",
      price: product.price ?? "",
      discountPrice: product.discountPrice ?? "",
      stock: product.stock ?? "",
      sku: product.sku || "",
      gender: product.gender || "unisex",
      frameShape: product.frameShape || "",
      frameMaterial: product.frameMaterial || "",
      colors: Array.isArray(product.colors) ? product.colors.join(", ") : "",
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : "",
      requiresPrescription: Boolean(product.requiresPrescription),
      supportsLensCustomization: Boolean(product.supportsLensCustomization),
    });
  };

  const showFeedback = (type, message) => {
    setFeedback({ type, message });
    if (type === "success") {
      setTimeout(() => setFeedback({ type: "", message: "" }), 5000);
    }
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    if (!productDraft.brand) {
      showFeedback("error", "Choose a brand before saving the product.");
      return;
    }

    setSavingProduct(true);
    setFeedback({ type: "", message: "" });

    const payload = {
      ...productDraft,
      price: Number(productDraft.price),
      discountPrice: Number(productDraft.discountPrice) || 0,
      stock: Number(productDraft.stock) || 0,
      colors: productDraft.colors
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      sizes: productDraft.sizes
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
    };

    try {
      let saved;

      if (editingProductId) {
        saved = await productService.update(editingProductId, payload);
      } else {
        saved = await productService.create(payload);
      }

      // upload images after product creation/update
      if (productImages.length > 0) {
        setUploadingImages(true);

        try {
          const formData = new FormData();

          productImages.forEach((image) => {
            formData.append("images", image);
          });

          await productService.uploadImages(
            saved.slug,
            formData
          );
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          showFeedback("warning", `Product saved but image upload failed: ${uploadError.response?.data?.message || uploadError.message}`);
        } finally {
          setUploadingImages(false);
        }
      }

      setProducts((current) => {
        if (editingProductId) {
          return current.map((product) => (product._id === editingProductId ? { ...product, ...saved } : product));
        }
        return [saved, ...current];
      });
      showFeedback("success", `Product ${editingProductId ? "updated" : "created"} successfully!`);
      resetProductDraft();
    } catch (error) {
      console.error("Product save failed:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to save product";
      showFeedback("error", errorMessage);
    } finally {
      setSavingProduct(false);
    }
  };

  const deleteProduct = async (id) => {
    setFeedback("");
    await productService.remove(id);
    setProducts((current) => current.filter((product) => product._id !== id));
    if (editingProductId === id) resetProductDraft();
    setFeedback("Product removed from database.");
  };

  const approveReview = async (review) => {
    const updated = await reviewService.approve(review._id, !review.approved);
    setReviews((current) => current.map((item) => (item._id === review._id ? updated : item)));
    setFeedback(`Review ${updated.approved ? "approved" : "unapproved"}.`);
  };

  const deleteReview = async (id) => {
    await reviewService.remove(id);
    setReviews((current) => current.filter((review) => review._id !== id));
    setFeedback("Review deleted from database.");
  };

  const saveUser = async (id) => {
    setSavingUserId(id);
    setFeedback("");
    try {
      const updated = await adminService.updateUser(id, userDrafts[id]);
      setUsers((current) => current.map((user) => (user._id === id ? { ...user, ...updated } : user)));
      setFeedback("User saved to database.");
    } finally {
      setSavingUserId(null);
    }
  };

  const deleteUser = async (id) => {
    setFeedback("");
    await adminService.deleteUser(id);
    setUsers((current) => current.filter((user) => user._id !== id));
    setFeedback("User deleted from database.");
  };

  if (loading) {
    return <Loader size="lg" />;
  }

  return (
    <div className="space-y-8">
      <section className="card p-8 md:p-10">
        <p className="text-xs uppercase tracking-widest text-accent mb-3">{t("admin.dashboard")}</p>
        <h1 className="text-3xl font-heading uppercase tracking-widest mb-4">Store control center</h1>
        <p className="text-gray-600">
          Manage users, products, orders, reviews, coupons, and brands from one place.
        </p>
        {feedback.message && (
          <div className={`mt-4 px-4 py-3 rounded text-sm font-medium ${
            feedback.type === "success" ? "bg-green-50 text-green-800 border border-green-200" :
            feedback.type === "error" ? "bg-red-50 text-red-800 border border-red-200" :
            feedback.type === "warning" ? "bg-yellow-50 text-yellow-800 border border-yellow-200" :
            "bg-green-50 text-green-800 border border-green-200"
          }`}>
            {feedback.type === "success" && "✓ "}
            {feedback.type === "error" && "✗ "}
            {feedback.type === "warning" && "⚠ "}
            {feedback.message}
          </div>
        )}
      </section>

      <div className="flex flex-wrap gap-3 border-b border-gray-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-xs uppercase tracking-widest border rounded-full transition-colors ${activeTab === tab.key
              ? "bg-primary text-white border-primary"
              : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-6">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
                <p className="text-2xl font-heading tracking-widest">{stat.value}</p>
              </div>
            ))}
          </section>

          <section className="card p-6">
            <p className="text-sm text-gray-600">
              Pick a tab to manage customers, products, orders, reviews, coupons, or brands. All changes are saved directly to MongoDB.
            </p>
          </section>
        </div>
      )}

      {activeTab === "users" && (
        <Section id="users" title={t("admin.users")} meta={`${users.length} users`}>
          {users.length ? (
            <div className="space-y-4 max-h-[34rem] overflow-auto pr-1">
              {users.map((user) => {
                const draft = userDrafts[user._id] || {};
                return (
                  <div key={user._id} className="border border-gray-200 p-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label={t("auth.name")}>
                        <input
                          className="input-field"
                          value={draft.name || ""}
                          onChange={(event) => updateUserDraft(user._id, "name", event.target.value)}
                        />
                      </Field>
                      <Field label={t("auth.email")}>
                        <input
                          className="input-field"
                          value={draft.email || ""}
                          onChange={(event) => updateUserDraft(user._id, "email", event.target.value)}
                        />
                      </Field>
                      <Field label={t("auth.phone")}>
                        <input
                          className="input-field"
                          value={draft.phone || ""}
                          onChange={(event) => updateUserDraft(user._id, "phone", event.target.value)}
                        />
                      </Field>
                      <Field label="Role">
                        <select
                          className="input-field"
                          value={draft.role || "customer"}
                          onChange={(event) => updateUserDraft(user._id, "role", event.target.value)}
                        >
                          <option value="customer">customer</option>
                          <option value="admin">admin</option>
                        </select>
                      </Field>
                    </div>

                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="btn-outline"
                          onClick={() => saveUser(user._id)}
                          disabled={savingUserId === user._id}
                        >
                          {savingUserId === user._id ? t("common.loading") : t("common.save")}
                        </button>
                        <button
                          type="button"
                          className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                          onClick={() => deleteUser(user._id)}
                        >
                          {t("common.delete")}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState message="No users found." />
          )}
        </Section>
      )}

      {activeTab === "products" && (
        <Section id="products" title={t("admin.products")} meta={`${products.length} products`}>
          <form className="space-y-5 mb-6 border border-gray-200 p-4" onSubmit={saveProduct}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h3 className="font-heading uppercase tracking-widest text-sm">
                {editingProductId ? t("admin.editProduct") : t("admin.addProduct")}
              </h3>
              {editingProductId && (
                <button type="button" className="text-xs uppercase tracking-widest text-accent" onClick={resetProductDraft}>
                  Cancel edit
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <input className="input-field" value={productDraft.name} onChange={(e) => setProductDraft((c) => ({ ...c, name: e.target.value }))} />
              </Field>
              <Field label="Brand">
                <select className="input-field" value={productDraft.brand} onChange={(e) => setProductDraft((c) => ({ ...c, brand: e.target.value }))}>
                  <option value="">Select brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>{brand.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Category">
                <select className="input-field" value={productDraft.category} onChange={(e) => setProductDraft((c) => ({ ...c, category: e.target.value }))}>
                  <option value="prescription">prescription</option>
                  <option value="sunglasses">sunglasses</option>
                  <option value="contact-lenses">contact-lenses</option>
                  <option value="blue-light">blue-light</option>
                  <option value="kids">kids</option>
                  <option value="accessories">accessories</option>
                </select>
              </Field>
              <Field label="Gender">
                <select className="input-field" value={productDraft.gender} onChange={(e) => setProductDraft((c) => ({ ...c, gender: e.target.value }))}>
                  <option value="men">men</option>
                  <option value="women">women</option>
                  <option value="unisex">unisex</option>
                  <option value="kids">kids</option>
                </select>
              </Field>
              <Field label="Price">
                <input type="number" className="input-field" value={productDraft.price} onChange={(e) => setProductDraft((c) => ({ ...c, price: e.target.value }))} />
              </Field>
              <Field label="Discount price">
                <input type="number" className="input-field" value={productDraft.discountPrice} onChange={(e) => setProductDraft((c) => ({ ...c, discountPrice: e.target.value }))} />
              </Field>
              <Field label="Stock">
                <input type="number" className="input-field" value={productDraft.stock} onChange={(e) => setProductDraft((c) => ({ ...c, stock: e.target.value }))} />
              </Field>
              <Field label="SKU">
                <input className="input-field" value={productDraft.sku} onChange={(e) => setProductDraft((c) => ({ ...c, sku: e.target.value }))} />
              </Field>
              <Field label="Frame shape">
                <input className="input-field" value={productDraft.frameShape} onChange={(e) => setProductDraft((c) => ({ ...c, frameShape: e.target.value }))} />
              </Field>
              <Field label="Frame material">
                <input className="input-field" value={productDraft.frameMaterial} onChange={(e) => setProductDraft((c) => ({ ...c, frameMaterial: e.target.value }))} />
              </Field>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Colors comma separated">
                <input className="input-field" value={productDraft.colors} onChange={(e) => setProductDraft((c) => ({ ...c, colors: e.target.value }))} />
              </Field>
              <Field label="Sizes comma separated">
                <input className="input-field" value={productDraft.sizes} onChange={(e) => setProductDraft((c) => ({ ...c, sizes: e.target.value }))} />
              </Field>
            </div>
            <Field label="Product Images">

              <input
                type="file"
                accept="image/*"
                multiple
                className="input-field"
                onChange={(e) =>
                  setProductImages(Array.from(e.target.files))
                }
              />

              {productImages.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {productImages.length} image(s) selected
                </p>
              )}
            </Field>

            <Field label="Description">
              <textarea className="input-field min-h-28" value={productDraft.description} onChange={(e) => setProductDraft((c) => ({ ...c, description: e.target.value }))} />
            </Field>

            <div className="flex flex-wrap gap-6 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={productDraft.requiresPrescription} onChange={(e) => setProductDraft((c) => ({ ...c, requiresPrescription: e.target.checked }))} />
                Requires prescription
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={productDraft.supportsLensCustomization} onChange={(e) => setProductDraft((c) => ({ ...c, supportsLensCustomization: e.target.checked }))} />
                Supports lens customization
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={savingProduct || uploadingImages}>
              {uploadingImages ? "Uploading images..." : savingProduct ? "Saving product..." : editingProductId ? t("common.save") : t("admin.addProduct")}
            </button>
          </form>

          {products.length ? (
            <div className="space-y-3 max-h-[28rem] overflow-auto pr-1">
              {products.map((product) => (
                <div key={product._id} className="border border-gray-200 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-sm font-medium">{formatPrice(product.discountPrice || product.price)}</p>
                      <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Stock: {product.stock}</p>
                    </div>
                    <div className="flex gap-2">
                      <button type="button" className="btn-outline" onClick={() => startEditProduct(product)}>
                        {t("common.edit")}
                      </button>
                      <button type="button" className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white" onClick={() => deleteProduct(product._id)}>
                        {t("common.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No products found." />
          )}
        </Section>
      )}

      {activeTab === "orders" && (
        <Section id="orders" title={t("admin.orders")} meta={`${orders.length} orders`}>
          {orders.length ? (
            <div className="space-y-3 max-h-[28rem] overflow-auto pr-1">
              {orders.slice(0, 8).map((order) => (
                <div key={order._id} className="border border-gray-200 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-gray-500">{order.user?.name || order.user?.email || "Unknown user"}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mt-1 capitalize">{order.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatPrice(order.totalPrice)}</p>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No orders found." />
          )}
        </Section>
      )}

      {activeTab === "reviews" && (
        <Section id="reviews" title={t("admin.reviews")} meta={`${reviews.length} reviews`}>
          {reviews.length ? (
            <div className="space-y-3 max-h-[28rem] overflow-auto pr-1">
              {reviews.slice(0, 8).map((review) => (
                <div key={review._id} className="border border-gray-200 p-4">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div>
                      <p className="font-medium">{review.user?.name || "Customer"}</p>
                      <p className="text-sm text-gray-500">{review.product?.name || "Unknown product"}</p>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-gray-400">{review.approved ? "Approved" : "Pending"}</p>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <div className="flex gap-3 mt-4">
                    <button type="button" className="btn-outline" onClick={() => approveReview(review)}>
                      {review.approved ? "Unapprove" : "Approve"}
                    </button>
                    <button type="button" className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white" onClick={() => deleteReview(review._id)}>
                      {t("common.delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No reviews found." />
          )}
        </Section>
      )}

      {activeTab === "coupons" && (
        <Section id="coupons" title={t("admin.coupons")} meta={`${coupons.length} coupons`}>
          <form className="space-y-5 mb-6 border border-gray-200 p-4" onSubmit={saveCoupon}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h3 className="font-heading uppercase tracking-widest text-sm">
                {editingCouponId ? t("common.edit") : t("common.save")}
              </h3>
              {editingCouponId && (
                <button type="button" className="text-xs uppercase tracking-widest text-accent" onClick={resetCouponDraft}>
                  Cancel edit
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Code">
                <input className="input-field" value={couponDraft.code} onChange={(e) => setCouponDraft((c) => ({ ...c, code: e.target.value }))} />
              </Field>
              <Field label="Discount type">
                <select className="input-field" value={couponDraft.discountType} onChange={(e) => setCouponDraft((c) => ({ ...c, discountType: e.target.value }))}>
                  <option value="percentage">percentage</option>
                  <option value="fixed">fixed</option>
                </select>
              </Field>
              <Field label="Discount">
                <input type="number" className="input-field" value={couponDraft.discount} onChange={(e) => setCouponDraft((c) => ({ ...c, discount: e.target.value }))} />
              </Field>
              <Field label="Expiration">
                <input type="date" className="input-field" value={couponDraft.expiration} onChange={(e) => setCouponDraft((c) => ({ ...c, expiration: e.target.value }))} />
              </Field>
              <Field label="Usage limit">
                <input type="number" className="input-field" value={couponDraft.usageLimit} onChange={(e) => setCouponDraft((c) => ({ ...c, usageLimit: e.target.value }))} />
              </Field>
              <Field label="Min order amount">
                <input type="number" className="input-field" value={couponDraft.minOrderAmount} onChange={(e) => setCouponDraft((c) => ({ ...c, minOrderAmount: e.target.value }))} />
              </Field>
            </div>

            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={couponDraft.active} onChange={(e) => setCouponDraft((c) => ({ ...c, active: e.target.checked }))} />
              Active
            </label>

            <button type="submit" className="btn-primary" disabled={savingCoupon}>
              {savingCoupon ? t("common.loading") : editingCouponId ? t("common.save") : t("admin.coupons")}
            </button>
          </form>

          {coupons.length ? (
            <div className="space-y-3 max-h-[24rem] overflow-auto pr-1">
              {coupons.map((coupon) => (
                <div key={coupon._id} className="border border-gray-200 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{coupon.code}</p>
                    <p className="text-sm text-gray-500 capitalize">{coupon.discountType}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {coupon.active ? "Active" : "Inactive"} | Used {coupon.usedCount || 0}
                    </p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <p className="text-sm font-medium">
                      {coupon.discount}
                      {coupon.discountType === "percentage" ? "%" : " TND"}
                    </p>
                    <div className="flex gap-2">
                      <button type="button" className="btn-outline" onClick={() => startEditCoupon(coupon)}>
                        {t("common.edit")}
                      </button>
                      <button type="button" className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white" onClick={() => deleteCoupon(coupon._id)}>
                        {t("common.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No coupons found." />
          )}
        </Section>
      )}

      {activeTab === "brands" && (
        <Section id="brands" title={t("admin.brands")} meta={`${brands.length} brands`}>
          <form className="space-y-5 mb-6 border border-gray-200 p-4" onSubmit={saveBrand}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h3 className="font-heading uppercase tracking-widest text-sm">
                {editingBrandId ? t("common.edit") : t("admin.brands")}
              </h3>
              {editingBrandId && (
                <button type="button" className="text-xs uppercase tracking-widest text-accent" onClick={resetBrandDraft}>
                  Cancel edit
                </button>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <input className="input-field" value={brandDraft.name} onChange={(e) => setBrandDraft((c) => ({ ...c, name: e.target.value }))} />
              </Field>
              <Field label="Logo URL">
                <input className="input-field" value={brandDraft.logo} onChange={(e) => setBrandDraft((c) => ({ ...c, logo: e.target.value }))} />
              </Field>
            </div>

            <button type="submit" className="btn-primary" disabled={savingBrand}>
              {savingBrand ? t("common.loading") : editingBrandId ? t("common.save") : t("admin.brands")}
            </button>
          </form>

          {brands.length ? (
            <div className="space-y-3 max-h-[24rem] overflow-auto pr-1">
              {brands.map((brand) => (
                <div key={brand._id} className="border border-gray-200 p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{brand.name}</p>
                    <p className="text-sm text-gray-500">{brand.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn-outline" onClick={() => startEditBrand(brand)}>
                      {t("common.edit")}
                    </button>
                    <button type="button" className="btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white" onClick={() => deleteBrand(brand._id)}>
                      {t("common.delete")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No brands found." />
          )}
        </Section>
      )}
    </div>
  );
}
