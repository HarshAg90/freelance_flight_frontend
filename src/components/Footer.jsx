import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full flex flex-col px-20 max-sm:px-0 h-1/3 bg-black gap-5 max-sm:gap-0">
      <div className="w-full flex justify-evenly max-sm:flex-col">
        <div className="flex flex-col m-10 gap-2 max-sm:hidden">
          <p className="text-white font-Poppins font-bold my-3 -mx-2">
            Services
          </p>
          <p className="text-white">Bike and Rickshaw rental</p>
          <p className="text-white">Guided Bike Tour of Lucca</p>
          <p className="text-white">Trip In The Tuscan Hills</p>
          <p className="text-white">Transportation With Luxury Cars</p>
          <p className="text-white">Wine Tours By Bus With Guide</p>
        </div>
        <div className="flex flex-col m-10 gap-2 max-sm:hidden">
          <p className="text-white font-Poppins font-bold my-3 -mx-2">Home</p>
          <p className="text-white">Home</p>
          <p className="text-white">About Us</p>
          <p className="text-white">Tour Packages</p>
        </div>
        <div className="flex flex-col m-10 gap-2 max-sm:hidden">
          <p className="text-white font-Poppins font-bold my-3 -mx-2">Help</p>
          <p className="text-white">Terms of use</p>
          <p className="text-white">Privacy policy</p>
        </div>
        <div className="flex flex-col m-10 gap-2">
          <p className="text-white font-Poppins font-bold my-3 -mx-2">
            Contacts
          </p>
          <p className="text-white">Piazza Napoleone, Lucca, Tuscany</p>
          <p className="text-white">+39 346 368 5708</p>
          <p className="text-white">italiainlimo@gmail.com</p>
        </div>
        <div className="flex flex-col m-10 gap-2 text-white">
          <p className="text-white font-Poppins font-bold my-3 -mx-2">
            Social Media
          </p>
          <span className="w-full gap-5 flex">
            <FaTwitter className="cursor-pointer" size={30} />
            <FaFacebook className="cursor-pointer" size={30} />
            <FaInstagram className="cursor-pointer" size={30} />
          </span>
        </div>
      </div>
      <p className="text-white text-center max-sm:text-nowrap max-sm:h-10">
        Copyright © 2022. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
