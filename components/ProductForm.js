
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


export function ProductForm() {
 
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleChange = ({ target: { name, value } }) =>{
    //console.log(e.target.name,e.target.value);
    setProduct({ ...product, [name]: value });
  }

  const router = useRouter();
  //To pull sku data from DB
  useEffect(() => {
    const fetchProduct = async (id) => {
      const { data } = await axios.get("/api/products/" + id);
      console.log(data);
      setProduct({name:data.name, description:data.description, price:data.price});
    };
    if (router.query?.id) {
      fetchProduct(router.query.id);
      
    };
    
  }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (router.query?.id) {
            //console.log('Updating a product');
            const res = await axios.put("/api/products/" + router.query.id,product);
            
            await toast.success("Task Updated", {position: toast.POSITION.TOP_RIGHT});
            //await delay(3000);
            //router.push('/');
            setTimeout(()=>router.push('/'), 3000);
            
          }else{
            //console.log('Creating a product');
            const res = await axios.post("/api/products/" , product);
            
            await toast.success("Task Saved",{position: toast.POSITION.TOP_RIGHT});
            setTimeout(()=>router.push('/'), 3000);
            //console.log(res);
            
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
    }
    
    
    return (
        <div className="w-full max-w-xs">
          <form className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="name">Product Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                type="text"
                placeholder="name"
                id="name"
                name="name"
                onChange={handleChange}
                value={product.name}
                autoComplete="off"
              />
            </div>
    
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 dark:text-white font-bold mb-2 text-sm">Product Price:</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                name="price"
                onChange={handleChange}
                value={product.price}
                placeholder="10.00"
              />
            </div>
    
            <div className="mb-2">
              <label htmlFor="description" className="block text-gray-700 dark:text-white font-bold mb-2 text-sm"> Write a Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                id="description"
                rows="2"
                placeholder="Product description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:border-slate-900 dark:text-white"
                value={product.description}
              ></textarea>
            </div>
    
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              {router.query.id ? 'Update':'Add'}
            </button>
          </form>
        </div>
      );

}    