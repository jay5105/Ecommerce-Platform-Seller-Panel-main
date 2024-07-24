import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Grid, Stack, IconButton, Paper, ButtonBase, CircularProgress } from '@mui/material';
import { BsThreeDots, BsCurrencyDollar, BsPeople } from 'react-icons/bs';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { useNavigate } from 'react-router-dom';

dayjs.extend(isoWeek);

function Home() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setError('Authorization token not provided');
          setLoading(false);
          return;
        }

        const [ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/Seller/countSellerOrders', { headers: { 'auth': token } }),
          axios.get('http://localhost:5000/Seller/countSellerProducts', { headers: { 'auth': token } })
        ]);

        setData({
          orders: ordersRes.data.data,
          products: productsRes.data.data,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <Box >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  const { orders, products } = data;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <ButtonBase onClick={() => navigate('/seller/Order')} sx={{ width: '100%' }}>
                <Paper sx={{ padding: '20px', width: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                    <Box display="flex" alignItems="center">
                      <Typography variant="h6" gutterBottom color="#000">Total Order</Typography>
                    </Box>
                    <IconButton size='small'><BsThreeDots /></IconButton>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                    <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                      <BsCurrencyDollar color='#4154f1' size={35} />
                    </Box>
                    <Box>
                      <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                        {orders}
                      </Typography>
                      <Typography variant="overline" sx={{ textTransform: "lowercase", fontSize: "15px" }} display="flex" alignItems="center" marginBottom="0" gap={1} gutterBottom>
                        <Typography color="rgb(25,135,84)" sx={{ fontWeight: 600 }}>12%</Typography>
                        increase
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </ButtonBase>
            </Grid>
            <Grid item sm={6} xs={12}>
              <ButtonBase onClick={() => navigate('/seller/Product')} sx={{ width: '100%' }}>
                <Paper sx={{ padding: '20px', width: '100%' }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" marginBottom="15px">
                    <Box display="flex" alignItems="center">
                      <Typography variant="h6" gutterBottom color="#000">Total Product</Typography>
                    </Box>
                    <IconButton size='small'><BsThreeDots /></IconButton>
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center" marginBottom="5px">
                    <Box padding="15px" backgroundColor="#f6f9ff" borderRadius="50%" lineHeight="0">
                      <BsPeople color='#4154f1' size={35} />
                    </Box>
                    <Box>
                      <Typography variant="h5" gutterBottom marginBottom="0px" fontSize="28px" fontWeight="600">
                        {products}
                      </Typography>
                      <Typography variant="overline" sx={{ textTransform: "lowercase", fontSize: "15px" }} display="flex" alignItems="center" marginBottom="0" gap={1} gutterBottom>
                        <Typography color="rgb(25,135,84)" sx={{ fontWeight: 600 }}>12%</Typography>
                        increase
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
