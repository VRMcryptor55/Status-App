import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', role: 'customer' });
  const navigate = useNavigate();

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert('Registered successfully. Please login.');
      navigate('/login');
    } else {
      const data = await res.json();
      alert(data.msg || 'Registration failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded"
    >
      <h2 className="text-xl mb-4 font-bold">Register</h2>
      <input
        className="w-full mb-3 p-2 border rounded"
        placeholder="Email"
        type="email"
        required
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full mb-3 p-2 border rounded"
        type="password"
        placeholder="Password"
        required
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <select
        className="w-full mb-3 p-2 border rounded"
        value={form.role}
        onChange={e => setForm({ ...form, role: e.target.value })}
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
        Register
      </button>
    </form>
  );
};

export default Register;
