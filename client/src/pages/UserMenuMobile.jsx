import React from "react";
import UsersMenu from "../components/UsersMenu";
import { IoClose } from "react-icons/io5";
const UserMenuMobile = () => {
  return (
    <section className="bg-white h-full w-full py-4 px-3">
      <button onClick={() => window.history.back()} className="text-neutral-800 block w-fit ml-auto">
        <IoClose size={24} />
      </button>
      <div className="container mx-auto p-3">
        <UsersMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
