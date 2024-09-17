import { Fragment, useState } from "react";
import SEO from "../../../components/seo";
import { Link, useLocation } from "react-router-dom";
import { useOrders } from "./use-orders";
import moment from "moment";

const OrderList = () => {
  let { pathname } = useLocation();
  const { orders, deleteOrder } = useOrders();

  // State to track the currently expanded order
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Handler to toggle the visibility of the nested table
  const handleViewClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <Fragment>
      <SEO titleTemplate="Admin - Orders" description="admin orders" />

      <div className="cart-main-area pb-100">
        <div className="d-flex justify-content-end"></div>
        <div className="table-content table-responsive cart-table-content">
          <table className="w-100">
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Customer Phone</th>
                <th>Customer Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orderItem, key) => (
                <Fragment key={key}>
                  <tr>
                    <td>
                      {orderItem.orderDate
                        ? moment(orderItem.orderDate).format(
                            "DD-MM-YYYY HH:mm:ss",
                          )
                        : ""}
                    </td>
                    <td>{orderItem.customerName}</td>
                    <td>{orderItem.customerPhone}</td>
                    <td>{orderItem.customerAddress}</td>

                    <td>{orderItem.status}</td>

                    <td>
                      <button onClick={() => handleViewClick(orderItem._id)}>
                        {expandedOrderId === orderItem._id
                          ? "Hide Details"
                          : "View"}
                      </button>
                      <hr />
                      <button onClick={() => deleteOrder(orderItem._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedOrderId === orderItem._id && (
                    <tr>
                      <td colSpan="7" className="p-2">
                        <div className="table-responsive">
                          <table className="w-100 nested-table">
                            <thead>
                              <tr style={{ backgroundColor: "#d9dfe9" }}>
                                <th>ID</th>
                                <th>Quantity</th>
                                <th>Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {orderItem.products.map((product, index) => (
                                <tr key={index}>
                                  <td>
                                    <Link
                                      target="_blank"
                                      to={`/product/${product.productId}`}
                                    >
                                      {product.productName}
                                    </Link>
                                  </td>
                                  <td>{product.quantity}</td>
                                  <td>{product.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
