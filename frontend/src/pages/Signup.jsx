import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../features/auth/authSlice';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { checkPasswordStrength } from '../utils/aiHelpers';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', risk_appetite: 'moderate' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState([]);

  useEffect(() => {
    if (token) navigate('/dashboard');
  }, [token, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      const strengthInfo = checkPasswordStrength(value);
      setPasswordStrength(strengthInfo.score);
      setPasswordFeedback(strengthInfo.feedback);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded shadow bg-white">
      <h2 className="text-3xl mb-4 font-semibold">Signup</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name" className="block mb-1">First Name</label>
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} required className="border rounded w-full p-2 mb-4" />
        <label htmlFor="last_name" className="block mb-1">Last Name</label>
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="border rounded w-full p-2 mb-4" />
        <label htmlFor="email" className="block mb-1">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="border rounded w-full p-2 mb-4" />
        <label htmlFor="password" className="block mb-1">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="border rounded w-full p-2 mb-1" />
        <PasswordStrengthMeter strength={passwordStrength} />
        {passwordFeedback && passwordFeedback.length > 0 && (
          <ul className="text-xs text-red-500 mt-1 mb-4 list-disc list-inside">
            {passwordFeedback.map((msg, idx) => <li key={idx}>{msg}</li>)}
          </ul>
        )}
        <label htmlFor="risk_appetite" className="block mb-1">Risk Appetite</label>
        <select id="risk_appetite" name="risk_appetite" value={formData.risk_appetite} onChange={handleChange} className="border rounded w-full p-2 mb-4">
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
      </p>
    </div>
  );
}
