import Link from "next/link";
import Menu from "./Menu";
import { useState } from "react";
const CustomHeader = () => {
  let [mobile, setMobile] = useState(false);
  let [destOpen, setDestOpen] = useState(false);
  return (
    <div id="customHeader">
      <div className="site-branding">
        <Link legacyBehavior href="/">
          <a className="brand-logo">
            <img src="assets/images/logo/logo-black.png" alt="Site Logo" />
          </a>
        </Link>
      </div>
      <div className="menuBtn" onClick={()=>setMobile(!mobile)}><svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg></div>
      <nav className={mobile ? "mobile" : ""}>
        <ul>
          <li className="">
            <a href="/">Home</a>
          </li>
          <li className="">
            <a href="tour">
              Tours
              {/* <span className="dd-trigger"></span> */}
            </a>
          </li>
          <li className="has-children">
            <a href="#" onClick={()=> setDestOpen(!destOpen)}>
              Destination <i className="far fa-angle-down" />
              {/* <span className="dd-trigger"> */}
                
              {/* </span> */}
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
      </nav>
        <Link legacyBehavior href="/contact">
          <a className="login">
            Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="16"
              viewBox="0 0 512 512"
            >
              <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
            </svg>
          </a>
        </Link>
    </div>
  );
};
export default CustomHeader;
