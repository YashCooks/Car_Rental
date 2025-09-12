import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'

const Dashboard = () => {
  
    const [data,setData] = useState({
        totalCars:0,
        totalBookings:0,
        pendingBookings:0,
        completedBookings:0,
        recentBookings:[],
        monthlyRevenue:0,
    })
    
    const dashboardCards= [
        {title:"Total Cars", value:data.totalCars, icon :assets.carIconColored},
        {title:"Total Bookings", value:data.totalBookings, icon :assets.listIconColored},
        {title:"Pending", value:data.pendingBookings, icon :assets.cautionIconColored},
        {title:"Total Confirmed", value:data.completedBookings, icon :assets.carIconColored},
    ]

    useEffect(()=>{
        setData(dummyDashboardData)
    },[])
 
    return (
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
                
                {/* Dashboard Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {dashboardCards.map((card, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                            <div className="flex-shrink-0 mr-4">
                                <img src={card.icon} alt={card.title} className="w-12 h-12" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    {card.title}
                                </h3>
                                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Monthly Revenue */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
                    <p className="text-3xl font-bold text-green-600">${data.monthlyRevenue}</p>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>
                    {data.recentBookings.length > 0 ? (
                        <div className="space-y-4">
                            {data.recentBookings.map((booking, index) => (
                                <div key={index} className="border-b pb-4 last:border-b-0">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img 
                                                src={booking.car.image} 
                                                alt={`${booking.car.brand} ${booking.car.model}`}
                                                className="w-16 h-16 object-cover rounded-md mr-4"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-gray-800">
                                                    {booking.car.brand} {booking.car.model}
                                                </h3>
                                                <p className="text-gray-600 text-sm">
                                                    {new Date(booking.pickupDate).toLocaleDateString()} - {new Date(booking.returnDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-800">${booking.price}</p>
                                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                                booking.status === 'confirmed' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
