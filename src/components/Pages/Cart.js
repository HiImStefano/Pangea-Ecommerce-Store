import React,{useState, useEffect} from 'react'
import {auth, fstore} from '../../Config/Config'
import Navbar from '../Navbar/Navbar';
import { CartProducts } from './CartProducts';


const Cart = () => {

    //Get User
    function GetUser(){
        const [user, setUser] = useState(null);
        useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user){
                fstore.collection('users').doc(user.uid).get().then(snapshot => {
                setUser(snapshot.data().FName);
            })
            }
            else{
                setUser(null);
            }
        })
        }, [])
        return user
    }
    const user = GetUser();

    //Create New Product
    const [cartProducts, setCartProducts]=useState([]);
    useEffect(()=> {
        auth.onAuthStateChanged(user=>{
            if(user){
                fstore.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id, 
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);
                })
            }
            else{
                console.log('User not signed in');
            }
        })
    }, [])
    console.log(cartProducts);

    //Achieving Total Value of Quantity
    const Quantity=cartProducts.map(cartProduct=>{
        return cartProduct.Quantity;
    })

    const SingleValQuantity = (accumulator, currentValue)=>accumulator+currentValue;

    const TotalQ = Quantity.reduce(SingleValQuantity,0);

    const price=cartProducts.map(cartProduct=>{
        return cartProduct.price;
    })

    //Achieving Total Value of Price
    const SingleValPrice = (accumulator, currentValue)=>accumulator+currentValue;

    const TotalP = price.reduce(SingleValPrice,0);

    let Product;

    //Product Increase Function
    const ProductIncrease=(cartProduct)=>{
        Product=cartProduct;
        Product.Quantity=Product.Quantity+1;
        Product.TotalPrice=Product.Quantity * Product.price;
        
        auth.onAuthStateChanged(user=>{
            if(user){
                fstore.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                    console.log('increment added');
                })
            }
            else{
                console.log('User Is not logged in');
            }
        })
    }

    //Product Decrease Function
    const ProductDecrease=(cartProduct)=>{
        Product=cartProduct;
        if(Product.Quantity > 1){
            Product.Quantity=Product.Quantity-1;
            Product.TotalPrice=Product.Quantity * Product.price;
        
            auth.onAuthStateChanged(user=>{
                if(user){
                    fstore.collection('Cart ' + user.uid).doc(cartProduct.ID).update(Product).then(()=>{
                        console.log('decrement added');
                    })
                }
                else{
                    console.log('User Is not logged in');
                }
            })
        }
    }

  return (
    <div>
        <Navbar user={user}/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {cartProducts.length > 0 && (
            <div className='container-fluid'>
                <h1 className='text-center'>Cart</h1>
                <div className='products-box'>
                    <CartProducts cartProducts={cartProducts} ProductIncrease={ProductIncrease} ProductDecrease={ProductDecrease}/>
                </div>
                <div className='summary-box'>
                <h5>Cart Summary</h5>
                <br></br>
                <div>
                    Total # of Products: <span>{TotalQ}</span>
                </div>
                <div>
                    Price: <span>$ {TotalP}</span>
                </div>
                <br></br>
                </div>
            </div>
        )}
        {cartProducts.length < 1 && (
            <div className='container-fluid'>
                <center><h1>No Products to Show</h1></center>
            </div>
        )}
    </div>
  )
}

export default Cart