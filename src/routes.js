import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import DataForm from 'src/views/data/index'
import AddressForm from 'src/views/address/index'
import ContactForm from 'src/views/contact/index'
import AssetsForm from 'src/views/assets/index'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'empresas', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
     

      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  {
    path: '/cadastro',
    element: <DashboardLayout />,
    children: [
      { path: 'data', element: <DataForm /> },
      { path: 'address', element: <AddressForm /> },
      { path: 'contact', element: <ContactForm /> },
      { path: 'assets', element: <AssetsForm /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      // { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/cadastro/data" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
