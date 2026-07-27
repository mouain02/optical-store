import { useEffect, useState } from "react";
import { X } from "lucide-react";

function CouponModal({
  open,
  initialData,
  onClose,
  onSave,
}) {

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {

    if (initialData) {

      setCode(initialData.code || "");

      setDiscount(initialData.discount || "");

      setExpiryDate(

        initialData.expiryDate
          ? new Date(initialData.expiryDate)
              .toISOString()
              .split("T")[0]
          : ""

      );

      setActive(initialData.active !== false);

    } else {

      setCode("");
      setDiscount("");
      setExpiryDate("");
      setActive(true);

    }

  }, [initialData, open]);



  if (!open) return null;



  const handleSubmit = async (e) => {

    e.preventDefault();

    await onSave({

      code,

      discount: Number(discount),

      expiryDate,

      active,

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
          md:w-[520px]
          bg-white
          z-50
          shadow-2xl
          overflow-y-auto
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
                ? "Edit Coupon"
                : "Create Coupon"
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

            <X size={20} />

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

              Coupon Code

            </label>

            <input

              value={code}

              onChange={(e)=>
                setCode(
                  e.target.value.toUpperCase()
                )
              }

              required

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

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

              Discount %

            </label>

            <input

              type="number"

              min="1"

              max="100"

              value={discount}

              onChange={(e)=>
                setDiscount(e.target.value)
              }

              required

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "

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

              Expiration Date

            </label>

            <input

              type="date"

              value={expiryDate}

              onChange={(e)=>
                setExpiryDate(e.target.value)
              }

              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
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

            <span className="font-medium">

              Active Coupon

            </span>

            <input

              type="checkbox"

              checked={active}

              onChange={(e)=>
                setActive(e.target.checked)
              }

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

            Save Coupon

          </button>

        </form>

      </div>

    </>

  );

}

export default CouponModal;