import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const OrderScreen = (props) => {
  const orderId = props.match.params.id;
  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(detailsOrder(orderId))
  },[dispatch, orderId])

  return loading? (<LoadingBox></LoadingBox>) :
  error? (<MessageBox>{error}</MessageBox>) : 
  (
    <div>  
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className='col-2'>
          <ul>
            <li>
              <div className='card card-body'>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong>{order.shippingAddress.fullName} <br />
                  <strong>Address: </strong>{order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered? <MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>
                :
                <MessageBox variant="danger">Not Delivered</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Payment Method</h2>
                <p>
                  <strong>Payment: </strong>{order.paymentMethod}
                </p>
                {order.isPaid? <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
                :
                <MessageBox variant="danger">Not Paid</MessageBox>
                }
              </div>
            </li>
            <li>
              <div className='card card-body'>
                <h2>Order Items</h2>
                <ul>
                  {
                    order.orderItems.map(item => (
                      <li key={item.product}>
                        <div className="row">
                          <div>
                            <img src={item.image} alt={item.name} className="small" />
                          </div>
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </div>
              
                          <div>{item.qty} × {item.price} = Tshs {item.qty * item.price}</div>
                
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
                  <div>tshs. {order.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping Price</div>
                  <div>tshs. {order.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>tshs. {order.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div><strong>Total Price</strong></div>
                  <div>tshs. {order.totalPrice}</div>
                </div>
              </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderScreen;
