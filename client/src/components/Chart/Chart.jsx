import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="bg-white pt-6 h-chart-container pr-5 pb-16 sm:pb-9 border border-main-color shadow-chart">
      <h2 className="text-xl mb-5 ml-12 font-bold font-Mulish">
        Laporan Kegiatan Tahun Ini
      </h2>

      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <Tooltip />

          <Line type="monotone" dataKey="Laporan" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
