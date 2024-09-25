import { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import HeaderOne from "../../wrappers/header/HeaderOne";
import { useSelector } from "react-redux";

function AdminLayout() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/admin");
    }
  }, []);

  return (
    <Fragment>
      <SEO titleTemplate="Admin - Products" description="admin products" />

      <HeaderOne />
      <div className="container bg-white border-top">
        <div className="row">
          {user && (
            <div className="col-lg-2 order-2 order-lg-1 bg-gray-7 p-3 d-print-none">
              <ul className="product-layout-items mt-4">
                <li>
                  <i className="pe-7s-cart"></i>
                  <Link to={"/admin/products"}>Products</Link>
                </li>
                <li>
                  <i className="pe-7s-shopbag"></i>
                  <Link to={"/admin/orders"}>Orders</Link>
                </li>
                <li>
                  <i className="pe-7s-config"></i>
                  <Link to={"/admin/categories"}>Categories</Link>
                </li>
              </ul>
            </div>
          )}
          <div
            className={`order-1 order-lg-2 mt-4 ${user ? "col-lg-10" : "col-lg-12"}`}
          >
            <Outlet />
          </div>
        </div>
      </div>
      {/*</LayoutOne>*/}
    </Fragment>
  );
}

export default AdminLayout;
