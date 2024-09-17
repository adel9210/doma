import cogoToast from "cogo-toast";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../core/http-config";

export function useCheckout() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const sendWhatsAppMessage = async (formData) => {
    const orderSummary = `
                    Hello Sameh,
                    Please check your new order                   
                      **اسم العميل:**
                      ${formData.firstName} ${formData.lastName} 
                    ** المحافظه:**
                    ${formData.government}
                    **عنوان العميل:**
                    ${formData.address}
                    **رقم العميل:**
                    ${formData.phone}`;

    const requestData = { to: "+201121971665", body: orderSummary };
    const response = await axios.post(
      "https://adel-3421.twil.io/send",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  };

  async function placeOrder(formData, order) {
    addOrder(formData, order).then((res) => {
      navigate("/checkout-success");
      dispatch(deleteAllFromCart());
      cogoToast.success("Order Submitted Successfully!", {
        position: "top-left",
      });
      sendWhatsAppMessage(formData);
    });
  }

  const addOrder = async (formData, orderData) => {
    try {
      const response = await axios.post("/orders", {
        customerName: formData.firstName + " " + formData.lastName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        products: orderData.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
          price: item.price,
          productName: item.name,
        })),
      });
      return response.data;
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  };

  return {
    placeOrder,
    isLoading,
  };
}
