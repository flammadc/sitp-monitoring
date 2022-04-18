import React, { useState } from "react";
import "./upload.css";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import avatar from "../../assets/img/avatar.png";

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
          <div className="internal sm:ml-3">
            <div className="flex gap-2 items-center">
              <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
              <div className="font-Poppins sm:text-base sm:font-medium text-sm font-normal text-struktur">
                Internal :
              </div>
              <input
                className="sm:w-[52px] w-[40px] font-Poppins sm:text-sm sm:font-medium text-xs font-normal text-[#474444] text-center border-b border-struktur"
                placeholder="20"
                type="number"
              />
            </div>

            <div className="flex flex-wrap sm:gap-10 gap-y-1 gap-x-14 items-center sm:mt-3 mt-2  sm:ml-[18px] ml-[15px]">
              <div className="flex gap-2 items-center">
                <input
                  className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                  type="checkbox"
                  id="kel1"
                />
                <label
                  className="font-Poppins sm:text-base text-xs font-medium text-struktur"
                  htmlFor="kel1"
                >
                  Kelompok 1
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                  type="checkbox"
                  id="kel2"
                />
                <label
                  className="font-Poppins sm:text-base text-xs font-medium text-struktur"
                  htmlFor="kel2"
                >
                  Kelompok 2
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                  type="checkbox"
                  id="kel3"
                />
                <label
                  className="font-Poppins sm:text-base text-xs font-medium text-struktur"
                  htmlFor="kel3"
                >
                  Kelompok 3
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                  type="checkbox"
                  id="kel4"
                />
                <label
                  className="font-Poppins sm:text-base text-xs font-medium text-struktur"
                  htmlFor="kel4"
                >
                  Kelompok 4
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                  type="checkbox"
                  id="kel5"
                />
                <label
                  className="font-Poppins sm:text-base text-xs font-medium text-struktur"
                  htmlFor="kel5"
                >
                  Kelompok 5
                </label>
              </div>

              <div className="flex gap-2 items-center">
                <input
                  className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                  type="checkbox"
                  id="kel6"
                />
                <label
                  className="font-Poppins sm:text-base text-xs font-medium text-struktur"
                  htmlFor="kel6"
                >
                  Kelompok 6
                </label>
              </div>
            </div>
          </div>
          <div className="eksternal sm:ml-3">
            <div className="flex gap-2 items-center">
              <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
              <div className="font-Poppins  sm:text-base sm:font-medium text-sm font-normal text-struktur">
                Eksternal :
              </div>
              <input
                className="sm:w-[52px] w-[40px] font-Poppins sm:text-sm sm:font-medium text-xs font-normal text-[#474444] text-center border-b border-struktur"
                placeholder="20"
                type="number"
              />
            </div>
            <div className="flex gap-2 items-center sm:mt-3 mt-[6px] sm:ml-[18px] ml-[15px]">
              <div className="font-Poppins  sm:text-sm text-xs font-medium text-struktur">
                Nama Kantor :
              </div>
              <input
                className="w-40 font-Poppins sm:text-sm sm:font-medium text-xs font-normal text-[#474444] text-center border-b border-struktur"
                placeholder="Lenovo Jakarta"
                type="text"
              />
            </div>
          </div>

          <div className="sm:ml-3">
            <div className="flex gap-2 items-center">
              <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
              <div className="font-Poppins  sm:text-base sm:font-medium text-sm font-normal text-struktur">
                Total Peserta :
              </div>
            </div>
            <input
              placeholder="Total Peserta"
              type="text"
              className="w-[168px] h-[30px] text-center sm:mt-4 mt-2 sm:ml-[18px] border rounded-sm bg-[#F7F7FC] border-[#DCDBDB] font-Poppins sm:text-sm sm:font-medium text-xs font-normal text-struktur"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-Poppins text-sm font-semibold text-font-sec sm:text-lg sm:font-medium">
            Tambahkan File
          </h1>
          <div className="sm:ml-3 mt-3 sm:mt-6">
            <div className="">
              <label
                htmlFor="undangan"
                className="flex sm:gap-2 gap-3 items-center"
              >
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                  Undangan
                </div>
              </label>
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
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {dokumenPendukung.name}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="tugas"
                className="flex sm:gap-2 gap-3 items-center"
              >
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                  Surat Tugas
                </div>
              </label>
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
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {dokumenPendukung.name}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="kehadiran"
                className="flex sm:gap-2 gap-3 items-center"
              >
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                  Daftar Hadir
                </div>
              </label>
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
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {dokumenPendukung.name}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="dokumentasi"
                className="flex sm:gap-2 gap-3 items-center"
              >
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                  Dokumentasi
                </div>
              </label>
              <div className="flex gap-4 sm:gap-6">
                <div className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] mt-[6px] border bg-white flex items-center justify-center ">
                  <img src={avatar} alt="" />
                  <input className="hidden" type="file" id="dokumentasi" />
                </div>
                <div className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] mt-[6px] border bg-white flex items-center justify-center ">
                  <label htmlFor="dokumentasi">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="sm:h-[50px] sm:w-[50px] w-[20px] h-[20px] fill-black"
                      fill="black"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="none"
                        stroke-linejoin="none"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </label>
                  <input className="hidden" type="file" id="dokumentasi" />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label
                htmlFor="dokumen"
                className="flex sm:gap-2 gap-3 items-center"
              >
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                  Dokumen Lainnnya{" "}
                  <span className="text-[#ff768d]">(jika ada)</span>
                </div>
              </label>

              <div className="section-file mt-[6px]">
                <label className="label-file" htmlFor="dokumen">
                  Browse...
                </label>
                <input
                  className="input-file"
                  id="dokumen"
                  type="file"
                  onChange={(e) => setDokumenPendukung(e.target.files[0])}
                />
                {dokumenPendukung && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {dokumenPendukung.name}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3">
              <div className="list-content">
                <label
                  className="flex sm:gap-2 gap-3 items-center"
                  htmlFor="linkPendukung"
                >
                  <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                  <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                    Link Pendukung{" "}
                    <span className="text-[#ff768d]">(jika ada)</span>
                  </div>
                </label>
                <input
                  className="grid-cols-12 border border-border-main-color sm:h-10 h-9 pl-[10px] text-main-blue bg-white"
                  type="text"
                  id="linkPendukung"
                  value={laporan.linkPendukung}
                  onChange={(e) =>
                    setLaporan({ ...laporan, linkPendukung: e.target.value })
                  }
                  required
                />
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
