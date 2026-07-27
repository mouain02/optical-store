import { useEffect, useState } from "react";
import { X } from "lucide-react";


function BrandModal({
  open,
  initialData,
  onClose,
  onSave,
}) {


  const [name,setName] = useState("");
  const [logo,setLogo] = useState("");
  const [isActive,setIsActive] = useState(true);



  useEffect(()=>{

    if(initialData){

      setName(initialData.name || "");

      setLogo(initialData.logo || "");

      setIsActive(
        initialData.isActive !== false
      );

    } else {

      setName("");

      setLogo("");

      setIsActive(true);

    }

  },[initialData,open]);






  if(!open) return null;




  const handleSubmit = async(e)=>{

    e.preventDefault();


    await onSave({

      name,

      logo,

      isActive,

    });


  };






  return (

    <>


      <div

        className="
          fixed
          inset-0
          bg-black/40
          z-40
        "

        onClick={onClose}

      />





      <div

        className="
          fixed
          top-0
          right-0
          h-full
          w-full
          md:w-[500px]
          bg-white
          z-50
          shadow-2xl
        "

      >




        <div

          className="
            p-6
            border-b
            flex
            justify-between
            items-center
          "

        >


          <h2
            className="
              text-2xl
              font-semibold
            "
          >

            {
              initialData
              ? "Edit Brand"
              : "Add Brand"
            }


          </h2>



          <button

            onClick={onClose}

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

            <X size={20}/>


          </button>


        </div>








        <form

          onSubmit={handleSubmit}

          className="
            p-6
            space-y-6
          "

        >




          <div>


            <label
              className="
                block
                text-sm
                font-medium
                mb-2
              "
            >

              Brand Name

            </label>



            <input

              value={name}

              onChange={(e)=>setName(e.target.value)}

              placeholder="Ray-Ban"

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
              "

              required

            />


          </div>







          <div>


            <label
              className="
                block
                text-sm
                font-medium
                mb-2
              "
            >

              Logo URL

            </label>



            <input

              value={logo}

              onChange={(e)=>setLogo(e.target.value)}

              placeholder="/uploads/brands/logo.png"

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
              "

            />



          </div>







          <div

            className="
              flex
              items-center
              justify-between
              border
              rounded-xl
              p-4
            "

          >


            <span
              className="
                font-medium
              "
            >

              Active Brand

            </span>



            <input

              type="checkbox"

              checked={isActive}

              onChange={(e)=>
                setIsActive(e.target.checked)
              }

              className="
                w-5
                h-5
              "

            />


          </div>







          <button

            type="submit"

            className="
              w-full
              py-3
              rounded-xl
              bg-black
              text-white
              font-medium
            "

          >

            Save Brand

          </button>




        </form>



      </div>


    </>

  );

}


export default BrandModal;