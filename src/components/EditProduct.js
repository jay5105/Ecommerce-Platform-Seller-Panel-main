import React, { useState } from 'react';
import { DialogContent, DialogActions, Button, TextField, IconButton, Grid, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';

function EditProduct({ product, onClose, onSave }) {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleDeleteImage = (index) => {
    const updatedImages = editedProduct.image.filter((_, i) => i !== index);
    setEditedProduct({ ...editedProduct, image: updatedImages });
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:5000/Seller/UploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'auth': localStorage.getItem('Token')
          }
        });

        if (response.data.status === 'Success') {
          const newImageName = response.data.imageName;
          setEditedProduct((prevProduct) => ({
            ...prevProduct,
            image: [...prevProduct.image, newImageName]
          }));
        } else {
          setError('Failed to upload image: ' + response.data.message);
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while uploading image');
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('Token');
      const response = await axios.patch(`http://localhost:5000/Seller/UpdateProduct/${product._id}`, editedProduct, {
        headers: { 'auth': token }
      });

      if (response.data.status === 'Success') {
        onSave(editedProduct);
      } else {
        setError('Failed to update product: ' + response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating product');
    }
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = editedProduct.features.map((feature, i) => (i === index ? value : feature));
    setEditedProduct({ ...editedProduct, features: updatedFeatures });
  };
  const size= '80vw';
  return (
    <div>
      <DialogContent style={{ width: {size}, padding: '20px' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          label="Name"
          name="name"
          value={editedProduct.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={editedProduct.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={editedProduct.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={editedProduct.description}
          onChange={handleChange}
          fullWidth
          multiline
          margin="normal"
        />
        <Box>
          <Typography variant="h6" component="h2">
            Features
          </Typography>
          {editedProduct.features.map((feature, index) => (
            <TextField
              key={index}
              label={`Feature ${index + 1}`}
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              fullWidth
              margin="normal"
            />
          ))}
        </Box>
        <Grid container spacing={2}>
          {editedProduct.image.map((img, index) => (
            <Grid item key={index} xs={6} sm={4} md={3}>
              <div style={{ position: 'relative' }}>
                <img src={`http://localhost:5000/images/${img}`} alt={`product ${index}`} style={{ width: '100%' }} />
                <IconButton
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  onClick={() => handleDeleteImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Grid>
          ))}
          <Grid item xs={6} sm={4} md={3}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={handleAddImage}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <AddPhotoAlternateIcon style={{ fontSize: '3rem' }} />
              </IconButton>
            </label>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </DialogActions>
    </div>
  );
}

export default EditProduct;
