/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function Cart({ cartItems, setCartItems }) {
  const navigate = useNavigate();
  const {id} = useParams();
  const itemsInCart = cartItems.filter(item => item.count > 0);
  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.count), 0);
  const [addressSaveMessage, setAddressSaveMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderPlacedMessage, setOrderPlacedMessage] = useState('Order Placed!')
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const addressSave = (event) => {
    event.preventDefault();
    setAddressSaveMessage("Address Saved");
    setTimeout(() => setAddressSaveMessage(''), 1500);
  };

  const handleMissingFields=(message)=>{
    toast.error(message);
  }
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const placeOrder = async () => {
    if (itemsInCart.length === 0 || !itemsInCart.some(item => item.count > 0)) {
      handleMissingFields('Please add at least one medicine to your cart.');
      return;
    }
    console.log(itemsInCart);
    const addressInputs = document.querySelectorAll('input[type="text"]');
    const addressFilled = Array.from(addressInputs).every(input => input.value.trim() !== '');
    if (!addressFilled) {
      handleMissingFields('Please add address')
      return;
    }
    if (!selectedPayment) {
      handleMissingFields('Please select at least one payment method.');
      return;
    }
    try{
      const modifiedCartList = itemsInCart.map(({ name, count }) => ({ name, count }));
      const payload = {
        cart: modifiedCartList,
        totalCost: totalCost 
      };
      const response = await fetch(`/api/${id}/place-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if(response.ok){
        toast.success('Order Placed Successfully')
        setTimeout(() => {
            setOrderPlaced(false);
            setCartItems((prevItems) =>
                prevItems.map((item) => ({ ...item, count: 0 }))
            );
            navigate(`/${id}/dashboard/online-buy`);
        }, 2000);
      }
        
    }
    catch(error){
      setOrderPlacedMessage("Error While Place Order")
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
        setOrderPlacedMessage("Order Placed!");
      },2000)
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-8">
        <div className="w-full lg:w-2/3 bg-black shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Medicines in Cart</h2>
          {errorMessage && (
            <div className="bg-red-500 text-white p-2 rounded-lg mb-4">
              {errorMessage}
            </div>
          )}
          <table className="table-auto w-full text-left">
            <thead className="bg-black-200">
              <tr>
                <th className="px-4 py-2">Medicine</th>
                <th className="px-10 py-2">Quantity</th>
                <th className="px-4 py-2">Dosage</th>
                <th className="px-4 py-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {itemsInCart.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">No Medicines in Cart</td>
                </tr>
              ) : (
                itemsInCart.map((item, ind) => (
                  <tr key={ind} className="border-t">
                    <td className="px-4 py-2">
                      <img src={item.imgUrl} alt={item.productName} className="w-16 h-16 object-cover" />
                      <div>{item.name}</div>
                    </td>
                    <td className="px-4 py-2 text-center">{item.count + " (" + item.count * item.tabletsPerSheet + " tablets)"}</td>
                    <td className="px-4 py-2 text-center">{item.dosage}</td>
                    <td className="px-4 py-2 text-center">₹{item.count * item.price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {itemsInCart.length > 0 && (
            <div className="text-right mt-4 font-bold text-lg">
              Total Cost: ₹{totalCost}
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/3 bg-black shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <form className="flex flex-col gap-4" onSubmit={addressSave}>
            <div className='w-full flex justify-center'>
              <h1 className='text-green-400 font-bold'>{addressSaveMessage}</h1>
            </div>
            <input type="text" placeholder="Full Name" className="p-2 border border-gray-300 rounded-lg" required />
            <input type="text" placeholder="Street Address" className="p-2 border border-gray-300 rounded-lg" required />
            <input type="text" placeholder="City" className="p-2 border border-gray-300 rounded-lg" required />
            <input type="text" placeholder="State" className="p-2 border border-gray-300 rounded-lg" required />
            <input type="text" placeholder="Zip Code" className="p-2 border border-gray-300 rounded-lg" required />
            <input type="text" placeholder="Country" className="p-2 border border-gray-300 rounded-lg" required />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4">
              Save Address
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/3 bg-black shadow-lg rounded-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <input type="radio" name="payment" value="creditCard" onChange={handlePaymentChange} id="creditCard" className="mr-2" />
              <label htmlFor="creditCard" className="text-lg">Credit Card</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="payment" value="debitCard" onChange={handlePaymentChange} id="debitCard" className="mr-2" />
              <label htmlFor="debitCard" className="text-lg">Debit Card</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="payment" value="paypal" onChange={handlePaymentChange} id="paypal" className="mr-2" />
              <label htmlFor="paypal" className="text-lg">PayPal</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="payment" value="cod" onChange={handlePaymentChange} id="cod" className="mr-2" />
              <label htmlFor="cod" className="text-lg">Cash on Delivery</label>
            </div>
            <button onClick={placeOrder} className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4">
              Place Order
            </button>
          </div>
        </div>
      </div>
      {orderPlaced && (
        <div className="notification">
          <h2>{orderPlacedMessage}</h2>
          <div className={`underline ${orderPlacedMessage === "Order Placed!" ? "bg-green-400" : "bg-red-400"}`}></div>
        </div>
      )}
      <Toaster/>
    </div>
  );
}

export default Cart;
