import { Heart, ShoppingBag } from "lucide-react";

export default function ProductPurchase({
  product,
  onAddToCart,
  onWishlist,
  inWishlist,
}) {
  return (
    <div className="border-t pt-8 space-y-4">

      {/* Stock */}
      <div>
        {product.stock > 0 ? (
          <p className="text-green-700 text-sm">
            In stock · {product.stock} available
          </p>
        ) : (
          <p className="text-red-600 text-sm">
            Out of stock
          </p>
        )}
      </div>

      {/* Add to cart */}
      <button
        onClick={onAddToCart}
        disabled={product.stock <= 0}
        className="
          w-full
          h-14
          bg-black
          text-white
          uppercase
          tracking-widest
          flex
          items-center
          justify-center
          gap-3
          hover:bg-neutral-800
          transition
          disabled:opacity-50
        "
      >
        <ShoppingBag size={18} />

        Add to Cart
      </button>

      {/* Wishlist */}
      {onWishlist && (
        <button
          onClick={onWishlist}
          className="
            w-full
            h-14
            border
            flex
            items-center
            justify-center
            gap-3
            uppercase
            tracking-widest
            hover:bg-gray-100
            transition
          "
        >
          <Heart
            size={18}
            fill={inWishlist ? "currentColor" : "none"}
          />

          {inWishlist
            ? "Saved"
            : "Add to Wishlist"}
        </button>
      )}
    </div>
  );
}