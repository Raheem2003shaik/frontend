/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

function Products({ cartItems, handleAddToCart, handleIncreaseCount, handleDecreaseCount }) {
  return (
    <>
      <div className='flex flex-wrap gap-4 justify-center w-screen'>
        {cartItems.map((medicine, ind) => (
          <div
            key={ind}
            className='w-[300px] h-auto p-4 flex flex-col mt-5 items-center border-slate-900 border-2 rounded-2xl'
          >
            <img src={medicine.imgUrl} alt={medicine.name} className="h-[150px] w-[150px] object-cover"/>
            <h1 className='mt-2 font-bold text-white-700 tracking-widest text-[20px]'>
              {medicine.name}
            </h1>
            <h2 className='text-[15px] tracking-widest font-semibold'>
              {"Price:"} ₹{medicine.price}/-
            </h2>
            <p className='text-white-500 text-[13px]'>
              Tablets per Sheet: {medicine.tabletsPerSheet + " (" + medicine.dosage + ")"}
            </p>
            {medicine.count === 0 ? (
              <button
                className='mt-3 px-5 py-2 rounded-lg bg-orange-600 text-white'
                onClick={() => handleAddToCart(medicine.id)}
              >
                Add to Cart
              </button>
            ) : (
              <div className='flex items-center mt-3'>
                <button
                  className='px-3 py-1 text-[22px] rounded-lg text-black font-bold'
                  onClick={() => handleDecreaseCount(medicine.id)}
                >
                  -
                </button>
                <span className='mx-4 text-lg font-bold text-green-600'>{medicine.count}</span>
                <button
                  className='px-3 py-1 text-[22px] rounded-lg text-black font-bold'
                  onClick={() => handleIncreaseCount(medicine.id)}
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
