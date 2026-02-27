import React, { useState } from "react";

function Products() {
  const [sortBy, setSortBy] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wishlist, setWishlist] = useState([]);

  const categories = [
    { id: "all", name: "All Products", count: 286 },
    { id: "electronics", name: "Electronics", count: 78 },
    { id: "fashion", name: "Fashion", count: 56 },
    { id: "home", name: "Home & Kitchen", count: 42 },
    { id: "beauty", name: "Beauty & Health", count: 38 },
    { id: "sports", name: "Sports & Fitness", count: 32 },
    { id: "books", name: "Books & Media", count: 24 },
    { id: "automotive", name: "Automotive", count: 16 }
  ];

  const products = [
    // Electronics (12 products)
    { 
      id: 1, 
      name: "Apple MacBook Air M2", 
      price: "₹1,14,900", 
      original: "₹1,29,900", 
      discount: "12%", 
      rating: 4.8,
      reviews: 1243,
      category: "electronics",
      tags: ["Bestseller", "New", "Apple"],
      imageColor: "bg-gradient-to-br from-gray-900 to-gray-700"
    },
    { 
      id: 2, 
      name: "Sony WH-1000XM5 Headphones", 
      price: "₹27,990", 
      original: "₹32,999", 
      discount: "15%", 
      rating: 4.9,
      reviews: 892,
      category: "electronics",
      tags: ["Noise Cancelling", "Premium"],
      imageColor: "bg-gradient-to-br from-blue-900 to-blue-700"
    },
    { 
      id: 3, 
      name: "iPhone 15 Pro 256GB", 
      price: "₹1,34,900", 
      original: "₹1,49,900", 
      discount: "10%", 
      rating: 4.7,
      reviews: 5421,
      category: "electronics",
      tags: ["Premium", "5G", "Apple"],
      imageColor: "bg-gradient-to-br from-purple-900 to-pink-700"
    },
    { 
      id: 4, 
      name: "Samsung 55\" QLED 4K TV", 
      price: "₹84,999", 
      original: "₹99,999", 
      discount: "15%", 
      rating: 4.6,
      reviews: 2341,
      category: "electronics",
      tags: ["Smart TV", "4K", "QLED"],
      imageColor: "bg-gradient-to-br from-cyan-900 to-blue-700"
    },
    { 
      id: 5, 
      name: "Canon EOS R6 Camera", 
      price: "₹1,89,999", 
      original: "₹2,19,999", 
      discount: "14%", 
      rating: 4.8,
      reviews: 567,
      category: "electronics",
      tags: ["Mirrorless", "Professional"],
      imageColor: "bg-gradient-to-br from-red-900 to-orange-700"
    },
    { 
      id: 6, 
      name: "iPad Pro 12.9\" M1", 
      price: "₹1,09,900", 
      original: "₹1,19,900", 
      discount: "8%", 
      rating: 4.7,
      reviews: 1890,
      category: "electronics",
      tags: ["Tablet", "Apple", "Pro"],
      imageColor: "bg-gradient-to-br from-indigo-900 to-purple-700"
    },
    { 
      id: 7, 
      name: "DJI Mini 3 Pro Drone", 
      price: "₹87,999", 
      original: "₹99,999", 
      discount: "12%", 
      rating: 4.8,
      reviews: 432,
      category: "electronics",
      tags: ["Drone", "4K", "Compact"],
      imageColor: "bg-gradient-to-br from-emerald-900 to-teal-700"
    },
    { 
      id: 8, 
      name: "PlayStation 5 Console", 
      price: "₹54,999", 
      original: "₹59,999", 
      discount: "8%", 
      rating: 4.9,
      reviews: 3210,
      category: "electronics",
      tags: ["Gaming", "Console", "4K"],
      imageColor: "bg-gradient-to-br from-blue-900 to-indigo-700"
    },
    { 
      id: 9, 
      name: "Samsung Galaxy S24 Ultra", 
      price: "₹1,29,999", 
      original: "₹1,39,999", 
      discount: "7%", 
      rating: 4.7,
      reviews: 876,
      category: "electronics",
      tags: ["Android", "5G", "Premium"],
      imageColor: "bg-gradient-to-br from-violet-900 to-purple-700"
    },
    { 
      id: 10, 
      name: "Apple AirPods Pro 2", 
      price: "₹23,999", 
      original: "₹26,999", 
      discount: "11%", 
      rating: 4.6,
      reviews: 2109,
      category: "electronics",
      tags: ["Wireless", "Noise Cancelling"],
      imageColor: "bg-gradient-to-br from-gray-800 to-gray-600"
    },
    { 
      id: 11, 
      name: "LG 32\" 4K Monitor", 
      price: "₹32,999", 
      original: "₹38,999", 
      discount: "15%", 
      rating: 4.5,
      reviews: 654,
      category: "electronics",
      tags: ["Monitor", "4K", "IPS"],
      imageColor: "bg-gradient-to-br from-sky-900 to-cyan-700"
    },
    { 
      id: 12, 
      name: "GoPro Hero 12", 
      price: "₹39,999", 
      original: "₹45,999", 
      discount: "13%", 
      rating: 4.7,
      reviews: 987,
      category: "electronics",
      tags: ["Action Camera", "4K", "Waterproof"],
      imageColor: "bg-gradient-to-br from-rose-900 to-pink-700"
    },

    // Fashion (8 products)
    { 
      id: 13, 
      name: "Nike Air Max 270", 
      price: "₹12,999", 
      original: "₹15,999", 
      discount: "19%", 
      rating: 4.5,
      reviews: 781,
      category: "fashion",
      tags: ["Shoes", "Trending", "Nike"],
      imageColor: "bg-gradient-to-br from-red-900 to-orange-700"
    },
    { 
      id: 14, 
      name: "Levi's 501 Original Jeans", 
      price: "₹4,299", 
      original: "₹5,999", 
      discount: "28%", 
      rating: 4.4,
      reviews: 1209,
      category: "fashion",
      tags: ["Jeans", "Classic", "Denim"],
      imageColor: "bg-gradient-to-br from-blue-900 to-indigo-700"
    },
    { 
      id: 15, 
      name: "Ray-Ban Aviator Sunglasses", 
      price: "₹14,999", 
      original: "₹18,999", 
      discount: "21%", 
      rating: 4.8,
      reviews: 543,
      category: "fashion",
      tags: ["Sunglasses", "Premium", "Ray-Ban"],
      imageColor: "bg-gradient-to-br from-amber-900 to-yellow-700"
    },
    { 
      id: 16, 
      name: "Adidas Ultraboost 22", 
      price: "₹15,999", 
      original: "₹19,999", 
      discount: "20%", 
      rating: 4.6,
      reviews: 876,
      category: "fashion",
      tags: ["Running Shoes", "Comfort"],
      imageColor: "bg-gradient-to-br from-black to-gray-800"
    },
    { 
      id: 17, 
      name: "Puma T-Shirt (Pack of 3)", 
      price: "₹1,999", 
      original: "₹2,999", 
      discount: "33%", 
      rating: 4.3,
      reviews: 432,
      category: "fashion",
      tags: ["T-Shirts", "Casual", "Pack"],
      imageColor: "bg-gradient-to-br from-fuchsia-900 to-pink-700"
    },
    { 
      id: 18, 
      name: "Fossil Gen 6 Smartwatch", 
      price: "₹18,999", 
      original: "₹24,999", 
      discount: "24%", 
      rating: 4.5,
      reviews: 321,
      category: "fashion",
      tags: ["Smartwatch", "Fitness"],
      imageColor: "bg-gradient-to-br from-rose-900 to-red-700"
    },
    { 
      id: 19, 
      name: "Zara Leather Jacket", 
      price: "₹8,999", 
      original: "₹12,999", 
      discount: "31%", 
      rating: 4.7,
      reviews: 198,
      category: "fashion",
      tags: ["Jacket", "Leather", "Premium"],
      imageColor: "bg-gradient-to-br from-gray-900 to-gray-700"
    },
    { 
      id: 20, 
      name: "Skechers Go Walk Shoes", 
      price: "₹5,499", 
      original: "₹7,999", 
      discount: "31%", 
      rating: 4.4,
      reviews: 567,
      category: "fashion",
      tags: ["Walking Shoes", "Comfort"],
      imageColor: "bg-gradient-to-br from-lime-900 to-green-700"
    },

    // Home & Kitchen (6 products)
    { 
      id: 21, 
      name: "KitchenAid Stand Mixer", 
      price: "₹24,999", 
      original: "₹29,999", 
      discount: "17%", 
      rating: 4.8,
      reviews: 432,
      category: "home",
      tags: ["Kitchen", "Premium", "Mixer"],
      imageColor: "bg-gradient-to-br from-green-900 to-teal-700"
    },
    { 
      id: 22, 
      name: "Philips Air Fryer XXL", 
      price: "₹12,999", 
      original: "₹16,999", 
      discount: "24%", 
      rating: 4.6,
      reviews: 789,
      category: "home",
      tags: ["Air Fryer", "Healthy"],
      imageColor: "bg-gradient-to-br from-orange-900 to-amber-700"
    },
    { 
      id: 23, 
      name: "Dyson V15 Vacuum Cleaner", 
      price: "₹54,999", 
      original: "₹64,999", 
      discount: "15%", 
      rating: 4.9,
      reviews: 321,
      category: "home",
      tags: ["Vacuum", "Cordless", "Premium"],
      imageColor: "bg-gradient-to-br from-purple-900 to-violet-700"
    },
    { 
      id: 24, 
      name: "Ikea Malm Bed Frame", 
      price: "₹18,999", 
      original: "₹24,999", 
      discount: "24%", 
      rating: 4.4,
      reviews: 543,
      category: "home",
      tags: ["Furniture", "Bed", "Modern"],
      imageColor: "bg-gradient-to-br from-amber-900 to-yellow-700"
    },
    { 
      id: 25, 
      name: "Milton Thermosteel Flask", 
      price: "₹1,299", 
      original: "₹1,999", 
      discount: "35%", 
      rating: 4.5,
      reviews: 2109,
      category: "home",
      tags: ["Flask", "Thermos", "24h Hot"],
      imageColor: "bg-gradient-to-br from-red-900 to-orange-700"
    },
    { 
      id: 26, 
      name: "Prestige Induction Cooktop", 
      price: "₹2,999", 
      original: "₹4,999", 
      discount: "40%", 
      rating: 4.3,
      reviews: 876,
      category: "home",
      tags: ["Cooktop", "Induction", "Kitchen"],
      imageColor: "bg-gradient-to-br from-blue-900 to-cyan-700"
    },

    // Beauty & Health (5 products)
    { 
      id: 27, 
      name: "Philips Sonicare Toothbrush", 
      price: "₹8,999", 
      original: "₹12,999", 
      discount: "31%", 
      rating: 4.7,
      reviews: 654,
      category: "beauty",
      tags: ["Electric", "Toothbrush", "Oral Care"],
      imageColor: "bg-gradient-to-br from-teal-900 to-emerald-700"
    },
    { 
      id: 28, 
      name: "Himalaya Face Wash (Pack of 3)", 
      price: "₹499", 
      original: "₹799", 
      discount: "38%", 
      rating: 4.4,
      reviews: 1209,
      category: "beauty",
      tags: ["Face Wash", "Skincare", "Pack"],
      imageColor: "bg-gradient-to-br from-emerald-900 to-green-700"
    },
    { 
      id: 29, 
      name: "Philips Hair Straightener", 
      price: "₹3,999", 
      original: "₹5,999", 
      discount: "33%", 
      rating: 4.5,
      reviews: 432,
      category: "beauty",
      tags: ["Hair Styling", "Straightener"],
      imageColor: "bg-gradient-to-br from-pink-900 to-rose-700"
    },
    { 
      id: 30, 
      name: "Omron Blood Pressure Monitor", 
      price: "₹4,999", 
      original: "₹6,999", 
      discount: "29%", 
      rating: 4.6,
      reviews: 321,
      category: "beauty",
      tags: ["Health", "BP Monitor", "Digital"],
      imageColor: "bg-gradient-to-br from-blue-900 to-indigo-700"
    },
    { 
      id: 31, 
      name: "Cetaphil Moisturizing Cream", 
      price: "₹899", 
      original: "₹1,299", 
      discount: "31%", 
      rating: 4.7,
      reviews: 789,
      category: "beauty",
      tags: ["Moisturizer", "Skincare", "Dermatologist"],
      imageColor: "bg-gradient-to-br from-cyan-900 to-blue-700"
    },

    // Sports & Fitness (5 products)
    { 
      id: 32, 
      name: "Cult.fit Treadmill", 
      price: "₹42,999", 
      original: "₹54,999", 
      discount: "22%", 
      rating: 4.6,
      reviews: 198,
      category: "sports",
      tags: ["Treadmill", "Fitness", "Home Gym"],
      imageColor: "bg-gradient-to-br from-gray-900 to-gray-700"
    },
    { 
      id: 33, 
      name: "Yonex Badminton Racket", 
      price: "₹4,999", 
      original: "₹7,999", 
      discount: "38%", 
      rating: 4.5,
      reviews: 543,
      category: "sports",
      tags: ["Badminton", "Racket", "Sports"],
      imageColor: "bg-gradient-to-br from-red-900 to-orange-700"
    },
    { 
      id: 34, 
      name: "Decathlon Cycling Helmet", 
      price: "₹1,299", 
      original: "₹1,999", 
      discount: "35%", 
      rating: 4.4,
      reviews: 876,
      category: "sports",
      tags: ["Helmet", "Cycling", "Safety"],
      imageColor: "bg-gradient-to-br from-blue-900 to-cyan-700"
    },
    { 
      id: 35, 
      name: "Nike Yoga Mat Premium", 
      price: "₹2,999", 
      original: "₹4,999", 
      discount: "40%", 
      rating: 4.7,
      reviews: 321,
      category: "sports",
      tags: ["Yoga", "Fitness", "Mat"],
      imageColor: "bg-gradient-to-br from-green-900 to-emerald-700"
    },
    { 
      id: 36, 
      name: "Fitbit Charge 5 Fitness Tracker", 
      price: "₹14,999", 
      original: "₹19,999", 
      discount: "25%", 
      rating: 4.6,
      reviews: 654,
      category: "sports",
      tags: ["Fitness Tracker", "Health", "Smartwatch"],
      imageColor: "bg-gradient-to-br from-purple-900 to-violet-700"
    }
  ];

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Sort products based on selected criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
      case 'price-high':
        return parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, ''));
      case 'discount':
        const discountA = parseInt(a.discount);
        const discountB = parseInt(b.discount);
        return discountB - discountA;
      default:
        return b.reviews - a.reviews; // Most popular by default
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Premium Products Collection
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Discover over 286 premium products across 8 categories. Best prices, authentic brands, and lightning-fast delivery across India.
          </p>
          <div className="mt-8 flex items-center text-white/80">
            <div className="flex items-center mr-8">
              <span className="text-2xl mr-2">🚚</span>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center mr-8">
              <span className="text-2xl mr-2">🏷️</span>
              <span>Best Prices</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">✅</span>
              <span>Authentic Products</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{products.length}</div>
            <div className="text-gray-600">Products</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="text-gray-600">Categories</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">40%</div>
            <div className="text-gray-600">Avg. Discount</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">4.7</div>
            <div className="text-gray-600">Avg. Rating</div>
          </div>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "all" ? "All Products" : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-500 text-lg ml-4">{filteredProducts.length} items</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2 bg-white rounded-2xl shadow-lg p-4">
              <span className="text-gray-500">🏷️</span>
              <select 
                className="bg-transparent border-none focus:ring-0 text-gray-700"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2 bg-white rounded-2xl shadow-lg p-4">
              <span className="text-gray-500">↕️</span>
              <select 
                className="bg-transparent border-none focus:ring-0 text-gray-700"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow hover:shadow-md'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-80">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div 
              key={product.id}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className={`h-56 ${product.imageColor} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center text-white text-5xl opacity-90">
                  {product.category === "electronics" ? "📱" : 
                   product.category === "fashion" ? "👕" : 
                   product.category === "home" ? "🏠" : 
                   product.category === "beauty" ? "💄" : 
                   product.category === "sports" ? "⚽" : "📦"}
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {product.discount} OFF
                </div>
                
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <span className={`text-xl ${
                    wishlist.includes(product.id) ? 'text-red-500 animate-pulse' : 'text-white'
                  }`}>
                    {wishlist.includes(product.id) ? '❤️' : '🤍'}
                  </span>
                </button>
                
                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                  {categories.find(c => c.id === product.category)?.name}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {product.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}>★</span>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm font-medium">{product.rating}</span>
                  <span className="mx-1 text-gray-300">•</span>
                  <span className="text-gray-500 text-sm">{product.reviews.toLocaleString()} reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                  <span className="text-gray-400 text-sm line-through">{product.original}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm">
                    <span className="mr-2">🛒</span>
                    Add to Cart
                  </button>
                  <button className="w-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center text-sm">
                    👁️
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                      Free delivery
                    </div>
                    <div className="text-gray-500">
                      EMI from ₹{Math.round(parseInt(product.price.replace(/[^0-9]/g, '')) / 12).toLocaleString('en-IN')}/mo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col items-center justify-center space-y-8 mt-16">
          <div className="text-gray-600">
            Showing 1-{Math.min(12, filteredProducts.length)} of {filteredProducts.length} products
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors">
              ←
            </button>
            {[1, 2, 3, "...", Math.ceil(filteredProducts.length / 12) - 1, Math.ceil(filteredProducts.length / 12)].map((page, index) => (
              <button
                key={index}
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${
                  page === 1
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'border border-gray-200 hover:border-blue-500 hover:text-blue-600'
                } ${page === "..." ? 'border-none' : ''}`}
              >
                {page}
              </button>
            ))}
            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-colors">
              →
            </button>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4">
              🎁 Exclusive Deals Await!
            </h3>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
              Subscribe now and get ₹500 off on your first order. Plus, receive weekly deals and early access to flash sales.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                Get ₹500 Off
              </button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              By subscribing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;