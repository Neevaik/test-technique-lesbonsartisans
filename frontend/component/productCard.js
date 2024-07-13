//#region imports
import * as React from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardActions, CardMedia,
    Button,
    Alert,
    Snackbar,
} from '@mui/material';
import DeleteProductModal from './modals/deleteProduct';
import UpdateProductModal from './modals/updateProduct';
//#endregion

export default function ProductCard({ product, user }) {

    const [deleteOpen, setDeleteOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);


    const toggleDeleteDialog = () => {
        setDeleteOpen(!deleteOpen);
    };

    const toggleUpdateDialog = () => {
        setUpdateOpen(!updateOpen);
    };

    const handleOperationSuccess = () => {
        setAlertOpen(true);
        setTimeout(() => {
            setAlertOpen(false);
        }, 3000);
    };

    return (
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

            <UpdateProductModal
                open={updateOpen}
                onClose={toggleUpdateDialog}
                product={product}
                token={user.token}
                onUpdateSuccess={handleOperationSuccess}
            />

            <DeleteProductModal
                open={deleteOpen}
                onClose={toggleDeleteDialog}
                product={product}
                token={user.token}
                operationSuccess={handleOperationSuccess}
            />

            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={() => setAlertOpen(false)}
            >
                <Alert onClose={() => setAlertOpen(false)} severity="success" sx={{ width: '80%' }}>
                    Operation successful
                </Alert>
            </Snackbar>

        </Card>

    );
}
