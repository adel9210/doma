import React, { useEffect, useState } from "react";
import { useOrders } from "./use-orders";
import { Link, useParams } from "react-router-dom";

const OrderDetails = () => {
  const { getOrderItem } = useOrders();
  const [order, setOrder] = useState(null);
  const params = useParams();
  const orderId = params.id;

  const fetchOrder = async () => {
    const fetchedOrder = await getOrderItem(orderId);
    setOrder(fetchedOrder);
  };
  useEffect(() => {
    fetchOrder().then();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      {/* Invoice Header */}
      <div className="text-end mb-4">
        <h2 className="logo__name">Doma</h2>
        <p className="mb-0">Cairo Nasr City</p>
        <p className="mb-0">Phone: 01097095362</p>
      </div>
      <hr />

      <h3 className="text-center mb-4">Invoice</h3>

      {/* Customer Details */}
      <div className="mb-4">
        <h5>Customer Details</h5>
        <p>
          <strong>Name:</strong> {order.customerName}
        </p>
        <p>
          <strong>Email:</strong> {order.customerEmail}
        </p>
        <p>
          <strong>Phone:</strong> {order.customerPhone}
        </p>
        <p>
          <strong>Address:</strong> {order.customerAddress}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.orderDate).toLocaleDateString()}
        </p>
      </div>

      {/* Order Summary */}
      <div className="mb-4">
        <h5>Order Summary</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product) => (
              <tr key={product.productId}>
                <td>
                  <Link target="_blank" to={`/product/${product.productId}`}>
                    {product.productName}
                  </Link>
                </td>
                <td>{product.quantity}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>{(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mb-4">
        <h5>
          Total:
          {" " +
            order.products
              .reduce(
                (acc, product) => acc + product.price * product.quantity,
                0,
              )
              .toFixed(2)}
        </h5>
      </div>
    </div>
  );
};

export default OrderDetails;
