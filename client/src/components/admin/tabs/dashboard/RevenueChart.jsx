import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


const data = [
  {
    month: "Jan",
    revenue: 4200,
  },
  {
    month: "Feb",
    revenue: 6800,
  },
  {
    month: "Mar",
    revenue: 5400,
  },
  {
    month: "Apr",
    revenue: 9200,
  },
  {
    month: "May",
    revenue: 7800,
  },
  {
    month: "Jun",
    revenue: 12500,
  },
  {
    month: "Jul",
    revenue: 15400,
  },
];


function RevenueChart() {

  return (
    <div className="dashboard-card revenue-chart">

      <div className="dashboard-card-header">

        <div>
          <h2>
            Revenue Overview
          </h2>

          <p>
            Sales performance over the last months
          </p>
        </div>


        <select>
          <option>
            Last 7 months
          </option>

          <option>
            Last 30 days
          </option>

          <option>
            This year
          </option>

        </select>

      </div>



      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <AreaChart data={data}>


            <CartesianGrid
              strokeDasharray="3 3"
            />


            <XAxis
              dataKey="month"
            />


            <YAxis />


            <Tooltip />



            <Area

              type="monotone"

              dataKey="revenue"

              stroke="#C4A574"

              fill="#C4A574"

              fillOpacity={0.15}

            />


          </AreaChart>

        </ResponsiveContainer>


      </div>


    </div>
  );
}


export default RevenueChart;