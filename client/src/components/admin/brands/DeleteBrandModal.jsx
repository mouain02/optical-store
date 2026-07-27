import { X } from "lucide-react";


function DeleteBrandModal({
  open,
  brand,
  onCancel,
  onConfirm,
}) {


  if(!open || !brand) return null;




  return (

    <>


      <div

        className="
          fixed
          inset-0
          bg-black/40
          z-40
        "

        onClick={onCancel}

      />





      <div

        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          p-4
        "

      >


        <div

          className="
            bg-white
            rounded-2xl
            w-full
            max-w-md
            shadow-2xl
            p-6
          "

        >




          <div
            className="
              flex
              justify-between
              items-start
              mb-6
            "
          >


            <div>


              <h2
                className="
                  text-xl
                  font-semibold
                "
              >

                Delete Brand

              </h2>


              <p
                className="
                  text-gray-500
                  mt-2
                "
              >

                Are you sure you want to delete this brand?

              </p>


            </div>




            <button

              onClick={onCancel}

              className="
                w-10
                h-10
                rounded-lg
                bg-gray-100
                flex
                items-center
                justify-center
              "

            >

              <X size={18}/>


            </button>


          </div>






          <div

            className="
              bg-gray-50
              rounded-xl
              p-4
              mb-6
            "

          >

            <p
              className="
                font-semibold
              "
            >

              {brand.name}

            </p>


            <p
              className="
                text-sm
                text-gray-400
              "
            >

              This action cannot be undone.

            </p>


          </div>







          <div

            className="
              flex
              gap-3
            "

          >



            <button

              onClick={onCancel}

              className="
                flex-1
                py-3
                rounded-xl
                border
              "

            >

              Cancel

            </button>





            <button

              onClick={onConfirm}

              className="
                flex-1
                py-3
                rounded-xl
                bg-red-600
                text-white
              "

            >

              Delete

            </button>




          </div>




        </div>


      </div>


    </>

  );

}


export default DeleteBrandModal;