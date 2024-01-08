import { useRouter } from 'next/router';
import React from 'react'

export default function BookingSuccessfull() {
    const router = useRouter();
  const data = JSON.parse(router.query.data);
  console.log(data)
  return (
    <div>BookingSuccessfull</div>
  )
}
