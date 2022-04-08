import React, { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import Loader from "react-js-loader";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import DataTable from "./DataTable";

import "./data_admin.css";

const DataAdmin = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [initialLoading, setInitialLoading] = useState();
  const [keyword, setKeyword] = useState("");
  const [activities, setActivities] = useState();

  useEffect(() => {
    const getActvities = async () => {
      setInitialLoading(true);
      try {
        const res = await userRequest.get(`/activities`);
        setActivities(res.data);
      } catch (error) {
        console.log(error);
      }
      setInitialLoading(false);
    };
    getActvities();
  }, [user._id]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.get(`activities/search/${keyword}`);
      setActivities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-12 sm:pr-10 sm:pt-10 pr-5 pt-5">
      <div className="col-span-12 grid grid-cols-12 bg-white ml-8 sm:ml-16 pr-5 pl-6 pb-8 pt-7 shadow-md">
        <div className="sm:mb-7 mb-3 col-span-12 grid grid-cols-12 ">
          <h1 className="header-semua-box sm:text-left text-center sm:col-span-7 col-span-12 mb-3 sm:mb-0">
            Daftar Laporan Kegiatan
          </h1>
          <div className="sm:col-span-5 col-span-12 sm:mx-0 mx-auto sm:ml-auto ml-0 flex justify-center items-center">
            <form
              className="semua-search-input relative  flex flex-row items-center ml-auto  text-[#9A9AB0]"
              onSubmit={handleSearch}
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
              cellPadding={10}
              className="w-auto font-Mulish col-span-12 whitespace-nowrap"
            >
              <thead>
                <tr className="dashboard-heading-tr text-white">
                  <th className="h-10 ">Pegawai</th>
                  <th className="h-10">Nama Kegiatan</th>
                  <th className="h-10">Tanggal Selesai</th>
                  <th className="h-10">Jenis Kegiatan</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {activities &&
                  activities.map((a, i) => {
                    return <DataTable a={a} key={i} />;
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataAdmin;
