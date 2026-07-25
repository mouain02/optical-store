import { formatPrice } from "../../../utils/helpers";

function StatCard({ title, value }) {
  return (
    <div className="admin-stat-card">
      <h3>{title}</h3>
      <strong>{value}</strong>
    </div>
  );
}


function OverviewTab({
  stats,
  products,
  orders,
  users,
  reviews,
}) {
  const recentProducts = products?.slice(0, 5) || [];
  const recentOrders = orders?.slice(0, 5) || [];


  return (
    <div className="overview-tab">

      <section className="stats-grid">

        <StatCard
          title="Users"
          value={stats.users}
        />

        <StatCard
          title="Products"
          value={stats.products}
        />

        <StatCard
          title="Orders"
          value={stats.orders}
        />

        <StatCard
          title="Reviews"
          value={stats.reviews}
        />

        <StatCard
          title="Brands"
          value={stats.brands}
        />

        <StatCard
          title="Coupons"
          value={stats.coupons}
        />

      </section>



      <section className="overview-section">

        <div className="section-header">
          <h2>
            Recent Products
          </h2>

          <span>
            Total: {products.length}
          </span>
        </div>


        {recentProducts.length === 0 ? (
          <p>
            No products available
          </p>
        ) : (

          <div className="overview-list">

            {recentProducts.map((product) => (

              <div
                key={product._id}
                className="overview-item"
              >

                <div>
                  <h4>
                    {product.name}
                  </h4>

                  <p>
                    {product.brand?.name ||
                      product.brand ||
                      "No brand"}
                  </p>
                </div>


                <strong>
                  {formatPrice(product.price)}
                </strong>

              </div>

            ))}

          </div>

        )}

      </section>




      <section className="overview-section">

        <div className="section-header">
          <h2>
            Recent Orders
          </h2>

          <span>
            Total: {orders.length}
          </span>
        </div>


        {recentOrders.length === 0 ? (

          <p>
            No orders available
          </p>

        ) : (

          <div className="overview-list">

            {recentOrders.map((order) => (

              <div
                key={order._id}
                className="overview-item"
              >

                <div>

                  <h4>
                    Order #{order._id.slice(-6)}
                  </h4>

                  <p>
                    {order.user?.name ||
                      order.customerName ||
                      "Customer"}
                  </p>

                </div>


                <strong>
                  {formatPrice(order.totalPrice)}
                </strong>

              </div>

            ))}

          </div>

        )}

      </section>


    </div>
  );
}


export default OverviewTab;