import React from "react";

const TableKegiatan = ({ dataTable }) => {
  return (
    <div className="w-table pt-9 bg-white rounded-md  border border-main-color">
      <h2 className="text-lg ml-5">Laporan Kegiatan Terakhir</h2>
      <table
        className="table-auto mt-3 w-table"
        cellPadding={"10px"}
        cellSpacing="10px"
      >
        <thead className="bg-thead-color text-thead-text">
          <tr>
            <th>No</th>
            <th>Nama Kegiatan</th>
            <th>Tanggal Mulai</th>
            <th>Tangal Selesai</th>
            <th>Jenis Kegiatan</th>
            <th>Lokasi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>1</td>
            <td>Laporan Keuangan</td>
            <td>February 14 2021</td>
            <td>February 14 2021</td>
            <td>Keuangan</td>
            <td>Jakarta</td>
          </tr>
          <tr className="text-center">
            <td>1</td>
            <td>Laporan Keuangan</td>
            <td>February 14 2021</td>
            <td>February 14 2021</td>
            <td>Keuangan</td>
            <td>Jakarta</td>
          </tr>
          <tr className="text-center">
            <td>1</td>
            <td>Laporan Keuangan</td>
            <td>February 14 2021</td>
            <td>February 14 2021</td>
            <td>Keuangan</td>
            <td>Jakarta</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableKegiatan;
