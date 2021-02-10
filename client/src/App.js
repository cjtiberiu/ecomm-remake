import React, { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages

//import HomePage from './pages/HomePage';
//import ShopPage from './pages/ShopPage';
//import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
//import ProductPage from './pages/ProductPage';
//import CartPage from './pages/CartPage';
//import CheckoutPage from './pages/CheckoutPage';
//import WishlistPage from './pages/WishlistPage';

// header component
import Header from './components/navigation/Header';
import MobileNav from './components/navigation/MobileNav';

// error boundary
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// private routes
import AdminPrivateRoute from './components/routes/AdminPrivateRoute';
//import AdminDashboard from './pages/admin/AdminDashboard';
import UserPrivateRoute from './components/routes/UserPrivateRoute';
//import UserDashboard from './pages/user/UserDashboard';

// firebase
import { auth } from './firebase/firebase.utils';

// db utility
import { getUser } from "./utility/dbAuth";
import { getProductsCount } from './utility/dbProduct';
import { getCartItems } from './utility/dbCart';
import { getWishlist } from './utility/dbWishlist';

// spinner
import Spinner from './components/spinner/Spinner';


// react lazy
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const UserDashboard = lazy(() => import('./pages/user/UserDashboard'))


const App = () => {

	const dispatch = useDispatch();

    // Check firebase auth state
    useEffect(() => {
		
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const idTokenResult = await user.getIdTokenResult();
			
			// get user from db using the token from firebase auth
            getUser(idTokenResult.token)
              .then((res) => {
                dispatch({
                  type: "USER_LOADED",
                  payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                    address: res.data.address
                  },
                });
              })
              .catch((err) => console.log(err));

			  // get user cart items from db usign firebase token
              getCartItems(idTokenResult.token)
                .then(res => {
                	dispatch({ 
						type: 'GET_CART_ITEMS', 
						payload: res.data
					})
				})
				.catch(err => console.log(err))

			// store wishlist products to redux
			getWishlist(idTokenResult.token)
				.then(res => {
					dispatch({ 
						type: 'SET_WISHLIST', 
						payload: res.data.map(el => el._id)
					});
				})
				.catch(err => console.log(err))
          }
		});
        // cleanup
		return () => unsubscribe();
		
      }, [dispatch]);

	
	// REDUX - get the number of total products from backend
    useEffect(() => {
        getProductsCount()
			.then(res => {
				dispatch({ type: 'GET_PRODUCTS_COUNT', payload: res.data })
			})
			.catch(err => console.log(err))
	}, [dispatch])
		

    return (

		<div>
			<div className='nav-container' style={{ backgroundColor: 'rgb(0,21,41)'}}>
				<MobileNav />
				<div className='container'>
					<Header />
					
				</div>

				
			</div> 

			

			<div className='container'>
            
				<ToastContainer></ToastContainer>
				<Switch>
					
					<ErrorBoundary>
						<Suspense fallback={<Spinner />}>
							<Route exact path='/' component={HomePage} />
							<Route exact path='/products' component={ShopPage} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/products/:id' component={ProductPage} />
							<Route exact path='/cart' component={CartPage} />
							<Route exact path='/wishlist' component={WishlistPage} />
							<UserPrivateRoute exact path='/checkout' component={CheckoutPage} />
							<AdminPrivateRoute path='/admin' component={AdminDashboard} />
							<UserPrivateRoute path='/user' component={UserDashboard} />
						</Suspense>
							
							
							
							<Route exact path='/register' component={Register} />
							<Route exact path='/register/verified' component={RegisterComplete} />
							<Route exact path='/forgotpassword' component={ForgotPassword} />
							
							
							
						
					</ErrorBoundary>
				</Switch>

        	</div>
		</div>

        

    );
}

export default App;
