import React from "react";
import ChartTahun from "../../assets/img/chart_tahun.png";
import Loader from "react-js-loader";

const BoxUser = ({}) => {
  return (
    <div className="h-40 bg-white ml-8 font-Mulish shadow-md flex px-12 items-center">
      <div className="w-32 h-32 rounded-full bg-[#E8F0EE] flex items-center justify-center"></div>
      <div className="flex flex-col ml-auto  text-center">
        <div className="mb-5 text-2xl font-normal">Total Pegawai</div>
        <div className="text-5xl font-normal">
          {/* {tahun >= 0 ? (
            tahun
          ) : (
            <Loader
              type="spinner-default"
              bgColor={"#666"}
              color={"#666"}
              size={40}
            />
          )} */}
          20
        </div>
      </div>
    </div>
  );
};

export default BoxUser;
