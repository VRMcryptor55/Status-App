import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ServiceCard from '../components/ServiceCard';

const CustomerDashboard = () => {
  const [services, setServices] = useState([]);
  const [histories, setHistories] = useState({});
  const socket = io('http://localhost:5000'); // Connect to WebSocket server

  useEffect(() => {
    // Fetch services on load
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        data.forEach(service => fetchHistory(service._id));
      });

    // Listen for real-time status updates
    socket.on('statusUpdate', (data) => {
      if (data.deleted) {
        setServices(prev => prev.filter(s => s._id !== data.id));
        return;
      }
      fetchHistory(data._id);
      setServices(prev => {
        const index = prev.findIndex(s => s._id === data._id);
        return index >= 0
          ? [...prev.slice(0, index), data, ...prev.slice(index + 1)]
          : [...prev, data];
      });
    });
  }, []);

  const fetchHistory = async (id) => {
    const res = await fetch(`http://localhost:5000/api/services/${id}/history`);
    const data = await res.json();
    setHistories(prev => ({ ...prev, [id]: data }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Service Status</h2>
      {services.map(service => (
        <ServiceCard
          key={service._id}
          service={service}
          isAdmin={false}
          history={histories[service._id] || []}
        />
      ))}
    </div>
  );
};

export default CustomerDashboard;
