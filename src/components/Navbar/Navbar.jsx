import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Button, Typography} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import logo from '../../assests/Pangea.JPG';
import Styles from './style';
import {auth} from '../../Config/Config'
import { useNavigate } from 'react-router-dom';

const Navbar = ({user, TotalPr}) => {
    const classes = Styles();
    const Nav = useNavigate();

    const LoggingOut=()=>{
        auth.signOut().then(()=> {
            Nav("../login", {replace: true});
        })
    }

  return (
    <div>
        <AppBar position="fixed" className={classes.appBar} color="inherit">
            <Toolbar>
                {!user&&<>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Pangea_logo" height="25px" className={classes.image} />
                    Pangea
                </Typography>
                </>}
                {user&&<>
                <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                    <img src={logo} alt="Pangea_logo" height="25px" className={classes.image} />
                    Welcome {user}
                </Typography>
                </>}
                <div className={classes.grow}/>
                <Button variant="text" className={classes.button} color="inherit">
                    About Us
                </Button>
                {!user&&<>
                <Button component={Link} to="signup" variant="text" className={classes.button} color="inherit">
                    Sign up
                </Button>
                <Button component={Link} to="login" variant="text" className={classes.button} color="inherit">
                    Login
                </Button>
                </>}
                {user&&<>
                <Button onClick={LoggingOut} variant="text" className={classes.button} color="inherit">
                    Logout  
                </Button>
                <Button component={Link} to="AddProd" variant="text" className={classes.button} color="inherit">
                    Add Product
                </Button>
                <Button component={Link} to="AddEmpl" variant="text" className={classes.button} color="inherit">
                    Add Employee
                </Button>
                <div className={classes.button}>
                    <IconButton aria-label="Show cart items" component={Link} to="cart" color="inherit">
                        <Badge badgeContent={TotalPr} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </div>
                </>}
            </Toolbar>
        </AppBar>
    </div>
  )
}

export default Navbar