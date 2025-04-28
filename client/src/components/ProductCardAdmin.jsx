import React from "react";

const ProductCardAdmin = ({ data }) => {
  return (
    <div className=" p-4 bg-white rounded">
      <div>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-full object-scale-down"
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium">{data?.name}</p>
      <p className="text-stone-400">{data?.unit}</p>
    </div>

    // video line 8:58:16
  );
};

export default ProductCardAdmin;
