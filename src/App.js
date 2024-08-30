import React, { useEffect } from 'react';

import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Productsdetails from './pages/Productsdetail';
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/Cart/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/Page404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import Logout from './features/auth/components/Logout';
import ForgetPasswordPage from './pages/ForgetPassword';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import ProductDetailAdmin from './features/admin/components/ProductDetailAdmin';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';



const router = createBrowserRouter([
  {
    path:'/',
    element: <Protected> <Home></Home> </Protected> ,
  },
  {
    path:'/admin',
    element:  <ProtectedAdmin> <AdminHome></AdminHome> </ProtectedAdmin>
  },
  {
    path:'/login',
    element:<LoginPage></LoginPage>,
  },
  {
    path:'/signup',
    element:<SignupPage></SignupPage> ,
  },
  {
    path:'/cart',
    element:<Protected> <CartPage></CartPage> </Protected> ,
  },
  {
    path:'/checkout',
    element: <Protected> <Checkout></Checkout> </Protected> ,
  },
  {
    path:'/productdetail/:id',
    element: <Protected> <Productsdetails></Productsdetails> </Protected> ,
  },
  {
    path:'/admin/productdetail/:id',
    element: <ProtectedAdmin> <ProductDetailAdmin></ProductDetailAdmin> </ProtectedAdmin> ,
  },
  {
    path:'/admin/productform',
    element: <ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage> </ProtectedAdmin> ,
  },
  {
    path:'/admin/productform/edit/:id',
    element: (<ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage> </ProtectedAdmin>) ,
  },
  {
    path:'/admin/orders',
    element: (<ProtectedAdmin> <AdminOrdersPage></AdminOrdersPage> </ProtectedAdmin>) ,
  },



  {
    path:'/order-success/:id',
    element: <OrderSuccessPage></OrderSuccessPage> ,
  },
  {
    path:'/orders',
    element: <UserOrdersPage></UserOrdersPage> 
  },
  {
    path:'/profile', 
    element: <UserProfilePage></UserProfilePage>
  },
  {
    path:'/logout',
    element: <Logout></Logout> 
  },
  {
    path:'/forgetpassword',
    element: <ForgetPasswordPage></ForgetPasswordPage>
  },
  {
    path:'*',
    element: <PageNotFound></PageNotFound> ,
  }

]);

function App() {
  // todo showing cart items beacurse user login ke ke sath hi show krna h 
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(!user){
   dispatch (fetchItemsByUserIdAsync())
    }
  },[dispatch])


  return (
    <div className="App">
     
        <RouterProvider router = {router} />
    </div>
  );
}

export default App;
