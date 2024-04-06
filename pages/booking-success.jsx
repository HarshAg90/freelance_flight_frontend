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
        const orderId = urlParams.get("order_id");

        const response = await fetch(`${server_url}/get-order-info`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authentication: "random_id", // Ensure correct header format
          },
          body: JSON.stringify({ orderId: orderId }),
        });

        if (response.ok) {
          const data = await response.json();
          setResp(data);
          console.log(data);
          if (data.Booking.Error.ErrorCode !== "0") {
            alert("Error in response");
            // console.log(data)
          } else {
            // console.log("resp")
            if (data.type == "flight") {
              router.push({
                pathname: "/BookingSuccessfull",
                query: { data: JSON.stringify(data.Booking), orderId: orderId },
              });
            }
          }
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
