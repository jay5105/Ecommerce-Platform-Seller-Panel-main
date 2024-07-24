import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Select, FormControl, InputLabel, Alert, Snackbar, Grid, IconButton } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    category: '',
    subcategory: '',
    features: [''],
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Seller/AllCategory');
        setCategories(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (formData.category) {
      const fetchSubcategories = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/Seller/AllSubCategory/${formData.category}`);
          setSubcategories(response.data.subcategories);
        } catch (error) {
          console.error('Error fetching subcategories', error);
        }
      };

      fetchSubcategories();
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 10) {
      setErrorMessage('You can upload a maximum of 10 images.');
      return;
    }

    setErrorMessage('');
    const updatedImages = [...formData.images, ...files];
    setFormData({ ...formData, images: updatedImages });

    const previews = updatedImages.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleFeatureChange = (index, e) => {
    const features = [...formData.features];
    features[index] = e.target.value;
    setFormData({ ...formData, features });
  };

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const handleImageDelete = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (key === 'images') {
        formData[key].forEach(image => data.append('images', image));
      } else if (key === 'features') {
        formData[key].forEach(feature => data.append('features', feature));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem('Token');
      const response = await axios.post('http://localhost:5000/Seller/AddProduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          auth: token,
        },
      });
      console.log(response.data);
      setSuccessMessage('Product added successfully');
      setFormData({
        name: '',
        price: '',
        quantity: '',
        description: '',
        category: '',
        subcategory: '',
        features: [''],
        images: [],
      });
      setImagePreviews([]);
    } catch (error) {
      console.error('Error adding product', error);
      setErrorMessage('Error adding product');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Product
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            type="number"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
      </Grid>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Category</InputLabel>
        <Select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          {Array.isArray(categories) && categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required disabled={!formData.category}>
        <InputLabel>Subcategory</InputLabel>
        <Select
          label="Subcategory"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
        >
          {Array.isArray(subcategories) && subcategories.map((subcategory) => (
            <MenuItem key={subcategory._id} value={subcategory._id}>
              {subcategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {formData.features.map((feature, index) => (
        <TextField
          key={index}
          label={`Feature ${index + 1}`}
          value={feature}
          onChange={(e) => handleFeatureChange(index, e)}
          fullWidth
          margin="normal"
        />
      ))}
      <Button variant="contained" onClick={addFeatureField} fullWidth sx={{ mb: 2 }}>
        Add Feature
      </Button>
      <Button variant="contained" component="label" fullWidth margin="normal">
        Upload Images
        <input type="file" name="images" onChange={handleImageChange} hidden multiple />
      </Button>
      {errorMessage && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
        {imagePreviews.map((src, index) => (
          <Box key={index} sx={{ position: 'relative', width: '100px', height: '100px' }}>
            <img src={src} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <IconButton
              sx={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => handleImageDelete(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Add Product
      </Button>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />
    </Box>
  );
}

export default AddProduct;
