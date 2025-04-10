import React from 'react';

const statusOptions = [
  'Operational',
  'Degraded Performance',
  'Partial Outage',
  'Major Outage'
];

const ServiceCard = ({ service, isAdmin, onStatusChange, history = [] }) => {
  return (
    <div className="bg-white border shadow p-4 mb-4 rounded">
      <h3 className="font-semibold text-lg">{service.name}</h3>
      <p>Status: <strong>{service.status}</strong></p>

      {isAdmin && (
        <div className="mt-2 space-y-1">
          {statusOptions.map(status => (
            <label key={status} className="block">
              <input
                type="checkbox"
                checked={service.status === status}
                onChange={() => onStatusChange(service._id, status)}
                className="mr-2"
              />
              {status}
            </label>
          ))}
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-sm text-gray-700">Status History:</h4>
          <ul className="text-sm text-gray-600 mt-1 space-y-1">
            {history.map((entry, index) => (
              <li key={index}>
                <span className="font-medium">{entry.status}</span> by <span>{entry.changedBy?.email || 'Unknown'}</span> on{' '}
                <span>{new Date(entry.changedAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
