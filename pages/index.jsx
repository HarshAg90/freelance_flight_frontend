import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaDiamond } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { FaBusAlt } from "react-icons/fa";
import Testimonals from "@/src/components/Testimonals";
import Carousel from "react-multi-carousel";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";

const Home = () => {
  const [headershow, setheaderShow] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },

    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop < 90) {
      setheaderShow(false);
    } else {
      setheaderShow(true);
    }
  };

  const testImage =
    "https://s3-alpha-sig.figma.com/img/d710/f35c/4aaf425991cf00af29b2d305cbef1d34?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Tj9T1czO6UIjVvmhUZaA8aHQMXyqP8wY2h2tT6ty5LZA-r8Sg6S0uQbMcS80juKo1fxI23anBKCCaL7nsuKHSbnz3d93jpkGEcI0P3HrC6gDrOtIXHX2gwIbxLPL~yxdcAbD1jYOxERLwGl9RBbWYsCmj5SsQRyixoKG4J4FI~DV38l2K4pnW02M3PMnSdaMVcVmoCyiZz9IZo4M4hVaHa9t-z8X9eqNcSWln7EPiWKhf4kBc1r0Tcg4oCztY3GQmCNh0m38L584Yqm-R4tTLthbA7ehXMwUPVzxU544xAmtQvy0ZmUolIgDTIOEr5BD36nfl-wd-HUh-3RsgHfMYQ__";

  return (
    <div
      onScroll={handleScroll}
      className="h-auto w-full flex flex-col bg-gray-100 scrollbar-thin scroll-smooth"
    >
      <Header hide={headershow} variant={"home"} />
      <div className="w-full flex flex-col justify-center">
        <div className="w-full h-[90vh] py-4 -mt-40 overflow-hidden opacity-95 relative max-sm:hidden">
          <img
            className="opacity-98 h-[180%] w-full mt-28"
            src={"images/home01.jpeg"}
          ></img>
          <div className="absolute flex flex-col top-80 left-52 gap-1">
            <h1 className="text-6xl font-bold text-white text-wrap font-Poppins">
              Book with us
            </h1>
            <h1 className="text-6xl font-bold text-white text-wrap font-Poppins">
              and enjoy your
            </h1>
            <h1 className="text-6xl font-bold text-white text-wrap font-Poppins">
              Journey.
            </h1>
          </div>
        </div>
        <div className="w-[80%] h-[20vh] mb-32 bg-white shadow-xl z-40 -mt-20 self-center rounded-2xl"></div>
        <div className="w-full px-48 max-sm:px-1 flex max-sm:flex-col gap-20 max-sm:gap-0">
          <div className="w-full flex justify-start">
            <img
              className="h-[80%] max-sm:h-[70%] w-96 max-sm:w-full rounded-xl"
              src="https://s3-alpha-sig.figma.com/img/ecc2/59fb/dc5b657ae2b7b67a8355c63b743a34d2?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FMD1KnXMg1sYjZ9XqfrYCoyl9Ijovc3MwvzU~kzvfnRON5qiG8Mp7vIa3s4vRicgo3b7a281uH4P1nhkPDVyrvIcjLoWvlZvPcQYIX3QCAbJcpak6MhkGF8Anra60nLcdg-OC~~Bk9Bjp~Ikdufmji~WZ1ehLJECYDPTU7qD5A3JxT-HZXkE-bUl2dkdggZ3AhJBymfkcepo214w0S1XHzPE0xff-ENv8YDtqMkWiFthqGwQq63D~zGeIkRn7yGZHGi42MqXX4mFOdE0GRw~2WMU9sFW~pGIjTPDFKGy7qDqAwBkEzieRtKKsBqKROQNSa0fI2YANuSp-2ygGiVapg__"
            ></img>
            <span className=" h-64 max-sm:h-48 w-48 max-sm:w-40 -ml-10 max-sm:-ml-44 mt-20 p-2 bg-white rounded-lg overflow-hidden flex flex-col">
              <img
                className="h-40 max-sm:h-24 w-full"
                src="https://s3-alpha-sig.figma.com/img/bcf9/f989/e3ac1d8bd45e056a639de748e4982fb9?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NmHQSVx5kl~~jwWWgvhNVUT-g1sLsIK-rgPBbXLkdbvUyDSv-4vp36Ustu4o2kIGFcEcVo5j5tAfZbqJW7w3cZc6U7Ede2ctPnwr9sUphfKHOxer9o8AKlPyordNZUXblKeyNbsWefeM4-pG31uFMtt6hKusPS9xTCWYHycXwvHqf-jXJPWaMOxhpWtGRBpvQsTJk6UYHcMUKIgI-KNSLgDBF4wdFmmOqdYMMi8rVQlpQQpHDhaSNYy1gsykcsNlr10Fx2ng06pXGRPcaLcBeThqYUwT9btKRm9kRlrgCosBulTGsavY9l4STvmr3AAK34p25K0rpSywv8TEgknaXA__"
              ></img>
              <span className="flex justify-between m-1">
                <p className="text-xs font-semibold">Culpa Est Similique</p>
                <span className="flex gap-1">
                  <FaStar className="self-center text-xs" />
                  <p className="text-xs self-center">4.92</p>
                </span>
              </span>
              <p className="text-[9px] m-1 text-wrap p-1">
                Voluptatibus nemo amet voluptatem quia ipsa eum. Est ut
                voluptas.
              </p>
              <span className="border-t border-dashed flex justify-between">
                <h3 className="text-sm font-semibold flex gap-1">
                  $139.00
                  <p className=" text-[8px] text-gray-400 self-baseline">
                    Night
                  </p>
                </h3>
                <span className="flex gap-1 text-sm">
                  <HiOutlineLocationMarker className="self-center text-blue-500" />
                  India
                </span>
              </span>
            </span>
          </div>
          <div className="w-full text-black font-bold flex gap-2 font-Poppins text-5xl flex-col max-sm:p-2">
            <span className="flex gap-2 font-bold max-sm:text-lg max-sm:justify-center">
              <p className="text-[#FF385C]">Why </p> Choose Us
            </span>
            <span className="flex flex-col w-full">
              <p className="text-sm text-gray-400 font-normal max-sm:hidden">
                Tempora facere doloribus id aut. Ea maiores esse accusantium
                laboriosam. Quos commodi non assumenda quam illum.
              </p>
              <span className="flexs flex-col py-8 w-full">
                <p className="text-sm text-black font-semibold flex gap-2 text-nowrap my-4 max-sm:text-wrap">
                  <FaDiamond className="size-5 max-sm:size-8" color="#FF385C" />
                  Assumenda nobis sit deserunt dolorem repudiandae occaecati
                  quisquam.
                </p>
                <p className="text-sm text-black font-semibold flex gap-2 text-nowrap my-4 max-sm:text-wrap">
                  <FaDiamond className="size-5" color="#FF385C" />
                  Beatae aut beatae sed aliquid et accusamus vel.
                </p>
                <p className="text-sm text-black font-semibold flex gap-2 text-nowrap my-4 max-sm:text-wrap">
                  <FaDiamond className="size-5 max-sm:size-6" color="#FF385C" />
                  Dolores qui nihil quaerat ducimus fugit aut praesentium.
                </p>
                <p className="text-sm text-black font-semibold flex gap-2 text-nowrap my-4 max-sm:text-wrap">
                  <FaDiamond className="size-5 max-sm:size-8" color="#FF385C" />
                  Necessitatibus ut culpa molestias deleniti porro maxime enim
                  sed vel.
                </p>
              </span>
              <p className="text-sm text-gray-400 font-normal max-sm:hidden">
                Earum repellendus animi asperiores mollitia harum illo quia
                dicta. Praesentium aperiam amet. Dolorem praesentium sapiente
                aspernatur ipsum dignissimos saepe tempora est. Sapiente ea vero
                consectetur. Incidunt quia quae est. Mollitia consectetur optio
                quo qui beatae nihil aliquid qui.
              </p>
            </span>
          </div>
        </div>
        <div className="w-full mb-20 flex justify-center">
          <div className="flex h-96 max-sm:h-32 gap-10 max-sm:p-2 max-sm:gap-5 relative">
            <img
              className="rounded-xl w-[500px] max-sm:w-[150px]"
              src="https://s3-alpha-sig.figma.com/img/386b/9416/e96ccdb0e5e6ed83359941973439ac12?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XOIX7DauAtmeFywcO-SkN5oy5VCMKSFSZrlmUqIhJ29q3LZjOfL0uEE5eWHpTKiwbiOMFQBU1JDU3l127ajHXN5XnV2lrc4JDhQR80boAkT3lV8mBoqLJ7YwKO890CU5SfgL1OBJTPOxgwfl4-1XVIOfVC6G-ts4vhyTA1hLjb0klnasnFyp2hnRZk64Szitc3gZhBDzAjsW3s4GNfoet8FcOic2d~GGwvr64Ee463R4UT0Yl6GGtQQmAiT4jAgE6LjcnJ33eofBIzH0OUSPtP0Ikhzg9SaGwS8qaHllyq2wxbaq1yXgdqQTwT55MmeAiEo5GJChN0lw1kBJTyvLcQ__"
            ></img>
            <span className="absolute bottom-3 left-8 flex flex-col gap-1 max-sm:hidden">
              <p className="text-3xl text-white font-Poppins font-semibold text-center">
                Flights
              </p>
              <p className="text-white text-center">
                Search Flights & Places Hire to our most popular destinations
              </p>
              <button className="p-2 px-3 mt-2 bg-[#FF385C] w-40 h-10 self-center flex text-white gap-2 rounded-md hover:opacity-90">
                <IoIosSend size={20} className="self-center ml-2" />
                Show Flights
              </button>
            </span>
            <img
              className="rounded-xl w-[500px] max-sm:w-[150px]"
              src="https://s3-alpha-sig.figma.com/img/654e/85fd/80b8b446b1d71db54d7b5f47d8ad53a0?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=os-iBXycF0QrXJl4sVqgIN4ps8Y4Y5Yi1FkG6SuYFNBpz3DtnrgES15FMG4s7VzYbYwzkjwEhMpalmZg3cA2D0ILa1-f~2obz9tZPmgqISIJzlJ6S4QnbSvWQ~K63PzHuouCTJnP-Wvtw2opkZyx5-zr5BBKVeW0lnmXuEgxqRazYNS2e-1IZXKH4AtJmBUefLN~azw9nh-dXMYhcSetNdhEJ~SvnHsIRtHLbGwcWmKylmPzYHRLVR2lQvPmQXD7DBDrs7JmwLEiulA7ov0z42vz60-tVd29Z8zeb2SF2lNjZuD9qXj~RLuQ8LpZ0YLSyCA95S2cgcLL~j1gXPIJ~w__"
            ></img>
            <span className="absolute bottom-3 left-[55%] flex flex-col gap-1 max-sm:hidden">
              <p className="text-3xl text-white font-Poppins font-semibold text-center">
                Hotels
              </p>
              <p className="text-white text-center">
                Search hotels & Places Hire to our most popular destinations
              </p>
              <button className="p-2 px-3 mt-2 bg-[#FF385C] w-40 h-10 self-center flex text-white gap-2 rounded-md hover:opacity-90">
                <IoIosSend size={20} className="self-center ml-2" />
                Show Hotels
              </button>
            </span>
            <FaBusAlt
              size={30}
              color="#FF385C"
              className="bg-white max-sm:hidden p-4 h-16 w-16 rounded-full absolute -right-8 shadow-xl cursor-pointer top-[44%]"
            />
          </div>
        </div>
        <div className="w-full flex justify-center mb-16 flex-col px-40 max-sm:px-2">
          <span className="flex justify-center gap-3 w-full font-bold self-start text-5xl max-sm:text-lg font-Poppins">
            <p className="text-[#FF385C]">Hear</p>from our Users!
          </span>
          <p className="text-gray-600 max-sm:hidden">
            Tempora facere doloribus id aut. Ea maiores esse accusantium
            laboriosam. Quos commodi non assumenda quam illum.
          </p>
          <Testimonals />
        </div>
        <div className="w-full flex justify-center flex-col px-40 max-sm:px-2">
          <span className="flex flex-col gap-3 font-bold justify-center text-3xl font-Poppins">
            <p className="text-black self-center max-sm:text-lg">
              Follow Us On Instagram
            </p>
            <p className="text-[#FF385C] self-center font-semibold text-lg">
              @Fair_Flying
            </p>
          </span>
          <Carousel
            infinite
            responsive={responsive}
            className="my-20 cursor-grab"
          >
            <div className="w-64 h-72 bg-black rounded-xl overflow-hidden">
              <img
                draggable={false}
                className="w-full h-full opacity-55"
                src={testImage}
              ></img>
            </div>
            <div className="w-64 h-72 bg-black rounded-xl overflow-hidden">
              <img
                draggable={false}
                className="w-full h-full opacity-55"
                src={testImage}
              ></img>
            </div>
            <div className="w-64 h-72 bg-black rounded-xl overflow-hidden">
              <img
                draggable={false}
                className="w-full h-full opacity-55"
                src={testImage}
              ></img>
            </div>
            <div className="w-64 h-72 bg-black rounded-xl overflow-hidden">
              <img
                draggable={false}
                className="w-full h-full opacity-55"
                src={testImage}
              ></img>
            </div>
            <div className="w-64 h-72 bg-black rounded-xl overflow-hidden">
              <img
                draggable={false}
                className="w-full h-full opacity-55"
                src={testImage}
              ></img>
            </div>
          </Carousel>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
