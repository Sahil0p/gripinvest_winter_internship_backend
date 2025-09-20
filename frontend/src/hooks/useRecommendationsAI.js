import { useState } from 'react';
import api from '../utils/api';

export default function useRecommendationsAI() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products/recommendations');
      setRecommendations(res.data);
      setError(null);
    } catch (e) {
      setError(e.message || 'Failed to fetch recommendations');
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, loading, error, fetchRecommendations };
}
