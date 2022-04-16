import React, { useState } from "react";
import "./upload.css";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

const Upload = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [dokumentasi, setDokumentasi] = useState([]);
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

        <div className="list-content">
          <label className="label-text">Jumlah peserta</label>
          <div className="internal ml-3">
            <div className="flex gap-2 items-center">
              <div className="w-[10px] h-[10px] bg-[#C4C4C4] rounded-full"></div>
              <div className="font-Poppins text-base font-medium text-struktur">Internal :</div>
              <input className="w-[52px] font-Poppins text-base font-medium text-input text-center border-b" placeholder="20" type="number" />
            </div>

            <div className="flex gap-10 items-center ml-5">

              <div className="flex gap-2 items-center">
                <input className="w-[10px] h-[10px] border-2 border-[#C4C4C4] rounded-none" type="checkbox" id="psie" />
                <label className="font-Poppins text-base font-medium text-struktur" htmlFor="psie">PSIE</label>
              </div>

              <div className="flex gap-2 items-center">
                <input className="w-[10px] h-[10px] border-2 border-[#C4C4C4] rounded-none" type="checkbox" id="psii" />
                <label className="font-Poppins text-base font-medium text-struktur" htmlFor="psii">PSII</label>
              </div>

              <div className="flex gap-2 items-center">
                <input className="w-[10px] h-[10px] border-2 border-[#C4C4C4] rounded-none" type="checkbox" id="pssip" />
                <label className="font-Poppins text-base font-medium text-struktur" htmlFor="pssip">PSSIP</label>
              </div>

              <div className="flex gap-2 items-center">
                <input className="w-[10px] h-[10px] border-2 border-[#C4C4C4] rounded-none" type="checkbox" id="DDDDDD" />
                <label className="font-Poppins text-base font-medium text-struktur" htmlFor="DDDDDD">DDDDDD</label>
              </div>

              <div className="flex gap-2 items-center">
                <input className="w-[10px] h-[10px] border-2 border-[#C4C4C4] rounded-none" type="checkbox" id="EEEEEE" />
                <label className="font-Poppins text-base font-medium text-struktur" htmlFor="EEEEEE">EEEEEE</label>
              </div>

              <div className="flex gap-2 items-center">
                <input className="w-[10px] h-[10px] border-2 border-[#C4C4C4] rounded-none" type="checkbox" id="FFFFFF" />
                <label className="font-Poppins text-base font-medium text-struktur" htmlFor="FFFFFF">FFFFFF</label>
              </div>

            </div>



          </div>
          <div className="eksternal ml-3">
            <div className="flex gap-2 items-center">
              <div className="w-[10px] h-[10px] bg-[#C4C4C4] rounded-full"></div>
              <div className="font-Poppins text-base font-medium text-struktur">Eksternal :</div>
              <input className="w-[52px] font-Poppins text-base font-medium text-input text-center border-b" placeholder="20" type="number" />
            </div>
            <button className="w-[160px] h-[30px] mt-4 border rounded-sm bg-[#F7F7FC] border-[#DCDBDB] font-Poppins text-sm font-medium text-struktur">Total Peserta</button>
          </div>
        </div>

        <div className="list-content">
          <label className="label-text">Tambahkan File</label>
          <div className="ml-3">
            <div className="">
              <div className="flex gap-2 items-center">
                <div className="w-[10px] h-[10px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins text-base font-medium text-struktur">Undangan</div>
              </div>
              <div className="section-file mt-[6px]">
                <label className="label-file" htmlFor="undangan">
                  Browse...
                </label>
                <input
                  className="input-file"
                  id="undangan"
                  type="file"
                  onChange={(e) => setDokumenPendukung(e.target.files[0])}
                />
                {dokumenPendukung && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-gray-500">
                    {dokumenPendukung.name}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <div className="flex gap-2 items-center">
                <div className="w-[10px] h-[10px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins text-base font-medium text-struktur">Surat Tugas</div>
              </div>
              <div className="section-file mt-[6px]">
                <label className="label-file" htmlFor="tugas">
                  Browse...
                </label>
                <input
                  className="input-file"
                  id="tugas"
                  type="file"
                  onChange={(e) => setDokumenPendukung(e.target.files[0])}
                />
                {dokumenPendukung && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-gray-500">
                    {dokumenPendukung.name}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 mb-[237px]">
              <div className="flex gap-2 items-center">
                <div className="w-[10px] h-[10px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins text-base font-medium text-struktur">Daftar Hadir</div>
              </div>
              <div className="section-file mt-[6px]">
                <label className="label-file" htmlFor="kehadiran">
                  Browse...
                </label>
                <input
                  className="input-file"
                  id="kehadiran"
                  type="file"
                  onChange={(e) => setDokumenPendukung(e.target.files[0])}
                />
                {dokumenPendukung && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-gray-500">
                    {dokumenPendukung.name}
                  </div>
                )}
              </div>
            </div>

          </div>






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
