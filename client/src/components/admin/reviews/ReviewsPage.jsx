import ReviewsTable from "./ReviewsTable";


function ReviewsPage({
  reviews = [],
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
            text-3xl
            font-semibold
          "
        >
          Reviews
        </h1>


        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Manage customer reviews and product feedback.
        </p>


      </div>



      <ReviewsTable

        reviews={reviews}

        refresh={refresh}

      />


    </div>

  );

}


export default ReviewsPage;