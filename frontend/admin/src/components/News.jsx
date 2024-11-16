import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddNewsForm from './AddNewsForm';
import Pagination from './common/Pagination';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // إضافة حالة الصفحات
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news');
      setNews(response.data);
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ في جلب الأخبار');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
      try {
        await axios.delete(`http://localhost:5000/api/news/${id}`);
        setNews(news.filter(item => item._id !== id));
      } catch (err) {
        setError('حدث خطأ في حذف الخبر');
      }
    }
  };

  const handleNewsAdded = (newNews) => {
    setNews([newNews, ...news]);
    setShowAddForm(false);
  };

  const filteredNews = searchTerm
    ? news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : news;

  // حساب العناصر الحالية للعرض
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

  // تغيير الصفحة
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center p-4">جاري التحميل...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          {showAddForm ? 'إغلاق النموذج' : '+ إضافة خبر جديد'}
        </button>
        
        <div className="relative w-64">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            placeholder="ابحث في الأخبار..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-6 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-right">إضافة خبر جديد</h3>
          <AddNewsForm onNewsAdded={handleNewsAdded} />
        </div>
      )}

      <div className="mb-4 text-right text-gray-600">
        عدد الأخبار: {filteredNews.length}
      </div>

      <div className="space-y-4">
        {currentItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-600 hover:text-red-800"
              >
                حذف
              </button>
              <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            </div>
            
            {item.sections.map((section, index) => (
              <div key={index} className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-2 text-right">
                  {section.title}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-right">
                  {section.items.map((listItem, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">
                      {listItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredNews.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default News; 