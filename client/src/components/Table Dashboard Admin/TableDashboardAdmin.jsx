import React from "react";
import { Link } from "react-router-dom";

import DataTable from "./DataTable";

const TableDashboardAdmin = ({ activities }) => {
  return (
    <table
      cellSpacing={10}
      cellPadding={10}
      className="w-auto font-Mulish col-span-12 whitespace-nowrap"
    >
      <thead>
        <tr className="dashboard-heading-tr text-white">
          <th className="h-10 pl-5">Pegawai</th>
          <th className="h-10">Nama Kegiatan</th>
          <th className="h-10">Tanggal Selesai</th>
          <th className="h-10">Jenis Kegiatan</th>
        </tr>
      </thead>
      <tbody>
        {activities &&
          activities.map((a, i) => {
            if (i === 5) {
              return (
                <tr className="dashboard-body-tr text-center">
                  <td colSpan={5} className="text-left sm:text-center">
                    <Link to="/data" className="text-main-blue text-lg">
                      Lihat Selengkapnya ....
                    </Link>
                  </td>
                </tr>
              );
            }
            if (i >= 6) {
              return;
            }

            return <DataTable a={a} key={i} />;
          })}
      </tbody>
    </table>
  );
};

export default TableDashboardAdmin;
