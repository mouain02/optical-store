import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";



const COLORS = [
  "#C4A574",
  "#111827",
  "#6B7280",
  "#16A34A",
  "#DC2626",
];



function OrdersChart({
  orders = [],
}) {


  const statusCount = {

    pending: 0,

    processing: 0,

    shipped: 0,

    delivered: 0,

    cancelled: 0,

  };



  orders.forEach((order)=>{

    const status =
      order.status?.toLowerCase();


    if(statusCount[status] !== undefined){

      statusCount[status]++;

    }

  });



  const chartData = [

    {
      name:"Pending",
      value:statusCount.pending,
    },

    {
      name:"Processing",
      value:statusCount.processing,
    },

    {
      name:"Shipped",
      value:statusCount.shipped,
    },

    {
      name:"Delivered",
      value:statusCount.delivered,
    },

    {
      name:"Cancelled",
      value:statusCount.cancelled,
    },

  ].filter(
    item => item.value > 0
  );




  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        p-6
        shadow-sm
        h-full
      "
    >


      <div className="mb-6">

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
          Order status distribution
        </p>


      </div>





      <div
        className="
          h-[320px]
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

              No orders available

            </div>


          ) : (


            <ResponsiveContainer
              width="100%"
              height="100%"
            >


              <PieChart>


                <Pie

                  data={chartData}

                  dataKey="value"

                  nameKey="name"

                  cx="50%"

                  cy="50%"

                  innerRadius={75}

                  outerRadius={110}

                  paddingAngle={4}

                >


                  {
                    chartData.map(
                      (entry,index)=>(
                        
                        <Cell
                          key={entry.name}
                          fill={
                            COLORS[index % COLORS.length]
                          }
                        />

                      )
                    )
                  }


                </Pie>



                <Tooltip />



                <Legend

                  verticalAlign="bottom"

                  height={36}

                />


              </PieChart>


            </ResponsiveContainer>


          )
        }


      </div>


    </div>

  );

}


export default OrdersChart;