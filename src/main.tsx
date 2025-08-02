import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout/Layout';
import { Login } from './pages/Login/Login';
import Order from './pages/Dashboard/Order/Order';
import Report from './pages/Dashboard/Report/Report';
import OrderTracking from './pages/Dashboard/OrderTracking/OrderTracking';
import CreateProduct from './pages/ProductManage/CreateProduct';
import ProductList from './pages/ProductManage/ProductList';
import ProductCategory from './pages/ProductManage/ProductCategory';
import Staff from './pages/StaffManage/Staff';
import StaffEnroll from './pages/StaffManage/StaffEnroll';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <div> Dash </div>
      },
      {
        path:'order',
        element: <Order/>
      },
      {
        path:'report',
        element: <Report/>
      },
      {
        path:'ordertracking',
        element: <OrderTracking/>
      },
      {
        path:'createproduct',
        element: <CreateProduct/>
      },
      {
        path:'productlist',
        element: <ProductList/>
      },
      {
        path:'productcategory',
        element: <ProductCategory/>
      },
      {
        path:'staff',
        element: <Staff/>
      },
      {
        path:'staffenroll',
        element: <StaffEnroll/>
      },
    ]
  },
  {
    path:'/',
    element: <Login/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />,
  </StrictMode>,
)
