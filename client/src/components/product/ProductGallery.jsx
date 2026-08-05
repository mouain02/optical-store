import { getImageUrl } from "../../utils/helpers";


export default function ProductGallery({
  images = [],
  productName = "",
}) {


  if (!images.length) {

    return (

      <div
        className="
          aspect-square
          bg-gray-100
          flex
          items-center
          justify-center
        "
      >

        <span className="text-gray-400">

          No images available

        </span>


      </div>

    );

  }




  return (

    <div
      className="
        w-full
      "
    >



      {/* MAIN IMAGE */}

      <div
        className="
          w-full
          aspect-square
          overflow-hidden
          bg-gray-100
          mb-6
        "
      >

        <img

          src={
            getImageUrl(
              images[0]?.path
            )
          }

          alt={
            images[0]?.alt ||
            productName
          }

          className="
            w-full
            h-full
            object-cover
          "

          onError={(e)=>{

            e.target.src =
              "/placeholder-product.svg";

          }}

        />


      </div>







      {/* FOUR SECONDARY IMAGES */}

      {
        images.length > 1 && (

          <div
            className="
              grid
              grid-cols-2
              gap-6
            "
          >


            {
              images.slice(1,5)
              .map((image,index)=>(


                <div

                  key={
                    image._id ||
                    index
                  }

                  className="
                    aspect-square
                    overflow-hidden
                    bg-gray-100
                  "

                >


                  <img

                    src={
                      getImageUrl(
                        image.path
                      )
                    }

                    alt={
                      image.alt ||
                      productName
                    }


                    className="
                      w-full
                      h-full
                      object-cover
                      hover:scale-105
                      transition-transform
                      duration-500
                    "


                    onError={(e)=>{

                      e.target.src =
                      "/placeholder-product.svg";

                    }}

                  />


                </div>


              ))

            }


          </div>


        )
      }



    </div>

  );

}