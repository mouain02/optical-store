import OrderStats from "./OrderStats";
import OrdersTable from "./OrdersTable";

function OrdersPage({
  orders = [],
  refresh,
}) {

  return (

    <div className="space-y-6">

      <OrderStats
        orders={orders}
      />

      <OrdersTable
        orders={orders}
        refresh={refresh}
      />
      

    </div>

  );

}

export default OrdersPage;