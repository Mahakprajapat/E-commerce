import React, { useState,Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {deleteItemFromCartAsync, selectItems,updateCartAsync} from '../features/Cart/CartSlice';
import { useForm } from "react-hook-form";

import { Link,Navigate } from 'react-router-dom';
import { selectLoggedInUser, updateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync, selectCurrentOrder } from '../features/order/orderSlice';
import { discountedPrice } from '../app/constants';

const addresses = [
  {
    name: 'John wick',
    street: '11th Main',
    city: 'Delhi',
    pinCode: 110001,
    state: 'Delhi',
    phone: 12312321331,
  },
  {
    name: 'John Doe',
    street: '15th Main',
    city: 'Bangalore',
    pinCode: 560034,
    state: 'Karnataka',
    phone: 123123123,
  },
];

function Checkout() {
    
      
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)
  const { register, handleSubmit, formState:{errors} } = useForm();

  const user = useSelector(selectLoggedInUser);

  const items = useSelector(selectItems);
  const currentOrder = useSelector(selectCurrentOrder)
  const totalAmount = items.reduce((amount,item)=> discountedPrice(item)  *item.quantity +amount,0)
  const totalItems = items.reduce((total,item)=>item.quantity + total,0)
  
  const [selectedAddress,setSelectedAddress] =useState(null);
  const [paymentMethod ,setPaymentMethod] = useState('cash');

  // incr the item Qty in cart
  const handleQuantity=(e,item)=>{
   dispatch(updateCartAsync({...item,quantity: +e.target.value}));
  }
  // del the item for the cart
  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  };

  const handleAddress = (e)=>{
    setSelectedAddress(user.addresses[e.target.value])
  };

  const handlePayment = (e)=>{
    setPaymentMethod(e.target.value);
  }
  const handleOrder = (e)=>{
    // if(selectedAddress && paymentMethod){
    const order = {items,totalAmount,totalItems,user,paymentMethod,selectedAddress,
    status:'pending' 
    // other status can be delivered , received.
    }
    dispatch(createOrderAsync(order));
  // }else{
  //   alert('Enter Address and Payment method')
  // }
    // remaining 
    // redirect to order-success page
    // clear cart after order
    // on server chane the stock number of itmes
  };
  
  return (
    
    <>
     {!items.length && <Navigate to="/" replace={true}></Navigate>}
     {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className='grid gird-cols-1 gap-y-10 lg:grid-cols-5'>
        <div className='lg:col-span-3' >
       <form className="mt-10 mb-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" noValidate 
       onSubmit={handleSubmit((data)=>{
        console.log(data)
        dispatch(
            updateUserAsync({
              ...user,
              addresses: [...user.addresses, data],
            })
            
          );
          
       })}>
        
        <div className='space-y-12'>
       <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive Order</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                 Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('name',{required:'name is required'})}
                  id="name"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:'email is required'})}
                  type="email"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
              <input
                  id="phone"
                  {...register('phone',{required:'phone is required'})}
                  type="tel"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:'street-address is required'})}
                  id="street"
                 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city',{required:'city is required'})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('state',{required:'state is required'})}
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:'pinCode is required'})}
                  id="pinCode"
                  
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
          Choose from Existing Addresses
          </p>
          <ul role="list">
                  {user.addresses.map((address,index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                        onChange={handleAddress}
                          name="address"
                          type="radio"
                          value={index}
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.street}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {address.phone}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {address.city}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

          <div className="mt-10 space-y-10">
           
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    name="payments"
                    onChange={handlePayment}
                    value="cash"
                    type="radio"
                    checked={paymentMethod === "cash"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                   Cash On Delivery
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="payments"
                    onChange={handlePayment}
                    value="card"
                    type="radio"
                    checked={paymentMethod === "card"}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                   Card Payment
                  </label>
                </div>
                
              </div>
            </fieldset>
          </div>
        </div>
      </div>

     
        </form> 
        </div>
        {/* cart */}
        <div className='lg:col-span-2' >
              
        <div className=" bg-white mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="p-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" >Shopping Cart</h2>
   <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {items.map((item) => (
                            <li key={item.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.thumbnail}
                                  alt={item.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={item.href}>{item.title}</a>
                                    </h3>
                                    <p className="ml-4">${item.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div className="text-gray-500 mr-5">Qty 
                                  <select onChange={(e)=>handleQuantity(e,item)}
                                  value={item.quantity}
                                  >
                                    <option value="1" >1</option>
                                    <option value="2" >2</option>
                                    <option value="3" >3</option>
                                    <option value="4" >4</option>
                                    <option value="5" >5</option>
                                    <option value="6" >6</option>
                                    <option value="7" >7</option>
                                    <option value="8" >8</option>
                                  </select>
                                  
                                 </div>

                                  <div className="flex">
                                    <button
                                    onClick={(e)=>handleRemove(e,item.id)}
                                      type="button"
                                      className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total Items in Cart</p>
                      <p>{totalItems} items</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <div
                        onClick={handleOrder}
                        className="flex cursor-pointer  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Order
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                        </Link>
                      </p>
                    </div>
                  </div>
                  </div>
        </div>
        {/* cart end */}
        </div>
        </div>
    </>
  )
};


export default Checkout;
