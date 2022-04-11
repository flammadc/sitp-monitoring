import React from "react";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";

const ModalPendidikan = ({
  loading,
  setLoading,
  modal,
  setModal,
  tambahPendidikan,
  setTambahPendidikan,
  profile,
  id,
}) => {
  const user = useSelector((state) => state.user.currentUser);

  const handleTambahPendidikan = async () => {
    setLoading(true);
    try {
      await userRequest.put("users/" + (id ? id : user._id), {
        pendidikanTerakhir: [
          ...profile.pendidikanTerakhir,

          {
            jurusan: tambahPendidikan.jurusan,
            kampus: tambahPendidikan.kampus,
            negara: tambahPendidikan.negara,
            tahun: tambahPendidikan.tahun,
          },
        ],
      });
      setModal({ ...modal, pendidikan: false });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="black-bg" id="modal-tambah-pendidikan">
      <div className="white-bg-popup-pendidikan">
        <h1 className="header-popup">Tambah Riwayat Pendidikan</h1>
        <hr className="hr-popup" />

        <div className="popup-list">
          <ul className="popup-list-template">
            <li>Jurusan</li>
            <li>Kampus</li>
            <li>Negara</li>
            <li>Tahun</li>
          </ul>

          <ul className="popup-list-mid">
            <li>:</li>
            <li>:</li>
            <li>:</li>
            <li>:</li>
          </ul>

          <ul className="popup-list-input">
            <li>
              <input
                type="text"
                placeholder="S1 Akutansi"
                value={tambahPendidikan.jabatan}
                onChange={(e) =>
                  setTambahPendidikan({
                    ...tambahPendidikan,
                    jurusan: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Universitas Indonesia"
                value={tambahPendidikan.kampus}
                onChange={(e) =>
                  setTambahPendidikan({
                    ...tambahPendidikan,
                    kampus: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="Indonesia"
                value={tambahPendidikan.negara}
                onChange={(e) =>
                  setTambahPendidikan({
                    ...tambahPendidikan,
                    negara: e.target.value,
                  })
                }
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="2013-2016"
                value={tambahPendidikan.tahun}
                onChange={(e) =>
                  setTambahPendidikan({
                    ...tambahPendidikan,
                    tahun: e.target.value,
                  })
                }
              />
            </li>
          </ul>
        </div>

        <div className="popup-buttons">
          <button
            className="text-black btn-detail buttons-popup background-white"
            onClick={() => setModal({ ...modal, pendidikan: false })}
          >
            Batal
          </button>

          <button
            className="button-anchor btn-detail buttons-popup"
            onClick={handleTambahPendidikan}
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

export default ModalPendidikan;
