import { Fragment, useState } from "react";
import SEO from "../../../components/seo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useOrders } from "./use-orders";
import moment from "moment";

const OrderList = () => {
  let { pathname } = useLocation();
  const { orders, deleteOrder } = useOrders();
  const navigate = useNavigate();

  // State to track the currently expanded order
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Handler to toggle the visibility of the nested table
  const handleViewClick = (orderId) => {
    // setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    navigate(`/admin/orders/${orderId}`);
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
                    <td>{orderItem.status}</td>

                    <td>
                      <div className="d-flex justify-content-center gap-4">
                        <i
                          onClick={() => handleViewClick(orderItem._id)}
                          className="fa fa-eye"
                        ></i>

                        <i
                          onClick={() => deleteOrder(orderItem._id)}
                          className="fa fa-times"
                        ></i>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
          {!orders.length && (
            <div className="text-center container mt-4 bg-aqua p-4 rounded">
              No Orders Found!!...
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
