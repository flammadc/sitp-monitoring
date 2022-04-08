import React, { useEffect, useState } from "react";
import moment from "moment";
import Loader from "react-js-loader";
import { userRequest } from "../../requestMethods";
import { CgProfile } from "react-icons/cg";

const DataTable = ({ a }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const res = await userRequest.get("users/" + a.id_user);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUser();
  }, [a.id_user]);

  return (
    <tr className="dashboard-body-tr text-center">
      <td className="flex flex-row items-center">
        {loading ? (
          <Loader
            type="spinner-default"
            bgColor={"#0D8BFF"}
            color={"#0D8BFF"}
            size={40}
          />
        ) : user?.profilePic.length ? (
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
