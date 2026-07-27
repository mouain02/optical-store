import { formatPrice } from "../../../utils/helpers";

function OrderStats({
  orders = [],
}) {

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );

  const pending = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const delivered = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const cards = [

    {
      title: "Orders",
      value: totalOrders,
    },

    {
      title: "Revenue",
      value: formatPrice(totalRevenue),
    },

    {
      title: "Pending",
      value: pending,
    },

    {
      title: "Delivered",
      value: delivered,
    },

  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
        >

          <p className="text-sm text-gray-400">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {card.value}
          </h2>

        </div>

      ))}

    </div>

  );

}

export default OrderStats;