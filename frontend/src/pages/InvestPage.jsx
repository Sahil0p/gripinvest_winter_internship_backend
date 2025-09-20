import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function InvestPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!product) {
    navigate('/products');
    return null;
  }

  const handleInvest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Uncomment below to use real API call:
      // await api.post('/investments', { product_id: product.id, amount: parseFloat(amount) });
      // alert('Investment successful!');
      // navigate('/portfolio');

      // Mock delay and success:
      await new Promise((res) => setTimeout(res, 1000));
      alert('Investment successful! (mock)');
      navigate('/portfolio');
    } catch (e) {
      setError(
        e.response?.data?.message || 'Investment failed. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Invest in {product.name}</h2>
      {error && (
        <p className="mb-4 text-red-600 font-semibold">
          {error}
        </p>
      )}
      <form onSubmit={handleInvest}>
        <label htmlFor="amount" className="block mb-1">
          Amount to Invest ($)
        </label>
        <input
          id="amount"
          type="number"
          min={product.min_investment}
          max={product.max_investment || undefined}
          step="0.01"
          className="border rounded w-full p-2 mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Invest'}
        </button>
      </form>
    </main>
  );
}
