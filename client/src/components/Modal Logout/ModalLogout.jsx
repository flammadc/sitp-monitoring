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
      <div className="scroll">
        <div className="fixed inset-0 bg-overlay-color z-50 duration-300"></div>
        <div className="w-1/3 h-auto fixed translate-x-50- translate-y-50- top-1/2 left-1/2 bg-white z-50 shadow-lg font-Lato px-12 py-9 rounded-md duration-300">
          <div className="text-2xl text-center mb-2">Keluarkan Akun</div>
          <div className="text-lg text-center mb-7">
            Apakah Anda Yaking Keluarkan Akun
          </div>
          <button
            className="w-40 h-12 bg-white border-2 rounded-md border-border-main-color mr-5"
            onClick={() => dispatch(logoutCanceled())}
          >
            Batal
          </button>
          <button
            className="w-40 h-12 bg-red-400  rounded-md  text-white"
            onClick={handleLogout}
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    )
  );
};

export default ModalLogout;
