import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { userRequest } from "../../requestMethods";
import { useLocation } from "react-router-dom";

// COMPONENTS OR PAGES
import ModalAkun from "../Modal Akun/ModalAkun";
import ModalDiri from "../Modal Diri/ModalDiri";
import ModalHapusPendidikan from "../Modal Hapus Pendidikan/ModalHapusPendidikan";
import ModalHapusPengalaman from "../Modal Hapus Pengalaman/ModalHapusPengalaman";
import ModalPendidikan from "../Modal Pendidikan/ModalPendidikan";
import ModalPengalaman from "../Modal Pengalaman/ModalPengalaman";
import ModalProfile from "../Modal Profile/ModalProfile";

// ICON
import { CgProfile } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import { IoMdSchool } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { IoIosClose } from "react-icons/io";

const DetailPegawai = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser);
  const pegawaiId = location.pathname.split("/")[3];

  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const [dataDiri, setDataDiri] = useState({
    nama: "",
    noTelp: "",
    nip: "",
  });
  const [dataAkun, setDataAkun] = useState({
    email: "",
    password: "",
  });
  const [tambahPengalaman, setTambahPengalaman] = useState({
    jabatan: "",
    tempat: "",
    masaKerja: "",
  });
  const [tambahPendidikan, setTambahPendidikan] = useState({
    jurusan: "",
    kampus: "",
    negara: "",
    tahun: "",
  });
  const [profilePic, setProfilePic] = useState();
  const [profile, setProfile] = useState();
  const [modal, setModal] = useState({
    dataDiri: false,
    dataAkun: false,
    pengalaman: false,
    pendidikan: false,
    profilePic: false,
    hapusPendidikan: false,
    hapusPengalaman: false,
  });

  useEffect(() => {
    if (
      modal.dataDiri ||
      modal.dataAkun ||
      modal.pengalaman ||
      modal.pendidikan ||
      modal.profilePic ||
      modal.hapusPendidikan ||
      modal.hapusPengalaman
    ) {
      disableBodyScroll(document);
    } else {
      enableBodyScroll(document);
    }
  }, [modal]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest("users/" + pegawaiId);
        setProfile(res.data);
        setDataDiri({
          nama: res.data.nama,
          noTelp: res.data.noTelp,
          nip: res.data.nip,
        });
        setDataAkun({
          email: res.data.email,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [modal]);
  return (
    <div className="mb-2">
      <div className="relative  min-h-full h-max">
        <div className="container-content">
          <div className="jumbo-box shadow-md">
            {profile?.profilePic.length >= 1 ? (
              <div className="relative w-52 h-52 jumbo-pic">
                <img
                  src={profile?.profilePic[0].url}
                  alt=""
                  className="w-52 h-52 rounded-full object-cover"
                />
                <span
                  className="hover-pic absolute top-0 rounded-full w-52 h-52 bg-overlay-color hidden items-center justify-center"
                  onClick={() => setModal({ ...modal, profilePic: true })}
                >
                  <FiEdit2 className="text-6xl text-gray-500" />
                </span>
              </div>
            ) : (
              <div className="relative w-52 h-52 jumbo-pic">
                <CgProfile className="w-52 h-52" />
                <span
                  className="hover-pic absolute top-0 rounded-full w-52 h-52 bg-overlay-color hidden items-center justify-center"
                  onClick={() => setModal({ ...modal, profilePic: true })}
                >
                  <FiEdit2 className="text-6xl text-gray-200" />
                </span>
              </div>
            )}

            <div className="jumbo-section">
              <div className="jumbo-nama ">
                <h1 className="jumbo-nama-h1">{profile?.nama}</h1>
              </div>
              <h3 className="jumbo-jabatan">{profile?.jabatan}</h3>
            </div>
          </div>

          <div className="detail-box-col-1">
            <div className="diri-box shadow-md">
              <h2 className="diri-header">Data Diri</h2>
              <div className="diri-section">
                <ul className="diri-detail-template list-style-none">
                  <li>Nama</li>
                  <li>No Telp</li>
                  <li>NIP</li>
                  <li>Pendidkan Terakhir</li>
                </ul>

                <ul className="diri-detail-mid list-style-none">
                  <li>:</li>
                  <li>:</li>
                  <li>:</li>
                  <li>:</li>
                </ul>

                <ul className="diri-detail-isi list-style-none">
                  <li>{profile?.nama}</li>
                  <li>{profile?.noTelp}</li>
                  <li>{profile?.nip}</li>

                  <li>
                    {profile?.pendidikanTerakhir?.length >= 1
                      ? profile.pendidikanTerakhir.reverse()[0].jurusan
                      : "Belum Diisi"}
                  </li>
                </ul>
              </div>
              <button
                className="detail-btn btn-diri button-anchor btn-detail mb-8"
                onClick={() => setModal({ ...modal, dataDiri: true })}
              >
                Ubah Data
              </button>
            </div>

            <div className="akun-box shadow-md">
              <h2 className="akun-header ">Data Akun</h2>
              <div className="akun-section">
                <ul className="akun-section-template list-style-none">
                  <li>Email</li>
                  <li>Password</li>
                </ul>

                <ul className="akun-section-mid list-style-none">
                  <li>:</li>
                  <li>:</li>
                </ul>

                <ul className="akun-section-isi list-style-none">
                  <li>{profile?.email}</li>
                  <li>*********</li>
                </ul>
              </div>

              <button
                className="btn-anchor btn-detail  detail-btn btn-akun mb-8"
                onClick={() => setModal({ ...modal, dataAkun: true })}
              >
                Ubah Akun
              </button>
            </div>
          </div>

          <div className="detail-box-col-2">
            <div className="pengalaman-box shadow-md">
              <h1 className="header-pengalaman-box">Pengalaman Kerja</h1>
              <hr className="hr" />

              {profile?.pengalaman?.length >= 1 ? (
                <ul className="list-pengalaman">
                  {profile.pengalaman.map((a, i) => {
                    return (
                      <>
                        <li>
                          <div className="bullet-list"></div>
                          <div className="bold">{a.jabatan}</div>
                          <div className="slash">/</div>
                          <div className="tahun">{a.masaKerja}</div>
                          <div className="ml-auto mr-5 flex flex-row">
                            <IoIosClose
                              className="cursor-pointer text-2xl text-red-500"
                              onClick={() => {
                                setModal({ ...modal, hapusPengalaman: true });
                                setIndex(i);
                              }}
                            />
                          </div>
                        </li>
                        <div className="list-tempat">{a.tempat}</div>
                      </>
                    );
                  })}
                </ul>
              ) : (
                <div className="w-full h-full flex items-center justify-center pb-5">
                  <h1 className="font-Lato text-md text-gray-500">
                    Belum Ada Pengalaman, Silahkan Tambah Pengalaman
                  </h1>
                </div>
              )}

              <div className="flex justify-center mb-8 mt-auto">
                <button
                  className="button-anchor btn-detail"
                  onClick={() => setModal({ ...modal, pengalaman: true })}
                >
                  Tambah
                </button>
              </div>
            </div>

            <div className="pendidikan-box shadow-md">
              <h1 className="header-pendidikan-box">Riwayat Pendidikan</h1>
              <hr className="hr" />
              {profile?.pendidikanTerakhir?.length ? (
                <ul className="list-pengalaman">
                  {profile.pendidikanTerakhir.map((p, i) => {
                    return (
                      <>
                        <li>
                          <IoMdSchool className="text-xl" />
                          <div className="bold">{p.jurusan}</div>
                          <div className="slash">/</div>
                          <div className="tahun">{p.tahun}</div>
                          <IoIosClose
                            className="cursor-pointer text-2xl text-red-500 ml-auto mr-3"
                            onClick={() => {
                              setModal({ ...modal, hapusPendidikan: true });
                              setIndex(i);
                            }}
                          />
                        </li>
                        <div className="list-tempat pendidikan-list-tempat">
                          <GrLocation className="text-[#404557] mr-1" />
                          {p.kampus + ", " + p.negara}
                        </div>
                      </>
                    );
                  })}
                </ul>
              ) : (
                <div className="w-full h-full pb-5 flex items-center justify-center">
                  <h1 className="font-Lato text-md text-gray-500">
                    Belum Ada Riwayat Pendidikan, Silahkan Tambah Pendidikan
                  </h1>
                </div>
              )}

              <div className="pendidikan-buttons flex justify-center mb-8 mt-auto">
                <button
                  className="button-anchor btn-detail"
                  onClick={() => setModal({ ...modal, pendidikan: true })}
                >
                  Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal.dataDiri && (
        <ModalDiri
          setModal={setModal}
          loading={loading}
          setLoading={setLoading}
          dataDiri={dataDiri}
          setDataDiri={setDataDiri}
          id={pegawaiId}
        />
      )}

      {modal.dataAkun && (
        <ModalAkun
          setModal={setModal}
          loading={loading}
          setLoading={setLoading}
          dataAkun={dataAkun}
          setDataAkun={setDataAkun}
          id={pegawaiId}
        />
      )}

      {modal.pengalaman && (
        <ModalPengalaman
          setModal={setModal}
          loading={loading}
          setLoading={setLoading}
          tambahPengalaman={tambahPengalaman}
          setTambahPengalaman={setTambahPengalaman}
          profile={profile}
          id={pegawaiId}
        />
      )}

      {modal.pendidikan && (
        <ModalPendidikan
          setModal={setModal}
          loading={loading}
          setLoading={setLoading}
          tambahPendidikan={tambahPendidikan}
          setTambahPendidikan={setTambahPendidikan}
          profile={profile}
          id={pegawaiId}
        />
      )}

      {modal.profilePic && (
        <ModalProfile
          setModal={setModal}
          loading={loading}
          setLoading={setLoading}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
          profile={profile}
          id={pegawaiId}
        />
      )}
      {modal.hapusPendidikan && (
        <ModalHapusPendidikan
          setModal={setModal}
          index={index}
          profile={profile}
          setLoading={setLoading}
          loading={loading}
          id={pegawaiId}
        />
      )}
      {modal.hapusPengalaman && (
        <ModalHapusPengalaman
          setModal={setModal}
          index={index}
          profile={profile}
          setLoading={setLoading}
          loading={loading}
          id={pegawaiId}
        />
      )}
    </div>
  );
};

export default DetailPegawai;
