import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded shadow bg-white">
      <h2 className="text-3xl mb-4 font-semibold">Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-1" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="border rounded w-full p-2 mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <label className="block mb-1" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="border rounded w-full p-2 mb-4"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{' '}
        <Link to="/signup" className="text-blue-600 hover:underline">Signup here</Link>
      </p>
    </div>
  );
}
