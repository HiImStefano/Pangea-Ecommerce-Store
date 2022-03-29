import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons'

import useStyle from './style';

const Product = ({product, addToCart}) => {
  const classes = useStyle();
  const handleAddToCart = () => {
    addToCart(product);
}
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.url} title={product.name} />
        <CardContent>
            <div className={classes.CardContent}>
                <Typography variant="h5" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5">
                  ${product.price}
                </Typography>
            </div>
            <Typography variant="h5" color="textSecondary">
              {product.descript}
            </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton aria-label="Add to Cart" onClick={handleAddToCart}>
            <AddShoppingCart />
          </IconButton>
        </CardActions>
    </Card>
  );
}

export default Product