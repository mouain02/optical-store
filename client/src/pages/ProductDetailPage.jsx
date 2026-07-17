import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { productService, wishlistService, prescriptionService } from "../services";
import { addToCart } from "../redux/slices/cartSlice";
import { getImageUrl, getEffectivePrice, formatPrice } from "../utils/helpers";
import LensCustomizer from "../components/product/LensCustomizer";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";
import TryOnModal from "../components/TryOn/TryOnModal";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [lensOptions, setLensOptions] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRx, setSelectedRx] = useState("");
  const [inWishlist, setInWishlist] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);

  useEffect(() => {
    productService
      .getBySlug(slug)
      .then((d) => {
        setData(d);
        setColor(d.product.colors?.[0] || "");
        setSize(d.product.sizes?.[0] || "");
        if (d.product.supportsLensCustomization) {
          setLensOptions({ type: "single", treatments: [] });
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (user) {
      prescriptionService.getAll().then(setPrescriptions).catch(() => { });
      wishlistService
        .getAll()
        .then((list) => {
          setInWishlist(list.some((p) => p._id === data?.product?._id));
        })
        .catch(() => { });
    }
  }, [user, data?.product?._id]);

  if (loading) return <Loader />;
  if (!data) return <EmptyState message={t("common.error")} />;

  const { product, reviews, related } = data;
  const framePrice = getEffectivePrice(product);
  const images = product.images?.length ? product.images : [{ path: "", alt: product.name }];

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity: 1,
        variant: { color, size },
        lensOptions: product.supportsLensCustomization ? lensOptions : null,
        prescription: selectedRx || null,
      })
    );
  };

  const toggleWishlist = async () => {
    if (!user) return;
    if (inWishlist) {
      await wishlistService.remove(product._id);
      setInWishlist(false);
    } else {
      await wishlistService.add(product._id);
      setInWishlist(true);
    }
  };

  return (
    <div className="section-padding py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
            <img
              src={getImageUrl(images[selectedImage]?.path)}
              alt={images[selectedImage]?.alt || product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80";
              }}
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img._id || i}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 overflow-hidden border-2 ${selectedImage === i ? "border-accent" : "border-transparent"
                    }`}
                >
                  <img src={getImageUrl(img.path)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
            {product.brand?.name}
          </p>
          <h1 className="font-heading text-4xl uppercase tracking-widest mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xl font-medium">{formatPrice(framePrice)}</span>
            {product.discountPrice > 0 && (
              <span className="text-gray-400 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>

          <p className={`text-sm mb-6 ${product.stock > 0 ? "text-green-700" : "text-red-600"}`}>
            {product.stock > 0 ? t("product.inStock") : t("product.outOfStock")}
          </p>

          {product.colors?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs uppercase tracking-widest mb-2">{t("product.selectColor")}</p>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`px-4 py-2 text-sm border capitalize ${color === c ? "border-primary bg-primary text-white" : "border-gray-200"
                      }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest mb-2">{t("product.selectSize")}</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-sm border capitalize ${size === s ? "border-primary bg-primary text-white" : "border-gray-200"
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.supportsLensCustomization && lensOptions && (
            <div className="mb-6">
              <LensCustomizer
                framePrice={framePrice}
                lensOptions={lensOptions}
                onChange={setLensOptions}
              />
            </div>
          )}

          {(product.requiresPrescription || product.category === "prescription") &&
            user &&
            prescriptions.length > 0 && (
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest mb-2">{t("prescription.select")}</p>
                <select
                  value={selectedRx}
                  onChange={(e) => setSelectedRx(e.target.value)}
                  className="input-field"
                >
                  <option value="">—</option>
                  {prescriptions.map((rx) => (
                    <option key={rx._id} value={rx._id}>
                      {rx.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

          <div className="flex gap-4">
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {t("product.addToCart")}
            </button>

            {user && (
              <button
                type="button"
                className="btn-outline"
                onClick={toggleWishlist}
              >
                {inWishlist
                  ? t("product.removeFromWishlist")
                  : t("product.addToWishlist")}
              </button>
            )}

            <button
              type="button"
              className="btn-outline"
              onClick={() => setShowTryOn(true)}
            >
              {t("product.tryOn")}
            </button>
          </div>
        </div>
      </div>

      {reviews?.length > 0 && (
        <section className="mt-20">
          <h2 className="font-heading text-3xl uppercase tracking-widest mb-8">
            {t("product.reviews")}
          </h2>
          <div className="space-y-6">
            {reviews.map((r) => (
              <div key={r._id} className="border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-sm">{r.user?.name}</span>
                  <span className="text-accent text-sm">{"★".repeat(r.rating)}</span>
                </div>
                <p className="text-sm text-gray-600">{r.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related?.length > 0 && (
        <section className="mt-20">
          <h2 className="font-heading text-3xl uppercase tracking-widest mb-8">
            {t("product.related")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      <TryOnModal

        isOpen={showTryOn}

        onClose={() => setShowTryOn(false)}

        product={product}

      />
    </div>
  );
}

function EmptyState({ message }) {
  return <div className="text-center py-16 text-gray-500">{message}</div>;
}