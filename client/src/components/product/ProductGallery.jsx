import { useState } from "react";
import { getImageUrl } from "../../utils/helpers";

export default function ProductGallery({
  images = [],
  productName = "",
}) {
  const [selected, setSelected] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">
          No images available
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Hero */}
      <div
        className="
          bg-[#f7f7f7]
          overflow-hidden
          aspect-square
          cursor-zoom-in
        "
      >
        <img
          src={getImageUrl(images[selected].path)}
          alt={images[selected].alt || productName}
          className="
            w-full
            h-full
            object-cover
            transition-all
            duration-500
            hover:scale-105
          "
          onError={(e) => {
            e.target.src = "/placeholder-product.svg";
          }}
        />
      </div>

      {/* Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 gap-6">
          {images.slice(1).map((image, index) => {

            const realIndex = index + 1;

            return (
              <button
                key={image._id || realIndex}
                type="button"
                onClick={() => setSelected(realIndex)}
                className="
                  group
                  aspect-square
                  overflow-hidden
                  bg-[#f7f7f7]
                "
              >
                <img
                  src={getImageUrl(image.path)}
                  alt={image.alt || productName}
                  className={`
                    w-full
                    h-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-105
                    ${
                      selected === realIndex
                        ? "ring-2 ring-black"
                        : ""
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}