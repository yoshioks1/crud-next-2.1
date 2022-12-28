import React from 'react'
import { Layout } from "../../components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

function ProductView({data_prop}) {
  //console.log(data_prop)
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await axios.delete("/api/products/" + id);
      //toast.success("Task deleted");
      router.push("/");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };
  const handleUpdate = async (id) => {

  };

  return (
    <Layout>
      <h1>ProductView</h1>
        <p>Name: {data_prop.name}</p>
        <p>Description: {data_prop.description}</p>
        <p>Price: {data_prop.price}</p>
        <button className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded" onClick={() => handleDelete(data_prop.id)}>
          Delete
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 py-2 px-3 rounded ml-2" 
          onClick={() => router.push("/products/edit/" + data_prop.id)}>
          Update
        </button>
    </Layout>
  )
}

export const getServerSideProps = async ({ query }) => {
  const { data: product} = await axios.get(
    "https://crudnext-taski.vercel.app/api/products/" + query.id
  );

  //console.log(product)

  return {
    props: {
      data_prop:product,
    },
  };
};

export default ProductView;