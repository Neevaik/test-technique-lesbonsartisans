import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddProductModal = ({ open, onClose, onSubmit }) => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productRating, setProductRating] = useState('');
  const [productWarranty, setProductWarranty] = useState('');
  const [productAvailable, setProductAvailable] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create product object
    const newProduct = {
      name: productName,
      type: productType,
      price: productPrice,
      rating: productRating,
      warranty_years: productWarranty,
      available: productAvailable,
    };
    // Call onSubmit function passed from parent component
    onSubmit(newProduct);
    // Reset form fields
    setProductName('');
    setProductType('');
    setProductPrice('');
    setProductRating('');
    setProductWarranty('');
    setProductAvailable('');
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-product-modal"
      aria-describedby="modal-for-adding-new-product"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Product Type"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Product Rating"
            value={productRating}
            onChange={(e) => setProductRating(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            label="Product Warranty Years"
            value={productWarranty}
            onChange={(e) => setProductWarranty(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            fullWidth
            select
            label="Product Availability"
            value={productAvailable}
            onChange={(e) => setProductAvailable(e.target.value)}
            SelectProps={{ native: true }}
            margin="normal"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </TextField>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Product
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
