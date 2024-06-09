import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

const Testimonals = () => {
  const [testimonals, setTestimonals] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  return (
    <div className="w-full h-full cursor-grab  mt-16 select-none">
      <Carousel infinite responsive={responsive}>
        {testimonals &&
          testimonals.map((index) => {
            return <TestimonalCard key={index} />;
          })}
      </Carousel>
    </div>
  );
};

const TestimonalCard = () => {
  return (
    <div
      className={` w-80 max-sm:w-72 h-52 my-10 rounded-xl flex flex-col justify-center align-middle shadow-xl shadow-gray-200 bg-white`}
    >
      <img
        className="h-16 w-16 rounded-full self-center -mt-10 mb-4"
        src="https://s3-alpha-sig.figma.com/img/f49f/59a5/b3573aa25f7e177947036b9795db383f?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XsZum9-eh3b7PMq5pSmPMXjsY1FfSw56lg7aWEEFif7VbEpzUyHJuud9n-FyZkf5KwaNQXN-lqOCZRzPgsSHxFK7plE4hCrIHVSNYGXp7IjDeikyddk3qmQ54qBEjtsp82vxma937wlS5acNfJz0-0ZJjV5bbxNlu3x88cX4KPK2~KMofNKqEof9c8w5KvISQnAFbcmEn2uwd8x4t1iTslf5aAOg5rV~N3m3PTlt-SvrYs-Ae4Q9va8WcIHmOfNc9n1eZyrXQDiGbkuq900pYy9imrP2dsaBia-o82iMZjc-jt3A4fnTi5rVdjtNGMPCLxUBCo5wmMWm6ACZdo5-ug__"
      ></img>
      <p className="text-sm text-gray-600 self-center px-5 mb-10">
        Odit deserunt quia et sed repellendus veniam totam. Illo magnam
        perferendis. Impedit laborum ipsa doloremque rerum. Est rerum aut
        dolorum et omnis a.{" "}
      </p>
      <div className="flex justify-between">
        <span className="flex gap-2 px-5">
          <FaStar color="#DABE29" />
          <FaStar color="#DABE29" />
          <FaStar color="#DABE29" />
          <FaStar color="#DABE29" />
          <FaStar color="#DABE29" />
        </span>
        <span className="mx-2 flex flex-col">
          <p className=" text-nowra max-sm:text-xs font-bold font-Poppins">
            Carolyn Jacobson
          </p>
          <p className=" text-xs text-gray-400 font-Poppins">Brazil</p>
        </span>
      </div>
    </div>
  );
};

export default Testimonals;
