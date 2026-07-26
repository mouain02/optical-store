import { formatPrice } from "../../../utils/helpers";



function BestSellers({ products = [] }) {



  return (

    <div

      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        p-6
        shadow-sm
      "

    >



      <div

        className="
          flex
          justify-between
          items-center
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


        <span

          className="
            text-sm
            text-gray-500
          "

        >

          Top 5

        </span>


      </div>






      {
        products.length === 0 ? (


          <div

            className="
              py-12
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
              products.map((product, index)=>(


                <div

                  key={
                    product._id
                    ||
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

                        {
                          product.name
                          ||
                          "Unnamed product"
                        }


                      </h3>



                      <p

                        className="
                          text-sm
                          text-gray-500
                        "

                      >

                        {
                          product.sold
                          ||
                          0
                        }
                        {" "}
                        sold


                      </p>


                    </div>



                  </div>






                  <div

                    className="
                      text-right
                    "

                  >


                    <p

                      className="
                        font-semibold
                      "

                    >

                      {
                        formatPrice(
                          product.revenue
                          ||
                          0
                        )
                      }


                    </p>


                    <p

                      className="
                        text-xs
                        text-gray-400
                      "

                    >

                      Revenue

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