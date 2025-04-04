import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitterX } from "react-icons/bs";
const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p> © All Rights Reserved 2024</p>
        <div className="flex items-center gap-3 justify-center text-2xl">
          <a href="" className="hover:text-primary-100">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-100">
            <AiFillInstagram />
          </a>
          <a href="" className="hover:text-primary-100">
            <BsTwitterX />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
