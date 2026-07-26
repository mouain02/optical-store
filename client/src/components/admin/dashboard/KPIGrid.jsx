import {
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  TrendingUp,
} from "lucide-react";

import { formatPrice } from "../../../utils/helpers";


function KPIItem({
  title,
  value,
  icon,
  trend,
  description,
}) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        p-6
        shadow-sm
        hover:shadow-md
        transition
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
        "
      >

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-[#C4A574]/10
            text-[#C4A574]
            flex
            items-center
            justify-center
          "
        >

          {icon}

        </div>


        <div
          className="
            flex
            items-center
            gap-1
            text-green-600
            text-sm
            font-medium
          "
        >

          <TrendingUp size={15}/>

          {trend}

        </div>


      </div>




      <p
        className="
          mt-6
          text-sm
          uppercase
          tracking-widest
          text-gray-400
        "
      >
        {title}
      </p>




      <h2
        className="
          mt-2
          text-3xl
          font-semibold
          text-gray-900
        "
      >
        {value}
      </h2>




      <p
        className="
          mt-2
          text-sm
          text-gray-500
        "
      >
        {description}
      </p>


    </div>

  );

}





function KPIGrid({
  stats = {},
}) {


  const cards = [

    {
      title: "Revenue",
      value: formatPrice(stats.revenue || 0),
      icon: <DollarSign size={22}/>,
      trend: "+12%",
      description: "Total store revenue",
    },


    {
      title: "Orders",
      value: stats.orders || 0,
      icon: <ShoppingBag size={22}/>,
      trend: "+8%",
      description: "Completed purchases",
    },


    {
      title: "Customers",
      value: stats.customers || 0,
      icon: <Users size={22}/>,
      trend: "+5%",
      description: "Registered customers",
    },


    {
      title: "Products",
      value: stats.products || 0,
      icon: <Package size={22}/>,
      trend: "+3%",
      description: "Active products",
    },

  ];



  return (

    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >

      {cards.map((card)=> (

        <KPIItem

          key={card.title}

          {...card}

        />

      ))}


    </div>

  );

}


export default KPIGrid;