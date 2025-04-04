import React, { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosTostError";
import { Link, useNavigate } from "react-router-dom";
const ForgotPass = () => {
  const [data, setData] = useState({
    email: "",
  });
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
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="container w-full mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className="grid gap-4 py-4 text-semibold">Forgot password</p>
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
          <button
            disabled={!validealue}
            className={`${
              validealue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500 "
            } text-white py-2 px-6 rounded font-semibold my-3 tracking-wide`}
          >
            Send Otp
          </button>
        </form>
        <p>
          Already you have account?{" "}
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

export default ForgotPass;
