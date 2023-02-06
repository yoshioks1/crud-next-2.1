//rfce
import React from 'react'
import {ProductForm} from '../components/ProductForm';

import { pool } from "../config/db";
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
  //const {raiz} = useContext(TaskContext);   //console.log(raiz);

  useEffect(() => {
    loadProducts();
  }, [])

  //console.log(products)
  return (
    <Layout>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <p>Crud Next Mysql 2 !</p>
        
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

  const ruta = await pool.query("SELECT link_value FROM links_dev");
  var rutalink = ruta[0].link_value;
  //console.log(rutalink);

  const child_process = require('child_process');
  const cron = require('node-cron');

  const taskCron = async () => {
    console.log('Trigger taskCron: ' + raiz);
    const results = await axios.post( rutalink + "/api/random"); 
    //console.log(results);
  }; 

  //Execute every 2 hours
  cron.schedule("0 */2 * * *",taskCron).start();

  const res = await axios.get( rutalink + "/api/products");
  //console.log(res.data);
  return {
    props: {
      products: res.data,
    },
  };

}

