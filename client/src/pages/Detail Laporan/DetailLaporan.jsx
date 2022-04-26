import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import Loader from "react-js-loader";
import { Link, useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import "./detail_laporan.css";
import ModalDelete from "../../components/Modal Delete/ModalDelete";

const DetailLaporan = () => {
  const location = useLocation();

  const { state } = useLocation();
  const [modalDelete, setModalDelete] = useState(false);
  const [close, setClose] = useState(state);
  const [loading, setLoading] = useState();
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
  const [kelompok, setKelompok] = useState([
    "PSSIP",
    "PSIE",
    "PSII",
    "PDIKI",
    "PSDIP",
  ]);
  const [autoFocus, setAutoFocus] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const idLaporan = location.pathname.split("/")[3];

  useEffect(() => {
    setLoading(true);
    const getLaporan = async () => {
      try {
        const res = await userRequest.get("activities/detail/" + idLaporan);
        setLaporan(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getLaporan();
  }, [idLaporan]);

  useEffect(() => {
    setAutoFocus(true);
  }, [editMode]);

  return (
    <div class="detail-box">
      <motion.div
        animate={
          close
            ? { height: "3rem", opacity: 1 }
            : { height: "0rem", opacity: 0 }
        }
        transition={{ duration: 0.5 }}
        className="col-span-12 h-0 mb-5 bg-[#5DE0A9] flex flex-row items-center px-5"
      >
        <h2 className="text-white">
          Laporan Berhasil {state?.created ? "Dibuat" : "Diubah"}
        </h2>

        <AiOutlineClose
          className="ml-auto text-white hover:cursor-pointer"
          onClick={() => setClose(false)}
        />
      </motion.div>
      <div class="top-detail-box">
        <h1 class="header-detail-box">Detail Laporan</h1>
        <div class="flex flex-row items-center">
          <Link to={"/data/edit/" + idLaporan}>
            <FiEdit2 className="text-2xl text-struktur cursor-pointer hover:text-black" />
          </Link>
          <RiDeleteBin6Line
            className="text-3xl ml-2 text-red-400 cursor-pointer hover:text-red-600"
            onClick={() => setModalDelete(true)}
          />
        </div>
      </div>
      {loading ? (
        <div className="col-span-12 flex items-center justify-center">
          <Loader
            type="spinner-default"
            bgColor={"#0D8BFF"}
            color={"#0D8BFF"}
            size={70}
          />
        </div>
      ) : (
        <>
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
                disabled
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
                disabled={!editMode}
                onClick={() => setEditMode(true)}
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
                disabled={!editMode}
                onDoubleClick={() => setEditMode(true)}
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
                disabled={!editMode}
                onClick={() => setEditMode(true)}
              />
            </div>
            <div class="content-list">
              <label for="lokasi" class="label-content">
                Lokasi
              </label>
              <input
                id="lokasi"
                type="text"
                class="input-content"
                value={laporan?.lokasi}
                disabled={!editMode}
                onClick={() => setEditMode(true)}
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
                    value={laporan.internal[0]?.jumlah}
                    disabled
                    min={0}
                    type="number"
                  />
                  <p className="font-Poppins  sm:text-base sm:font-medium text-sm font-normal text-struktur">
                    peserta
                  </p>
                </div>

                <div className="flex flex-wrap sm:gap-10 gap-y-1 gap-x-14 items-center sm:mt-3 mt-2  sm:ml-[18px] ml-[15px]">
                  {laporan.internal[0]?.kelompok.length &&
                    laporan.internal[0].kelompok.map((k, i) => {
                      return (
                        <div className="flex gap-2 items-center">
                          <input
                            className="sm:w-[10px] sm:h-[10px] w-[8px] h-[8px] border-2 border-[#C4C4C4] rounded-none"
                            type="checkbox"
                            checked={!k.includes("false") && true}
                          />
                          <label className="font-Poppins sm:text-base text-xs font-medium text-struktur">
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
                    min={0}
                    disabled
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
                    disabled
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
                  value={
                    laporan.internal[0]?.jumlah ||
                    0 + laporan.eksternal[0]?.jumlah ||
                    0
                  }
                  disabled
                  className="w-[168px] h-[30px] text-center sm:mt-4 mt-2 sm:ml-[18px] border rounded-sm bg-[#F7F7FC] border-[#DCDBDB] font-Poppins sm:text-sm sm:font-medium text-xs font-normal text-struktur"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="font-Poppins text-sm font-semibold text-font-sec sm:text-lg sm:font-medium">
                Dokumen
              </h1>
              <div className="sm:ml-3 mt-2 sm:mt-6">
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
                    {laporan.dokumentasi?.length > 0 ? (
                      laporan.dokumentasi.map((d, i) => {
                        return (
                          <div className="relative dokumentasi-img-container">
                            <img
                              src={d.url}
                              className="sm:w-[100px] sm:h-[100px] w-[60px] h-[60px] border object-cover"
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="section-file mt-[6px] pl-5 w-full">
                        <h3 className="text-gray-500 font-medium">
                          Tidak Ada Dokumentasi
                        </h3>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="dokumen"
                    className="flex sm:gap-2 gap-3 items-center"
                  >
                    <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                    <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                      Dokumen Lainnnya
                    </div>
                  </label>
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
                </div>

                <div className="mt-3">
                  <label
                    htmlFor="dokumen"
                    className="flex sm:gap-2 gap-3 items-center"
                  >
                    <div className="sm:w-[10px] sm:h-[10px] w-[6px] h-[6px] bg-[#C4C4C4] rounded-full"></div>
                    <div className="font-Poppins sm:text-base sm:font-medium text-xs font-normal text-struktur">
                      Link Pendukung
                    </div>
                  </label>
                  <div className="section-file mt-[6px] pl-5">
                    {laporan.link ? (
                      <a href={laporan.link} target="_blank">
                        <h3 className="text-blue-400 font-medium">
                          {laporan.link}
                        </h3>
                      </a>
                    ) : (
                      <h3 className="text-gray-500 font-medium">
                        Tidak Ada Link
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/data">
            <button class="btn-detail-box">Kembali</button>
          </Link>
        </>
      )}
      {modalDelete && (
        <ModalDelete setModalDelete={setModalDelete} idLaporan={idLaporan} />
      )}
    </div>
  );
};

export default DetailLaporan;
