import * as React from 'react';
import {
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

export default function UpdateProductModal({ open, onClose, product, token, operationSuccess }) {

    const [updatedProduct, setUpdatedProduct] = React.useState({ ...product });

    React.useEffect(() => {
        setUpdatedProduct({ ...product });
    }, [product]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleConfirmUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3001/products/update/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(updatedProduct),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            const data = await response.json();
            console.log('Product updated successfully:', data);
            onClose();
            {operationSuccess}
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };


    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Update Product</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={updatedProduct.name}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="type"
                    label="Type"
                    type="text"
                    fullWidth
                    value={updatedProduct.type}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    value={updatedProduct.price}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="rating"
                    label="Rating"
                    type="number"
                    fullWidth
                    value={updatedProduct.rating}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="warranty_years"
                    label="Warranty"
                    type="number"
                    fullWidth
                    value={updatedProduct.warranty_years}
                    onChange={handleInputChange}
                />
                <TextField
                    margin="dense"
                    name="available"
                    label="Available"
                    type="text"
                    fullWidth
                    value={updatedProduct.available}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirmUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
