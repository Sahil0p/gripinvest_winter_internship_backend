import React from 'react';

const PasswordStrengthMeter = ({ strength }) => {
  const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colorMap = ['#ef4444', '#f97316', '#facc15', '#4ade80', '#22c55e'];

  return (
    <div className="mt-2">
      <div
        className="h-2 rounded"
        style={{
          width: `${((strength + 1) / strengthLevels.length) * 100}%`,
          backgroundColor: colorMap[strength] || '#e5e7eb',
        }}
      />
      <p className="text-sm mt-1 text-gray-700">
        {strengthLevels[strength] || 'Unknown'}
      </p>
    </div>
  );
};

export default PasswordStrengthMeter;
