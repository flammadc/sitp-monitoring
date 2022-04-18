import React from "react";
import ChartTahun from "../../assets/img/chart_tahun.png";
import Loader from "react-js-loader";
import ChartBulan from "../../assets/img/chart_bulan.png";

const BoxBulan = ({ bulan }) => {
  return (
    <div className="h-40 bg-white sm:ml-10 ml-6 font-Mulish font-extrabold flex px-12 sm:px-4 lg:px-12 items-center shadow-box rounded-lg text-font-sec">
      <div className="min-w-[80px] w-28 h-28 min-h-[80px] lg:w-32 lg:h-32 rounded-full bg-[#E8F0EE] flex items-center justify-center">
        {/* <ChartBulan data={{ tahun, bulan }} /> */}
        <img src={ChartBulan} />
      </div>
      <div className="flex flex-col ml-auto  text-center">
        <div className="mb-5 text-2xl leading-[30px]">Bulan Ini</div>
        <div className="text-5xl font-light leading-[60px]">
          {bulan >= 0 ? (
            bulan
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

export default BoxBulan;
