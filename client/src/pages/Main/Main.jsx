import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
import { Route, Routes } from "react-router-dom";

// PAGES OR COMPONENTS
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import RequireRole from "../../utils/RequireRole";
import DashboardAdmin from "../Dashboard Admin/DashboardAdmin";
import Dashboard from "../Dashboard/Dashboard";
import DataAdmin from "../Data Admin/DataAdmin";
import Data from "../Data/Data";
import Page404 from "../Page404/Page404";
import Pegawai from "../Pegawai/Pegawai";
import Profile from "../Profile/Profile";
import Upload from "../Upload/Upload";
import DetailLaporan from "../Detail Laporan/DetailLaporan";
import EditLaporan from "../Edit Laporan/EditLaporan";
import RequireAdmin from "../../utils/RequireAdmin";
import DetailPegawai from "../../components/Detail Pegawai/DetailPegawai";

const Main = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const ref = useRef(null);
  const [width, height] = useWindowSize();
  const [sidebar, setSidebar] = useState();
  useEffect(() => {
    width >= 1024 ? setSidebar(true) : setSidebar(false);
  }, [width]);

  useEffect(() => {
    document.addEventListener("mousedown", Clickout);
    return () => {
      document.removeEventListener("mousedown", Clickout);
    };
  }, [width < 1024]);

  const Clickout = (e) => {
    width < 1024 &&
      ref.current &&
      !ref.current.contains(e.target) &&
      setSidebar(false);
  };

  return (
    <div className="grid grid-cols-12 w-full h-full relative">
      <div className="col-span-12">
        <Topbar sidebar={sidebar} setSidebar={setSidebar} width={width} />
      </div>
      <motion.div
        className={`sidebar lg:flex flex fixed z-30 top-0  bottom-0 flex-col overflow-y-auto border-r border-border-main-color px-10 py-7  text-font-sec bg-white  font-Poppins `}
        animate={{ left: sidebar ? "0" : "-85%" }}
        transition={{ duration: 0.5, easings: [0.3, 0.3] }}
        ref={ref}
      >
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
      </motion.div>

      <div className="lg:ml-48 col-span-12">
        <Routes>
          <Route element={<RequireRole />}>
            {currentUser?.isAdmin ? (
              <Route path={"/"} element={<DashboardAdmin />}></Route>
            ) : (
              <Route path={"/"} element={<Dashboard />}></Route>
            )}
          </Route>
          <Route path={"/upload"} element={<Upload />}></Route>
          {currentUser?.isAdmin ? (
            <Route path="/data" element={<DataAdmin />}></Route>
          ) : (
            <Route path="/data" element={<Data />}></Route>
          )}
          <Route element={<RequireAdmin />}>
            <Route path={"/pegawai"} element={<Pegawai />}></Route>
            <Route
              path={"/pegawai/detail/:id"}
              element={<DetailPegawai />}
            ></Route>
          </Route>

          <Route path={"/profile"} element={<Profile />}></Route>

          <Route path={"/data/detail/:id"} element={<DetailLaporan />}></Route>
          <Route path={"/data/edit/:id"} element={<EditLaporan />}></Route>
          <Route path={"*"} element={<Page404 />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Main;
