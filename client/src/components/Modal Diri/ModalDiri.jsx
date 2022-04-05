import React, { useState } from "react";
import { userRequest } from "../../requestMethods";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";

const ModalDiri = ({
  setModal,
  loading,
  setLoading,
  dataDiri,
  setDataDiri,
}) => {
  const user = useSelector((state) => state.user.currentUser);

  const handleEditDiri = async () => {
    setLoading(true);
    try {
      await userRequest.put("/users/" + user._id, {
        nama: dataDiri.nama,
        nip: dataDiri.nip,
        noTelp: dataDiri.noTelp,
      });
      setModal(false);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="black-bg" id="modal-ubah-data">
      <div className="white-bg-popup">
        <h1 className="header-popup">Ubah Data Diri</h1>
        <hr className="hr-popup" />

        <div className="popup-list">
          <ul className="popup-list-template">
            <li>Nama</li>
            <li>No Telp</li>
            <li>NIP</li>
          </ul>

          <ul className="popup-list-mid">
            <li>:</li>
            <li>:</li>
            <li>:</li>
          </ul>

          <ul className="popup-list-input">
            <li>
              <input
                type="text"
                value={dataDiri.nama}
                onChange={(e) =>
                  setDataDiri({ ...dataDiri, nama: e.target.value })
                }
              />
            </li>
            <li>
              <input
                type="text"
                value={dataDiri.noTelp}
                onChange={(e) =>
                  setDataDiri({ ...dataDiri, noTelp: e.target.value })
                }
              />
            </li>
            <li>
              <input
                type="text"
                value={dataDiri.nip}
                onChange={(e) =>
                  setDataDiri({ ...dataDiri, nip: e.target.value })
                }
              />
            </li>
          </ul>
        </div>

        <div className="popup-buttons">
          <button
            className="text-black btn-detail buttons-popup background-white"
            onClick={() => setModal(false)}
          >
            Batal
          </button>

          <button
            className="button-anchor btn-detail buttons-popup"
            onClick={handleEditDiri}
            disabled={loading}
          >
            {loading ? (
              <Loader
                type="spinner-default"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={40}
              />
            ) : (
              "Ubah"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDiri;
