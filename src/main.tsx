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
import AllUsersList from './pages/UserManage/AllUsersList';
import { FullScreenLoader } from './utils/FullScreenLoader';
import { ProductFormPage } from './pages/ProductManage/Products/ProductFormPage';
import CreatePlatform from './layout/LayoutComponents/CreatePlatform/CreatePlatform';


// lazy imports
const Login = React.lazy(() => import('./pages/Login/Login'));
const ProductCategoryAndBrand = React.lazy(() => import('./pages/ProductManage/ProductCategoryAndBrand/ProductCategoryAndBrand'));
const Layout = React.lazy(() => import('./layout/Layout'));
const DashMain = React.lazy(() => import('./pages/Dashboard/DashBoardMain/DashMain'));
const Order = React.lazy(() => import('./pages/Dashboard/OrderManage/Order/Order'));
const Report = React.lazy(() => import('./pages/Dashboard/OrderManage/Report/Report'));
const OrderTracking = React.lazy(() => import('./pages/Dashboard/OrderManage/OrderTracking/OrderTracking'));
const ProductList = React.lazy(() => import('./pages/ProductManage/Products/ProductList'));
const Staff = React.lazy(() => import('./pages/UserManage/Staff'));
const StaffEnroll = React.lazy(() => import('./pages/UserManage/StaffEnroll'));
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
      {path: 'createproduct', element: <ProductFormPage/> },
      { path: 'productlist', element: <ProductList /> },
      { path: 'productcategory', element: <ProductCategoryAndBrand /> },
      { path: 'staff', element: <Staff /> },
      { path: 'staffenroll', element: <StaffEnroll /> },
      { path: 'allusers', element: <AllUsersList /> },
      { path: 'createplatform', element: <CreatePlatform/>}
    ],
  },
]);
const queryClient = new QueryClient()
// render with one Suspense wrapping RouterProvider for better fallback UI and FCP visibility
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<FullScreenLoader />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster position='top-right' />
    </Suspense>
  </StrictMode>
);
