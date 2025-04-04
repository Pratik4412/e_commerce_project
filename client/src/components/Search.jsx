import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { IoMdArrowRoundBack } from "react-icons/io";
import useMobile from "../hooks/useMobile";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };
  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-10 rounded-lg border border-gray-200 sm:px-2 flex items-center overflow-hidden gap-2 text-neutral-500 bg-slate-50 group focus-within:border-primary-200 ">
      {isSearchPage && isMobile ? (
        <Link to="/" className="flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
          <IoMdArrowRoundBack size={24} />
        </Link>
      ) : (
        <button className="flex justify-center items-center h-full group-focus-within:text-primary-200">
          <IoSearch size={18} />
        </button>
      )}
      <div className="w-full">
        {!isSearchPage ? (
          //not in search page
          <div onClick={redirectToSearchPage}>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "suger"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //in search page
          <div className="w-full h-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search for atta dal and more"
              autoFocus
              className="bg-transparent w-full h-full outline-none"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
