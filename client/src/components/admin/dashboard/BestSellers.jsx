import {
  Trophy,
  TrendingUp,
} from "lucide-react";

import { formatPrice } from "../../../utils/helpers";



function BestSellers({
  products = [],
}) {


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
            Best Sellers
          </h2>


          <p
            className="
              text-sm
              text-gray-400
              mt-1
            "
          >
            Top performing products
          </p>


        </div>



        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-[#C4A574]/10
            text-[#C4A574]
            flex
            items-center
            justify-center
          "
        >

          <Trophy size={22}/>

        </div>


      </div>






      {
        products.length === 0 ? (

          <div
            className="
              py-10
              text-center
              text-gray-400
            "
          >

            No sales data available

          </div>


        ) : (


          <div
            className="
              space-y-4
            "
          >


            {
              products.map((product,index)=>(


                <div

                  key={
                    product._id ||
                    index
                  }

                  className="
                    flex
                    items-center
                    justify-between
                    p-4
                    rounded-xl
                    bg-gray-50
                    hover:bg-gray-100
                    transition
                  "

                >



                  {/* LEFT */}

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >


                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                        text-sm
                        font-semibold
                      "
                    >

                      {index + 1}

                    </div>




                    <div>

                      <h3
                        className="
                          font-medium
                          text-gray-900
                        "
                      >

                        {product.name}

                      </h3>



                      <div
                        className="
                          flex
                          items-center
                          gap-2
                          text-xs
                          text-gray-400
                          mt-1
                        "
                      >

                        <TrendingUp size={13}/>


                        {product.sold || 0}
                        {" "}
                        sold


                      </div>


                    </div>


                  </div>





                  {/* RIGHT */}

                  <div
                    className="
                      text-right
                    "
                  >

                    <p
                      className="
                        font-semibold
                        text-gray-900
                      "
                    >

                      {
                        formatPrice(
                          product.revenue || 0
                        )
                      }

                    </p>


                    <p
                      className="
                        text-xs
                        text-gray-400
                      "
                    >

                      revenue

                    </p>


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


export default BestSellers;