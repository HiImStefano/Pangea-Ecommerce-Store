import React,{useState, useEffect} from 'react'
import {auth, fstore} from '../../Config/Config'
import {useNavigate} from 'react-router-dom'
import Products from '../Products/Products';
import Navbar from '../Navbar/Navbar';
import Footer from '../Layout/Footer'

const Home = () => {
  const Nav = useNavigate();
  function GetUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
      auth.onAuthStateChanged(user=>{
        if(user){
          setUid(user.uid);
        }
      })
    },[])
    return uid;
  }

  const uid = GetUid();

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
  
  const [products, setProducts]=useState([]);

  const getProducts = async ()=>{
    const products = await fstore.collection('Products').get();
    const productsA = [];
    for(var snap of products.docs){
      var data = snap.data();
      data.ID=snap.id;
      productsA.push({
        ...data
      })
      if(productsA.length === products.docs.length){
        setProducts(productsA);
      }
    }
  }

  useEffect(()=>{
    getProducts();
  }, [])

  const [TotalPr, setTotalPr] = useState(0);

  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        fstore.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
          const Quantity = snapshot.docs.length;
          setTotalPr(Quantity);
        })
      }
    })
  })

  let Product;
  const addToCart = (product)=>{
    if(uid!==null){
        Product=product;
        Product['Quantity']=1;
        Product['TotalPrice']=Product.Quantity*Product.price;
        fstore.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
          console.log("Added to cart!");
        })
    }
    else{
      Nav("../login", {replace: true});
    }
  }


  return (
    <div>
        <Navbar user={user} TotalPr={TotalPr}/>
        <br></br>
        {products.length > 0 && (
          <div className='container-fluid'>
            <br></br>
            <br></br>
            <br></br>
            <center><h1 >Products</h1></center>
            <br></br>
            <Products products={products} addToCart={addToCart}/>
          </div>
        )}
        {products.length < 1 && (
          <div className='container-fluid'>No products</div>
        )}
    </div>
  )
}

export default Home