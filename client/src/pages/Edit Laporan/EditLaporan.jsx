import React, { useEffect, useState } from "react";
import moment from "moment";
import Loader from "react-js-loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { GrFormClose } from "react-icons/gr";

import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";

const EditLaporan = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dokumen, setDokumen] = useState();
  const [fileInputMode, setFileInputMode] = useState(false);
  const [laporan, setLaporan] = useState({
    judul: "",
    mulai: undefined,
    selesai: undefined,
    jenisKegiatan: "",
    lokasi: "",
  });
  const idLaporan = location.pathname.split("/")[3];

  useEffect(() => {
    const getLaporan = async () => {
      try {
        const res = await userRequest.get("activities/detail/" + idLaporan);
        setLaporan(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getLaporan();
  }, [idLaporan]);

  const handleEditLaporan = async (e) => {
    e.preventDefault();
    setLoading(true);
    let res;
    try {
      if (dokumen) {
        const data = new FormData();
        data.append("name", dokumen.name);
        data.append("file", dokumen);
        data.append("laporanId", idLaporan);
        res = await userRequest.post("activities/upload", data);
        await userRequest.put("activities/" + idLaporan, {
          ...laporan,
          dokumenPendukung: [
            {
              dokumenId: res.data.dokumenId,
              namaDokumen: dokumen.name,
              url: res.data.url,
            },
          ],
        });
      } else {
        await userRequest.put("activities/" + idLaporan, laporan);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
    navigate("/data/detail/" + idLaporan, { replace: true });
  };

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
        <div class="content-list">
          <label for="lokasi" class="label-content">
            Lokasi
          </label>
          <input
            id="lokasi"
            type="text"
            class="input-content"
            value={laporan?.lokasi}
            onChange={(e) => setLaporan({ ...laporan, lokasi: e.target.value })}
          />
        </div>
        <div class="content-list edit-file-container">
          <label for="file" class="label-content">
            File Tambahan
            {fileInputMode ? (
              <GrFormClose
                className="text-lg ml-3 text-struktur hover:text-black cursor-pointer"
                onClick={() => setFileInputMode(false)}
              />
            ) : (
              <MdEdit
                className="edit-file-icon hidden text-lg ml-3 text-struktur hover:text-black"
                onClick={() => setFileInputMode(true)}
              />
            )}
          </label>

          {fileInputMode ? (
            <div className="col-span-12 grid grid-cols-12 font-Poppins   border border-border-main-color">
              <label
                htmlFor="add_dokumen"
                className="col-span-2 min-w-max bg-white-sec py-3 flex items-center justify-center border-r border-border-main-color cursor-pointer"
              >
                Pilih File
              </label>
              <div className="col-span-10 flex items-center ml-3">
                {dokumen ? (
                  dokumen.name
                ) : (
                  <div className="text-gray-500">
                    Tidak Ada File Yang Dipilih
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div class="col-span-12 bg-[#f7f7fc] h-12 border border-[#dcdbdb] flex items-center">
              {laporan.dokumenPendukung?.length ? (
                <a
                  href={laporan.dokumenPendukung[0]?.url}
                  target="_blank"
                  className="text-blue-500 font-medium font-Poppins text-base pl-6"
                >
                  {laporan.dokumenPendukung[0]?.namaDokumen}
                </a>
              ) : (
                <div className="text-gray-500 font-medium font-Poppins text-base pl-6">
                  Tidak Ada Dokumen Pendukung
                </div>
              )}
            </div>
          )}

          <input
            type="file"
            className="hidden"
            id="add_dokumen"
            onChange={(e) => setDokumen(e.target.files[0])}
          />
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
