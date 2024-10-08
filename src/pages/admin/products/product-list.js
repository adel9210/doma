import { Fragment } from "react";
import SEO from "../../../components/seo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getDiscountPrice } from "../../../helpers/product";
import { useProducts } from "./use-Products";
import { useSelector } from "react-redux";
import NoProductsSkeleton from "../../../components/NoProductsSkelaton";

const ProductList = () => {
  let { pathname } = useLocation();
  const { products, removeProduct } = useProducts();
  let cartTotalPrice = 0;
  const currency = useSelector((state) => state.currency);
  const navigate = useNavigate();
  const editProduct = (id) => {
    navigate(pathname + "/edit/" + id);
  };

  return (
    <Fragment>
      <SEO titleTemplate="Admin - Products" description="admin products" />

      <div className="cart-main-area pb-100">
        <div className="d-flex justify-content-end">
          <button className="main-button mb-3" type="submit">
            <Link
              className='className="main-button mb-3'
              to={pathname + "/add"}
            >
              Add Product
            </Link>
          </button>
        </div>
        <div className="table-content table-responsive cart-table-content">
          <table className="w-100">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((productItem, key) => {
                const discountedPrice = getDiscountPrice(
                  productItem.price,
                  productItem.discount,
                );
                const finalProductPrice = (
                  productItem.price * currency.currencyRate
                ).toFixed(2);
                const finalDiscountedPrice = (
                  discountedPrice * currency.currencyRate
                ).toFixed(2);

                discountedPrice != null
                  ? (cartTotalPrice +=
                      finalDiscountedPrice * productItem.quantity)
                  : (cartTotalPrice +=
                      finalProductPrice * productItem.quantity);
                return (
                  <tr key={key}>
                    <td className="product-thumbnail">
                      <Link
                        to={
                          process.env.PUBLIC_URL + "/product/" + productItem._id
                        }
                      >
                        <img
                          className="img-fluid"
                          src={productItem.image[0].path}
                          alt=""
                        />
                      </Link>
                    </td>
                    <td className="product-name">
                      <Link
                        to={
                          process.env.PUBLIC_URL + "/product/" + productItem._id
                        }
                      >
                        {productItem.name}
                      </Link>
                    </td>
                    <td className="product-price-cart">
                      {discountedPrice !== null ? (
                        <Fragment>
                          <span className="amount old">
                            {currency.currencySymbol + finalProductPrice}
                          </span>
                          <span className="amount">
                            {currency.currencySymbol + finalDiscountedPrice}
                          </span>
                        </Fragment>
                      ) : (
                        <span className="amount">
                          {currency.currencySymbol + finalProductPrice}
                        </span>
                      )}
                    </td>
                    <td>{productItem.stock}</td>
                    <td className="product-remove">
                      <button onClick={() => removeProduct(productItem._id)}>
                        <i className="fa fa-times"></i>
                      </button>

                      <button onClick={() => editProduct(productItem._id)}>
                        <i className="fa fa-pencil"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!products.length && <NoProductsSkeleton />}
      </div>
    </Fragment>
  );
};

export default ProductList;
