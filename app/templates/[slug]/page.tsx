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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1e1b4b] text-white">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href={token ? `/access/${token}` : '/'} className="text-indigo-300 hover:text-white text-sm transition-colors">
            ← Back to your downloads
          </Link>
          <span className="text-indigo-300 text-sm">AI Co-Founder Method</span>
        </div>
        <div className="max-w-3xl mx-auto px-6 pb-10">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-indigo-400 font-bold text-5xl opacity-30">{template.icon}</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{template.title}</h1>
          <p className="text-indigo-200 text-lg">{template.subtitle}</p>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 prose-template">
        <p className="text-gray-600 text-lg mb-10 leading-relaxed">{template.description}</p>

        {template.sections.map((section, i) => {
          if (section.type === 'intro') {
            return (
              <div key={i} className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-6 mb-8">
                <p className="text-[#1e1b4b] leading-relaxed">{section.content}</p>
              </div>
            )
          }

          if (section.type === 'prompt') {
            return (
              <div key={i} className="mb-10">
                {section.heading && <h2>{section.heading}</h2>}
                <div className="relative bg-[#1e1b4b] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-indigo-900 border-b border-indigo-700">
                    <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wider">Prompt Template</span>
                    <CopyButton text={section.content || ''} />
                  </div>
                  <pre className="text-indigo-100 text-sm leading-relaxed p-6 whitespace-pre-wrap font-mono overflow-x-auto">
                    {section.content}
                  </pre>
                </div>
              </div>
            )
          }

          if (section.type === 'list') {
            return (
              <div key={i} className="mb-8">
                {section.heading && <h2>{section.heading}</h2>}
                <ul className="space-y-3">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="text-indigo-500 font-bold mt-1 shrink-0">+</span>
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
                {section.heading && <h2>{section.heading}</h2>}
                <ul className="space-y-3">
                  {section.items?.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <span className="text-gray-300 border-2 border-gray-300 rounded w-5 h-5 shrink-0 mt-0.5 flex items-center justify-center text-xs">-</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }

          if (section.type === 'tip') {
            return (
              <div key={i} className="mb-8 bg-indigo-600 text-white rounded-xl p-6">
                {section.heading && (
                  <h3 className="text-white font-bold text-base mb-2">{section.heading}</h3>
                )}
                <p className="text-indigo-100 leading-relaxed">{section.content}</p>
              </div>
            )
          }

          return null
        })}

        {/* Print button */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex gap-4 no-print">
          <PrintButton />
          {token && (
            <Link
              href={`/access/${token}`}
              className="bg-[#1e1b4b] hover:bg-indigo-900 text-white font-medium px-6 py-3 rounded-lg text-sm transition-colors"
            >
              Back to all templates
            </Link>
          )}
        </div>
      </div>

      <footer className="bg-[#12103a] text-indigo-400 text-center py-6 text-sm mt-12 no-print">
        <p>© 2025 Kade Dunstone. The AI Co-Founder Method.</p>
      </footer>
    </div>
  )
}
