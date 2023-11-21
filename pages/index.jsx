import Layout from "@/src/layout/Layout";
import {
  partnerSliderOne,
  sliderActive3Item,
  sliderActive5Item,
  testimonialSliderOne,
} from "@/src/sliderProps";
import dynamic from "next/dynamic";
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'
import Link from "next/link";
import Slider from "react-slick";
import ImageSlider from '@/src/components/sliders/ImageSlider'
const Counter = dynamic(() => import("@/src/components/Counter"), {
  ssr: false,
});
const Index4 = () => {
  const slides = [
    { url: "/assets/images/carousel/varanasi.png", title: "beach" },
    { url: "/assets/images/carousel/city2.jpg", title: "boat" },
  ];

  return (
    <Layout header={4}>
      {/*====== Start Hero Section ======*/}
      <section className="hero-section">
        {/*=== Hero Wrapper ===*/}
        <div className="hero-wrapper-four">
          
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                {/*=== Hero Content ===*/}
                <div className="hero-content">
                  <h1 className="wow fadeInDown" data-wow-delay=".5s">
                    TIME TO TRAVEL!
                  </h1>
                  <div className="shape">
            <span>
              <img src="assets/images/hero/heroPlane.png" />
            </span>
                  </div>
                  {/*=== Hero Search ===*/}
                  <div
                    className="hero-search-form mb-40 wow fadeInDown"
                    data-wow-delay=".7s"
                  >
                    <form className="booking-form-two">
                      <div className="form_group">
                        <span>From</span>
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Delhi"
                        />
                      </div>
                      <div className="form_group">
                        <span>To</span>
                        <label>
                          <i className="far" />
                        </label>
                        <input
                          type="text"
                          className="form_control"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div className="form_group">
                        <span>Departure</span>
                        <label>
                          <i className="far" />
                        </label>
                        <input
                          type="text"
                          className="form_control"
                          placeholder="12 Nov, 2023"
                          name="text"
                        />
                      </div>
                      <div className="form_group">
                        <span>Return</span>
                        <label>
                          <i className="far" />
                        </label>
                        <input
                          type="text"
                          className="form_control"
                          placeholder="One Way"
                          name="text"
                        />
                      </div>
                      <div className="form_group">
                        <span className="travelClass">Travelers & Class</span>
                        <label>
                          <i className="far" />
                        </label>
                        <input
                          type="text"
                          className="form_control"
                          placeholder="3 Adults"
                          name="text"
                        />
                      </div>
                      {/* <div className="form_group">
                        <button className="booking-btn">
                          Book Now{" "}
                          <i className="far fa-angle-double-right" />
                        </button>
                      </div> */}
                    </form>
                  </div>
                  <img className="bookImg" src="assets/images/hero/bookImage.png" />
                  <div className="shapeSub">
            <span>
              <img src="assets/images/hero/heroSub.png" />
            </span>
                  </div>
                  
                </div>
              </div>
              {/* <div className="col-xl-5 d-xl-block d-none">
                <div
                  className="hero-image wow fadeInRight"
                  data-wow-delay=".8s"
                >
                  <img
                    src="assets/images/hero/hero-four_img-1.jpg"
                    alt="hero image"
                  />
                </div>
              </div> */}
            </div>
          </div>

          <div className="numbers row justify-content-center">
                  <div className="col-sm-4 col-6">
                    {/*=== Counter Item ===*/}
                    <div className="counter-item mb-55">
                      <h2 className="number">
                        <Counter end={35} />K+
                      </h2>
                      <p>Happy Traveler</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-6">
                    {/*=== Counter Item ===*/}
                    <div className="counter-item mb-55">
                      <h2 className="number">
                        <Counter end={42} />+
                      </h2>
                      <p>Tent Sites</p>
                    </div>
                  </div>
                  <div className="col-sm-4 col-6">
                    {/*=== Counter Item ===*/}
                    <div className="counter-item mb-55">
                      <h2 className="number">
                        <Counter end={99} />%
                      </h2>
                      <p>Positive Reviews</p>
                    </div>
                  </div>
              </div>
          

        </div>  
      </section>

      {/* <div className="horizontalLine "></div> */}

      
      {/*====== End Hero Section ======*/}
      <section className="placeCarousel pt-100 pb-70">
      {/* <ImageSlider slides={slides} /> */}
      {/* <div>
      <Carousel>
      <Carousel.Item>
        <img src="/assets/images/carousel/varanasi.png"/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/assets/images/carousel/varanasi.png"/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/assets/images/carousel/varanasi.png"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      </div> */}

<CCarousel controls>
  <CCarouselItem>
    <CImage className="d-block w-100" src="/assets/images/carousel/varanasi.png" alt="slide 1" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src="/assets/images/carousel/taj.png" alt="slide 3" />
  </CCarouselItem>
  <CCarouselItem>
    <CImage className="d-block w-100" src="/assets/images/carousel/city2.png" alt="slide 2" />
  </CCarouselItem>
</CCarousel>
      
      </section>
      {/*====== Start Places Section ======*/}
      <section className="places-section pt-100 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              {/*=== Section Title ===*/}
              <div className="section-title text-center mb-50 wow fadeInDown">
                <h2>More Hotspots to Check Out...</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-20.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Hiking Mountains
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Himachal Pradesh, India
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-21.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Surfer Riding Wave
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Goa, India
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-22.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Tracing Hill On Cloud
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Manipur, India
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-23.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Hill House On Sea
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Kerala, India
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-24.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Tent Camping
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Andaman & Nicobar Island
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-25.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Hiking Mountains
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Arefu, AG, Romania
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-26.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Visit Bridge
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    London, United Kingdom
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              {/*=== Single Place Item Three ===*/}
              <div className="single-place-item-three mb-30 wow fadeInUp">
                <div className="place-img">
                  <img
                    src="assets/images/place/place-27.jpg"
                    alt="Place Image"
                  />
                </div>
                <div className="place-content">
                  <h4 className="title">
                    <Link legacyBehavior href="/tour-details">
                      Rafting
                    </Link>
                  </h4>
                  <p className="location">
                    <i className="far fa-map-marker-alt" />
                    Nordegg, Canada
                  </p>
                  <div className="meta">
                  <p className="location">
                    Best Time to Visit: <br/> Nov-Dec
                  </p>
                    <a href="#" className="icon-btn">
                      <i className="far fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Places Section ======*/}
      {/*====== Start Service Section ======*/}
      <section className="service-section-two black-bg pt-100 pb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7">
              {/*=== Section Title ===*/}
              <div className="section-title text-center text-white mb-45 wow fadeInDown">
                <span className="sub-title">Popular Services</span>
                <h2>Hotel Booking Await On Our <br/> Site!</h2>
              </div>
            </div>
          </div>
          <Slider
            {...sliderActive3Item}
            className="slider-active-3-item wow fadeInUp"
          >
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-four">
              <div className="img-holder">
                <img
                  src="assets/images/service/service-7.jpg"
                  alt="Service Image"
                />
              </div>
              <div className="content">
                <h3 className="title">Service 1</h3>
                <p>
                  Sit amet consecteturauris natoque name pellentue augue mattis
                  faucibus
                </p>
                <div className="meta">
                  <span className="icon">
                    <i className="flaticon-blanket" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-cat" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-tent" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-fire" />
                  </span>
                </div>
              </div>
            </div>
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-four">
              <div className="img-holder">
                <img
                  src="assets/images/service/service-8.jpg"
                  alt="Service Image"
                />
              </div>
              <div className="content">
                <h3 className="title">Service 2</h3>
                <p>
                  Sit amet consecteturauris natoque name pellentue augue mattis
                  faucibus
                </p>
                <div className="meta">
                  <span className="icon">
                    <i className="flaticon-blanket" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-cat" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-tent" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-fire" />
                  </span>
                </div>
                <div className="action-btn">
                </div>
              </div>
            </div>
            {/*=== Single Service Item ===*/}
            <div className="single-service-item-four">
              <div className="img-holder">
                <img
                  src="assets/images/service/service-9.jpg"
                  alt="Service Image"
                />
              </div>
              <div className="content">
                <h3 className="title">Service 3</h3>
                <p>
                  Sit amet consecteturauris natoque name pellentue augue mattis
                  faucibus
                </p>
                <div className="meta">
                  <span className="icon">
                    <i className="flaticon-blanket" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-cat" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-tent" />
                  </span>
                  <span className="icon">
                    <i className="flaticon-fire" />
                  </span>
                </div>
                <div className="action-btn">
                </div>
              </div>
            </div>
          </Slider>
          {/*=== Text Box ===*/}
          <div className="big-text pt-100 wow fadeInDown">
            <img src="assets/images/bg/adventure.png" alt="Adventure" />
          </div>
        </div>
      </section>
      {/*====== End Service Section ======*/}

      {/* HEREEEEEEEEEEEEEEEEEEEEE */}

      {/*====== Start Why Choose Section ======*/}
      <section className="why-choose-section gray-bg pt-100 pb-50">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-xl-7">
              {/*=== Choose Content Box ===*/}
              <div className="choose-content-box pr-lg-70">
                {/*=== Section Title ===*/}
                <div className="section-title mb-45 wow fadeInDown">
                  <span className="sub-title">Read FAQs</span>
                  <h2>Curious Flyers Corner: Where Questions Take Flight</h2>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                        <img className="qnaImage" src="assets/images/qna.png" alt="" />
                      </div>
                      <div className="text">
                        <h4 className="title">Booking Bliss</h4>
                        <p>
                        Unlock the secrets to seamless flight reservations, changes, and cancellations.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                      <img className="qnaImage" src="assets/images/qna.png" alt="" />
                      </div>
                      <div className="text">
                        <h4 className="title">Navigating Classes</h4>
                        <p>
                        Discover the perks of each class and learn how to upgrade or modify your seat preferences.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                      <img className="qnaImage" src="assets/images/qna.png" alt="" />
                      </div>
                      <div className="text">
                        <h4 className="title">SkyMiles Club</h4>
                        <p>
                        Get clarity on baggage rules, pet-friendly options, and assistance for special needs.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    {/*=== Fancy Icon Box ===*/}
                    <div className="fancy-icon-box-four mb-45 wow fadeInUp">
                      <div className="icon">
                      <img className="qnaImage" src="assets/images/qna.png" alt="" />
                      </div>
                      <div className="text">
                        <h4 className="title">Policies Demystified</h4>
                        <p>
                        Join the Fair Flying loyalty program – understand benefits, earning, redeeming, and exclusive perks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              {/*=== Experience Box ===*/}
              <div className="experience-box text-center text-xl-right mb-50 wow fadeInRight">
                <img src="assets/images/features/years.png" alt />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Why Choose Section ======*/}
      {/*====== Start Testimonial Section ======*/}
      <section className="testimonial-section-two pt-100">
        <div className="container">
          <div className="row align-items-xl-center">
            <div className="col-xl-5 order-2 order-xl-1">
              <div className="testimonial-image-box text-xl-left text-center wow fadeInLeft">
                <img
                  src="assets/images/testimonial/testimonial-2.png"
                  alt="Icon Image"
                />
              </div>
            </div>
            <div className="col-xl-7 order-1 order-xl-2">
              {/*=== Testimonial Slider ===*/}
              <Slider
                {...testimonialSliderOne}
                className="testimonial-slider-one pl-lg-55 mb-40 wow fadeInRight"
              >
                {/*=== Testimonial Item ===*/}
                <div className="gw-testimonial-item">
                  <div className="testimonial-inner-content">
                    <div className="quote-rating-box">
                      <div className="icon">
                        <img
                          src="assets/images/testimonial/quote.png"
                          alt="quote icon"
                        />
                      </div>
                      <div className="ratings-box">
                        <h4>Quality Services</h4>
                        <ul className="ratings">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                    I have used Their service and they are incredible.
                    </p>
                    <div className="author-thumb-title">
                      <div className="author-thumb">
                        <img
                          src="assets/images/testimonial/aman.png"
                          alt="Author Image"
                        />
                      </div>
                      <div className="author-title">
                        <h3 className="title">Aman Verma</h3>
                        <p className="position">From Delhi</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*=== Testimonial Item ===*/}
                <div className="gw-testimonial-item">
                  <div className="testimonial-inner-content">
                    <div className="quote-rating-box">
                      <div className="icon">
                        <img
                          src="assets/images/testimonial/quote.png"
                          alt="quote icon"
                        />
                      </div>
                      <div className="ratings-box">
                        <h4>Quality Services</h4>
                        <ul className="ratings">
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                          <li>
                            <i className="fas fa-star" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                      Their service is seamless and best in class. They are also very supportive!
                    </p>
                    <div className="author-thumb-title">
                      <div className="author-thumb">
                        <img
                          src="assets/images/testimonial/author-1.jpg"
                          alt="Author Image"
                        />
                      </div>
                      <div className="author-title">
                        <h3 className="title">Douglas D. Hall</h3>
                        <p className="position">From Bihar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
          {/*=== Blog Area ===*/}
          <div className="blog-area pt-60 pb-60">
            <div className="row justify-content-center">
              <div className="col-xl-7">
                <div className="section-title text-center mb-45 wow fadeInDown">
                  <span className="sub-title">News &amp; Blog</span>
                  <h2>Amazing News &amp; Blog For Every Single Update</h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/*=== Single Blog Post ===*/}
                <div className="single-blog-post-three mb-40 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img src="assets/images/blog/image1.png" alt="Blog Image" />
                  </div>
                  <div className="entry-content">
                    <div className="post-meta">
                      <span>
                        <i className="far fa-calendar-alt" />
                        <a href="#">November 2022</a>
                      </span>
                      <h3 className="title">
                        <Link legacyBehavior href="/blog-details">
                          <a>
                          Exploring India's Best-Kept Secrets: Unveiling the Hidden Gems
                          </a>
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/*=== Single Blog Post ===*/}
                <div className="single-blog-post-three mb-40 wow fadeInDown">
                  <div className="post-thumbnail">
                    <img src="assets/images/blog/image2.png" alt="Blog Image" />
                  </div>
                  <div className="entry-content">
                    <div className="post-meta">
                      <span>
                        <i className="far fa-calendar-alt" />
                        <a href="#">November 2022</a>
                      </span>
                      <h3 className="title">
                        <Link legacyBehavior href="/index-4">
                          <a>
                          Unveiling India's Glorious Heritage: A Journey Through History
                          </a>
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/*=== Single Blog Post ===*/}
                <div className="single-blog-post-three mb-40 wow fadeInUp">
                  <div className="post-thumbnail">
                    <img src="assets/images/blog/image3.png" alt="Blog Image" />
                  </div>
                  <div className="entry-content">
                    <div className="post-meta">
                      <span>
                        <i className="far fa-calendar-alt" />
                        <a href="#">November 2022</a>
                      </span>
                      <h3 className="title">
                        <Link legacyBehavior href="/index-3">
                          <a>
                          Schengen Visa Types: Understanding the Different Categories and Their Eligibility Criteria
                          </a>
                        </Link>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*====== End Testimonial Section ======*/}
    </Layout>
  );
};
export default Index4;
