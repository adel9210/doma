import { Fragment, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDiscountPrice } from '../../helpers/product'
import SEO from '../../components/seo'
import LayoutOne from '../../layouts/LayoutOne'
import Breadcrumb from '../../wrappers/breadcrumb/Breadcrumb'
import { useCheckout } from './useCheckout'
import { useForm } from 'react-hook-form'
import governments from '../../data/egypt-government.json'

const Checkout = () => {
  let cartTotalPrice = 0

  let { pathname } = useLocation()
  const currency = useSelector((state) => state.currency)
  const { cartItems } = useSelector((state) => state.cart)
  const { sendWhatsAppMessage, isLoading } = useCheckout()
  const { register, handleSubmit, formState } = useForm()
  const { errors } = formState

  const handlePlaceOrder = (data) => {
    sendWhatsAppMessage(data, cartItems[0]).then()
  }

  console.log(errors)
  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: 'Home', path: process.env.PUBLIC_URL + '/' },
            { label: 'Checkout', path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form onSubmit={handleSubmit(handlePlaceOrder)} className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            {...register('firstName', {
                              required: 'This field Is Required!',
                            })}
                            type="text"
                          />
                          {errors.firstName && (
                            <span className="input-error-label">
                              {errors.firstName.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            {...register('lastName', {
                              required: 'This Field Is Required',
                            })}
                            type="text"
                          />
                          {errors.lastName && (
                            <span className="input-error-label">
                              {errors.lastName.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Government</label>
                          <select
                            {...register('government', {
                              required: 'This Field Is Required',
                            })}
                          >
                            <option>Select a country</option>
                            {governments.map((item) => (
                              <option
                                value={item.governorate_name_en}
                                key={item.governorate_name_en}
                              >
                                {item.governorate_name_en}
                              </option>
                            ))}
                          </select>
                          {errors.government && (
                            <span className="input-error-label">
                              {errors.government.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            placeholder="House number and street name"
                            type="text"
                            {...register('address', {
                              required: 'This Field Is Required',
                            })}
                          />
                          {errors.address && (
                            <span className="input-error-label">
                              {errors.address.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            {...register('phone', {
                              required: 'This Field Is Required',
                              pattern: {
                                value: /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
                                message: 'Invalid phone number',
                              },
                            })}
                            type="text"
                          />
                          {errors.phone && (
                            <span className="input-error-label">
                              {errors.phone.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input
                            {...register('email', {
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email address',
                              },
                            })}
                            type="text"
                          />
                          {errors.email && (
                            <span className="input-error-label">
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Additional information</h4>
                      <div className="additional-info">
                        <label>Order notes</label>
                        <textarea
                          placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          {...register('notes')}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              )
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2)
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2)

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity)
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{' '}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? currency.currencySymbol +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                        {/*<div className="your-order-bottom">*/}
                        {/*  <ul>*/}
                        {/*    <li className="your-order-shipping">Shipping</li>*/}
                        {/*    <li>50</li>*/}
                        {/*  </ul>*/}
                        {/*</div>*/}
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {currency.currencySymbol +
                                ' ' +
                                cartTotalPrice.toFixed(2)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="btn-hover"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{' '}
                      <Link to={process.env.PUBLIC_URL + '/shop-grid-standard'}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  )
}

export default Checkout
