import React from 'react';
import { OrderStatus as OrderStatusEnum } from '../../../types';
import type { Order } from '../../../types';

interface OrderStatusProps {
  order: Order;
  onUpdateStatus?: (newStatus: OrderStatusEnum) => void;
  canUpdateStatus?: boolean;
}

const statusConfig = {
  [OrderStatusEnum.RECEIVED]: {
    label: 'Received',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    nextStatus: OrderStatusEnum.PREPARING
  },
  [OrderStatusEnum.PREPARING]: {
    label: 'Preparing',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    nextStatus: OrderStatusEnum.READY
  },
  [OrderStatusEnum.READY]: {
    label: 'Ready',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    nextStatus: OrderStatusEnum.ON_THE_WAY
  },
  [OrderStatusEnum.ON_THE_WAY]: {
    label: 'On the Way',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    nextStatus: OrderStatusEnum.DELIVERED
  },
  [OrderStatusEnum.DELIVERED]: {
    label: 'Delivered',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    nextStatus: null
  }
};

const statusOrder = [
  OrderStatusEnum.RECEIVED,
  OrderStatusEnum.PREPARING,
  OrderStatusEnum.READY,
  OrderStatusEnum.ON_THE_WAY,
  OrderStatusEnum.DELIVERED
];

export const OrderStatus: React.FC<OrderStatusProps> = ({
  order,
  onUpdateStatus,
  canUpdateStatus = false
}) => {
  const currentStatusIndex = statusOrder.indexOf(order.status);
  const config = statusConfig[order.status];

  const handleNextStatus = () => {
    if (config.nextStatus && onUpdateStatus) {
      onUpdateStatus(config.nextStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Current Status Badge */}
      <div className={`${config.bgColor} rounded-lg p-4 mb-6`}>
        <div className="flex items-center gap-3">
          <div className={`${config.color} text-white p-3 rounded-full`}>
            {config.icon}
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Status</p>
            <p className={`text-2xl font-bold ${config.textColor}`}>
              {config.label}
            </p>
          </div>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Progress</h3>
        <div className="relative">
          {statusOrder.map((status, index) => {
            const isCompleted = index <= currentStatusIndex;
            const isCurrent = index === currentStatusIndex;
            const statusConf = statusConfig[status];

            return (
              <div key={status} className="flex items-start mb-6 last:mb-0">
                {/* Connector Line */}
                {index < statusOrder.length - 1 && (
                  <div
                    className={`absolute left-5 top-12 w-0.5 h-16 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    style={{ marginTop: '-0.5rem' }}
                  />
                )}

                {/* Status Icon */}
                <div
                  className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? statusConf.color + ' text-white'
                      : 'bg-gray-200 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-offset-2 ring-blue-200' : ''}`}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="w-3 h-3 rounded-full bg-current" />
                  )}
                </div>

                {/* Status Info */}
                <div className="ml-4 flex-1">
                  <p
                    className={`font-semibold ${
                      isCompleted ? statusConf.textColor : 'text-gray-500'
                    }`}
                  >
                    {statusConf.label}
                  </p>
                  {isCurrent && (
                    <p className="text-sm text-gray-600 mt-1">In progress...</p>
                  )}
                  {isCompleted && !isCurrent && (
                    <p className="text-sm text-green-600 mt-1">Completed</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-semibold text-gray-800">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-semibold text-green-600">${order.totalAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Customer</p>
            <p className="font-semibold text-gray-800">{order.customer.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Items</p>
            <p className="font-semibold text-gray-800">{order.items.length}</p>
          </div>
        </div>
      </div>

      {/* Update Status Button */}
      {canUpdateStatus && config.nextStatus && (
        <button
          onClick={handleNextStatus}
          className="w-full px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <span>Update to {statusConfig[config.nextStatus].label}</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {order.status === OrderStatusEnum.DELIVERED && (
        <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 text-center">
          <p className="text-green-700 font-semibold flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Order Completed Successfully!
          </p>
        </div>
      )}
    </div>
  );
};