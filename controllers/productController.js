import Product from "../models/product.js"
import { isAdmin } from "./userController.js"

export async function getProducts(req,res){
  

try{
  if(isAdmin(req)){
    const products = await Product.find()
    res.json(products)
  }else{
    const products = await Product.find({isAvailable : true})
    res.json(products)
  }
  
}catch(err){
  res.json({
    message : "Failed to get products",
    error : err
  })
}
}

export function saveProducts(req,res){

  if(!isAdmin(req)){
    res.status(403).json({
      message : "You are not authorized to add a product"
    })
    return
  }
  const product= new Product(
      req.body
     );

   product.save().then(()=>{
        res.json({
          message : "Product added SuccessFullly",
        });
     }).catch(()=>{
       res.json({
         message : "Failed to add Product ",
       });
     });
  
    }

   export async function deleteProducts(req,res) {
    if(!isAdmin (req)){
      res.status(403).json({
        message : "You are not authorized to delete a product"
      })
      return
    }
    try{
      await Product.deleteOne({productId:req.params.productId})
      res.json({
        message : "product delete successfully"
      })
    }catch(err){
      res.status(500).json({
        message : "Failled to delete product",
        error:err
      })
    }
   }
 export async function updateProducts(req,res) {
    if(!isAdmin (req)){
      res.status(403).json({
        message : "You are not authorized to update a product"
      })
      return
    } 
    const productId = req.params.productId
    const updatingData = req.body
    try{
      await Product.updateOne({productId:productId},
        updatingData
      )
      res.json({
        message : "product update successfully"
      })
    }catch(err){
      res.status(500).json({
        message : "Internal server error",
        error:err
      })
    }
   }
export async function getproductById(req,res){
   const productId = req.params.productId
try{
  const product = await Product.findOne(
    {productId : productId}
  )
if(product == null ){
  res.status(404).json({
    message : "Product not found"
  })
  return
  
}
if (product.isAvailable){
  res.json(product)
}else{
  if(!isAdmin(req)){
    res.status(404).json({
      message : "Product not found"
    })
    return
  }else{
    res.json(product)
  }
}

}catch(err){
   res.status(500).json({
    message : "Internal server error",
    error:err
   })
} 
}   
