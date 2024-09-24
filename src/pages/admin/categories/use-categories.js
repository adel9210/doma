import { useEffect, useState } from "react";
import axios from "../../../core/http-config";
import { useNavigate } from "react-router-dom";
import data from "bootstrap/js/src/dom/data";

const UseCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = () => {
    (async () => {
      try {
        const response = await axios("categories");
        const data = await response.data;
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const addCategory = async (data) => {
    try {
      const response = await axios.post("categories", data);
      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
    }
  };

  const removeCategory = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (!confirm) {
      return;
    }

    try {
      const response = await axios.delete(`categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const getCategoryItem = async (id) => {
    try {
      const response = await axios.get(`categories/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, addCategory, removeCategory, getCategoryItem };
};

export default UseCategories;
