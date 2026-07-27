import {
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

import { formatPrice } from "../../../utils/helpers";


function OrderStats({
  orders = [],
}) {


  const safeOrders = Array.isArray(orders)
    ? orders
    : [];



  const totalOrders =
    safeOrders.length;



  const totalRevenue =
    safeOrders.reduce(
      (sum, order) =>
        sum + (order.totalPrice || 0),
      0
    );



  const pending =
    safeOrders.filter(
      (order) =>
        order.status === "pending"
    ).length;



  const delivered =
    safeOrders.filter(
      (order) =>
        order.status === "delivered"
    ).length;





  const cards = [

    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingBag size={24} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },


    {
      title: "Revenue",
      value: formatPrice(totalRevenue),
      icon: <DollarSign size={24} />,
      color: "text-green-600",
      bg: "bg-green-50",
    },


    {
      title: "Pending",
      value: pending,
      icon: <Clock size={24} />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },


    {
      title: "Delivered",
      value: delivered,
      icon: <CheckCircle size={24} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },

  ];






  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >


      {cards.map((card) => (


        <div

          key={card.title}

          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-6
            shadow-sm
          "

        >


          <div
            className="
              flex
              justify-between
              items-center
            "
          >


            <div>


              <p
                className="
                  text-sm
                  text-gray-400
                "
              >

                {card.title}

              </p>



              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-gray-900
                "
              >

                {card.value}

              </h2>


            </div>




            <div

              className={`
                w-12
                h-12
                rounded-xl
                flex
                items-center
                justify-center
                ${card.bg}
                ${card.color}
              `}

            >

              {card.icon}

            </div>



          </div>



        </div>


      ))}


    </div>

  );

}


export default OrderStats;