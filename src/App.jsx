/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import UserLayout from './components/UserLayout';
import PrivateLogin from './components/PrivateLogin';
import OnlineBuy from './components/OnlineBuy';
import Cart from './components/Cart';
import Account from './components/Account';

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

const medicineList = [
  {
    id: 1,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCE0gF0qvfDzJ1RrqEniDPr-2p3hp7J4n0ow&s",
    name: "Paracetamol",
    price: 30,
    tabletsPerSheet: 10,
    dosage: "500 mg"
  },
  {
    id: 2,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6BEhe8bmG9YMkXt45t09zMKrX58hK9x3ttA&s",
    name: "Dolo",
    price: 50,
    tabletsPerSheet: 15,
    dosage: "650 mg"
  },
  {
    id: 3,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwLY3dHiE1J3aO77YldxBePZt-gae5dNI8sg&s",
    name: "Azithromycin",
    price: 120,
    tabletsPerSheet: 6,
    dosage: "250 mg"
  },
  {
    id: 4,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvxlaNFKjPnsiZilFtfxUV5X5DeeQIlRHcdw&s",
    name: "Coldtac",
    price: 25,
    tabletsPerSheet: 10,
    dosage: "650 mg"
  },
  {
    id: 5,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XmeIc3_Knu3_mOFKxyGKKvf69y-cKKAwbw&s",
    name: "Citrizen",
    price: 20,
    tabletsPerSheet: 10,
    dosage: "500 mg"
  },
  {
    id: 6,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi93omdhqgp_gmcsj2I0Z3CH2dV0KC_5ffhg&s",
    name: "Combiflam",
    price: 40,
    tabletsPerSheet: 10,
    dosage: "400 mg"
  },
  {
    id: 7,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF_DAERW0fi5YGdZOwkYSkCH1RIBT74Qd_Fw&s",
    name: "Amoxicillin",
    price: 80,
    tabletsPerSheet: 12,
    dosage: "500 mg"
  },
  {
    id: 8,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVNLyAY3CzjVuZKgDHPxxcMQrP3bHWkneTyw&s",
    name: "Ibuprofen",
    price: 60,
    tabletsPerSheet: 10,
    dosage: "400 mg"
  },
  {
    id: 9,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQthMZMK5qb2FPaNAjU4xl5hrI7ysM0D2jllw&s",
    name: "Rantac",
    price: 35,
    tabletsPerSheet: 15,
    dosage: "150 mg"
  },
  {
    id: 10,
    imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS_OLwV6nr62fRaQlZlbJswLK4Y-Npf9fneg&s",
    name: "Crocin",
    price: 25,
    tabletsPerSheet: 10,
    dosage: "500 mg"
  }
];


function App() {
  const [cartItems, setCartItems] = useState(medicineList.map((item) => ({ ...item, count: 0 })));
  const [itemsAddedState, setItemsAddedState] = useState(false);
  const handleAddToCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };
  const handleIncreaseCount = (id) => {
    setCartItems((prevItems) => 
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };
  const handleDecreaseCount = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
      )
    );
  };
  useEffect(() => {
    const itemsAdded = cartItems.some(item => item.count > 0);
    setItemsAddedState(itemsAdded);
  }, [cartItems]);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <Signup /> }
      ]
    },
    {
      path: '/:id/dashboard',
      element: (
        <PrivateLogin>
          <UserLayout itemsAddedState={itemsAddedState}/>
        </PrivateLogin>
      ),
      children: [
        { path: 'online-buy', element: <OnlineBuy cartItems={cartItems} handleAddToCart={handleAddToCart} handleIncreaseCount={handleIncreaseCount} handleDecreaseCount={handleDecreaseCount}/> },
        { path: 'cart', element: <Cart cartItems={cartItems} setCartItems={setCartItems}/> },
        { path: 'account', element: <Account /> }
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
