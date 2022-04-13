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

const About = () => {
  return (
    <>
      <div className="bg-white pb-40">
        <nav className="w-full h-20 flex flex-row items-center px-20 border-b border-border-main-color bg bg-white">
          <img className="w-10 h-10" src={LogoDugam} alt="logo-dugam" />
          <h1 className="ml-2.5 font-Lato font-normal text-xl">
            PKL SMK Negeri 2 Jakarta 2022
          </h1>
          <button className="btn-login ml-auto py-3 px-8 bg-white rounded-lg font-Poppins border border-main-blue font-medium text-main-blue text-sm">
            Login
          </button>
        </nav>

        <div className="grid-cols-12 px-40 flex flex-row mt-20 items-center gap-28">
          <div className="">
            <h1 className="font-Lato font-medium text-5xl">
              About this website
            </h1>
            <p className="font-Poppins font-normal text-lg mt-3 ">
              Ini adalah{" "}
              <span className="font-semibold italic">
                website monitoring pegawai
              </span>{" "}
              yang berguna untuk memantau semua aktifitas laporan pegawai dalam
              suatu kantor.
            </p>
          </div>

          <img className="ml-auto" src={LogoPc} alt="logo-pc" />
        </div>

        <div className="grid-cols-12 w-full px-40 mt-52 pt-20 pb-24 bg-[#BAE6FD]">
          <h1 className="font-Lato font-medium text-5xl">About us</h1>
          <p className="font-Poppins font-normal text-lg mt-3">
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

          <div className="grid grid-cols-3 gap-10 mt-14 ">
            <div className="card flex flex-col items-center pt-3">
              <img src={ProfileRangga} alt="profile-rangga" />
              <h1 className="font-Poppins font-bold text-4xl text-[#2F3147]">
                Rangga
              </h1>
              <p className="font-Poppins font-normal text-base text-[#404557]">
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

            <div className="card flex flex-col items-center pt-3">
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

            <div className="card flex flex-col items-center pt-3">
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

        <div className="pt-24 px-40">
          <h1 className="font-Lato font-medium text-5xl">Work Flow</h1>
          <div className="mt-10">

            <div className="task flex gap-8">
              <div className="card flex flex-col items-center justify-center">
                <img
                  className="w-20 h-20 mt-5"
                  src={ProfileRidho}
                  alt="profile-ridho"
                />
                <h1 className="font-Poppins font-bold text-2xl text-[#2F3147] mt-3">
                  Ridho
                </h1>
                <p className="font-Poppins font-normal text-base text-[#404557] mt-1">
                  Web Designer
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-Poppins font-medium text-2xl text-[#2F3147]">
                  Mendesain semua tampilan website, yang menggunakan :
                </h1>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <img
                    className="w-10 h-10 ml-3"
                    src={LogoFigma}
                    alt="logo-figma"
                  />
                  <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                    Figma, software berbasis web untuk design yang memudahkan
                    untuk prototyping.
                  </p>
                </div>
              </div>
            </div>
            <img className="mx-auto mt-9 mb-6 " src={BottomRow} alt="" />


            <div className="task flex gap-8">
              <div className="card flex flex-col items-center justify-center">
                <img
                  className="w-20 h-20 mt-5"
                  src={ProfileRaffi}
                  alt="profile-raffi"
                />
                <h1 className="font-Poppins font-bold text-2xl text-[#2F3147] mt-3">
                  Raffi
                </h1>
                <p className="font-Poppins font-normal text-base text-[#404557] mt-1">
                  Frond End Developer
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-Poppins font-medium text-2xl text-[#2F3147]">
                  Membuat tampilan web sesuai dengan desain yang ada
                </h1>

                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <img
                    className="w-10 h-10 ml-3"
                    src={LogoHtml}
                    alt="logo-html"
                  />
                  <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                    HTML, untuk membuat kerangka web
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <img
                    className="w-10 h-10 ml-3"
                    src={LogoCss}
                    alt="logo-css"
                  />
                  <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                    CSS, untuk membuat tampilan web sesuai desain yang ada
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <img
                    className="w-10 h-10 ml-3"
                    src={LogoJs}
                    alt="logo-js"
                  />
                  <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                    Javascript, untuk membuat web lebih interaktif
                  </p>
                </div>
              </div>
            </div>
            <img className="mx-auto mt-9 mb-6 " src={BottomRow} alt="" />

            <div className="task flex gap-8">
              <div className="card flex flex-col items-center justify-center">
                <img
                  className="w-20 h-20 mt-5"
                  src={ProfileRangga}
                  alt="profile-rangga"
                />
                <h1 className="font-Poppins font-bold text-2xl text-[#2F3147] mt-3">
                  Rangga
                </h1>
                <p className="font-Poppins font-normal text-base text-[#404557] mt-1">
                  Developer Dewa
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h1 className="font-Poppins font-medium text-2xl text-[#2F3147]">
                  Membuat aplikasi agar berfungsi sesuai rencana
                </h1>
                <div className="flex items-center">

                  <p className="font-Poppins font-normal text-base text-[#2F3147] desc">
                    <span className="font-semibold italic">Developer Dewa</span> bukan sekedar developer, tugasnya adalah sebagai fullstack developer,
                    yang berarti membuat aplikasi web yang interaktif, dari logika pemrograman, database, server,
                    sampai hosting aplikasi web agar bisa digunakan oleh pengguna adalah tugasnya.
                  </p>
                </div>
              </div>

            </div>
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoReact}
                  alt="logo-react"
                />
                <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                  React, framework yang digunakan untuk membuat web yang interaktif
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoNode}
                  alt="logo-node"
                />
                <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                  Node.js, software pendukung pengembangan web untuk lingkungan JavaScript
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoMongo}
                  alt="logo-Mongo"
                />
                <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                  MongoDB, untuk sistem database
                </p>
              </div>

              <div className="flex items-center">
                <div className="w-4 h-4 bg-black rounded-full"></div>
                <img
                  className="w-10 h-10 ml-3"
                  src={LogoHeroku}
                  alt="logo-heroku"
                />
                <p className="ml-2 font-Poppins font-normal text-base text-[#2F3147]">
                  Heroku, layanan cloud untuk hosting website
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
      <footer className="w-full h-20 flex justify-center items-center bg-[#2F3147] text-white font-semibold ">© SevenTech 2022</footer>
    </>
  );
};

export default About;
