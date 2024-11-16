import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Overview from './components/Overview';
import Users from './components/Users';
import Messages from './components/Messages';
import Offers from './components/Offers';
import Products from './components/Products';
import Events from './components/Events';
import News from './components/News';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4 text-right">
                    مرحباً بك يا مدير
                  </h1>
                  <p className="text-gray-600 text-lg text-right">
                    نتمنى لك يوماً سعيداً
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">نظرة عامة على النظام</h2>
                  <Overview />
                </div>
              </div>
            } />
            <Route path="/users" element={
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">قائمة المستخدمين</h2>
                <Users />
              </div>
            } />
            <Route path="/messages" element={
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">الرسائل الواردة</h2>
                <Messages />
              </div>
            } />
            <Route path="/offers" element={
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">العروض المتاحة</h2>
                <Offers />
              </div>
            } />
            <Route path="/products" element={
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">المنتجات</h2>
                <Products />
              </div>
            } />
            <Route path="/events" element={
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">الفعاليات</h2>
                <Events />
              </div>
            } />
            <Route path="/news" element={
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-right">الأخبار</h2>
                <News />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
