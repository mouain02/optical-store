function DashboardHeader({ refresh }) {


  return (

    <div
      className="
        flex
        justify-between
        items-center
        mb-8
      "
    >

      <div>

        <h1
          className="
            text-3xl
            font-bold
            tracking-wide
          "
        >
          Dashboard Overview
        </h1>


        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Monitor your store performance and analytics
        </p>

      </div>



      <button

        onClick={refresh}

        className="
          px-6
          py-3
          bg-black
          text-white
          text-sm
          uppercase
          tracking-widest
          hover:bg-[#c4a574]
          transition
        "

      >

        Refresh

      </button>


    </div>

  );


}


export default DashboardHeader;