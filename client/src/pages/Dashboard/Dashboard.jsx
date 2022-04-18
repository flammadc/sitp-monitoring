import React, { useEffect, useMemo, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import moment from "moment";
import { VscNewFile } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { GiChart } from "react-icons/gi";

import Chart from "../../components/Chart/Chart";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";

import "./dashboard.css";
import BoxBulan from "../../components/Box/BoxBulan";
import BoxTahun from "../../components/Box/BoxTahun";

const Dashboard = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [activities, setActivities] = useState();
  const [activitiesStat, setActivitesStat] = useState([]);
  const [tahun, setTahun] = useState();
  const [bulan, setBulan] = useState();

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    []
  );

  useEffect(() => {
    const getActivitiesStat = async () => {
      const res = await userRequest.get(`/activities/stats?id=${user._id}`);

      res.data.map((item) =>
        setActivitesStat((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], Laporan: item.total },
        ])
      );
    };
    getActivitiesStat();
  }, []);

  useEffect(() => {
    const getActvities = async () => {
      try {
        const res = await userRequest.get(`/activities?id=${user._id}`);
        setActivities(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getActvities();
  }, [user._id]);

  useEffect(() => {
    if (activities) {
      const date = new Date();
      setTahun(activities.length);
      const bulanIni = date.getMonth();

      setBulan(
        activities.filter((a) => moment(a.createdAt).month() === bulanIni)
          .length
      );
    }
  }, [activities]);

  return (
    <div className="bg-white-sec min-h-screen">
      <div className="grid grid-cols-12 bg-white-sec pt-5  pr-6">
        <div className="col-span-12 sm:col-span-6 mb-5">
          <BoxBulan
            bulan={bulan ? bulan : 0}
            className="col-span-12 sm:col-span-6 mb-5"
          />
        </div>
        <div className="col-span-12 sm:col-span-6 mb-5">
          <BoxTahun tahun={tahun ? tahun : 0} className="col-span-6" />
        </div>

        <div className="col-span-12 pt-3 sm:ml-10 ml-6">
          {activitiesStat.length ? (
            <Chart data={activitiesStat} />
          ) : (
            <div className="h-chart-container bg-white border border-main-color flex flex-col items-center justify-center">
              <GiChart className="text-2xl mb-2 text-gray-500" />
              <h2 className="text-lg text-gray-500">
                Belum Ada Laporan,
                <Link className="text-main-blue" to="/upload">
                  Upload Disini
                </Link>
              </h2>
            </div>
          )}
        </div>
        <div className="col-span-12 grid grid-cols-12 bg-white sm:ml-10 ml-6 p-6 border border-main-color mt-5 shadow-md">
          <div className="col-span-12 flex flex-row mb-6 ">
            <h2 className="font-Mulish text-xl font-bold ">
              Laporan Kegiatan Terakhir
            </h2>
          </div>
          <div className="grid grid-cols-12 col-span-12 overflow-y-hidden">
            <table
              cellSpacing={10}
              cellPadding={10}
              className="w-auto font-Mulish col-span-12  whitespace-nowrap overflow-y-scroll"
            >
              <thead>
                <tr className="dashboard-heading-tr text-center text-white">
                  <th className="h-10">No</th>
                  <th className="h-10">Nama Kegiatan</th>
                  <th className="h-10">Tanggal Mulai</th>
                  <th className="h-10">Tanggal Selesai</th>
                  <th className="h-10">Jenis Kegiatan</th>
                  <th className="h-10">Lokasi</th>
                </tr>
              </thead>
              <tbody>
                {activities?.length ? (
                  activities.map((a, i) => {
                    return (
                      <tr className="text-center dashboard-body-tr" key={i}>
                        <td>{i + 1}</td>
                        <td>{a.judul}</td>
                        <td>{moment(a.mulai).format("D MMM YYYY")}</td>
                        <td>{moment(a.selesai).format("D MMM YYYY")}</td>
                        <td>{a.jenisKegiatan}</td>
                        <td>{a.lokasi}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr className="text-center">
                    <td className="text-lg text-gray-500 pt-7" colSpan={6}>
                      <div className="flex flex-row items-center justify-center text-gray-500">
                        <h2 className="flex flex-row items-center">
                          Belum Ada Laporan, Upload Di Icon &nbsp;
                          <VscNewFile className="text-thead-color" />
                        </h2>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
