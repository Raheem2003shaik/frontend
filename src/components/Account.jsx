/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

function Account() {
  const [orders, setOrders] = useState([]);

  async function fetchUserOrders() {
    try {
        const userId=localStorage.getItem('authToken');
        const response = await fetch(`/api/${userId}/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        const orders = await response.json();
        setOrders(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
}
  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
<div className="p-4">
  <div className="mt-4">
    <h2 className="text-xl font-semibold">My Orders</h2>
    {orders.length > 0 ? (
      <ul>
        {orders.map((order, index) => (
          <li key={index} className="border p-2 mb-2">
            <p>Contents: 
              {order.orderList.map((item, idx) => (
                <span key={idx}>
                  {item.name}{idx < order.orderList.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
            <p>Order Cost: ${order.totalCost}</p>
            <p>Order Date: {new Date(order.orderDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No orders placed yet.</p>
    )}
  </div>
</div>

  );
}

export default Account;
