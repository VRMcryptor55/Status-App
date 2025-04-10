import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { io } from 'socket.io-client';

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [histories, setHistories] = useState({});
  const [newService, setNewService] = useState('');
  const token = localStorage.getItem('token');
  const socket = io('http://localhost:5000');

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        data.forEach(service => fetchHistory(service._id));
      });

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

  const fetchHistory = async (serviceId) => {
    const res = await fetch(`http://localhost:5000/api/services/${serviceId}/history`);
    const data = await res.json();
    setHistories(prev => ({ ...prev, [serviceId]: data }));
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
  };

  const createService = async () => {
    if (!newService.trim()) return;
    await fetch(`http://localhost:5000/api/services`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newService })
    });
    setNewService('');
  };

  const deleteService = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* Create Service Input */}
      <div className="flex mb-6 gap-2">
        <input
          className="flex-1 border p-2 rounded"
          placeholder="New service name"
          value={newService}
          onChange={e => setNewService(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={createService}
        >
          Add Service
        </button>
      </div>

      {/* Service List */}
      {services.map(service => (
        <div key={service._id} className="mb-6 relative">
          <ServiceCard
            service={service}
            isAdmin={true}
            onStatusChange={updateStatus}
            history={histories[service._id] || []}
          />
          <button
            onClick={() => deleteService(service._id)}
            className="absolute top-4 right-4 text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
