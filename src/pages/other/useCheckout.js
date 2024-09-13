import axios from "axios";
import cogoToast from "cogo-toast";
import {deleteAllFromCart} from "../../store/slices/cart-slice";
import {useDispatch} from "react-redux";

export function useCheckout(){
    const dispatch = useDispatch();

    async function sendWhatsAppMessage(formData, order) {
        const orderSummary = `
                    Hello Sameh,
                    
                    Please check your new order
                    
                    **اسم المنتج:**
                    - **${order.name}
                    - **العدد** ${order.quantity}
                      **اسم العميل:**
                      ${formData.firstName} ${formData.lastName} 
                    **عنوان العميل:**
                    ${formData.address}
                    **رقم العميل:**
                    ${formData.phone}
                   
`;

        const requestData = { to:'+201121971665', body:orderSummary }
            const response = await axios.post('https://adel-3421.twil.io/send', JSON.stringify(requestData), {
                headers: {
                    'Content-Type': 'application/json',
                }
            } );

            if (response.data?.body){
                dispatch(deleteAllFromCart());
                cogoToast.success("Order Submitted Successfully!", {position: "bottom-left"});
            }


    }

    return {
        sendWhatsAppMessage
    }

}