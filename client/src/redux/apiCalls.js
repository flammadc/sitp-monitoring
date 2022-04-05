import { loginStarted, loginError, loginSuccess } from "./userSlice";
import { publicRequest, userRequest } from "../requestMethods";
import Cookies from "universal-cookie";

export const login = async (dispatch, user, navigate) => {
  const cookies = new Cookies();
  dispatch(loginStarted());
  try {
    const res = await userRequest.post("/auth/login", user);
    if (user.remember) {
      cookies.set("access_token", res.data.accessToken, {
        expires: new Date(new Date().getTime() + 3600 * 7200),
      });
    }
    cookies.set("access_token", res.data.accessToken);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginError({ message: error.message }));
  }
};
