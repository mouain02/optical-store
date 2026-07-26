import { formatPrice } from "../../../utils/helpers";



function RecentOrders({ orders = [] }) {



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

            Recent Orders

          </h2>


          <p

            className="
              text-sm
              text-gray-400
              mt-1
            "

          >

            Latest customer purchases

          </p>


        </div>



        <span

          className="
            text-sm
            text-gray-500
          "

        >

          {orders.length} orders

        </span>


      </div>






      {
        orders.length === 0 ? (


          <div

            className="
              py-12
              text-center
              text-gray-400
            "

          >

            No orders available

          </div>


        ) : (


          <div

            className="
              overflow-x-auto
            "

          >


            <table

              className="
                w-full
                text-left
              "

            >


              <thead>


                <tr

                  className="
                    border-b
                    text-xs
                    uppercase
                    tracking-widest
                    text-gray-400
                  "

                >

                  <th className="pb-4">
                    Order
                  </th>


                  <th className="pb-4">
                    Customer
                  </th>


                  <th className="pb-4">
                    Status
                  </th>


                  <th className="pb-4">
                    Total
                  </th>


                </tr>


              </thead>





              <tbody>


                {
                  orders.map((order)=>(


                    <tr

                      key={order._id}

                      className="
                        border-b
                        last:border-none
                        hover:bg-gray-50
                        transition
                      "

                    >


                      <td

                        className="
                          py-4
                          font-medium
                        "

                      >

                        #{order._id?.slice(-6)}

                      </td>




                      <td

                        className="
                          py-4
                          text-gray-600
                        "

                      >

                        {
                          order.user?.name
                          ||
                          order.customerName
                          ||
                          "Guest"
                        }


                      </td>




                      <td

                        className="
                          py-4
                        "

                      >

                        <span

                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            uppercase
                            tracking-wide
                            ${
                              order.status === "delivered"

                              ? 
                              "bg-green-100 text-green-700"

                              :

                              "bg-gray-100 text-gray-700"
                            }
                          `}

                        >

                          {order.status || "pending"}

                        </span>


                      </td>





                      <td

                        className="
                          py-4
                          font-semibold
                        "

                      >

                        {
                          formatPrice(
                            order.totalPrice
                            ||
                            order.total
                            ||
                            0
                          )
                        }


                      </td>



                    </tr>


                  ))

                }



              </tbody>


            </table>


          </div>


        )
      }



    </div>

  );

}



export default RecentOrders;