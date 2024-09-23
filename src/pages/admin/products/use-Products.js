import { useEffect, useState } from "react";
import axios from "../../../core/http-config";
import { useDispatch } from "react-redux";
import { setProducts } from "../../../store/slices/product-slice";

export const useProducts = () => {
  const [products, setProductsList] = useState([]);
  const dispatch = useDispatch();
  const getProducts = async () => {
    const res = await axios.get("/products");
    setProductsList(res.data);
    dispatch(setProducts(res.data?.files));
  };

  const addProduct = async (product) => {
    if (product.images) {
      const files = new FormData();
      [...product.images].forEach((image) => {
        files.append("images", image);
      });
      const response = await axios.post("/products/upload-images", files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const images = response.data.files.map((image) => ({
        filename: image.filename,
        path: image.path,
      }));
      delete product.images;
      const addProductResponse = await axios.post("/products", {
        ...product,
        image: images,
      });
    }

    // await getProducts()
  };

  const getProductItem = async (id) => {
    const res = await axios.get(`/products/${id}`);
    return res.data;
  };

  const removeProduct = async (id) => {
    const result = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (result) {
      await axios.delete(`/products/${id}`);
      await getProducts();
    }
  };

  const deleteImage = async (filename) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this image?",
    );
    if (!confirm) return;
    await axios.delete(`/products/delete-image/${filename}`);
  };

  const updateProduct = async (id, product) => {
    console.log("product", product);
    const updatedData = { ...product };
    delete updatedData.images;
    await axios.put(`/products/${id}`, updatedData);
  };

  useEffect(() => {
    getProducts().then();
  }, []);

  return {
    products,
    addProduct,
    removeProduct,
    updateProduct,
    getProductItem,
    deleteImage,
  };
};
