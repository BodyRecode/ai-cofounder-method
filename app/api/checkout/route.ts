import { getStripe, PRODUCTS } from '@/lib/stripe'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { product } = await req.json()

  if (product !== 'ebook' && product !== 'bundle') {
    return Response.json({ error: 'Invalid product' }, { status: 400 })
  }

  const config = PRODUCTS[product as 'ebook' | 'bundle']
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aicofoundermethod.com'

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'aud',
          product_data: {
            name: config.name,
            description: config.description,
          },
          unit_amount: config.price,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/?cancelled=true`,
    metadata: {
      product_type: product,
    },
  })

  return Response.json({ url: session.url })
}
