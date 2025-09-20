import React, { useState } from 'react';
import api from '../utils/api';

export default function RecommendationButton({ onRecommendations }) {
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products/recommendations');
      onRecommendations(res.data);
    } catch (e) {
      alert('Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRecommend}
      disabled={loading}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'AI Recommend Products'}
    </button>
  );
}
