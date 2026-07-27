function ProductStats({
  products = [],
}) {


  const total = products.length;


  const active = products.filter(
    (product) => product.isActive
  ).length;


  const lowStock = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= 5
  ).length;


  const outOfStock = products.filter(
    (product) =>
      !product.stock ||
      product.stock === 0
  ).length;



  const cards = [

    {
      title: "Total Products",
      value: total,
    },

    {
      title: "Active Products",
      value: active,
    },

    {
      title: "Low Stock",
      value: lowStock,
    },

    {
      title: "Out of Stock",
      value: outOfStock,
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
        mb-6
      "
    >

      {
        cards.map((card)=>(

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

        ))
      }


    </div>

  );

}


export default ProductStats;