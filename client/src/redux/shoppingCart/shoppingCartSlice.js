import TYPES from './actionTypes'
import { createSlice} from "@reduxjs/toolkit";

const fetchProducts = async () => {
    const response = await fetch('api/products/get')
    const data = await response.json()
    const products = data.products
    return products
}


const productsInitialState = {
    products: fetchProducts(),
    cart:[],
    totalPrice: 0,
}

const reducerCart =(state, action)=>{
    switch(action.type){
        case TYPES.ADD_TO_CART:{

        }
        case TYPES.DELETE_ALL_FROM_CART:{

        }
        case TYPES.DELETE_PRODUCT_FROM_CART:{

        }
        case TYPES.CALCULATE_TOTAL_PRICE:{

        }
        default:
            return state;
    }
    throw Error('Unknown action: '  + action.type)
}

