import { Fragment } from "react";
import SEO from "../../../components/seo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCategories from "./use-categories";

const CategoriesList = () => {
  const { categories, removeCategory } = useCategories();

  return (
    <Fragment>
      <SEO titleTemplate="Admin - Products" description="admin products" />

      <div className="cart-main-area pb-100">
        <div className="d-flex justify-content-end">
          <button className="main-button mb-3" type="submit">
            <Link
              className='className="main-button mb-3'
              to={"/admin/categories/add"}
            >
              Add Category
            </Link>
          </button>
        </div>
        <div className="table-content table-responsive cart-table-content">
          <table className="w-100">
            <thead>
              <tr>
                <th>#</th>
                <th>Category Name </th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length &&
                categories.map((category, key) => {
                  return (
                    <tr key={key}>
                      <td className="product-thumbnail">{key + 1}</td>
                      <td className="product-thumbnail">{category.name}</td>
                      <td className="product-remove">
                        <button onClick={() => removeCategory(category._id)}>
                          <i className="fa fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {!categories.length && (
          <div className="text-center container mt-4 bg-aqua p-4 rounded">
            No Categories Found!!...
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CategoriesList;
