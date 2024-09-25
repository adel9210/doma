import { Fragment, useEffect, useState } from "react";
import SEO from "../../../components/seo";
import { useForm } from "react-hook-form";
import { useProducts } from "./use-Products";
import { useNavigate, useParams } from "react-router-dom";
import cogoToast from "cogo-toast";
import useCategories from "../categories/use-categories";

const ProductForm = () => {
  const { register, reset, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const uploadedImages = watch("images");
  const productImages = watch("image");
  const { addProduct, getProductItem, deleteImage, updateProduct } =
    useProducts();
  const [categories, setCategories] = useState([]);
  const params = useParams();
  const productId = params.id;
  const { categories: categoriesList } = useCategories();

  useEffect(() => {
    if (productId) {
      (async () => {
        const product = await getProductItem(productId);
        reset(product);
        setCategories(product.category);
      })();
    }
  }, [productId]);

  const deleteImageHandler = async (filename) => {
    const result = await deleteImage(filename);
    if (result) {
      // show toast message
      cogoToast.success("Image deleted successfully", {
        position: "top-right",
      });
      navigate("/admin/products");
    }
  };

  const submitOrder = async (data) => {
    if (productId) {
      await updateProduct(productId, { ...data, category: categories });
    } else {
      await addProduct({ ...data, category: categories });
    }
    navigate("/admin/products");
  };
  return (
    <Fragment>
      <SEO titleTemplate="Admin - Products" description="admin products" />

      <div className="cart-main-area pb-100">
        <h4>{productId ? "Edit Product" : "Add Product"}</h4>
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
            <div className="billing-info mb-20">
              <label>Youtube URL</label>
              <input {...register("youtubeURL")} type="text" />
            </div>
          </div>
          <div className="col-lg-12 col-md-12 billing-info-wrap">
            <div className="billing-info billing-select mb-20">
              <div className="sidebar-widget">
                <h5>Category</h5>
                <div className="sidebar-widget-list">
                  <ul className="d-flex gap-4">
                    {categoriesList?.map((category, key) => {
                      return (
                        <li key={key}>
                          <div className="sidebar-widget-list-left">
                            <button
                              className={
                                categories.includes(category.name)
                                  ? "active"
                                  : ""
                              }
                              type="button"
                              onClick={(e) => {
                                setCategories((prev) => {
                                  if (prev.includes(category.name)) {
                                    return prev.filter(
                                      (item) => item !== category.name,
                                    );
                                  }
                                  return [...prev, category.name];
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
                    required: productId ? false : "This field Is Required!",
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

          {productId ? (
            <div className="uploaded-images">
              {productImages?.length ? (
                [...productImages]?.map((image, index) => {
                  return (
                    <div className="image-wrapper">
                      <i
                        onClick={() => deleteImageHandler(image.filename)}
                        className="delete-image fa fa-times"
                      ></i>
                      <img
                        key={index}
                        src={image.path}
                        alt={`uploaded image ${index}`}
                        className="uploaded-image"
                      />
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          ) : (
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
          )}
          <div className="col-lg-12 mt-5">
            <button className="main-button" type="submit">
              {productId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ProductForm;
