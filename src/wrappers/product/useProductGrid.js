import { useEffect, useState } from "react";
import axios from "../../core/http-config";
import { setProducts } from "../../store/slices/product-slice";
import { useDispatch } from "react-redux";

const useProductGrid = () => {
  const [products, setProductsList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await axios.get("/products");
      setProductsList(res.data);
      dispatch(setProducts(res.data));
    })();
  }, []);

  return {
    products,
  };
};

export default useProductGrid;
