// A mock function to mimic making an async request for data
export function addToCart(item) {
    return new Promise( async (resolve) =>  {
    const response =   await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'},
    });
    const data = await response.json()
    resolve({data});
    });
  }
  
  // to get to knw user ne cart me kya kya add kiya hai 
  export function fetchItemsByUserId(userId){
    return new Promise(async(reslove)=>{
      const response = await fetch('http://localhost:8080/cart?user='+userId)
      const data = await response.json()
      reslove({data})
    });
  }

  // cart items Qty  aur anything update
  export function updateCart(update) {
    return new Promise( async (resolve) =>  {
    const response =   await fetch('http://localhost:8080/cart/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'},
    });
    const data = await response.json()
    resolve({data});
    });
  }

  // delete items for the cart
  export function deleteItemFromCart(itemId) {
    return new Promise( async (resolve) =>  {
    const response =   await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'},
    });
    const data = await response.json()
    resolve({data :{id:itemId}});
    });
  }

  // cart reset
  export async function resetCart(userId) {
    // get all items added by the user in cart and then del each item
    return new Promise(async(reslove)=>{
    const response = await fetchItemsByUserId(userId)
    const items = response.data;
    for(let item of items){
      await deleteItemFromCart(item.id)
    }
    reslove ({status:'success'})
  });
}