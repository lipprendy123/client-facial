'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../dashboardLayout';
import { Loader2, Plus, Pencil, Trash2, X } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../../components/ui/alert';

const API_URL = 'http://localhost:4000/api/benefits';

export default function BenefitTable() {
  const [benefits, setBenefits] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchBenefits = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setBenefits(response.data.data);
    } catch (error) {
      showNotification('Error fetching benefits', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { name });
        showNotification('Benefit updated successfully');
      } else {
        await axios.post(API_URL, { name });
        showNotification('Benefit added successfully');
      }
      setName('');
      setEditingId(null);
      setIsEditModalOpen(false);
      fetchBenefits();
    } catch (error) {
      showNotification('Error saving benefit', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (benefit) => {
    setName(benefit.name);
    setEditingId(benefit._id);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this benefit?')) return;
    
    try {
      await axios.delete(`${API_URL}/${id}`);
      showNotification('Benefit deleted successfully');
      fetchBenefits();
    } catch (error) {
      showNotification('Error deleting benefit', 'error');
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Manage Benefits</h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add New Benefit</span>
          </button>
        </div>

        {/* Notification */}
        {notification && (
          <Alert className={`${notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <AlertDescription>{notification.message}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Benefit Name</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {benefits.map((benefit, index) => (
                    <tr key={benefit._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{benefit.name}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(benefit)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={16} />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(benefit._id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {benefits.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No benefits found. Click "Add New Benefit" to create one.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          {editingId ? 'Edit Benefit' : 'Add New Benefit'}
                        </h3>
                        <button
                          onClick={() => setIsEditModalOpen(false)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Benefit Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            placeholder="Enter benefit name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <Loader2 className="animate-spin w-4 h-4" />
                            ) : editingId ? (
                              'Update'
                            ) : (
                              'Add'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}