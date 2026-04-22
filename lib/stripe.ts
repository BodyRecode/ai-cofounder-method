import Stripe from 'stripe'

export function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-03-25.dahlia',
  })
}

export const PRODUCTS = {
  ebook: {
    name: 'The AI Co-Founder Method - Ebook',
    price: 3700,
    description: 'The complete AI Co-Founder Method ebook + Appendices A-D',
  },
  bundle: {
    name: 'The AI Co-Founder Method - Ebook + Bonus Bundle',
    price: 4700,
    description: 'The ebook + Bonus Templates Bundle with 7 plug-and-play templates',
  },
}
