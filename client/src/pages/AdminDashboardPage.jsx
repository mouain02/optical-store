import useAdminDashboard from "../hooks/useAdminDashboard";

import AdminLayout from "../components/admin/layout/AdminLayout";

import DashboardHeader from "../components/admin/dashboard/DashboardHeader";
import KPIGrid from "../components/admin/dashboard/KPIGrid";
import RevenueChart from "../components/admin/dashboard/RevenueChart";
import OrdersChart from "../components/admin/dashboard/OrdersChart";
import RecentOrders from "../components/admin/dashboard/RecentOrders";
import BestSellers from "../components/admin/dashboard/BestSellers";
import LowStockProducts from "../components/admin/dashboard/LowStockProducts";

import Loader from "../components/common/Loader";



function AdminDashboardPage() {


  const dashboard = useAdminDashboard();



  if (dashboard.loading) {
    return <Loader />;
  }



  if (dashboard.error) {

    return (

      <div className="p-10">

        <h2 className="text-xl font-bold">
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





  return (

    <AdminLayout>


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
          data={dashboard.monthlyRevenue}
        />


        <OrdersChart
          orders={dashboard.orders}
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
            orders={dashboard.recentOrders}
          />

        </div>



        <LowStockProducts
          products={dashboard.products}
        />


      </div>





      <div
        className="
          mt-6
        "
      >

        <BestSellers
          products={dashboard.bestSellers}
        />

      </div>



    </AdminLayout>

  );

}


export default AdminDashboardPage;