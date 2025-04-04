import React from "react";
import UsersMenu from "../components/UsersMenu";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  console.log("user dashboard", user);
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[200px_1fr] ">
        {/* left part  */}
        <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-auto hidden lg:block border-r ">
          <UsersMenu />
        </div>
        {/* right  part  */}
        <div className="bg-white min-h-[76vh]">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
