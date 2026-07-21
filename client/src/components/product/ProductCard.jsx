import { Link } from "react-router-dom";
import { getImageUrl, getEffectivePrice, formatPrice } from "../../utils/helpers";

export default function ProductCard({ product }) {
  const price = getEffectivePrice(product);
  const image = getImageUrl(product.images?.[0]?.path);

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block focus:outline-none focus:ring-2 focus:ring-accent"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img
          src={image}
          alt={product.images?.[0]?.alt || product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-120 group-hover:scale-[1.03]"
          onError={(e) => { e.target.src = "/placeholder-product.svg"; }}
        />
      </div>
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
        {product.brand?.name}
      </p>
      <h3 className="font-body text-sm font-medium mb-2">{product.name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{formatPrice(price)}</span>
        {product.discountPrice > 0 && (
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(product.price)}
          </span>
        )}
      </div>
    </Link>
  );
}
