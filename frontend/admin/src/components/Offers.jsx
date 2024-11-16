import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddOfferForm from './AddOfferForm';
import Pagination from './common/Pagination';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/offers');
      setOffers(response.data);
      setLoading(false);
    } catch (err) {
      setError('حدث خطأ في جلب العروض');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العرض؟')) {
      try {
        await axios.delete(`http://localhost:5000/api/offers/${id}`);
        setOffers(offers.filter(offer => offer._id !== id));
      } catch (err) {
        setError('حدث خطأ في حذف العرض');
      }
    }
  };

  const handleOfferAdded = (newOffer) => {
    setOffers([newOffer, ...offers]);
    setShowAddForm(false);
  };

  const filteredOffers = searchTerm
    ? offers.filter(offer =>
        offer.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : offers;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOffers.slice(indexOfFirstItem, indexOfLastItem);

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
          {showAddForm ? 'إغلاق النموذج' : '+ إضافة عرض جديد'}
        </button>
        
        <div className="relative w-64">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            placeholder="ابحث عن اسم العرض..."
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-right">إضافة عرض جديد</h3>
          <AddOfferForm onOfferAdded={handleOfferAdded} />
        </div>
      )}

      <div className="mb-4 text-right text-gray-600">
        عدد العروض: {filteredOffers.length}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.length > 0 ? (
          currentItems.map((offer) => (
            <div key={offer._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={offer.image} 
                alt={offer.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {offer.category}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800">{offer.name}</h3>
                </div>
                <p className="text-gray-600 text-right mb-2">{offer.description}</p>
                <div className="flex justify-between items-center border-t pt-2">
                  <button
                    onClick={() => handleDelete(offer._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    حذف
                  </button>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800">${offer.price}</p>
                    <p className="text-sm text-gray-500">
                      {offer.duration === 'monthly' ? 'شهري' : 
                       offer.duration === 'quarterly' ? 'ربع سنوي' : 'سنوي'}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-gray-700 mb-1 text-right">المميزات:</h4>
                  <ul className="list-disc list-inside text-right">
                    {offer.features.map((feature, index) => (
                      <li key={index} className="text-gray-600 text-sm">{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">
            لا توجد عروض مطابقة للبحث
          </div>
        )}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredOffers.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default Offers; 