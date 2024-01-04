import React from 'react'

export default function BookingPayment({props}) {
  return(
    <Layout extraClass={"pt-160"}>
      <PageBanner pageTitle={"Blog Details"} />
      <h1>Please confirm your payment</h1>
      <div className="payment">
        <div className="top">
          <h2>from:  to:</h2>
          <h2>from:  to:</h2>
        </div>
        
      </div>

    </Layout>
  )
}
