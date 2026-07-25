import { useState } from "react";

import useAdminDashboard from "../hooks/useAdminDashboard";

import OverviewTab from "../components/admin/tabs/OverviewTab";
import UsersTab from "../components/admin/tabs/UsersTab";
import ProductsTab from "../components/admin/tabs/ProductsTab";
import OrdersTab from "../components/admin/tabs/OrdersTab";
import ReviewsTab from "../components/admin/tabs/ReviewsTab";
import CouponsTab from "../components/admin/tabs/CouponsTab";
import BrandsTab from "../components/admin/tabs/BrandsTab";

import Loader from "../components/common/Loader";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Users" },
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "reviews", label: "Reviews" },
  { id: "coupons", label: "Coupons" },
  { id: "brands", label: "Brands" },
];

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const dashboard = useAdminDashboard();

  if (dashboard.loading) {
    return <Loader />;
  }

  if (dashboard.error) {
    return (
      <div className="admin-error">
        <h2>Dashboard Error</h2>
        <p>{dashboard.error}</p>

        <button onClick={dashboard.refresh}>
          Retry
        </button>
      </div>
    );
  }

  const renderTab = () => {
    const props = {
      ...dashboard,
    };

    switch (activeTab) {
      case "overview":
        return <OverviewTab {...props} />;

      case "users":
        return <UsersTab {...props} />;

      case "products":
        return <ProductsTab {...props} />;

      case "orders":
        return <OrdersTab {...props} />;

      case "reviews":
        return <ReviewsTab {...props} />;

      case "coupons":
        return <CouponsTab {...props} />;

      case "brands":
        return <BrandsTab {...props} />;

      default:
        return <OverviewTab {...props} />;
    }
  };

  return (
    <div className="admin-dashboard">

      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your optical store</p>
        </div>

        <button
          onClick={dashboard.refresh}
          disabled={dashboard.actionLoading}
        >
          Refresh
        </button>
      </div>


      <div className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? "active"
                : ""
            }
          >
            {tab.label}
          </button>
        ))}
      </div>


      <div className="admin-content">
        {renderTab()}
      </div>

    </div>
  );
}

export default AdminDashboardPage;