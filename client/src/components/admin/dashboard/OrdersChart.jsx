import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";



function OrdersChart({ orders = [] }) {



  const chartData = orders
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
          mb-8
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-gray-900
          "
        >

          Orders Analytics

        </h2>


        <p
          className="
            text-sm
            text-gray-400
            mt-1
          "
        >

          Monthly order activity

        </p>


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

              No order data available

            </div>


          ) : (


            <ResponsiveContainer
              width="100%"
              height="100%"
            >


              <BarChart

                data={chartData}

              >



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

                />



                <Tooltip />



                <Bar

                  dataKey="orders"

                  fill="#1a1a1a"

                  radius={[
                    8,
                    8,
                    0,
                    0
                  ]}

                />


              </BarChart>


            </ResponsiveContainer>


          )
        }



      </div>



    </div>

  );

}



export default OrdersChart;
