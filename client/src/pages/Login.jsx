import React, { useState } from "react";
import { BsEmojiAngryFill } from "react-icons/bs";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosTostError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validealue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accessToken", response.data.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p>Login</p>
        <form className="grid gap-4 mt-1" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              name="email"
              id="email"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password">Password : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                autoFocus
                className="outline-none w-full"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>
            <Link
              to={"/forgot-password"}
              className="block ml-auto hover:text-primary-200"
            >
              Forgot password?
            </Link>
          </div>
          <button
            disabled={!validealue}
            className={`${
              validealue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500 "
            } text-white py-2 px-6 rounded font-semibold my-3 tracking-wide`}
          >
            Login
          </button>
        </form>
        <p>
          Don't you have account?{" "}
          <Link
            to={"/register"}
            className="text-green-700 font-semibold text hover:text-green-900"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
