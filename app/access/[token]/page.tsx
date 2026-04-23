import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSupabaseAdmin } from '@/lib/supabase'
import { templates } from '@/lib/templates'

type Props = {
  params: Promise<{ token: string }>
}

export default async function AccessPage({ params }: Props) {
  const { token } = await params

  const { data: purchase } = await getSupabaseAdmin()
    .from('purchases')
    .select('*')
    .eq('access_token', token)
    .single()

  if (!purchase) notFound()

  const isBundle = purchase.product_type === 'bundle'

  return (
    <div className="min-h-screen" style={{background: '#f8f7ff'}}>
      {/* Header */}
      <header style={{background: 'linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 100%)'}}>
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">The AI Co-Founder Method</p>
          <h1 className="text-3xl font-bold text-white mb-2">Your Downloads</h1>
          <p className="text-indigo-300 text-lg">
            {isBundle ? 'Ebook + Bonus Templates Bundle' : 'Ebook'}
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">

        {/* Ebook Downloads */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-px flex-1 bg-indigo-100" />
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Ebook + Appendices</span>
            <div className="h-px flex-1 bg-indigo-100" />
          </div>
          <div className="space-y-3">
            {[
              { name: 'The AI Co-Founder Method', desc: 'Main ebook - full 12 chapter framework', file: '/pdfs/ebook.pdf', badge: 'Main Ebook' },
              { name: 'Appendix D - The AI Co-Founder Toolkit', desc: 'Templates preview and bonus bundle guide', file: '/pdfs/appendix-d.pdf', badge: 'Appendix' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.file}
                download
                className="flex items-center justify-between bg-white rounded-2xl border border-indigo-100 p-5 hover:border-indigo-300 hover:shadow-md transition-all group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg, #1e1b4b, #3730a3)'}}>
                    <span className="text-white text-xl">↓</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#1e1b4b] group-hover:text-indigo-700 transition-colors">{item.name}</p>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
                <span className="text-indigo-500 font-semibold text-sm bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-100 transition-colors shrink-0">Download PDF</span>
              </a>
            ))}
          </div>
        </section>

        {/* Bundle Templates */}
        {isBundle && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <div className="h-px flex-1 bg-indigo-100" />
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Bonus Templates Bundle</span>
              <div className="h-px flex-1 bg-indigo-100" />
            </div>
            <p className="text-gray-500 text-sm mb-5 text-center">Interactive templates with copy-to-clipboard prompts. Open, use directly, or print to PDF.</p>
            <div className="space-y-3">
              {templates.map((template) => (
                <Link
                  key={template.slug}
                  href={`/templates/${template.slug}?token=${token}`}
                  className="flex items-center justify-between bg-white rounded-2xl border border-indigo-100 p-5 hover:border-indigo-300 hover:shadow-md transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white text-sm font-bold" style={{background: 'linear-gradient(135deg, #1e1b4b, #4338ca)'}}>
                      {template.icon}
                    </div>
                    <div>
                      <p className="font-bold text-[#1e1b4b] group-hover:text-indigo-700 transition-colors">{template.title}</p>
                      <p className="text-gray-400 text-sm">{template.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-indigo-500 font-semibold text-sm bg-indigo-50 px-3 py-1.5 rounded-lg group-hover:bg-indigo-100 transition-colors shrink-0">Open →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Upsell for ebook-only */}
        {!isBundle && (
          <section className="rounded-2xl p-8 mb-10 text-center" style={{background: 'linear-gradient(135deg, #1e1b4b, #2d2a6e)'}}>
            <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3">Bonus Bundle</p>
            <h3 className="text-xl font-bold text-white mb-2">Upgrade to the Bonus Templates Bundle</h3>
            <p className="text-indigo-200 mb-6">Get the 7 interactive template pages for an additional $10.</p>
            <Link
              href="/?upgrade=true"
              className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Add the Bundle - $10
            </Link>
          </section>
        )}

        <div className="rounded-2xl p-6 text-center border border-indigo-100 bg-white shadow-sm">
          <p className="text-gray-500 text-sm mb-1">Bookmark this page to return to your downloads anytime.</p>
          <p className="text-indigo-400 text-xs break-all font-mono">aicofoundermethod.com/access/{token}</p>
        </div>
      </div>

      <footer className="text-center py-6 text-sm text-gray-400">
        <p>© 2025 Kade Dunstone. The AI Co-Founder Method.</p>
      </footer>
    </div>
  )
}
