import { Eye, Check, Trash2 } from "lucide-react";
import { useState } from "react";

import { reviewService } from "../../../services";
import ReviewDrawer from "./ReviewDrawer";


function ReviewsTable({
  reviews = [],
  refresh,
}) {


  const [selectedReview,setSelectedReview] = useState(null);

  const [drawerOpen,setDrawerOpen] = useState(false);



  const handleApprove = async (review) => {

    try {

      await reviewService.approve(
        review._id,
        !review.approved
      );


      if(refresh){
        await refresh();
      }


    } catch(err){

      console.error(err);

    }

  };




  const handleDelete = async (review) => {

    const confirmDelete =
      window.confirm(
        "Delete this review?"
      );


    if(!confirmDelete) return;


    try{

      await reviewService.remove(
        review._id
      );


      if(refresh){
        await refresh();
      }


    }catch(err){

      console.error(err);

    }

  };





  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        overflow-hidden
      "
    >


      <table className="w-full">


        <thead
          className="
            bg-gray-50
          "
        >

          <tr>

            <th className="px-6 py-4 text-left">
              Customer
            </th>


            <th className="px-6 py-4 text-left">
              Product
            </th>


            <th className="px-6 py-4 text-center">
              Rating
            </th>


            <th className="px-6 py-4 text-center">
              Status
            </th>


            <th className="px-6 py-4 text-center">
              Actions
            </th>


          </tr>

        </thead>



        <tbody>


        {
          reviews.map((review)=>(

            <tr

              key={review._id}

              className="
                border-b
                hover:bg-gray-50
              "

            >


              <td className="px-6 py-5">

                <p className="font-medium">

                  {
                    review.user?.name ||
                    "Customer"
                  }

                </p>


                <p className="text-sm text-gray-400">

                  {
                    review.user?.email ||
                    ""
                  }

                </p>

              </td>




              <td className="px-6">


                {
                  review.product?.name ||
                  "-"
                }


              </td>




              <td className="px-6 text-center">


                {"★".repeat(review.rating || 0)}


              </td>




              <td className="px-6 text-center">


                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    
                    ${
                      review.approved
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                    }
                  `}
                >

                  {
                    review.approved
                    ? "Approved"
                    : "Pending"
                  }


                </span>


              </td>




              <td className="px-6">


                <div
                  className="
                    flex
                    justify-center
                    gap-2
                  "
                >


                  <button

                    onClick={()=>{

                      setSelectedReview(review);

                      setDrawerOpen(true);

                    }}

                    className="
                      p-2
                      rounded-lg
                      bg-gray-100
                    "

                  >

                    <Eye size={16}/>


                  </button>




                  <button

                    onClick={()=>handleApprove(review)}

                    className="
                      p-2
                      rounded-lg
                      bg-green-50
                      text-green-600
                    "

                  >

                    <Check size={16}/>


                  </button>




                  <button

                    onClick={()=>handleDelete(review)}

                    className="
                      p-2
                      rounded-lg
                      bg-red-50
                      text-red-600
                    "

                  >

                    <Trash2 size={16}/>


                  </button>


                </div>


              </td>


            </tr>


          ))
        }


        </tbody>


      </table>




      <ReviewDrawer

        review={selectedReview}

        open={drawerOpen}

        onClose={()=>{

          setDrawerOpen(false);

          setSelectedReview(null);

        }}

      />


    </div>

  );

}


export default ReviewsTable;