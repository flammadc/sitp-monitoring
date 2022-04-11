import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { logout, logoutCanceled } from "../../redux/userSlice";

const ModalLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modal = useSelector((state) => state.user.modal);

  const handleLogout = (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    cookies.remove("access_token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    modal && (
      <div className="w-screen h-screen flex items-center justify-center bg-transparent fixed z-40">
        <div className="flex items-center justify-center fixed inset-0 bg-overlay-color z-50"></div>
        <div className="w-[70vw] md:w-[50vw] lg:w-[35vw] fixed  z-50 min-h-52  grid grid-cols-12 bg-white  shadow-lg font-Lato px-12 py-9 rounded-md ">
          <div className="text-base sm:text-2xl text-center mb-2 col-span-12 font-bold">
            Keluarkan Akun
          </div>
          <div className="text-sm md:text-lg text-center mb-7 col-span-12">
            Anda Yakin Keluarkan Akun ?
          </div>
          <div className="col-span-12 flex flex-row items-center justify-center">
            <button
              className="h-12 min-w-max w-52 mr-5 bg-white border-2 rounded-md border-border-main-color"
              onClick={() => dispatch(logoutCanceled())}
            >
              Batal
            </button>
            <button
              className="h-12 min-w-max w-52 bg-red-400  rounded-md  text-white"
              onClick={handleLogout}
            >
              Ya, Keluar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ModalLogout;
