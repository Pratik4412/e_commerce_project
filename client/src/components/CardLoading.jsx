import React from "react";

const CardLoading = () => {
  return (
    <div className="border p-4 grid gap-3 max-w-32 lg:max-w-52 rounded animate-pulse ">
      <div className="min-h-14 lg:min-h-20 bg-blue-50"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded w-full"></div>
      <div className="p-2 lg:p-3 bg-blue-50 rounded w-14"></div>
      <div className="flex items-center justify-between gap-3">
        <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
        <div className="p-2 lg:p-3 bg-blue-50 rounded w-20"></div>
      </div>
    </div>

    // {/** 01:21:03 */}
  );
};

export default CardLoading;
