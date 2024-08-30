import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';



export  function UserProfile() {
  
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);


console.log(user);
  return (
    <div>
      
          <div className=" bg-white mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 className="p-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900" > Name  </h2>
      {/* <h3 className='text-xl my-5 font-bold tracking-tight text-red-900'>
      email address :{user.email}
    </h3> */}
    {/* { user.role === 'admin' && (
       <h3 className='text-xl my-5 font-bold tracking-tight text-red-900'>
       role :{user.role}
     </h3>
    ) } */}
   
     {/* <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  
                    <p className="mt-0.5 text-sm text-gray-500">Your Addresses: </p>

                {user.addresses.map(address=> <div className='flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200' >
                    <div className="flex gap-x-4">
                        
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
                      </div>
                  )}

                   
                  </div> */}
                  </div>
      
    </div>
   
  );
}
