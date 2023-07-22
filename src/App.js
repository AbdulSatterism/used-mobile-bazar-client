import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Router/Router';

function App() {
  return (
    <div data-theme="light" className="max-w-[1440px] mx-auto">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
