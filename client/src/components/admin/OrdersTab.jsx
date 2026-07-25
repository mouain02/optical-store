import { formatPrice } from "../../../utils/helpers";
import Section from "../../../components/admin/Section";


function OrdersTab({
  orders,
}) {

  return (
    <div className="admin-tab">


      <Section
        title={`Orders (${orders.length})`}
      >

        {orders.length === 0 ? (

          <p>
            No orders found
          </p>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>

                <tr>

                  <th>
                    Order ID
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Total
                  </th>

                  <th>
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order._id}
                  >

                    <td>
                      #{order._id?.slice(-6)}
                    </td>


                    <td>

                      {order.user?.name ||
                        order.customerName ||
                        order.shippingAddress?.name ||
                        "Guest"}

                    </td>


                    <td>

                      <span
                        className={`status ${order.status || ""}`}
                      >
                        {order.status || "Pending"}
                      </span>

                    </td>


                    <td>
                      {order.paymentStatus ||
                        order.paymentMethod ||
                        "N/A"}
                    </td>


                    <td>
                      {formatPrice(
                        order.totalPrice ||
                        order.total ||
                        0
                      )}
                    </td>


                    <td>

                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "N/A"}

                    </td>


                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </Section>


    </div>
  );
}


export default OrdersTab;
