//#region imports
import * as React from 'react';
import { TextField,Card, CardContent, Typography, CardActions, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Alert, Snackbar, Box } from '@mui/material';
//#endregion

export default function ProductCard({ product }) {

    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [updatedProduct, setUpdatedProduct] = React.useState({ ...product });


    const toggleDeleteDialog = () => {
        setDeleteOpen(!deleteOpen);
    };

    const toggleUpdateDialog = () => {
        setUpdatedProduct({ ...product });
        setUpdateOpen(!updateOpen);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleConfirmDelete = async () => {
        toggleDialog();

        try {
            const response = await fetch(`http://localhost:3001/products/delete/${product._id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            setAlertOpen(true);
            setTimeout(() => {
                setAlertOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const handleConfirmUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:3001/products/update/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }

            toggleUpdateDialog();
            setAlertOpen(true);
            setTimeout(() => {
                setAlertOpen(false);
            }, 3000);
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://images.pexels.com/photos/1662298/pexels-photo-1662298.jpeg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        type : {product.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        price : {product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        rating : {product.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        warranty : {product.warranty_years}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        available : {product.available ? 'Yes' : 'No'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={toggleUpdateDialog}>update</Button>
                    <Button size="small" onClick={toggleDeleteDialog}>delete</Button>
                </CardActions>

                <Dialog
                    open={deleteOpen}
                    onClose={toggleDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Deletion confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={toggleDeleteDialog}>Cancel</Button>
                        <Button onClick={handleConfirmDelete} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={updateOpen}
                    onClose={toggleUpdateDialog}
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
                            label="Warranty Years"
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
                        <Button onClick={toggleUpdateDialog}>Cancel</Button>
                        <Button onClick={handleConfirmUpdate} color="primary">
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>

            <Snackbar
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={3000}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '50%', fontSize: '1.5em', textAlign: 'center' }}>
                        The product has been deleted!
                    </Alert>
                </Box>
            </Snackbar>
        </>
    );
}
