import { useEffect, useState } from "react";
import axios from "../../../core/http-config";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../store/slices/product-slice";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const response = await axios.get("/orders");
    setOrders(response.data);
  };

  const deleteOrder = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this order?",
    );
    if (confirm) {
      await axios.delete(`/orders/${id}`);
      await getOrders();
    }
  };

  useEffect(() => {
    getOrders().then();
  }, []);

  return {
    orders,
    deleteOrder,
  };
};
