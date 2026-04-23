import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getTemplate } from '@/lib/templates'
import CopyButton from './CopyButton'
import PrintButton from './PrintButton'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ token?: string }>
}

export default async function TemplatePage({ params, searchParams }: Props) {
  const { slug } = await params
  const { token } = await searchParams
  const template = getTemplate(slug)

  if (!template) notFound()

  return (
    <div className="min-h-screen" style={{background: '#f8f7ff'}}>

      {/* Header */}
      <header style={{background: 'linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 100%)'}}>
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href={token ? `/access/${token}` : '/'} className="text-indigo-300 hover:text-white text-sm transition-colors flex items-center gap-2">
            ← Back to downloads
          </Link>
          <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">AI Co-Founder Method</span>
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-10 pt-2">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white font-bold text-4xl opacity-10 select-none">{template.icon}</span>
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Template {template.icon} of 07</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{template.title}</h1>
          <p className="text-indigo-200 text-lg">{template.subtitle}</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-indigo-100 p-6 mb-8 shadow-sm">
          <p className="text-gray-600 leading-relaxed">{template.description}</p>
        </div>

        {template.sections.map((section, i) => {
          if (section.type === 'intro') {
            return (
              <div key={i} className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-2xl p-6 mb-8">
                <p className="text-[#1e1b4b] leading-relaxed">{section.content}</p>
              </div>
            )
          }

          if (section.type === 'prompt') {
            return (
              <div key={i} className="mb-10">
                {section.heading && (
                  <h2 className="text-xl font-bold text-[#1e1b4b] mb-4 pb-3 border-b-2 border-indigo-100">{section.heading}</h2>
                )}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between px-5 py-3" style={{background: '#0f0e2e'}}>
                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Prompt Template</span>
                    <CopyButton text={section.content || ''} />
                  </div>
                  <pre className="text-indigo-100 text-sm leading-relaxed p-6 whitespace-pre-wrap font-mono overflow-x-auto" style={{background: '#1e1b4b'}}>
                    {section.content}
                  </pre>
                </div>
              </div>
            )
          }

          if (section.type === 'list') {
            return (
              <div key={i} className="mb-8">
                {section.heading && (
                  <h2 className="text-xl font-bold text-[#1e1b4b] mb-4 pb-3 border-b-2 border-indigo-100">{section.heading}</h2>
                )}
                <ul className="space-y-3">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-indigo-50 shadow-sm">
                      <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{j + 1}</span>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }

          if (section.type === 'checklist') {
            return (
              <div key={i} className="mb-8">
                {section.heading && (
                  <h2 className="text-xl font-bold text-[#1e1b4b] mb-4 pb-3 border-b-2 border-indigo-100">{section.heading}</h2>
                )}
                <ul className="space-y-2">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-indigo-50 shadow-sm">
                      <span className="w-5 h-5 border-2 border-indigo-300 rounded shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }

          if (section.type === 'tip') {
            return (
              <div key={i} className="mb-8 rounded-2xl p-6 shadow-lg" style={{background: 'linear-gradient(135deg, #4338ca, #6366f1)'}}>
                {section.heading && (
                  <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-2">{section.heading}</p>
                )}
                <p className="text-white leading-relaxed font-medium">{section.content}</p>
              </div>
            )
          }

          return null
        })}

        {/* Footer actions */}
        <div className="mt-10 pt-8 border-t border-indigo-100 flex flex-wrap gap-3 no-print">
          <PrintButton />
          {token && (
            <Link
              href={`/access/${token}`}
              className="bg-[#1e1b4b] hover:bg-indigo-900 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              ← Back to all templates
            </Link>
          )}
        </div>
      </div>

      <footer className="text-center py-6 text-sm text-gray-400 no-print mt-6">
        <p>© 2025 Kade Dunstone. The AI Co-Founder Method.</p>
      </footer>
    </div>
  )
}
