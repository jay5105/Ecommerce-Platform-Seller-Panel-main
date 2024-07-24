import React from 'react';
import { Button, Container, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '24px',
      }}
    >
      <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
          <img
            src="https://img.freepik.com/premium-vector/people-working-office_171965-2629.jpg"
            alt="Man with laptop"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '24px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="h3"
            style={{
              marginBottom: '16px',
              fontWeight: 'bold',
              color: '#007bff',
            }}
          >
            Welcome to Seller Portal
          </Typography>
          <Typography
            variant="h6"
            style={{
              marginBottom: '16px',
              color: '#666666',
            }}
          >
            Join us to start selling your products or login to manage your store.
          </Typography>
          <Typography
            variant="body1"
            style={{
              marginBottom: '24px',
              color: '#555555',
              lineHeight: '1.6',
            }}
          >
            Our platform offers an extensive range of tools and services designed to help you grow your business.
            Whether you're a seasoned seller or just starting out, we provide everything you need to succeed in the
            competitive online marketplace. Register today and take the first step towards expanding your business
            reach and increasing your sales.
          </Typography>
          <Box
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: '#007bff',
                color: '#ffffff',
              }}
              onClick={handleRegister}
            >
              Register for New Seller
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#6c757d',
                color: '#ffffff',
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Grid>
       
      </Grid>
    </Container>
  );
};

export default LandingPage;
