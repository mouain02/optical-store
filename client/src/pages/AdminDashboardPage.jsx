import { useState } from "react";

import useAdminDashboard from "../hooks/useAdminDashboard";

import AdminLayout from "../components/admin/layout/AdminLayout";

import DashboardHeader from "../components/admin/dashboard/DashboardHeader";
import KPIGrid from "../components/admin/dashboard/KPIGrid";
import RevenueChart from "../components/admin/dashboard/RevenueChart";
import OrdersChart from "../components/admin/dashboard/OrdersChart";
import RecentOrders from "../components/admin/dashboard/RecentOrders";
import BestSellers from "../components/admin/dashboard/BestSellers";
import LowStockProducts from "../components/admin/dashboard/LowStockProducts";
import ProductsPage from "../components/admin/products/ProductsPage";
import Loader from "../components/common/Loader";
import OrdersPage from "../components/admin/orders/OrdersPage";
import CustomersPage from "../components/admin/customers/CustomersPage";





function DashboardOverview({ dashboard }) {


  return (

    <>


      <DashboardHeader
        refresh={dashboard.refresh}
      />



      <KPIGrid
        stats={dashboard.stats}
      />




      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
          mt-6
        "
      >


        <RevenueChart
          data={dashboard.monthlyRevenue || []}
        />



        <OrdersChart
          orders={dashboard.monthlyRevenue || []}
        />


      </div>





      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          mt-6
        "
      >



        <div
          className="
            xl:col-span-2
          "
        >

          <RecentOrders
            orders={dashboard.recentOrders || []}
          />

        </div>




        <LowStockProducts
          products={dashboard.products || []}
        />


      </div>





      <div className="mt-6">


        <BestSellers
          products={dashboard.bestSellers || []}
        />


      </div>



    </>

  );

}







function Placeholder({ title }) {


  return (

    <div

      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        p-10
      "

    >

      <h1
        className="
          text-2xl
          font-semibold
        "
      >

        {title}

      </h1>


      <p
        className="
          mt-3
          text-gray-400
        "
      >

        Management section coming next.

      </p>


    </div>

  );

}








function AdminDashboardPage() {


  const [activeSection, setActiveSection] = useState(
    "dashboard"
  );



  const dashboard = useAdminDashboard();





  if (dashboard.loading) {

    return <Loader />;

  }






  if (dashboard.error) {


    return (

      <div className="p-10">


        <h2
          className="
            text-xl
            font-bold
          "
        >

          Dashboard Error

        </h2>



        <p>

          {dashboard.error}

        </p>




        <button

          onClick={dashboard.refresh}

          className="
            mt-5
            px-5
            py-2
            bg-black
            text-white
          "

        >

          Retry

        </button>


      </div>

    );

  }







  const renderContent = () => {


    switch (activeSection) {


      case "dashboard":

        return (

          <DashboardOverview
            dashboard={dashboard}
          />

        );



      case "products":
        return (
          <ProductsPage

            products={dashboard.products}

            brands={dashboard.brands}

            createProduct={dashboard.createProduct}

            updateProduct={dashboard.updateProduct}

            deleteProduct={dashboard.deleteProduct}

          />
        );



      case "orders":

        return (

          <OrdersPage

            orders={dashboard.orders}

            refresh={dashboard.refresh}

          />

        );



      case "customers":

        return (

          <CustomersPage

            users={dashboard.users}

            refresh={dashboard.refresh}

          />

        );



      case "reviews":

        return (

          <Placeholder
            title="Reviews Management"
          />

        );



      case "brands":

        return (

          <Placeholder
            title="Brands Management"
          />

        );



      case "coupons":

        return (

          <Placeholder
            title="Coupons Management"
          />

        );



      default:

        return (

          <DashboardOverview
            dashboard={dashboard}
          />

        );

    }


  };









  return (


    <AdminLayout

      activeSection={activeSection}

      setActiveSection={setActiveSection}

    >


      {renderContent()}


    </AdminLayout>


  );

}



export default AdminDashboardPage;