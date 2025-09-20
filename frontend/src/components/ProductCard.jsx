import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-2">
        <strong>Type:</strong> {product.investment_type}
      </p>
      <p>
        <strong>Tenure:</strong> {product.tenure_months} months
      </p>
      <p>
        <strong>Yield:</strong> {product.annual_yield}%
      </p>
      <p>
        <strong>Risk Level:</strong> {product.risk_level}
      </p>
      <Link
        to={`/products/${product.id}`}
        className="text-blue-600 hover:underline mt-3 block"
      >
        Details & Invest
      </Link>
    </div>
  );
}
