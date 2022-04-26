import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import SitpLogo from "../../assets/svg/sitp.svg";
import Loader from "react-js-loader";
import { login } from "../../redux/apiCalls";
import bgSinergi from "../../assets/img/bg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const { error, isFetching } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();

    login(dispatch, { email, password, remember }, navigate);
  };

  return (
    <div
      className="grid items-center justify-center  w-screen h-screen  font-Poppins bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${bgSinergi})` }}
    >
      <div className="absolute inset-0 bg-[rgba(0,0,0,.4)]"></div>
      <form
        className="-translate-y-10 sm:w-[640px] w-screen flex flex-col items-center pt-10 pb-3 sm:shadow-md bg-white bg-opacity-10 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <img src={SitpLogo} alt="Sitp Logo" className="w-24 h-12 mb-7" />

        <h1 className="text-2xl mb-6 text-white font-medium">Sign In</h1>
        <input
          type="email"
          placeholder="Email Adress"
          className="sm:w-1/2 w-[80vw] h-12 border border-black outline-none mb-4 pl-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="sm:w-1/2 w-[80vw]  h-12 border border-black outline-none pl-3 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="sm:w-1/2 w-[80vw] text-white">
          <input
            type="checkbox"
            id="remember_me"
            className="mr-2"
            value={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember_me">Remember Me</label>
        </div>
        {error.message === "Request failed with status code 404" ? (
          <p className="text-md text-red-600 mb-2">Email Atau Password Salah</p>
        ) : (
          <p className="text-md text-red-600 mb-2">{error.message}</p>
        )}
        <button
          type="submit"
          className={
            isFetching
              ? `w-1/2 h-12 bg-blue-400 text-white rounded-md mt-3 mb-8 flex items-center justify-center`
              : `w-1/2 h-12 bg-main-blue text-white rounded-md mt-3 mb-8 flex items-center justify-center`
          }
          disabled={isFetching}
        >
          {isFetching ? (
            <Loader
              type="spinner-default"
              bgColor={"#FFFFFF"}
              color={"#FFFFFF"}
              size={40}
            />
          ) : (
            "Submit"
          )}
        </button>
        <div className="flex flex-row items-center font-Inter">
          <p className="text-gray-600">&copy;&nbsp;</p>
          <Link to="/about" className="text-main-blue hover:underline text-sm">
            PKL SMKN 2 Jakarta
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
