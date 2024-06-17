import { server_url } from "@/src/config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function BookingSuccess() {
  const [resp, setResp] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        console.log(urlParams);
        const orderId = urlParams.get("orderId");

        const response = await fetch(`${server_url}/get-order-info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authentication: "random_id", // Ensure correct header format
          },
          body: JSON.stringify({ orderId: orderId }),
        });

        if (response.ok) {
          let data = await response.json();
          // data = JSON.parse(data.data);
          if (typeof data.data === "string") {
            data = JSON.parse(data.data);
          }
          setResp(data);
          console.log(data);
          if (data.type == "flight") {
            router.push({
              pathname: "/BookingSuccessfull",
              query: {
                data: JSON.stringify(data),
                orderId: orderId,
              },
            });
          }
          if (data.type === "bus") {
            router.push({
              pathname: "/bus-booking-successfull",
              query: {
                block: JSON.stringify(data.Booking.block.Result),
                book: JSON.stringify(data.Booking.book.Result),
                orderId: orderId,
              },
            });
          }
          if (data.type === "hotel") {
            router.push({
              pathname: "/hotel-booking-successfull",
              query: {
                block: JSON.stringify(data.Booking.block.BlockRoomResult),
                book: JSON.stringify(data.Booking.book.BookResult),
                orderId: orderId,
              },
            });
          }
          // }
        } else {
          alert("API Request Failed:", response.status, response.statusText);
        }
      } catch (error) {
        console.log("An error occurred during the API request:", error);
      }
    };

    fetchData();
  }, []); // No dependencies, so the effect runs only once

  return (
    <div>
      {resp ? (
        <div>
          <pre>{JSON.stringify(resp, null, 2)}</pre>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
