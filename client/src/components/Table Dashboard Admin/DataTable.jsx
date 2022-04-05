import React, { useEffect, useState } from "react";
import moment from "moment";
import { userRequest } from "../../requestMethods";
import { CgProfile } from "react-icons/cg";

const DataTable = ({ a }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("users/" + a.id_user);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  });

  return (
    <tr className="dashboard-body-tr">
      <td className="flex flex-row items-center">
        {user?.profilePic.length ? (
          <img
            src={user?.profilePic[0].url}
            className="w-8 h-8 mr-5 object-cover rounded-full"
          />
        ) : (
          <CgProfile className="w-8 h-8 mr-5" />
        )}
        <div className="">{user?.nama}</div>
      </td>
      <td>{a.judul}</td>
      <td>{moment(a.selesai).format("D MMM YYYY")}</td>
      <td>{a.jenisKegiatan}</td>
    </tr>
  );
};

export default DataTable;
