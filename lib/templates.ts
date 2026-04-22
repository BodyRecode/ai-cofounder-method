export type Template = {
  slug: string
  title: string
  subtitle: string
  description: string
  icon: string
  sections: TemplateSection[]
}

export type TemplateSection = {
  type: 'intro' | 'prompt' | 'table' | 'checklist' | 'list' | 'tip' | 'divider'
  heading?: string
  content?: string
  items?: string[]
  rows?: { label: string; value: string }[]
  columns?: string[]
  tableRows?: string[][]
}

export const templates: Template[] = [
  {
    slug: 'master-setup-prompt',
    title: 'Master Setup Prompt Template',
    subtitle: 'The foundation prompt for every project',
    description: 'Build your foundational prompt using the 5-part structure. This is the prompt you run at the start of every ChatGPT session to activate your AI Co-Founder.',
    icon: '01',
    sections: [
      {
        type: 'intro',
        content: 'Copy this template into ChatGPT at the start of every new session. Fill in the bracketed fields with your own business context. Save your completed version to your Prompt Vault.',
      },
      {
        type: 'prompt',
        heading: 'The Master Setup Prompt',
        content: `ChatGPT, you are my AI Co-Founder and Strategic Partner.

[CONTEXT]
I run a [type of business] called [business name]. My primary audience is [describe your ideal client]. My core offer is [describe your main product or service]. My current stage is [early stage / growing / scaling].

[ROLE]
Act as my [choose a role: Strategic Advisor / Marketing Director / Operations Partner / Content Strategist] — a trusted partner who supports me by [describe what you need most: thinking through decisions / creating content / solving problems / building systems].

[TASK]
Today I need your help with: [describe your specific task or goal for this session].

[CONSTRAINTS]
- Keep responses practical and actionable
- Base all advice on the context I've shared
- Ask clarifying questions if something is unclear
- [Add any other constraints relevant to you]

[OUTPUT]
Please respond in [format: bullet points / numbered steps / paragraphs / table] and aim for [length: brief / detailed / comprehensive].`,
      },
      {
        type: 'tip',
        heading: 'Pro Tip',
        content: 'Save your completed Master Setup Prompt as a pinned message or doc so you can paste it in seconds at the start of every session. The more consistent your setup, the stronger your outputs.',
      },
      {
        type: 'list',
        heading: 'The 5 Parts Explained',
        items: [
          'Context - Tell ChatGPT who you are, what you do, and who you serve. This is the foundation everything else builds on.',
          'Role - Assign a specific function. A "Strategic Advisor" thinks differently to a "Content Strategist." Be intentional.',
          'Task - State clearly what you need from this session. One focused task gets better results than five vague ones.',
          'Constraints - Guide the output. Tell it how to think, what to avoid, and what standards to apply.',
          'Output - Define the format and depth. A table is different to a paragraph. Ask for what actually helps you.',
        ],
      },
    ],
  },
  {
    slug: 'workflow-prompt-templates',
    title: 'Workflow Prompt Templates',
    subtitle: 'Reusable prompts for daily execution',
    description: 'Three pre-built workflows for the most common founder tasks. Copy, customise the bracketed fields, and run them inside your AI Co-Founder chat.',
    icon: '02',
    sections: [
      {
        type: 'intro',
        content: 'Each workflow below follows the same 5-part structure as your Master Setup Prompt. Paste any of these into ChatGPT after your setup prompt is active, or use them as standalone session starters.',
      },
      {
        type: 'prompt',
        heading: 'Workflow 1 - 30-Day Content Calendar',
        content: `ChatGPT, you are my AI Co-Founder and Strategic Partner.

Context: I run a [business type] serving [audience]. My core offer is [offer name/description].
Role: Act as my Content Strategist.
Task: Create a 30-day content calendar for [month/quarter].
Constraints:
- Focus on [your primary platform: Instagram / LinkedIn / Email / YouTube]
- Keep posts under [word/character limit]
- Mix content types: [education / inspiration / promotion / behind the scenes]
- Align all content with my offer: [offer name]
Output: Provide in a table with columns: Day, Platform, Topic, Hook, CTA, Content Type.`,
      },
      {
        type: 'prompt',
        heading: 'Workflow 2 - 3-Email Nurture Sequence',
        content: `ChatGPT, you are my AI Co-Founder and Strategic Partner.

Context: I run a [business type]. My new subscriber just opted in for [lead magnet name].
Role: Act as my Email Copywriter and Marketing Strategist.
Task: Write a 3-email welcome and nurture sequence for new subscribers.
Constraints:
- Email 1: Deliver the lead magnet and introduce me/my brand (warm, personal)
- Email 2: Provide value and build trust (educational, no hard sell)
- Email 3: Introduce my core offer with a soft CTA
- Brand voice: [describe your tone: professional / conversational / direct / warm]
- Keep each email under 300 words
Output: Write each email in full with subject line, body, and CTA.`,
      },
      {
        type: 'prompt',
        heading: 'Workflow 3 - 90-Day Action Plan',
        content: `ChatGPT, you are my AI Co-Founder and Strategic Partner.

Context: I run a [business type]. My primary goal for the next 90 days is [goal: e.g., launch a new offer / hit $X revenue / grow my audience to X].
Role: Act as my Strategic Planning Partner.
Task: Build a focused 90-day action plan to achieve this goal.
Constraints:
- Break into 3 x 30-day phases with clear focus areas
- Include specific weekly actions, not vague strategies
- Flag potential bottlenecks or risks
- Keep it realistic for a [solo founder / small team of X]
Output: Provide as a structured plan with Phase, Week, Focus Area, Key Actions, and Success Metric columns.`,
      },
      {
        type: 'tip',
        heading: 'Pro Tip',
        content: 'Run each workflow at the start of a dedicated work session. Do not mix workflows in one chat - fresh context keeps outputs cleaner. Save your best outputs to your Prompt Vault.',
      },
    ],
  },
  {
    slug: 'decision-making-template',
    title: 'Decision Making Template',
    subtitle: 'A structured way to evaluate options with your AI Co-Founder',
    description: 'Use this template whenever you face a decision with multiple paths. Hand it to your AI Co-Founder to get a structured, objective breakdown of your options.',
    icon: '03',
    sections: [
      {
        type: 'intro',
        content: 'Fill in the decision you are facing, then paste this entire template into ChatGPT. Your AI Co-Founder will evaluate each option based on your constraints and help you think clearly.',
      },
      {
        type: 'prompt',
        heading: 'The Decision Making Prompt',
        content: `ChatGPT, you are my AI Co-Founder and Strategic Partner.

Context: I run a [business type] at [stage of business]. I am facing a decision and need structured support to think it through.
Role: Act as my Strategic Advisor and Decision Support Partner.
Task: Help me evaluate the following decision and options clearly.

THE DECISION:
[Describe the decision you need to make in 2-3 sentences]

OPTION A: [Name of Option A]
Description: [Brief description]

OPTION B: [Name of Option B]
Description: [Brief description]

OPTION C (if applicable): [Name of Option C]
Description: [Brief description]

MY CONSTRAINTS:
- Budget: [your budget or N/A]
- Timeline: [your deadline or timeframe]
- Resources: [team size, tools available, etc.]
- Non-negotiables: [anything you will not compromise on]

Output: For each option, provide: (1) Key Benefits, (2) Key Risks, (3) What this requires from me, (4) A score out of 10 based on fit with my constraints. Then give me your recommendation with reasoning.`,
      },
      {
        type: 'list',
        heading: 'Decision Scoring Guide',
        items: [
          '9-10: Strong fit. Aligns with your goals, constraints, and resources. Low risk.',
          '7-8: Good fit with manageable trade-offs. Worth pursuing with clear planning.',
          '5-6: Viable but significant trade-offs exist. Requires honest evaluation.',
          '3-4: Poor fit. High risk or major resource mismatch. Proceed with caution.',
          '1-2: Not recommended given your current constraints and goals.',
        ],
      },
      {
        type: 'tip',
        heading: 'When to Use This Template',
        content: 'Use this for any decision where you feel pulled in multiple directions, where the cost of being wrong is significant, or where you have been going back and forth for more than a day. Your AI Co-Founder will not make the decision for you - but it will help you see it clearly.',
      },
    ],
  },
  {
    slug: 'quarterly-checkin-template',
    title: 'Quarterly Check-In Template',
    subtitle: 'Use AI to reflect, reset, and plan every 90 days',
    description: 'A structured 90-day business review to run with your AI Co-Founder. Use it to close out the last quarter, extract lessons, and set focused priorities for the next 90 days.',
    icon: '04',
    sections: [
      {
        type: 'intro',
        content: 'Block 60-90 minutes at the end of each quarter. Fill in your answers below, then paste the entire completed template into ChatGPT for a full strategic debrief and planning session.',
      },
      {
        type: 'prompt',
        heading: 'Part 1 - Last Quarter Review Prompt',
        content: `ChatGPT, you are my AI Co-Founder and Strategic Partner.

Context: I run a [business type]. I am reviewing the last 90 days and need your help extracting insights and lessons.
Role: Act as my Strategic Advisor and Business Coach.
Task: Help me review the last quarter using my answers below.

WHAT I SET OUT TO DO:
[Paste your goals from the start of the quarter]

WHAT ACTUALLY HAPPENED:
- Revenue/results: [what you achieved]
- What worked well: [list 3-5 things]
- What did not work: [list 2-3 things]
- Biggest surprise: [anything unexpected]
- Where I lost time or energy: [be honest]

Output: Identify 3 key lessons from this quarter, flag any patterns you notice in what is working vs what is not, and highlight the 1 most important thing I should double down on next quarter.`,
      },
      {
        type: 'prompt',
        heading: 'Part 2 - Next Quarter Planning Prompt',
        content: `ChatGPT, you are my AI Co-Founder and Strategic Partner.

Context: I have just reviewed the last 90 days [paste a summary of your review above]. Now I need to plan the next quarter.
Role: Act as my Strategic Planning Partner.
Task: Help me set clear, focused priorities for the next 90 days.

MY OVERARCHING GOAL FOR THIS QUARTER:
[What is the single most important thing you want to achieve?]

MY TOP 3 FOCUS AREAS:
1. [Focus area 1]
2. [Focus area 2]
3. [Focus area 3]

WHAT I AM DELIBERATELY NOT DOING THIS QUARTER:
[What are you saying no to, so you can say yes to the above?]

MY AVAILABLE RESOURCES:
- Time: [hours per week available]
- Budget: [quarterly budget]
- Team: [who is helping you]

Output: Validate my priorities against my goal, flag any gaps or risks, and give me a simple 90-day plan broken into 3 x 30-day sprints with a clear focus for each phase.`,
      },
      {
        type: 'list',
        heading: 'Quarterly Check-In Checklist',
        items: [
          'Block 60-90 minutes with no distractions',
          'Review last quarter goals vs actual results',
          'Complete Part 1 (review) before Part 2 (planning)',
          'Be honest in your answers - AI gives back what you put in',
          'Set no more than 3 focus areas for the next quarter',
          'Write your top 3 priorities somewhere visible after the session',
          'Save your completed prompts and outputs to your Prompt Vault',
        ],
      },
      {
        type: 'tip',
        heading: 'Pro Tip',
        content: 'Do not skip the review to jump straight to planning. The lessons from last quarter are the raw material for a stronger next quarter. Your AI Co-Founder is most useful when you give it honest input.',
      },
    ],
  },
  {
    slug: 'quickstart-prompt-vault',
    title: 'QuickStart Prompt Vault',
    subtitle: 'A ready-to-use collection of high-impact prompts',
    description: 'A starter library of proven prompts across four core business categories. Copy any prompt, fill in the brackets, and deploy immediately.',
    icon: '05',
    sections: [
      {
        type: 'intro',
        content: 'These prompts are designed to be used after your Master Setup Prompt is active. Each one is structured using the AI Co-Founder Method framework. Add your own prompts to this vault as you discover what works for your business.',
      },
      {
        type: 'list',
        heading: 'Content Prompts',
        items: [
          'Create 10 Instagram caption ideas for [topic] that speak to [audience] and drive engagement through [emotion/insight/question].',
          'Write a LinkedIn post about [topic]. Make it personal, lead with a hook, and end with a question to drive comments. Brand voice: [your tone].',
          'Give me 5 newsletter subject line options for an email about [topic]. Make them curiosity-driven, not clickbait.',
          'Write a 3-part Instagram carousel on [topic] for [audience]. Each slide should have a bold headline and 2-3 supporting points.',
          'Create a month of content ideas (20 posts) for a [business type] targeting [audience]. Mix: education, inspiration, promotion, and behind the scenes.',
        ],
      },
      {
        type: 'list',
        heading: 'Sales and Marketing Prompts',
        items: [
          'Write a sales page for [offer name]. Target audience: [audience]. Key outcome: [result]. Price point: [$X]. Tone: [professional / conversational / bold].',
          'Help me write a 5-point value proposition for [offer]. Focus on outcomes, not features.',
          'Rewrite this sales copy to be more compelling: [paste your existing copy]. Keep it under [X words] and make it feel less salesy.',
          'Create 3 different hooks for a [social post / email / ad] about [offer or topic]. Make each one use a different angle: curiosity, pain point, and social proof.',
          'Write a follow-up email to someone who enquired about [offer] but has not responded in [X days]. Keep it friendly, low pressure, and value-led.',
        ],
      },
      {
        type: 'list',
        heading: 'Strategy Prompts',
        items: [
          'I want to [goal]. My current situation is [context]. What are 3 different strategic approaches I could take? Give pros, cons, and a recommendation.',
          'Help me map out the customer journey for [offer]. From first awareness to post-purchase. Flag any gaps or drop-off points.',
          'Review my offer: [describe offer]. Who is my ideal buyer, what is the core problem it solves, and what is the strongest positioning angle?',
          'What are 5 revenue-generating activities I could do this week as a [business type] with [X hours] available and a goal of [specific result]?',
          'I am considering [idea or initiative]. Play devil\'s advocate - what are the strongest arguments against doing this right now?',
        ],
      },
      {
        type: 'list',
        heading: 'Productivity and Systems Prompts',
        items: [
          'Draft an agenda for my weekly team meeting. Attendees: [list roles]. Goal: cover [topics]. Time available: [X minutes]. Output as a numbered agenda.',
          'Turn these notes into a clean SOP: [paste your notes]. Format as: Purpose, Who it applies to, Step-by-step process, Common mistakes to avoid.',
          'I have [list of tasks]. Help me prioritise them using the Eisenhower Matrix (urgent/important grid). Tell me what to do, delegate, schedule, and drop.',
          'Create a simple onboarding checklist for a new [role: VA / team member / contractor] joining my business. Focus on the first 5 days.',
          'Review this workflow: [describe current process]. Identify inefficiencies and suggest a streamlined version that saves time without losing quality.',
        ],
      },
      {
        type: 'tip',
        heading: 'Building Your Own Vault',
        content: 'Every time you run a prompt that gets a great result, save it. Copy the prompt + output into a Notion doc, Google Doc, or spreadsheet organised by category. Your Prompt Vault is a business asset that compounds over time - the more you add, the faster you move.',
      },
    ],
  },
  {
    slug: 'ai-role-examples',
    title: 'AI Role Examples',
    subtitle: 'Specialist roles you can assign to your AI Co-Founder',
    description: 'Assigning a specific role changes how your AI Co-Founder thinks and responds. Use this library to find the right role for any task.',
    icon: '06',
    sections: [
      {
        type: 'intro',
        content: 'Insert any role from this library into the [ROLE] field of your Master Setup Prompt or workflow. The more specific the role, the sharper the output. Combine roles when needed - for example: "Act as my Marketing Strategist and Copywriter."',
      },
      {
        type: 'list',
        heading: 'Strategy and Leadership Roles',
        items: [
          'Strategic Advisor - Thinks long-term, evaluates trade-offs, challenges your assumptions, helps you prioritise.',
          'Business Coach - Asks powerful questions, holds you accountable, helps you gain clarity on goals and blockers.',
          'Executive Consultant - Brings structured frameworks, objective analysis, and board-level thinking to your decisions.',
          'Growth Strategist - Focuses on scaling levers, revenue growth, market expansion, and business development.',
          'Risk Analyst - Identifies threats, stress-tests plans, surfaces blind spots, and evaluates downside scenarios.',
        ],
      },
      {
        type: 'list',
        heading: 'Marketing and Sales Roles',
        items: [
          'Marketing Strategist - Plans campaigns, channels, and positioning based on your business goals and audience.',
          'Copywriter - Crafts persuasive, clear, and compelling written content for any format or platform.',
          'Content Strategist - Plans content calendars, themes, and formats to build audience and drive results.',
          'Brand Strategist - Shapes your positioning, messaging, and brand voice for clarity and differentiation.',
          'Social Media Manager - Creates platform-specific content, captions, hooks, and engagement strategies.',
          'Email Marketing Specialist - Builds sequences, writes campaigns, and optimises open and click rates.',
          'SEO Specialist - Advises on keyword strategy, content structure, and search visibility improvements.',
          'Launch Strategist - Plans product launches, pre-launch sequences, and post-launch follow-through.',
        ],
      },
      {
        type: 'list',
        heading: 'Operations and Productivity Roles',
        items: [
          'Operations Manager - Designs workflows, processes, and systems to make the business run more smoothly.',
          'Project Manager - Creates timelines, breaks goals into tasks, tracks dependencies, and manages scope.',
          'SOP Writer - Turns processes into clear, reusable standard operating procedures for your team.',
          'Executive Assistant - Drafts communications, organises priorities, and handles structured administrative tasks.',
          'Process Analyst - Reviews existing workflows to find inefficiencies, bottlenecks, and improvement opportunities.',
        ],
      },
      {
        type: 'list',
        heading: 'Research and Analysis Roles',
        items: [
          'Market Research Analyst - Gathers insights on competitors, audience behaviour, trends, and market opportunities.',
          'Customer Insights Specialist - Analyses feedback, reviews, and data to surface patterns and buying motivations.',
          'Data Analyst - Interprets numbers, identifies trends, and translates data into actionable recommendations.',
          'Competitive Intelligence Analyst - Researches competitors, positioning gaps, and strategic differentiation opportunities.',
        ],
      },
      {
        type: 'list',
        heading: 'Product and Delivery Roles',
        items: [
          'Product Strategist - Shapes your offer structure, pricing, delivery, and product-market fit.',
          'Curriculum Designer - Structures course content, learning outcomes, and lesson flow for maximum transformation.',
          'Client Experience Designer - Maps the client journey from first contact to long-term retention.',
          'Offer Builder - Helps you structure, name, price, and position a new offer from concept to ready-to-sell.',
        ],
      },
      {
        type: 'tip',
        heading: 'How to Use Roles Effectively',
        content: 'Do not just say "act as an expert." Name the role with precision. The more specific you are, the more focused the thinking you get back. You can stack roles in one session - just be clear about when you are switching.',
      },
    ],
  },
  {
    slug: 'chaining-models',
    title: 'Chaining Models',
    subtitle: 'Ladder and Tree methods for multi-step AI projects',
    description: 'Most powerful work with your AI Co-Founder happens in chains - where the output of one prompt becomes the input of the next. This template shows you both methods.',
    icon: '07',
    sections: [
      {
        type: 'intro',
        content: 'A single prompt gets you a single output. A chain of prompts builds something real. These two models show you how to structure multi-step projects so each prompt builds on the last.',
      },
      {
        type: 'list',
        heading: 'The Ladder Model (Linear)',
        items: [
          'Step 1 - Setup: Run your Master Setup Prompt to establish context and role.',
          'Step 2 - Define: Prompt 1 defines the goal, audience, and key insight.',
          'Step 3 - Plan: Prompt 2 creates the structure or outline based on Prompt 1 output.',
          'Step 4 - Build: Prompt 3 creates the actual content or deliverable from the plan.',
          'Step 5 - Refine: Prompt 4 reviews and improves the output from Prompt 3.',
          'Step 6 - Finalise: Prompt 5 formats and prepares the final version for use.',
        ],
      },
      {
        type: 'prompt',
        heading: 'Ladder Chain Example - Building a Sales Email',
        content: `Prompt 1 (Define):
"Based on my context, who is the ideal person to receive a cold outreach email about [offer]? What is their biggest pain point and what outcome matters most to them?"

Prompt 2 (Plan):
"Using those insights, give me 3 different angles for a sales email about [offer]. Rank them by likely conversion impact."

Prompt 3 (Build):
"Write the top-ranked email in full. Use the pain-to-outcome structure. Keep it under 200 words. Subject line included."

Prompt 4 (Refine):
"Review this email for clarity, persuasion, and tone. Rewrite the opening line to be stronger and tighten the CTA."

Prompt 5 (Finalise):
"Format the final version as a ready-to-send email with subject line, body, and signature block."`,
      },
      {
        type: 'list',
        heading: 'The Tree Model (Branching)',
        items: [
          'Step 1 - Setup: Run your Master Setup Prompt.',
          'Step 2 - Branch: Prompt 1 generates multiple options, approaches, or directions.',
          'Step 3 - Explore: Run separate prompts to develop each branch in more detail.',
          'Step 4 - Evaluate: Prompt back to compare all branches against your criteria.',
          'Step 5 - Select: Choose the strongest branch and develop it fully using Ladder method.',
        ],
      },
      {
        type: 'prompt',
        heading: 'Tree Chain Example - Developing a New Offer',
        content: `Prompt 1 (Branch):
"Generate 4 different offer concepts for a [business type] targeting [audience]. Each should be distinct in format, price point, and delivery method."

[Explore Branch A]
Prompt 2A: "Develop Offer A in detail - what is included, how is it delivered, what outcome does the buyer get, and what would make it irresistible?"

[Explore Branch B]
Prompt 2B: "Develop Offer B in detail using the same criteria."

[Explore Branch C - if needed]
Prompt 2C: "Develop Offer C in detail."

Prompt 3 (Evaluate):
"Compare all three offers against these criteria: [list your criteria]. Score each out of 10 and give a recommendation."

Prompt 4 (Select and develop):
"I am going with [chosen offer]. Now build the full sales page outline, pricing structure, and 3-step launch plan."`,
      },
      {
        type: 'tip',
        heading: 'When to Use Each Model',
        content: 'Use the Ladder when you know what you want to build and just need to move through it step by step. Use the Tree when you are still exploring, need options, or want to pressure-test a decision before committing to one direction. Most real projects combine both.',
      },
    ],
  },
]

export function getTemplate(slug: string): Template | undefined {
  return templates.find(t => t.slug === slug)
}
