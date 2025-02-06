'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardLayout from '../dashboardLayout';

const API_URL = 'http://localhost:4000/api/benefits';

export default function BenefitTable() {
  const [benefits, setBenefits] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    try {
      const response = await axios.get(API_URL);
      setBenefits(response.data.data);
    } catch (error) {
      console.error('Error fetching benefits:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, { name });
      } else {
        await axios.post(API_URL, { name });
      }
      setName('');
      setEditingId(null);
      setIsEditModalOpen(false);
      fetchBenefits();
    } catch (error) {
      console.error('Error saving benefit:', error);
    }
  };

  const handleEdit = (benefit) => {
    setName(benefit.name);
    setEditingId(benefit._id);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBenefits();
    } catch (error) {
      console.error('Error deleting benefit:', error);
    }
  };

  return (
    <DashboardLayout>
           <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Benefits</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter benefit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Benefit Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {benefits.map((benefit, index) => (
              <tr key={benefit._id} className="text-center border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{benefit.name}</td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button onClick={() => handleEdit(benefit)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(benefit._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Benefit</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter benefit name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border p-2 rounded w-full"
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </DashboardLayout>
  );
}
