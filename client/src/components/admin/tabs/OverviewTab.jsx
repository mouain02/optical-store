import {
  Users,
  Package,
  ShoppingBag,
  Star,
  Tag,
  Building2,
} from "lucide-react";

import { formatPrice } from "../../../utils/helpers";


function StatCard({
  title,
  value,
  icon,
}) {

  return (
    <div className="admin-stat-card">

      <div className="stat-icon">
        {icon}
      </div>


      <div>

        <p>
          {title}
        </p>


        <h2>
          {value}
        </h2>

      </div>

    </div>
  );
}



function OverviewTab({
  stats = {},
  products = [],
  orders = [],
  users = [],
}) {


  const recentProducts = products.slice(0, 5);

  const recentOrders = orders.slice(0, 5);



  return (

    <div className="overview-tab space-y-8">


      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-semibold">
          Dashboard Overview
        </h1>


        <p className="text-gray-500 mt-2">
          Track your optical store performance.
        </p>

      </div>




      {/* STAT CARDS */}

      <section className="stats-grid">


        <StatCard
          title="Customers"
          value={stats.users || users.length}
          icon={<Users size={24}/>}
        />


        <StatCard
          title="Products"
          value={stats.products || products.length}
          icon={<Package size={24}/>}
        />


        <StatCard
          title="Orders"
          value={stats.orders || orders.length}
          icon={<ShoppingBag size={24}/>}
        />


        <StatCard
          title="Reviews"
          value={stats.reviews || 0}
          icon={<Star size={24}/>}
        />


        <StatCard
          title="Brands"
          value={stats.brands || 0}
          icon={<Building2 size={24}/>}
        />


        <StatCard
          title="Coupons"
          value={stats.coupons || 0}
          icon={<Tag size={24}/>}
        />


      </section>





      {/* ANALYTICS PLACEHOLDER */}

      <section className="dashboard-card">

        <h2 className="text-xl font-semibold">
          Sales Analytics
        </h2>


        <p className="text-gray-500 mt-2">
          Revenue charts will appear here.
        </p>


      </section>






      {/* RECENT PRODUCTS */}

      <section className="dashboard-card">


        <div className="flex justify-between mb-6">

          <h2 className="text-xl font-semibold">
            Recent Products
          </h2>


          <span className="text-gray-500">
            Total: {products.length}
          </span>

        </div>




        <div className="space-y-4">


          {recentProducts.map((product)=>(

            <div
              key={product._id}
              className="flex justify-between border-b pb-4"
            >

              <div>

                <h3 className="font-medium">
                  {product.name}
                </h3>


                <p className="text-gray-500 text-sm">
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


      </section>






      {/* RECENT ORDERS */}


      <section className="dashboard-card">


        <div className="flex justify-between mb-6">

          <h2 className="text-xl font-semibold">
            Recent Orders
          </h2>


          <span className="text-gray-500">
            Total: {orders.length}
          </span>


        </div>





        <div className="space-y-4">


        {recentOrders.map((order)=>(

          <div
            key={order._id}
            className="flex justify-between border-b pb-4"
          >


            <div>

              <h3 className="font-medium">
                Order #{order._id.slice(-6)}
              </h3>


              <p className="text-gray-500 text-sm">
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


      </section>




    </div>

  );
}



export default OverviewTab;