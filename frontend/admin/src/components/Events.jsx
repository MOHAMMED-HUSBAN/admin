import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEventForm from './AddEventForm';
import Pagination from './common/Pagination';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ في جلب الفعاليات');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
      } catch (err) {
        setError('حدث خطأ في حذف الفعالية');
      }
    }
  };

  const handleEventAdded = (newEvent) => {
    setEvents([newEvent, ...events]);
    setShowAddForm(false);
  };

  const filteredEvents = searchTerm
    ? events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : events;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

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
          {showAddForm ? 'إغلاق النموذج' : '+ إضافة فعالية جديدة'}
        </button>
        
        <div className="relative w-64">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            placeholder="ابحث في الفعاليات..."
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-right">إضافة فعالية جديدة</h3>
          <AddEventForm onEventAdded={handleEventAdded} />
        </div>
      )}

      <div className="mb-4 text-right text-gray-600">
        عدد الفعاليات: {filteredEvents.length}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((event) => (
          <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {event.year}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
              </div>
              <div className="text-right mb-2">
                <p className="text-gray-600">المكان: {event.venue}</p>
                <p className="text-gray-600">التاريخ: {new Date(event.date).toLocaleDateString('ar-SA')}</p>
                <p className="text-gray-600">
                  النوع: {
                    event.gender === 'mixed' ? 'مختلط' :
                    event.gender === 'male' ? 'رجال' : 'نساء'
                  }
                </p>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    حذف
                  </button>
                  <span className="text-sm text-gray-500">
                    عدد المشاركين: {event.participants?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredEvents.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Events; 