import "./about.css";
import LogoDugam from "../../assets/svg/logo-dugam.svg";
import LogoPc from "../../assets/svg/logo-pc.svg";
import LogoGmail from "../../assets/svg/logo-gmail.svg";
import LogoGithub from "../../assets/svg/logo-github.svg";
import LogoFigma from "../../assets/svg/logo-figma.svg";
import LogoHtml from "../../assets/svg/logo-html.svg";
import LogoCss from "../../assets/svg/logo-css.svg";
import LogoJs from "../../assets/svg/logo-js.svg";
import LogoReact from "../../assets/svg/logo-react.svg";
import LogoNode from "../../assets/svg/logo-node.svg";
import LogoMongo from "../../assets/svg/logo-mongo.svg";
import LogoHeroku from "../../assets/svg/logo-heroku.svg";
import BottomRow from "../../assets/svg/bottom-row.svg";

import ProfileRangga from "../../assets/svg/profile-rangga.svg";
import ProfileRaffi from "../../assets/svg/profile-raffi.svg";
import ProfileRidho from "../../assets/svg/profile-ridho.svg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <nav className="w-full h-20 flex flex-row items-center xl:px-20 sm:px-10 px-5 border-b border-border-main-color bg bg-white">
        <img
          className="sm:w-10 sm:h-10 w-8 h-8"
          src={LogoDugam}
          alt="logo-dugam"
        />
        <h1 className="sm:ml-2.5 sm:font-Quicksand sm:font-semibold sm:text-xl ml-2 font-Lato font-bold text-base">
          PKL SMK Negeri 2 Jakarta 2022
        </h1>
        <Link
          className="btn-login flex items-center justify-center ml-auto sm:w-28 sm:h-10 rounded-md font-bold sm:text-sm w-12 h-7   font-Quicksand border border-main-blue text-main-blue text-xs bg-white hover:bg-main-blue hover:text-white"
          to="/login"
        >
          Login
        </Link>
      </nav>
      <div className="bg-white sm:pt-20 pt-14 about-container">
        <div className="grid-cols-12 lg:px-40 sm:px-32 px-10 flex lg:flex-row flex-col  items-center lg:gap-28 lg:text-left text-center ">
          <div className="">
            <h1 className="font-Quicksand font-bold sm:text-5xl text-3xl ">
              About this website
            </h1>
            <p className="font-Opensans font-normal sm:text-lg text-xs sm:mt-3 mt-2">
              Ini adalah{" "}
              <span className="font-semibold italic">
                website monitoring pegawai
              </span>{" "}
              yang berguna untuk memantau semua aktifitas laporan pegawai dalam
              suatu kantor.
            </p>
          </div>

          <img
            className="lg:ml-auto lg:mt-0 sm:mt-16 mt-10"
            src={LogoPc}
            alt="logo-pc"
          />
        </div>

        <div className="grid-cols-12 w-full lg:px-40 lg:py-24 sm:mt-32 mt-14 sm:p-20 lg:pb-24 lg:flex-none py-14 px-10 flex flex-col lg:text-left text-center bg-[#BAE6FD]">
          <h1 className="font-Quicksand font-bold sm:text-5xl text-3xl">
            About us
          </h1>
          <p className="font-Opensans font-normal sm:text-lg text-xs sm:mt-3 mt-2">
            Kami adalah kelompok siswa dari SMKN 2 Jakarta jurusan{" "}
            <span className="font-semibold italic">
              {" "}
              Rekayasa Perangkat Lunak(RPL)
            </span>
            atau{" "}
            <span className="font-semibold italic">
              Software Engineering,
            </span>{" "}
            yang beranggotakan 3 orang, yaitu :
          </p>

          <div className="lg:grid lg:grid-cols-3 gap-10 lg:mt-14 sm:mt-16 mt-10 flex flex-col items-center">
            <div className="border-4 border-[#404557] rounded-lg lg:w-auto w-2/3 flex flex-col items-center pt-3 pb-6">
              <img src={ProfileRangga} alt="profile-rangga" />
              <h1 className="font-Poppins font-bold text-4xl text-[#2F3147]">
                Rangga
              </h1>
              <p className="font-Poppins font-normal text-base text-[#404557] ">
                As Developer Dewa
              </p>
              <div className="gap-10 flex flex-row mt-3">
                <button>
                  <img src={LogoGmail} alt="logo-gmail" />
                </button>
                <button>
                  <img src={LogoGithub} alt="logo-github" />
                </button>
              </div>
            </div>

            <div className="border-4 border-[#404557] rounded-lg lg:w-auto w-2/3 flex flex-col items-center pt-3 pb-6">
              <img src={ProfileRaffi} alt="profile-raffi" />
              <h1 className="font-Poppins font-bold text-4xl text-[#2F3147]">
                Raffi
              </h1>
              <p className="font-Poppins font-normal text-base text-[#404557]">
                As Front End Developer
              </p>
              <div className="gap-10 flex flex-row mt-3">
                <button>
                  <img src={LogoGmail} alt="logo-gmail" />
                </button>
                <button>
                  <img src={LogoGithub} alt="logo-github" />
                </button>
              </div>
            </div>

            <div className="border-4 border-[#404557] rounded-lg lg:w-auto w-2/3 flex flex-col items-center pt-3 pb-6">
              <img src={ProfileRidho} alt="profile-ridho" />
              <h1 className="font-Poppins font-bold text-4xl text-[#2F3147]">
                Ridho
              </h1>
              <p className="font-Poppins font-normal text-base text-[#404557]">
                As Web Designer
              </p>
              <div className="gap-10 flex flex-row mt-3">
                <button>
                  <img src={LogoGmail} alt="logo-gmail" />
                </button>
                <button>
                  <img src={LogoGithub} alt="logo-github" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pt-24 lg:pl-40 lg:flex-none sm:px-20 sm:pt-20 py-14 px-10 flex flex-col lg:text-left text-center">
          <h1 className="font-Quicksand font-bold sm:text-5xl text-3xl">
            Work Flow
          </h1>
          <div className="lg:mt-10 sm:mt-14 mt-10">
            <div className="task flex gap-8 lg:flex-row flex-col lg:items-start items-center">
              <div className="border-4 border-[#404557] rounded-lg w-[200px] h-[200px] flex flex-col items-center ">
                <img
                  className="w-20 h-20 mt-5"
                  src={ProfileRidho}
                  alt="profile-ridho"
                />
                <h1 className="font-Quicksand font-bold text-2xl text-[#2F3147] mt-4">
                  Ridho
                </h1>
                <p className="font-Opensans font-normal text-base mt-2 text-[#404557]">
                  Web Designer
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="font-Quicksand font-bold sm:text-2xl text-sm text-[#2F3147]">
                  Mendesain semua tampilan website, yang menggunakan :
                </h1>
                <div className="flex items-center">
                  <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                  <img
                    className="w-10 h-10 ml-3"
                    src={LogoFigma}
                    alt="logo-figma"
                  />
                  <p className="ml-2 font-Quicksand font-normal lg:text-base text-xs text-[#2F3147] text-left">
                    Figma, software berbasis web untuk design yang memudahkan
                    untuk prototyping.
                  </p>
                </div>
              </div>
            </div>
            <img className="mx-auto mt-9 mb-6 " src={BottomRow} alt="" />

            <div className="task flex gap-8 lg:flex-row flex-col lg:items-start items-center">
              <div className="border-4 border-[#404557] rounded-lg w-[200px] h-[200px] flex flex-col items-center">
                <img
                  className="w-20 h-20 mt-5"
                  src={ProfileRaffi}
                  alt="profile-raffi"
                />
                <h1 className="font-Quicksand font-bold text-2xl text-[#2F3147] mt-3">
                  Raffi
                </h1>
                <p className="font-Opensans font-normal text-base text-[#404557] mt-1">
                  Front End Developer
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h1 className="font-Quicksand font-bold sm:text-2xl text-sm text-[#2F3147]">
                  Membuat tampilan web sesuai dengan desain yang ada
                </h1>

                <div className="flex items-center">
                  <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                  <img
                    className="w-10 h-10 ml-3"
                    src={LogoHtml}
                    alt="logo-html"
                  />
                  <p className="ml-2 font-Opensans font-normal lg:text-base text-xs text-[#2F3147] text-left">
                    HTML, untuk membuat kerangka web
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                  <img
                    className="w-10 h-10 ml-3"
                    src={LogoCss}
                    alt="logo-css"
                  />
                  <p className="ml-2 font-Opensans font-normal lg:text-base text-xs text-[#2F3147] text-left">
                    CSS, untuk membuat tampilan web sesuai desain yang ada
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                  <img className="w-10 h-10 ml-3" src={LogoJs} alt="logo-js" />
                  <p className="ml-2 font-Opensans font-normal lg:text-base text-xs text-[#2F3147] text-left">
                    Javascript, untuk membuat web lebih interaktif
                  </p>
                </div>
              </div>
            </div>
            <img className="mx-auto mt-9 mb-6 " src={BottomRow} alt="" />

            <div className="flex gap-8 lg:flex-row flex-col lg:items-start items-center">
              <div className="border-4 border-[#404557] rounded-lg w-[200px] h-[200px] flex flex-col items-center">
                <img
                  className="w-20 h-20 mt-5"
                  src={ProfileRangga}
                  alt="profile-rangga"
                />
                <h1 className="font-Quicksand font-bold text-2xl text-[#2F3147] mt-3">
                  Rangga
                </h1>
                <p className="font-Opensans font-normal text-base text-[#404557] mt-1">
                  Developer Dewa
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:w-[600px] w-auto">
                <h1 className="font-Quicksand font-bold sm:text-2xl  text-sm text-[#2F3147]">
                  Membuat aplikasi agar berfungsi sesuai rencana
                </h1>
                <p className="font-Opensans font-normal lg:text-base text-xs text-[#2F3147] ">
                  <span className="font-semibold italic">Developer Dewa</span>{" "}
                  bukan sekedar developer, tugasnya adalah sebagai fullstack
                  developer, yang berarti membuat aplikasi web yang interaktif,
                  dari logika pemrograman, database, server, sampai hosting
                  aplikasi web agar bisa digunakan oleh pengguna adalah
                  tugasnya.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center">
                <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoReact}
                  alt="logo-react"
                />
                <p className="ml-2 font-Opensans font-normal lg:text-base text-xs text-[#2F3147] text-left">
                  React, framework yang digunakan untuk membuat web yang
                  interaktif
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoNode}
                  alt="logo-node"
                />
                <p className="ml-2 font-Opensans font-normal lg:text-base text-xs text-[#2F3147] text-left">
                  Node.js, software pendukung pengembangan web untuk lingkungan
                  JavaScript
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoMongo}
                  alt="logo-Mongo"
                />
                <p className="ml-2 font-Opensans font-normal lg:text-base text-xs text-[#2F3147] text-left">
                  MongoDB, untuk sistem database
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-[18px] h-[18px] bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoHeroku}
                  alt="logo-heroku"
                />
                <p className="ml-2 font-Opensans font-normal lg:text-base text-xs text-[#2F3147] text-left">
                  Heroku, layanan cloud untuk hosting website
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full h-20 flex justify-center items-center bg-[#2F3147] font-Quicksand text-base text-white font-semibold ">
        © SevenTech 2022
      </footer>
    </>
  );
};

export default About;
