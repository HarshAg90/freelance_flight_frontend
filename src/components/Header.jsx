import { useEffect, useState } from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoBed } from "react-icons/io5";
import { FaBusAlt } from "react-icons/fa";
import Link from "next/link";

const Header = ({ hide, variant }) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    // This code will run only on the client side
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <div
      class={`h-20 fixed w-full z-50 flex select-none transition-all ease-in-out ${
        variant === "home"
          ? "text-white  justify-evenly"
          : variant === "login"
          ? "text-white justify-start px-5"
          : "text-black shadow-lg bg-white  justify-evenly"
      } ${hide && variant === "home" ? "-top-20" : "top-0"}`}
    >
      {variant !== "login" && (
        <div className="flex justify-start h-full w-full mx-5 gap-5">
          <Link
            prefetch={true}
            href={"/search"}
            className={`flex align-middle gap-3 cursor-pointer hover:opacity-70 border-b-8 ${
              currentPath === "/flights"
                ? "border-[#FF385C]"
                : "border-transparent"
            }`}
          >
            <IoAirplaneSharp className="self-center" size={25} />
            <h5 className="self-center font-Montserrat font-semibold text-sm">
              Find Flight
            </h5>
          </Link>
          <Link
            prefetch={false}
            href={"/HotelSearch"}
            className={`flex align-middle gap-3 cursor-pointer hover:opacity-70 border-b-8 ${
              currentPath === "/stays"
                ? "border-[#FF385C]"
                : "border-transparent"
            }`}
          >
            <IoBed className="self-center" size={25} />
            <h5 className={`self-center font-Montserrat font-semibold text-sm`}>
              Find Stays
            </h5>
          </Link>
          <Link
            prefetch={false}
            href={"/BusSearch"}
            className={`flex align-middle gap-3 cursor-pointer hover:opacity-70 border-b-8 ${
              currentPath === "/buses"
                ? " border-[#FF385C]"
                : "border-transparent"
            }`}
          >
            <FaBusAlt className="self-center" size={20} />
            <h5 className="self-center font-Montserrat font-semibold text-sm">
              Find Bus
            </h5>
          </Link>
        </div>
      )}
      <div
        className={`h-full ${
          variant === "login" ? "w-auto" : "w-full"
        } flex justify-center mx-3`}
      >
        <Link
          prefetch={false}
          href={"/"}
          className={`flex align-middle gap-3 cursor-pointer hover:opacity-70 `}
        >
          <h1 className="text-3xl font-MrsSheppards self-center font-normal">
            Fare Flyings
          </h1>
        </Link>
        {/* {(variant === "home" || variant === "login") && (
          <h1 className="text-3xl font-MrsSheppards self-center font-normal">
            Fare Flyings
          </h1>
        )} */}
      </div>
      {variant !== "login" && (
        <div className="h-full w-full flex justify-end mx-10 gap-3">
          <Link
            prefetch={false}
            href={"/login"}
            className={`flex align-middle gap-3 cursor-pointer hover:opacity-70 `}
          >
            <button className="self-center text-sm p-3 font-semibold font-Montserrat cursor-pointer hover:opacity-70">
              Login
            </button>
          </Link>
          <Link
            prefetch={false}
            href={"/login"}
            className={`flex align-middle gap-3 cursor-pointer hover:opacity-70 `}
          >
            <button className="self-center text-sm p-3 px-5 rounded-xl text-white font-semibold font-Montserrat bg-[#FF385C] cursor-pointer hover:opacity-75">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
