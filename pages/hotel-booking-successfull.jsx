import PageBanner from "@/src/components/PageBanner";
import { server_url } from "@/src/config";
import Layout from "@/src/layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function hotelBookingSuccessfull() {
  var [book, setBook] = useState();
  var [block, setBlock] = useState();
  var [loading, setLoading] = useState();
  var [block, setBlock] = useState();
  var [orderId, setOrderId] = useState();
  const router = useRouter();
  useEffect(() => {
    setBlock(JSON.parse(router.query.block));
    setBook(JSON.parse(router.query.book));
    setOrderId(router.query.orderId);
    console.log(router.query.orderId);
  }, []);
  const generateAndOpenPDF = async () => {
    setLoading(true);
    try {
      // Make a POST request to Flask route to generate PDF
      const response = await fetch(server_url + "/get_pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: orderId }),
      });

      if (response.ok) {
        // If response is successful, open PDF in new tab
        const blob = await response.blob();
        const pdfUrl = URL.createObjectURL(blob);
        setLoading(false);
        window.open(pdfUrl, "_blank");
      } else {
        // Handle API request failure
        setLoading(false);
        console.error(
          "Failed to generate PDF:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle network errors
      setLoading(false);
      console.error("An error occurred during PDF generation:", error);
    }
  };
  if (!book || !block) {
    return (
      <div className="loader">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="15"
            r="15"
            cx="35"
            cy="100"
          >
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2"
              values="35;165;165;35;35"
              keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
              repeatCount="indefinite"
              begin="0"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="15"
            opacity=".8"
            r="15"
            cx="35"
            cy="100"
          >
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2"
              values="35;165;165;35;35"
              keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
              repeatCount="indefinite"
              begin="0.05"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="15"
            opacity=".6"
            r="15"
            cx="35"
            cy="100"
          >
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2"
              values="35;165;165;35;35"
              keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
              repeatCount="indefinite"
              begin=".1"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="15"
            opacity=".4"
            r="15"
            cx="35"
            cy="100"
          >
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2"
              values="35;165;165;35;35"
              keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
              repeatCount="indefinite"
              begin=".15"
            ></animate>
          </circle>
          <circle
            fill="#FF156D"
            stroke="#FF156D"
            stroke-width="15"
            opacity=".2"
            r="15"
            cx="35"
            cy="100"
          >
            <animate
              attributeName="cx"
              calcMode="spline"
              dur="2"
              values="35;165;165;35;35"
              keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
              repeatCount="indefinite"
              begin=".2"
            ></animate>
          </circle>
        </svg>
      </div>
    );
  }
  return (
    <Layout extraClass={"pt-160"}>
      <PageBanner
        pageTitle={"Hotel Booking"}
        url={"assets/images/bg/hotel_success.png"}
      />
      <div id="BookingSuccess">
        <h1>Booking Succesfull 🎊</h1>
        <br />
        <h2>Hotel details</h2>
        <br />
        <div className="top">
          <div className="">
            <p>
              Tickent Number: <span> {book.BookingId}</span>
            </p>
            <p>
              Ref No: <span>{book.BookingRefNo}</span>{" "}
            </p>
            <p>
              Conf No: <span>{book.ConfirmationNo}</span>{" "}
            </p>
          </div>
          <div className="">
            {/* <p>
              Invoice Anount: <span> {book.InvoiceAmount}</span>
            </p> */}
            <p>
              invoice Number: <span>{book.InvoiceNumber}</span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              Hotel Name: <span> {block.HotelName}</span>
            </p>
          </div>
          <div className="">
            <p>
              Address 1: <span>{block.AddressLine1}</span>{" "}
            </p>
          </div>
          <div className="">
            <p>
              Address line 2: <span>{block.AddressLine1}</span>{" "}
            </p>
          </div>
          <div>
            <p>
              Rooms:{" "}
              <span>
                {block.HotelRoomsDetails.map((i) => {
                  return `${i.RoomTypeName},`;
                })}
              </span>
            </p>
          </div>
          <br />
          <br />
          <br />
          <p className="sub">*email is sent to you to view this page again</p>
        </div>
        <br />

        <div className="btns">
          <button onClick={() => generateAndOpenPDF()}>Download Invoice</button>
        </div>
      </div>
      {loading && (
        <div className="loader">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              opacity=".8"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin="0.05"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              opacity=".6"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin=".1"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              opacity=".4"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin=".15"
              ></animate>
            </circle>
            <circle
              fill="#FF156D"
              stroke="#FF156D"
              stroke-width="15"
              opacity=".2"
              r="15"
              cx="35"
              cy="100"
            >
              <animate
                attributeName="cx"
                calcMode="spline"
                dur="2"
                values="35;165;165;35;35"
                keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1"
                repeatCount="indefinite"
                begin=".2"
              ></animate>
            </circle>
          </svg>
        </div>
      )}
    </Layout>
  );
}
