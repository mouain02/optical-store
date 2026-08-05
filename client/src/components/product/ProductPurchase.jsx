import { useTranslation } from "react-i18next";


export default function ProductPurchase({
  product,
  onAddToCart,
  onWishlist,
  inWishlist,
}) {

  const { t } = useTranslation();


  return (
    <div
      className="
        sticky
        bottom-6
        space-y-3
      "
    >


      <button
        type="button"
        onClick={onAddToCart}
        disabled={product.stock <= 0}
        className="
          w-full
          bg-black
          text-white
          py-5
          text-sm
          uppercase
          tracking-widest
          hover:bg-gray-800
          transition
          disabled:opacity-50
        "
      >

        {product.stock > 0
          ? t("product.addToCart")
          : "Out of stock"}

      </button>



      {onWishlist && (

        <button
          type="button"
          onClick={onWishlist}
          className="
            w-full
            border
            py-4
            text-sm
            uppercase
            tracking-widest
          "
        >

          {inWishlist
            ? "Remove from wishlist"
            : "Add to wishlist"}

        </button>

      )}


    </div>
  );
}