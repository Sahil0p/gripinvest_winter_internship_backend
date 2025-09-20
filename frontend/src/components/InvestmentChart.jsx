import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function InvestmentChart({ data }) {
  // data example: [{ risk_level: 'low', amount: 5000 }, { risk_level: 'high', amount: 2000 }]
  const labels = data.map((item) => item.risk_level);
  const amounts = data.map((item) => item.amount);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Risk Distribution',
        data: amounts,
        backgroundColor: ['#10B981', '#FBBF24', '#EF4444'],
        hoverOffset: 30,
      },
    ],
  };

  return <Pie data={chartData} />;
}
