import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaFlag, FaLocationArrow, FaMapPin, FaStore, FaIdBadge, FaInfoCircle } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const SellerData = () => {
  const navigate = useNavigate();
  const [sellerInfo, setSellerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('Token');

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Seller/SellerData', {
          headers: {
            'auth': token,
          },
        });
        if (response.data.status === 'Success') {
          setSellerInfo(response.data.data);
        } else {
          throw new Error('Token is not valid');
        }
      } catch (error) {
        console.error('Error fetching seller data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchSellerData();
  }, [token, navigate]);

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Seller Profile
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        sellerInfo ? (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                 src={`http://localhost:5000/images/${sellerInfo.brandLogo}`}
                alt="Profile"
                style={{ borderRadius: '50%', height: '128px', width: '128px', objectFit: 'cover', marginBottom: '24px', objectPosition: 'center' }}
              />
              <Typography variant="h5" align="center" gutterBottom>
                Personal Data
              </Typography>
              <hr />
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaUser style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px' }}>
                      <Typography variant="subtitle1">Name</Typography>
                      <Typography>{sellerInfo.name}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaEnvelope style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">Email</Typography>
                      <Typography>{sellerInfo.email}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaStore style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">Store Name</Typography>
                      <Typography>{sellerInfo.storeName}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaInfoCircle style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">Store Description</Typography>
                      <Typography>{sellerInfo.storeDescription}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaIdBadge style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">GST Number</Typography>
                      <Typography>{sellerInfo.gstNumber}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaPhone style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">Contact Number</Typography>
                      <Typography>{sellerInfo.contactNumber}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4 }}>
                Address
              </Typography>
              <hr />
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaMapMarkerAlt style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">Street</Typography>
                      <Typography>{sellerInfo.address.street}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaCity style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">City</Typography>
                      <Typography>{sellerInfo.address.city}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaLocationArrow style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">State</Typography>
                      <Typography>{sellerInfo.address.state}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaMapPin style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">Postal Code</Typography>
                      <Typography>{sellerInfo.address.postalCode}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" alignItems="start">
                    <FaFlag style={{ color: 'gray', marginTop: '8px', marginRight: '8px' }} />
                    <Box sx={{ margin: '0px 4px', textAlign: 'left' }}>
                      <Typography variant="subtitle1">Country</Typography>
                      <Typography>{sellerInfo.address.country}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" sx={{ mt: 3 }} component={Link} to="/seller/change-password">
                Change Password
              </Button>
            </Box>
          </Paper>
        ) : (
          <Typography align="center" color="textSecondary">
            No seller data available
          </Typography>
        )
      )}
    </Box>
  );
}

export default SellerData;
