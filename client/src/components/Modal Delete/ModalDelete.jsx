import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import Loader from "react-js-loader";

const ModalDelete = ({ setModalDelete, idLaporan }) => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const handleDeleteLaporan = async () => {
    setLoading(true);
    try {
      await userRequest.delete("activities/" + idLaporan);
      setLoading(false);
      navigate("/data", { state: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-overlay-color z-50">
      <div className="w-[70vw] md:w-[50vw] lg:w-[35vw] fixed  z-50 min-h-52  grid grid-cols-12 bg-white  shadow-lg font-Lato px-12 py-9 rounded-md ">
        <div className="text-base sm:text-2xl text-center mb-2 col-span-12 font-bold">
          Hapus Data
        </div>
        <div className="text-sm md:text-lg text-center mb-7 col-span-12">
          Anda Yakin Hapus Data Ini ?
        </div>
        <div className="col-span-12 flex flex-row items-center justify-center">
          <button
            className="h-12 min-w-max w-52 mr-5 bg-white border-2 rounded-md border-border-main-color"
            onClick={() => setModalDelete(false)}
          >
            Batal
          </button>
          <button
            className="h-12 min-w-max w-52 bg-red-400  rounded-md  text-white flex items-center justify-center"
            onClick={handleDeleteLaporan}
          >
            {loading ? (
              <Loader
                type="spinner-default"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={40}
              />
            ) : (
              "Ya, Hapus"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
