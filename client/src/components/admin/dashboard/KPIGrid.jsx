function Card({ title, value }) {


  return (

    <div

      className="
        bg-white
        p-6
        border
        border-gray-200
        rounded-sm
      "

    >

      <p
        className="
          text-sm
          uppercase
          tracking-widest
          text-gray-500
        "
      >
        {title}
      </p>


      <h2

        className="
          text-3xl
          font-bold
          mt-3
        "

      >

        {value}

      </h2>


    </div>

  );

}





function KPIGrid({ stats }) {


  return (

    <div

      className="
        grid
        grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-6
        gap-5
      "

    >

      <Card
        title="Customers"
        value={stats?.users || 0}
      />


      <Card
        title="Products"
        value={stats?.products || 0}
      />


      <Card
        title="Orders"
        value={stats?.orders || 0}
      />


      <Card
        title="Revenue"
        value={`${stats?.revenue || 0} TND`}
      />


      <Card
        title="Reviews"
        value={stats?.reviews || 0}
      />


      <Card
        title="Brands"
        value={stats?.brands || 0}
      />


    </div>

  );

}


export default KPIGrid;