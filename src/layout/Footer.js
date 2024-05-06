const Footer = ({ bg, extraClass }) => {
  return (
    <footer className={`main-footer ${bg ? bg : "black"}-bg `}>
      <div className="cont">
        {/* <div className="footer-cta">
          <div className="row">
            <div className="col-lg-6">
              <div className="single-cta-item pr-lg-60 mb-40">
                <div className="icon">
                  <img src="assets/images/icon/support.png" alt="Icon" />
                </div>
                <div className="content">
                  <h3 className="title">
                    Need Any Support For Tour &amp; Travels ?
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-cta-item pl-lg-60 mb-40">
                <div className="icon">
                  <img src="assets/images/icon/travel.png" alt="Icon" />
                </div>
                <div className="content">
                  <h3 className="title">
                    Ready to Get Started With Vacations!
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className="footerT">
          {/* <div className=""> */}
          {/* <div className="col-lg-3 col-md-6 w-10"> */}
          {/*=== Footer Widget ===*/}
          {/* <div className="footer-widget about-company-widget w-auto flex"> */}
          {/* <h4 className="widget-titlek">About</h4> */}
          {/* <div className="footer-content footer-widget-nav"> */}
          <a href="" className="footer-logo">
            <img
              src={
                bg === "gray"
                  ? "assets/images/logo/logo-black.png"
                  : "assets/images/logo/logo-white.png"
              }
              alt="Site Logo"
            />
          </a>
          {/* <div className="links"> */}
          <div className="div">
            <div className="">
              <a href="/about" style={{ textDecoration: "underline" }}>
                About us
              </a>
              <a href="/terms#terms" style={{ textDecoration: "underline" }}>
                Terms & Services
              </a>
              <a href="/terms#policy" style={{ textDecoration: "underline" }}>
                Privacy Policy
              </a>
              <a href="/contact_us" style={{ textDecoration: "underline" }}>
                Contact us
              </a>
            </div>
            <div className="">
              {/*=== Footer Nav ===*/}
              {/* <div className="footer-nav float-lg-end">
              <ul>
                <li> */}
              <a href="/terms#policy">Setting &amp; privacy</a>
              {/* </li>
                <li> */}
              <a href="/terms#terms">Faqs</a>
              {/* </li>
                <li> */}
              <a href="/contact_us">Support</a>
              {/* </li>
              </ul>
            </div> */}
            </div>
          </div>
          {/* </div>
              <div> */}
          {/* </div> */}
          {/* </div> */}
        </div>
        {/* </div> */}
        {/* <div className="col-lg-5 col-md-6">
              <div className="footer-widget service-nav-widget mb-40 pl-lg-70">
                <h4 className="widget-title">Services</h4>
                <div className="footer-content">
                  <ul className="footer-widget-nav">
                    <li>
                      <a href="#">Caravan Soler Tent</a>
                    </li>
                    <li>
                      <a href="#">Family Tent Camping</a>
                    </li>
                    <li>
                      <a href="#">Classic Tent Camping</a>
                    </li>
                    <li>
                      <a href="#">Wild Tent Camping</a>
                    </li>
                    <li>
                      <a href="#">Small Cabin Wood</a>
                    </li>
                  </ul>
                  <ul className="footer-widget-nav">
                    <li>
                      <a href="#">Need a Career ?</a>
                    </li>
                    <li>
                      <a href="#">Latest News &amp; Blog</a>
                    </li>
                    <li>
                      <a href="#">Core Features</a>
                    </li>
                    <li>
                      <a href="#">Meet Our teams</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
        {/* <div className="col-lg-4 col-md-6 flex-row">
            <div className="footer-widget footer-newsletter-widget w-auto">
              <h4 className="widget-title">Newsletter</h4>
              <div className="footer-content">
                <p>
                  Which of us ever undertake laborious physical exercise except
                  obtain
                </p>
                <form>
                  <div className="form_group">
                    <label>
                      <i className="far fa-paper-plane" />
                    </label>
                    <input
                      type="email"
                      className="form_control"
                      placeholder="Email Address"
                      name="email"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div> */}
        {/* </div> */}
        {/* </div> */}
        {/*=== Footer Copyright ===*/}
        <div className="footerB">
          {/* <div className="row"> */}

          <div className="">
            {/*=== Footer Text ===*/}
            <div className="footer-text">
              <p>
                Copy@ 2024{" "}
                <span style={{ color: "#F7921E" }}>
                  Fair flyings Services Pvt Ltd
                </span>
                , All Right Reserved
              </p>
            </div>
          </div>

          {/* </div> */}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
