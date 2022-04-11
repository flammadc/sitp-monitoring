import React from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import Loader from "react-js-loader";

const ModalPengalaman = ({
  loading,
  setLoading,
  modal,
  setModal,
  tambahPengalaman,
  setTambahPengalaman,
  profile,
  id,
}) => {
  const user = useSelector((state) => state.user.currentUser);
  const handleTambahPengalaman = async () => {
    setLoading(true);
    try {
      await userRequest.put("users/" + (id ? id : user._id), {
        pengalaman: [
          ...profile.pengalaman,
          {
            jabatan: tambahPengalaman.jabatan,
            tempat: tambahPengalaman.tempat,
            masaKerja: tambahPengalaman.masaKerja,
          },
        ],
      });
      setModal({ ...modal, pengalaman: false });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="black-bg" id="modal-tambah-pengalaman">
      <div className="white-bg-popup-pendidikan">
        <h1 className="header-popup">Tambah Pengalaman</h1>
        <hr className="hr-popup" />

        <div className="popup-list">
          <ul className="popup-list-template">
            <li>Posisi Jabatan</li>
            <li>Tempat</li>
            <li>Masa Kerja</li>
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
                placeholder=" Manajer Akuntan"
                value={tambahPengalaman.jabatan}
                onChange={(e) =>
                  setTambahPengalaman({
                    ...tambahPengalaman,
                    jabatan: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <input
                type="text"
                placeholder=" Pt Indosat"
                value={tambahPengalaman.tempat}
                onChange={(e) =>
                  setTambahPengalaman({
                    ...tambahPengalaman,
                    tempat: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <input
                type="text"
                placeholder=" 2017-2020"
                value={tambahPengalaman.masaKerja}
                onChange={(e) =>
                  setTambahPengalaman({
                    ...tambahPengalaman,
                    masaKerja: e.target.value,
                  })
                }
              />
            </li>
          </ul>
        </div>

        <div className="popup-buttons">
          <button
            className="text-black btn-detail buttons-popup background-white"
            onClick={() => setModal({ ...modal, pengalaman: false })}
          >
            Batal
          </button>

          <button
            className="button-anchor btn-detail buttons-popup "
            onClick={handleTambahPengalaman}
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
              "Tambah"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPengalaman;
