import CustomersTable from "./CustomersTable";

function CustomersPage({
  users = [],
  refresh,
}) {

  return (

    <div className="space-y-6">

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          p-6
        "
      >

        <h1
          className="
            text-2xl
            font-semibold
          "
        >
          Customers
        </h1>


        <p
          className="
            text-gray-400
            mt-2
          "
        >
          Manage your store customers and accounts.
        </p>


      </div>



      <CustomersTable

        users={users}

        refresh={refresh}

      />


    </div>

  );

}


export default CustomersPage;