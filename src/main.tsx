import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import PrivetRoute from './PrivetRoute/PrivetRoute';

// lazy imports
const Login = React.lazy(() => import('./pages/Login/Login'));
const ProductCategoryAndBrand = React.lazy(() => import('./pages/ProductManage/ProductCategoryAndBrand/ProductCategoryAndBrand'));
const Layout = React.lazy(() => import('./layout/Layout'));
const DashMain = React.lazy(() => import('./pages/Dashboard/DashMain/DashMain'));
const Order = React.lazy(() => import('./pages/Dashboard/Order/Order'));
const Report = React.lazy(() => import('./pages/Dashboard/Report/Report'));
const OrderTracking = React.lazy(() => import('./pages/Dashboard/OrderTracking/OrderTracking'));
const CreateProduct = React.lazy(() => import('./pages/ProductManage/CreateProduct'));
const ProductList = React.lazy(() => import('./pages/ProductManage/ProductList'));
const Staff = React.lazy(() => import('./pages/StaffManage/Staff'));
const StaffEnroll = React.lazy(() => import('./pages/StaffManage/StaffEnroll'));
// router definition
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <PrivetRoute><Layout /></PrivetRoute>,
    children: [
      { index: true, element: <DashMain /> },
      { path: 'order', element: <Order /> },
      { path: 'report', element: <Report /> },
      { path: 'ordertracking', element: <OrderTracking /> },
      { path: 'createproduct', element: <CreateProduct /> },
      { path: 'productlist', element: <ProductList /> },
      { path: 'productcategory', element: <ProductCategoryAndBrand /> },
      { path: 'staff', element: <Staff /> },
      { path: 'staffenroll', element: <StaffEnroll /> },
    ],
  },
]);
const queryClient = new QueryClient()
// render with one Suspense wrapping RouterProvider for better fallback UI and FCP visibility
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center', fontSize: '1.25rem' }}>
          Loading app...
        </div>
      }
    >
      <QueryClientProvider client={queryClient}> 
        <RouterProvider router={router} />
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider> 
      <Toaster position='top-right' />
    </Suspense>
  </StrictMode>
);
