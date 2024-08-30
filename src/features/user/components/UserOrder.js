import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchLoggedInUserOrderAsync, selectUserOrders } from '../userSlice';
import { selectLoggedInUser } from '../../auth/authSlice';
import { discountedPrice } from '../../../app/constants';


export  function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  },[]);
  
  return (
    
      <div>
        {orders.map((order)=>{
            <div> 
                <div className=" bg-white mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="p-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" >Order: {order.id} </h2>
   <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {order.items.map((item) => (
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
                                  <div className="text-gray-500 mr-5">Qty :{item.quantity}
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
                      <p>${order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Total Items in Cart</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                   
                  </div>
                  </div>
             </div>
        })}
        
        
        
      </div>
   
  );
}
