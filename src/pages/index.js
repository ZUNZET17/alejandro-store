import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from 'react';
const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/shopify');
        const data = await response.json();
        console.log('data', data)
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Orders:</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div key={order.node.id} className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold">Order ID: {order.node.id}</h3>
            <p>Created Date: {order.node.createdAt}</p>
            <div className="grid grid-cols-1 gap-2">
              {order.node.lineItems.edges.map((lineItem) => (
                <div key={lineItem.node.title} className="flex items-center">
                    <Image
                      src={lineItem.node.customAttributes[1] ? lineItem.node.customAttributes[1].value : lineItem.node.image.url}
                      width={500}
                      height={500}
                      alt="Picture of the author"
                    />
                  <div>
                    <p>{lineItem.node.title}</p>
                    <p>Quantity: {lineItem.node.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
