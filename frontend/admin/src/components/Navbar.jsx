import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-semibold">لوحة التحكم</span>
          </div>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <Link to="/users" className="px-3 py-2 rounded-md hover:bg-gray-700">
              المستخدمين
            </Link>
            <Link to="/messages" className="px-3 py-2 rounded-md hover:bg-gray-700">
              الرسائل
            </Link>
            <Link to="/offers" className="px-3 py-2 rounded-md hover:bg-gray-700">
              العروض
            </Link>
            <Link to="/products" className="px-3 py-2 rounded-md hover:bg-gray-700">
              المنتجات
            </Link>
            <Link to="/events" className="px-3 py-2 rounded-md hover:bg-gray-700">
              الفعاليات
            </Link>
            <Link to="/news" className="px-3 py-2 rounded-md hover:bg-gray-700">
              الأخبار
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 