import React from 'react'
import { pool } from "../../config/db";
import { Layout } from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
//Traer variables de context Api
import { useContext } from "react";
import { TaskContext } from "../../context/taskContext";

import ModalDelete_obj from "../../components/modal_delete.js";




function ProductView({data_prop}) {
  const {showDeleteModal, ModalDelete} = useContext(TaskContext);

  //console.log(data_prop)
  const router = useRouter();

  /*
  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/products/" + id);
      //toast.success("Task deleted");
      router.push("/");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  */
  


  const handleUpdate = async (id) => {

  };

  return (
    <Layout>
      <h1>ProductView</h1>
        <p>Name: {data_prop.name}</p>
        <p>Description: {data_prop.description}</p>
        <p>Price: {data_prop.price}</p>
        <button className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded" onClick={() => showDeleteModal(data_prop.id)}>
          Delete
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded ml-2" 
          onClick={() => router.push("/products/edit/" + data_prop.id)}          
        >Update</button>

        {ModalDelete && <ModalDelete_obj showModal={ModalDelete} data_rec={data_prop}/>}
        
        
    </Layout>

  )
}

export const getServerSideProps = async ({ query }) => {
  console.log(query);
  const ruta = await pool.query("SELECT link_value FROM links_dev");
  var rutalink = ruta[0].link_value;

  const { data: product} = await axios.get(
    rutalink + "/api/products/" + query.id
  );

  //console.log(product)

  return {
    props: {
      data_prop:product,
    },
  };
};


export default ProductView;
