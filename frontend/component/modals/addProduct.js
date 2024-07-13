//#region imports
import * as React from 'react';
import {
  Modal,
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Switch
} from '@mui/material';
//#endregion


export default function AddProductModal({ open, onClose, user }) {
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'available') {
      setNewProduct({ ...newProduct, [name]: e.target.checked });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:3001/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      const data = await response.json();
      console.log('Product added:', data);
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-new-product-modal-title"
      aria-describedby="add-new-product-modal-description"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          minWidth: '300px',
          maxWidth: '80%',
        }}
      >
        <Typography
          id="add-new-product-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Add New Product
        </Typography>
        <Card>
          <CardContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Type"
              name="type"
              value={newProduct.type}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Rating"
              name="rating"
              type="number"
              value={newProduct.rating}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Warranty"
              name="warranty_years"
              type="number"
              value={newProduct.warranty_years}
              onChange={handleChange}
            />
            {/* Switch component for Available */}
            <Typography component="div" variant="body1" gutterBottom>
              Available
              <Switch
                checked={newProduct.available}
                onChange={handleChange}
                name="available"
                inputProps={{ 'aria-label': 'toggle available' }}
              />
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleAddProduct} color="primary">
              Confirm
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
