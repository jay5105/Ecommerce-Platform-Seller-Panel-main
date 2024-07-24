import React, { useState } from 'react';
import {
  Box, CssBaseline, Container, Stack, Typography, Card, CardContent, FormControl,
  FormLabel, TextField, OutlinedInput, InputAdornment, IconButton, Button, Grid, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePwd = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    setLoading(true);

    if (values.newPassword !== values.confirmPassword) {
      alert("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('Token');
    axios.post('http://localhost:5000/Seller/ChangePwd', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      }, {
        headers: {
          auth : token,
        },
      })
      .then((response) => {
        setLoading(false);
        if (response.data.status === 'Success') {
          alert('Password changed successfully');
          localStorage.removeItem('Token'); 
          navigate('/login');
        } else {
          alert('Error changing password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error changing password:', error);
        alert('Error changing password');
      });
  };

  return (
    <Box>
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container justifyContent="center" padding="50px 0px">
          <Grid item sm={8} xs={12}>
            <Card sx={{ boxShadow: '0px 0px 8px rgba(0,0,0,0.3)' }}>
              <CardContent sx={{ padding: '30px 20px' }}>
                <Typography variant="h5" component="div" fontWeight={700} textAlign="center" color="#012970">
                  Change Password
                </Typography>
                <form onSubmit={handleChangePassword}>
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: '#000', marginBottom: '8px' }}>Current Password</FormLabel>
                      <OutlinedInput
                        name="currentPassword"
                        value={values.currentPassword}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: '#000', marginBottom: '8px' }}>New Password</FormLabel>
                      <OutlinedInput
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        size="small"
                      />
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel sx={{ color: '#000', marginBottom: '8px' }}>Confirm New Password</FormLabel>
                      <OutlinedInput
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        size="small"
                      />
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{ textTransform: 'capitalize', fontSize: '16px', backgroundColor: '#0d6efd' }}>
                      Change Password
                    </Button>
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ChangePwd;
