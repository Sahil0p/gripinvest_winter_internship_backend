import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [riskAppetite, setRiskAppetite] = useState('moderate');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/auth/profile');
        setProfile(res.data);
        setRiskAppetite(res.data.risk_appetite || 'moderate');
      } catch (e) {
        alert('Failed to load profile');
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;

  if (!profile) return <div className="p-6 text-center text-red-600">Failed to load profile data.</div>;

  const updateRisk = async e => {
    const newRisk = e.target.value;
    setRiskAppetite(newRisk);
    try {
      await api.put('/auth/profile', { risk_appetite: newRisk });
      alert('Risk Appetite updated');
    } catch {
      alert('Failed to update risk appetite');
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto bg-white rounded shadow min-h-screen">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>

      <div className="mb-4">
        <label className="block font-semibold mb-2">First Name</label>
        <p>{profile.first_name}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Last Name</label>
        <p>{profile.last_name}</p>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Email</label>
        <p>{profile.email}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="risk_appetite" className="block font-semibold mb-2">
          Risk Appetite
        </label>
        <select
          id="risk_appetite"
          value={riskAppetite}
          onChange={updateRisk}
          className="border rounded w-full p-2"
        >
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>
    </main>
  );
}
