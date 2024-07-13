//#region imports
import * as React from 'react';
import {
    Container,
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from 'react-redux';
import AddProductModal from '../component/modals/addProduct';
import ProductCard from '../component/productCard';

//#endregion


export default function Home() {
    const [products, setProducts] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const user = useSelector((state) => state.users.value);

    React.useEffect(() => {
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

        fetchProducts();
    }, []);

    const handleModalToggle = () => {
        setOpenModal(!openModal);
    };


    console.log(user)
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
                            <ProductCard product={product} user={user}/>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <AddProductModal open={openModal} onClose={handleModalToggle} user={user}/>
        </div>
    );
}
