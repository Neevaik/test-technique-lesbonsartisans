import * as React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

export default function DeleteProductModal({ open, onClose, product, token,operationSuccess }) {

    const handleConfirmDelete = async () => {

        try {
            const response = await fetch(`http://localhost:3001/products/delete/${product._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            const data = await response.json();
            console.log('Product deleted successfully:', data);
            onClose();
            {operationSuccess}
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };
    
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContent id="alert-dialog-description">
                    Are you sure you want to delete this product ?
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
