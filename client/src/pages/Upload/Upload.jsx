import React, { useState } from "react";
import "./upload.css";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Upload = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [dokumentasi, setDokumentasi] = useState([]);
  const [internal, setInternal] = useState({
    jumlah: 0,
    kelompok: [false, false, false, false, false],
  });
  const [kelompok, setKelompok] = useState([
    "PSSIP",
    "PSIE",
    "PSII",
    "PDIKI",
    "PSDIP",
  ]);
  const [eksternal, setEksternal] = useState({ nama: "", jumlah: 0 });
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState({
    judul: "",
    mulai: "",
    selesai: "",
    jenisKegiatan: "",
    lokasi: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  const [documents, setDocuments] = useState({
    undangan: undefined,
    suratTugas: undefined,
    daftarHadir: undefined,
    dokumenLainnya: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let undangan;
    let suratTugas;
    let daftarHadir;
    let dokumenLainnya;
    let dokumentasiImages = [];

    if (documents.undangan) {
      undangan = await uploadFile(
        documents.undangan.name,
        documents.undangan,
        "sitp/undangan"
      );
    }
    if (documents.suratTugas) {
      suratTugas = await uploadFile(
        documents.suratTugas.name,
        documents.suratTugas,
        "sitp/surat_tugas"
      );
    }
    if (documents.daftarHadir) {
      daftarHadir = await uploadFile(
        documents.daftarHadir.name,
        documents.daftarHadir,
        "sitp/daftar_hadir"
      );
    }
    if (documents.dokumenLainnya) {
      dokumenLainnya = await uploadFile(
        documents.dokumenLainnya.name,
        documents.dokumenLainnya,
        "sitp/dokumen_lainnya"
      );
    }

    if (dokumentasi.length > 0) {
      for (let dok of dokumentasi) {
        const res = await uploadFile(dok.name, dok, "sitp/dokumentasi");
        dokumentasiImages.push(res);
      }
    }

    try {
      const res = await userRequest.post("/activities", {
        id_user: user._id,
        ...laporan,
        internal: [{ jumlah: internal.jumlah, kelompok: filterKelompok() }],
        eksternal: [{ jumlah: eksternal.jumlah, nama: eksternal.nama }],
        undangan,
        suratTugas,
        daftarHadir,
        dokumenLainnya,
        dokumentasi: dokumentasiImages,
      });
      navigate("/data/detail/" + res.data._id, {
        state: { updated: false, created: true },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleGroupChange = (index) => {
    const updatedCheckedState = internal.kelompok.map((item, i) =>
      i === index ? !item : item
    );
    setInternal({ ...internal, kelompok: updatedCheckedState });
  };

  const filterKelompok = () => {
    return internal.kelompok.map((k, i) => k === true && kelompok[i]);
  };

  const handleDeleteDokumentasi = (index) => {
    setDokumentasi(dokumentasi.filter((d, i) => i !== index));
  };

  const uploadFile = async (name, file, folder) => {
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    data.append("folder", folder);
    try {
      const res = await userRequest.post("activities/upload", data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearData = () => {
    setLaporan({
      judul: "",
      mulai: "",
      selesai: "",
      jenisKegiatan: "",
      lokasi: "",
      link: "",
    });
    setDocuments({
      undangan: undefined,
      suratTugas: undefined,
      daftarHadir: undefined,
      dokumenLainnya: undefined,
    });
    setDokumentasi([]);
    setInternal({
      jumlah: 0,
      kelompok: [false, false, false, false, false, false],
    });
    setEksternal({ nama: "", jumlah: 0 });
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
                value={internal.jumlah}
                min={0}
                type="number"
                onChange={(e) =>
                  setInternal({ ...internal, jumlah: parseInt(e.target.value) })
                }
              />
              <p className="font-Poppins  sm:text-base sm:font-medium text-sm font-normal text-struktur">
                peserta
              </p>
            </div>

            <div className="flex flex-wrap sm:gap-10 gap-y-1 gap-x-14 items-center sm:mt-3 mt-2  sm:ml-[18px] ml-[15px]">
              {internal.kelompok.map((k, i) => {
                return (
                  <div className="flex gap-2 items-center">
                    <input
                      className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                      type="checkbox"
                      id={kelompok[i]}
                      value={kelompok[i]}
                      onChange={() => handleGroupChange(i)}
                    />
                    <label
                      className="font-Poppins sm:text-base text-xs font-medium text-struktur"
                      htmlFor={kelompok[i]}
                    >
                      {kelompok[i]}
                    </label>
                  </div>
                );
              })}
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
                value={eksternal.jumlah}
                min={0}
                type="number"
                onChange={(e) =>
                  setEksternal({
                    ...eksternal,
                    jumlah: parseInt(e.target.value),
                  })
                }
              />
              <p className="font-Poppins  sm:text-base sm:font-medium text-sm font-normal text-struktur">
                peserta
              </p>
            </div>
            <div className="flex gap-2 items-center sm:mt-3 mt-[6px] sm:ml-[18px] ml-[15px]">
              <div className="font-Poppins  sm:text-sm text-xs font-medium text-struktur">
                Nama Kantor :
              </div>
              <input
                className="w-40 font-Poppins sm:text-sm sm:font-medium text-xs font-normal pl-2 text-[#474444] border-b border-struktur"
                value={eksternal.nama}
                onChange={(e) =>
                  setEksternal({ ...eksternal, nama: e.target.value })
                }
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
              value={internal.jumlah + eksternal.jumlah}
              disabled
              className="w-[168px] h-[30px] text-center sm:mt-4 mt-2 sm:ml-[18px] border rounded-sm bg-[#F7F7FC] border-[#DCDBDB] font-Poppins sm:text-sm sm:font-medium text-xs font-normal text-struktur"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-Poppins text-sm font-semibold text-font-sec sm:text-lg sm:font-medium">
            Tambahkan File ( Pdf For Documents )
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
                  onChange={(e) =>
                    setDocuments({
                      ...documents,
                      undangan: e.target.files[0],
                    })
                  }
                />
                {documents?.undangan && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {documents.undangan.name}
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
                  onChange={(e) =>
                    setDocuments({
                      ...documents,
                      suratTugas: e.target.files[0],
                    })
                  }
                />
                {documents?.suratTugas && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {documents.suratTugas.name}
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
                  onChange={(e) =>
                    setDocuments({
                      ...documents,
                      daftarHadir: e.target.files[0],
                    })
                  }
                />
                {documents?.daftarHadir && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {documents.daftarHadir.name}
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
              <div className="flex gap-4 sm:gap-6 flex-wrap">
                {dokumentasi?.length > 0 &&
                  dokumentasi.map((d, i) => {
                    return (
                      <div className="relative dokumentasi-img-container">
                        <img
                          src={URL.createObjectURL(d)}
                          className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] border object-cover"
                        />
                        <span className="dokumentasi-img-hover sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] absolute bg-overlay-color inset-0 items-center justify-center hidden">
                          <AiOutlineClose
                            className="text-4xl text-gray-300 hover:cursor-pointer hover:text-white"
                            onClick={() => handleDeleteDokumentasi(i)}
                          />
                        </span>
                      </div>
                    );
                  })}

                <div className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] mt-[6px] border bg-white flex items-center justify-center ">
                  <label htmlFor="dokumentasi" className="hover:cursor-pointer">
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
                  <input
                    className="hidden"
                    type="file"
                    id="dokumentasi"
                    onChange={(e) =>
                      e.target.files.length &&
                      setDokumentasi([...dokumentasi, e.target.files[0]])
                    }
                  />
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
                  onChange={(e) =>
                    setDocuments({
                      ...documents,
                      dokumenLainnya: e.target.files[0],
                    })
                  }
                />
                {documents?.dokumenLainnya && (
                  <div className="div w-full ml-3 font-medium font-Poppins text-main-blue">
                    {documents.dokumenLainnya.name}
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
                    <span className="text-[#ff768d]">
                      (jika ada menggunakan https)
                    </span>
                  </div>
                </label>
                <input
                  className="grid-cols-12 border border-border-main-color sm:h-10 h-9 pl-[10px] text-main-blue bg-white"
                  type="text"
                  id="linkPendukung"
                  value={laporan.link}
                  onChange={(e) =>
                    setLaporan({ ...laporan, link: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Link to="/data" className="text-blue-400">
            &laquo; Kembali ke data
          </Link>
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
          <button
            className="upload-button upload-anchor bg-red-400 "
            type="reset"
            onClick={handleClearData}
          >
            Clear Data
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
