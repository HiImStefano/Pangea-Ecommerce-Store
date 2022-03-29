import React from 'react'
import IndCartProduct from './IndCartProduct'


export const CartProducts = ({cartProducts, ProductIncrease, ProductDecrease}) => {
    return( 
        cartProducts.map((cartProduct)=>(
        <IndCartProduct key={cartProduct.ID} cartProduct={cartProduct}
            ProductIncrease={ProductIncrease} ProductDecrease={ProductDecrease}/>
    ))
    )
}
