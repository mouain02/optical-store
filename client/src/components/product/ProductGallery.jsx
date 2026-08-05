import { getImageUrl } from "../../utils/helpers";

export default function ProductGallery({ images = [], product }) {
  if (!images.length) return null;

  return (
    <div className="space-y-4">

      {/* Main Image */}
      <div className="
        w-full
        aspect-square
        bg-gray-100
        overflow-hidden
      ">
        <img
          src={getImageUrl(images[0].path)}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
          "
        />
      </div>


      {/* Image 2 + Image 3 */}
      {images.length > 2 && (
        <div className="
          grid
          grid-cols-2
          gap-4
        ">

          {images.slice(1,3).map((img,index)=>(
            <div
              key={index}
              className="
                aspect-square
                bg-gray-100
                overflow-hidden
              "
            >
              <img
                src={getImageUrl(img.path)}
                alt=""
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>
          ))}

        </div>
      )}



      {/* Image 4 + Image 5 */}
      {images.length > 4 && (
        <div className="
          grid
          grid-cols-2
          gap-4
        ">

          {images.slice(3,5).map((img,index)=>(
            <div
              key={index}
              className="
                aspect-square
                bg-gray-100
                overflow-hidden
              "
            >
              <img
                src={getImageUrl(img.path)}
                alt=""
                className="
                  w-full
                  h-full
                  object-cover
                "
              />
            </div>
          ))}

        </div>
      )}

    </div>
  );
}