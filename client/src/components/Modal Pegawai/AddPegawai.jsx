import React, { useState } from "react";
import Loader from "react-js-loader";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";

const AddPegawai = ({ setModal, setRender, render }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [pegawai, setPegawai] = useState({
    nama: "",
    email: "",
    password: "",
    jabatan: "",
    nip: "",
    isAdmin: false,
  });
  const handleTambahPegawai = async () => {
    setLoading(true);
    try {
      await userRequest.post("auth/register", pegawai);
      setLoading(false);
      setModal({ tambah: false });
      setRender(!render);
      navigate("/pegawai", {
        state: { created: true, removed: false, updated: false },
      });
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="black-bg" id="modal-ubah-data">
      <div className="white-bg-popup-pendidikan">
        <h1 className="header-popup">Tambah Pegawai</h1>
        <hr className="hr-popup" />

        <div className="popup-list">
          <ul className="popup-list-template">
            <li>Nama</li>
            <li>Email</li>
            <li>Password</li>
            <li>Jabatan</li>
            <li>NIP</li>
            <li>Role</li>
          </ul>

          <ul className="popup-list-mid">
            <li>:</li>
            <li>:</li>
            <li>:</li>
            <li>:</li>
            <li>:</li>
            <li>:</li>
          </ul>

          <ul className="popup-list-input">
            <li>
              <input
                type="text"
                value={pegawai.nama}
                onChange={(e) =>
                  setPegawai({ ...pegawai, nama: e.target.value })
                }
                required
              />
            </li>
            <li>
              <input
                type="email"
                value={pegawai.email}
                onChange={(e) =>
                  setPegawai({ ...pegawai, email: e.target.value })
                }
                required
              />
            </li>
            <li>
              <input
                type="password"
                value={pegawai.password}
                onChange={(e) =>
                  setPegawai({ ...pegawai, password: e.target.value })
                }
                required
              />
            </li>
            <li>
              <input
                type="text"
                value={pegawai.jabatan}
                onChange={(e) =>
                  setPegawai({ ...pegawai, jabatan: e.target.value })
                }
                required
              />
            </li>
            <li>
              <input
                type="text"
                value={pegawai.nip}
                onChange={(e) =>
                  setPegawai({ ...pegawai, nip: e.target.value })
                }
                required
              />
            </li>
            <li>
              <select
                name=""
                id=""
                className="ml-2 w-full bg-white shadow-md border border-border-main-color"
                onChange={(e) =>
                  setPegawai({ ...pegawai, isAdmin: e.target.value })
                }
                required
              >
                <option value={false}>User</option>
                <option value={true}>Admin</option>
              </select>
            </li>
          </ul>
        </div>
        {error && <p className="text-sm text-red-400 my-2 start">{error}</p>}

        <div className="popup-buttons">
          <button
            className="text-black btn-detail buttons-popup background-white"
            onClick={() => setModal({ tambah: false })}
          >
            Batal
          </button>

          <button
            className="button-anchor btn-detail buttons-popup"
            onClick={handleTambahPegawai}
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

export default AddPegawai;
