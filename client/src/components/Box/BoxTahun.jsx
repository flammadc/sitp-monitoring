import React from "react";
import ChartTahun from "../../assets/img/chart_tahun.png";
import Loader from "react-js-loader";
import ChartBulan from "../../assets/img/chart_bulan.png";

const BoxTahun = ({ tahun }) => {
  return (
    <div className="h-40 bg-white ml-10 font-Mulish shadow-md flex px-12 items-center">
      <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full bg-[#E8F0EE] flex items-center justify-center">
        <img src={ChartTahun} />
      </div>
      <div className="flex flex-col ml-auto  text-center">
        <div className="mb-5 text-2xl font-normal">Tahun Ini</div>
        <div className="text-5xl font-normal">
          {tahun >= 0 ? (
            tahun
          ) : (
            <Loader
              type="spinner-default"
              bgColor={"#666"}
              color={"#666"}
              size={40}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BoxTahun;
