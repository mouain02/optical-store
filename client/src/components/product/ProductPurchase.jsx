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
        space-y-3
      "
    >


      {/* Add to cart */}

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

        {
          product.stock > 0
            ? t("product.addToCart")
            : "Out of stock"
        }


      </button>





      {/* Wishlist */}

      {
        onWishlist && (

          <button

            type="button"

            onClick={onWishlist}

            className="
              w-full
              border
              border-black
              py-4
              text-sm
              uppercase
              tracking-widest
              hover:bg-black
              hover:text-white
              transition
            "

          >

            {
              inWishlist
                ? "Remove from wishlist"
                : "Add to wishlist"
            }


          </button>

        )
      }



    </div>

  );

}