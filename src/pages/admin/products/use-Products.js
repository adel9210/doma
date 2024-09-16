import { useEffect, useState } from 'react'
import axios from '../../../core/http-config'

export const useProducts = () => {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const res = await axios.get('/products')
    setProducts(res.data)
  }

  const addProduct = async (product) => {
    await axios.post('/products', product)
    await getProducts()
  }

  const removeProduct = async (id) => {
    await axios.delete(`/products/${id}`)
    await getProducts()
  }

  useEffect(() => {
    getProducts().then()
  }, [])

  return {
    products,
    addProduct,
    removeProduct,
  }
}
