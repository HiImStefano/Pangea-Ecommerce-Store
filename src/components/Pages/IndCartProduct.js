import React from 'react'
import {Icon} from 'react-icons-kit'
import {plus} from 'react-icons-kit/feather/plus'
import {minus} from 'react-icons-kit/feather/minus'
import {auth, fstore} from '../../Config/Config'


const IndCartProduct = ({cartProduct, ProductIncrease, ProductDecrease}) => {

  const handleProductIncrease=()=>{
    ProductIncrease(cartProduct);
  }  

  const handleProductDecrease=()=>{
    ProductDecrease(cartProduct)
  }

  const handleDelete=()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fstore.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
          console.log('Deleted');
        })
      }
    })
  }


  return (
    <div className='product'>
        <div className='product-img'>
            <img src={cartProduct.url} alt="product-img"/>
        </div>
        <div className='product-text title'>{cartProduct.name}</div>
        <div className='product-text description'>{cartProduct.descript}</div>
        <div className='product-text price'>$ {cartProduct.price}</div>
        <span>Quantity</span>
        <div className='product-text quantity-box'>
            <div className='action-btns minus' onClick={handleProductDecrease}>
                <Icon icon={minus} size={20}/>
            </div>
            <div>{cartProduct.Quantity}</div>
            <div className='action-btns plus' onClick={handleProductIncrease}>
                <Icon icon={plus} size={20}/>
            </div>
        </div>
        <div className='product-text cart-price'>$ {cartProduct.TotalPrice}</div>
        <div className='btn btn-dnger btn-md cart-btn' onClick={handleDelete}>Delete</div>
    </div>
  )
}

export default IndCartProduct
