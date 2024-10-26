import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Createproduct from './Pages/Createproduct';
import Product from './Pages/Product';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Pages/About';

export default function App() {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', width: '100%' }}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/create' element={<Createproduct />} />
          <Route path='/product/:productSlug' element={<Product />} />
          <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
