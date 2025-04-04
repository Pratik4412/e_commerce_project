import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosTostError";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import { TbExternalLink } from "react-icons/tb";
import isAdmin from "../utils/isAdmin";
const UsersMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response?.data?.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div className="">
      <div className="font-semibold">My Account</div>
      <div className="flex flex-col gap-2">
        <h6 className="text-sm flex items-center gap-2">
          <span className="max-w-52 text-ellipsis line-clamp-1"></span>
          {user.name || user.mobile}{" "}
          <span className="text-medium text-red-400">
            {user.role === "ADMIN" ? "(Admin)" : "(User)"}
          </span>
          <Link
            onClick={handleClose}
            to={"/dashboard/profile"}
            className="hover:text-primary-200"
          >
            <TbExternalLink size={16} />
          </Link>
        </h6>
      </div>
      <Divider />
      <div className="text-sm grid gap-2">
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/category"}
            className="px-2 hover:bg-orange-200 py-1"
          >
            Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/sub-Ccategory"}
            className="px-2 hover:bg-orange-200 py-1"
          >
            Sub Category
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/upload-product"}
            className="px-2 hover:bg-orange-200 py-1"
          >
            Upload Product
          </Link>
        )}
        {isAdmin(user.role) && (
          <Link
            to={"/dashboard/product"}
            className="px-2 hover:bg-orange-200 py-1"
          >
            Product
          </Link>
        )}
        <Link
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          My Order
        </Link>
        <Link
          to={"/dashboard/address"}
          className="px-2 hover:bg-orange-200 py-1"
        >
          Save Address
        </Link>
        <button
          className="text-left px-2 hover:bg-orange-200 py-1"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UsersMenu;
