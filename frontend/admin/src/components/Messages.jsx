import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './common/Pagination';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data);
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ في جلب الرسائل');
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMessages.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className="text-center p-4">جاري التحميل...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            placeholder="ابحث في الرسائل..."
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

      <div className="mb-4 text-right text-gray-600">
        عدد الرسائل: {filteredMessages.length}
      </div>

      <div className="space-y-4">
        {currentItems.length > 0 ? (
          currentItems.map((message) => (
            <div key={message._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
                <h3 className="text-xl font-semibold text-gray-800">{message.subject}</h3>
              </div>
              <div className="mb-4 text-right">
                <p className="text-gray-600">{message.message}</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="text-right">
                    <p>الاسم: {message.name}</p>
                    <p>البريد الإلكتروني: {message.email}</p>
                    <p>الهاتف: {message.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            لا توجد رسائل مطابقة للبحث
          </div>
        )}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredMessages.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Messages; 