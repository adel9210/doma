import { Fragment, useState } from "react";
import SEO from "../../../components/seo";
import { useForm } from "react-hook-form";
import { useProducts } from "./use-Products";
import { useNavigate } from "react-router-dom";
import { setActiveSort } from "../../../helpers/product";

const categoriesList = [
  {
    name: "all",
    value: "all",
  },
  {
    name: "car",
    value: "car",
  },
  {
    name: "big",
    value: "big",
  },
];

const ProductForm = () => {
  const { register, reset, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const uploadedImages = watch("images");
  const { addProduct } = useProducts();
  const [categories, setCategories] = useState([]);

  const submitOrder = (data) => {
    addProduct(data).then((res) => {
      reset();
      navigate("/admin/products");
    });
  };
  return (
    <Fragment>
      <SEO titleTemplate="Admin - Products" description="admin products" />

      <div className="cart-main-area pb-100">
        <h4>Add Product</h4>
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
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="billing-info mb-20">
              <label>Price</label>
              <input
                {...register("price", {
                  required: "This field Is Required!",
                })}
                type="number"
              />
              {errors.price && (
                <span className="input-error-label">
                  {errors.price.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="billing-info mb-20">
              <label>Stock</label>
              <input
                {...register("stock", {
                  required: "This field Is Required!",
                })}
                type="number"
              />
              {errors.stock && (
                <span className="input-error-label">
                  {errors.stock.message}
                </span>
              )}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="billing-info mb-20">
              <label>Discount</label>
              <input {...register("discount")} type="number" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="billing-info billing-select mb-20">
              <div className="billing-info mb-20">
                <label>Rating</label>
                <input
                  {...register("rating", {
                    valueAsNumber: true,
                    max: {
                      value: 5,
                      message: "Max Rating is 5",
                    },
                  })}
                  type="number"
                />
                {errors.rating && (
                  <span className="input-error-label">
                    {errors.rating.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="billing-info billing-select mb-20">
              <label>New?</label>
              <select
                className="select"
                {...register("isNewProduct", {
                  required: "This Field Is Required",
                })}
              >
                <option value="true">New</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="col-lg-12 col-md-12 billing-info-wrap">
            <div className="billing-info billing-select mb-20">
              <div className="sidebar-widget">
                <h5>Category</h5>
                <div className="sidebar-widget-list">
                  <ul className="d-flex gap-4">
                    {categoriesList.map((category, key) => {
                      return (
                        <li key={key}>
                          <div className="sidebar-widget-list-left">
                            <button
                              className={
                                categories.includes(category.value)
                                  ? "active"
                                  : ""
                              }
                              type="button"
                              onClick={(e) => {
                                setCategories((prev) => {
                                  if (prev.includes(category.value)) {
                                    return prev.filter(
                                      (item) => item !== category.value,
                                    );
                                  }
                                  return [...prev, category.value];
                                });
                              }}
                            >
                              <span className="checkmark" /> {category.name}
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="additional-info-wrap">
              <div className="additional-info">
                <label>Description</label>
                <textarea name="message" {...register("shortDescription")} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="additional-info-wrap">
              <div className="additional-info">
                <label>Full Description</label>
                <textarea name="message" {...register("fullDescription")} />
              </div>
            </div>
          </div>
          <div className="col-lg-12 col-md-6 billing-info-wra">
            {/* upload inputs will be 5 inputs  */}
            <div className="additional-info-wrap">
              <div className="additional-info">
                <label className="upload-images-label" htmlFor="images">
                  Upload Images
                </label>
                <input
                  type="file"
                  hidden={true}
                  id="images"
                  accept="image/jpeg, image/png, image/gif"
                  multiple
                  {...register("images", {
                    required: "This field Is Required!",
                  })}
                />
                {errors.images && (
                  <span className="input-error-label">
                    {errors.images.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="uploaded-images">
            {uploadedImages?.length ? (
              [...uploadedImages]?.map((image, index) => {
                return (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`uploaded image ${index}`}
                    className="uploaded-image"
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div className="col-lg-12 mt-5">
            <button className="main-button" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ProductForm;
