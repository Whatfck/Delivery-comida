import React from 'react';
import type { Extra } from '../../types';

interface ExtrasListProps {
  extras: Extra[];
  selectedExtras: string[];
  onToggleExtra: (extraId: string) => void;
}

const categoryIcons: Record<string, string> = {
  cheese: '🧀',
  meat: '🥓',
  vegetables: '🥬',
  sauce: '🌶️'
};

const categoryColors: Record<string, string> = {
  cheese: 'bg-yellow-100 border-yellow-300 text-yellow-800',
  meat: 'bg-red-100 border-red-300 text-red-800',
  vegetables: 'bg-green-100 border-green-300 text-green-800',
  sauce: 'bg-orange-100 border-orange-300 text-orange-800'
};

export const ExtrasList: React.FC<ExtrasListProps> = ({
  extras,
  selectedExtras,
  onToggleExtra
}) => {
  const groupedExtras = extras.reduce((acc, extra) => {
    if (!acc[extra.category]) {
      acc[extra.category] = [];
    }
    acc[extra.category].push(extra);
    return acc;
  }, {} as Record<string, Extra[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedExtras).map(([category, categoryExtras]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2 capitalize">
            <span className="text-2xl">{categoryIcons[category]}</span>
            {category}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categoryExtras.map((extra) => {
              const isSelected = selectedExtras.includes(extra.id);

              return (
                <button
                  key={extra.id}
                  onClick={() => onToggleExtra(extra.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : `border-gray-200 hover:border-gray-300 ${categoryColors[category]}`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {extra.name}
                        </span>
                        {isSelected && (
                          <svg
                            className="w-5 h-5 text-blue-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">
                        +${extra.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};