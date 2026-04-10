import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUploadCloud } from 'react-icons/fi';
import Button from '../ui/Button';

const FoodModal = ({ isOpen, onClose, food = null }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl shadow-black/20 overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-text-main">
                {food ? 'Edit Food Item' : 'Add New Food'}
              </h2>
              <p className="text-text-muted text-sm font-medium mt-1">
                Fill in the details below to {food ? 'update' : 'create'} a menu item.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 text-text-muted hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Form */}
          <div className="p-8 max-h-[70vh] overflow-y-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">Food Name</label>
                  <input
                    type="text"
                    defaultValue={food?.name || ''}
                    placeholder="e.g. Special Pepperoni"
                    className="w-full bg-bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-main"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">Category</label>
                  <select
                    defaultValue={food?.category || ''}
                    className="w-full bg-bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-main"
                  >
                    <option value="">Select Category</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Sushi">Sushi</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={food?.price || ''}
                    placeholder="9.99"
                    className="w-full bg-bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-main"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">Rating</label>
                  <input
                    type="number"
                    max="5"
                    step="0.1"
                    defaultValue={food?.rating || 4.5}
                    className="w-full bg-bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-main"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">Description</label>
                <textarea
                  rows="3"
                  defaultValue={food?.description || ''}
                  placeholder="Describe this delicious dish..."
                  className="w-full bg-bg-base border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-medium text-text-main resize-none"
                />
              </div>

              {/* Image Upload Placeholder */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-text-muted">Food Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-text-muted hover:border-primary hover:bg-primary/5 transition-all cursor-pointer group">
                  <FiUploadCloud size={40} className="mb-4 group-hover:scale-110 transition-transform" />
                  <p className="font-bold text-sm">Drop your image here, or browse</p>
                  <p className="text-[10px] uppercase font-black tracking-widest mt-1 opacity-50">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-gray-100 bg-bg-base/50 flex items-center justify-end gap-4">
            <Button variant="ghost" onClick={onClose} className="font-bold text-text-muted">
              Cancel
            </Button>
            <Button variant="primary" onClick={onClose} className="px-10">
              {food ? 'Update Item' : 'Create Item'}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FoodModal;
