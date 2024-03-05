export async function FetchProducts(limit:number,skip:number,input:string){
    try{
      console.log(`https://dummyjson.com/products/search?q=${input}&limit=${limit}&skip=${limit*skip}`)
      let resp = await fetch(`https://dummyjson.com/products/search?q=${input}&limit=${limit}&skip=${limit*skip}`)
      let data = await resp.json()
      console.log(data)
      return data
    }catch(e){
      console.log(e)
      console.log()
    }
  }
export async function FetchProductsById(id:string){
    try{
      let resp = await fetch(`https://dummyjson.com/products/${id}`)
      return await resp.json()
    }catch(e){
      console.log(e)
      console.log()
    }
  }
export async function AddProduct(data:any){
    try{
      let resp = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          price:data.price,
          category:data.category,
          brand:data.brand,
          discountPercentage:data.discountPercentage
        })
      })
      let product = await resp.json()
      console.log(product)
      return product
    }catch(e){
      console.log(e)
      console.log()
    }
}
export async function UpdateProduct(data:any,id:string){
  try{
    let resp = await fetch('https://dummyjson.com/products/'+id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: data.titile,
        description: data.description,
        price:data.price,
        category:data.category,
        brand:data.brand,
        discountPercentage:data.discountPercentage
      })
    })
    let product = await resp.json()
    console.log(product)
    return product
  }catch(e){
    console.log(e)
    console.log()
  }
}
export async function DeleteProduct(id:number){
    try{
        let resp = await fetch(`https://dummyjson.com/products`)
        let data = resp.json()
        console.log(data)
        return data
      }catch(e){
        console.log(e)
      }
}