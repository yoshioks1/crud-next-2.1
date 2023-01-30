//rfce
import React from 'react'
import {ProductForm} from '../components/ProductForm';
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";
//Traer variables de context Api
import { useContext } from "react";
import { TaskContext } from "../context/taskContext";





function Index() { //{products}
  const {products,loadProducts} = useContext(TaskContext);

  useEffect(() => {
    loadProducts();
  }, [])

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
export default Index;

//getServerSideProps se ejecuta en el backend antes de hacer render al front end

export const getServerSideProps = async (context) => {
  const child_process = require('child_process');
  const cron = require('node-cron');
  
  
  const taskCron = async () => {
    console.log('Trigger taskCron');
    const results = await axios.post("http://localhost:3000/api/random"); //https://repo-crudnext22.vercel.app
    console.log(results);
  }; 

  //Execute every 10sec
  cron.schedule("*/20 * * * * *",taskCron).start();

  const res = await axios.get("http://localhost:3000/api/products");
  //console.log(res.data);
  return {
    props: {
      products: res.data,
    },
  };

}

