import React, { useState, useEffect } from 'react'

const t = {
  en: {
    heroTag: 'USE CASE · ZERO-FRICTION AGENT ONBOARDING',
    heroTitle1: 'From hours to ',
    heroTitle2: 'one command',
    heroSub: 'Today, setting up a new agent means: create accounts, buy API keys, configure credentials, manage rotation — all manually. AgentKeys reduces this to a single step.',
    painLabel: 'THE PAIN TODAY',
    painTitle: 'Setting up a new agent is absurdly complex',
    painDesc: 'You install OpenClaw or Claude Code in one command. But then you spend hours on credential plumbing.',
    painSteps: [
      { t:'Install agent', d:'openclaw install or claude code — done in 30s', time:'30s', status:'easy' },
      { t:'Create Google account', d:'Go to Google, fill forms, 2FA, verify email', time:'10 min', status:'manual' },
      { t:'Create 1Password vault', d:'Sign up, create vault, install extension', time:'15 min', status:'manual' },
      { t:'Buy OpenRouter credits', d:'Sign up, add payment method, generate key', time:'10 min', status:'manual' },
      { t:'Buy Claude API key', d:'Sign up at Anthropic, add billing, create key', time:'10 min', status:'manual' },
      { t:'Configure each key', d:'Copy-paste into .env files, test each one', time:'15 min', status:'manual' },
      { t:'Set up key rotation', d:'Calendar reminders? Cron jobs? Usually skipped.', time:'???', status:'broken' },
      { t:'Repeat for next agent', d:'Cursor needs different scopes. Start over.', time:'60+ min', status:'broken' },
    ],
    tierLabel: 'THE AGENTKEYS SOLUTION',
    tierTitle: 'Three tiers of automation',
    tierDesc: 'Each tier builds on the previous one, progressively removing human steps from agent onboarding.',
    tier1t: 'Tier 1: Centralized Vault',
    tier1sub: 'You create. AgentKeys manages.',
    tier1d: 'You set up your agent, create accounts, buy API keys manually — then put everything into AgentKeys. From that point on, AgentKeys handles all credential injection, rotation, and audit automatically.',
    tier1steps: [
      { actor:'you', action:'Install OpenClaw', detail:'openclaw install' },
      { actor:'you', action:'Buy API keys', detail:'OpenRouter, Claude API, etc.' },
      { actor:'you', action:'Create accounts', detail:'Google, GitHub, Vercel, etc.' },
      { actor:'you', action:'Import to AgentKeys', detail:'agentkeys import --scan' },
      { actor:'agentkeys', action:'Auto-inject credentials', detail:'TEE vault → agent runtime' },
      { actor:'agentkeys', action:'Auto-rotate on schedule', detail:'30-day cycle, zero downtime' },
      { actor:'agentkeys', action:'Audit every access', detail:'On-chain, ZKP-verified' },
    ],
    tier2t: 'Tier 2: Agent-Assisted Setup',
    tier2sub: 'You point. Agent creates.',
    tier2d: 'You install your agent and provide API keys. Then tell AgentKeys what services you need — it uses the agent itself to create accounts, configure credentials, and set up rotation. You just approve.',
    tier2steps: [
      { actor:'you', action:'Install OpenClaw', detail:'openclaw install' },
      { actor:'you', action:'Provide API keys', detail:'OpenRouter key, Claude API key' },
      { actor:'you', action:'Tell AgentKeys what you need', detail:'"I need Google, GitHub, Vercel"' },
      { actor:'agentkeys', action:'Agent creates accounts', detail:'Auto-signup with agent@ identity' },
      { actor:'agentkeys', action:'Agent configures keys', detail:'Generate, scope, store in TEE' },
      { actor:'agentkeys', action:'Agent sets up rotation', detail:'Auto-rotate policies applied' },
      { actor:'you', action:'Approve the setup', detail:'Review & confirm in dashboard' },
    ],
    tier3t: 'Tier 3: Fully Autonomous',
    tier3sub: 'You fund. Agent handles everything.',
    tier3d: 'You install your agent and give it a USDC balance. AgentKeys autonomously subscribes to services, creates accounts, buys API keys, configures credentials, manages rotation — you just set the budget.',
    tier3steps: [
      { actor:'you', action:'Install OpenClaw', detail:'openclaw install' },
      { actor:'you', action:'Fund AgentKeys', detail:'Deposit 100 USDC to vault' },
      { actor:'you', action:'Define intent', detail:'"I need a coding assistant with web access"' },
      { actor:'agentkeys', action:'Discover required skills', detail:'Browse AgentSkills registry' },
      { actor:'agentkeys', action:'Subscribe to services', detail:'Pay with USDC: OpenRouter, Vercel, etc.' },
      { actor:'agentkeys', action:'Create all accounts', detail:'Auto-signup, auto-verify, auto-configure' },
      { actor:'agentkeys', action:'Full lifecycle management', detail:'Rotate, renew, upgrade, report' },
    ],
    skillsLabel: 'AGENTKEYS SKILLS',
    skillsTitle: 'Every capability is a composable skill',
    skillsDesc: 'Following the Agent Skills specification (agentskills.io), every AgentKeys capability is packaged as a discoverable, composable skill that works across OpenClaw, Claude Code, Cursor, Codex, and 20+ platforms.',
    skills: [
      { name:'credential-inject', desc:'Inject scoped credentials into agent runtime sessions via TEE. Supports OpenAI, Anthropic, Google, GitHub, AWS, and 50+ providers.', trigger:'Agent requests any API credential' },
      { name:'key-rotate', desc:'Automatic key rotation with zero-downtime credential swap. Configurable cycle (7d, 30d, 90d). Handles provider-specific rotation APIs.', trigger:'Key approaching expiry or on schedule' },
      { name:'account-create', desc:'Autonomous account creation on supported services. Handles signup flows, email verification, 2FA setup, and initial credential generation.', trigger:'"I need a {service} account"' },
      { name:'spend-guard', desc:'Real-time spend monitoring and enforcement per agent, per credential, per time window. Auto-deny when limits hit. Alerts on anomalies.', trigger:'Every credential usage event' },
      { name:'api-subscribe', desc:'Browse service catalogs, compare pricing, auto-subscribe with USDC/stablecoin payments. Handles billing setup and plan management.', trigger:'"Subscribe to {service}" or auto-discovery' },
      { name:'audit-report', desc:'Generate human-readable execution reports with call graphs, policy matches, spend summaries, and anomaly flags. Exportable PDF/HTML.', trigger:'"Show me what my agents did today"' },
      { name:'scope-policy', desc:'Define and enforce per-agent permission policies: scope, rate limit, time window, spend cap, chain depth. YAML-based policy files.', trigger:'Agent registration or policy update' },
      { name:'delegation-chain', desc:'Manage User→Agent→Sub-agent delegation chains. Enforce permission inheritance rules. Auto-revoke on chain break.', trigger:'Agent invokes another agent' },
    ],
    compareLabel: 'BEFORE & AFTER',
    compareTitle: 'The onboarding experience, transformed',
    demoLabel: 'INTERACTIVE DEMO',
    demoTitle: 'Try the onboarding flow',
    ctaTitle: 'Ready to eliminate credential friction?',
    ctaSub: 'Install AgentKeys and onboard your first agent in under a minute.',
  },
  zh: {
    heroTag: '应用场景 · 零摩擦 Agent 配置',
    heroTitle1: '从几小时到',
    heroTitle2: '一条命令',
    heroSub: '今天，配置一个新 agent 意味着：创建账号、购买 API key、配置凭证、管理轮换——全部手动。AgentKeys 将此缩减到一步。',
    painLabel: '今天的痛点',
    painTitle: '配置一个新 agent 复杂得离谱',
    painDesc: '安装 OpenClaw 或 Claude Code 只需一条命令。但之后你要花几个小时在凭证配置上。',
    painSteps: [
      { t:'安装 agent', d:'openclaw install 或 claude code——30秒搞定', time:'30秒', status:'easy' },
      { t:'创建 Google 账号', d:'去 Google，填表单，2FA，验证邮箱', time:'10分钟', status:'manual' },
      { t:'创建 1Password', d:'注册，创建金库，安装插件', time:'15分钟', status:'manual' },
      { t:'购买 OpenRouter 额度', d:'注册，添加支付方式，生成 key', time:'10分钟', status:'manual' },
      { t:'购买 Claude API key', d:'在 Anthropic 注册，添加账单，创建 key', time:'10分钟', status:'manual' },
      { t:'逐个配置 key', d:'复制粘贴到 .env 文件，逐个测试', time:'15分钟', status:'manual' },
      { t:'设置 key 轮换', d:'日历提醒？Cron 任务？通常直接跳过。', time:'???', status:'broken' },
      { t:'下一个 agent 重来', d:'Cursor 需要不同权限范围。从头开始。', time:'60+分钟', status:'broken' },
    ],
    tierLabel: 'AGENTKEYS 解决方案',
    tierTitle: '三层自动化',
    tierDesc: '每一层构建在前一层之上，逐步消除 agent 配置中的人工步骤。',
    tier1t: 'Tier 1：集中式金库',
    tier1sub: '你创建。AgentKeys 管理。',
    tier1d: '你手动配置 agent、创建账号、购买 API key——然后把所有凭证导入 AgentKeys。此后，AgentKeys 自动处理所有凭证注入、轮换和审计。',
    tier1steps: [
      { actor:'you', action:'安装 OpenClaw', detail:'openclaw install' },
      { actor:'you', action:'购买 API keys', detail:'OpenRouter, Claude API 等' },
      { actor:'you', action:'创建账号', detail:'Google, GitHub, Vercel 等' },
      { actor:'you', action:'导入到 AgentKeys', detail:'agentkeys import --scan' },
      { actor:'agentkeys', action:'自动注入凭证', detail:'TEE 金库 → agent 运行时' },
      { actor:'agentkeys', action:'按计划自动轮换', detail:'30天周期，零停机' },
      { actor:'agentkeys', action:'审计每次访问', detail:'链上记录，ZKP 验证' },
    ],
    tier2t: 'Tier 2：Agent 辅助配置',
    tier2sub: '你指方向。Agent 去创建。',
    tier2d: '你安装 agent 并提供 API key。然后告诉 AgentKeys 你需要什么服务——它使用 agent 本身来创建账号、配置凭证、设置轮换。你只需审批。',
    tier2steps: [
      { actor:'you', action:'安装 OpenClaw', detail:'openclaw install' },
      { actor:'you', action:'提供 API keys', detail:'OpenRouter key, Claude API key' },
      { actor:'you', action:'告诉 AgentKeys 需要什么', detail:'"我需要 Google、GitHub、Vercel"' },
      { actor:'agentkeys', action:'Agent 创建账号', detail:'使用 agent@ 身份自动注册' },
      { actor:'agentkeys', action:'Agent 配置密钥', detail:'生成、限定范围、存入 TEE' },
      { actor:'agentkeys', action:'Agent 设置轮换', detail:'自动轮换策略生效' },
      { actor:'you', action:'审批配置', detail:'在仪表盘中审查并确认' },
    ],
    tier3t: 'Tier 3：全自主',
    tier3sub: '你充值。Agent 处理一切。',
    tier3d: '你安装 agent 并给它 USDC 余额。AgentKeys 自主订阅服务、创建账号、购买 API key、配置凭证、管理轮换——你只需设定预算。',
    tier3steps: [
      { actor:'you', action:'安装 OpenClaw', detail:'openclaw install' },
      { actor:'you', action:'给 AgentKeys 充值', detail:'存入 100 USDC 到金库' },
      { actor:'you', action:'定义意图', detail:'"我需要一个有网络访问的编程助手"' },
      { actor:'agentkeys', action:'发现所需 skills', detail:'浏览 AgentSkills 注册表' },
      { actor:'agentkeys', action:'订阅服务', detail:'用 USDC 支付：OpenRouter、Vercel 等' },
      { actor:'agentkeys', action:'创建所有账号', detail:'自动注册、自动验证、自动配置' },
      { actor:'agentkeys', action:'全生命周期管理', detail:'轮换、续期、升级、报告' },
    ],
    skillsLabel: 'AGENTKEYS SKILLS',
    skillsTitle: '每个能力都是可组合的 Skill',
    skillsDesc: '遵循 Agent Skills 规范（agentskills.io），AgentKeys 的每个能力都打包为可发现、可组合的 skill，可在 OpenClaw、Claude Code、Cursor、Codex 等 20+ 平台上运行。',
    skills: [
      { name:'credential-inject', desc:'通过 TEE 将受限凭证注入 agent 运行时会话。支持 OpenAI、Anthropic、Google、GitHub、AWS 等 50+ 提供商。', trigger:'Agent 请求任何 API 凭证' },
      { name:'key-rotate', desc:'零停机自动密钥轮换。可配置周期（7天、30天、90天）。处理提供商特定的轮换 API。', trigger:'Key 即将到期或按计划' },
      { name:'account-create', desc:'在支持的服务上自主创建账号。处理注册流程、邮箱验证、2FA 设置和初始凭证生成。', trigger:'"我需要一个 {服务} 账号"' },
      { name:'spend-guard', desc:'每个 agent、每个凭证、每个时间窗口的实时消费监控和执行。超限自动拒绝。异常告警。', trigger:'每次凭证使用事件' },
      { name:'api-subscribe', desc:'浏览服务目录，比较定价，使用 USDC/稳定币自动订阅。处理账单设置和计划管理。', trigger:'"订阅 {服务}" 或自动发现' },
      { name:'audit-report', desc:'生成人类可读的执行报告，含调用图、策略匹配、消费摘要和异常标记。可导出 PDF/HTML。', trigger:'"显示我的 agent 今天做了什么"' },
      { name:'scope-policy', desc:'定义和执行每个 agent 的权限策略：范围、频率限制、时间窗口、消费上限、链深度。基于 YAML 的策略文件。', trigger:'Agent 注册或策略更新' },
      { name:'delegation-chain', desc:'管理 User→Agent→Sub-agent 委托链。执行权限继承规则。链断裂时自动撤销。', trigger:'Agent 调用另一个 agent' },
    ],
    compareLabel: '前后对比',
    compareTitle: '配置体验，彻底改变',
    demoLabel: '交互演示',
    demoTitle: '体验配置流程',
    ctaTitle: '准备好消除凭证摩擦了吗？',
    ctaSub: '安装 AgentKeys，一分钟内配置好你的第一个 agent。',
  }
}

export default function OnboardingPage({ lang }) {
  const s = t[lang]
  return (
    <div>
      <OnboardingHero s={s} />
      <div className="divider" />
      <PainSection s={s} />
      <div className="divider" />
      <TierSection s={s} />
      <div className="divider" />
      <OnboardingDemo s={s} lang={lang} />
      <div className="divider" />
      <SkillsSection s={s} />
      <div className="divider" />
      <BeforeAfter s={s} lang={lang} />
      <OnboardingCTA s={s} />
    </div>
  )
}

function OnboardingHero({ s }) {
  return (
    <section className="hero" style={{ paddingTop:120, paddingBottom:60 }}>
      <div className="hero-glow" />
      <div className="hero-grid" />
      <div style={{ position:'relative', zIndex:1 }}>
        <div className="hero-tag"><span className="dot" /> {s.heroTag}</div>
        <h1 style={{ fontSize:52 }}>{s.heroTitle1}<span className="gradient-text">{s.heroTitle2}</span></h1>
        <p className="hero-sub">{s.heroSub}</p>
      </div>
    </section>
  )
}

function PainSection({ s }) {
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.painLabel}</div>
        <h2 className="section-title">{s.painTitle}</h2>
        <p className="section-desc">{s.painDesc}</p>
      </div>
      <div className="demo-window" style={{ maxWidth:800, margin:'0 auto' }}>
        <div className="demo-titlebar">
          <div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/>
          <div className="demo-titlebar-text">Today's agent setup flow</div>
        </div>
        <div style={{ padding:'20px 24px' }}>
          {s.painSteps.map((step,i)=>(
            <div key={i} className="pain-step">
              <div className="pain-num" style={{
                background: step.status==='easy'?'var(--green-dim)':step.status==='manual'?'var(--yellow-dim)':'var(--red-dim)',
                color: step.status==='easy'?'var(--green)':step.status==='manual'?'var(--yellow)':'var(--red)',
              }}>{i+1}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <strong style={{ fontSize:14 }}>{step.t}</strong>
                  <span className="mono" style={{
                    fontSize:12, fontWeight:600,
                    color: step.status==='easy'?'var(--green)':step.status==='manual'?'var(--yellow)':'var(--red)',
                  }}>{step.time}</span>
                </div>
                <p style={{ fontSize:13, color:'var(--text-muted)', margin:'2px 0 0' }}>{step.d}</p>
              </div>
            </div>
          ))}
          <div style={{ marginTop:16, padding:'12px 16px', background:'var(--red-dim)', borderRadius:8, border:'1px solid rgba(239,68,68,0.2)', textAlign:'center' }}>
            <span style={{ fontSize:14, fontWeight:700, color:'var(--red)' }}>
              Total: 2+ hours of manual work per agent. Rotation usually never happens.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function TierSection({ s }) {
  const [activeTier, setActiveTier] = useState(1)
  const tiers = [
    { t:s.tier1t, sub:s.tier1sub, d:s.tier1d, steps:s.tier1steps, humanSteps:4, autoSteps:3 },
    { t:s.tier2t, sub:s.tier2sub, d:s.tier2d, steps:s.tier2steps, humanSteps:3, autoSteps:4 },
    { t:s.tier3t, sub:s.tier3sub, d:s.tier3d, steps:s.tier3steps, humanSteps:3, autoSteps:4 },
  ]
  const tier = tiers[activeTier-1]

  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.tierLabel}</div>
        <h2 className="section-title">{s.tierTitle}</h2>
        <p className="section-desc">{s.tierDesc}</p>
      </div>

      {/* Tier selector */}
      <div style={{ display:'flex', justifyContent:'center', gap:12, marginBottom:40 }}>
        {tiers.map((ti,i)=>(
          <button key={i} onClick={()=>setActiveTier(i+1)} style={{
            padding:'12px 24px', borderRadius:10, border:'1px solid', cursor:'pointer',
            fontWeight:600, fontSize:14, transition:'all 0.2s',
            background: activeTier===i+1 ? 'var(--accent)' : 'var(--surface)',
            borderColor: activeTier===i+1 ? 'var(--accent)' : 'var(--border)',
            color: activeTier===i+1 ? '#fff' : 'var(--text-muted)',
          }}>
            Tier {i+1}
          </button>
        ))}
      </div>

      {/* Active tier content */}
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <h3 style={{ fontSize:24, fontWeight:800, marginBottom:4 }}>{tier.t}</h3>
          <p style={{ fontSize:16, color:'var(--accent-light)', fontWeight:500 }}>{tier.sub}</p>
          <p style={{ fontSize:15, color:'var(--text-muted)', marginTop:12, maxWidth:600, margin:'12px auto 0' }}>{tier.d}</p>
        </div>

        {/* Automation bar */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:24, justifyContent:'center' }}>
          <span style={{ fontSize:12, color:'var(--text-dim)' }}>Manual</span>
          <div style={{ width:300, height:8, background:'var(--surface2)', borderRadius:4, overflow:'hidden' }}>
            <div style={{
              height:'100%', borderRadius:4, transition:'width 0.5s',
              background:'linear-gradient(90deg, var(--yellow), var(--green))',
              width: activeTier===1?'43%':activeTier===2?'57%':'86%',
            }} />
          </div>
          <span style={{ fontSize:12, color:'var(--text-dim)' }}>Automated</span>
          <span style={{ fontSize:13, fontWeight:700, color:'var(--green)', marginLeft:8 }}>
            {activeTier===1?'43%':activeTier===2?'57%':'86%'}
          </span>
        </div>

        {/* Steps */}
        <div className="demo-window">
          <div className="demo-titlebar">
            <div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/>
            <div className="demo-titlebar-text">AgentKeys — Tier {activeTier} Onboarding Flow</div>
          </div>
          <div style={{ padding:'20px 24px' }}>
            {tier.steps.map((step,i)=>(
              <div key={i} className="tier-step" style={{
                borderLeft: `3px solid ${step.actor==='you'?'var(--yellow)':'var(--green)'}`,
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
                  <span style={{
                    fontSize:10, fontWeight:700, letterSpacing:1, textTransform:'uppercase',
                    padding:'2px 8px', borderRadius:4,
                    background: step.actor==='you'?'var(--yellow-dim)':'var(--green-dim)',
                    color: step.actor==='you'?'var(--yellow)':'var(--green)',
                  }}>{step.actor==='you'?'YOU':'AGENTKEYS'}</span>
                  <strong style={{ fontSize:14 }}>{step.action}</strong>
                </div>
                <p className="mono" style={{ fontSize:12, color:'var(--text-dim)', margin:0 }}>{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function OnboardingDemo({ s, lang }) {
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const lines = [
    { prompt:'$', parts:[{t:' openclaw ',c:'cmd'},{t:'install',c:'str'}], delay:800 },
    { parts:[{t:'✓ OpenClaw v3.2.1 installed',c:'success'}], delay:200 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { prompt:'$', parts:[{t:' agentkeys ',c:'cmd'},{t:'init ',c:'cmd'},{t:'--fund 100usdc',c:'flag'}], delay:800 },
    { parts:[{t:'✓ AgentKeys vault initialized. Balance: 100.00 USDC',c:'success'}], delay:200 },
    { parts:[{t:'  Identity: agent@hanwencheng.com (Heima VC: 0xab12...ef56)',c:'output'}], delay:150 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { prompt:'$', parts:[{t:' agentkeys ',c:'cmd'},{t:'setup ',c:'cmd'},{t:'"coding assistant with web access"',c:'str'}], delay:1000 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { parts:[{t:'⚙ Analyzing intent...',c:'output'}], delay:400 },
    { parts:[{t:'  Required skills: credential-inject, account-create, api-subscribe, key-rotate',c:'output'}], delay:300 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { parts:[{t:'⚙ Discovering services from AgentSkills registry...',c:'output'}], delay:500 },
    { parts:[{t:'  Found: openrouter (LLM), github (code), google (email), vercel (deploy)',c:'output'}], delay:300 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { parts:[{t:'⚙ Subscribing to services...',c:'output'}], delay:400 },
    { parts:[{t:'  ✓ OpenRouter  — subscribed ($20/mo plan) — API key generated',c:'success'}], delay:200 },
    { parts:[{t:'  ✓ GitHub      — account created (agent-hanwen) — token generated',c:'success'}], delay:200 },
    { parts:[{t:'  ✓ Google      — workspace created — OAuth configured',c:'success'}], delay:200 },
    { parts:[{t:'  ✓ Vercel      — connected via GitHub — deploy token generated',c:'success'}], delay:200 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { parts:[{t:'⚙ Configuring policies...',c:'output'}], delay:300 },
    { parts:[{t:'  ✓ Spend limit: $50/month per service',c:'success'}], delay:150 },
    { parts:[{t:'  ✓ Auto-rotation: 30-day cycle',c:'success'}], delay:150 },
    { parts:[{t:'  ✓ Rate limits: per-scope defaults applied',c:'success'}], delay:150 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { parts:[{t:'⚙ Storing credentials in TEE vault...',c:'output'}], delay:300 },
    { parts:[{t:'  ✓ 4 credentials encrypted in Intel SGX enclave',c:'success'}], delay:200 },
    { parts:[{t:'  ✓ All on-chain audit records created',c:'success'}], delay:200 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { parts:[{t:'✅ Setup complete! Your agent is ready.',c:'success'}], delay:100 },
    { parts:[{t:'  Services: 4 | Credentials: 4 | Policies: 4 | Cost: $0.00 (first month free)',c:'output'}], delay:150 },
    { parts:[{t:'  Total time: 47 seconds',c:'success'}], delay:100 },
    { parts:[{t:'',c:'output'}], delay:100 },
    { parts:[{t:'  Run `agentkeys dashboard` to manage your agents.',c:'output'}], delay:100 },
  ]

  useEffect(()=>{
    if (step < lines.length) {
      const timer = setTimeout(()=>setStep(s=>s+1), lines[step].delay || 200)
      return ()=>clearTimeout(timer)
    }
  },[step])

  return (
    <section className="section container" id="onboarding-demo">
      <div className="section-header">
        <div className="section-label">{s.demoLabel}</div>
        <h2 className="section-title">{s.demoTitle}</h2>
      </div>
      <div className="demo-window" style={{ maxWidth:800, margin:'0 auto' }}>
        <div className="demo-titlebar">
          <div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/>
          <div className="demo-titlebar-text">Terminal — Tier 3 Autonomous Onboarding</div>
        </div>
        <div className="demo-body" style={{ minHeight:460 }}>
          <div className="terminal">
            {lines.slice(0,step).map((line,i)=>(
              <div className="terminal-line" key={i} style={{ animationDelay:`${i*0.02}s` }}>
                {line.prompt && <span className="prompt">{line.prompt}</span>}
                {line.parts.map((p,j)=><span key={j} className={p.c}>{p.t}</span>)}
              </div>
            ))}
            {step < lines.length && (
              <div className="terminal-line" style={{ opacity:1 }}>
                <span className="prompt">$</span>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>
        </div>
      </div>
      {step >= lines.length && (
        <div style={{ textAlign:'center', marginTop:24 }}>
          <button className="btn btn-ghost" onClick={()=>setStep(0)} style={{ fontSize:13 }}>↻ Replay</button>
        </div>
      )}
    </section>
  )
}

function SkillsSection({ s }) {
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.skillsLabel}</div>
        <h2 className="section-title">{s.skillsTitle}</h2>
        <p className="section-desc">{s.skillsDesc}</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:14 }}>
        {s.skills.map((sk,i)=>(
          <div key={i} className="skill-card">
            <div className="skill-name mono">agentkeys/{sk.name}</div>
            <p style={{ fontSize:13, color:'var(--text-muted)', margin:'10px 0', lineHeight:1.6 }}>{sk.desc}</p>
            <div className="skill-trigger">
              <span style={{ fontSize:10, fontWeight:600, color:'var(--text-dim)', letterSpacing:0.5 }}>TRIGGER: </span>
              <span style={{ fontSize:11, color:'var(--accent-light)' }}>{sk.trigger}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:'center', marginTop:24 }}>
        <a href="https://agentskills.io" target="_blank" rel="noopener" className="btn btn-ghost" style={{ fontSize:13 }}>
          View Agent Skills Specification →
        </a>
      </div>
    </section>
  )
}

function BeforeAfter({ s, lang }) {
  const before = [
    { step:'Install agent', time:'30s', auto:true },
    { step:'Create Google account', time:'10m', auto:false },
    { step:'Create password manager', time:'15m', auto:false },
    { step:'Buy API keys', time:'20m', auto:false },
    { step:'Configure each key', time:'15m', auto:false },
    { step:'Set up rotation', time:'skipped', auto:false },
    { step:'Next agent: repeat all', time:'60m+', auto:false },
  ]
  const after = [
    { step:'Install agent', time:'30s', auto:true },
    { step:'agentkeys init --fund 100usdc', time:'5s', auto:true },
    { step:'agentkeys setup "coding assistant"', time:'47s', auto:true },
    { step:'Accounts, keys, policies, rotation', time:'auto', auto:true },
    { step:'Next agent: agentkeys setup ...', time:'47s', auto:true },
  ]
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.compareLabel}</div>
        <h2 className="section-title">{s.compareTitle}</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, maxWidth:900, margin:'0 auto' }}>
        <div>
          <h3 style={{ textAlign:'center', fontSize:16, fontWeight:700, marginBottom:16, color:'var(--red)' }}>
            {lang==='zh'?'之前：手动配置':'Before: Manual Setup'}
          </h3>
          <div className="demo-window" style={{ boxShadow:'0 8px 30px rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)' }}>
            <div className="demo-titlebar"><div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/><div className="demo-titlebar-text">~2 hours per agent</div></div>
            <div style={{ padding:'16px 20px' }}>
              {before.map((s,i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:13, color:s.auto?'var(--green)':'var(--text-muted)' }}>{s.auto?'✓':'✗'} {s.step}</span>
                  <span className="mono" style={{ fontSize:12, color:s.time==='skipped'?'var(--red)':'var(--yellow)', fontWeight:600 }}>{s.time}</span>
                </div>
              ))}
              <div style={{ marginTop:12, textAlign:'center', fontSize:20, fontWeight:800, color:'var(--red)' }}>
                ~2h {lang==='zh'?'人工时间':'manual time'}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ textAlign:'center', fontSize:16, fontWeight:700, marginBottom:16, color:'var(--green)' }}>
            {lang==='zh'?'之后：AgentKeys':'After: AgentKeys'}
          </h3>
          <div className="demo-window" style={{ boxShadow:'0 8px 30px rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.2)' }}>
            <div className="demo-titlebar"><div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/><div className="demo-titlebar-text">~1 minute per agent</div></div>
            <div style={{ padding:'16px 20px' }}>
              {after.map((s,i)=>(
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid var(--border)' }}>
                  <span style={{ fontSize:13, color:'var(--green)' }}>✓ {s.step}</span>
                  <span className="mono" style={{ fontSize:12, color:'var(--green)', fontWeight:600 }}>{s.time}</span>
                </div>
              ))}
              <div style={{ marginTop:12, textAlign:'center', fontSize:20, fontWeight:800, color:'var(--green)' }}>
                ~1min {lang==='zh'?'自动完成':'fully automated'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OnboardingCTA({ s }) {
  return (
    <footer className="footer">
      <h2 className="section-title">{s.ctaTitle}</h2>
      <p className="footer-sub" style={{ marginBottom:24 }}>{s.ctaSub}</p>
      <div style={{ display:'flex', justifyContent:'center', gap:12 }}>
        <a href="/" className="btn btn-ghost">← Back to Main</a>
        <a href="#onboarding-demo" className="btn btn-primary">Watch Demo →</a>
      </div>
    </footer>
  )
}
