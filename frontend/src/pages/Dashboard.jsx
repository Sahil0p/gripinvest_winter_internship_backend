import React from 'react';

export default function Dashboard({ portfolioValue = 20000, count = 2, aiInsights }) {
  const insights = aiInsights || {
    totalInvested: '20000',
    riskDistribution: { moderate: '60%', high: '40%' },
    recommendation: 'Consider diversifying into low risk products.',
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      <nav className="bg-[#2055d6] text-white px-6 py-4 flex justify-between items-center shadow">
        <div className="font-extrabold text-2xl">GripInvest</div>
        <div className="flex gap-7 items-center text-base">
          <a href="/dashboard" className="hover:text-indigo-200">Dashboard</a>
          <a href="/products" className="hover:text-indigo-200">Products</a>
          <a href="/portfolio" className="hover:text-indigo-200">Portfolio</a>
          <a href="/logs" className="hover:text-indigo-200">Logs</a>
          <a href="/profile" className="hover:text-indigo-200">Profile</a>
          <button className="bg-red-500 px-4 py-2 rounded text-white ml-8 font-semibold hover:bg-red-700">
            Logout
          </button>
        </div>
      </nav>

      <main className="my-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-[#1c2243] mb-6">Dashboard</h1>
        <div className="flex flex-wrap gap-8 justify-center w-full max-w-[1400px]">
          <div className="bg-white rounded-2xl shadow-xl p-10 flex-1 min-w-[290px] max-w-[400px] flex flex-col justify-center items-center">
            <div className="text-xl font-medium text-gray-700 mb-3">Total Portfolio Value</div>
            <div className="text-4xl font-extrabold text-green-600">${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10 flex-1 min-w-[290px] max-w-[400px] flex flex-col justify-center items-center">
            <div className="text-xl font-medium text-gray-700 mb-3">Investments Count</div>
            <div className="text-4xl font-extrabold text-blue-600">{count}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 min-w-[330px] max-w-[440px] flex-1">
            <div className="text-xl font-semibold mb-4 text-gray-800">AI Portfolio Insights</div>
            <pre className="bg-gray-50 rounded-lg p-4 overflow-x-auto font-mono text-[15px] whitespace-pre text-gray-700" style={{ minHeight: '140px' }}>
              {JSON.stringify(insights, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
