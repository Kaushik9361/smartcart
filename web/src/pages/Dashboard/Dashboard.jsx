// CustomerDashboard.jsx - Advanced Professional Dashboard
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [customer] = useState(() => {
  try {
    const user = localStorage.getItem("user");
    if (!user || user === "undefined") {
      throw new Error("Invalid user");
    }
    return JSON.parse(user);
  } catch (error) {
    return {
      id: "CUST-12345",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      membership: "Platinum Elite",
      membershipTier: 4,
      joinDate: "Jan 15, 2023",
      lastLogin: "Today, 10:30 AM",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001"
    };
  }
});

  if (!customer) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Sample Data
  const orders = [
    { 
      id: "ORD-2024-1023", 
      date: "2024-01-15", 
      amount: 3200, 
      status: "delivered",
      items: 2,
      tracking: "TRK-987654",
      estimatedDelivery: "2024-01-18",
      products: [
        { name: "Wireless Headphones", quantity: 1, price: 2499, image: "🎧" },
        { name: "USB-C Cable", quantity: 1, price: 701, image: "🔌" }
      ]
    },
    { 
      id: "ORD-2024-1022", 
      date: "2024-01-14", 
      amount: 1150, 
      status: "processing",
      items: 1,
      tracking: null,
      estimatedDelivery: "2024-01-20",
      products: [
        { name: "Phone Case", quantity: 1, price: 1150, image: "📱" }
      ]
    },
    { 
      id: "ORD-2024-1021", 
      date: "2024-01-13", 
      amount: 800, 
      status: "cancelled",
      items: 1,
      tracking: null,
      estimatedDelivery: null,
      products: [
        { name: "Screen Protector", quantity: 2, price: 400, image: "🛡️" }
      ]
    },
    { 
      id: "ORD-2024-1020", 
      date: "2024-01-12", 
      amount: 4500, 
      status: "shipped",
      items: 3,
      tracking: "TRK-123456",
      estimatedDelivery: "2024-01-17",
      products: [
        { name: "Smart Watch", quantity: 1, price: 2999, image: "⌚" },
        { name: "Watch Band", quantity: 2, price: 751, image: "📿" }
      ]
    },
  ];

  const cartItems = [
    { id: 1, name: "Wireless Headphones", price: 2499, quantity: 1, image: "🎧", brand: "Sony", inStock: true },
    { id: 2, name: "Smart Watch Series 7", price: 29999, quantity: 1, image: "⌚", brand: "Apple", inStock: true },
    { id: 3, name: "Gaming Mouse Pro", price: 4499, quantity: 2, image: "🖱️", brand: "Logitech", inStock: true },
  ];

  const wishlistItems = [
    { id: 1, name: "Bluetooth Speaker", price: 6499, rating: 4.7, image: "🔊", brand: "JBL", inStock: true },
    { id: 2, name: "Laptop Stand", price: 2999, rating: 4.5, image: "💻", brand: "Amazon Basics", inStock: true },
    { id: 3, name: "Wireless Keyboard", price: 5999, rating: 4.8, image: "⌨️", brand: "Logitech", inStock: false },
    { id: 4, name: "Monitor 27\"", price: 24999, rating: 4.9, image: "🖥️", brand: "LG", inStock: true },
  ];

  const categories = [
    { id: 1, name: "Electronics", icon: "📱", count: 245, color: "blue" },
    { id: 2, name: "Fashion", icon: "👕", count: 567, color: "purple" },
    { id: 3, name: "Home & Living", icon: "🏠", count: 189, color: "green" },
    { id: 4, name: "Sports", icon: "⚽", count: 123, color: "orange" },
    { id: 5, name: "Books", icon: "📚", count: 890, color: "red" },
    { id: 6, name: "Toys", icon: "🎮", count: 234, color: "pink" },
  ];

  const addresses = [
    { 
      id: 1, 
      type: "Home", 
      address: "123 Main Street, Apt 4B", 
      city: "New York", 
      state: "NY", 
      zip: "10001",
      phone: "+1 (555) 123-4567",
      isDefault: true 
    },
    { 
      id: 2, 
      type: "Office", 
      address: "456 Business Ave, Suite 1200", 
      city: "New York", 
      state: "NY", 
      zip: "10002",
      phone: "+1 (555) 987-6543",
      isDefault: false 
    },
  ];

  const notifications = [
    { id: 1, type: "order", message: "Your order #ORD-2024-1023 has been delivered", time: "2 hours ago", read: false },
    { id: 2, type: "promo", message: "50% off on Electronics - Limited time offer", time: "1 day ago", read: true },
    { id: 3, type: "wishlist", message: "Wireless Headphones is back in stock", time: "2 days ago", read: false },
  ];

  // Navigation Items
  const navItems = [
    { id: "home", label: "Home", icon: "🏠", badge: null },
    { id: "orders", label: "Orders", icon: "📦", badge: orders.filter(o => o.status === "processing").length },
    { id: "categories", label: "Categories", icon: "📑", badge: null },
    { id: "cart", label: "Cart", icon: "🛒", badge: cartItems.length },
    { id: "wishlist", label: "Wishlist", icon: "❤️", badge: wishlistItems.length },
    { id: "address", label: "Addresses", icon: "📍", badge: null },
    { id: "profile", label: "Profile", icon: "👤", badge: null },
    { id: "settings", label: "Settings", icon: "⚙️", badge: null },
  ];

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const config = {
      delivered: { color: "bg-emerald-100 text-emerald-700", label: "Delivered" },
      processing: { color: "bg-amber-100 text-amber-700", label: "Processing" },
      shipped: { color: "bg-blue-100 text-blue-700", label: "Shipped" },
      cancelled: { color: "bg-rose-100 text-rose-700", label: "Cancelled" },
      pending: { color: "bg-gray-100 text-gray-700", label: "Pending" },
    };
    const { color, label } = config[status] || config.pending;
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>;
  };

  // Page Renderer
  const renderPage = () => {
    switch(activePage) {
      case "home":
        return <HomePage customer={customer} orders={orders} categories={categories} />;
      case "orders":
        return <OrdersPage orders={orders} />;
      case "categories":
        return <CategoriesPage categories={categories} />;
      case "cart":
        return <CartPage cartItems={cartItems} />;
      case "wishlist":
        return <WishlistPage wishlistItems={wishlistItems} />;
      case "address":
        return <AddressPage addresses={addresses} />;
      case "profile":
        return <ProfilePage customer={customer} />;
      case "settings":
        return <SettingsPage />;
      default:
        return <HomePage customer={customer} orders={orders} categories={categories} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white shadow-2xl transition-all duration-300 z-40 ${
        sidebarCollapsed ? "w-20" : "w-72"
      }`}>
        {/* Logo Area */}
        <div className={`h-20 flex items-center ${sidebarCollapsed ? "justify-center" : "px-6"} border-b border-slate-100`}>
          {sidebarCollapsed ? (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">Shop<span className="text-blue-600">Ease</span></span>
                <p className="text-xs text-gray-500">Customer Portal</p>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Card */}
        {!sidebarCollapsed && (
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-16 h-16 rounded-xl border-2 border-blue-100"
              />
              <div>
                <h3 className="font-bold text-gray-800">{customer.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{customer.membership}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {customer.id}</p>
              </div>
            </div>
          </div>
        )}

        {sidebarCollapsed && (
          <div className="p-4 flex justify-center">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-12 h-12 rounded-xl border-2 border-blue-100"
            />
          </div>
        )}

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? "justify-center" : "justify-between"
                  } px-4 py-3 rounded-xl transition-all duration-200 ${
                    activePage === item.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{item.icon}</span>
                    {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge > 0 && (
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      activePage === item.id
                        ? "bg-white text-blue-600"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center p-3 text-gray-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <span className="text-xl">{sidebarCollapsed ? "→" : "←"}</span>
            {!sidebarCollapsed && <span className="ml-2 text-sm">Collapse</span>}
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors mt-2"
          >
            <span className="text-xl">🚪</span>
            {!sidebarCollapsed && <span className="ml-2 text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-72"}`}>
        {/* Top Bar */}
        <div className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 capitalize">{activePage} Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, {customer.name}</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products, orders..."
                className="w-80 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="relative p-2 hover:bg-slate-50 rounded-xl">
                <span className="text-xl">🔔</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
            </div>

            {/* Date */}
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

// Home Page Component
const HomePage = ({ customer, orders, categories }) => (
  <div className="space-y-8">
    {/* Welcome Banner */}
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back, {customer.name}! 👋</h2>
          <p className="text-blue-100 mb-4">Your membership tier: {customer.membership}</p>
          <div className="flex space-x-4">
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <p className="text-sm opacity-80">Reward Points</p>
              <p className="text-2xl font-bold">2,450</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <p className="text-sm opacity-80">Next Tier</p>
              <p className="text-2xl font-bold">500 pts</p>
            </div>
          </div>
        </div>
        <div className="text-8xl">✨</div>
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">📦</span>
          <span className="text-sm text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{orders.length}</h3>
        <p className="text-gray-500 text-sm">Total Orders</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">🛒</span>
          <span className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded-full">+2</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">3</h3>
        <p className="text-gray-500 text-sm">In Cart</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">❤️</span>
          <span className="text-sm text-rose-600 bg-rose-50 px-2 py-1 rounded-full">+5</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">18</h3>
        <p className="text-gray-500 text-sm">Wishlist</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">💰</span>
          <span className="text-sm text-purple-600 bg-purple-50 px-2 py-1 rounded-full">+8.5%</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800">₹2.84L</h3>
        <p className="text-gray-500 text-sm">Total Spent</p>
      </div>
    </div>

    {/* Recent Orders & Categories */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recent Orders */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All →</button>
        </div>
        <div className="space-y-4">
          {orders.slice(0, 3).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  📦
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">₹{order.amount.toLocaleString()}</p>
                <StatusBadge status={order.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="space-y-3">
          {categories.slice(0, 5).map((category) => (
            <button key={category.id} className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">{category.count} items</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Orders Page Component
const OrdersPage = ({ orders }) => {
  const [filter, setFilter] = useState("all");
  
  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
          <p className="text-gray-500">Track and manage your orders</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center space-x-2">
            <span>📥</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-mono font-bold text-gray-800">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-medium text-gray-800">{order.date}</p>
              </div>
            </div>

            {/* Order Details */}
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-xl">
                      {product.image}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {product.quantity} × ₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800 mb-2">₹{order.amount.toLocaleString()}</p>
                <StatusBadge status={order.status} />
                {order.tracking && (
                  <p className="text-sm text-blue-600 mt-2">Track: {order.tracking}</p>
                )}
              </div>
            </div>

            {/* Order Footer */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View Details
              </button>
              {order.status === "delivered" && (
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Buy Again
                </button>
              )}
              {order.status === "shipped" && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Track Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Categories Page Component
const CategoriesPage = ({ categories }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Shop by Category</h2>
      <p className="text-gray-500">Browse products by category</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div key={category.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl group-hover:scale-110 transition-transform">{category.icon}</span>
            <span className="text-sm text-gray-500">{category.count} items</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium">Shop Now</span>
            <span className="text-gray-300 group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </div>
      ))}
    </div>

    {/* Featured Brands */}
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Brands</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Apple", "Samsung", "Sony", "LG", "Dell", "HP", "Nike", "Adidas"].map((brand) => (
          <div key={brand} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <p className="font-bold text-gray-800">{brand}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Cart Page Component
const CartPage = ({ cartItems }) => {
  const [items, setItems] = useState(cartItems);
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 499;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart ({items.length} items)</h2>
          
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-6 p-4 bg-slate-50 rounded-xl">
                <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center text-4xl shadow-sm">
                  {item.image}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    </div>
                    <p className="font-bold text-gray-800">₹{item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                        −
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button className="w-8 h-8 bg-white rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100">
                        +
                      </button>
                    </div>
                    
                    <button className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg">
                      <span>🗑️</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-24">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className={shipping === 0 ? "text-emerald-600 font-semibold" : ""}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (18%)</span>
              <span className="font-semibold">₹{Math.round(tax).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-blue-600">₹{Math.round(total).toLocaleString()}</span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all mb-3">
              Proceed to Checkout
            </button>
            
            <button className="w-full bg-slate-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all">
              Continue Shopping
            </button>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 mb-3">We accept:</p>
            <div className="flex space-x-2">
              {["Visa", "Mastercard", "PayPal", "UPI"].map((method) => (
                <span key={method} className="px-3 py-1 bg-slate-100 rounded-lg text-xs text-gray-600">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wishlist Page Component
const WishlistPage = ({ wishlistItems }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
        <p className="text-gray-500">{wishlistItems.length} items saved</p>
      </div>
      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
        Share Wishlist
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 hover:shadow-lg transition-all">
          <div className="relative mb-4">
            <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center text-6xl">
              {item.image}
            </div>
            <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-rose-500 hover:bg-rose-50">
              ❤️
            </button>
          </div>
          
          <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-sm font-medium">{item.rating}</span>
            </div>
            <span className="text-lg font-bold text-gray-800">₹{item.price.toLocaleString()}</span>
          </div>
          
          <button 
            className={`w-full py-2 rounded-lg font-medium transition-all ${
              item.inStock 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-slate-100 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!item.inStock}
          >
            {item.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      ))}
    </div>
  </div>
);

// Address Page Component
const AddressPage = ({ addresses }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Address Book</h2>
        <p className="text-gray-500">Manage your shipping addresses</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center space-x-2">
        <span>➕</span>
        <span>Add New Address</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.map((address) => (
        <div key={address.id} className={`bg-white rounded-xl shadow-sm border p-6 ${
          address.isDefault ? "border-blue-500" : "border-slate-100"
        }`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{address.type === "Home" ? "🏠" : "🏢"}</span>
              <div>
                <h3 className="font-bold text-gray-800">{address.type}</h3>
                {address.isDefault && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">Default</span>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-slate-50 rounded-lg">✏️</button>
              <button className="p-2 hover:bg-rose-50 rounded-lg text-rose-600">🗑️</button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-2">{address.address}</p>
          <p className="text-gray-600 mb-2">{address.city}, {address.state} {address.zip}</p>
          <p className="text-gray-500 text-sm">Phone: {address.phone}</p>
          
          {!address.isDefault && (
            <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
              Set as Default
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);

// Profile Page Component
const ProfilePage = ({ customer }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    {/* Profile Info */}
    <div className="lg:col-span-2">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={customer.name}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={customer.email}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              defaultValue={customer.phone}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Default Address</label>
            <textarea
              defaultValue={customer.address}
              rows="3"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Sidebar */}
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="text-center">
          <img
            src={customer.avatar}
            alt={customer.name}
            className="w-24 h-24 rounded-xl mx-auto mb-4 border-2 border-blue-100"
          />
          <h3 className="font-bold text-gray-800">{customer.name}</h3>
          <p className="text-sm text-gray-500 mb-4">Member since {customer.joinDate}</p>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Change Avatar
          </button>
        </div>
      </div>

      {/* Account Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="font-bold text-gray-800 mb-4">Account Statistics</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Member ID</span>
            <span className="font-mono font-medium">{customer.id}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Orders</span>
            <span className="font-medium">42</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Wishlist Items</span>
            <span className="font-medium">18</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Reward Points</span>
            <span className="font-medium text-blue-600">2,450</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Settings Page Component
const SettingsPage = () => (
  <div className="max-w-3xl">
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
      
      <div className="space-y-8">
        {/* Notification Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              "Order updates via email",
              "Promotional offers",
              "Wishlist price drops",
              "Newsletter subscription"
            ].map((item, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-gray-700">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-gray-700">Make profile public</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-gray-700">Show order history to others</span>
            </label>
          </div>
        </div>

        {/* Password Change */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Enable 2FA
          </button>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-rose-600 mb-4">Danger Zone</h3>
          <button className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Helper Component for Status Badge (reused)
const StatusBadge = ({ status }) => {
  const config = {
    delivered: { color: "bg-emerald-100 text-emerald-700", label: "Delivered" },
    processing: { color: "bg-amber-100 text-amber-700", label: "Processing" },
    shipped: { color: "bg-blue-100 text-blue-700", label: "Shipped" },
    cancelled: { color: "bg-rose-100 text-rose-700", label: "Cancelled" },
    pending: { color: "bg-gray-100 text-gray-700", label: "Pending" },
  };
  const { color, label } = config[status] || config.pending;
  return <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>;
};

export default CustomerDashboard;