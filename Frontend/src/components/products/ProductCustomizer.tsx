import React, { useState, useEffect } from 'react';
import { ExtrasList } from './ExtrasList';
import type { Product, Extra, ProductWithExtras } from '../../../types';

interface ProductCustomizerProps {
  product: Product;
  availableExtras: Extra[];
  onAddToOrder: (productWithExtras: ProductWithExtras) => void;
  onCancel: () => void;
}

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  product,
  availableExtras,
  onAddToOrder,
  onCancel
}) => {
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(product.basePrice);

  useEffect(() => {
    const extrasPrice = selectedExtras.reduce((sum, extraId) => {
      const extra = availableExtras.find(e => e.id === extraId);
      return sum + (extra?.price || 0);
    }, 0);

    setTotalPrice((product.basePrice + extrasPrice) * quantity);
  }, [selectedExtras, quantity, product.basePrice, availableExtras]);

  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToOrder = () => {
    const extras = availableExtras.filter(extra =>
      selectedExtras.includes(extra.id)
    );

    const productWithExtras: ProductWithExtras = {
      product,
      extras,
      quantity,
      totalPrice
    };

    onAddToOrder(productWithExtras);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Customize Your Order</h2>
            <p className="text-gray-600 mt-1">{product.name}</p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-4">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <p className="text-green-600 font-bold text-lg mt-2">
                  Base Price: ${product.basePrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Extras */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add Extras</h3>
            <ExtrasList
              extras={availableExtras}
              selectedExtras={selectedExtras}
              onToggleExtra={handleToggleExtra}
            />
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quantity</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-xl"
              >
                −
              </button>
              <span className="text-2xl font-bold text-gray-800 w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Selected Extras Summary */}
          {selectedExtras.length > 0 && (
            <div className="mb-6 bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Selected Extras:</h4>
              <ul className="space-y-1">
                {selectedExtras.map(extraId => {
                  const extra = availableExtras.find(e => e.id === extraId);
                  return extra ? (
                    <li key={extra.id} className="text-sm text-gray-700 flex justify-between">
                      <span>• {extra.name}</span>
                      <span className="font-semibold">+${extra.price.toFixed(2)}</span>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">Total Price:</span>
            <span className="text-3xl font-bold text-green-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToOrder}
              className="flex-1 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Add to Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};