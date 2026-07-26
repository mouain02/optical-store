import {
  AlertTriangle,
  Package,
} from "lucide-react";



function LowStockProducts({
  products = [],
}) {


  const lowStock = products.filter(
    (product) =>
      (product.stock ?? 0) <= 5
  );



  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        p-6
      "
    >


      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          mb-6
        "
      >


        <div>

          <h2
            className="
              text-xl
              font-semibold
              text-gray-900
            "
          >
            Low Stock
          </h2>


          <p
            className="
              text-sm
              text-gray-400
              mt-1
            "
          >
            Products needing attention
          </p>


        </div>



        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-red-50
            text-red-500
            flex
            items-center
            justify-center
          "
        >

          <AlertTriangle size={22}/>

        </div>


      </div>





      {
        lowStock.length === 0 ? (


          <div
            className="
              py-10
              flex
              flex-col
              items-center
              justify-center
              text-gray-400
              gap-3
            "
          >

            <Package size={35}/>


            <p>
              Stock levels are healthy
            </p>


          </div>


        ) : (


          <div
            className="
              space-y-3
            "
          >


            {
              lowStock
              .slice(0,5)
              .map((product)=>(


                <div

                  key={product._id}

                  className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    bg-red-50/50
                    border
                    border-red-100
                  "

                >



                  <div>


                    <h3
                      className="
                        font-medium
                        text-gray-900
                      "
                    >

                      {product.name}

                    </h3>



                    <p
                      className="
                        text-xs
                        text-gray-400
                        mt-1
                      "
                    >

                      {
                        product.brand?.name
                        ||
                        product.brand
                        ||
                        "No brand"
                      }

                    </p>


                  </div>





                  <div
                    className="
                      text-right
                    "
                  >

                    <span
                      className="
                        inline-flex
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-medium
                        bg-red-100
                        text-red-600
                      "
                    >

                      {product.stock ?? 0}
                      {" "}
                      left

                    </span>


                  </div>



                </div>


              ))
            }


          </div>


        )
      }



    </div>

  );

}


export default LowStockProducts;