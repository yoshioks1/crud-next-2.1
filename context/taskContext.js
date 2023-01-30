import React from 'react'
import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';

export const TaskContext = createContext();

export const TasksProvider = ({ children }) => {

  const [products, setProducts] = useState([]);
  const [ModalDelete, setModalDelete] = useState(false);//Var para renderizar Delete modal window
  const [ModalUpdate, setModalUpdate] = useState(false);//Var para renderizar Update modal window
  const router = useRouter();

  async function loadProducts(){
    const res = await axios.get("https://trialnext.herokuapp.com/api/products");  // https://repo-crudnext22.vercel.app/api/products
    //console.log(res.data);
    setProducts(res.data);
    //console.log(response.data);
  }

  const showDeleteModal = (product_id) => {
    setModalDelete(!ModalDelete);
    //console.log(ModalDelete);
  };
  const showUpdateModal = (product_id) => {
    setModalUpdate(!ModalUpdate);
    console.log(ModalUpdate);
  };

  async function DeleteProduct(id){
    try {
      console.log('mensaje de borrado tarea desde context Api');
      await axios.delete("/api/products/" + id);
      //toast.success("Task deleted");
      router.push("/");
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  async function UpdateProduct(id, product_details){
    try {
      //console.log(id); console.log(product_details);
      const res = await axios.put("/api/products/" + id, product_details);
      await toast.success("Task Updated", {position: toast.POSITION.TOP_RIGHT});
      setModalDelete(!ModalDelete);
      setTimeout(()=>router.push('/'), 3000);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }


  const hello = "world";

  return (
      <TaskContext.Provider value={{
        hello,
        products:products, loadProducts,
        showDeleteModal,ModalDelete,DeleteProduct,
        showUpdateModal,ModalUpdate,UpdateProduct

      }}>
        {children}
      </TaskContext.Provider>
    );
};