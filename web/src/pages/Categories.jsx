import React, { useState } from "react";

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("electronics");

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      description: "Latest gadgets, smartphones, laptops & more",
      icon: "📱",
      color: "from-blue-500 to-cyan-500",
      items: 1242,
      trending: true
    },
    {
      id: "fashion",
      name: "Fashion",
      description: "Clothing, footwear, accessories & jewelry",
      icon: "👕",
      color: "from-purple-500 to-pink-500",
      items: 856,
      trending: true
    },
    {
      id: "home",
      name: "Home & Kitchen",
      description: "Furniture, appliances, decor & utensils",
      icon: "🏠",
      color: "from-green-500 to-emerald-500",
      items: 723,
      trending: false
    },
    {
      id: "beauty",
      name: "Beauty",
      description: "Skincare, makeup, fragrances & haircare",
      icon: "💄",
      color: "from-red-500 to-orange-500",
      items: 512,
      trending: true
    },
    {
      id: "sports",
      name: "Sports & Fitness",
      description: "Equipment, apparel, supplements & gear",
      icon: "⚽",
      color: "from-yellow-500 to-amber-500",
      items: 389,
      trending: false
    },
    {
      id: "books",
      name: "Books & Media",
      description: "Books, movies, music & educational",
      icon: "📚",
      color: "from-indigo-500 to-purple-500",
      items: 267,
      trending: false
    },
    {
      id: "toys",
      name: "Toys & Games",
      description: "Kids toys, board games & video games",
      icon: "🎮",
      color: "from-pink-500 to-rose-500",
      items: 198,
      trending: true
    },
    {
      id: "automotive",
      name: "Automotive",
      description: "Car accessories, tools & maintenance",
      icon: "🚗",
      color: "from-gray-600 to-gray-800",
      items: 154,
      trending: false
    }
  ];

  const subCategories = {
    electronics: ["Smartphones", "Laptops", "Headphones", "Smart Watches", "Cameras", "Tablets", "Gaming", "Accessories"],
    fashion: ["Men's Clothing", "Women's Clothing", "Footwear", "Accessories", "Jewelry", "Watches", "Bags", "Ethnic Wear"],
    home: ["Furniture", "Kitchen Appliances", "Home Decor", "Lighting", "Bedding", "Storage", "Gardening", "Tools"],
    beauty: ["Skincare", "Makeup", "Haircare", "Fragrances", "Men's Grooming", "Bath & Body", "Wellness", "Tools"],
    sports: ["Fitness Equipment", "Sportswear", "Outdoor Gear", "Cycling", "Yoga", "Team Sports", "Nutrition", "Accessories"],
    books: ["Fiction", "Non-Fiction", "Academic", "Children's Books", "eBooks", "Audiobooks", "Magazines", "Stationery"],
    toys: ["Action Figures", "Building Sets", "Board Games", "Puzzles", "Outdoor Toys", "Educational", "Video Games", "Dolls"],
    automotive: ["Car Care", "Tools", "Accessories", "Electronics", "Interior", "Exterior", "Performance", "Motorcycle"]
  };

  const featuredBrands = [
    { name: "Apple", products: 142, icon: "🍎" },
    { name: "Samsung", products: 98, icon: "📱" },
    { name: "Nike", products: 76, icon: "👟" },
    { name: "Sony", products: 64, icon: "🎧" },
    { name: "Amazon", products: 89, icon: "📦" },
    { name: "Adidas", products: 54, icon: "👕" },
    { name: "Bose", products: 32, icon: "🔊" },
    { name: "Dell", products: 47, icon: "💻" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6">
            Shop by <span className="text-yellow-300">Category</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover millions of products across thousands of categories. 
            Find exactly what you're looking for with our intuitive navigation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search & Filter */}
        <div className="mb-12 bg-white rounded-3xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search categories or browse products..."
                  className="w-full px-8 py-5 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none text-lg"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  🔍
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select className="px-6 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 outline-none bg-white">
                <option>Most Popular</option>
                <option>Most Products</option>
                <option>Alphabetical</option>
                <option>Trending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Categories Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">All Categories</h2>
              <p className="text-gray-600 mt-2">Browse through our extensive collection</p>
            </div>
            <div className="flex items-center text-blue-600 font-bold">
              <span className="mr-2">🔥</span>
              <span>Trending Now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border-2 ${
                  selectedCategory === category.id 
                    ? 'border-blue-500' 
                    : 'border-transparent hover:border-blue-200'
                } hover:-translate-y-2`}
              >
                {/* Category Image/Icon */}
                <div className={`h-40 bg-gradient-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-6xl opacity-90">{category.icon}</span>
                  
                  {/* Trending Badge */}
                  {category.trending && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <span className="mr-1">🔥</span> Trending
                    </div>
                  )}
                </div>

                {/* Category Info */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-gray-500 font-medium">{category.items.toLocaleString()} items</span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{category.description}</p>

                  <div className="flex items-center justify-between">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center">
                      Explore
                      <span className="ml-2">→</span>
                    </button>
                    
                    <div className="flex items-center text-gray-500">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span className="font-medium">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subcategories */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {categories.find(c => c.id === selectedCategory)?.name} Subcategories
              </h3>
              <p className="text-gray-600">Browse specific product types within this category</p>
            </div>
            <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {subCategories[selectedCategory]?.map((subCat, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 cursor-pointer hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600">
                    <span>🛍️</span>
                  </div>
                  <span className="text-gray-400 group-hover:text-blue-600 transition-colors">→</span>
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{subCat}</h4>
                <p className="text-gray-500 text-sm">Explore {Math.floor(Math.random() * 500) + 50} products</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Brands */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Featured Brands</h3>
              <p className="text-gray-600">Shop from trusted and popular brands</p>
            </div>
            <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-colors">
              All Brands
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {featuredBrands.map((brand, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center cursor-pointer hover:-translate-y-1 border border-gray-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform">
                  {brand.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{brand.name}</h4>
                <p className="text-gray-500 text-sm">{brand.products} products</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12 mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Category Insights
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Most Popular", 
                category: "Electronics", 
                icon: "🔥", 
                stats: "2.4M+ monthly views",
                color: "from-red-500 to-orange-500" 
              },
              { 
                title: "Fastest Growing", 
                category: "Beauty & Personal Care", 
                icon: "📈", 
                stats: "45% growth this month",
                color: "from-green-500 to-emerald-500" 
              },
              { 
                title: "Highest Rated", 
                category: "Home Appliances", 
                icon: "⭐", 
                stats: "4.9/5 average rating",
                color: "from-yellow-500 to-amber-500" 
              }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl text-white mb-6`}>
                  {stat.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{stat.title}</h4>
                <p className="text-gray-700 font-semibold text-lg mb-2">{stat.category}</p>
                <p className="text-gray-600">{stat.stats}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-12 text-center border-2 border-purple-100">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated on New Categories
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified when we add new categories and products. 
            Be the first to explore fresh collections.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-white"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center justify-center">
              Subscribe
              <span className="ml-2">🏷️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;