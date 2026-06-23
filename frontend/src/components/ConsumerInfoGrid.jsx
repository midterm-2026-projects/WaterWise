import React from 'react';

export default function ConsumerInfoGrid({ name, purok, houseNumber }) {
  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
        Consumer Information
      </h3>
      <div className="space-y-3">
        <div>
          <span className="block text-sm text-gray-500">Full Name</span>
          <span className="text-base font-medium text-gray-800" data-testid="info-name">
            {name || 'N/A'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-sm text-gray-500">Purok</span>
            <span className="text-base font-medium text-gray-800" data-testid="info-purok">
              {purok || 'N/A'}
            </span>
          </div>
          <div>
            <span className="block text-sm text-gray-500">House No.</span>
            <span className="text-base font-medium text-gray-800" data-testid="info-house">
              {houseNumber || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}