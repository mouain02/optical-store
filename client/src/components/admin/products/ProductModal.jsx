import { useEffect, useState } from "react";
import { X, Upload, Trash2 } from "lucide-react";

function ProductModal({
  open,
  onClose,
  onSave,
  initialData = null,
  brands = [],
  categories = [],
}) {

  const [form, setForm] = useState({

    name: "",
    brand: "",
    category: "",

    referenceCode: "",

    price: "",
    salePrice: "",
    stock: "",
    sku: "",

    lowStock: 5,

    description: "",

    frame: {
      shape: "",
      color: "",
      material: "",
      finish: "",
      templeColor: "",
    },

    lens: {
      name: "",
      color: "",
      treatment: "",
      category: "",
      transmission: "",
      polarized: false,
    },

    dimensions: {
      size: "",
      bridge: "",
      lensHeight: "",
      templeLength: "",
    },

    tryOn: {
      enabled: false,
    },

    metaTitle: "",
    metaDescription: "",

    isActive: true,

  });


  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});



  useEffect(() => {

    if (initialData) {

      setForm({

        name: initialData.name || "",

        brand:
          initialData.brand?._id ||
          initialData.brand ||
          "",

        category:
          initialData.category || "",

        price:
          initialData.price || "",

        salePrice:
          initialData.salePrice || "",

        stock:
          initialData.stock || "",

        sku:
          initialData.sku || "",

        lowStock:
          initialData.lowStock || 5,

        description:
          initialData.description || "",

        metaTitle:
          initialData.metaTitle || "",

        metaDescription:
          initialData.metaDescription || "",

        isActive:
          initialData.isActive ?? true,

      });

    }

  }, [initialData]);




  if (!open) return null;




  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setForm((prev) => ({

      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    }));

  };

  const handleNestedChange = (section, field, value) => {

    setForm((prev) => ({
      ...prev,

      [section]: {
        ...prev[section],

        [field]: value,
      },

    }));

  };



  const handleImages = (e) => {

    const files = Array.from(
      e.target.files
    );


    setImages(files);

  };






  const removeImage = (index) => {

    setImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );

  };







  const validate = () => {

    const newErrors = {};


    if (!form.name)
      newErrors.name =
        "Product name required";


    if (!form.brand)
      newErrors.brand =
        "Please select a brand";


    if (!form.category)
      newErrors.category =
        "Please select category";


    if (!form.price)
      newErrors.price =
        "Price required";


    if (!initialData && images.length === 0)
      newErrors.images =
        "Please upload product image";



    setErrors(newErrors);


    return Object.keys(newErrors).length === 0;

  };







  const submit = (e) => {

    e.preventDefault();


    if (!validate())
      return;



    onSave(
      form,
      images
    );

  };





  return (

    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        justify-center
        items-center
        z-50
      "
    >


      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-5xl
          max-h-[90vh]
          overflow-auto
          shadow-2xl
        "
      >



        <div
          className="
            flex
            justify-between
            items-center
            p-8
            border-b
          "
        >

          <div>

            <h2 className="text-3xl font-semibold">

              {initialData
                ? "Edit Product"
                : "New Product"}

            </h2>

            <p className="text-gray-500 mt-2">

              Complete product information.

            </p>

          </div>


          <button onClick={onClose}>

            <X size={26} />

          </button>


        </div>







        <form
          onSubmit={submit}
          className="
            p-8
            space-y-8
          "
        >



          <div>

            <h3 className="text-xl font-semibold mb-5">
              General
            </h3>



            <div className="grid grid-cols-2 gap-6">


              <div>

                <input

                  name="name"

                  placeholder="Product name"

                  value={form.name}

                  onChange={handleChange}

                  className="input-field"

                />

                <input
                  name="referenceCode"
                  placeholder="Reference code (RB2140 901 50-22)"
                  value={form.referenceCode}
                  onChange={handleChange}
                  className="input-field"
                />

                {errors.name &&
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                }

              </div>





              <div>


                <select

                  name="brand"

                  value={form.brand}

                  onChange={handleChange}

                  className="input-field"

                >

                  <option value="">
                    Select brand
                  </option>


                  {brands.map((brand) => (

                    <option
                      key={brand._id}
                      value={brand._id}
                    >

                      {brand.name}

                    </option>

                  ))}


                </select>


                {errors.brand &&
                  <p className="text-red-500 text-sm mt-1">
                    {errors.brand}
                  </p>
                }


              </div>





              <div>


                <select

                  name="category"

                  value={form.category}

                  onChange={handleChange}

                  className="input-field"

                >

                  <option value="">
                    Select category
                  </option>


                  {categories.map((cat) => (

                    <option
                      key={cat.value}
                      value={cat.value}
                    >
                      {cat.label}
                    </option>

                  ))}


                </select>


                {errors.category &&
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category}
                  </p>
                }


              </div>



            </div>

          </div>







          <div>

            <h3 className="text-xl font-semibold mb-5">
              Pricing & Inventory
            </h3>


            <div className="grid grid-cols-3 gap-6">


              <input

                type="number"

                name="price"

                placeholder="Price"

                value={form.price}

                onChange={handleChange}

                className="input-field"

              />


              <input

                type="number"

                name="stock"

                placeholder="Stock"

                value={form.stock}

                onChange={handleChange}

                className="input-field"

              />



              <input

                name="sku"

                placeholder="SKU"

                value={form.sku}

                onChange={handleChange}

                className="input-field"

              />



            </div>


          </div>








          <div>


            <h3 className="text-xl font-semibold mb-5">
              Description
            </h3>


            <textarea

              rows={5}

              name="description"

              value={form.description}

              onChange={handleChange}

              className="input-field"

            />


          </div>

          <div>

  <h3 className="text-xl font-semibold mb-5">
    Frame Information
  </h3>


  <div className="grid grid-cols-2 gap-6">


    <input
      placeholder="Frame shape (Square, Aviator...)"
      value={form.frame.shape}
      onChange={(e) =>
        handleNestedChange(
          "frame",
          "shape",
          e.target.value
        )
      }
      className="input-field"
    />


    <input
      placeholder="Frame material (Acetate, Metal...)"
      value={form.frame.material}
      onChange={(e) =>
        handleNestedChange(
          "frame",
          "material",
          e.target.value
        )
      }
      className="input-field"
    />


    <input
      placeholder="Frame color"
      value={form.frame.color}
      onChange={(e) =>
        handleNestedChange(
          "frame",
          "color",
          e.target.value
        )
      }
      className="input-field"
    />


    <input
      placeholder="Finish (Polished, Matte...)"
      value={form.frame.finish}
      onChange={(e) =>
        handleNestedChange(
          "frame",
          "finish",
          e.target.value
        )
      }
      className="input-field"
    />


    <input
      placeholder="Temple color"
      value={form.frame.templeColor}
      onChange={(e) =>
        handleNestedChange(
          "frame",
          "templeColor",
          e.target.value
        )
      }
      className="input-field"
    />


  </div>


</div>








          <div>


            <h3 className="text-xl font-semibold mb-5">
              Images
            </h3>



            <label

              className="
                h-48
                border-2
                border-dashed
                rounded-2xl
                flex
                flex-col
                items-center
                justify-center
                cursor-pointer
                hover:bg-gray-50
              "

            >

              <Upload size={36} />


              <span className="mt-3">

                Click to upload images

              </span>



              <input

                type="file"

                multiple

                hidden

                accept="image/*"

                onChange={handleImages}

              />


            </label>



            {errors.images &&
              <p className="text-red-500 text-sm mt-2">
                {errors.images}
              </p>
            }







            {images.length > 0 && (

              <div className="grid grid-cols-4 gap-4 mt-5">


                {images.map((img, index) => (


                  <div
                    key={index}
                    className="
                      border
                      rounded-xl
                      p-3
                      relative
                    "
                  >


                    <img

                      src={
                        URL.createObjectURL(img)
                      }

                      className="
                        h-24
                        w-full
                        object-cover
                        rounded-lg
                      "

                    />


                    <button

                      type="button"

                      onClick={() =>
                        removeImage(index)
                      }

                      className="
                        absolute
                        top-2
                        right-2
                        bg-white
                        rounded-full
                        p-1
                      "

                    >

                      <Trash2
                        size={16}
                      />

                    </button>


                  </div>


                ))}


              </div>

            )}



          </div>









          <div className="flex items-center gap-3">


            <input

              type="checkbox"

              name="isActive"

              checked={form.isActive}

              onChange={handleChange}

            />


            <span>
              Product visible
            </span>


          </div>









          <div
            className="
              flex
              justify-end
              gap-4
              pt-8
              border-t
            "
          >


            <button

              type="button"

              onClick={onClose}

              className="btn-outline"

            >

              Cancel

            </button>



            <button

              type="submit"

              className="btn-primary"

            >

              {initialData
                ? "Update Product"
                : "Create Product"}

            </button>


          </div>




        </form>


      </div>


    </div>

  );

}


export default ProductModal;