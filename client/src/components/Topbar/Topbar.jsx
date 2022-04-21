import React, { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import "./topbar.css";

const Topbar = ({ setSidebar, sidebar, width }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest("users/" + user._id);
        setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <nav className="topbar flex w-full h-20 pr-8 pl-9 items-center border-b border-border-main-color bg-white  font-Poppins">
      <AiOutlineMenu
        className={
          sidebar
            ? width >= 1024
              ? "text-2xl cursor-pointer slide-in"
              : "text-2xl cursor-pointer slide-out"
            : "text-2xl cursor-pointer slide-in"
        }
        onClick={() => setSidebar(!sidebar)}
      />
      {profile && (
        <div className="nav-profile-container flex ml-auto items-center w-56 h-10 ">
          {profile.profilePic.length ? (
            <Link to="/profile" className="ml-auto sm:ml-0">
              <img
                src={profile.profilePic[0].url}
                className="rounded-full w-10 h-10 object-cover "
              />
            </Link>
          ) : (
            <Link to="/profile" className="ml-auto sm:ml-0">
              <CgProfile className="text-4xl" />
            </Link>
          )}
          <div className="ml-4 text-justify hidden sm:block">
            <Link
              className="font-medium text-base text-main-blue hover:text-blue-500"
              to="/profile"
            >
              {profile.nama}
            </Link>
            <div className="text-sm ">{profile.jabatan}</div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
