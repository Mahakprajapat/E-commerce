import React, { useState,Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {deleteItemFromCartAsync, selectItems,updateCartAsync} from './CartSlice';

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Navbar from '../navbar/Navbar';
import { Link, Navigate } from 'react-router-dom';
import { discountedPrice } from '../../app/constants';


export  function Cart() {
  
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)

  const items = useSelector(selectItems);
  const totalAmount = items.reduce((amount,item)=>discountedPrice(item) *item.quantity +amount,0)
  const totalItems = items.reduce((total,item)=>item.quantity + total,0)

  // incr the item Qty in cart
  const handleQuantity=(e,item)=>{
   dispatch(updateCartAsync({...item,quantity: +e.target.value}));
  }
  // del the item for the cart
  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

  return (
    
   <>
   {!items.length && <Navigate to="/" replace={true}></Navigate>}
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
                                    <p className="ml-4">${discountedPrice(item)}</p>
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
                      <Link to="/checkout"
                        
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
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
   </>
  );
}
