import { useEffect, useState } from 'react'
import axios from '../../core/http-config'

const useProductGrid = () => {
  const [products, setProducts] = useState([])

  useEffect(async () => {
    const res = await axios.get('/products')
    setProducts(res.data)
  }, [])

  return {
    products,
  }
}

export default useProductGrid
