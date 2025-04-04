import React, { useState } from "react";
import { BsEmojiAngryFill } from "react-icons/bs";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosTostError";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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
    if (data.password !== data.confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
      console.log("response", response.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p>Welcome to Blinkit</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border rounded outline-none focus-within:border-primary-200"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
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
          </div>
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">confirmPassword : </label>
            <div className="bg-blue-50 p-2 border rounded flex items-center justify-between focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                autoFocus
                className="outline-none w-full"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Enter your confirmPassword"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            disabled={!validealue}
            className={`${
              validealue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500 "
            } text-white py-2 px-6 rounded font-semibold my-3 tracking-wide`}
          >
            Register
          </button>
        </form>
        <p>
          Already you have an account?{" "}
          <Link
            to={"/login"}
            className="text-green-700 font-semibold text hover:text-green-900"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
