import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiPlus, 
  HiSearch, 
  HiPencilAlt, 
  HiTrash, 
  HiFilter,
  HiEye,
  HiX,
  HiCheckCircle
} from 'react-icons/hi';

const AdminInsights = () => {
  const [activeTab, setActiveTab] = useState('blogs');
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulation of fetching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`json_data/${activeTab}.json`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Insights</h1>
          <p className="text-gray-500 mt-1">Add, edit, or remove blogs and campus events.</p>
        </div>
        <button 
          onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
          className="flex items-center justify-center px-4 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all"
        >
          <HiPlus className="h-5 w-5 mr-2" />
          Add New {activeTab === 'blogs' ? 'Blog' : 'Event'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('blogs')}
          className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === 'blogs' ? 'text-brand-primary' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Blogs
          {activeTab === 'blogs' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
        </button>
        <button 
          onClick={() => setActiveTab('events')}
          className={`px-6 py-3 font-bold text-sm transition-all relative ${activeTab === 'events' ? 'text-brand-primary' : 'text-gray-400 hover:text-gray-600'}`}
        >
          Events
          {activeTab === 'events' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/10 focus:border-brand-primary transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center px-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-all shadow-sm">
          <HiFilter className="h-5 w-5 mr-2 text-gray-400" />
          Filters
        </button>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-3xl border border-gray-50 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-primary"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-16 rounded-lg bg-gray-100 overflow-hidden mr-3 flex-shrink-0">
                          <img src={item.image || `${import.meta.env.BASE_URL}MOC_Logo.png`} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.author || 'MOC Admin'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-brand-primary/5 text-brand-primary text-[10px] font-bold rounded-md uppercase">
                        {item.category || (activeTab === 'events' ? item.type : 'General')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.date || item.fullDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-brand-primary transition-colors">
                          <HiEye className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleEdit(item)} className="p-2 text-gray-400 hover:text-orange-500 transition-colors">
                          <HiPencilAlt className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <HiTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredItems.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                      No {activeTab} found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Simple Modal Simulation */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center px-8 py-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit' : 'Add New'} {activeTab === 'blogs' ? 'Blog' : 'Event'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-50 rounded-full text-gray-400">
                  <HiX className="h-6 w-6" />
                </button>
              </div>
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                    <input 
                      type="text" 
                      defaultValue={editingItem?.title || ''}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Category / Type</label>
                    <input 
                      type="text" 
                      defaultValue={editingItem?.category || editingItem?.type || ''}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all"
                      placeholder="e.g. Academic, Cultural"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                    <input 
                      type="date" 
                      defaultValue={editingItem?.date || ''}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description / Excerpt</label>
                    <textarea 
                      rows="4"
                      defaultValue={editingItem?.excerpt || editingItem?.description || ''}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                      placeholder="Short summary of the item..."
                    />
                  </div>
                </div>
              </div>
              <div className="px-8 py-6 bg-gray-50 flex justify-end space-x-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-gray-500 font-bold hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Logic to "save"
                    setIsModalOpen(false);
                    alert('Item saved successfully (Simulated)');
                  }}
                  className="flex items-center px-8 py-2.5 bg-brand-primary text-white font-bold rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary transition-all"
                >
                  <HiCheckCircle className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminInsights;
