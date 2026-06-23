import React from 'react';

export default function MonthlyConsumptionWidget({ month = 'N/A', usage = 0 }) {
  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
          Monthly Consumption
        </h3>
        <p className="text-xs text-gray-500">Latest volume metrics</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-50 pt-3">
        <div>
          <span className="block text-xs text-gray-400">Billing Period</span>
          <span className="text-sm font-semibold text-gray-700" data-testid="consumption-month">
            {month}
          </span>
        </div>
        <div className="text-right">
          <span className="block text-xs text-gray-400">Usage</span>
          <span className="text-lg font-bold text-blue-600" data-testid="consumption-usage">
            {usage} m³
          </span>
        </div>
      </div>
    </div>
  );
}