import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts:builder.query({
            query:()=>({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor:true,
        }),
        getProductDetails:builder.query({
            query:(productId)=>({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor:true,
        })
    })
});

export const {useGetProductsQuery, useGetProductDetailsQuery} = productsApiSlice;