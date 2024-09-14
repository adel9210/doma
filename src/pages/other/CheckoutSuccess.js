import {Link, useLocation} from "react-router-dom";
import SEO from "../../components/seo";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {Fragment} from "react";
import LayoutOne from "../../layouts/LayoutOne";

 const CheckoutSuccess = ()=> {
     let { pathname } = useLocation();

     return <Fragment>
         <SEO
             titleTemplate="Checkout"
             description="Checkout page of flone react minimalist eCommerce template."
         />
         <LayoutOne headerTop="visible">
             {/* breadcrumb */}
             <Breadcrumb
                 pages={[
                     {label: "Home", path: process.env.PUBLIC_URL + "/" },
                     {label: "Checkout Success", path: process.env.PUBLIC_URL + pathname }
                 ]}
             />

             <div className='checkout-area pt-95 pb-100'>
                 <div className='container'>
                     <div className="row">
                         <div className="col-lg-12">
                             <div className="item-empty-area text-center">
                                 <div className="item-empty-area__icon mb-30">
                                     <i className="pe-7s-check"></i>
                                 </div>
                                 <div className="item-empty-area__text">
                                     Thanks for submitting the order. We have received it and will start shipping soon.<br/>{" "}
                                     <Link to={process.env.PUBLIC_URL + "/"}>
                                         Home
                                     </Link>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </LayoutOne>
     </Fragment>
 }

export default CheckoutSuccess