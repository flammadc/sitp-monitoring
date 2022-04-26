import React, { useEffect, useState } from "react";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";
import { CgProfile } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  AiOutlineUserAdd,
  AiOutlineSearch,
  AiOutlineClose,
} from "react-icons/ai";
import { BsChevronRight } from "react-icons/bs";

import "./pegawai.css";
import { useSelector } from "react-redux";
import AddPegawai from "../../components/Modal Pegawai/AddPegawai";
import EditPegawai from "../../components/Modal Pegawai/EditPegawai";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import DeleteModal from "../../components/Modal Pegawai/DeleteModal";

const Pegawai = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [render, setRender] = useState(false);
  const { state } = useLocation();
  const [alert, setAlert] = useState({
    created: false,
    removed: false,
    updated: false,
  });
  const [loading, setLoading] = useState();
  const [modal, setModal] = useState({
    tambah: false,
    ubah: { show: false, id: undefined },
    hapus: { show: false, id: undefined },
  });

  const [keyword, setKeyword] = useState("");
  const [allPegawai, setAllPegawai] = useState();

  useEffect(() => {
    setLoading(true);
    const getAllPegawai = async () => {
      try {
        const res = await userRequest.get("/users");
        const filteredPegawai = res.data.filter((d) => d._id !== user._id);
        setAllPegawai(filteredPegawai);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllPegawai();
  }, [user._id, render]);

  const handlePegawaiSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    const getAllPegawai = async () => {
      let res;
      try {
        if (keyword === "") {
          res = await userRequest.get("/users");
          const filteredPegawai = res.data.filter((d) => d._id !== user._id);
          setAllPegawai(filteredPegawai);
          setLoading(false);
          return;
        }
        res = await userRequest.get("users/search/" + keyword);
        const filteredPegawai = res.data.filter((d) => d._id !== user._id);
        setAllPegawai(filteredPegawai);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getAllPegawai();
  };

  useEffect(() => {
    setAlert({ ...state });
  }, [state]);

  return (
    <div className="grid grid-cols-12 font-Lato col-span-12 pt-5">
      <div className="col-span-12 grid grid-cols-12 pr-3 ml-4">
        <div className="col-span-12 bg-white grid grid-cols-12 pl-10 pr-10 py-10 shadow-md whitespace-nowrap">
          <motion.div
            animate={
              alert.created || alert.updated
                ? { height: "3rem", opacity: 1 }
                : { height: "0rem", opacity: 0 }
            }
            transition={{ duration: 0.5 }}
            className="col-span-12 h-0 mb-5 bg-[#5DE0A9] flex flex-row items-center px-5"
          >
            <h2 className="text-white">
              Pegawai Berhasil {alert.created ? "Dibuat" : "Diubah"}
            </h2>

            <AiOutlineClose
              className="ml-auto text-white hover:cursor-pointer"
              onClick={() => setAlert({ created: false })}
            />
          </motion.div>
          <motion.div
            animate={
              alert.removed
                ? { height: "3rem", opacity: 1 }
                : { height: "0rem", opacity: 0 }
            }
            transition={{ duration: 0.5 }}
            className="col-span-12 h-0 mb-5 bg-red-400 flex flex-row items-center px-5"
          >
            <h2 className="text-white">Pegawai Berhasil Dihapus</h2>

            <AiOutlineClose
              className="ml-auto text-white hover:cursor-pointer"
              onClick={() => setAlert({ removed: false })}
            />
          </motion.div>
          <div className="mb-5 sm:mb-10 flex flex-col sm:flex-row col-span-12">
            <h1 className="text-2xl font-medium font-Mulish col-span-8 mb-5 sm:mb-0">
              Data Pegawai
            </h1>
            <div className="sm:ml-auto grid grid-cols-12 items-center">
              <div
                className="col-span-1 w-7 h-7 rounded-full bg-main-blue hover:bg-blue-500 cursor-pointer flex items-center justify-center text-white  "
                onClick={() => setModal({ tambah: true })}
              >
                <AiOutlineUserAdd className="text-lg " />
              </div>

              <form
                className="relative text-[#9A9AB0] col-span-11 sm:ml-0 ml-4"
                onSubmit={handlePegawaiSearch}
              >
                <input
                  className=" focus:text-[#333333] bg-white-sec w-44 sm:w-full ml-3 pl-10 pr-3 h-9 rounded-md outline-none border shadow-md"
                  type="text"
                  id="search"
                  placeholder="Search here..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <AiOutlineSearch className="absolute inset-x-6 top-3" />
              </form>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-12 overflow-x-auto">
            <table className="table-pegawai col-span-12 items-center font-Lato border-separate">
              <tbody className="">
                {loading ? (
                  <Loader
                    type="spinner-default"
                    bgColor={"#0D8BFF"}
                    color={"#0D8BFF"}
                    size={70}
                  />
                ) : allPegawai?.length ? (
                  allPegawai.map((p, i) => {
                    return (
                      <tr
                        className="pegawai-tr bg-white  shadow-lg col-span-12"
                        key={i}
                      >
                        <td>
                          {p.profilePic?.length ? (
                            <img
                              src={p.profilePic[0].url}
                              className="w-10 h-10 object-cover rounded-full ml-3"
                            />
                          ) : (
                            <CgProfile className="w-10 h-10 ml-3" />
                          )}
                        </td>
                        <td className="font-bold">{p.nama}</td>
                        <td>{p.jabatan}</td>
                        <td>{p.nip}</td>
                        <td>{p.isAdmin ? "Admin" : "User"}</td>
                        <td>
                          <div className="flex flex-row items-center gap-5">
                            <MdEdit
                              className="text-struktur cursor-pointer hover:text-black"
                              onClick={() => {
                                setModal({ ubah: { show: true, id: p._id } });
                              }}
                            />
                            <RiDeleteBin6Line
                              className="text-red-500 cursor-pointer hover:text-red-700"
                              onClick={() =>
                                setModal({ hapus: { show: true, id: p._id } })
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <Link to={"/pegawai/detail/" + p._id}>
                            <BsChevronRight className="text-main-blue cursor-pointer hover:text-blue-500" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="col-span-12 text-center text-gray-500">
                    User Tidak Ditemukan
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modal.tambah && (
        <AddPegawai setModal={setModal} setRender={setRender} render={render} />
      )}
      {modal.ubah?.show && (
        <EditPegawai
          setModal={setModal}
          id={modal.ubah.id}
          setRender={setRender}
          render={render}
        />
      )}
      {modal.hapus?.show && (
        <DeleteModal
          idPegawai={modal.hapus.id}
          setModal={setModal}
          setRender={setRender}
          render={render}
        />
      )}
    </div>
  );
};

export default Pegawai;
