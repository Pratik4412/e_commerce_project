import React from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { validURLConvert } from "../utils/ValideURLConvert";

const CardProduct = ({ data }) => {
  const url = `product/${validURLConvert(data.name)}-${data._id}`;
  return (
    <Link
      to={url}
      className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden  ">
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>
      <div className="px-2 rounded font-semibold text-xs lg:text-sm py-[2px] text-green-600 bg-green-100 w-fit ">
        10 Min
      </div>
      <div className="font-medium text-ellipsis lg:text-base text-sm line-clamp-2 px-2 lg:px-0">
        {data?.name}
      </div>
      <div className="w-fit px-2 lg:px-0 text-sm lg:text-base">
        {data?.unit}
      </div>
      <div className="px-2 lg:px-0 flex items-center justify-between gap-3 text-sm lg:text-base">
        <div className="font-semibold">{DisplayPriceInRupees(data?.price)}</div>
        <div className="">
          <button className="bg-green-600 hover:bg-green-500 lg:px-4 px-2 py-1 rounded text-white">
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
