import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatCard = ({ title, count, total, icon }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div className="text-4xl text-gray-400">
          {icon}
        </div>
        <div className="text-right">
          <h3 className="text-gray-600 mb-2">{title}</h3>
          <p className="text-3xl font-bold text-gray-800">{count}</p>
          <div className="mt-2">
            <div className="bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{percentage}% من الإجمالي</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const [stats, setStats] = useState({
    users: 0,
    messages: 0,
    offers: 0,
    products: 0,
    events: 0,
    news: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          usersRes,
          messagesRes,
          offersRes,
          productsRes,
          eventsRes,
          newsRes
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/users'),
          axios.get('http://localhost:5000/api/messages'),
          axios.get('http://localhost:5000/api/offers'),
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/events'),
          axios.get('http://localhost:5000/api/news')
        ]);

        setStats({
          users: usersRes.data.length,
          messages: messagesRes.data.length,
          offers: offersRes.data.length,
          products: productsRes.data.length,
          events: eventsRes.data.length,
          news: newsRes.data.length
        });
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ في جلب الإحصائيات');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="text-center p-4">جاري التحميل...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  const total = Object.values(stats).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="المستخدمين"
        count={stats.users}
        total={total}
        icon="👥"
      />
      <StatCard
        title="الرسائل"
        count={stats.messages}
        total={total}
        icon="✉️"
      />
      <StatCard
        title="العروض"
        count={stats.offers}
        total={total}
        icon="🎯"
      />
      <StatCard
        title="المنتجات"
        count={stats.products}
        total={total}
        icon="🛍️"
      />
      <StatCard
        title="الفعاليات"
        count={stats.events}
        total={total}
        icon="📅"
      />
      <StatCard
        title="الأخبار"
        count={stats.news}
        total={total}
        icon="📰"
      />
    </div>
  );
};

export default Overview; 