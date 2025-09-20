import React from 'react';

function AIInsightsCard({ title, insights }) {
  return (
    <div className="bg-white shadow-md p-4 rounded mb-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded text-sm">
        {JSON.stringify(insights, null, 2)}
      </pre>
    </div>
  );
}

export default AIInsightsCard;
