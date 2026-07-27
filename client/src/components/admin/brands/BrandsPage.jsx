import { useState } from "react";

import BrandsTable from "./BrandsTable";
import BrandModal from "./BrandModal";
import DeleteBrandModal from "./DeleteBrandModal";


function BrandsPage({
  brands = [],
  createBrand,
  updateBrand,
  deleteBrand,
  refresh,
}) {


  const [modalOpen,setModalOpen] = useState(false);

  const [editingBrand,setEditingBrand] = useState(null);

  const [deleteOpen,setDeleteOpen] = useState(false);

  const [brandToDelete,setBrandToDelete] = useState(null);




  const handleEdit = (brand)=>{

    setEditingBrand(brand);

    setModalOpen(true);

  };





  const handleDelete = (brand)=>{

    setBrandToDelete(brand);

    setDeleteOpen(true);

  };






  return (

    <div className="space-y-6">


      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-200
          p-6
          flex
          justify-between
          items-center
        "
      >


        <div>

          <h1 className="text-3xl font-semibold">

            Brands

          </h1>


          <p className="text-gray-500 mt-2">

            Manage eyewear brands.

          </p>

        </div>



        <button

          onClick={()=>{

            setEditingBrand(null);

            setModalOpen(true);

          }}

          className="
            px-5
            py-3
            rounded-xl
            bg-black
            text-white
          "

        >

          Add Brand

        </button>


      </div>





      <BrandsTable

        brands={brands}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />






      <BrandModal

        open={modalOpen}

        initialData={editingBrand}

        onClose={()=>{

          setModalOpen(false);

          setEditingBrand(null);

        }}

        onSave={async(data)=>{


          let result;


          if(editingBrand){

            result =
              await updateBrand(
                editingBrand._id,
                data
              );


          }else{


            result =
              await createBrand(data);


          }



          alert(result.message);



          if(result.success){

            setModalOpen(false);

            setEditingBrand(null);

          }



        }}

      />






      <DeleteBrandModal

        open={deleteOpen}

        brand={brandToDelete}

        onCancel={()=>{

          setDeleteOpen(false);

          setBrandToDelete(null);

        }}


        onConfirm={async()=>{


          const result =
            await deleteBrand(
              brandToDelete._id
            );


          alert(result.message);



          if(result.success){

            setDeleteOpen(false);

            setBrandToDelete(null);


          }



        }}

      />



    </div>

  );

}


export default BrandsPage;