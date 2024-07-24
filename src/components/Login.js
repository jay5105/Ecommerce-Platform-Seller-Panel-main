import React, { useState } from 'react';
import {
    Box, CssBaseline, Container, Stack, Typography, Card, CardContent, FormControl,
    FormLabel, TextField, OutlinedInput, InputAdornment, IconButton, Checkbox,
    Button, Grid, CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
            .post("http://localhost:5000/Seller/LoginSeller", values)
            .then((response) => {
                setLoading(false);
                // handle success
                console.log(response);
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("Name", response.data.sellerData.name);
                navigate("/seller");
            })
            .catch((error) => {
                setLoading(false);
                // handle error
                console.log(error);
            });
    };

    return (
        <Box>
            <CssBaseline />
            <Container maxWidth="sm">
                <Grid container justifyContent="center" padding="50px 0px">
                    <Grid item sm={8} xs={12}>
                        <Card sx={{ boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" }}>
                            <CardContent sx={{ padding: "30px 20px" }}>
                                <Typography variant="h5" component="div" fontWeight={700} textAlign="center" color="#012970">
                                    Seller Login 
                                </Typography>
                                <Typography variant="body2" textAlign="center" marginBottom="22px">
                                    Enter your username & password to login
                                </Typography>
                                <form onSubmit={handleLogin}>
                                    <Stack spacing={2}>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Username</FormLabel>
                                            <TextField
                                                type='text'
                                                size='small'
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <FormLabel sx={{ color: "#000", marginBottom: "8px" }}>Password</FormLabel>
                                            <OutlinedInput
                                                name="password"
                                                value={values.password}
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
                                                size='small'
                                            />
                                        </FormControl>
                                        <Stack direction="row" alignItems="center">
                                            <Checkbox disableRipple />
                                            <Typography>
                                                Remember me
                                            </Typography>
                                        </Stack>
                                        <Button type="submit" variant="contained" sx={{ textTransform: "capitalize", fontSize: "16px", backgroundColor: "#0d6efd" }}>
                                            Login
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
}

export default Login;
