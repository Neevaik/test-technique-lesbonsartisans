import { useEffect, useState } from 'react';
import ProductCard from '../component/productCard';
import { Container, Grid } from '@mui/material';

export default function Home() {
    
    const [products, setProducts] = useState([]);
    console.log({products})
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

    return (
        <Container>
            <Grid container spacing={2}>
                {products.map(product => (
                    <Grid item key={product._id} xs={12} sm={6} md={4}>
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
