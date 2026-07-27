import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";

function ProductModal({
  open,
  onClose,
  onSave,
  initialData = null,
}) {

  const [form, setForm] = useState({
  name: "",
  brand: "",
  category: "",
  price: "",
  salePrice: "",
  stock: "",
  sku: "",
  lowStock: 5,
  description: "",
  metaTitle: "",
  metaDescription: "",
  isActive: true,
});
  const [images, setImages] = useState([]);

  useEffect(() => {

    if (!initialData) return;

    setForm({
      name: initialData.name || "",
      brand: initialData.brand?._id || initialData.brand || "",
      category: initialData.category || "",
      price: initialData.price || "",
      stock: initialData.stock || "",
      description: initialData.description || "",
      isActive: initialData.isActive,
    });

  }, [initialData]);



  if (!open) return null;



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

  };



  const submit = (e) => {

    e.preventDefault();

    onSave(form, images);

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

        {/* HEADER */}

        <div className="flex justify-between items-center p-8 border-b">

          <div>

            <h2 className="text-3xl font-semibold">

              {
                initialData
                  ? "Edit Product"
                  : "New Product"
              }

            </h2>

            <p className="text-gray-500 mt-2">

              Complete the information below.

            </p>

          </div>

          <button onClick={onClose}>

            <X size={26} />

          </button>

        </div>



        <form
          onSubmit={submit}
          className="p-8 space-y-8"
        >

          {/* GENERAL */}

          <div>

            <h3 className="text-xl font-semibold mb-5">

              General

            </h3>

            <div className="grid grid-cols-2 gap-6">

              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="input-field"
              />

            </div>

          </div>



          {/* PRICE */}

          <div>

            <h3 className="text-xl font-semibold mb-5">

              Pricing

            </h3>

            <div className="grid grid-cols-2 gap-6">

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

            </div>

          </div>
          {/* INVENTORY */}
          <div>

  <h3 className="text-xl font-semibold mb-5">

    Inventory

  </h3>

  <div className="grid grid-cols-3 gap-6">

    <input
      name="sku"
      placeholder="SKU"
      value={form.sku}
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
      type="number"
      name="lowStock"
      placeholder="Low stock alert"
      value={form.lowStock}
      onChange={handleChange}
      className="input-field"
    />

  </div>
  {/* SEO */}
  <div>

  <h3 className="text-xl font-semibold mb-5">

    SEO

  </h3>

  <input
    name="metaTitle"
    placeholder="Meta Title"
    value={form.metaTitle}
    onChange={handleChange}
    className="input-field mb-4"
  />

  <textarea
    rows={3}
    name="metaDescription"
    placeholder="Meta Description"
    value={form.metaDescription}
    onChange={handleChange}
    className="input-field"
  />

</div>

</div>



          {/* DESCRIPTION */}

          <div>

            <h3 className="text-xl font-semibold mb-5">

              Description

            </h3>

            <textarea
              rows={6}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input-field"
            />

          </div>



          {/* IMAGES */}

          <div>

            <h3 className="text-xl font-semibold mb-5">

              Images

            </h3>

            <label
              className="
                h-52
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

              <span className="mt-4">

                Upload Product Images

              </span>

              <input
                type="file"
                multiple
                hidden
                onChange={(e)=>
                  setImages([...e.target.files])
                }
              />

            </label>

          </div>



          {/* STATUS */}

          <div className="flex items-center gap-3">

            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />

            <span>

              Product Visible

            </span>

          </div>



          {/* FOOTER */}

          <div className="flex justify-end gap-4 pt-8 border-t">

            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >

              Cancel

            </button>

            <button
              className="btn-primary"
              type="submit"
            >

              {
                initialData
                  ? "Update Product"
                  : "Create Product"
              }

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default ProductModal;