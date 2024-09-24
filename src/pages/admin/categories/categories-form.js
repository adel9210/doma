import { Fragment, useEffect, useState } from "react";
import SEO from "../../../components/seo";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useCategories from "../categories/use-categories";

const CategoryForm = () => {
  const { register, reset, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;
  const { addCategory, getCategoryItem } = useCategories();

  useEffect(() => {
    if (categoryId) {
      (async () => {
        const category = await getCategoryItem(categoryId);
        reset(category);
      })();
    }
  }, [categoryId]);

  const submitOrder = async (data) => {
    if (!categoryId) {
      await addCategory(data);
      navigate("/admin/categories");
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Admin - Products" description="admin products" />

      <div className="cart-main-area pb-100">
        <h4>{categoryId ? "Edit Category" : "Add Category"}</h4>
        <form onSubmit={handleSubmit(submitOrder)} className="row">
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="billing-info mb-20">
              <label>Name</label>
              <input
                {...register("name", {
                  required: "This field Is Required!",
                })}
                type="text"
              />
              {errors.name && (
                <span className="input-error-label">{errors.name.message}</span>
              )}
            </div>
          </div>
          <div className="col-lg-12 mt-5">
            <button className="main-button" type="submit">
              {categoryId ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default CategoryForm;
