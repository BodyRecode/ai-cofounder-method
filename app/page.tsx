'use client'

import { useState } from 'react'

export default function SalesPage() {
  const [loading, setLoading] = useState<'ebook' | 'bundle' | null>(null)

  async function handleCheckout(product: 'ebook' | 'bundle') {
    setLoading(product)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      setLoading(null)
    }
  }

  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-[#1e1b4b] text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="inline-block bg-indigo-600 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            GPT-4 Edition
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            The AI Co-Founder Method
          </h1>
          <p className="text-xl md:text-2xl text-indigo-200 font-light mb-8 max-w-2xl mx-auto">
            Stop using ChatGPT like a tool.<br />Start using it like a co-founder.
          </p>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            A strategic framework that teaches founders how to use AI with purpose, structure, and repeatable workflows - across strategy, marketing, systems, and execution.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCheckout('bundle')}
              disabled={loading !== null}
              className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors cursor-pointer"
            >
              {loading === 'bundle' ? 'Loading...' : 'Get the Ebook + Bundle - $47'}
            </button>
            <button
              onClick={() => handleCheckout('ebook')}
              disabled={loading !== null}
              className="border border-indigo-400 hover:border-white disabled:opacity-60 text-indigo-200 hover:text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors cursor-pointer"
            >
              {loading === 'ebook' ? 'Loading...' : 'Ebook Only - $37'}
            </button>
          </div>
          <p className="mt-4 text-indigo-300 text-sm">Instant digital delivery. Secure checkout via Stripe.</p>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1e1b4b] mb-8 text-center">Most founders are underusing AI - and they know it.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Asking disconnected, one-off questions',
              'Using shallow prompts and getting shallow results',
              'Treating ChatGPT like Google',
              'Expecting outputs without giving context',
              'Using it reactively instead of strategically',
              'Getting inconsistent results with no repeatable system',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-gray-100">
                <span className="text-red-400 mt-0.5 text-lg font-bold">-</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-lg text-gray-600">
            The problem is not the AI. It is the approach.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1e1b4b] mb-6">The AI Co-Founder Method changes the approach.</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Instead of using AI randomly, you learn to assign it clear roles, build repeatable workflows, and integrate it across every part of your business.
          </p>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { before: 'I use ChatGPT when I need help with something.', after: 'I have an AI Co-Founder with defined roles across strategy, marketing, and execution.' },
              { before: 'I get inconsistent outputs and mixed results.', after: 'I run structured prompt workflows that produce strong, repeatable results.' },
              { before: 'I feel overwhelmed and have too many ideas.', after: 'I use AI to organise thinking, sharpen decisions, and reduce mental load.' },
              { before: 'I rely on memory and manual effort.', after: 'I have systems and SOPs built with AI that run without me holding everything.' },
            ].map((item, i) => (
              <div key={i} className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <p className="text-gray-400 text-sm line-through mb-2">{item.before}</p>
                <p className="text-[#1e1b4b] font-semibold">{item.after}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20 bg-[#1e1b4b] text-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">What is inside the ebook</h2>
          <p className="text-indigo-200 text-center mb-12">A 12-chapter framework across three parts.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                part: 'Part 1',
                title: 'The Shift',
                chapters: ['Why most founders use AI wrong', 'What changes when AI becomes a co-founder', 'Why context is everything', 'The mindset shift from user to operator'],
              },
              {
                part: 'Part 2',
                title: 'The Method',
                chapters: ['Defining AI roles in your business', 'Structuring prompts that work', 'Creating repeatable workflows', 'Using AI across all business functions'],
              },
              {
                part: 'Part 3',
                title: 'The Scale',
                chapters: ['Using AI across a team', 'Onboarding staff and contractors', 'Building AI-enabled company culture', 'Expanding into operations'],
              },
            ].map((part, i) => (
              <div key={i} className="bg-indigo-900 rounded-xl p-6">
                <div className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-1">{part.part}</div>
                <h3 className="text-white font-bold text-xl mb-4">{part.title}</h3>
                <ul className="space-y-2">
                  {part.chapters.map((ch, j) => (
                    <li key={j} className="text-indigo-200 text-sm flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5">+</span>
                      {ch}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-indigo-600 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
                Bonus Bundle
              </div>
              <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">Bonus Templates Bundle</h2>
              <p className="text-gray-600 text-lg">7 plug-and-play templates to apply the method immediately.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {[
                { num: '01', name: 'Master Setup Prompt Template', desc: 'The foundation prompt for every session' },
                { num: '02', name: 'Workflow Prompt Templates', desc: '3 pre-built workflows for common tasks' },
                { num: '03', name: 'Decision Making Template', desc: 'Structured way to evaluate any option' },
                { num: '04', name: 'Quarterly Check-In Template', desc: 'Reflect, reset, and plan every 90 days' },
                { num: '05', name: 'QuickStart Prompt Vault', desc: '20+ ready-to-use prompts across 4 categories' },
                { num: '06', name: 'AI Role Examples', desc: '20+ specialist roles for sharper outputs' },
                { num: '07', name: 'Chaining Models', desc: 'Ladder and Tree methods for big projects' },
              ].map((t) => (
                <div key={t.num} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-indigo-100">
                  <span className="text-indigo-400 font-bold text-sm w-6 shrink-0">{t.num}</span>
                  <div>
                    <p className="font-semibold text-[#1e1b4b] text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm">Templates delivered as interactive web pages - accessible instantly after purchase with copy-to-clipboard prompts.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1e1b4b] text-center mb-12">Choose your option</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="font-bold text-xl text-[#1e1b4b] mb-2">The Ebook</h3>
              <div className="text-4xl font-bold text-[#1e1b4b] mb-1">$37</div>
              <p className="text-gray-500 text-sm mb-6">One-time payment</p>
              <ul className="space-y-3 mb-8">
                {[
                  'The AI Co-Founder Method ebook (PDF)',
                  'Appendix A: Quick Commands & Shortcuts',
                  'Appendix B: Recommended Tools & Integrations',
                  'Appendix C: AI Co-Founder Setup Checklist',
                  'Appendix D: The AI Co-Founder Toolkit',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-indigo-500 mt-0.5">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('ebook')}
                disabled={loading !== null}
                className="w-full border-2 border-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white disabled:opacity-60 text-[#1e1b4b] font-semibold py-3 rounded-lg transition-colors cursor-pointer"
              >
                {loading === 'ebook' ? 'Loading...' : 'Get the Ebook - $37'}
              </button>
            </div>
            <div className="bg-[#1e1b4b] rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
              <h3 className="font-bold text-xl text-white mb-2">Ebook + Bundle</h3>
              <div className="text-4xl font-bold text-white mb-1">$47</div>
              <p className="text-indigo-300 text-sm mb-6">One-time payment</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in the Ebook tier',
                  '7 interactive template pages',
                  'Master Setup Prompt Template',
                  'Workflow Prompt Templates (x3)',
                  'Decision Making Template',
                  'QuickStart Prompt Vault (20+ prompts)',
                  'AI Role Library (20+ roles)',
                  'Chaining Models guide',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-indigo-100">
                    <span className="text-indigo-400 mt-0.5">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('bundle')}
                disabled={loading !== null}
                className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
              >
                {loading === 'bundle' ? 'Loading...' : 'Get the Bundle - $47'}
              </button>
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">Secure payment via Stripe. Instant digital delivery. No subscriptions.</p>
        </div>
      </section>

      {/* Author */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1e1b4b] mb-4">Written by Kade Dunstone</h2>
          <p className="text-gray-600 leading-relaxed">
            Kade is a founder, business strategist, and AI integration practitioner who has built and scaled multiple ventures. The AI Co-Founder Method is the exact framework he uses to run his own businesses - and now teaches founders to apply in theirs.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-[#1e1b4b] text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to build with your AI Co-Founder?</h2>
          <p className="text-indigo-200 mb-8">Instant delivery. Start applying the method today.</p>
          <button
            onClick={() => handleCheckout('bundle')}
            disabled={loading !== null}
            className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors cursor-pointer"
          >
            {loading === 'bundle' ? 'Loading...' : 'Get the Ebook + Bundle - $47'}
          </button>
        </div>
      </section>

      <footer className="bg-[#12103a] text-indigo-400 text-center py-6 text-sm">
        <p>© 2025 Kade Dunstone. All rights reserved. The AI Co-Founder Method is a proprietary framework.</p>
      </footer>
    </main>
  )
}
