export default function ProductDetails({ product }) {
  return (
    <section className="mt-16 space-y-12">


      {/* Reference */}
      <div>

        <h2 className="
          text-xl
          font-semibold
          uppercase
          tracking-widest
          mb-0
        ">
          Product Information
        </h2>


        <div className="space-y-3 text-sm">

          {product.referenceCode && (
            <p>
              <span className="font-medium">
                Model reference:
              </span>{" "}
              {product.referenceCode}
            </p>
          )}

        </div>

      </div>





      {/* Frame Information */}
      {product.frame && (

        <div>

          <h3 className="
            text-xs
            uppercase
            tracking-widest
            mb-5
          ">
            Frame Information
          </h3>


          <div className="grid grid-cols-2 gap-y-4 text-sm">


            <p>
              Frame shape
            </p>

            <p className="text-gray-500">
              {product.frame.shape}
            </p>



            <p>
              Frame color
            </p>

            <p className="text-gray-500">
              {product.frame.color}
            </p>




            <p>
              Frame material
            </p>

            <p className="text-gray-500">
              {product.frame.material}
            </p>




            <p>
              Finish
            </p>

            <p className="text-gray-500">
              {product.frame.finish}
            </p>




            <p>
              Temple color
            </p>

            <p className="text-gray-500">
              {product.frame.templeColor}
            </p>


          </div>

        </div>

      )}






      {/* Lens Information */}
      {product.lens && (

        <div>


          <h3 className="
            text-xs
            uppercase
            tracking-widest
            mb-5
          ">
            Lens Information
          </h3>



          <div className="grid grid-cols-2 gap-y-4 text-sm">


            <p>
              Lens color
            </p>

            <p className="text-gray-500">
              {product.lens.color}
            </p>



            <p>
              Treatment
            </p>

            <p className="text-gray-500">
              {product.lens.treatment}
            </p>



            <p>
              Category
            </p>

            <p className="text-gray-500">
              {product.lens.category}
            </p>




            <p>
              Light transmission
            </p>

            <p className="text-gray-500">
              {product.lens.transmission}
            </p>


          </div>


        </div>

      )}







      {/* Dimensions */}
      {product.dimensions && (

        <div>

          <h3 className="
            text-xs
            uppercase
            tracking-widest
            mb-5
          ">
            Product Dimensions
          </h3>



          <div className="grid grid-cols-2 gap-y-4 text-sm">


            <p>
              Size
            </p>

            <p className="text-gray-500">
              {product.dimensions.size}
            </p>




            <p>
              Bridge
            </p>

            <p className="text-gray-500">
              {product.dimensions.bridge} mm
            </p>




            <p>
              Lens height
            </p>

            <p className="text-gray-500">
              {product.dimensions.lensHeight} mm
            </p>




            <p>
              Temple length
            </p>

            <p className="text-gray-500">
              {product.dimensions.templeLength} mm
            </p>


          </div>


        </div>

      )}








      {/* Description */}
      <div>

        <h3 className="
          text-xs
          uppercase
          tracking-widest
          mb-5
        ">
          Description
        </h3>


        <p className="
          text-gray-600
          leading-relaxed
          max-w-3xl
        ">
          {product.description}
        </p>


      </div>






      {/* Size Guide */}
      <div
        className="
          border-t
          pt-8
        "
      >

        <h3 className="
          text-xs
          uppercase
          tracking-widest
          mb-4
        ">
          Size Guide
        </h3>


        <p className="text-sm text-gray-500">
          Standard fit
        </p>


      </div>



    </section>
  );
}