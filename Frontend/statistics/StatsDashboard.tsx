import React from 'react';
import type { Statistics } from '../types';
import { OrderStatus } from '../types';

interface StatsDashboardProps {
  statistics: Statistics;
  isLoading?: boolean;
}

const statusLabels = {
  [OrderStatus.RECEIVED]: 'Received',
  [OrderStatus.PREPARING]: 'Preparing',
  [OrderStatus.READY]: 'Ready',
  [OrderStatus.ON_THE_WAY]: 'On the Way',
  [OrderStatus.DELIVERED]: 'Delivered'
};

const statusColors = {
  [OrderStatus.RECEIVED]: 'bg-blue-500',
  [OrderStatus.PREPARING]: 'bg-yellow-500',
  [OrderStatus.READY]: 'bg-purple-500',
  [OrderStatus.ON_THE_WAY]: 'bg-orange-500',
  [OrderStatus.DELIVERED]: 'bg-green-500'
};

export const StatsDashboard: React.FC<StatsDashboardProps> = ({
  statistics,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  const totalActiveOrders = Object.entries(statistics.ordersByStatus)
    .filter(([status]) => status !== OrderStatus.DELIVERED)
    .reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold">Statistics Dashboard</h2>
        <p className="text-blue-100 mt-1">Real-time business metrics</p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Orders</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {statistics.totalOrders}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-semibold flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              {totalActiveOrders} active
            </span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                ${statistics.totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            From {statistics.totalOrders} orders
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Average Order</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                ${statistics.averageOrderValue.toFixed(2)}
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Per order average
          </div>
        </div>
      </div>

      {/* Orders by Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Orders by Status</h3>
        
        <div className="space-y-4">
          {Object.entries(statistics.ordersByStatus).map(([status, count]) => {
            const percentage = statistics.totalOrders > 0 
              ? (count / statistics.totalOrders) * 100 
              : 0;

            return (
              <div key={status}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${statusColors[status as OrderStatus]}`} />
                    <span className="text-sm font-semibold text-gray-700">
                      {statusLabels[status as OrderStatus]}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {count} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${statusColors[status as OrderStatus]}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Daily Revenue</h3>
        
        {statistics.dailyRevenue.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No revenue data available</p>
          </div>
        ) : (
          <div className="space-y-3">
            {statistics.dailyRevenue.slice(-7).map((day, index) => {
              const maxRevenue = Math.max(...statistics.dailyRevenue.map(d => d.revenue));
              const percentage = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
              const date = new Date(day.date);
              const formattedDate = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              });

              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-semibold text-gray-700">
                    {formattedDate}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
                          style={{ width: `${Math.max(percentage, 5)}%` }}
                        >
                          {percentage > 20 && (
                            <span className="text-white text-xs font-bold">
                              ${day.revenue.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="w-24 text-right">
                        <p className="text-sm font-bold text-green-600">
                          ${day.revenue.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-600">
                          {day.orders} orders
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-600 text-xs font-semibold">Completed</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {statistics.ordersByStatus[OrderStatus.DELIVERED] || 0}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-600 text-xs font-semibold">In Progress</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {(statistics.ordersByStatus[OrderStatus.PREPARING] || 0) +
             (statistics.ordersByStatus[OrderStatus.READY] || 0)}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-600 text-xs font-semibold">Delivering</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {statistics.ordersByStatus[OrderStatus.ON_THE_WAY] || 0}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <p className="text-gray-600 text-xs font-semibold">Pending</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {statistics.ordersByStatus[OrderStatus.RECEIVED] || 0}
          </p>
        </div>
      </div>
    </div>
  );
};