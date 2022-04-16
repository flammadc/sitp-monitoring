import React, { useEffect, useState } from "react";
import moment from "moment";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const DataTable = ({ a }) => {
  const [user, setUSer] = useState();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("users/" + a.id_user);
        setUSer(res.data);
      } catch (error) {}
    };
    getUser();
  }, [a.id_user]);

  return (
    <tr className="dashboard-body-tr">
      <td className="flex flex-row items-center">
        {user ? (
          user?.profilePic.length ? (
            <>
              <img
                src={user?.profilePic[0].url}
                className="w-8 h-8 object-cover rounded-full"
              />
              <div className="ml-3">{user?.nama}</div>
            </>
          ) : (
            <>
              <CgProfile className="w-8 h-8" />
              <div className="ml-3">{user?.nama}</div>
            </>
          )
        ) : (
          <Loader
            type="spinner-default"
            bgColor={"#0D8BFF"}
            color={"#0D8BFF"}
            size={40}
          />
        )}
      </td>
      <td className="">{a.judul}</td>
      <td>{moment(a.selesai).format("D MMM YYYY")}</td>
      <td>{a.jenisKegiatan}</td>
      <td>
        <Link
          to={"/data/detail/" + a._id}
          className="text-main-blue font-bold hover:underline"
        >
          Detail
        </Link>
      </td>
    </tr>
  );
};

export default DataTable;
