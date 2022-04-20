import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { logout } from "./redux/userSlice";

// PAGES
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import ModalLogout from "./components/Modal Logout/ModalLogout";
import RequireRole from "./utils/RequireRole";

// CSS
import "./app.css";
import About from "./pages/About/About";

function App() {
  const cookies = new Cookies();
  const currentUser = useSelector((state) => state.user.currentUser);
  const modal = useSelector((state) => state.user.modal);
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  // const currentUser = false;

  useEffect(() => {
    !cookies?.get("access_token") && dispatch(logout());
  }, []);

  return (
    <div className="App bg-white-sec min-w-full h-full">
      {modal && <ModalLogout />}
      <Routes>
        <Route path={"/login"} element={<Login />}></Route>
        <Route path={"/about"} element={<About />}></Route>
        <Route element={<RequireRole />}>
          <Route path="*" element={<Main />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
