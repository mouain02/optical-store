import { formatPrice } from "../../utils/helpers";

export default function ProductInfo({
  product,
  price,
  onTryOn,
}) {
  return (
    <div className="space-y-8">

      {/* Brand */}
      <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
        {product.brand?.name}
      </p>

      {/* Name */}
      <h1 className="text-4xl font-semibold uppercase tracking-wider">
        {product.name}
      </h1>

      {/* Price */}
      <div>
        <p className="text-3xl font-medium">
          {formatPrice(price)}
        </p>

        {product.discountPrice > 0 && (
          <p className="line-through text-gray-400 mt-2">
            {formatPrice(product.price)}
          </p>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3 border-b pb-8">
        <span className="text-lg">
          ★★★★★
        </span>

        <span className="text-sm text-gray-500">
          ({product.ratings?.count || 0})
        </span>
      </div>

      {/* Colors */}
      {product.colors?.length > 0 && (
        <div className="border-b pb-8">

          <h3 className="uppercase tracking-widest text-xs mb-5">
            Colors
          </h3>

          <div className="flex flex-wrap gap-3">

            {product.colors.map((color) => (
              <button
                key={color}
                className="
                  px-4
                  py-2
                  border
                  hover:border-black
                  transition
                  text-sm
                "
              >
                {color}
              </button>
            ))}

          </div>

        </div>
      )}

      {/* Frame */}
      {product.frame && (
        <div className="border-b pb-8 space-y-3">

          <h3 className="uppercase tracking-widest text-xs">
            Frame
          </h3>

          <p>{product.frame.finish}</p>

          <p>{product.frame.color}</p>

          <p className="text-gray-500">
            {product.frame.material}
          </p>

        </div>
      )}

      {/* Reference */}
      {product.referenceCode && (
        <div className="border-b pb-8">

          <h3 className="uppercase tracking-widest text-xs mb-3">
            Reference
          </h3>

          <p className="text-sm">
            {product.referenceCode}
          </p>

        </div>
      )}

      {/* Lens */}
      {product.lens && (
        <div className="border-b pb-8 space-y-3">

          <h3 className="uppercase tracking-widest text-xs">
            Lens
          </h3>

          <p>{product.lens.color}</p>

          <p className="text-gray-500">
            {product.lens.treatment}
          </p>

          {product.lens.polarized && (
            <span className="inline-flex border px-3 py-1 text-xs">
              Polarized
            </span>
          )}

        </div>
      )}

      {/* Dimensions */}
      {product.dimensions && (
        <div className="border-b pb-8 space-y-2">

          <h3 className="uppercase tracking-widest text-xs">
            Dimensions
          </h3>

          <p>Lens width: {product.dimensions.size}</p>

          <p>Bridge: {product.dimensions.bridge}</p>

          <p>Temple: {product.dimensions.templeLength}</p>

        </div>
      )}

      {/* Try On */}
      {onTryOn && (
        <button
          onClick={onTryOn}
          className="
            w-full
            border
            py-4
            uppercase
            tracking-widest
            hover:bg-black
            hover:text-white
            transition
          "
        >
          Try On
        </button>
      )}

      {/* Personalize */}
      {product.supportsLensCustomization && (
        <button
          className="
            w-full
            border
            py-4
            uppercase
            tracking-widest
            hover:bg-black
            hover:text-white
            transition
          "
        >
          Personalize Lenses
        </button>
      )}

      {/* Services */}
      <div className="border-t pt-8 space-y-6 text-sm">

        <div>
          <strong>Pay later</strong>
          <p className="text-gray-500">
            PayPal • Klarna
          </p>
        </div>

        <div>
          <strong>Estimated delivery</strong>
          <p className="text-gray-500">
            13-08-2026
          </p>
        </div>

        <div>
          <strong>Free returns</strong>
          <p className="text-gray-500">
            Return by mail
          </p>
        </div>

        <div>
          <strong>Perfect fit</strong>
          <p className="text-gray-500">
            Free adjustments in store
          </p>
        </div>

      </div>

    </div>
  );
}