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



function RevenueChart({ data = [] }) {



  const chartData = data
    .filter((item) => item?._id)
    .map((item) => {


      const date = new Date(
        `${item._id}-01`
      );


      return {

        month: date.toLocaleDateString(
          "en-US",
          {
            month: "short",
          }
        ),


        revenue:
          Number(item.revenue) || 0,


        orders:
          Number(item.orders) || 0,

      };


    });





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


      <div
        className="
          flex
          justify-between
          items-start
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



        <span
          className="
            px-4
            py-2
            bg-gray-100
            rounded-xl
            text-sm
            text-gray-600
          "
        >
          Last 12 months
        </span>


      </div>





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
                  `${Math.round(value / 1000)}k`
                }

              />




              <Tooltip

                formatter={(value)=>[

                  formatPrice(value),

                  "Revenue"

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