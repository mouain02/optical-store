import { useState, useEffect, useRef } from "react";

import {
  MoreVertical,
  Pencil,
  Copy,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";


function ProductActions({
  product,
  onEdit,
  onDelete,
}) {


  const [open, setOpen] = useState(false);

  const menuRef = useRef();



  useEffect(()=>{

    function handleClickOutside(event){

      if(
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ){

        setOpen(false);

      }

    }


    document.addEventListener(
      "mousedown",
      handleClickOutside
    );


    return ()=>{

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };


  },[]);




  const duplicateProduct = ()=>{

    console.log(
      "Duplicate product",
      product
    );

    setOpen(false);

  };




  const toggleVisibility = ()=>{

    console.log(
      "Toggle visibility",
      product
    );

    setOpen(false);

  };




  return (

    <div
      className="
        relative
      "
      ref={menuRef}
    >


      <button

        onClick={()=>setOpen(!open)}

        className="
          w-10
          h-10
          rounded-lg
          bg-gray-100
          hover:bg-black
          hover:text-white
          transition
          flex
          items-center
          justify-center
        "

      >

        <MoreVertical size={18}/>


      </button>





      {
        open && (

          <div

            className="
              absolute
              right-0
              top-12
              w-48
              bg-white
              rounded-xl
              border
              border-gray-200
              shadow-xl
              z-20
              overflow-hidden
            "

          >



            <button

              onClick={()=>{

                onEdit(product);

                setOpen(false);

              }}

              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                hover:bg-gray-50
              "

            >

              <Pencil size={16}/>

              Edit

            </button>






            <button

              onClick={duplicateProduct}

              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                hover:bg-gray-50
              "

            >

              <Copy size={16}/>

              Duplicate

            </button>







            <button

              onClick={toggleVisibility}

              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                hover:bg-gray-50
              "

            >

              {
                product.isActive

                ?

                <EyeOff size={16}/>

                :

                <Eye size={16}/>

              }


              {
                product.isActive
                ?
                "Hide"
                :
                "Activate"
              }


            </button>








            <button

              onClick={()=>{

                onDelete(product);

                setOpen(false);

              }}

              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-red-600
                hover:bg-red-50
              "

            >

              <Trash2 size={16}/>

              Delete


            </button>




          </div>

        )
      }


    </div>

  );

}


export default ProductActions; 