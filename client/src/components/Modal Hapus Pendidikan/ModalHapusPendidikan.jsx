import React from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import Loader from "react-js-loader";

const ModalHapusPendidikan = ({
  setModal,
  index,
  profile,
  setLoading,
  loading,
  id,
}) => {
  const user = useSelector((state) => state.user.currentUser);

  const handleHapusPendidikan = async (index) => {
    setLoading(true);
    try {
      const filteredPendidikan = profile.pendidikanTerakhir.filter(
        (p, i) => i !== index
      );
      await userRequest.put("users/" + (id ? id : user._id), {
        pendidikanTerakhir: filteredPendidikan,
      });
      setModal({ hapus: false });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div class="black-bg" id="modal-hapus">
      <div class="modal-hapus-popup">
        <h1 class="header-hapus-popup">Hapus Data</h1>
        <p class="paragraf-hapus-popup">Anda yakin ingin menghapus data ini?</p>

        <div class="popup-buttons hapus-buttons">
          <button
            class="btn-detail buttons-popup bg-white"
            onClick={() => setModal({ hapusPendidikan: false })}
          >
            Batal
          </button>

          <button
            class="btn-detail buttons-popup bg-red"
            onClick={() => handleHapusPendidikan(index)}
          >
            {loading ? (
              <Loader
                type="spinner-default"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={40}
              />
            ) : (
              "Hapus"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHapusPendidikan;
