import React from 'react';

export default function LogTable({ logs }) {
  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="py-2 border-b border-gray-200">Timestamp</th>
          <th className="py-2 border-b border-gray-200">User ID</th>
          <th className="py-2 border-b border-gray-200">Endpoint</th>
          <th className="py-2 border-b border-gray-200">Method</th>
          <th className="py-2 border-b border-gray-200">Status</th>
          <th className="py-2 border-b border-gray-200">Error Message</th>
        </tr>
      </thead>
      <tbody>
        {logs.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-4">
              No Logs Found
            </td>
          </tr>
        )}
        {logs.map((log) => (
          <tr key={log.id} className="hover:bg-gray-100">
            <td className="py-2 border-b border-gray-200">{new Date(log.created_at).toLocaleString()}</td>
            <td className="py-2 border-b border-gray-200">{log.user_id || 'N/A'}</td>
            <td className="py-2 border-b border-gray-200">{log.endpoint}</td>
            <td className="py-2 border-b border-gray-200">{log.http_method}</td>
            <td className="py-2 border-b border-gray-200">{log.status_code}</td>
            <td className="py-2 border-b border-gray-200 truncate max-w-xs">{log.error_message || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
