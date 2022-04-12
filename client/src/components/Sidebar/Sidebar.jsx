import React from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { logoutAttempt } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";

// ICON
import LogoSitp from "../../assets/svg/logo.svg";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { VscNewFile } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { FaUsers } from "react-icons/fa";

// CSS
import "./sidebar.css";

const Sidebar = ({ sidebar, setSidebar }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  return (
    <>
      <img src={LogoSitp} className="mb-12" />
      <div className="mb-9">
        <div className="text-sm mb-2 text-gray-500">Home</div>
        <Link
          to="/"
          className={
            location === "/"
              ? `flex  text-main-blue hover:text-main-blue cursor-pointer`
              : `flex  hover:text-main-blue cursor-pointer`
          }
          onClick={() => width < 1024 && setSidebar(false)}
        >
          <div className="text-xl mr-2">
            <MdDashboard />
          </div>
          <div>
            <div className="text-sm ">Dashboard</div>
          </div>
        </Link>
      </div>

      <div className="mb-9">
        <div className="text-sm mb-3 text-gray-500">Laporan</div>
        <Link
          to="/data"
          className={
            location === "/data"
              ? `flex text-main-blue hover:text-main-blue cursor-pointer`
              : `flex hover:text-main-blue cursor-pointer`
          }
          onClick={() => width < 1024 && setSidebar(false)}
        >
          <div className="text-xl mr-2">
            <FaTasks />
          </div>
          <div>
            <div className="text-sm mb-3">Data</div>
          </div>
        </Link>
        <Link
          to="/upload"
          className={
            location === "/upload"
              ? `flex text-main-blue hover:text-main-blue cursor-pointer`
              : `flex hover:text-main-blue cursor-pointer`
          }
          onClick={() => width < 1024 && setSidebar(false)}
        >
          <div className="text-xl mr-2">
            <VscNewFile />
          </div>
          <div>
            <div className="text-sm ">Upload</div>
          </div>
        </Link>
      </div>
      <div className="mb-9">
        <div className="text-sm text-gray-500 mb-3">Account</div>
        {user?.isAdmin && (
          <Link
            to="/pegawai"
            className={
              location === "/pegawai"
                ? `flex text-main-blue hover:text-main-blue cursor-pointer`
                : `flex hover:text-main-blue cursor-pointer`
            }
            onClick={() => width < 1024 && setSidebar(false)}
          >
            <div className="text-xl mr-2">
              <FaUsers />
            </div>
            <div>
              <div className="text-sm mb-3">Pegawai</div>
            </div>
          </Link>
        )}

        <Link
          to="/profile"
          className={
            location === "/profile"
              ? `flex text-main-blue hover:text-main-blue cursor-pointer`
              : `flex hover:text-main-blue cursor-pointer`
          }
          onClick={() => width < 1024 && setSidebar(false)}
        >
          <div className="text-xl mr-2">
            <CgProfile />
          </div>
          <div>
            <div className="text-sm mb-3">My Profile</div>
          </div>
        </Link>
        <div className="flex order-last text-red-500 cursor-pointer hover:text-red-700">
          <div className="text-xl mr-2">
            <FiLogOut />
          </div>
          <div className="text-sm" onClick={() => dispatch(logoutAttempt())}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
