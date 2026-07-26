import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { formatPrice } from "../../../utils/helpers";



function RevenueChart({
  data = [],
}) {


  const chartData = data.map((item)=>({

    month: new Date(
      item._id + "-01"
    ).toLocaleDateString(
      "en-US",
      {
        month: "short",
      }
    ),

    revenue: item.revenue,

    orders: item.orders,

  }));



  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        p-6
        shadow-sm
      "
    >


      {/* HEADER */}

      <div
        className="
          flex
          items-start
          justify-between
          mb-8
        "
      >

        <div>

          <h2
            className="
              text-xl
              font-semibold
              text-gray-900
            "
          >
            Revenue Overview
          </h2>


          <p
            className="
              text-sm
              text-gray-400
              mt-1
            "
          >
            Monthly sales performance
          </p>


        </div>



        <div
          className="
            px-4
            py-2
            rounded-xl
            bg-gray-100
            text-sm
            text-gray-600
          "
        >

          Last 12 months

        </div>


      </div>





      {/* CHART */}

      <div
        className="
          h-[350px]
        "
      >


        {
          chartData.length === 0 ? (

            <div
              className="
                h-full
                flex
                items-center
                justify-center
                text-gray-400
              "
            >

              No revenue data available

            </div>


          ) : (


            <ResponsiveContainer
              width="100%"
              height="100%"
            >


              <AreaChart
                data={chartData}
              >


                <defs>

                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#C4A574"
                      stopOpacity={0.35}
                    />


                    <stop
                      offset="100%"
                      stopColor="#C4A574"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>




                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />



                <XAxis

                  dataKey="month"

                  axisLine={false}

                  tickLine={false}

                />



                <YAxis

                  axisLine={false}

                  tickLine={false}

                  tickFormatter={(value)=>
                    `${value / 1000}k`
                  }

                />



                <Tooltip

                  formatter={(value)=>[
                    formatPrice(value),
                    "Revenue",
                  ]}

                />



                <Area

                  type="monotone"

                  dataKey="revenue"

                  stroke="#C4A574"

                  strokeWidth={3}

                  fill="url(#revenueGradient)"

                />


              </AreaChart>


            </ResponsiveContainer>


          )
        }


      </div>


    </div>

  );

}



export default RevenueChart;