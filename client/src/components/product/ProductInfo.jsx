import { formatPrice } from "../../utils/helpers";


export default function ProductInfo({
  product,
  price,
  onTryOn,
}) {

  return (
    <div className="space-y-8">


      {/* Brand */}
      <p className="
        text-xs
        uppercase
        tracking-[0.3em]
        text-gray-500
      ">
        {product.brand?.name}
      </p>



      {/* Product name */}
      <div>

        <h1 className="
          text-3xl
          font-semibold
          uppercase
          tracking-widest
        ">
          {product.name}
        </h1>


        <p className="
          mt-4
          text-xl
        ">
          {formatPrice(price)}
        </p>

      </div>




      {/* Colors */}
      {product.colors?.length > 0 && (

        <div>

          <h3 className="
            text-xs
            uppercase
            tracking-widest
            mb-3
          ">
            Colors
          </h3>


          <div className="space-y-2">

            {product.colors.map((color)=>(
              <div
                key={color}
                className="
                  border
                  p-3
                  text-sm
                "
              >
                {color}
              </div>
            ))}

          </div>


        </div>

      )}






      {/* Frame information */}
      {product.frame && (

        <div className="
          border-t
          pt-6
          space-y-3
        ">


          <h3 className="
            text-xs
            uppercase
            tracking-widest
          ">
            Frame
          </h3>


          <p className="text-sm">
            {product.frame.finish}
            {" "}
            {product.frame.color}
          </p>


          <p className="text-sm text-gray-500">
            {product.frame.material}
          </p>


        </div>

      )}







      {/* Lens information */}
      {product.lens && (

        <div className="
          border-t
          pt-6
          space-y-3
        ">


          <h3 className="
            text-xs
            uppercase
            tracking-widest
          ">
            Lens
          </h3>


          <p className="text-sm">
            {product.lens.color}
          </p>


          <p className="text-sm text-gray-500">
            {product.lens.treatment}
          </p>


          {product.lens.polarized && (

            <span className="
              inline-block
              border
              px-3
              py-1
              text-xs
            ">
              Polarized
            </span>

          )}


        </div>

      )}






      {/* Geofit */}
      <div className="
        border-t
        pt-6
      ">

        <h3 className="
          text-xs
          uppercase
          tracking-widest
          mb-3
        ">
          Geofit
        </h3>


        <p className="text-sm">
          High bridge fit
        </p>


      </div>






      {/* Try on */}
      {product.tryOn?.enabled && (

        <button
          onClick={onTryOn}
          className="
            w-full
            border
            py-4
            text-sm
            uppercase
            tracking-widest
          "
        >
          Try on glasses
        </button>

      )}







      {/* Lens customization */}
      {product.supportsLensCustomization && (

        <button
          className="
            w-full
            border
            py-4
            text-sm
            uppercase
            tracking-widest
          "
        >
          Personalize
        </button>

      )}






      {/* Payment */}
      <div className="
        border-t
        pt-6
        text-sm
        text-gray-500
        space-y-2
      ">

        <p>
          Pay later with:
        </p>

        <p>
          Paypal · Klarna
        </p>


        <p>
          Estimated delivery:
          {" "}
          13-08-2026
        </p>


      </div>



    </div>
  );
}