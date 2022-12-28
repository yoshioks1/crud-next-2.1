//rfce
import React from 'react'
import {ProductForm} from '../components/ProductForm';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";

function index({products}) {
  //console.log(products)
  return (
    <Layout>
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      
      
      {products.map(product=>(
        <ProductCard key={product.id} product={product}/>
      ))}

    </div>
    </Layout>
  )
}
export default index;
//getServerSideProps se ejecuta en el backend antes de hacer render al front end
export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/products");
  //console.log(res.data);

  return {
    props: {
      products: res.data,
    },
  };
}
