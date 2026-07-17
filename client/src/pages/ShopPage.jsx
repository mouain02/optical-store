import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { productService, brandService } from "../services";
import ProductCard from "../components/product/ProductCard";
import Loader from "../components/common/Loader";
import EmptyState from "../components/common/EmptyState";

export default function ShopPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const params = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    brandService.getAll().then(setBrands).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    productService
      .getAll(params)
      .then((data) => {
        setProducts(data.products);
        setTotal(data.total);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };

  const categories = ["prescription", "sunglasses", "contact-lenses", "blue-light", "kids", "accessories"];

  return (
    <div className="section-padding py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-4xl uppercase tracking-widest">{t("shop.title")}</h1>
        <p className="text-sm text-gray-500">{t("shop.results", { count: total })}</p>
      </div>

      <div className="flex gap-8">
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block w-full lg:w-56 shrink-0 space-y-6`}>
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-3 font-medium">{t("filters.category")}</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateFilter("category", params.category === cat ? "" : cat)}
                  className={`block text-sm w-full text-left ${params.category === cat ? "text-accent font-medium" : "text-gray-600 hover:text-primary"}`}
                >
                  {t(`categories.${cat}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest mb-3 font-medium">{t("filters.brand")}</h3>
            <div className="space-y-2">
              {brands.map((b) => (
                <button
                  key={b._id}
                  type="button"
                  onClick={() => updateFilter("brand", params.brand === b._id ? "" : b._id)}
                  className={`block text-sm w-full text-left ${params.brand === b._id ? "text-accent font-medium" : "text-gray-600 hover:text-primary"}`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest mb-3 font-medium">{t("filters.gender")}</h3>
            {["men", "women", "kids", "unisex"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => updateFilter("gender", params.gender === g ? "" : g)}
                className={`block text-sm capitalize mb-1 ${params.gender === g ? "text-accent font-medium" : "text-gray-600"}`}
              >
                {g}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={params.inStock === "true"}
              onChange={(e) => updateFilter("inStock", e.target.checked ? "true" : "")}
            />
            {t("filters.inStock")}
          </label>

          <button type="button" onClick={() => setSearchParams({})} className="text-xs uppercase tracking-widest text-accent">
            {t("shop.clearFilters")}
          </button>
        </aside>

        <div className="flex-1">
          <div className="flex justify-between mb-6">
            <button type="button" className="lg:hidden text-sm uppercase tracking-widest" onClick={() => setFiltersOpen(!filtersOpen)}>
              {t("shop.filters")}
            </button>
            <select
              value={params.sort || "newest"}
              onChange={(e) => updateFilter("sort", e.target.value)}
              className="text-sm border border-gray-200 px-3 py-2 focus:outline-none"
              aria-label={t("shop.sortBy")}
            >
              <option value="newest">{t("sort.newest")}</option>
              <option value="price_asc">{t("sort.priceAsc")}</option>
              <option value="price_desc">{t("sort.priceDesc")}</option>
              <option value="rating">{t("sort.rating")}</option>
            </select>
          </div>

          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
