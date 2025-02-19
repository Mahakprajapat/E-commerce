import React, { useEffect, useState } from 'react'
import { ITEMS_PER_PAGE, discountedPrice } from '../../../app/constants';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../order/orderSlice';
import {PencilIcon , EyeIcon} from '@heroicons/react/24/outline'

 function AdminOrder() {
    const [ page,setPage] = useState(1);
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const totalOrders = useSelector(selectTotalOrders);
    const [editableOrderId,setEditableOrderId] = useState(-1);
    
    const handleShow=()=>{
        console.log("handlshow")
    }
    const handleEdit=(order)=>{
        setEditableOrderId(order.id)
    }

    const handleUpdate=(e,order)=>{
        const updatedOrder = {...order,status:e.target.value}
        dispatch(updateOrderAsync(updatedOrder));
        setEditableOrderId(-1);
    }
    

    useEffect(()=>{
        const pagination ={_page:page,_limit: ITEMS_PER_PAGE};
        dispatch(fetchAllOrdersAsync(pagination));
    },[dispatch,page])
    console.log(orders);
  return (
    <div className="overflow-x-auto">
  <div className=" bg-gray flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
    <div className="w-full">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order #</th>
              <th className="py-3 px-6 text-left">Items</th>
              <th className="py-3 px-6 text-center">Total Amount</th>
              {/* <th className="py-3 px-6 text-center">Shipping Address</th> */}
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
          {
            
          orders.map((order)=>{
            return(
        <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                  <div className="mr-2">
                    
                  </div>
                  <span className="font-medium">{order.id}</span>
                </div>
              </td>
              <td className="py-3 px-6 text-left">
               { order.items.map((item)=>( <div className="flex items-center">
                  <div className="mr-2">
                    <img
                      className="w-7 h-8 rounded-full"
                      src={item.thumbnail}
                    />
                  </div>
                  <span>{item.title}  -  #{item.quantity} - ${item.price} </span>
                </div>))}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  ${order.totalAmount}
                </div>
              </td>
              {/* <td className="py-3 px-6 text-center">
                <div className="flex items-center justify-center">
                  {order.selectedAddress.name}
                  {order.selectedAddress.city}
                  {order.selectedAddress.pincode}
                </div>
              </td> */}
              <td className="py-3 px-6 text-center">
                {order.id === editableOrderId ? (
                <select onChange={(e)=>handleUpdate(e,order)}>
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                     ):(
<span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
{order.status}
</span>
                )}
              </td>
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110">
                    <EyeIcon className='w-5 h-5'onClick={e=>handleShow(order)} ></EyeIcon>
                  </div>
                  <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                   <PencilIcon className='w-5 h-5' onClick={e=>handleEdit(order)} ></PencilIcon>
                  </div>
                  
                </div>
              </td>
            </tr>)
  } ) }      
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
   
  )
}

export default AdminOrder;