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
      from: 'Kade Dunstone <kade@aicofoundermethod.com>',
      to: email,
      subject: 'Your AI Co-Founder Method is ready',
      html: buildEmail(accessUrl, productType),
    })

    await getResend().emails.send({
      from: 'AI Co-Founder Method <kade@aicofoundermethod.com>',
      to: 'kade.dunstone@gmail.com',
      subject: `New sale - ${productType === 'bundle' ? 'Ebook + Bundle ($47)' : 'Ebook ($37)'}`,
      html: `<p style="font-family:sans-serif;font-size:16px;color:#111;">New purchase from <strong>${email}</strong><br>Product: <strong>${productType === 'bundle' ? 'Ebook + Bundle - $47' : 'Ebook - $37'}</strong></p>`,
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
<body style="margin:0;padding:0;background:#f0efff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0efff;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;max-width:600px;width:100%;border:1px solid #e0e7ff;">
        <tr>
          <td style="background:linear-gradient(135deg,#1e1b4b,#3730a3);padding:36px 40px;text-align:center;">
            <p style="color:#a5b4fc;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px;">The AI Co-Founder Method</p>
            <h1 style="color:#ffffff;font-size:26px;font-weight:700;margin:0;">Your order is ready</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;background:#ffffff;">
            <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 16px;">Thank you for your purchase.</p>
            <p style="color:#374151;font-size:16px;line-height:1.7;margin:0 0 28px;">
              Your <strong>${isBundle ? 'Ebook + Bonus Templates Bundle' : 'Ebook'}</strong> is ready to access now. Click the button below to go to your personal download page.
            </p>
            <div style="text-align:center;margin:32px 0;">
              <a href="${accessUrl}" style="display:inline-block;background:#4338ca;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;padding:16px 36px;border-radius:12px;">Access Your Downloads</a>
            </div>
            <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:24px 0 6px;">Your personal access link:</p>
            <p style="color:#4338ca;font-size:12px;word-break:break-all;margin:0 0 32px;background:#eef2ff;padding:12px 16px;border-radius:8px;">${accessUrl}</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 24px;">
            <p style="color:#9ca3af;font-size:13px;line-height:1.6;margin:0;">Bookmark your access link - you can return to it anytime to re-download your files or access your templates.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #f3f4f6;text-align:center;background:#fafafa;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">© 2025 Kade Dunstone. The AI Co-Founder Method.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}
