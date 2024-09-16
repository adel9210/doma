import { Fragment } from 'react'
import SEO from '../../components/seo'
import LayoutOne from '../../layouts/LayoutOne'
import { Link, Outlet, useLocation } from 'react-router-dom'

function AdminLayout() {
  let { pathname } = useLocation()

  return (
    <Fragment>
      <SEO titleTemplate="Admin - Products" description="admin products" />

      <LayoutOne headerTop="visible">
        <div className="container bg-white border-top pt-4">
          <div className="row">
            <div className="col-lg-2 order-2 order-lg-1 bg-gray-7 p-3">
              <ul className="product-layout-items">
                <li>
                  <i className="pe-7s-cart"></i>
                  <Link to={'/admin/products'}>Products</Link>
                </li>
                <li>
                  <i className="pe-7s-shopbag"></i>
                  <Link to={pathname + '/orders'}>Orders</Link>
                </li>
              </ul>
            </div>
            <div className="col-lg-10 order-1 order-lg-2">
              <Outlet />
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}
export default AdminLayout
