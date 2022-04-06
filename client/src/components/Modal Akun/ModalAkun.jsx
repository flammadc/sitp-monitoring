import React from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import Loader from "react-js-loader";

const ModalAkun = ({
  dataAkun,
  setDataAkun,
  modal,
  setModal,
  loading,
  setLoading,
  id,
}) => {
  const user = useSelector((state) => state.user.currentUser);
  const handleEditAkun = async () => {
    setLoading(true);
    try {
      await userRequest.put("/users/" + (id ? id : user._id), {
        email: dataAkun.email,
        password: dataAkun.password,
      });
      setModal({ dataAkun: false });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="black-bg" id="modal-ubah-akun">
      <div className="white-bg-popup">
        <h1 className="header-popup">Ubah Data Akun</h1>
        <hr className="hr-popup" />

        <div className="popup-list">
          <ul className="popup-list-template">
            <li>Email</li>
            <li>Password</li>
          </ul>

          <ul className="popup-list-mid">
            <li>:</li>
            <li>:</li>
          </ul>

          <ul className="popup-list-input">
            <li>
              <input
                type="email"
                value={dataAkun.email}
                onChange={(e) =>
                  setDataAkun({ ...dataAkun, email: e.target.value })
                }
              />
            </li>
            <li>
              <input
                type="password"
                value={dataAkun.password}
                onChange={(e) =>
                  setDataAkun({ ...dataAkun, password: e.target.value })
                }
              />
            </li>
          </ul>
        </div>

        <div className="popup-buttons">
          <button
            className="text-black btn-detail buttons-popup background-white"
            onClick={() => setModal({ ...modal, dataAkun: false })}
          >
            Batal
          </button>

          <button
            className="button-anchor btn-detail buttons-popup"
            onClick={handleEditAkun}
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

export default ModalAkun;
