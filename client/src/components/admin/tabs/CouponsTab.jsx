import { useState } from "react";

import Section from "../Section";
import Field from "../Fie


function CouponsTab({
  coupons,
  couponService,
  refresh,
  actionLoading,
}) {

  const [form, setForm] = useState({
    code: "",
    discount: "",
    type: "percentage",
    expiryDate: "",
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const resetForm = () => {
    setForm({
      code: "",
      discount: "",
      type: "percentage",
      expiryDate: "",
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await couponService.createCoupon(form);

      alert(
        "Coupon created successfully"
      );

      resetForm();

      refresh();

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Failed to create coupon"
      );

    }
  };


  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this coupon?"
    );

    if (!confirmDelete) return;


    try {

      await couponService.deleteCoupon(id);

      alert(
        "Coupon deleted successfully"
      );

      refresh();

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Failed to delete coupon"
      );

    }

  };


  return (
    <div className="admin-tab">


      <Section title="Create Coupon">

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <Field
            label="Coupon Code"
            name="code"
            value={form.code}
            onChange={handleChange}
          />


          <Field
            label="Discount"
            name="discount"
            type="number"
            value={form.discount}
            onChange={handleChange}
          />


          <label>
            Discount Type
          </label>

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >

            <option value="percentage">
              Percentage
            </option>

            <option value="fixed">
              Fixed Amount
            </option>

          </select>


          <Field
            label="Expiry Date"
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
          />


          <button
            type="submit"
            disabled={actionLoading}
          >

            {actionLoading
              ? "Saving..."
              : "Create Coupon"}

          </button>


        </form>

      </Section>




      <Section
        title={`Coupons (${coupons.length})`}
      >

        {coupons.length === 0 ? (

          <p>
            No coupons found
          </p>

        ) : (

          <div className="admin-coupons-list">

            {coupons.map((coupon) => (

              <div
                key={coupon._id}
                className="admin-coupon-card"
              >

                <div>

                  <h3>
                    {coupon.code}
                  </h3>


                  <p>
                    Discount: {coupon.discount}
                    {coupon.type === "percentage"
                      ? "%"
                      : " TND"}
                  </p>


                  <p>
                    Expires:{" "}
                    {coupon.expiryDate
                      ? new Date(
                          coupon.expiryDate
                        ).toLocaleDateString()
                      : "No expiry"}
                  </p>

                </div>


                <button
                  onClick={() =>
                    handleDelete(coupon._id)
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


export default CouponsTab;