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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e1b4b] text-white">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <p className="text-indigo-300 text-sm mb-2">AI Co-Founder Method</p>
          <h1 className="text-3xl font-bold text-white mb-1">Your Downloads</h1>
          <p className="text-indigo-200">
            {isBundle ? 'Ebook + Bonus Templates Bundle' : 'Ebook'}
          </p>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Ebook Downloads */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-[#1e1b4b] mb-4 uppercase tracking-wider text-sm">Ebook + Appendices</h2>
          <div className="space-y-3">
            {[
              { name: 'The AI Co-Founder Method - Ebook', file: '/pdfs/ebook.pdf', badge: 'Main Ebook' },
              { name: 'Appendix D - The AI Co-Founder Toolkit', file: '/pdfs/appendix-d.pdf', badge: 'Appendix' },
            ].map((item, i) => (
              <a
                key={i}
                href={item.file}
                download
                className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 text-lg">↓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e1b4b] group-hover:text-indigo-700 transition-colors">{item.name}</p>
                    <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium">{item.badge}</span>
                  </div>
                </div>
                <span className="text-indigo-500 font-medium text-sm">Download PDF</span>
              </a>
            ))}
          </div>
        </section>

        {/* Bundle Templates */}
        {isBundle && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-[#1e1b4b] uppercase tracking-wider text-sm">Bonus Templates Bundle</h2>
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded">7 Templates</span>
            </div>
            <p className="text-gray-500 text-sm mb-5">Interactive templates with copy-to-clipboard prompts. Open any template, use it directly, or print to PDF.</p>
            <div className="space-y-3">
              {templates.map((template) => (
                <Link
                  key={template.slug}
                  href={`/templates/${template.slug}?token=${token}`}
                  className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#1e1b4b] rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-indigo-300 text-sm font-bold">{template.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e1b4b] group-hover:text-indigo-700 transition-colors">{template.title}</p>
                      <p className="text-gray-500 text-sm">{template.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-indigo-500 font-medium text-sm shrink-0">Open →</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bonus bundle upsell for ebook-only buyers */}
        {!isBundle && (
          <section className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 mb-10">
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#1e1b4b] mb-2">Upgrade to the Bonus Bundle</h3>
              <p className="text-gray-600 mb-6">Get the 7 interactive template pages for an additional $10.</p>
              <Link
                href="/?upgrade=true"
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Add the Bundle - $10
              </Link>
            </div>
          </section>
        )}

        <div className="bg-[#1e1b4b] rounded-2xl p-6 text-center">
          <p className="text-indigo-200 text-sm mb-2">Bookmark this page to return to your downloads anytime.</p>
          <p className="text-indigo-300 text-xs break-all">aicofoundermethod.com/access/{token}</p>
        </div>
      </div>

      <footer className="text-center py-6 text-sm text-gray-400">
        <p>© 2025 Kade Dunstone. The AI Co-Founder Method.</p>
      </footer>
    </div>
  )
}
