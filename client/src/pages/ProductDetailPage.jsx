import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import {
  productService,
  wishlistService,
  prescriptionService,
} from "../services";

import { addToCart } from "../redux/slices/cartSlice";

import {
  getEffectivePrice,
} from "../utils/helpers";

import Loader from "../components/common/Loader";

import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import ProductPurchase from "../components/product/ProductPurchase";
import ProductDetails from "../components/product/ProductDetails";
import ProductCard from "../components/product/ProductCard";

import LensCustomizer from "../components/product/LensCustomizer";
import TryOnModal from "../components/TryOn/TryOnModal";


export default function ProductDetailPage() {

  const { slug } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const [lensOptions, setLensOptions] = useState(null);

  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRx, setSelectedRx] = useState("");

  const [inWishlist, setInWishlist] = useState(false);

  const [showTryOn, setShowTryOn] = useState(false);



  useEffect(() => {

    productService
      .getBySlug(slug)
      .then((res) => {

        setData(res);

        const product = res.product;


        setColor(product.colors?.[0] || "");
        setSize(product.sizes?.[0] || "");


        if (product.supportsLensCustomization) {
          setLensOptions({
            type: "single",
            treatments: []
          });
        }

      })
      .finally(() => setLoading(false));


  }, [slug]);





  useEffect(() => {

    if (!user || !data?.product)
      return;


    prescriptionService
      .getAll()
      .then(setPrescriptions)
      .catch(() => { });


    wishlistService
      .getAll()
      .then((list) => {

        setInWishlist(
          list.some(
            (p) => p._id === data.product._id
          )
        );

      })
      .catch(() => { });


  }, [user, data]);





  if (loading)
    return <Loader />;


  if (!data)
    return (
      <div className="py-20 text-center">
        {t("common.error")}
      </div>
    );




  const {
    product,
    related
  } = data;



  const price =
    getEffectivePrice(product);




  const handleAddToCart = () => {


    dispatch(

      addToCart({

        product,

        quantity: 1,

        variant: {
          color,
          size
        },

        lensOptions:
          product.supportsLensCustomization
            ? lensOptions
            : null,


        prescription:
          selectedRx || null

      })

    );

  };





  const toggleWishlist = async () => {

    if (!user)
      return;


    if (inWishlist) {

      await wishlistService.remove(product._id);

      setInWishlist(false);

    }
    else {

      await wishlistService.add(product._id);

      setInWishlist(true);

    }

  };






  return (

    <div className="
      section-padding
      py-12
    ">



      <div className="
  grid
  grid-cols-1
  lg:grid-cols-[2.5fr_1fr]
  gap-10
  items-start
">




        {/* LEFT SIDE */}

        <div
          className="
            lg:col-span-8
          "
        >


          <ProductGallery
            images={images}
            productName={product.name}
          />




          <ProductDetails

            product={product}

          />




        </div>








        {/* RIGHT SIDE */}

        <div
          className="
            lg:col-span-4
          "
        >


          <div
            className="
              sticky
              top-24
            "
          >


            <ProductInfo

              product={product}

              price={price}

              onTryOn={() =>
                setShowTryOn(true)
              }

            />



            <div className="
              mt-8
            ">


              <ProductPurchase

                product={product}

                onAddToCart={handleAddToCart}

                onWishlist={
                  user
                    ? toggleWishlist
                    : null
                }

                inWishlist={inWishlist}

              />


            </div>



          </div>


        </div>





      </div>







      {/* Lens customization */}

      {product.supportsLensCustomization && lensOptions && (

        <div className="mt-16">

          <LensCustomizer

            framePrice={price}

            lensOptions={lensOptions}

            onChange={setLensOptions}

          />

        </div>

      )}







      {/* Prescription */}

      {(product.requiresPrescription ||
        product.category === "prescription") &&

        user &&

        prescriptions.length > 0 &&

        (

          <div className="mt-16">

            <select

              value={selectedRx}

              onChange={(e) =>
                setSelectedRx(e.target.value)
              }

              className="input-field"

            >

              <option value="">
                Select prescription
              </option>


              {prescriptions.map((rx) => (

                <option
                  key={rx._id}
                  value={rx._id}
                >
                  {rx.label}
                </option>

              ))}


            </select>


          </div>

        )}








      {/* Related Products */}

      {related?.length > 0 && (

        <section className="mt-20">


          <h2 className="
            text-3xl
            uppercase
            tracking-widest
            mb-8
          ">
            You may also like
          </h2>


          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-6
          ">


            {related.map((p) => (

              <ProductCard
                key={p._id}
                product={p}
              />

            ))}


          </div>


        </section>

      )}








      <TryOnModal

        isOpen={showTryOn}

        onClose={() =>
          setShowTryOn(false)
        }

        product={product}

      />



    </div>

  );

}