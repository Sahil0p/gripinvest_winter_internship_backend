// import React, { useEffect, useState } from 'react';
// import api from '../utils/api';
// import ProductCard from '../components/ProductCard';
// import RecommendationButton from '../components/RecommendationButton';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [recommended, setRecommended] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const res = await api.get('/products');
//         console.log('API /products response:', res.data);
//         setProducts(res.data.products || []);
//         setError(null);
//       } catch (e) {
//         console.error('Failed to fetch products:', e);
//         setError('Unable to load products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProducts();
//   }, []);

//   const onRecommendations = (recs) => {
//     setRecommended(recs || []);
//   };

//   if (loading) {
//     return (
//       <div className="p-6 flex justify-center">
//         <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
//         <style>{`
//           .loader {
//             border-top-color: #3498db;
//             animation: spin 1s linear infinite;
//           }
//           @keyframes spin {
//             0% { transform: rotate(0deg);}
//             100% { transform: rotate(360deg);}
//           }
//         `}</style>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-600">{error}</div>;
//   }

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between mb-6 items-center">
//         <h1 className="text-3xl font-semibold">Investment Products</h1>
//         <RecommendationButton onRecommendations={onRecommendations} />
//       </div>

//       {recommended.length > 0 && (
//         <section className="mb-6">
//           <h2 className="text-xl font-semibold mb-3">Recommended Products</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {recommended.map(p => <ProductCard key={p.id} product={p} />)}
//           </div>
//         </section>
//       )}

//       <section>
//         <h2 className="text-xl font-semibold mb-3">All Products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {products.map(p => <ProductCard key={p.id} product={p} />)}
//         </div>
//       </section>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import RecommendationButton from '../components/RecommendationButton';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get('/products');
        setProducts(res.data.products || []);
        setError(null);
      } catch {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const onRecommendations = (recs) => setRecommended(recs || []);

  if (loading) return <div className="p-6 text-center">Loading products...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Investment Products</h1>
        <RecommendationButton onRecommendations={onRecommendations} />
      </div>

      {recommended.length > 0 && (
        <section className="mb-12 max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-5">Recommended Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {recommended.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col cursor-pointer">
      <h3 className="text-lg font-semibold mb-2 text-indigo-900">{product.name}</h3>
      <p className="mb-4 text-sm text-gray-600 line-clamp-3">{product.description}</p>
      <div className="mt-auto">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <div>{product.investment_type.toUpperCase()}</div>
          <div>Risk: <span className="font-semibold">{product.risk_level}</span></div>
        </div>
        <div className="text-indigo-800 font-bold text-lg">${product.annual_yield}% annually</div>
      </div>
    </div>
  );
}
