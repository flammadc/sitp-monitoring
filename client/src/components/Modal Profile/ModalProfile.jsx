import React from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { FiEdit2 } from "react-icons/fi";
import { BiImageAdd } from "react-icons/bi";
import Loader from "react-js-loader";

import "./modal_profile.css";

const ModalProfile = ({
  loading,
  setLoading,
  modal,
  setModal,
  profilePic,
  setProfilePic,
  profile,
  id,
}) => {
  const user = useSelector((state) => state.user.currentUser);
  const handleEditProfilePic = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("name", profilePic.name);
    data.append("file", profilePic);
    data.append("userId", profile._id);
    try {
      const res = await userRequest.post("users/upload", data);
      await userRequest.put("users/" + (id ? id : user._id), {
        profilePic: [{ picId: res.data.picId, url: res.data.url }],
      });
      setLoading(false);
      setModal({ ...modal, profilePic: false });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="black-bg" id="modal-ubah-foto">
      <div className="white-bg-popup">
        <h1 className="header-popup">Ubah Foto Profile</h1>
        <hr className="hr-popup" />
        <div className="input-profile">
          <label for="input-profile" className="">
            {profilePic ? (
              <div className="modal-jumbo-pic relative mt-8">
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt=""
                  className="img-modal-profile rounded-full object-cover "
                />
                <span className="hover-modal-profile  absolute hidden top-0 rounded-full bg-overlay-color items-center justify-center">
                  <FiEdit2 className="text-6xl text-gray-500" />
                </span>
              </div>
            ) : (
              <div className="modal-profile-button px-8 py-3 text-white bg-main-blue hover:bg-blue-500  rounded-md cursor-pointer flex flex-row items-center ">
                Upload Image &nbsp; <BiImageAdd className="text-md mt-1" />
              </div>
            )}
          </label>
          <input
            type="file"
            id="input-profile"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>

        <div className="popup-buttons">
          <button
            className="text-black btn-detail buttons-popup background-white"
            onClick={() => setModal({ ...modal, profilePic: false })}
          >
            Batal
          </button>

          <button
            className="btn-detail buttons-popup"
            onClick={handleEditProfilePic}
            disabled={loading}
          >
            {loading ? (
              <Loader
                type="spinner-default"
                bgColor={"#FFFFFF"}
                color={"#FFFFFF"}
                size={40}
              />
            ) : (
              "Ubah"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalProfile;
