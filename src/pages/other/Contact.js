import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";

const Contact = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Contact", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            {/*<div className="contact-map mb-10">*/}
            {/*  <GoogleMap lat={47.444} lng={-122.176} />*/}
            {/*</div>*/}
            <div className="custom-row-2">
              <div className="col-12 col-lg-12 col-md-5">
                <div className="contact-info-wrap">
                  <h3 className="text-center mb-5">Contact US</h3>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="tel:01097095362">01097095362</a>
                      </p>
                    </div>
                  </div>
                  {/*<div className="single-contact-info">*/}
                  {/*  <div className="contact-icon">*/}
                  {/*    <i className="fa fa-globe" />*/}
                  {/*  </div>*/}
                  {/*  <div className="contact-info-dec">*/}
                  {/*    <p>*/}
                  {/*      <a href="mailto:yourname@email.com">*/}
                  {/*        yourname@email.com*/}
                  {/*      </a>*/}
                  {/*    </p>*/}
                  {/*    <p>*/}
                  {/*      <a href="https://yourwebsitename.com">*/}
                  {/*        yourwebsitename.com*/}
                  {/*      </a>*/}
                  {/*    </p>*/}
                  {/*  </div>*/}
                  {/*</div>*/}
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>EGYPT </p>
                      <p>Cairo Nasr City</p>
                    </div>
                  </div>
                  <div className="contact-social">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="https://web.facebook.com/doma.egypt">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.instagram.com/doma.eg/">
                          <i className="fa fa-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/@DOMA-EG">
                          <i className="fa fa-youtube" />
                        </a>
                      </li>
                      <li>
                        <a href="https://www.tiktok.com/@doma.eg?_t=8pnRRHZMNKq&_r=1">
                          <i className="fa fa-camera" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*<div className="col-12 col-lg-8 col-md-7">*/}
              {/*  <div className="contact-form">*/}
              {/*    <div className="contact-title mb-30">*/}
              {/*      <h2>Get In Touch</h2>*/}
              {/*    </div>*/}
              {/*    <form className="contact-form-style">*/}
              {/*      <div className="row">*/}
              {/*        <div className="col-lg-6">*/}
              {/*          <input name="name" placeholder="Name*" type="text" />*/}
              {/*        </div>*/}
              {/*        <div className="col-lg-6">*/}
              {/*          <input name="email" placeholder="Email*" type="email" />*/}
              {/*        </div>*/}
              {/*        <div className="col-lg-12">*/}
              {/*          <input*/}
              {/*            name="subject"*/}
              {/*            placeholder="Subject*"*/}
              {/*            type="text"*/}
              {/*          />*/}
              {/*        </div>*/}
              {/*        <div className="col-lg-12">*/}
              {/*          <textarea*/}
              {/*            name="message"*/}
              {/*            placeholder="Your Message*"*/}
              {/*            defaultValue={""}*/}
              {/*          />*/}
              {/*          <button className="submit" type="submit">*/}
              {/*            SEND*/}
              {/*          </button>*/}
              {/*        </div>*/}
              {/*      </div>*/}
              {/*    </form>*/}
              {/*    <p className="form-message" />*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
