import { Fragment } from 'react'
import SEO from '../../../components/seo'
import { useForm } from 'react-hook-form'
import { useProducts } from './use-Products'
import { useNavigate } from 'react-router-dom'

const ProductForm = () => {
  const { register, reset, handleSubmit, formState } = useForm()
  const { errors } = formState
  const navigate = useNavigate()
  const { addProduct } = useProducts()

  const submitOrder = (data) => {
    addProduct(data).then((res) => {
      reset()
      navigate('/admin/products')
    })
  }
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
                {...register('name', {
                  required: 'This field Is Required!',
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
                {...register('price', {
                  required: 'This field Is Required!',
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
                {...register('stock', {
                  required: 'This field Is Required!',
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
              <input {...register('discount')} type="number" />
            </div>
          </div>
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="additional-info-wrap">
              <div className="additional-info">
                <label>Description</label>
                <textarea name="message" {...register('shortDescription')} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 billing-info-wrap">
            <div className="additional-info-wrap">
              <div className="additional-info">
                <label>Full Description</label>
                <textarea name="message" {...register('fullDescription')} />
              </div>
            </div>
          </div>
          <div className="col-lg-12 mt-5">
            <button className="main-button" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}

export default ProductForm
