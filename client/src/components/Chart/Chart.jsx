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
    <div className="bg-white pt-3 h-chart-container pr-5 pb-9 border border-main-color font-Poppins shadow-md">
      <h2 className="text-lg mb-3 ml-12 font-medium">
        Laporan Kegiatan Tahun Ini
      </h2>

      <ResponsiveContainer width={"100%"}>
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
