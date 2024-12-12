const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

/**
 * Create a Stripe checkout session for processing payments.
 *
 * @param {Array} cartItems - Array of items in the cart, each containing `name`, `price`, and `quantity`.
 * @param {String} successUrl - The URL to redirect to after successful payment.
 * @param {String} cancelUrl - The URL to redirect to if payment is canceled.
 * @returns {Promise<Object>} - Stripe checkout session object.
 */
const createCheckoutSession = async (cartItems, successUrl, cancelUrl) => {
  try {
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image], // product images
        },
        unit_amount: Math.round(item.price * 100), // Convert dollars to cents
      },
      quantity: item.purchaseQuantity || 1, // Ensure quantity fallback
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return session;
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw new Error('Unable to create Stripe checkout session');
  }
};

module.exports = { createCheckoutSession };
