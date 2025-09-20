import { useState } from 'react';
import api from '../utils/api';

export default function usePortfolioInsightAI() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const res = await api.get('/investments/insights');
      setInsights(res.data);
      setError(null);
    } catch (e) {
      setError(e.message || 'Failed to fetch portfolio insights');
    } finally {
      setLoading(false);
    }
  };

  return { insights, loading, error, fetchInsights };
}
