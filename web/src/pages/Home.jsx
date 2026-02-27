import React, { useState } from "react";

function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: "🛡️",
      title: "Bank-Level Security",
      description: "256-bit encryption & fraud protection",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Checkout in 30 seconds or less",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "🤖",
      title: "AI Powered",
      description: "Smart recommendations & predictions",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On orders above ₹999 across India",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const trendingProducts = [
    { id: 1, name: "Apple Watch Series 9", price: "₹41,900", original: "₹45,999", discount: "9% OFF", imageColor: "bg-gradient-to-br from-gray-900 to-gray-700" },
    { id: 2, name: "Sony WH-1000XM5", price: "₹27,990", original: "₹32,999", discount: "15% OFF", imageColor: "bg-gradient-to-br from-blue-900 to-blue-700" },
    { id: 3, name: "iPhone 15 Pro", price: "₹1,34,900", original: "₹1,49,900", discount: "10% OFF", imageColor: "bg-gradient-to-br from-purple-900 to-pink-700" },
    { id: 4, name: "Samsung QLED TV", price: "₹84,999", original: "₹99,999", discount: "15% OFF", imageColor: "bg-gradient-to-br from-cyan-900 to-blue-700" }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                🚀 10,000+ Happy Customers This Month
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-tight mb-6">
              Shop Smarter,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Live Better
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              India's fastest growing e-commerce platform with{" "}
              <span className="font-semibold text-blue-600">AI-powered shopping</span>,{" "}
              <span className="font-semibold text-purple-600">instant delivery</span>, and{" "}
              <span className="font-semibold text-green-600">premium quality</span> guaranteed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl">
                <span className="relative z-10">Start Shopping Now →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group relative bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-gray-800 px-10 py-5 rounded-2xl text-lg font-bold hover:border-blue-500 hover:text-blue-600 hover:shadow-xl transition-all duration-300">
                <span className="relative z-10 flex items-center justify-center">
                  <span className="mr-2">▶</span> Watch 1-min Demo
                </span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "2M+", label: "Active Shoppers", icon: "👥", color: "from-blue-500 to-cyan-500" },
                { value: "98%", label: "Happy Customers", icon: "⭐", color: "from-yellow-500 to-orange-500" },
                { value: "30min", label: "Avg. Delivery", icon: "⚡", color: "from-green-500 to-emerald-500" },
                { value: "₹10Cr+", label: "Saved Monthly", icon: "💰", color: "from-purple-500 to-pink-500" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl mb-4 mx-auto`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Trending <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Right Now</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover what millions are shopping for this week
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Product Image Placeholder */}
                <div className={`h-56 ${product.imageColor} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                    📱
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-gray-400 line-through">{product.original}</span>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">4.8 (2.4k)</span>
                  </div>

                  {/* Interactive Button */}
                  <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    hoveredCard === product.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white transform -translate-y-1'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}>
                    {hoveredCard === product.id ? 'Add to Cart 🛒' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-lg group">
              View All Products
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Why Millions Trust <span className="text-blue-600">SmartCart</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Experience shopping reimagined for the modern world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold mb-6">
            🎉 LIMITED TIME OFFER
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-6">
            Start Your Shopping Journey Today
          </h2>
          
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Get <span className="font-bold text-yellow-300">₹500 welcome bonus</span> + free delivery on your first order!
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-10">
            {[
              { value: "23", label: "Hours" },
              { value: "59", label: "Minutes" },
              { value: "59", label: "Seconds" }
            ].map((time, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-white">{time.value}</div>
                <div className="text-gray-400 text-sm">{time.label}</div>
              </div>
            ))}
          </div>

          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-12 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg group">
            <span className="flex items-center justify-center">
              Claim Your Bonus 
              <span className="ml-3 text-2xl group-hover:rotate-90 transition-transform">🎁</span>
            </span>
          </button>
          
          <p className="text-gray-400 mt-8 text-sm">
            No credit card required • Join 2 million+ satisfied shoppers
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;