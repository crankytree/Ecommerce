import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import "../Stripe.css"
import StripeCheckout from '../components/StripeCheckout';

// because we want stripe to only render once so that multiple objects are not created with each render cycle.
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY); 

const Payment = () => {
  return (
    <div className='container p-5 text-center'>
      <h4>Complete your Purchase</h4>
      <Elements stripe={promise}>
        <div className='col-md-8 offset-md-2'>
          <StripeCheckout/>
        </div>
      </Elements>
    </div>
  )
}

export default Payment