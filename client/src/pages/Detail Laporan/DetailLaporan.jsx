import React, { useEffect, useState } from "react";
import moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userRequest } from "../../requestMethods";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./detail_laporan.css";
import { MdEdit } from "react-icons/md";

const DetailLaporan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [laporan, setLaporan] = useState({
    judul: "",
    mulai: undefined,
    selesai: undefined,
    jenisKegiatan: "",
    lokasi: "",
    dokumenPendukung: [],
  });
  const [autoFocus, setAutoFocus] = useState(false);
  const [editMode, setEditMode] = useState(false);
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

  useEffect(() => {
    setAutoFocus(true);
  }, [editMode]);

  const handleDeleteLaporan = async () => {
    try {
      await userRequest.delete("activities/" + idLaporan);
      navigate("/data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="detail-box">
      <div class="top-detail-box">
        <h1 class="header-detail-box">Detail Laporan</h1>
        <div class="flex flex-row">
          <Link to={"/data/edit/" + idLaporan}>
            <MdEdit className="text-3xl mr-3 text-struktur cursor-pointer hover:text-black" />
          </Link>
          <RiDeleteBin6Line
            className="text-3xl text-red-400 cursor-pointer hover:text-red-600"
            onClick={handleDeleteLaporan}
          />
        </div>
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
        <div class="content-list">
          <label for="file" class="label-content">
            File Tambahan
          </label>

          <div class="col-span-12 bg-[#f7f7fc] h-12 border border-[#dcdbdb] flex items-center">
            {laporan?.dokumenPendukung?.length ? (
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
        </div>
      </div>
      <Link to="/data">
        <button class="btn-detail-box">Kembali</button>
      </Link>
    </div>
  );
};

export default DetailLaporan;
