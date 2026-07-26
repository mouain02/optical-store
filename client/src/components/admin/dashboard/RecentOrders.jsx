import { formatPrice } from "../../../utils/helpers";


function StatusBadge({
  status,
}) {


  const styles = {

    pending:
      "bg-yellow-100 text-yellow-700",

    processing:
      "bg-blue-100 text-blue-700",

    shipped:
      "bg-purple-100 text-purple-700",

    delivered:
      "bg-green-100 text-green-700",

    cancelled:
      "bg-red-100 text-red-700",

  };


  return (

    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        capitalize
        ${
          styles[status?.toLowerCase()]
          ||
          "bg-gray-100 text-gray-600"
        }
      `}
    >

      {status || "unknown"}

    </span>

  );

}





function RecentOrders({
  orders = [],
}) {


  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        overflow-hidden
      "
    >


      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between
          p-6
          border-b
          border-gray-100
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


        <button
          className="
            text-sm
            text-[#C4A574]
            font-medium
            hover:underline
          "
        >
          View all
        </button>


      </div>





      {/* TABLE */}

      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
            text-sm
          "
        >


          <thead>

            <tr
              className="
                text-left
                text-gray-400
                uppercase
                text-xs
                tracking-wider
                border-b
              "
            >

              <th className="px-6 py-4">
                Order
              </th>


              <th className="px-6 py-4">
                Customer
              </th>


              <th className="px-6 py-4">
                Items
              </th>


              <th className="px-6 py-4">
                Amount
              </th>


              <th className="px-6 py-4">
                Status
              </th>


              <th className="px-6 py-4">
                Date
              </th>


            </tr>

          </thead>





          <tbody>


            {
              orders.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-10
                      text-gray-400
                    "
                  >

                    No orders found

                  </td>

                </tr>


              ) : (


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
                        px-6
                        py-5
                        font-medium
                      "
                    >

                      #
                      {order._id?.slice(-6)}

                    </td>





                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      <div>

                        <p
                          className="
                            font-medium
                            text-gray-900
                          "
                        >

                          {
                            order.user?.name
                            ||
                            "Guest"
                          }

                        </p>


                        <p
                          className="
                            text-xs
                            text-gray-400
                          "
                        >

                          {
                            order.user?.email
                            ||
                            ""
                          }

                        </p>

                      </div>

                    </td>





                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      {
                        order.items?.length
                        ||
                        0
                      }

                      {" "}
                      items

                    </td>





                    <td
                      className="
                        px-6
                        py-5
                        font-medium
                      "
                    >

                      {
                        formatPrice(
                          order.totalPrice || 0
                        )
                      }

                    </td>





                    <td
                      className="
                        px-6
                        py-5
                      "
                    >

                      <StatusBadge
                        status={order.status}
                      />

                    </td>





                    <td
                      className="
                        px-6
                        py-5
                        text-gray-500
                      "
                    >

                      {
                        new Date(
                          order.createdAt
                        ).toLocaleDateString(
                          "fr-FR"
                        )
                      }

                    </td>



                  </tr>


                ))


              )
            }


          </tbody>


        </table>


      </div>


    </div>

  );

}


export default RecentOrders;