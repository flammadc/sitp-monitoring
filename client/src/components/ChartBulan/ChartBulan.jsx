import React, { PureComponent, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const ChartBulan = ({ data }) => {
  const dataChart = [
    { name: "tahun", value: data.tahun },
    { name: "bulan", value: data.bulan },
  ];
  const COLORS = ["#ffffff", "#6D6AAD"];

  return (
    <div className="w-30 h-30">
      <PieChart width={100} height={100}>
        <Pie
          data={dataChart}
          cx={120}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {dataChart.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default ChartBulan;
