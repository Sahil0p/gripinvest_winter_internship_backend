import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        alert('Product not found');
        navigate('/products');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, navigate]);

  if (loading) return <div className="p-6 text-center">Loading product...</div>;

  return (
    <main className="p-6 bg-gray-50 min-h-screen max-w-3xl mx-auto rounded shadow bg-white">
      <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      <ul className="mb-6 space-y-1">
        <li><strong>Type:</strong> {product.investment_type}</li>
        <li><strong>Tenure:</strong> {product.tenure_months} months</li>
        <li><strong>Annual Yield:</strong> {product.annual_yield}%</li>
        <li><strong>Risk Level:</strong> {product.risk_level}</li>
        <li><strong>Minimum Investment:</strong> ${product.min_investment}</li>
        {product.max_investment && <li><strong>Maximum Investment:</strong> ${product.max_investment}</li>}
      </ul>

      <button
        onClick={() => navigate('/invest', { state: { product } })}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Invest Now
      </button>
    </main>
  );
}
