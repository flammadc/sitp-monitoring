import React, { useEffect, useState } from "react";
import moment from "moment";
import Loader from "react-js-loader";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

import "./edit_laporan.css";

const EditLaporan = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser);
  const [editMode, setEditMode] = useState({
    undangan: false,
    suratTugas: false,
    daftarHadir: false,
    dokumentasi: false,
    dokumenLainnya: false,
    link: false,
  });
  const [dokumentasi, setDokumentasi] = useState([]);
  const idLaporan = location.pathname.split("/")[3];
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState({
    judul: "",
    mulai: undefined,
    selesai: undefined,
    jenisKegiatan: "",
    lokasi: "",
    undangan: [],
    dokumentasi: [],
    suratTugas: [],
    daftarHadir: [],
    dokumenLainnya: [],
    internal: [],
    eksternal: [],
    link: "",
  });
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

  const [documents, setDocuments] = useState({
    undangan: undefined,
    suratTugas: undefined,
    daftarHadir: undefined,
    dokumenLainnya: undefined,
  });

  useEffect(() => {
    const getLaporan = async () => {
      try {
        const res = await userRequest.get("activities/detail/" + idLaporan);
        setLaporan(res.data);
        setCheckedKelompok(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLaporan();
  }, []);

  const handleEditLaporan = async (e) => {
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
      const res = await userRequest.put("/activities/" + idLaporan, {
        id_user: user._id,
        ...laporan,
        internal,
        dokumentasi: [...laporan.dokumentasi, ...dokumentasiImages],
        undangan,
        suratTugas,
        daftarHadir,
        dokumenLainnya,
      });
      navigate("/data/detail/" + res.data._id, {
        state: { updated: true, created: false },
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

  const setCheckedKelompok = (res) => {
    setInternal({
      ...res.internal[0],
      kelompok: internal.kelompok?.map(
        (k, i) => !res.internal[0]?.kelompok[i].includes("false") && true
      ),
    });
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

  const handleDeleteLaporanDokumentasi = (index) => {
    setLaporan({
      ...laporan,
      dokumentasi: laporan.dokumentasi.filter((d, i) => i !== index),
    });
  };

  console.log(internal.kelompok);
  console.log(laporan.internal?.kelompok);

  return (
    <form class="detail-box" onSubmit={handleEditLaporan}>
      <div class="top-detail-box">
        <h1 class="header-detail-box">Ubah Laporan</h1>
        <div class="flex flex-row"></div>
      </div>

      <div class="content-detail-box mb-8">
        <div class="content-list">
          <label for="nama" class="label-content">
            Nama Kegiatan
          </label>

          <input
            id="nama"
            type="text"
            class="input-content"
            value={laporan?.judul}
            onChange={(e) => setLaporan({ ...laporan, judul: e.target.value })}
            autoFocus
          />
        </div>
        <div class="content-list">
          <label for="mulai" class="label-content">
            Tanggal Mulai
          </label>
          <input
            id="mulai"
            type="date"
            class="input-content"
            value={moment(laporan?.mulai).format("YYYY-MM-DD")}
            onChange={(e) => setLaporan({ ...laporan, mulai: e.target.value })}
          />
        </div>
        <div class="content-list">
          <label for="selesai" class="label-content">
            Tanggal Selesai
          </label>
          <input
            id="selesai"
            type="date"
            class="input-content"
            value={moment(laporan?.selesai).format("YYYY-MM-DD")}
            onChange={(e) =>
              setLaporan({ ...laporan, selesai: e.target.value })
            }
          />
        </div>
        <div class="content-list">
          <label for="kegiatan" class="label-content">
            Jenis Kegiatan
          </label>
          <input
            id="kegiatan"
            type="text"
            class="input-content"
            value={laporan?.jenisKegiatan}
            onChange={(e) =>
              setLaporan({ ...laporan, jenisKegiatan: e.target.value })
            }
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
                onChange={(e) =>
                  setInternal({
                    ...internal,
                    jumlah: parseInt(e.target.value),
                  })
                }
                min={0}
                type="number"
              />
              <p className="font-Poppins  sm:text-base sm:font-medium text-sm font-normal text-struktur">
                peserta
              </p>
            </div>

            <div className="flex flex-wrap sm:gap-10 gap-y-1 gap-x-14 items-center sm:mt-3 mt-2  sm:ml-[18px] ml-[15px]">
              {internal.kelompok?.map((k, i) => {
                return (
                  <div className="flex gap-2 items-center">
                    <input
                      className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                      type="checkbox"
                      checked={k}
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
                value={laporan.eksternal[0]?.jumlah}
                onChange={(e) =>
                  setLaporan({
                    ...laporan,
                    eksternal: [
                      {
                        ...laporan.eksternal[0],
                        jumlah: parseInt(e.target.value),
                      },
                    ],
                  })
                }
                min={0}
                type="number"
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
                value={laporan.eksternal[0]?.nama}
                onChange={(e) =>
                  setLaporan({
                    ...laporan,
                    eksternal: [
                      {
                        ...laporan.eksternal[0],
                        nama: e.target.value,
                      },
                    ],
                  })
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
              value={internal.jumlah + laporan.eksternal[0]?.jumlah}
              disabled
              className="w-[168px] h-[30px] text-center sm:mt-4 mt-2 sm:ml-[18px] border rounded-sm bg-[#F7F7FC] border-[#DCDBDB] font-Poppins sm:text-sm sm:font-medium text-xs font-normal text-struktur"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-Poppins text-sm font-semibold text-font-sec sm:text-lg sm:font-medium">
            Dokumen
          </h1>
          <div className="sm:ml-3 mt-3 sm:mt-6">
            <div className="undangan-label">
              <div className="flex sm:gap-2 gap-3 items-center">
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className=" font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur flex flex-row items-center ">
                  <h3>Undangan</h3>
                  <span className="undangan-edit-icon ml-3 cursor-pointer hover:text-black hidden">
                    {editMode.undangan ? (
                      <AiOutlineClose
                        onClick={() => {
                          setEditMode({ ...editMode, undangan: false });
                          setDocuments({ ...documents, undangan: undefined });
                        }}
                      />
                    ) : (
                      <FiEdit2
                        onClick={() =>
                          setEditMode({ ...editMode, undangan: true })
                        }
                      />
                    )}
                  </span>
                </div>
              </div>
              {editMode.undangan ? (
                <div className="">
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
              ) : (
                <div className="section-file mt-[6px] pl-5">
                  {laporan.undangan.length ? (
                    <a href={laporan.undangan[0].url} target="_blank">
                      <h3 className="text-blue-400 font-medium">
                        {laporan.undangan[0].namaDokumen}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-gray-500 font-medium">
                      Tidak Ada Dokumen
                    </h3>
                  )}
                </div>
              )}
            </div>

            <div className="mt-3 suratTugas-label">
              <div className="flex sm:gap-2 gap-3 items-center">
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className=" font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur flex flex-row items-center ">
                  <h3>Surat Tugas</h3>
                  <span className="suratTugas-edit-icon ml-3 cursor-pointer hover:text-black hidden">
                    {editMode.suratTugas ? (
                      <AiOutlineClose
                        onClick={() => {
                          setEditMode({ ...editMode, suratTugas: false });
                          setDocuments({ ...documents, suratTugas: undefined });
                        }}
                      />
                    ) : (
                      <FiEdit2
                        onClick={() =>
                          setEditMode({ ...editMode, suratTugas: true })
                        }
                      />
                    )}
                  </span>
                </div>
              </div>
              {editMode.suratTugas ? (
                <div className="mt-3">
                  <div className="section-file mt-[6px]">
                    <label className="label-file" htmlFor="suratTugas">
                      Browse...
                    </label>
                    <input
                      className="input-file"
                      id="suratTugas"
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
              ) : (
                <div className="section-file mt-[6px] pl-5">
                  {laporan.suratTugas.length ? (
                    <a href={laporan.suratTugas[0].url} target="_blank">
                      <h3 className="text-blue-400 font-medium">
                        {laporan.suratTugas[0].namaDokumen}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-gray-500 font-medium">
                      Tidak Ada Dokumen
                    </h3>
                  )}
                </div>
              )}
            </div>

            <div className="mt-3 daftarHadir-label">
              <div className="flex sm:gap-2 gap-3 items-center">
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className=" font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur flex flex-row items-center ">
                  <h3>Daftar Hadir</h3>
                  <span className="daftarHadir-edit-icon ml-3 cursor-pointer hover:text-black hidden">
                    {editMode.daftarHadir ? (
                      <AiOutlineClose
                        onClick={() => {
                          setEditMode({ ...editMode, daftarHadir: false });
                          setDocuments({
                            ...documents,
                            daftarHadir: undefined,
                          });
                        }}
                      />
                    ) : (
                      <FiEdit2
                        onClick={() =>
                          setEditMode({ ...editMode, daftarHadir: true })
                        }
                      />
                    )}
                  </span>
                </div>
              </div>
              {editMode.daftarHadir ? (
                <div className="mt-3">
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
              ) : (
                <div className="section-file mt-[6px] pl-5">
                  {laporan.daftarHadir.length ? (
                    <a href={laporan.daftarHadir[0].url} target="_blank">
                      <h3 className="text-blue-400 font-medium">
                        {laporan.daftarHadir[0].namaDokumen}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-gray-500 font-medium">
                      Tidak Ada Dokumen
                    </h3>
                  )}
                </div>
              )}
            </div>

            <div className="dokumentasi-label mt-3">
              <label className="flex sm:gap-2 gap-3 items-center mb-3">
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur flex flex-row items-center">
                  <h3>Dokumentasi</h3>
                  <span className="dokumentasi-edit-icon ml-3 cursor-pointer hover:text-black hidden">
                    {editMode.dokumentasi ? (
                      <AiOutlineClose
                        onClick={() => {
                          setEditMode({ ...editMode, dokumentasi: false });
                          setDokumentasi([]);
                        }}
                      />
                    ) : (
                      <AiOutlinePlus
                        onClick={() =>
                          setEditMode({ ...editMode, dokumentasi: true })
                        }
                      />
                    )}
                  </span>
                </div>
              </label>
              <div className="flex flex-row items-center">
                {laporan.dokumentasi?.length > 0
                  ? laporan.dokumentasi?.map((d, i) => {
                      return (
                        <div className="relative dokumentasi-img-container mr-3">
                          <img
                            src={d.url}
                            className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] border object-cover"
                          />
                          <span className="dokumentasi-img-hover sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] absolute bg-overlay-color inset-0 items-center justify-center hidden">
                            <AiOutlineClose
                              className="text-4xl text-gray-300 cursor-pointer hover:text-white"
                              onClick={() => handleDeleteLaporanDokumentasi(i)}
                            />
                          </span>
                        </div>
                      );
                    })
                  : !editMode.dokumentasi && (
                      <div className="section-file  pl-5 w-full">
                        <h3 className="text-gray-500 font-medium">
                          Tidak Ada Dokumentasi
                        </h3>
                      </div>
                    )}
                {editMode.dokumentasi &&
                  dokumentasi?.length > 0 &&
                  dokumentasi.map((d, i) => {
                    return (
                      <>
                        <div className="relative dokumentasi-img-container mr-3">
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
                      </>
                    );
                  })}
                {editMode.dokumentasi && (
                  <div className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] border bg-white flex items-center justify-center ">
                    <label
                      htmlFor="dokumentasi"
                      className="hover:cursor-pointer"
                    >
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
                )}
              </div>
            </div>

            <div className="mt-3 dokumenLainnya-label">
              <div className="flex sm:gap-2 gap-3 items-center">
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className=" font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur flex flex-row items-center ">
                  <h3>Dokumen Lainnya</h3>
                  <span className="dokumenLainnya-edit-icon ml-3 cursor-pointer hover:text-black hidden">
                    {editMode.dokumenLainnya ? (
                      <AiOutlineClose
                        onClick={() => {
                          setEditMode({ ...editMode, dokumenLainnya: false });
                          setDocuments({
                            ...documents,
                            dokumenLainnya: undefined,
                          });
                        }}
                      />
                    ) : (
                      <FiEdit2
                        onClick={() =>
                          setEditMode({ ...editMode, dokumenLainnya: true })
                        }
                      />
                    )}
                  </span>
                </div>
              </div>
              {editMode.dokumenLainnya ? (
                <div className="mt-3">
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
              ) : (
                <div className="section-file mt-[6px] pl-5">
                  {laporan.dokumenLainnya.length ? (
                    <a href={laporan.dokumenLainnya[0].url} target="_blank">
                      <h3 className="text-blue-400 font-medium">
                        {laporan.dokumenLainnya[0].namaDokumen}
                      </h3>
                    </a>
                  ) : (
                    <h3 className="text-gray-500 font-medium">
                      Tidak Ada Dokumen
                    </h3>
                  )}
                </div>
              )}
            </div>

            <div className="mt-3 link-label">
              <label
                htmlFor="dokumen"
                className="flex sm:gap-2 gap-3 items-center"
              >
                <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur flex flex-row items-center">
                  <h3>Link Pendukung</h3>
                  <span className="link-edit-icon ml-3 cursor-pointer hover:text-black hidden">
                    {editMode.link ? (
                      <AiOutlineClose
                        onClick={() =>
                          setEditMode({ ...editMode, link: false })
                        }
                      />
                    ) : (
                      <FiEdit2
                        onClick={() => setEditMode({ ...editMode, link: true })}
                      />
                    )}
                  </span>
                </div>
              </label>

              {editMode.link ? (
                <input
                  className="w-full border border-border-main-color sm:h-10 h-9 pl-5 mt-[6px] text-blue-400  bg-white rounded-sm font-medium"
                  type="text"
                  id="linkPendukung"
                  value={laporan.link}
                  onChange={(e) =>
                    setLaporan({ ...laporan, link: e.target.value })
                  }
                  autoFocus
                />
              ) : laporan.link ? (
                <div className="section-file mt-[6px] pl-5">
                  <a href={laporan.link} target="_blank">
                    <h3 className="text-blue-400 font-medium">
                      {laporan.link}
                    </h3>
                  </a>
                </div>
              ) : (
                <div className="section-file mt-[6px] pl-5">
                  <h3 className="text-gray-500 font-medium">Tidak Ada Link</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center w-max">
        <Link
          to="/data"
          className="py-4 px-10 bg-gray-400 mr-5 text-white rounded-md font-Poppins font-medium text-lg"
        >
          Kembali
        </Link>
        <button class="btn-detail-box " type="submit" disabled={loading}>
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
    </form>
  );
};

export default EditLaporan;
