
import { useForm } from 'react-hook-form';
import { clearSelectedProduct, createProductAsync, fetchAllProductByIdAsync, selectBrands, selectCategories, selectProductById, updateProductAsync } from '../../Product-list/ProductListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';




function Productform(){
  const dispatch = useDispatch()
  const { register, 
          handleSubmit,
          setValue, 
          reset ,
          formState:{errors} 
  } = useForm();

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const params = useParams();
  const selectedProduct = useSelector(selectProductById);



  
  // fetchAllProductByIdAsync = fetchProductByIdAsync (no renaming)
  useEffect(()=>{
    if(params.id){
     dispatch( fetchAllProductByIdAsync(params.id)) 
    }else{
     dispatch( clearSelectedProduct())
    }
  },[params.id,dispatch])

  useEffect(()=>{
    if(selectedProduct && params.id){
      setValue('title',selectedProduct.title);
      setValue('description',selectedProduct.description);
      setValue('price',selectedProduct.price);
      setValue('discountPercentage',selectedProduct.discountPercentage);
      setValue('thumbnail',selectedProduct.thumbnail);
      setValue('stock',selectedProduct.stock);
      setValue('image1',selectedProduct.images[1]);
      setValue('image2',selectedProduct.images[2]);
      setValue('image3',selectedProduct.images[3]);
      setValue('brand',selectedProduct.brand);
      setValue('category',selectedProduct.category);
    }
  },[selectedProduct,params.id,setValue]);


  const handleDelete=()=>{
    const product = {...selectedProduct};
    product.deleted = true;
    dispatch(updateProductAsync(product));
  }

    return ( 
        <form noValidate 
         onSubmit={handleSubmit((data)=>{
          
          const product = {...data}
          product.images = [product.image1, product.image2,product.image3 , product.thumbnail]
          product.rating = 0;
          delete product['image1']
          delete product['image2']
          delete product['image3']
          product.price = +product.price;
          product.stock = +product.stock;
          product.discountPercentage = +product.discountPercentage;
          console.log(product);
          
          if(params.id){
            product.id = params.id;
            product.rating = selectedProduct.rating || 0;
            dispatch(updateProductAsync(product))
            reset()
          }else{
          dispatch(createProductAsync(product));
          reset()
          }

         })} >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {/* name product */}
              <div className="sm:col-span-4">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="text"
                      {...register ("title" ,{required:"enter product name"})}
                      id="title"
                      placeholder='Enter product name'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              {/* description */}
              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register ("description" ,{required:"enter product description"})}
                    placeholder='write product Description'
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                
              </div>
              {/* brand */}
              <div className="col-span-full">
                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                  Brand
                </label>
                <div className="mt-2">
                 <select  {...register ("brand" ,{required:"select product brand"})} >
                  <option value=''>--choose brand--</option>
                  { brands.map(brand=> <option value={brand.value}>{brand.label} </option>)}
                  
                 </select>
                </div>
                
              </div>
              {/* category */}               
               <div className="col-span-full">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
                <div className="mt-2">
                 <select  {...register ("category" ,{required:"select product category"})} >
                  <option value="" >--choose category--</option>
                  { categories.map(category=> <option value={category.value}>{category.label} </option>)}
                  
                 </select>
                </div>
                
              </div>
              {/* price */}
              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="number"
                      {...register ("price" ,{required:"required product price",
                      min:1,
                      max:100000
                       })}
                      id="price"
                      placeholder='price'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>

              {/* discount */}
              <div className="sm:col-span-2">
                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                  discount
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="number"
                      {...register ("discountPercentage" ,{required:"required product discountPercentage",
                      min:0,
                      max:100
                    
                    })}
                      id="discountPercentage"
                      placeholder='discount on product'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>

              {/* stock */}
              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="number"
                      {...register ("stock" ,{required:"required product stock",
                       min:0
                      })}
                      id="stock"
                      placeholder='number of stock'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              {/* thumbnail */}
              <div className="sm:col-span-6">
                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="text"
                      {...register ("thumbnail" ,{required:"required product thumnail"})}
                      id="thumbnail"
                      placeholder='Enter product url'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              {/* Image1 */}
              <div className="sm:col-span-6">
                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="text"
                      {...register ("image1" ,{required:"required image 1"})}
                      id="image1"
                      placeholder='Enter product image url'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              {/* imag2 */}
              <div className="sm:col-span-6">
                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="text"
                      {...register ("image2" ,{required:"required image 2"})}
                      id="image2"
                      placeholder='Enter product image url'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              {/* image3 */}
              <div className="sm:col-span-6">
                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    
                    <input
                      type="text"
                      {...register ("image3" ,{required:"required image 3"})}
                      id="image3"
                      placeholder='Enter product image url'
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
  
        
  
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>
           
  
            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
              
            </div>
          </div>
        </div>
  
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
         {selectedProduct && <button
           onClick={handleDelete}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            delete
          </button>
}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    );
}

export default Productform ;