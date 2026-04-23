'use client'

import { useState } from 'react'
import Image from 'next/image'

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
      <section style={{background: 'linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 50%, #2d2a6e 100%)'}}>
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Copy */}
            <div>
              <div className="inline-block bg-indigo-500 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                GPT-4 Edition
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Stop using ChatGPT like a tool.<br />
                <span className="text-indigo-300">Start using it like a co-founder.</span>
              </h1>
              <p className="text-lg text-indigo-100 leading-relaxed mb-8">
                A strategic framework that teaches founders how to use AI with purpose, structure, and repeatable workflows - across strategy, marketing, systems, and execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleCheckout('bundle')}
                  disabled={loading !== null}
                  className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 cursor-pointer shadow-lg shadow-indigo-900/50"
                >
                  {loading === 'bundle' ? 'Loading...' : 'Get the Bundle - $47'}
                </button>
                <button
                  onClick={() => handleCheckout('ebook')}
                  disabled={loading !== null}
                  className="border-2 border-indigo-400 hover:border-white disabled:opacity-60 text-indigo-200 hover:text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors cursor-pointer"
                >
                  {loading === 'ebook' ? 'Loading...' : 'Ebook Only - $37'}
                </button>
              </div>
              <p className="mt-4 text-indigo-400 text-sm">Instant digital delivery. Secure checkout via Stripe.</p>
            </div>
            {/* Right - Book Image */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full scale-75" />
                <Image
                  src="/ebook-cover.png"
                  alt="The AI Co-Founder Method Ebook"
                  width={420}
                  height={420}
                  className="relative drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-indigo-950 border-y border-indigo-900 py-4">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-8 text-indigo-300 text-sm font-medium">
          <span>+ Instant digital delivery</span>
          <span>+ One-time payment</span>
          <span>+ No subscription</span>
          <span>+ Secure checkout via Stripe</span>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4 text-center">Most founders are underusing AI - and they know it.</h2>
          <p className="text-gray-500 text-center mb-10">The problem is not the AI. It is the approach.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Asking disconnected, one-off questions',
              'Using shallow prompts and getting shallow results',
              'Treating ChatGPT like Google',
              'Expecting outputs without giving context',
              'Using it reactively instead of strategically',
              'Getting inconsistent results with no repeatable system',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-red-400 font-bold text-lg mt-0.5">-</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">The AI Co-Founder Method changes the approach.</h2>
          <p className="text-lg text-gray-500 mb-12">Instead of using AI randomly, you assign it clear roles, build repeatable workflows, and integrate it across your business.</p>
          <div className="grid md:grid-cols-2 gap-5 text-left">
            {[
              { before: 'I use ChatGPT when I need help with something.', after: 'I have an AI Co-Founder with defined roles across strategy, marketing, and execution.' },
              { before: 'I get inconsistent outputs and mixed results.', after: 'I run structured prompt workflows that produce strong, repeatable results.' },
              { before: 'I feel overwhelmed and have too many ideas.', after: 'I use AI to organise thinking, sharpen decisions, and reduce mental load.' },
              { before: 'I rely on memory and manual effort.', after: 'I have systems and SOPs built with AI that run without me holding everything.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-indigo-100 shadow-sm">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                  <p className="text-gray-400 text-sm line-through">{item.before}</p>
                </div>
                <div className="bg-white px-5 py-4">
                  <p className="text-[#1e1b4b] font-semibold text-sm leading-relaxed">+ {item.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section style={{background: 'linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 100%)'}} className="py-20 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">What is inside the ebook</h2>
            <p className="text-indigo-300">12 chapters across three parts.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                part: 'Part 1',
                title: 'The Shift',
                color: 'border-indigo-500',
                chapters: ['Why most founders use AI wrong', 'What changes when AI becomes a co-founder', 'Why context is everything', 'The mindset shift from user to operator'],
              },
              {
                part: 'Part 2',
                title: 'The Method',
                color: 'border-purple-500',
                chapters: ['Defining AI roles in your business', 'Structuring prompts that work', 'Creating repeatable workflows', 'Using AI across all business functions'],
              },
              {
                part: 'Part 3',
                title: 'The Scale',
                color: 'border-blue-400',
                chapters: ['Using AI across a team', 'Onboarding staff and contractors', 'Building AI-enabled company culture', 'Expanding into operations'],
              },
            ].map((part, i) => (
              <div key={i} className={`bg-white/5 backdrop-blur border-t-4 ${part.color} rounded-2xl p-6 hover:bg-white/10 transition-colors`}>
                <div className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">{part.part}</div>
                <h3 className="text-white font-bold text-xl mb-4">{part.title}</h3>
                <ul className="space-y-2">
                  {part.chapters.map((ch, j) => (
                    <li key={j} className="text-indigo-200 text-sm flex items-start gap-2">
                      <span className="text-indigo-400 mt-0.5 shrink-0">+</span>
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-400 blur-3xl opacity-20 rounded-full scale-75" />
                <Image
                  src="/bundle-cover.png"
                  alt="AI Co-Founder Method Bonus Templates Bundle"
                  width={380}
                  height={380}
                  className="relative drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            {/* Copy */}
            <div>
              <div className="inline-block bg-indigo-600 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
                Bonus Bundle
              </div>
              <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">Bonus Templates Bundle</h2>
              <p className="text-gray-600 mb-6">7 plug-and-play templates to apply the method immediately. Interactive web pages with copy-to-clipboard prompts.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Master Setup Prompt Template',
                  'Workflow Prompt Templates (x3)',
                  'Decision Making Template',
                  'Quarterly Check-In Template',
                  'QuickStart Prompt Vault (20+ prompts)',
                  'AI Role Library (20+ roles)',
                  'Chaining Models - Ladder and Tree',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('bundle')}
                disabled={loading !== null}
                className="bg-[#1e1b4b] hover:bg-indigo-800 disabled:opacity-60 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 cursor-pointer shadow-lg w-full text-center"
              >
                {loading === 'bundle' ? 'Loading...' : 'Get the Ebook + Bundle - $47'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1e1b4b] text-center mb-3">Choose your option</h2>
          <p className="text-gray-500 text-center mb-12">One-time payment. Instant delivery. No subscription.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Ebook Only */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-indigo-200 transition-colors">
              <h3 className="font-bold text-xl text-[#1e1b4b] mb-2">The Ebook</h3>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-bold text-[#1e1b4b]">$37</span>
                <span className="text-gray-400 mb-2">AUD</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">One-time payment</p>
              <ul className="space-y-3 mb-8">
                {[
                  'The AI Co-Founder Method ebook',
                  'Appendix A: Quick Commands',
                  'Appendix B: Tools & Integrations',
                  'Appendix C: Setup Checklist',
                  'Appendix D: The AI Co-Founder Toolkit',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-indigo-500 font-bold">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('ebook')}
                disabled={loading !== null}
                className="w-full border-2 border-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white disabled:opacity-60 text-[#1e1b4b] font-bold py-3 rounded-xl transition-colors cursor-pointer"
              >
                {loading === 'ebook' ? 'Loading...' : 'Get the Ebook - $37'}
              </button>
            </div>

            {/* Bundle */}
            <div style={{background: 'linear-gradient(135deg, #1e1b4b 0%, #2d2a6e 100%)'}} className="rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-indigo-900/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-full -translate-y-8 translate-x-8" />
              <div className="absolute top-4 right-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">Best Value</div>
              <h3 className="font-bold text-xl text-white mb-2">Ebook + Bundle</h3>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-bold text-white">$47</span>
                <span className="text-indigo-300 mb-2">AUD</span>
              </div>
              <p className="text-indigo-300 text-sm mb-6">One-time payment</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in the Ebook tier',
                  '7 interactive template pages',
                  'Master Setup Prompt Template',
                  'Workflow Prompt Templates (x3)',
                  'QuickStart Prompt Vault (20+ prompts)',
                  'AI Role Library (20+ roles)',
                  'Chaining Models guide',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-indigo-100">
                    <span className="text-indigo-400 font-bold">+</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout('bundle')}
                disabled={loading !== null}
                className="w-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-all hover:scale-105 cursor-pointer shadow-lg"
              >
                {loading === 'bundle' ? 'Loading...' : 'Get the Bundle - $47'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#1e1b4b] mb-4">Written by Kade Dunstone</h2>
          <p className="text-gray-600 leading-relaxed">
            Kade is a founder, business strategist, and AI integration practitioner who has built and scaled multiple ventures. The AI Co-Founder Method is the exact framework he uses to run his own businesses - and now teaches founders to apply in theirs.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section style={{background: 'linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 100%)'}} className="py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Ready to build with your AI Co-Founder?</h2>
          <p className="text-indigo-200 mb-8">Instant delivery. Start applying the method today.</p>
          <button
            onClick={() => handleCheckout('bundle')}
            disabled={loading !== null}
            className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all hover:scale-105 cursor-pointer shadow-lg shadow-indigo-900/50"
          >
            {loading === 'bundle' ? 'Loading...' : 'Get the Ebook + Bundle - $47'}
          </button>
        </div>
      </section>

      <footer className="bg-[#0a0920] text-indigo-500 text-center py-6 text-sm">
        <p>© 2025 Kade Dunstone. All rights reserved. The AI Co-Founder Method is a proprietary framework.</p>
      </footer>
    </main>
  )
}
