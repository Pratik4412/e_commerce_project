import React, { useState } from "react";
// import logo from "../assets/logo.png";
import logo from "../assets/MegaMart.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UsersMenu from "./UsersMenu";
const Headers = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  const handleCloseMenu = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUsers = () => {
    if (!user?._id) {
      navigate("/login");
      return;
    }
    navigate("/user-menu-mobile");
  };
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 flex z-40 justify-center flex-col gap-1 bg-white">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center lg:h-full px-2 lg:px-6 justify-between">
          <Link to={"/"} className="h-full flex items-center">
            <img
              src={logo}
              width={120}
              height={30}
              alt="logo"
              className="hidden lg:block"
            />
            <img
              src={logo}
              width={80}
              height={30}
              alt="logo"
              className="lg:hidden"
            />
          </Link>
          {/* search section */}
          <div className="hidden lg:block ">
            <Search />
          </div>
          {/* login and my cart */}
          <div>
            {/* login and my cart for mobile version */}
            <button
              className="text-neutral-600 lg:hidden"
              onClick={handleMobileUsers}
            >
              <FaRegUserCircle size={28} />
            </button>

            {/* login and my cart for desktop version */}
            <div className="hidden lg:flex  items-center gap-10">
              {user?._id ? (
                <div className="relative">
                  <div
                    onClick={() => setOpenUserMenu((prev) => !prev)}
                    className="flex select-none items-center gap-2 cursor-pointer"
                  >
                    <p>Accounts</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={24} />
                    ) : (
                      <GoTriangleDown size={24} />
                    )}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-14">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UsersMenu close={handleCloseMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={redirectToLoginPage} className="text-lg px-2">
                  Login
                </button>
              )}
              <button className="flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white">
                <div className="animate-bounce">
                  {/* add to my cart */}
                  <TiShoppingCart size={28} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Headers;
