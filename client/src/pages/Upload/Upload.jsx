import React, { useState } from "react";
import "./upload.css";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState({
    judul: "",
    mulai: "",
    selesai: "",
    jenisKegiatan: "",
    lokasi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [dokumenPendukung, setDokumenPendukung] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    if (dokumenPendukung) {
      if (dokumenPendukung.size >= 5000000) {
        setError("Ukuran Maximum 5 MB");
        setLoading(false);
        return;
      }
      if (dokumenPendukung.type !== "application/pdf") {
        setError("File PDF only");
        setLoading(false);
        return;
      }
      data.append("name", dokumenPendukung.name);
      data.append("file", dokumenPendukung);
    }
    data.append("id_user", user._id);
    data.append("judul", laporan.judul);
    data.append("mulai", laporan.mulai);
    data.append("selesai", laporan.selesai);
    data.append("jenisKegiatan", laporan.jenisKegiatan);
    data.append("lokasi", laporan.lokasi);
    try {
      const res = await userRequest.post("/activities", data);
      navigate("/data");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      navigate("/data");
    }
  };

  return (
    <div className="upload-box">
      <form className="content-upload-box" onSubmit={handleSubmit}>
        <h1 className="header-upload-box">Buat Laporan Tugas</h1>
        <div className="list-content">
          <label className="label-text" htmlFor="nama">
            Nama Kegiatan
          </label>
          <input
            className="input-text"
            type="text"
            id="nama"
            value={laporan.judul}
            onChange={(e) => setLaporan({ ...laporan, judul: e.target.value })}
            required
          />
        </div>
        <div className="list-content">
          <label className="label-text" htmlFor="mulai">
            Tanggal Mulai
          </label>
          <input
            className="input-text"
            type="date"
            id="mulai"
            value={laporan.mulai}
            onChange={(e) => setLaporan({ ...laporan, mulai: e.target.value })}
            required
          />
        </div>
        <div className="list-content">
          <label className="label-text" htmlFor="selesai">
            Tanggal Selesai
          </label>
          <input
            className="input-text"
            type="date"
            id="selesai"
            value={laporan.selesai}
            onChange={(e) =>
              setLaporan({ ...laporan, selesai: e.target.value })
            }
            required
          />
        </div>
        <div className="list-content">
          <label className="label-text" htmlFor="kegiatan">
            Jenis Kegiatan
          </label>
          <input
            className="input-text"
            type="text"
            id="kegiatan"
            value={laporan.jenisKegiatan}
            onChange={(e) =>
              setLaporan({ ...laporan, jenisKegiatan: e.target.value })
            }
            required
          />
        </div>
        <div className="list-content">
          <label className="label-text" htmlFor="lokasi">
            Lokasi
          </label>
          <input
            className="input-text"
            type="text"
            id="lokasi"
            value={laporan.lokasi}
            onChange={(e) => setLaporan({ ...laporan, lokasi: e.target.value })}
            required
          />
        </div>

        <div className="list-file">
          <label className="header-file">Tambahkan File</label>
          <div className="section-file">
            <label className="label-file" htmlFor="upload">
              Browse...
            </label>
            <input
              className="input-file"
              id="upload"
              type="file"
              onChange={(e) => setDokumenPendukung(e.target.files[0])}
            />
            {dokumenPendukung && (
              <div className="div w-full ml-3 font-medium font-Poppins text-gray-500">
                {dokumenPendukung.name}
              </div>
            )}
          </div>
          {error && (
            <p className="text-md text-red-600 font-bold">File PDF Only</p>
          )}
        </div>

        <button
          className={
            loading
              ? "upload-button upload-anchor bg-[#57a6f5] cursor-not-allowed"
              : "upload-button upload-anchor bg-[#0d8bff]"
          }
          type="submit"
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
            <>Upload</>
          )}
        </button>
      </form>
    </div>
  );
};

export default Upload;
