import { pool } from "../config/db";
import axios from "axios";
import { ProductForm } from "../components/ProductForm";
import { Layout } from "../components/Layout";
//Traer variables de context Api
import { useContext } from "react";
import { TaskContext } from "../context/taskContext";

function NewPage() {
  const { raiz } = useContext(TaskContext);

    return (
      <Layout>
        <div className="h-5/6 grid place-items-center">
          <ProductForm />
        </div>
      </Layout>
    );
  }
  export default NewPage;
  
  export const getServerSideProps = async (context) => {
    const ruta = await pool.query("SELECT link_value FROM links_dev");
    var rutalink = ruta[0].link_value;
    
    //console.log('context'); console.log(context);
    const res = await axios.get( rutalink + "/api/products");
  
    return {
      props: {
        products: res.data,
      },
    };
  };