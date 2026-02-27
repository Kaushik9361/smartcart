import React, { useState, useEffect } from "react";

function Deals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashDeals = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      original: "₹1,59,900",
      price: "₹1,29,900",
      discount: "19%",
      sold: 84,
      total: 100,
      image: "📱",
      color: "from-purple-500 to-pink-500",
      tag: "FLASH DEAL"
    },
    {
      id: 2,
      title: "Samsung QLED 4K TV",
      original: "₹1,19,999",
      price: "₹84,999",
      discount: "29%",
      sold: 67,
      total: 100,
      image: "📺",
      color: "from-blue-500 to-cyan-500",
      tag: "LIMITED STOCK"
    },
    {
      id: 3,
      title: "Apple MacBook Air M2",
      original: "₹1,14,900",
      price: "₹94,900",
      discount: "17%",
      sold: 92,
      total: 100,
      image: "💻",
      color: "from-gray-800 to-gray-600",
      tag: "HOT DEAL"
    }
  ];

  const dailyDeals = [
    { id: 1, name: "Wireless Earbuds", price: "₹2,499", discount: "40%", image: "🎧" },
    { id: 2, name: "Smart Watch", price: "₹4,999", discount: "35%", image: "⌚" },
    { id: 3, name: "Gaming Mouse", price: "₹1,299", discount: "25%", image: "🖱️" },
    { id: 4, name: "Bluetooth Speaker", price: "₹3,499", discount: "30%", image: "🔊" },
    { id: 5, name: "Fitness Band", price: "₹1,999", discount: "45%", image: "🏃" },
    { id: 6, name: "Portable Charger", price: "₹1,499", discount: "20%", image: "🔋" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 py-24">
        {/* Animated Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 animate-pulse">🔥</div>
          <div className="absolute top-20 right-20 animate-bounce">💰</div>
          <div className="absolute bottom-10 left-1/4 animate-ping">🎁</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <span className="text-white font-bold text-lg">⚡ FLASH SALE LIVE ⚡</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
            MEGA <span className="text-yellow-300">DEALS</span> WEEK
          </h1>
          
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Biggest discounts of the year! Up to 80% OFF on premium brands
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-6 mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center shadow-xl">
                  <div className="text-4xl font-black text-white">{value.toString().padStart(2, '0')}</div>
                  <div className="text-white/80 text-sm mt-2 uppercase">{unit}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-white/90">
            <span className="font-bold text-yellow-300">HURRY!</span> Sale ends in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Flash Deals */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Flash Deals</h2>
              <p className="text-gray-600 mt-2">Limited quantity, going fast!</p>
            </div>
            <div className="flex items-center space-x-2 text-red-600 font-bold">
              <span className="animate-pulse">🔥</span>
              <span>Ending Soon</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {flashDeals.map(deal => (
              <div 
                key={deal.id} 
                className="relative group bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border-2 border-red-100"
              >
                {/* Tag */}
                <div className="absolute top-6 left-6 z-10">
                  <div className={`px-4 py-2 bg-gradient-to-r ${deal.color} text-white font-bold rounded-full shadow-lg`}>
                    {deal.tag}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                  <div className="text-sm font-bold text-gray-900">
                    {deal.sold}/{deal.total} sold
                  </div>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full bg-gradient-to-r ${deal.color} rounded-full`}
                      style={{ width: `${(deal.sold / deal.total) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Product Image */}
                <div className={`h-64 bg-gradient-to-br ${deal.color} flex items-center justify-center`}>
                  <span className="text-7xl text-white/90">{deal.image}</span>
                </div>

                {/* Product Info */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{deal.title}</h3>
                  
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="text-4xl font-black text-gray-900">{deal.price}</span>
                    <span className="text-xl text-gray-400 line-through">{deal.original}</span>
                    <span className="px-4 py-1 bg-red-100 text-red-600 font-bold rounded-full">
                      Save {deal.discount}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Grab This Deal 🎯
                  </button>

                  {/* Stock Alert */}
                  <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-red-600">
                        <span className="animate-pulse mr-2">⚠️</span>
                        <span className="font-semibold">Only {deal.total - deal.sold} left!</span>
                      </div>
                      <div className="text-gray-600 text-sm">
                        <span className="font-bold">{deal.sold} people</span> bought recently
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10">Today's Hot Deals</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dailyDeals.map(deal => (
              <div 
                key={deal.id} 
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100"
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-5xl">{deal.image}</span>
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full">
                      {deal.discount} OFF
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{deal.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">{deal.price}</span>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mega Offer Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 p-12 mb-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-32 -translate-x-32"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              🎉 EXTRA 15% OFF 🎉
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Use code <span className="font-black text-yellow-300 text-2xl">MEGA2024</span> at checkout
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 inline-block">
              <div className="text-3xl font-bold text-white mb-2">VALID FOR:</div>
              <div className="text-5xl font-black text-yellow-300">NEXT 24 HOURS</div>
            </div>
          </div>
        </div>

        {/* Deal Categories */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-10">Deals by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", deals: "42 deals", icon: "📱", color: "from-blue-500 to-cyan-500" },
              { name: "Fashion", deals: "38 deals", icon: "👕", color: "from-purple-500 to-pink-500" },
              { name: "Home", deals: "29 deals", icon: "🏠", color: "from-green-500 to-emerald-500" },
              { name: "Beauty", deals: "24 deals", icon: "💄", color: "from-red-500 to-orange-500" }
            ].map((category, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 text-center cursor-pointer hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl text-white mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.deals} available</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-12 text-center border-2 border-orange-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Want More Deals?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our deal alerts and be the first to know about flash sales, 
            exclusive discounts, and limited-time offers.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email for deal alerts"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none bg-white"
            />
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-shadow">
              Alert Me! 🔔
            </button>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            No spam, only the hottest deals. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Deals;