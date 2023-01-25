import {Navbar} from "./Navbar";
//import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from 'react-toastify';


export function Layout({ children }) {
  return (
    <>
    
      <Navbar />
      <div className="dark:bg-slate-900 dark:text-white h-screen p-10">
        <div className="container mx-auto h-full">{children}</div>
      </div>
      <ToastContainer />
    
    </>
  );
}