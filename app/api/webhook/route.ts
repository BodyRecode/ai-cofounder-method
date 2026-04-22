import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextRequest } from 'next/server'
import { randomUUID } from 'crypto'

function getResend() { return new Resend(process.env.RESEND_API_KEY) }

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return Response.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const email = session.customer_details?.email
    const productType = session.metadata?.product_type as 'ebook' | 'bundle'

    if (!email || !productType) return Response.json({ ok: true })

    const accessToken = randomUUID()

    await getSupabaseAdmin().from('purchases').insert({
      email,
      stripe_session_id: session.id,
      product_type: productType,
      access_token: accessToken,
    })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aicofoundermethod.com'
    const accessUrl = `${appUrl}/access/${accessToken}`

    await getResend().emails.send({
      from: 'Kade Dunstone <onboarding@resend.dev>',
      to: email,
      subject: 'Your AI Co-Founder Method is ready',
      html: buildEmail(accessUrl, productType),
    })
  }

  return Response.json({ ok: true })
}

function buildEmail(accessUrl: string, productType: 'ebook' | 'bundle') {
  const isBundle = productType === 'bundle'
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111111;border-radius:12px;overflow:hidden;max-width:600px;width:100%;">
        <tr>
          <td style="background:#1e1b4b;padding:32px 40px;text-align:center;">
            <p style="color:#a5b4fc;font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">The AI Co-Founder Method</p>
            <h1 style="color:#ffffff;font-size:24px;font-weight:700;margin:0;">Your order is ready</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <p style="color:#d1d5db;font-size:16px;line-height:1.6;margin:0 0 16px;">Thank you for your purchase.</p>
            <p style="color:#d1d5db;font-size:16px;line-height:1.6;margin:0 0 24px;">
              Your ${isBundle ? 'Ebook + Bonus Templates Bundle' : 'Ebook'} is ready to access now. Click the button below to go to your personal download page.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${accessUrl}" style="display:inline-block;background:#4f46e5;color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 32px;border-radius:8px;">Access Your Downloads</a>
            </div>
            <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:0 0 8px;">Your access link:</p>
            <p style="color:#818cf8;font-size:13px;word-break:break-all;margin:0 0 32px;">${accessUrl}</p>
            <hr style="border:none;border-top:1px solid #222;margin:0 0 24px;">
            <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:0;">Bookmark your access link - you can return to it anytime to re-download your files or access your templates.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #222;text-align:center;">
            <p style="color:#6b7280;font-size:12px;margin:0;">© 2025 Kade Dunstone. The AI Co-Founder Method.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
