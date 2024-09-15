import axios from 'axios'
import cogoToast from 'cogo-toast'
import { deleteAllFromCart } from '../../store/slices/cart-slice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useCheckout() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  async function sendWhatsAppMessage(formData, order) {
    setIsLoading(true)
    const orderSummary = `
                    Hello Sameh,
                  
                    Please check your new order
                    
                    **اسم المنتج:**
                    - **${order.name}
                    - **العدد** ${order.quantity}
                      **اسم العميل:**
                      ${formData.firstName} ${formData.lastName} 
                    ** المحافظه:**
                    ${formData.government}
                    **عنوان العميل:**
                    ${formData.address}
                    **رقم العميل:**
                    ${formData.phone}`

    const requestData = { to: '+201121971665', body: orderSummary }
    const response = await axios.post(
      'https://adel-3421.twil.io/send',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    setIsLoading(false)
    if (response.data?.success) {
      navigate('/checkout-success')
      dispatch(deleteAllFromCart())
      cogoToast.success('Order Submitted Successfully!', {
        position: 'top-left',
      })
    }
  }

  return {
    sendWhatsAppMessage,
    isLoading,
  }
}
