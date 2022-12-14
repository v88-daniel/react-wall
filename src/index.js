import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './components/login';
import Dashboard from './components/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUp from './components/sign_up';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignUp/>
  </React.StrictMode>
);
