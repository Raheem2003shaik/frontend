/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

function UserLayout({ itemsAddedState}) {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="container mx-auto p-6">
        <div className="flex items-center mb-8 space-x-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU06Uvui0W3-h5P35NrF39tBMIsm6ZGQSbYA&s"
            alt="User Profile"
            className="h-[120px] w-[120px] rounded-full border-4 border-gray-700 shadow-lg"
          />
          <div>
            <h1 className="text-4xl font-bold text-blue-400">Welcome, {id}</h1>
            <p className="text-gray-400">Glad to have you here!</p>
          </div>
        </div>
        <nav className="bg-gray-800 p-4 rounded-lg shadow-md">
          <ul className="flex space-x-8 justify-center">
            <li>
              <Link to="online-buy" className="text-gray-300 hover:text-white transition-colors">
                Online Buy
              </Link>
            </li>
            <li>
            <div className='relative'>
              <Link to="cart" className='"text-gray-300 hover:text-white transition-colors'>Cart</Link>
              {itemsAddedState && (
                <div className='absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full'></div>
              )}
            </div>
            </li>
            <li>
              <Link to="account" className="text-gray-300 hover:text-white transition-colors">
                Account
              </Link>
            </li>
          </ul>
          <div className='flex w-full mt-4 justify-center text-yellow-300'><h1>Shop on Online Buy, Add to cart simply buy</h1></div>
        </nav>
        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
