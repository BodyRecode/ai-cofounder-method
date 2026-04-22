import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

type Props = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams

  let accessToken: string | null = null
  let productType: 'ebook' | 'bundle' | null = null

  if (session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id)
      if (session.payment_status === 'paid') {
        const { data } = await getSupabaseAdmin()
          .from('purchases')
          .select('access_token, product_type')
          .eq('stripe_session_id', session_id)
          .single()
        if (data) {
          accessToken = data.access_token
          productType = data.product_type
        }
      }
    } catch {
      // token not ready yet - webhook may still be processing
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        <div className="bg-indigo-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-white text-3xl">+</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">
          {accessToken ? 'Your order is ready.' : 'Payment confirmed.'}
        </h1>
        <p className="text-indigo-200 text-lg mb-8">
          {accessToken
            ? `Check your email for your access link. Or go straight to your downloads below.`
            : 'A confirmation email with your access link is on its way. Check your inbox in the next few minutes.'}
        </p>

        {accessToken && (
          <Link
            href={`/access/${accessToken}`}
            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors mb-4"
          >
            Access your {productType === 'bundle' ? 'Ebook + Bundle' : 'Ebook'} now
          </Link>
        )}

        <p className="text-indigo-300 text-sm mt-6">
          Did not receive the email? Check your spam folder, or{' '}
          <a href="mailto:kade.dunstone@gmail.com" className="text-indigo-200 underline">contact us</a>.
        </p>
      </div>
    </div>
  )
}
