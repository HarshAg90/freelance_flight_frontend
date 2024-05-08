import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useState } from "react";
const CustomHeader = ({ page }) => {
  let [mobile, setMobile] = useState(false);
  let [destOpen, setDestOpen] = useState(false);
  const [uid, setUid] = useState("");

  useEffect(() => {
    // Extract UID from local storage on component mount or page reload
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      setUid(storedUid);
    }
  }, []);
  return (
    <div id="customHeader">
      <div className="site-branding">
        <Link legacyBehavior href="/">
          <a className="brand-logo">
            <img src="assets/images/logo/logo-black.png" alt="Site Logo" />
          </a>
        </Link>
      </div>
      <div className="menuBtn" onClick={() => setMobile(!mobile)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="10"
          viewBox="0 0 320 512"
        >
          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
        </svg>
      </div>
      <nav className={mobile ? "mobile" : ""}>
        {/* {page == "home" ? (
          <ul>
            <li className="">
              <a href="/">Home</a>
            </li>
            <li className="">
              <a href="tour">
                Tours
              </a>
            </li>
            <li className="has-children">
              <a href="#" onClick={() => setDestOpen(!destOpen)}>
                Destination <i className="far fa-angle-down" />
              </a>
              <ul className={destOpen ? "show" : ""}>
                <li>
                  <Link href="destination">Destination</Link>
                </li>
                <li>
                  <Link href="destination-details">Destination Details</Link>
                </li>
              </ul>
            </li>
            <li className="">
              <a href="blog-details">Blog</a>
            </li>
          </ul>
        ) : ( */}
        <ul>
          <li className="">
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>{" "}
              Home
            </a>
          </li>
          <li className="">
            <a href="search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>{" "}
              Flights {/* <span className="dd-trigger"></span> */}
            </a>
          </li>

          <li className="">
            <a href="HotelSearch">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>{" "}
              Hotel {/* <span className="dd-trigger"></span> */}
            </a>
          </li>
          <li className="">
            <a href="BusSearch">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>{" "}
              Bus {/* <span className="dd-trigger"></span> */}
            </a>
          </li>
          <li className="has-children">
            <a href="#" onClick={() => setDestOpen(!destOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>{" "}
              More {/* <span className="dd-trigger"> */}
              {/* </span> */}
            </a>
            <ul className={destOpen ? "show" : ""}>
              <li>
                <Link href="tour">Tour</Link>
              </li>
              <li>
                <Link href="destination">Destination</Link>
              </li>
              {/* <li>
                <Link href="destination-details">Destination Details</Link>
              </li> */}
              <li>
                <Link href="blog-details">Blog</Link>
              </li>
            </ul>
          </li>
        </ul>
        {/* )} */}
      </nav>
      <Link legacyBehavior href="/AuthPage">
        <a className={page == "home" ? "login" : "login blue"}>
          {uid ? "My profile" : "Login"}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
          </svg> */}
        </a>
      </Link>
    </div>
  );
};
export default CustomHeader;
