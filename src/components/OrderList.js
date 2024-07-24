import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, CircularProgress } from '@mui/material';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setError('Authorization token not provided');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/Seller/getSellerProductsAndOrders', {
          headers: {
            'auth': token
          }
        });

        if (response.data.status === 'Success') {
          setOrders(response.data.data);
        } else {
          setError('Failed to fetch orders: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.patch('http://localhost:5000/Seller/UpdateStatus', {
        orderId,
        newStatus,
      }, {
        headers: {
          'auth': token
        }
      });

      if (response.data.status === 'Success') {
        // Update the status locally
        const updatedOrders = orders.map(order => {
          if (order.orderId === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        setOrders(updatedOrders);
      } else {
        setError('Failed to update order status: ' + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating order status');
    }
  };

  if (loading) {
    return (
      <Box>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Order List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Order Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.product.name}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>
                    {order.user.addresses.map((address, index) => (
                      <div key={index}>
                        {address.street}, {address.city}, {address.state}, {address.pinCode}, {address.country}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default OrderList;
