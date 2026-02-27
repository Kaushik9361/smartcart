// src/pages/admin/AdminLayout.jsx
import { Outlet, NavLink } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-4">
          <NavLink to="/admin" end className="block hover:text-gray-300">
            Overview
          </NavLink>
          <NavLink to="/admin/users" className="block hover:text-gray-300">
            Users
          </NavLink>
          <NavLink to="/admin/products" className="block hover:text-gray-300">
            Products
          </NavLink>
          <NavLink to="/admin/orders" className="block hover:text-gray-300">
            Orders
          </NavLink>
          <NavLink to="/admin/analytics" className="block hover:text-gray-300">
            Analytics
          </NavLink>
          <NavLink to="/admin/settings" className="block hover:text-gray-300">
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;
