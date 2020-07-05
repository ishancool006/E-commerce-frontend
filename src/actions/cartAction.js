import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";
import Cookie from "js-cookie"
const addToCart = (productId,qty)=> async ( dispatch ,getState) => {
    try{
        const{data} = await axios.get("/api/getProduct/"+productId);
        console.log(data[0])
        dispatch({type:CART_ADD_ITEM, payload:{
            product:data[0]._id ,
            name:data[0].name,
            image:data[0].img,
            price:data[0].price,
            countInStock:data[0].quantity,
            qty


        }})
        const {cart:{cartItems}}=getState();
        Cookie.set("cartItems",JSON.stringify(cartItems))
    }
    catch(error){

    }
}

const removeFromCart =(productId)=> (dispatch,getState)=>{
    dispatch({type:CART_REMOVE_ITEM,payload:productId})
    const {cart:{cartItems}}=getState();
    Cookie.set("cartItems",JSON.stringify(cartItems))
}
export {addToCart, removeFromCart}