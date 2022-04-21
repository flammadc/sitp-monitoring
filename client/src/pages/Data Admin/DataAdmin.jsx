import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { userRequest } from "../../requestMethods";
import { VscNewFile } from "react-icons/vsc";
import Loader from "react-js-loader";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import DataTable from "./DataTable";
import { AiOutlineClose } from "react-icons/ai";

import "./data_admin.css";

const DataAdmin = () => {
  const user = useSelector((state) => state.user.currentUser);
  const { state } = useLocation();
  const [close, setClose] = useState(state);
  const [searchMode, setSearchMode] = useState(false);
  const thisMonth = new Date(Date.now()).getMonth() + 1;
  const [filter, setFilter] = useState("tahun");
  const [initialLoading, setInitialLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [activities, setActivities] = useState();

  const filterActivity = (activities) => {
    const filteredActivity = activities.filter((a) => {
      return new Date(a.selesai).getMonth() + 1 === thisMonth;
    });
    return filteredActivity;
  };

  useEffect(() => {
    const getActvities = async () => {
      setInitialLoading(true);
      try {
        const res = await userRequest.get(`/activities`);
        filter === "tahun"
          ? setActivities(res.data)
          : setActivities(filterActivity(res.data));
      } catch (error) {
        console.log(error);
      }
      setInitialLoading(false);
    };
    getActvities();
  }, [user._id, filter]);

  const handleSearch = async (e) => {
    e.preventDefault();
    let res;
    try {
      if (keyword == "") {
        res = await userRequest.get(`activities`);
        setSearchMode(false);
      } else {
        res = await userRequest.get(`activities/search/${keyword}`);
      }
      filter === "tahun"
        ? setActivities(res.data)
        : setActivities(filterActivity(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-12 sm:pr-10 sm:pt-10 pr-5 pt-5">
      <div className="col-span-12 grid grid-cols-12 bg-white ml-8 sm:ml-16 pr-5 pl-6 pb-8 pt-7 shadow-md">
        <motion.div
          animate={
            close
              ? { height: "3rem", opacity: 1 }
              : { height: "0rem", opacity: 0 }
          }
          transition={{ duration: 0.5 }}
          className="col-span-12 h-0 mb-5 bg-red-400 flex flex-row items-center px-5"
        >
          <h2 className="text-white">Data Berhasil Dihapus</h2>
          <AiOutlineClose
            className="ml-auto text-white hover:cursor-pointer"
            onClick={() => setClose(false)}
          />
        </motion.div>
        <div className="sm:mb-7 mb-3 col-span-12 grid grid-cols-12 ">
          <div className="col-span-12 sm:col-span-7 flex flex-col sm:flex-row items-center mb-3 sm:mb-0">
            <h1 className="header-semua-box sm:text-left text-center sm:col-span-3 col-span-12 mb-3 sm:mb-0 mr-5">
              Daftar Laporan Kegiatan
            </h1>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-36 font-Mulish bg-white-sec border border-border-main-color shadow-sm"
            >
              <option value={"tahun"}>Tahun Ini</option>
              <option value={"bulan"}>Bulan Ini</option>
            </select>
          </div>
          <div className="sm:col-span-5 col-span-12 sm:mx-0 mx-auto sm:ml-auto ml-0 flex justify-center items-center">
            <form
              className="semua-search-input relative  flex flex-row items-center ml-auto  text-[#9A9AB0]"
              onSubmit={(e) => {
                handleSearch(e);
                setSearchMode(true);
              }}
            >
              <input
                className="input-searchbar focus:text-[#333333] ml-3 border shadow-md"
                type="text"
                id="search"
                placeholder="Search here..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <AiOutlineSearch className="absolute left-[9%]" />
            </form>
          </div>
        </div>

        {initialLoading ? (
          <div className="col-span-12 flex justify-center items-center">
            <Loader
              type="spinner-default"
              bgColor={"#0D8BFF"}
              color={"#0D8BFF"}
              size={70}
            />
          </div>
        ) : (
          <div className="table-container overflow-x-auto col-span-12 grid grid-cols-12">
            <table
              cellSpacing={10}
              cellPadding={15}
              className="w-auto font-Mulish col-span-12 whitespace-nowrap overflow-hidden"
            >
              <thead className="">
                <tr className="h-10 pt-3 pr-14 pb-3 pl-16 text-center lg:text-left bg-thead-color text-white">
                  <th className="h-10">Pegawai</th>
                  <th className="h-10">Nama Kegiatan</th>
                  <th className="h-10">Tanggal Selesai</th>
                  <th className="h-10">Jenis Kegiatan</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {activities?.length ? (
                  activities.map((a, i) => {
                    return <DataTable a={a} key={i} />;
                  })
                ) : searchMode ? (
                  <td colSpan={7}>
                    <h2 className="flex flex-row items-center justify-center text-gray-500">
                      Pencarian Tidak Ditemukan
                    </h2>
                  </td>
                ) : (
                  <tr>
                    <td className="text-base  pt-7" colSpan={7}>
                      <div className="flex flex-row items-center justify-center text-gray-500">
                        <h2 className="flex flex-row items-center">
                          Belum Ada Laporan, Upload Di Icon &nbsp;
                          <VscNewFile className="text-main-blue" />
                        </h2>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataAdmin;
