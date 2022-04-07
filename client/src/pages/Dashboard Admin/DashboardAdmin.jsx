import React, { useEffect, useMemo, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import moment from "moment";
import { VscNewFile } from "react-icons/vsc";
import { Link } from "react-router-dom";

import Chart from "../../components/Chart/Chart";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import BoxTahun from "../../components/Box/BoxTahun";
import BoxBulan from "../../components/Box/BoxBulan";
import TableDashboardAdmin from "../../components/Table Dashboard Admin/TableDashboardAdmin";
import BoxUser from "../../components/Box/BoxUser";

const DashboardAdmin = () => {
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
      const res = await userRequest.get(`/activities/stats`);

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
        const res = await userRequest.get(`/activities?limit=4`);
        setActivities(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getActvities();
  }, []);

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
      <div className="grid grid-cols-12 bg-white-sec pt-5 pr-6">
        <div className="col-span-12 sm:col-span-6 mb-5">
          <BoxBulan bulan={bulan ? bulan : 0} />
        </div>
        <div className="col-span-12 sm:col-span-6 mb-5">
          <BoxTahun tahun={tahun ? tahun : 0} />
        </div>
        <div className="col-span-12 pt-3 sm:ml-10 ml-6">
          {activitiesStat && <Chart data={activitiesStat} />}
        </div>
        <div className="col-span-12 grid grid-cols-12 bg-white sm:ml-10 ml-6 p-6 border border-main-color mt-5 shadow-md">
          <div className="col-span-12 flex flex-row mb-4">
            <h2 className="font-Mulish text-xl font-bold">
              Laporan Kegiatan Terakhir
            </h2>
          </div>
          <div className="col-span-12 grid grid-cols-12 overflow-x-auto">
            <TableDashboardAdmin activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
