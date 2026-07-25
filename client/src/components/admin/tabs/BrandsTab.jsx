import { useState } from "react";

import Section from "./Section";
import Field from "./Field";


function BrandsTab({
  brands,
  brandService,
  refresh,
  actionLoading,
}) {

  const [form, setForm] = useState({
    name: "",
    description: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const resetForm = () => {
    setForm({
      name: "",
      description: "",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await brandService.createBrand(form);

      alert(
        "Brand created successfully"
      );

      resetForm();

      refresh();

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Failed to create brand"
      );

    }
  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this brand?"
    );

    if (!confirmDelete) return;


    try {

      await brandService.deleteBrand(id);

      alert(
        "Brand deleted successfully"
      );

      refresh();

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Failed to delete brand"
      );

    }

  };


  return (
    <div className="admin-tab">


      <Section title="Create Brand">

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <Field
            label="Brand Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />


          <Field
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            textarea
          />


          <button
            type="submit"
            disabled={actionLoading}
          >

            {actionLoading
              ? "Saving..."
              : "Create Brand"}

          </button>


        </form>

      </Section>




      <Section
        title={`Brands (${brands.length})`}
      >

        {brands.length === 0 ? (

          <p>
            No brands found
          </p>

        ) : (

          <div className="admin-brands-list">

            {brands.map((brand) => (

              <div
                key={brand._id}
                className="admin-brand-card"
              >

                <div>

                  <h3>
                    {brand.name}
                  </h3>


                  <p>
                    {brand.description ||
                      "No description"}
                  </p>


                </div>


                <button
                  onClick={() =>
                    handleDelete(brand._id)
                  }
                >
                  Delete
                </button>


              </div>

            ))}

          </div>

        )}

      </Section>


    </div>
  );
}


export default BrandsTab;