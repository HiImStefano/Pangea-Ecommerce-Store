import React from 'react'
import {Routes, Route} from "react-router-dom";

import Home from "./components/Pages/Home";
import Signup from "./components/Pages/Signup";
import Login from "./components/Pages/Login";
import Cart from "./components/Pages/Cart";
import ProductAdder from './components/Pages/ProductAdder';
import EmployeeAdder from './components/Pages/EmployeeAdder';
const App = () => {
  return(
      <Routes>
        <Route path="/" element= {<Home />}></Route>
        <Route path="/signup" element= {<Signup />}></Route>
        <Route path="/login" element= {<Login />}></Route>
        <Route path = "/AddProd" element= {<ProductAdder />}></Route>
        <Route path = "/cart" element= {<Cart />}></Route>
        <Route path = "/AddEmpl" element= {<EmployeeAdder />}></Route>
      </Routes>
  )
}

export default App

/*
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const {Prod_data} = await commerce.products.list();

    setProducts(Prod_data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(Products);

  return (
    <div>
        <Navbar />
        <Products />
    </div>
  )
  import {commerce} from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
*/
