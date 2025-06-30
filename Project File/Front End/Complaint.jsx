import axios from 'axios';
import React, { useState } from 'react';
import api from '../../api';
import { useNavigate, Link } from 'react-router-dom';

const Complaint = () => {
  const [userComplaint, setUserComplaint] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: '',
    comment: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserComplaint({ ...userComplaint, [name]: value });
  };

  const handleClear = () => {
    setUserComplaint({
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user || !token) return alert('You must be logged in!');
    const complaintToSend = { ...userComplaint, userId: user._id };
    console.log('Submitting complaint:', complaintToSend);
    try {
      const res = await api.post('/api/complaints', complaintToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Your Complaint has been sent!');
      console.log('Complaint submitted:', res.data);
      handleClear();
      navigate('/Status');
    } catch (err) {
      console.error('Complaint error:', err);
      if (err.response?.data?.error) {
        alert('Something went wrong: ' + err.response.data.error);
      } else {
        alert('Something went wrong!!');
      }
    }
  };

  return (
    <div className="text-white complaint-box">
      <form onSubmit={handleSubmit} className="compliant-form row bg-dark">
        <div className="col-md-6 p-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" id="name" required />
        </div>

        <div className="col-md-6 p-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" id="address" required />
        </div>

        <div className="col-md-6 p-3">
          <label htmlFor="city" className="form-label">City</label>
          <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" id="city" required />
        </div>

        <div className="col-md-6 p-3">
          <label htmlFor="state" className="form-label">State</label>
          <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" id="state" required />
        </div>

        <div className="col-md-6 p-3">
          <label htmlFor="pincode" className="form-label">Pincode</label>
          <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="text" className="form-control" id="pincode" required />
        </div>

        <div className="col-md-6 p-3">
          <label htmlFor="status" className="form-label">Status</label>
          <input placeholder="type pending" name="status" onChange={handleChange} value={userComplaint.status} type="text" className="form-control" id="status" required />
        </div>

        <label className="p-3 form-label text-light" htmlFor="comment">Description</label>
        <div className="form-floating mb-3">
          <textarea name="comment" onChange={handleChange} value={userComplaint.comment} className="form-control" required></textarea>
        </div>

        <div className="text-center p-1 col-12">
          <button type="submit" className="mt-2 btn btn-success">Register</button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p>To view your complaint status, please go to the <b>Status</b> page.</p>
        <Link to="/Status" className="btn btn-outline-info">Go to Status</Link>
      </div>
    </div>
  );
};

export default Complaint;
