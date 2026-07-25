import {
  DollarSign,
  ShoppingBag,
  Users,
  Glasses,
} from "lucide-react";

import StatCard from "../dashboard/StatCard";
import RevenueChart from "../dashboard/RevenueChart";

import useAdminDashboard from "../../../hooks/useAdminDashboard";


function Dashboard() {

  const {
    stats,
    products,
    orders,
    users,
    loading,
    error,
  } = useAdminDashboard();



  if (loading) {
    return (
      <div className="p-8">
        Loading dashboard...
      </div>
    );
  }



  if (error) {
    return (
      <div className="p-8 text-red-500">
        {error}
      </div>
    );
  }



  const dashboardStats = [
    {
      title: "Revenue",
      value: `${stats?.revenue || 0} TND`,
      change: "+12%",
      subtitle: "Total revenue",
      icon: <DollarSign size={22} />,
    },


    {
      title: "Orders",
      value: stats?.orders || orders?.length || 0,
      change: "+8%",
      subtitle: "Total orders",
      icon: <ShoppingBag size={22} />,
    },


    {
      title: "Customers",
      value: stats?.users || users?.length || 0,
      change: "+15%",
      subtitle: "Registered customers",
      icon: <Users size={22} />,
    },


    {
      title: "Products",
      value: stats?.products || products?.length || 0,
      change: "+4",
      subtitle: "Active products",
      icon: <Glasses size={22} />,
    },
  ];



  return (

    <div className="admin-dashboard-page">


      <div className="dashboard-title">

        <h1>
          Dashboard
        </h1>


        <p>
          Monitor your optical store performance.
        </p>

      </div>




      <div className="stats-grid">

        {dashboardStats.map((item) => (

          <StatCard
            key={item.title}
            {...item}
          />

        ))}

      </div>



      <RevenueChart />


    </div>

  );
}


export default Dashboard;