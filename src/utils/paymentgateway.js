// stripeCheckout.js
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_test_51QhCbQ06wpTFhiFWbPJHXT74vCX5J7Z8kUp9hJQ1ob8o2OVVxf98YlqzzCQb81HRLiLaOQozM2q21cbgX87Vb4h900VTcPmctz');

/**
 * Handles the Stripe Checkout flow.
 * @param {Object} data - The data for creating the session, including amount, user, appointmentDate, therapistId, and sharedNotes.
 */
export const handleStripeCheckout = async (data) => {
  const stripe = await stripePromise;

  try {
    const response = await fetch('https://neuro-nest-api.onrender.com/paymentCheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const session = await response.json();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error('Stripe Checkout error:', error);
      alert('Error with payment. Please try again.');
    }
  } catch (err) {
    console.error('Error during session creation:', err);
    alert('Error during payment process. Please try again.');
  }
};
