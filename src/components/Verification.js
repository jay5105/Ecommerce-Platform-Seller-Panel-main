import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Verification = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/Seller/VerifyOTP', formData);
      if (response.data.status === 'Success') {
        toast.success('OTP verified successfully and confirmation email sent');
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred while verifying the OTP.');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer position="top-right" autoClose={5000} />
      <Box sx={{ mt: 5, p: 3, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Verify OTP
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            required
            margin="normal"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="OTP"
            name="otp"
            fullWidth
            required
            margin="normal"
            value={formData.otp}
            onChange={handleChange}
          />
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Verify'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Verification;
