import React, { useEffect, useState } from 'react'
import { dummyCarData, dummyMyBookingsData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageBookings = () => {
  
  const currency = import.meta.env.VITE_CURRENCY
  const [bookings,setBookings]=useState([])

  const fetchOwnerBookings=async ()=>{
    setBookings(dummyMyBookingsData)
  }
  useEffect(()=>{
    fetchOwnerBookings()
  },[])

  return (
      <div className='px-4 pt-10 md:px-10 w-full'>
       <Title title='Manage Bookings' subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"/>
       <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
            <table className='w-full border-collapse text-left text-sm text-gray-500'>
              <thead className='text-gray-600'>
                <tr>
                  <th className='p-3 font-medium'>Car</th>
                  <th className='p-3 font-medium max-md:hidden'>Date range</th>
                  <th className='p-3 font-medium'>Total</th>
                  <th className='p-3 font-medium max-md:hidden'>Payment</th>
                  <th className='p-3 font-medium'>Actions</th>
                </tr>

              </thead>
              <tbody>
                {bookings.map((booking,index)=>(
                  <tr key={index} className='border-t border-borderColor text-gray-800'>
                    <td className='p-3 flex items-center gap-3'>
                        <img src={booking.car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
                        <p className='font-medium max-md:hidden'>{booking.car.brand} {booking.car.model} </p>
                    </td>
                    <td className='p-3 max-md:hidden'>
                      <p className='text-sm'>{booking.pickupDate.split('T')[0]}</p>
                      <p className='text-sm text-gray-500'>to {booking.returnDate.split('T')[0]}</p>
                    </td>
                    <td className='p-3'>
                      <p className='font-medium'>{currency}{booking.price}</p>
                    </td>
                    <td className='p-3 max-md:hidden'>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className='p-3'>
                      <div className='flex gap-2'>
                        {booking.status === 'pending' && (
                          <>
                            <button className='px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600'>
                              Approve
                            </button>
                            <button className='px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600'>
                              Cancel
                            </button>
                          </>
                        )}
                        {booking.status !== 'pending' && (
                          <button className='px-3 py-1 bg-gray-500 text-white text-xs rounded'>
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
       </div>
    </div>
  )
}

export default ManageBookings