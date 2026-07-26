function LowStockProducts({ products = [] }) {



  const lowStock = products
    .filter((product) => {

      const stock =
        product.stock
        ??
        product.quantity
        ??
        0;


      return stock <= 5;

    })
    .slice(0, 5);





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

            Low Stock

          </h2>


          <p

            className="
              text-sm
              text-gray-400
              mt-1
            "

          >

            Products requiring attention

          </p>


        </div>



        <span

          className="
            px-3
            py-1
            rounded-full
            bg-red-100
            text-red-600
            text-xs
            uppercase
            tracking-wide
          "

        >

          Alert

        </span>


      </div>







      {
        lowStock.length === 0 ? (


          <div

            className="
              py-12
              text-center
              text-gray-400
            "

          >

            Inventory is healthy

          </div>


        ) : (


          <div

            className="
              space-y-4
            "

          >


            {
              lowStock.map((product)=>(


                <div

                  key={product._id}

                  className="
                    flex
                    justify-between
                    items-center
                    p-4
                    rounded-xl
                    bg-gray-50
                  "

                >



                  <div>


                    <h3

                      className="
                        font-medium
                        text-gray-900
                      "

                    >

                      {
                        product.name
                      }


                    </h3>


                    <p

                      className="
                        text-sm
                        text-gray-500
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

                    <p

                      className="
                        text-red-600
                        font-semibold
                      "

                    >

                      {
                        product.stock
                        ??
                        product.quantity
                        ??
                        0
                      }

                    </p>


                    <span

                      className="
                        text-xs
                        text-gray-400
                      "

                    >

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