import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const PlaceOrderScreen = (props) => {
  const cart = useSelector(state => state.cart);
  // if (!cart.paymentMethod){
  //   props.history.push('/payment');
  // }

  const orderCreate = useSelector((state => state.orderCreate));
  const { loading, success, error, order } = orderCreate;
  const toPrice = num => Number(num);
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
  cart.taxPrice = toPrice(0.18 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({...cart, orderItems: cart.cartItems}))
  }

  useEffect(()=>{
    if (success){
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET});
    }
  },[dispatch, success, props.history, order])
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>{cart.shippingAddress.fullName} <br />
                  <strong>Address: </strong>{cart.shippingAddress.address},
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Payment Method</h2>
                <p>
                  <strong>Payment: </strong>{cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Order Items</h2>
                <ul>
                  {
                    cart.cartItems.map(item => (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img src={item.image} alt={item.name} className="small" />
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>
              
                          <div>{item.qty} ?? {item.price} = Tshs {item.qty * item.price}</div>
                
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className='col-1'>
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>tshs. {cart.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping Price</div>
                  <div>tshs. {cart.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>tshs. {cart.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div><strong>Total Price</strong></div>
                  <div>tshs. {cart.totalPrice}</div>
                </div>
              </li>
              <li>
                  <button 
                    type="button" 
                    onClick={placeOrderHandler} 
                    className="primary block"
                    disabled={cart.cartItems.length === 0}
                  >Place Order</button>
              </li>
              { loading && <LoadingBox></LoadingBox> }
              { error && <MessageBox variant='danger'>{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrderScreen;
