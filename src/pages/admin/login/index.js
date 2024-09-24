import SEO from "../../../components/seo";
import React, { Fragment } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "./useLogin";

const AdminLogin = () => {
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const { login } = useLogin();

  return (
    <Fragment>
      <SEO titleTemplate="Admin - Login" description="admin Login" />

      <div className="login-register-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-12 ms-auto me-auto">
              <div className="login-register-wrapper">
                <Tab.Container defaultActiveKey="login">
                  <Nav variant="pills" className="login-register-tab-list">
                    <Nav.Item>
                      <Nav.Link eventKey="login">
                        <h4>Login</h4>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="login">
                      <div className="login-form-container">
                        <div className="login-register-form">
                          <form onSubmit={handleSubmit(login)}>
                            <input
                              type="text"
                              name="email"
                              placeholder="Email"
                              className="mb-3"
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            {errors.email && (
                              <span className="input-error-label mb-2">
                                {errors.email.message}
                              </span>
                            )}
                            <input
                              type="password"
                              name="password"
                              className="mb-1"
                              placeholder="Password"
                              {...register("password", {
                                required: "Password is required",
                              })}
                            />
                            {errors.password && (
                              <span className="input-error-label mb-2">
                                {errors.password.message}
                              </span>
                            )}
                            <div className="button-box mt-3">
                              <button type="submit">
                                <span>Login</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminLogin;
