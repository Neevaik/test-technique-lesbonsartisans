//#region imports
import * as React from 'react';
import {
    Container,
    Grid,
    AppBar,
    Toolbar,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AddProductModal from '../component/modals/addProduct';
import ProductCard from '../component/productCard';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
//#endregion

const socket = io('http://localhost:3002');

export default function Home() {
    const [products, setProducts] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const user = useSelector((state) => state.users.value);
    const router = useRouter();

    React.useEffect(() => {
        fetchProducts();
        checkTokenExpiration();
        setupSocketListeners();
    }, []);

    const checkTokenExpiration = () => {
        if (!user.token) {
            router.push('/');
            return;
        }

        try {
            const decoded = jwtDecode(user.token);
            const expirationTime = decoded.exp * 1000;
            const currentTime = Date.now();

            if (currentTime > expirationTime) {
                router.push('/');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
            router.push('/');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:3001/products/all');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.allProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleModalToggle = () => {
        setOpenModal(!openModal);
    };

    const setupSocketListeners = () => {
        socket.on('productAdded', (newProduct) => {
            console.log('Product added:', newProduct);
        
            const productExists = products.some(product => product._id === newProduct._id);
        
            if (!productExists) {
                setProducts(prevProducts => [...prevProducts, newProduct]);
            }
        });

        socket.on('productUpdated', (updatedProduct) => {
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product._id === updatedProduct._id ? updatedProduct : product
                )
            );
        });

        socket.on('productDeleted', (deletedProduct) => {
            setProducts(prevProducts =>
                prevProducts.filter(product =>
                    product._id !== deletedProduct._id
                )
            );
        });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AppBar
                position="static"
                style={{ backgroundColor: 'transparent', boxShadow: 'none', width: '100%', maxWidth: '800px' }}
            >
                <Toolbar style={{ justifyContent: 'space-between', paddingLeft: '16px', width: '100%' }}>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        color="primary"
                        onClick={handleModalToggle}
                    >
                        Add New Product
                    </Button>
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: '20px', width: '100%', maxWidth: '800px' }}>
                <Grid container spacing={2}>
                    {products.map((product) => (
                        <Grid item key={product._id} xs={12} sm={6} md={4}>
                            <ProductCard product={product} user={user} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <AddProductModal open={openModal} onClose={handleModalToggle} user={user} />
        </div>
    );
}
