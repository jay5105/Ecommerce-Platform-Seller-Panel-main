import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditProduct from './EditProduct';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('Token');
        if (!token) {
          setError('Authorization token not provided');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/Seller/AllProduct', {
          headers: { 'auth': token }
        });

        if (response.data.status === 'Success') {
          setProducts(response.data.data);
        } else {
          setError('Failed to fetch products: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('Token');
        const response = await axios.delete(`http://localhost:5000/Seller/DeleteProduct/${productId}`, {
          headers: { 'auth': token }
        });

        if (response.data.status === 'Success') {
          const updatedProducts = products.filter(product => product._id !== productId);
          setProducts(updatedProducts);
        } else {
          setError('Failed to delete product: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while deleting product');
      }
    }
  };

  const handleCloseEdit = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Container>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={`http://localhost:5000/images/${product.image[0]}`}
                      alt={product.name}
                      height="50"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity > 0 ? product.quantity  : <p style={{fontWeight:'bold',color:'red'}}>Out of Stock</p>}</TableCell>
                  <TableCell>
                    {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(product._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={Boolean(selectedProduct)} onClose={handleCloseEdit}>
        {selectedProduct && (
          <EditProduct
            product={selectedProduct}
            onClose={handleCloseEdit}
            onSave={(updatedProduct) => {
              const updatedProducts = products.map(product =>
                product._id === updatedProduct._id ? updatedProduct : product
              );
              setProducts(updatedProducts);
              setSelectedProduct(null);
            }}
          />
        )}
      </Dialog>
    </Container>
  );
}

export default Product;
