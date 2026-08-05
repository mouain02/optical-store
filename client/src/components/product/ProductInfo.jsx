import { formatPrice } from "../../utils/helpers";


export default function ProductInfo({
  product,
  price,
  onTryOn,
}) {


  return (

    <div
      className="
        space-y-8
      "
    >



      {/* Brand */}

      {
        product.brand?.name && (

          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-gray-500
            "
          >

            {product.brand.name}

          </p>

        )
      }






      {/* Product name + price */}

      <div>


        <h1
          className="
            text-3xl
            font-semibold
            uppercase
            tracking-widest
          "
        >

          {product.name}

        </h1>



        <p
          className="
            mt-4
            text-xl
            font-medium
          "
        >

          {formatPrice(price)}

        </p>


      </div>









      {/* Reference code */}

      {
        product.referenceCode && (

          <div
            className="
              border-t
              pt-6
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-widest
                text-gray-500
                mb-2
              "
            >

              Model reference

            </p>


            <p
              className="
                text-sm
              "
            >

              {product.referenceCode}

            </p>


          </div>

        )
      }









      {/* Colors */}

      {
        product.colors?.length > 0 && (

          <div>

            <h3
              className="
                text-xs
                uppercase
                tracking-widest
                mb-3
              "
            >

              Colors

            </h3>



            <div
              className="
                space-y-2
              "
            >

              {
                product.colors.map((color)=>(

                  <div

                    key={color}

                    className="
                      border
                      px-4
                      py-3
                      text-sm
                    "

                  >

                    {color}

                  </div>

                ))
              }


            </div>


          </div>

        )
      }









      {/* Frame information */}

      {
        product.frame && (

          <div
            className="
              border-t
              pt-6
              space-y-3
            "
          >


            <h3
              className="
                text-xs
                uppercase
                tracking-widest
              "
            >

              Frame

            </h3>



            {
              product.frame.finish && (

                <p className="text-sm">

                  {product.frame.finish}

                  {" "}

                  {product.frame.color}

                </p>

              )
            }



            {
              product.frame.material && (

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  {product.frame.material}

                </p>

              )
            }



          </div>

        )
      }









      {/* Lens information */}

      {
        product.lens && (

          <div
            className="
              border-t
              pt-6
              space-y-3
            "
          >


            <h3
              className="
                text-xs
                uppercase
                tracking-widest
              "
            >

              Lens

            </h3>




            {
              product.lens.color && (

                <p className="text-sm">

                  {product.lens.color}

                </p>

              )
            }





            {
              product.lens.treatment && (

                <p
                  className="
                    text-sm
                    text-gray-500
                  "
                >

                  {product.lens.treatment}

                </p>

              )
            }





            {
              product.lens.polarized && (

                <span
                  className="
                    inline-block
                    border
                    px-3
                    py-1
                    text-xs
                  "
                >

                  Polarized

                </span>

              )
            }


          </div>

        )
      }









      {/* Dimensions */}

      {
        product.dimensions && (

          <div
            className="
              border-t
              pt-6
              space-y-2
            "
          >

            <h3
              className="
                text-xs
                uppercase
                tracking-widest
              "
            >

              Dimensions

            </h3>



            {
              Object.entries(product.dimensions)
              .filter(([_,value])=>value)
              .map(([key,value])=>(

                <p
                  key={key}
                  className="text-sm"
                >

                  {key}: {value}

                </p>


              ))
            }


          </div>

        )
      }









      {/* Geofit */}

      <div
        className="
          border-t
          pt-6
        "
      >

        <h3
          className="
            text-xs
            uppercase
            tracking-widest
            mb-3
          "
        >

          Geofit

        </h3>


        <p className="text-sm">

          High bridge fit

        </p>


      </div>









      {/* Try on button */}

      {
        onTryOn && (

          <button

            type="button"

            onClick={onTryOn}

            className="
              w-full
              border
              py-4
              text-sm
              uppercase
              tracking-widest
              hover:bg-black
              hover:text-white
              transition
            "

          >

            Try on glasses

          </button>

        )
      }









      {/* Payment information */}

      <div
        className="
          border-t
          pt-6
          text-sm
          text-gray-500
          space-y-2
        "
      >

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