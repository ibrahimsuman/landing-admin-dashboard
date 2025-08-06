import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout/Layout';
import Order from './pages/Dashboard/Order/Order';
import Report from './pages/Dashboard/Report/Report';
import OrderTracking from './pages/Dashboard/OrderTracking/OrderTracking';
import CreateProduct from './pages/ProductManage/CreateProduct';
import ProductList from './pages/ProductManage/ProductList';
import ProductCategory from './pages/ProductManage/ProductCategory';
import Staff from './pages/StaffManage/Staff';
import StaffEnroll from './pages/StaffManage/StaffEnroll';
import { Login } from './pages/Login/Login';
import DashMain from './pages/Dashboard/DashMain/DashMain';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },

  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        index: true,
        element:<DashMain></DashMain>
      },
      {
        path: 'order',
        element: <Order />
      },
      {
        path: 'report',
        element: <Report />
      },
      {
        path: 'ordertracking',
        element: <OrderTracking />
      },
      {
        path: 'createproduct',
        element: <CreateProduct />
      },
      {
        path: 'productlist',
        element: <ProductList />
      },
      {
        path: 'productcategory',
        element: <ProductCategory />
      },
      {
        path: 'staff',
        element: <Staff />
      },
      {
        path: 'staffenroll',
        element: <StaffEnroll />
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
