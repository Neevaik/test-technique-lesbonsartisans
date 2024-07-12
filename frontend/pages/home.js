import React, { useEffect, useState } from 'react';
import ProductCard from '../component/productCard';
import {
    Container,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Button,
    Modal,
    Box,
    TextField,
    Typography,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        type: '',
        price: '',
        rating: '',
        warranty_years: '',
        available: '',
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data.allProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            const data = await response.json();
            console.log('Product added successfully:', data);
            setOpenModal(false);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AppBar
                position="static"
                style={{ backgroundColor: 'transparent', boxShadow: 'none', width: '100%', maxWidth: '800px' }}
            >
                <Toolbar style={{ justifyContent: 'space-between', paddingLeft: '16px', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton style={{ padding: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search..."
                            inputProps={{ 'aria-label': 'search' }}
                            style={{ marginLeft: '8px' }}
                        />
                    </div>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        color="primary"
                        onClick={handleOpenModal}
                    >
                        Add New Product
                    </Button>
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="add-new-product-modal-title"
                aria-describedby="add-new-product-modal-description"
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
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
                    <Typography id="add-new-product-modal-title" variant="h6" component="h2" gutterBottom>
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
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Available"
                                name="available"
                                value={newProduct.available}
                                onChange={handleChange}
                            />
                        </CardContent>
                        <CardActions>
                            <Button onClick={handleCloseModal}>Cancel</Button>
                            <Button onClick={handleAddProduct} color="primary">
                                Confirm
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </div>
    );
}
