import { Card, CardContent, Typography } from '@mui/material';

const ProductCard = ({ product }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2">
                    Type: {product.type}
                </Typography>
                <Typography variant="body2">
                    Price: {product.price}
                </Typography>
                <Typography variant="body2">
                    Rating: {product.rating}
                </Typography>
                <Typography variant="body2">
                    Warranty Years: {product.warranty_years}
                </Typography>
                <Typography variant="body2">
                    Available: {product.available ? 'Yes' : 'No'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
