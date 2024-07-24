import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
    storeDescription: '',
    gstNumber: '',
    addressStreet: '',
    addressCity: '',
    addressState: '',
    addressPostalCode: '',
    addressCountry: '',
    contactNumber: '',
  });

  const [brandLogo, setBrandLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setBrandLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const sellerData = new FormData();
    sellerData.append('name', formData.name);
    sellerData.append('email', formData.email);
    sellerData.append('password', formData.password);
    sellerData.append('storeName', formData.storeName);
    sellerData.append('storeDescription', formData.storeDescription);
    sellerData.append('gstNumber', formData.gstNumber);
    sellerData.append('address[street]', formData.addressStreet);
    sellerData.append('address[city]', formData.addressCity);
    sellerData.append('address[state]', formData.addressState);
    sellerData.append('address[postalCode]', formData.addressPostalCode);
    sellerData.append('address[country]', formData.addressCountry);
    sellerData.append('contactNumber', formData.contactNumber);
    if (brandLogo) {
      sellerData.append('brandLogo', brandLogo);
    }

    try {
      var response = await axios.post('http://localhost:5000/Seller/Signup', sellerData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      navigate('/verify');
    } catch (error) {
      console.error('Error registering seller:', error);
      toast.error(error.response?.data?.message || 'Error during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <ToastContainer />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          MintMart
        </Typography>
        <Typography component="h2" variant="h6" align="center" gutterBottom>
          Create Your Seller Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="storeName"
                label="Store Name"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="storeDescription"
                label="Store Description"
                name="storeDescription"
                value={formData.storeDescription}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="gstNumber"
                label="GST Number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressStreet"
                label="Street"
                name="addressStreet"
                value={formData.addressStreet}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressCity"
                label="City"
                name="addressCity"
                value={formData.addressCity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressState"
                label="State"
                name="addressState"
                value={formData.addressState}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressPostalCode"
                label="Postal Code"
                name="addressPostalCode"
                value={formData.addressPostalCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="addressCountry"
                label="Country"
                name="addressCountry"
                value={formData.addressCountry}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="contactNumber"
                label="Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                id="brandLogo"
                name="brandLogo"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="brandLogo">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                  fullWidth
                >
                  Upload Brand Logo
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              {loading ? (
                <div className="flex justify-center">
                  <CircularProgress />
                </div>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        <Typography align="center" variant="body2" color="textSecondary" paragraph>
          Already have an account?{' '}
          <Link to="/signin" style={{ color: '#1976d2' }}>
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Signup;
