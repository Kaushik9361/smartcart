// AdminDashboard.jsx - Professional Enterprise Admin Dashboard
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dateRange, setDateRange] = useState("week");

  const [admin] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      if (!user || user === "undefined") {
        throw new Error("Invalid user");
      }
      return JSON.parse(user);
    } catch (error) {
      return {
        id: "ADMIN-78945",
        name: "Alexander Mitchell",
        email: "alex.mitchell@shopeease.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        role: "Super Administrator",
        department: "Operations",
        permissions: ["full_access", "user_management", "analytics", "finance"],
        lastLogin: "Today, 09:30 AM",
        mfaEnabled: true
      };
    }
  });

  if (!admin) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Comprehensive Analytics Data
  const analytics = {
    revenue: {
      today: 485200,
      yesterday: 452300,
      week: 3245000,
      month: 12450000,
      year: 145800000,
      growth: 23.5,
      projected: 158000000,
      averageOrderValue: 4250,
      conversionRate: 3.8,
      refundRate: 1.2
    },
    users: {
      total: 15245,
      active: 12389,
      new: 456,
      returning: 8933,
      churnRate: 2.3,
      retentionRate: 78.5,
      averageLifetime: "18 months",
      topCountries: [
        { country: "India", users: 8923, percentage: 58.5 },
        { country: "USA", users: 2345, percentage: 15.4 },
        { country: "UK", users: 1234, percentage: 8.1 },
        { country: "Canada", users: 987, percentage: 6.5 }
      ]
    },
    orders: {
      total: 3982,
      completed: 3292,
      processing: 456,
      pending: 234,
      cancelled: 156,
      returned: 98,
      averageProcessingTime: "2.5 hours",
      peakHours: "14:00-17:00",
      peakDays: ["Monday", "Tuesday"]
    },
    products: {
      total: 512,
      active: 478,
      lowStock: 23,
      outOfStock: 8,
      topSelling: [
        { name: "Wireless Headphones", sales: 1234, revenue: 3085000, growth: 34 },
        { name: "Smart Watch Series 7", sales: 892, revenue: 8028000, growth: 28 },
        { name: "Gaming Mouse Pro", sales: 756, revenue: 680400, growth: 45 },
        { name: "4K Monitor 27\"", sales: 445, revenue: 11125000, growth: 67 }
      ],
      categories: 45,
      inventoryValue: 23450000,
      turnoverRate: 3.2
    },
    traffic: {
      totalVisitors: 45234,
      uniqueVisitors: 28934,
      pageViews: 189345,
      bounceRate: 32.5,
      averageSession: "4m 32s",
      sources: [
        { source: "Direct", visitors: 15678, percentage: 34.6 },
        { source: "Organic Search", visitors: 12345, percentage: 27.3 },
        { source: "Social Media", visitors: 8765, percentage: 19.4 },
        { source: "Email Campaign", visitors: 5432, percentage: 12.0 },
        { source: "Referrals", visitors: 3014, percentage: 6.7 }
      ]
    },
    salesByHour: [
      { hour: "00-03", sales: 23400 },
      { hour: "03-06", sales: 12300 },
      { hour: "06-09", sales: 45600 },
      { hour: "09-12", sales: 89200 },
      { hour: "12-15", sales: 124500 },
      { hour: "15-18", sales: 156700 },
      { hour: "18-21", sales: 234500 },
      { hour: "21-24", sales: 178900 }
    ],
    salesByDay: [
      { day: "Mon", sales: 345600 },
      { day: "Tue", sales: 389200 },
      { day: "Wed", sales: 423500 },
      { day: "Thu", sales: 456700 },
      { day: "Fri", sales: 523400 },
      { day: "Sat", sales: 678900 },
      { day: "Sun", sales: 456200 }
    ],
    monthlyComparison: [
      { month: "Jan", current: 12450000, previous: 10230000 },
      { month: "Feb", current: 11340000, previous: 9870000 },
      { month: "Mar", current: 14560000, previous: 11230000 },
      { month: "Apr", current: 13230000, previous: 11980000 },
      { month: "May", current: 15670000, previous: 12450000 },
      { month: "Jun", current: 16780000, previous: 13450000 }
    ]
  };

  const recentOrders = [
    { id: "ORD-2024-1023", customer: "John Doe", amount: 3200, status: "delivered", date: "2024-01-15", items: 2, payment: "paid", paymentMethod: "Credit Card" },
    { id: "ORD-2024-1022", customer: "Sarah Miller", amount: 1150, status: "processing", date: "2024-01-14", items: 1, payment: "pending", paymentMethod: "UPI" },
    { id: "ORD-2024-1021", customer: "Mike Wilson", amount: 800, status: "pending", date: "2024-01-13", items: 1, payment: "failed", paymentMethod: "Debit Card" },
    { id: "ORD-2024-1020", customer: "Emma Davis", amount: 4500, status: "shipped", date: "2024-01-12", items: 3, payment: "paid", paymentMethod: "PayPal" },
    { id: "ORD-2024-1019", customer: "James Brown", amount: 2800, status: "delivered", date: "2024-01-11", items: 2, payment: "paid", paymentMethod: "Credit Card" },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "customer", status: "active", orders: 23, spent: 145000, joined: "2024-01-15", lastActive: "Today" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "vip", status: "active", orders: 45, spent: 378000, joined: "2024-01-14", lastActive: "Yesterday" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "admin", status: "inactive", orders: 0, spent: 0, joined: "2024-01-13", lastActive: "5 days ago" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "customer", status: "active", orders: 12, spent: 89000, joined: "2024-01-12", lastActive: "2 days ago" },
  ];

  const activities = [
    { user: "John Doe", action: "placed order #ORD-2024-1023", time: "2 minutes ago", type: "order", severity: "info" },
    { user: "System", action: "backup completed successfully", time: "15 minutes ago", type: "system", severity: "success" },
    { user: "Admin", action: "updated product prices (23 items)", time: "1 hour ago", type: "product", severity: "warning" },
    { user: "Sarah Miller", action: "requested refund for order #ORD-2024-1015", time: "2 hours ago", type: "refund", severity: "critical" },
  ];

  // Navigation Items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "📊", badge: null },
    { id: "analytics", label: "Analytics", icon: "📈", badge: "Live" },
    { id: "users", label: "Users", icon: "👥", badge: analytics.users.new },
    { id: "products", label: "Products", icon: "📦", badge: analytics.products.lowStock },
    { id: "orders", label: "Orders", icon: "🛒", badge: analytics.orders.pending },
    { id: "finance", label: "Finance", icon: "💰", badge: null },
    { id: "reports", label: "Reports", icon: "📑", badge: null },
    { id: "settings", label: "Settings", icon: "⚙️", badge: null },
  ];

  // Status Badge Component
  const StatusBadge = ({ status, type = "default" }) => {
    const config = {
      delivered: { color: "bg-emerald-100 text-emerald-700", label: "Delivered" },
      processing: { color: "bg-amber-100 text-amber-700", label: "Processing" },
      shipped: { color: "bg-blue-100 text-blue-700", label: "Shipped" },
      pending: { color: "bg-gray-100 text-gray-700", label: "Pending" },
      cancelled: { color: "bg-rose-100 text-rose-700", label: "Cancelled" },
      paid: { color: "bg-emerald-100 text-emerald-700", label: "Paid" },
      failed: { color: "bg-rose-100 text-rose-700", label: "Failed" },
      active: { color: "bg-emerald-100 text-emerald-700", label: "Active" },
      inactive: { color: "bg-gray-100 text-gray-700", label: "Inactive" },
      critical: { color: "bg-rose-100 text-rose-700", label: "Critical" },
      warning: { color: "bg-amber-100 text-amber-700", label: "Warning" },
      success: { color: "bg-emerald-100 text-emerald-700", label: "Success" },
      info: { color: "bg-blue-100 text-blue-700", label: "Info" },
    };
    const { color, label } = config[status] || config.pending;
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>;
  };

  // Page Renderer
  const renderPage = () => {
    switch(activePage) {
      case "dashboard":
        return <DashboardPage analytics={analytics} recentOrders={recentOrders} activities={activities} StatusBadge={StatusBadge} dateRange={dateRange} setDateRange={setDateRange} />;
      case "analytics":
        return <AnalyticsPage analytics={analytics} StatusBadge={StatusBadge} />;
      case "users":
        return <UsersPage users={users} StatusBadge={StatusBadge} />;
      case "products":
        return <ProductsPage products={analytics.products} StatusBadge={StatusBadge} />;
      case "orders":
        return <OrdersPage orders={recentOrders} analytics={analytics.orders} StatusBadge={StatusBadge} />;
      case "finance":
        return <FinancePage analytics={analytics} />;
      case "reports":
        return <ReportsPage analytics={analytics} />;
      case "settings":
        return <SettingsPage admin={admin} />;
      default:
        return <DashboardPage analytics={analytics} recentOrders={recentOrders} activities={activities} StatusBadge={StatusBadge} dateRange={dateRange} setDateRange={setDateRange} />;
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
              <span className="text-white font-bold text-xl">A</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-800">Admin<span className="text-blue-600">Hub</span></span>
                <p className="text-xs text-gray-500">Enterprise Dashboard</p>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        {!sidebarCollapsed && (
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={admin.avatar}
                  alt={admin.name}
                  className="w-16 h-16 rounded-xl border-2 border-blue-100"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{admin.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{admin.role}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {admin.id}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-gray-500">MFA Enabled</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">● Active</span>
            </div>
          </div>
        )}

        {sidebarCollapsed && (
          <div className="p-4 flex justify-center">
            <div className="relative">
              <img
                src={admin.avatar}
                alt={admin.name}
                className="w-12 h-12 rounded-xl border-2 border-blue-100"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
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
                        ? "bg-white/20 text-white"
                        : "bg-amber-100 text-amber-600"
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
            <p className="text-sm text-gray-500">Welcome back, {admin.name}</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
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

            {/* Quick Actions */}
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl hover:shadow-lg flex items-center space-x-2">
              <span>➕</span>
              <span>Quick Action</span>
            </button>
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

// Dashboard Page Component
const DashboardPage = ({ analytics, recentOrders, activities, StatusBadge, dateRange, setDateRange }) => (
  <div className="space-y-8">
    {/* Welcome Banner */}
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Executive Dashboard</h2>
          <p className="text-blue-100 mb-4">Real-time overview of your business performance</p>
          <div className="flex space-x-4">
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <p className="text-sm opacity-80">Today's Revenue</p>
              <p className="text-2xl font-bold">₹{(analytics.revenue.today / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2">
              <p className="text-sm opacity-80">Conversion Rate</p>
              <p className="text-2xl font-bold">{analytics.revenue.conversionRate}%</p>
            </div>
          </div>
        </div>
        <div className="text-8xl">📈</div>
      </div>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Revenue"
        value={`₹${(analytics.revenue.today / 100000).toFixed(2)}L`}
        change={analytics.revenue.growth}
        icon="💰"
        color="blue"
        subValue={`vs ₹${(analytics.revenue.yesterday / 100000).toFixed(2)}L yesterday`}
      />
      <MetricCard
        title="Users"
        value={analytics.users.total.toLocaleString()}
        change={12.3}
        icon="👥"
        color="green"
        subValue={`${analytics.users.new} new today`}
      />
      <MetricCard
        title="Orders"
        value={analytics.orders.total}
        change={8.7}
        icon="📦"
        color="amber"
        subValue={`${analytics.orders.processing} processing`}
      />
      <MetricCard
        title="Products"
        value={analytics.products.total}
        change={-2.1}
        icon="🛍️"
        color="rose"
        subValue={`${analytics.products.lowStock} low stock`}
      />
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Sales by Day Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Sales by Day</h3>
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>
        <div className="space-y-3">
          {analytics.salesByDay.map((day) => (
            <div key={day.day} className="flex items-center space-x-3">
              <span className="w-10 text-sm font-medium text-gray-600">{day.day}</span>
              <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"
                  style={{ width: `${(day.sales / 678900) * 100}%` }}
                ></div>
              </div>
              <span className="w-20 text-sm font-semibold text-gray-800">₹{(day.sales / 1000).toFixed(1)}K</span>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Traffic Sources</h3>
        <div className="space-y-4">
          {analytics.traffic.sources.map((source) => (
            <div key={source.source} className="flex items-center space-x-3">
              <span className="w-24 text-sm font-medium text-gray-600">{source.source}</span>
              <div className="flex-1">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
              <span className="w-16 text-sm font-semibold text-gray-800">{source.percentage}%</span>
              <span className="w-20 text-sm text-gray-500">{source.visitors.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Recent Orders & Activities */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Recent Orders */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All →</button>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                  📦
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer} • {order.items} items</p>
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

      {/* Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Activity Feed</h3>
        <div className="space-y-4">
          {activities.map((activity, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
                activity.severity === 'critical' ? 'bg-rose-100 text-rose-600' :
                activity.severity === 'warning' ? 'bg-amber-100 text-amber-600' :
                activity.severity === 'success' ? 'bg-emerald-100 text-emerald-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {activity.type === 'order' ? '🛒' :
                 activity.type === 'system' ? '⚙️' :
                 activity.type === 'product' ? '📦' : '💰'}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Analytics Page Component - Comprehensive Analytics Dashboard
const AnalyticsPage = ({ analytics, StatusBadge }) => {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Advanced Analytics</h2>
          <p className="text-gray-500">Deep insights into your business performance</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center space-x-2">
            <span>📥</span>
            <span>Export Report</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center space-x-2">
            <span>📅</span>
            <span>Select Date Range</span>
          </button>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <RealTimeMetric
          title="Revenue (Live)"
          value={`₹${(analytics.revenue.today / 100000).toFixed(2)}L`}
          change={analytics.revenue.growth}
          icon="💰"
          trend="up"
        />
        <RealTimeMetric
          title="Active Users"
          value={analytics.users.active}
          change={5.2}
          icon="👥"
          trend="up"
        />
        <RealTimeMetric
          title="Conversion Rate"
          value={`${analytics.revenue.conversionRate}%`}
          change={0.8}
          icon="📊"
          trend="up"
        />
        <RealTimeMetric
          title="Avg. Order Value"
          value={`₹${analytics.revenue.averageOrderValue}`}
          change={-2.1}
          icon="💰"
          trend="down"
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-800">Monthly Performance</h3>
            <div className="flex space-x-2">
              <button className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'revenue' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-gray-600'}`}
                onClick={() => setSelectedMetric('revenue')}>
                Revenue
              </button>
              <button className={`px-3 py-1 rounded-lg text-sm ${selectedMetric === 'orders' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-gray-600'}`}
                onClick={() => setSelectedMetric('orders')}>
                Orders
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {analytics.monthlyComparison.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-600">{month.month}</span>
                  <span className="text-gray-800">₹{(month.current / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${(month.current / 16780000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-emerald-600">+{((month.current - month.previous) / month.previous * 100).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Hour */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Sales by Hour</h3>
          <div className="space-y-3">
            {analytics.salesByHour.map((hour) => (
              <div key={hour.hour} className="flex items-center space-x-3">
                <span className="w-16 text-sm font-medium text-gray-600">{hour.hour}</span>
                <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg"
                    style={{ width: `${(hour.sales / 234500) * 100}%` }}
                  ></div>
                </div>
                <span className="w-20 text-sm font-semibold text-gray-800">₹{(hour.sales / 1000).toFixed(1)}K</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Peak Hours:</span> {analytics.orders.peakHours} 
              ({analytics.salesByHour.find(h => h.hour === "18-21").sales.toLocaleString()} sales)
            </p>
          </div>
        </div>
      </div>

      {/* User Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Demographics */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">User Demographics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">Top Countries</h4>
              <div className="space-y-3">
                {analytics.users.topCountries.map((country) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{country.country}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">{country.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">Key Metrics</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500">Retention Rate</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.users.retentionRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Churn Rate</p>
                  <p className="text-2xl font-bold text-rose-600">{analytics.users.churnRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Avg. Lifetime</p>
                  <p className="text-2xl font-bold text-gray-800">{analytics.users.averageLifetime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Traffic Overview</h3>
          <div className="space-y-4">
            <div className="text-center p-4 bg-slate-50 rounded-xl">
              <p className="text-3xl font-bold text-gray-800">{analytics.traffic.totalVisitors.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Visitors</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <p className="text-lg font-bold text-gray-800">{analytics.traffic.bounceRate}%</p>
                <p className="text-xs text-gray-500">Bounce Rate</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl text-center">
                <p className="text-lg font-bold text-gray-800">{analytics.traffic.averageSession}</p>
                <p className="text-xs text-gray-500">Avg. Session</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Top Selling Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analytics.products.topSelling.map((product, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">📦</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  product.growth > 30 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  +{product.growth}%
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{product.sales} sales</p>
              <p className="text-lg font-bold text-gray-800">₹{(product.revenue / 100000).toFixed(2)}L</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Users Page Component
const UsersPage = ({ users, StatusBadge }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-gray-500">Manage and monitor user activity</p>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center space-x-2">
        <span>➕</span>
        <span>Add User</span>
      </button>
    </div>

    {/* User Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Total Users</p>
        <p className="text-3xl font-bold text-gray-800">15,245</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Active Today</p>
        <p className="text-3xl font-bold text-emerald-600">1,234</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">New This Week</p>
        <p className="text-3xl font-bold text-blue-600">456</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">VIP Users</p>
        <p className="text-3xl font-bold text-purple-600">892</p>
      </div>
    </div>

    {/* Users Table */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">User</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Role</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Orders</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Spent</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Last Active</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-gray-700">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                  user.role === 'vip' ? 'bg-amber-100 text-amber-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={user.status} />
              </td>
              <td className="px-6 py-4 text-gray-800">{user.orders}</td>
              <td className="px-6 py-4 font-medium text-gray-800">₹{user.spent.toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive}</td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">✏️</button>
                  <button className="p-2 hover:bg-rose-50 rounded-lg text-rose-600">🗑️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Products Page Component
const ProductsPage = ({ products, StatusBadge }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Product Catalog</h2>
        <p className="text-gray-500">Manage your inventory and products</p>
      </div>
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center space-x-2">
          <span>📥</span>
          <span>Export</span>
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center space-x-2">
          <span>➕</span>
          <span>Add Product</span>
        </button>
      </div>
    </div>

    {/* Inventory Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Total Products</p>
        <p className="text-3xl font-bold text-gray-800">{products.total}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Active</p>
        <p className="text-3xl font-bold text-emerald-600">{products.active}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Low Stock</p>
        <p className="text-3xl font-bold text-amber-600">{products.lowStock}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Out of Stock</p>
        <p className="text-3xl font-bold text-rose-600">{products.outOfStock}</p>
      </div>
    </div>

    {/* Products Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.topSelling.map((product, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
              📦
            </div>
            <StatusBadge status={product.stock > 50 ? 'success' : product.stock > 20 ? 'warning' : 'critical'} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sales</span>
              <span className="font-medium text-gray-800">{product.sales}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Revenue</span>
              <span className="font-medium text-gray-800">₹{(product.revenue / 100000).toFixed(2)}L</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stock</span>
              <span className="font-medium text-gray-800">{product.stock}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
              Edit
            </button>
            <button className="px-3 py-2 bg-slate-100 text-gray-600 rounded-lg hover:bg-slate-200 text-sm">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Orders Page Component
const OrdersPage = ({ orders, analytics, StatusBadge }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
        <p className="text-gray-500">Track and manage all orders</p>
      </div>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 flex items-center space-x-2">
        <span>📊</span>
        <span>Generate Report</span>
      </button>
    </div>

    {/* Order Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Total Orders</p>
        <p className="text-3xl font-bold text-gray-800">{analytics.total}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Processing</p>
        <p className="text-3xl font-bold text-amber-600">{analytics.processing}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Delivered</p>
        <p className="text-3xl font-bold text-emerald-600">{analytics.completed}</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Cancelled</p>
        <p className="text-3xl font-bold text-rose-600">{analytics.cancelled}</p>
      </div>
    </div>

    {/* Orders Table */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Order ID</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Customer</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Date</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Amount</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Payment</th>
            <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-mono font-medium text-blue-600">{order.id}</td>
              <td className="px-6 py-4 text-gray-800">{order.customer}</td>
              <td className="px-6 py-4 text-gray-500">{order.date}</td>
              <td className="px-6 py-4 font-semibold text-gray-800">₹{order.amount.toLocaleString()}</td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={order.payment} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600">👁️</button>
                  <button className="p-2 hover:bg-green-50 rounded-lg text-green-600">✏️</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Finance Page Component
const FinancePage = ({ analytics }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>
        <p className="text-gray-500">Track revenue, expenses, and projections</p>
      </div>
      <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 flex items-center space-x-2">
        <span>💰</span>
        <span>Create Invoice</span>
      </button>
    </div>

    {/* Revenue Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Today's Revenue</p>
        <p className="text-3xl font-bold text-gray-800">₹{(analytics.revenue.today / 100000).toFixed(2)}L</p>
        <p className="text-sm text-emerald-600 mt-2">↑ {analytics.revenue.growth}% vs yesterday</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">This Month</p>
        <p className="text-3xl font-bold text-gray-800">₹{(analytics.revenue.month / 100000).toFixed(2)}L</p>
        <p className="text-sm text-blue-600 mt-2">Projected: ₹{(analytics.revenue.projected / 100000).toFixed(2)}L</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">This Year</p>
        <p className="text-3xl font-bold text-gray-800">₹{(analytics.revenue.year / 10000000).toFixed(2)}Cr</p>
        <p className="text-sm text-emerald-600 mt-2">↑ 23.5% vs last year</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-sm text-gray-500 mb-1">Avg. Order Value</p>
        <p className="text-3xl font-bold text-gray-800">₹{analytics.revenue.averageOrderValue}</p>
        <p className="text-sm text-gray-500 mt-2">Refund Rate: {analytics.revenue.refundRate}%</p>
      </div>
    </div>

    {/* Financial Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Monthly Revenue Trend</h3>
        <div className="space-y-4">
          {analytics.monthlyComparison.map((month) => (
            <div key={month.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">{month.month}</span>
                <span className="text-gray-800">₹{(month.current / 100000).toFixed(1)}L</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                  style={{ width: `${(month.current / 16780000) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Products</p>
              <p className="text-sm text-gray-500">Physical goods</p>
            </div>
            <p className="text-xl font-bold text-gray-800">₹8.45Cr</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Digital</p>
              <p className="text-sm text-gray-500">Downloads & subscriptions</p>
            </div>
            <p className="text-xl font-bold text-gray-800">₹3.21Cr</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Services</p>
              <p className="text-sm text-gray-500">Consulting & support</p>
            </div>
            <p className="text-xl font-bold text-gray-800">₹1.89Cr</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Reports Page Component
const ReportsPage = ({ analytics }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Reports & Analytics</h2>
        <p className="text-gray-500">Generate and download business reports</p>
      </div>
      <div className="flex space-x-3">
        <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 flex items-center space-x-2">
          <span>📅</span>
          <span>Select Period</span>
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center space-x-2">
          <span>📥</span>
          <span>Download All</span>
        </button>
      </div>
    </div>

    {/* Report Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReportCard
        title="Sales Report"
        description="Daily, weekly, and monthly sales analysis"
        icon="📊"
        color="blue"
        lastGenerated="Today, 09:00 AM"
      />
      <ReportCard
        title="User Analytics"
        description="User behavior and demographics"
        icon="👥"
        color="green"
        lastGenerated="Yesterday, 11:30 PM"
      />
      <ReportCard
        title="Inventory Report"
        description="Stock levels and product performance"
        icon="📦"
        color="amber"
        lastGenerated="2 days ago"
      />
      <ReportCard
        title="Financial Summary"
        description="Revenue, expenses, and projections"
        icon="💰"
        color="purple"
        lastGenerated="Today, 08:15 AM"
      />
      <ReportCard
        title="Marketing Analytics"
        description="Campaign performance and ROI"
        icon="📈"
        color="pink"
        lastGenerated="Yesterday, 03:45 PM"
      />
      <ReportCard
        title="Customer Support"
        description="Ticket volume and satisfaction"
        icon="🎫"
        color="indigo"
        lastGenerated="1 day ago"
      />
    </div>

    {/* Scheduled Reports */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Scheduled Reports</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
              📊
            </div>
            <div>
              <p className="font-semibold text-gray-800">Weekly Sales Report</p>
              <p className="text-sm text-gray-500">Every Monday at 09:00 AM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Active</span>
            <button className="text-gray-400 hover:text-gray-600">✏️</button>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
              👥
            </div>
            <div>
              <p className="font-semibold text-gray-800">Monthly User Report</p>
              <p className="text-sm text-gray-500">1st of every month at 10:00 AM</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Active</span>
            <button className="text-gray-400 hover:text-gray-600">✏️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Settings Page Component
const SettingsPage = ({ admin }) => (
  <div className="max-w-3xl">
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h2>
      
      <div className="space-y-8">
        {/* Profile Settings */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Admin Profile</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={admin.name}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue={admin.email}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* System Preferences */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-gray-700">Enable email notifications</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-gray-700">Auto-generate daily reports</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-gray-700">Maintenance mode</span>
            </label>
          </div>
        </div>

        {/* Security */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Security</h3>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-800">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={admin.mfaEnabled} className="sr-only peer" readOnly />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="pt-6 border-t">
          <h3 className="text-lg font-semibold text-rose-600 mb-4">Danger Zone</h3>
          <div className="space-y-3">
            <button className="w-full py-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors">
              Reset System Settings
            </button>
            <button className="w-full py-3 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Helper Components
const MetricCard = ({ title, value, change, icon, color, subValue }) => {
  const colors = {
    blue: "from-blue-600 to-indigo-600",
    green: "from-emerald-600 to-teal-600",
    amber: "from-amber-600 to-orange-600",
    rose: "from-rose-600 to-pink-600"
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          change > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-gray-500 text-sm mb-2">{title}</p>
      {subValue && <p className="text-xs text-gray-400">{subValue}</p>}
    </div>
  );
};

const RealTimeMetric = ({ title, value, change, icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
    <div className="flex items-center justify-between mb-2">
      <span className="text-2xl">{icon}</span>
      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
        trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
      }`}>
        {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}%
      </span>
    </div>
    <p className="text-xl font-bold text-gray-800 mb-1">{value}</p>
    <p className="text-sm text-gray-500">{title}</p>
    <div className="mt-2">
      <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs">
        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse mr-1"></span>
        Live
      </span>
    </div>
  </div>
);

const ReportCard = ({ title, description, icon, color, lastGenerated }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-lg transition-all cursor-pointer">
    <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center text-2xl mb-4`}>
      {icon}
    </div>
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-4">{description}</p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">Last: {lastGenerated}</span>
      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Generate →</button>
    </div>
  </div>
);

export default AdminDashboard;
