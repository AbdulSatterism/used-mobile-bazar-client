import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Router/Router';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div data-theme="light" className="max-w-[1440px] mx-auto">
      <RouterProvider router={router}>

      </RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
