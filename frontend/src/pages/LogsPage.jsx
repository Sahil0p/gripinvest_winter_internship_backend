import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function LogTable({ logs }) {
  return (
    <table className="min-w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Timestamp</th>
          <th className="border border-gray-300 px-4 py-2">User ID</th>
          <th className="border border-gray-300 px-4 py-2">Endpoint</th>
          <th className="border border-gray-300 px-4 py-2">Method</th>
          <th className="border border-gray-300 px-4 py-2">Status</th>
          <th className="border border-gray-300 px-4 py-2">Error Message</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id} className="even:bg-gray-50">
            <td className="border border-gray-300 px-4 py-2">{new Date(log.created_at).toLocaleString()}</td>
            <td className="border border-gray-300 px-4 py-2">{log.user_id || '-'}</td>
            <td className="border border-gray-300 px-4 py-2">{log.endpoint}</td>
            <td className="border border-gray-300 px-4 py-2">{log.http_method}</td>
            <td className="border border-gray-300 px-4 py-2">{log.status_code}</td>
            <td className="border border-gray-300 px-4 py-2 whitespace-pre-wrap">{log.error_message || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ErrorSummary({ summary }) {
  if (!summary || Object.keys(summary).length === 0) return <p>No errors found.</p>;

  return (
    <div className="bg-white rounded shadow p-6 mt-6 max-w-6xl mx-auto">
      <h3 className="mb-4 text-xl font-semibold">Error Summary</h3>
      {Object.entries(summary).map(([user, errors]) => (
        <div key={user} className="mb-4">
          <p className="font-semibold mb-1">User: {user}</p>
          <ul className="list-disc list-inside">
            {Object.entries(errors).map(([msg, count]) => (
              <li key={msg}>
                {msg} — {count} time{count > 1 ? 's' : ''}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogsAndSummary() {
      try {
        const [logsRes, summaryRes] = await Promise.all([
          api.get('/logs'),
          api.get('/logs/summary'),
        ]);
        setLogs(logsRes.data.logs || []);
        setSummary(summaryRes.data.summary || {});
        setError(null);
      } catch {
        setError('Failed to load logs or summary');
      } finally {
        setLoading(false);
      }
    }
    fetchLogsAndSummary();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading logs...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6 max-w-6xl mx-auto">Transaction Logs</h1>
      <div className="max-w-6xl mx-auto overflow-auto">
        <LogTable logs={logs} />
      </div>
      <ErrorSummary summary={summary} />
    </div>
  );
}
