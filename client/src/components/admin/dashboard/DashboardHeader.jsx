import {
  Download,
  Plus,
  CalendarDays,
} from "lucide-react";


function DashboardHeader() {

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );


  return (

    <div
      className="
        flex
        flex-col
        xl:flex-row
        xl:items-center
        justify-between
        gap-6
        mb-8
      "
    >


      {/* LEFT */}

      <div>

        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-gray-400
            mb-3
          "
        >

          <CalendarDays size={16}/>

          <span>
            {today}
          </span>

        </div>



        <h1
          className="
            text-4xl
            font-semibold
            tracking-tight
            text-gray-900
          "
        >
          Good morning, Admin
        </h1>


        <p
          className="
            mt-3
            text-gray-500
            max-w-xl
          "
        >
          Monitor your store performance, manage products,
          and track customer activity from one place.
        </p>


      </div>





      {/* ACTIONS */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >


        <button

          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            border
            border-gray-200
            bg-white
            text-sm
            font-medium
            hover:bg-gray-50
            transition
          "

        >

          <Download size={18}/>

          Export

        </button>





        <button

          className="
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            bg-black
            text-white
            text-sm
            font-medium
            hover:bg-gray-800
            transition
          "

        >

          <Plus size={18}/>

          Add Product

        </button>



      </div>


    </div>

  );

}


export default DashboardHeader;