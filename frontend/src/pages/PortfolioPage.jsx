import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [riskAppetite, setRiskAppetite] = useState('moderate');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/auth/profile');
        setProfile(res.data);
        setRiskAppetite(res.data.risk_appetite || 'moderate');
        setError(null);
      } catch {
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const updateRisk = async (e) => {
    const newRisk = e.target.value;
    setRiskAppetite(newRisk);
    try {
      await api.put('/auth/profile', { risk_appetite: newRisk });
      alert('Risk Appetite updated');
    } catch {
      alert('Failed to update risk appetite');
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  if (!profile) {
    return <div className="p-6 text-center text-gray-600">No profile data</div>;
  }

  return (
    <main className="max-w-md mx-auto p-6 bg-white rounded-xl shadow min-h-screen mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Profile</h1>

      <div className="mb-5">
        <label className="block mb-1 font-semibold text-gray-700">First Name</label>
        <p className="text-gray-900">{profile.first_name}</p>
      </div>

      <div className="mb-5">
        <label className="block mb-1 font-semibold text-gray-700">Last Name</label>
        <p className="text-gray-900">{profile.last_name}</p>
      </div>

      <div className="mb-5">
        <label className="block mb-1 font-semibold text-gray-700">Email</label>
        <p className="text-gray-900">{profile.email}</p>
      </div>

      <div className="mb-5">
        <label htmlFor="risk_appetite" className="block mb-1 font-semibold text-gray-700">
          Risk Appetite
        </label>
        <select
          id="risk_appetite"
          value={riskAppetite}
          onChange={updateRisk}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
    </main>
  );
}
