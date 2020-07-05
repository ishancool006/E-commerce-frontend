import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { detailsProduct } from "../actions/productAction";
const ProductScreen =(props) =>{
    const [qty,setQty]= useState(1)
    const productDetails = useSelector(state=>state.productDetails)
    const {product,loading,error} =productDetails 
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(detailsProduct(props.match.params.id))
        return ()=>{
            //
        };
    },[dispatch,props.match.params.id])
    
    const handleAddToCart = () =>{
        props.history.push("/cart/"+props.match.params.id+"?qty="+qty)
    }

    
    return <div >
        
        <div className="back-to-result">
            <Link to="/">Back to results</Link>                                                            
        </div>
        {loading? <div>Loading...</div>:
        error?<div> {error} </div>:
        (   
            <div className="details">
            <div className="details-image">
                <img src={product.img} alt="product"></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h4>{product.name}</h4>
                    </li>
                    <li>
                        {product.rating} Stars({product.numReviews} Reviews)
                    </li>
                    <li>
                        Price: <b>{product.price} Rs </b>
                    </li>
                    <li>
                        Description:
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price} Rs /-
                    </li>
                    <li>
                        Status: {product.quantity > 0 ? "Available" : "Unavailable"}
                    </li>
                    <li>
                        Qty:<select value={qty} onChange={(e)=>setQty(e.target.value)}>
                            {[...Array (product.quantity).keys()].map(x=>
                                <option key={x+1} value={x+1}>{x+1}</option>
                                )}
                        </select>
                    </li>
                    <li>
                        {product.quantity>0 &&
                        <button onClick={handleAddToCart} className="button primary">Add To Cart</button>
                        }
                    </li>
                </ul>
            </div>
        </div>
        
        )
        }

        
    </div>
}
export default  ProductScreen;