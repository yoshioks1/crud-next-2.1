import '../styles/globals.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TasksProvider } from "../context/taskContext";

function MyApp({ Component, pageProps }) {
  
  return (
  <TasksProvider>
    <Component {...pageProps} />
  </TasksProvider>
  );
}

export default MyApp
