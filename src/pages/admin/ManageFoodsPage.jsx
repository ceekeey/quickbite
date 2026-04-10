import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import Button from '../../components/ui/Button';
import FoodModal from '../../components/admin/FoodModal';
import { foods } from '../../data/dummyData';

const ManageFoodsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null);

  const handleEdit = (food) => {
    setEditingFood(food);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingFood(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-main">Manage Foods</h1>
          <p className="text-text-muted mt-1">Add, edit or remove items from your menu.</p>
        </div>
        <Button variant="primary" size="lg" className="gap-2 px-8 shadow-lg shadow-primary/20" onClick={handleAddNew}>
          <FiPlus strokeWidth={3} /> Add New Food
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 bg-bg-base px-5 py-3 rounded-2xl w-full max-w-sm group border border-transparent focus-within:border-primary/20 transition-all">
          <FiSearch className="text-text-muted group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search food by name..."
            className="bg-transparent border-none outline-none text-sm font-medium w-full text-text-main"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="md" className="gap-2 bg-bg-base text-text-muted hover:text-primary">
            <FiFilter /> Filter
          </Button>
          <div className="h-8 w-[1px] bg-gray-100" />
          <span className="text-sm font-bold text-text-muted px-2">{foods.length} items total</span>
        </div>
      </div>

      {/* Foods Table */}
      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-bg-base/50">
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Image & Name</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Price</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em]">Rating</th>
                <th className="px-8 py-5 font-black text-text-muted text-[10px] uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {foods.map((food) => (
                <tr key={food.id} className="group hover:bg-bg-base/30 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform border border-gray-100">
                        <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-extrabold text-text-main leading-tight">{food.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs font-bold text-text-muted group-hover:border-primary/20 group-hover:text-primary transition-all">
                      {food.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="font-black text-primary">${food.price.toFixed(2)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <span className="text-yellow-400 font-bold">★</span>
                      <span>{food.rating}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEdit(food)}
                        className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FoodModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        food={editingFood} 
      />
    </div>
  );
};

export default ManageFoodsPage;
