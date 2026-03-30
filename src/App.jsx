import React, { useState, useEffect, useRef } from 'react'

// ─── i18n ───
const t = {
  en: {
    nav: { product: 'Product', compare: 'vs 1Password', model: 'Business Model', roadmap: 'Roadmap' },
    heroTag: 'Built on Heima Network · TEE + Blockchain',
    heroTitle1: 'Agent', heroTitle2: 'Vault',
    heroSub: 'Decentralized credential management for AI agents. Your keys. Your agents. Your rules.',
    heroMeta: 'Business Plan — March 2026',
    btnDemo: 'View Live Demo', btnPlan: 'Read Full Plan',
    // Problem
    probLabel: 'THE PROBLEM',
    probTitle: 'Agent credentials are broken',
    probDesc: 'AI agents need keys to act on your behalf. Today, that means trusting centralized vaults, zero auditability, and no portable identity.',
    prob1t: 'Centralized Trust', prob1d: '1Password, HashiCorp — you trust the vendor with all secrets. One breach = everything exposed.',
    prob2t: 'No Auditability', prob2d: 'When an agent uses your API key, there\'s no tamper-proof, user-verifiable access record.',
    prob3t: 'No Portable Identity', prob3d: 'Each platform creates its own agent identity silo. No cross-platform, user-controlled identity.',
    prob4t: 'Fragmented Auth Layer', prob4d: 'MCP standardizes agent-to-service communication, but the credential layer remains unsolved.',
    // Solution
    solLabel: 'THE SOLUTION',
    solTitle: 'On-chain secure vault for AI agents',
    solDesc: 'Treat agent credential access like a blockchain transaction — signed, auditable, private, sovereign.',
    // Flow
    flowLabel: 'HOW IT WORKS',
    flowTitle: 'Six steps to sovereign agent access',
    flow: [
      { t: 'Sign In', d: 'Authenticate with your Heima identity (wallet, email, or iCloud)' },
      { t: 'Register Agent', d: 'Create agent@you.com — a Verifiable Credential on Heima' },
      { t: 'Grant Scope', d: '"Read Gmail, use OpenAI ($50/mo cap), deploy to Vercel — nothing else"' },
      { t: 'TEE Vault', d: 'Secrets never leave the TEE. Credentials injected into agent runtime sessions' },
      { t: 'On-chain Log', d: 'Privacy-preserving audit trail via ZKP / selective disclosure' },
      { t: 'Instant Revoke', d: 'One action revokes the agent VC. Access stops everywhere immediately' },
    ],
    // Demo
    demoLabel: 'LIVE DEMO',
    demoTitle: 'See AgentVault in action',
    demoTab1: 'Dashboard', demoTab2: 'Audit Log', demoTab3: 'Terminal',
    // Compare
    compLabel: 'COMPARISON',
    compTitle: 'AgentVault vs 1Password Unified Access',
    compDesc: 'Both solve agent credential management. One is centralized and enterprise-first. The other is decentralized and user-sovereign.',
    comp1pTitle: '1Password Unified Access',
    comp1pSub: 'Centralized · Enterprise-first · Vendor-controlled',
    compAvTitle: 'AgentVault',
    compAvSub: 'Decentralized · User-sovereign · TEE + On-chain',
    // Table
    tblFeature: 'Feature', tblAv: 'AgentVault', tbl1p: '1Password', tblHashi: 'HashiCorp', tblCyber: 'CyberArk',
    // Architecture
    archLabel: 'ARCHITECTURE',
    archTitle: 'TEE-powered credential flow',
    // Market
    mktLabel: 'MARKET',
    mktTitle: 'The timing is now',
    mkt1t: '1Password Unified Access', mkt1d: 'Launched March 2026 with Anthropic, Cursor, GitHub, Vercel — validating the problem.',
    mkt2t: '$25B CyberArk Acquisition', mkt2d: 'Palo Alto\'s largest cybersecurity deal, driven by machine identity management.',
    mkt3t: 'Bessemer 2026 Thesis', mkt3d: '"Securing AI agents" named the defining cybersecurity challenge of 2026.',
    mkt4t: 'MCP Ecosystem Gap', mkt4d: 'Agent-to-service protocol standardizing, but credential/auth layer remains unsolved.',
    // Pricing
    prcLabel: 'BUSINESS MODEL',
    prcTitle: 'Simple, scalable pricing',
    prcFree: 'Free', prcPro: 'Pro', prcTeam: 'Team',
    prcForever: 'forever', prcMonth: '/month', prcSeat: '/seat/month',
    // Roadmap
    rdLabel: 'ROADMAP',
    rdTitle: 'From prototype to market leader',
    rd1t: 'Pre-seed', rd1a: '$500K–$800K · Months 0–6', rd1d: 'Working prototype on Heima testnet. SDK with 2–3 agent framework integrations. MCP reference implementation. 500+ developers, 3–5 design partners.',
    rd2t: 'Seed', rd2a: '$2M–$4M · Months 6–18', rd2d: 'Desktop app + browser extension. 10K users, 2K+ MAU. 3+ agent platform partnerships. Audit pallet live on mainnet.',
    rd3t: 'Series A', rd3a: '$10M–$15M · Months 18–36', rd3d: '50K+ paying users, $5M+ ARR. Enterprise product with 10+ org customers. SOC 2 certified. Team of 20–30.',
    // Risks
    rskLabel: 'RISKS & MITIGATIONS',
    rsk1t: 'TEE Trust Assumptions', rsk1d: 'Side-channel attacks exist. Defense in depth: TEE + encryption at rest + on-chain verification.',
    rsk2t: 'Regulatory Uncertainty', rsk2d: 'On-chain logs may face scrutiny. Privacy-by-design with ZKP, optional off-chain mode.',
    rsk3t: 'Adoption Chicken-and-Egg', rsk3d: 'Open-source SDK, MCP standard compliance, standalone CLI that works without platform integration.',
    rsk4t: 'Incumbent Competition', rsk4d: 'Target individual/small-team segment first. Win on sovereignty and developer experience.',
    // Footer
    footTagline: 'We\'re building the identity layer for the agentic internet.',
    footSub: 'AgentVault — Your keys. Your agents. Your rules.',
  },
  zh: {
    nav: { product: '产品', compare: 'vs 1Password', model: '商业模式', roadmap: '路线图' },
    heroTag: '基于 Heima Network · TEE + 区块链',
    heroTitle1: 'Agent', heroTitle2: 'Vault',
    heroSub: '面向 AI Agent 的去中心化密钥管理协议。你的密钥，你的 Agent，你的规则。',
    heroMeta: '商业计划书 — 2026 年 3 月',
    btnDemo: '查看演示', btnPlan: '阅读完整方案',
    probLabel: '核心问题',
    probTitle: 'Agent 凭证管理已经崩坏',
    probDesc: 'AI Agent 需要密钥来代你行事。而今天的方案意味着：信任中心化金库、零可审计性、没有可移植身份。',
    prob1t: '中心化信任', prob1d: '1Password、HashiCorp——你必须信任厂商保管所有 secret。一旦被攻破，一切暴露。',
    prob2t: '用户不可审计', prob2d: '当 Agent 使用你的 API Key 时，没有防篡改的、用户可验证的访问记录。',
    prob3t: '没有可移植身份', prob3d: '每个平台各自创建 Agent 身份孤岛。没有跨平台的、用户控制的通用身份。',
    prob4t: '碎片化认证层', prob4d: 'MCP 正在标准化 Agent 到服务的通信，但认证/凭证层仍未解决。',
    solLabel: '解决方案',
    solTitle: '面向 AI Agent 的链上安全金库',
    solDesc: '把 Agent 凭证访问当作区块链交易——密码学签名、可审计、隐私保护、用户主权控制。',
    flowLabel: '工作原理',
    flowTitle: '六步实现 Agent 主权访问',
    flow: [
      { t: '身份登录', d: '用 Heima 身份认证（钱包、邮箱或 iCloud）' },
      { t: '注册 Agent', d: '创建 agent@you.com——Heima 上的可验证凭证' },
      { t: '授予权限', d: '"读 Gmail，使用 OpenAI（$50/月限额），部署到 Vercel——仅此而已"' },
      { t: 'TEE 金库', d: 'Secret 永远不离开 TEE，凭证注入 Agent 运行时会话' },
      { t: '链上日志', d: '通过 ZKP/选择性披露实现隐私保护的审计轨迹' },
      { t: '即时撤销', d: '一个操作撤销 Agent VC，所有服务上的访问立即停止' },
    ],
    demoLabel: '产品演示',
    demoTitle: '体验 AgentVault',
    demoTab1: '仪表盘', demoTab2: '审计日志', demoTab3: '终端',
    compLabel: '产品对比',
    compTitle: 'AgentVault vs 1Password Unified Access',
    compDesc: '两者都解决 Agent 凭证管理问题。一个是中心化的、企业优先的；另一个是去中心化的、用户主权的。',
    comp1pTitle: '1Password Unified Access',
    comp1pSub: '中心化 · 企业优先 · 厂商控制',
    compAvTitle: 'AgentVault',
    compAvSub: '去中心化 · 用户主权 · TEE + 链上',
    tblFeature: '特性', tblAv: 'AgentVault', tbl1p: '1Password', tblHashi: 'HashiCorp', tblCyber: 'CyberArk',
    archLabel: '技术架构',
    archTitle: 'TEE 驱动的凭证流',
    mktLabel: '市场机会',
    mktTitle: '时机正好',
    mkt1t: '1Password Unified Access', mkt1d: '2026 年 3 月发布，与 Anthropic、Cursor、GitHub、Vercel 合作。',
    mkt2t: '250 亿美元收购 CyberArk', mkt2d: 'Palo Alto 有史以来最大的网络安全收购，驱动力是机器身份管理。',
    mkt3t: 'Bessemer 2026 投资主题', mkt3d: '"保护 AI Agent 安全"被列为 2026 年最关键的网络安全挑战。',
    mkt4t: 'MCP 生态缺口', mkt4d: 'Agent 到服务的协议正在标准化，但凭证/认证层仍未解决。',
    prcLabel: '商业模式',
    prcTitle: '简洁、可扩展的定价',
    prcFree: '免费版', prcPro: 'Pro', prcTeam: '团队版',
    prcForever: '永久', prcMonth: '/月', prcSeat: '/人/月',
    rdLabel: '路线图',
    rdTitle: '从原型到市场领导者',
    rd1t: 'Pre-seed', rd1a: '$50–80 万 · 第 0–6 个月', rd1d: 'Heima 测试网可用原型。SDK 集成 2–3 个 Agent 框架。MCP 参考实现。500+ 开发者，3–5 个设计合作伙伴。',
    rd2t: 'Seed', rd2a: '$200–400 万 · 第 6–18 个月', rd2d: '桌面应用 + 浏览器插件。1 万用户，2,000+ 月活。3+ Agent 平台合作。审计 pallet 在主网上线。',
    rd3t: 'Series A', rd3a: '$1,000–1,500 万 · 第 18–36 个月', rd3d: '5 万+ 付费用户，$500 万+ ARR。企业产品，10+ 付费企业客户。SOC 2 认证。团队 20–30 人。',
    rskLabel: '风险与应对',
    rsk1t: 'TEE 信任假设', rsk1d: '侧信道攻击存在。纵深防御：TEE + 静态加密 + 链上验证。',
    rsk2t: '监管不确定性', rsk2d: '链上日志可能面临监管审查。隐私设计优先（ZKP），可选链下模式。',
    rsk3t: '鸡生蛋问题', rsk3d: '开源 SDK，MCP 标准兼容，独立 CLI 不依赖平台集成即可运行。',
    rsk4t: '巨头竞争', rsk4d: '初期瞄准个人/小团队市场，在主权性和开发者体验上取胜。',
    footTagline: '我们在构建 Agentic Internet 的身份层。',
    footSub: 'AgentVault — 你的密钥。你的 Agent。你的规则。',
  }
}

// ─── App ───
export default function App() {
  const [lang, setLang] = useState('en')
  const s = t[lang]
  return (
    <div>
      <Nav lang={lang} setLang={setLang} s={s} />
      <Hero s={s} />
      <div className="divider" />
      <ProblemSection s={s} />
      <div className="divider" />
      <SolutionSection s={s} />
      <div className="divider" />
      <FlowSection s={s} />
      <div className="divider" />
      <ArchitectureDiagram s={s} />
      <div className="divider" />
      <DemoSection s={s} />
      <div className="divider" />
      <CompareSection s={s} lang={lang} />
      <div className="divider" />
      <CompareTable s={s} />
      <div className="divider" />
      <MarketSection s={s} />
      <div className="divider" />
      <PricingSection s={s} />
      <div className="divider" />
      <RoadmapSection s={s} />
      <div className="divider" />
      <RiskSection s={s} />
      <Footer s={s} />
    </div>
  )
}

// ─── Nav ───
function Nav({ lang, setLang, s }) {
  return (
    <nav className="nav">
      <div className="nav-logo">Agent<span>Vault</span></div>
      <div className="nav-links">
        <a href="#product">{s.nav.product}</a>
        <a href="#compare">{s.nav.compare}</a>
        <a href="#model">{s.nav.model}</a>
        <a href="#roadmap">{s.nav.roadmap}</a>
        <button className={`lang-btn ${lang==='en'?'active':''}`} onClick={()=>setLang('en')}>EN</button>
        <button className={`lang-btn ${lang==='zh'?'active':''}`} onClick={()=>setLang('zh')}>中文</button>
      </div>
    </nav>
  )
}

// ─── Hero ───
function Hero({ s }) {
  return (
    <section className="hero">
      <div className="hero-glow" />
      <div className="hero-grid" />
      <div style={{ position:'relative', zIndex:1 }}>
        <div className="hero-tag"><span className="dot" /> {s.heroTag}</div>
        <h1>{s.heroTitle1}<span className="gradient-text">{s.heroTitle2}</span></h1>
        <p className="hero-sub">{s.heroSub}</p>
        <div className="hero-actions">
          <a href="#demo" className="btn btn-primary">{s.btnDemo} →</a>
          <a href="#product" className="btn btn-ghost">{s.btnPlan}</a>
        </div>
        <p style={{ marginTop:24, fontSize:13, color:'var(--text-dim)' }}>{s.heroMeta}</p>
      </div>
    </section>
  )
}

// ─── Problem ───
function ProblemSection({ s }) {
  const items = [
    { icon:'🔒', t:s.prob1t, d:s.prob1d, color:'var(--red-dim)' },
    { icon:'👁', t:s.prob2t, d:s.prob2d, color:'var(--yellow-dim)' },
    { icon:'🏝', t:s.prob3t, d:s.prob3d, color:'var(--accent-glow)' },
    { icon:'🧩', t:s.prob4t, d:s.prob4d, color:'var(--green-dim)' },
  ]
  return (
    <section className="section container" id="product">
      <div className="section-header">
        <div className="section-label">{s.probLabel}</div>
        <h2 className="section-title">{s.probTitle}</h2>
        <p className="section-desc">{s.probDesc}</p>
      </div>
      <div className="cards-grid">
        {items.map((it,i)=>(
          <div className="card" key={i}>
            <div className="card-icon" style={{ background:it.color }}>{it.icon}</div>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Solution ───
function SolutionSection({ s }) {
  const pillars = [
    { icon:'🛡', label:'TEE', desc:'Hardware-level secret protection' },
    { icon:'📜', label:'Verifiable Credentials', desc:'Tamper-proof identity attestations' },
    { icon:'⛓', label:'On-chain Audit', desc:'Immutable, user-owned access logs' },
    { icon:'🪪', label:'IdentityHub', desc:'Decentralized identity aggregation' },
  ]
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.solLabel}</div>
        <h2 className="section-title">{s.solTitle}</h2>
        <p className="section-desc">{s.solDesc}</p>
      </div>
      <div className="cards-grid" style={{ gridTemplateColumns:'repeat(4,1fr)' }}>
        {pillars.map((p,i)=>(
          <div className="card" key={i} style={{ textAlign:'center' }}>
            <div style={{ fontSize:32, marginBottom:12 }}>{p.icon}</div>
            <h3 style={{ fontSize:15 }}>{p.label}</h3>
            <p style={{ fontSize:13 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Flow ───
function FlowSection({ s }) {
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.flowLabel}</div>
        <h2 className="section-title">{s.flowTitle}</h2>
      </div>
      <div className="flow-diagram">
        {s.flow.map((f,i)=>(
          <React.Fragment key={i}>
            {i>0 && <div className="flow-arrow">→</div>}
            <div className={`flow-node${i===3?' active':''}`}>
              <h4>{f.t}</h4>
              <p>{f.d}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

// ─── Architecture Diagram (SVG) ───
function ArchitectureDiagram({ s }) {
  return (
    <section className="section container" id="arch">
      <div className="section-header">
        <div className="section-label">{s.archLabel}</div>
        <h2 className="section-title">{s.archTitle}</h2>
      </div>
      <div className="arch-diagram">
        <svg viewBox="0 0 900 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.05)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="accentGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1"/>
              <stop offset="100%" stopColor="#a78bfa"/>
            </linearGradient>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981"/>
              <stop offset="100%" stopColor="#22d3ee"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <rect width="900" height="420" fill="url(#grid)"/>

          {/* User Device Column */}
          <rect x="30" y="30" width="200" height="360" rx="12" fill="rgba(17,17,25,0.8)" stroke="rgba(42,42,61,0.8)"/>
          <text x="130" y="60" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="600" fontFamily="Inter">USER DEVICE</text>

          <rect x="50" y="85" width="160" height="55" rx="8" fill="rgba(26,26,40,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="130" y="108" textAnchor="middle" fill="#e4e4ed" fontSize="12" fontWeight="500" fontFamily="Inter">Agent Runtime</text>
          <text x="130" y="126" textAnchor="middle" fill="#5a5a72" fontSize="10" fontFamily="JetBrains Mono">Claude / Cursor / Devin</text>

          <rect x="50" y="160" width="160" height="55" rx="8" fill="rgba(26,26,40,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="130" y="183" textAnchor="middle" fill="#e4e4ed" fontSize="12" fontWeight="500" fontFamily="Inter">AgentVault UI</text>
          <text x="130" y="201" textAnchor="middle" fill="#5a5a72" fontSize="10" fontFamily="JetBrains Mono">Dashboard / CLI</text>

          <rect x="50" y="235" width="160" height="55" rx="8" fill="rgba(26,26,40,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="130" y="258" textAnchor="middle" fill="#e4e4ed" fontSize="12" fontWeight="500" fontFamily="Inter">User Wallet</text>
          <text x="130" y="276" textAnchor="middle" fill="#5a5a72" fontSize="10" fontFamily="JetBrains Mono">Heima Identity</text>

          <rect x="50" y="310" width="160" height="55" rx="8" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)"/>
          <text x="130" y="333" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="500" fontFamily="Inter">Agent VC</text>
          <text x="130" y="351" textAnchor="middle" fill="#5a5a72" fontSize="10" fontFamily="JetBrains Mono">agent@hanwen.com</text>

          {/* Heima Network Column */}
          <rect x="310" y="30" width="280" height="360" rx="12" fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.2)"/>
          <text x="450" y="60" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="600" fontFamily="Inter">HEIMA NETWORK</text>

          {/* TEE Box */}
          <rect x="330" y="80" width="240" height="160" rx="10" fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.3)" strokeDasharray="6 3"/>
          <text x="450" y="102" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="600" fontFamily="Inter">TEE SIDECHAIN (Intel SGX)</text>

          <rect x="345" y="115" width="210" height="36" rx="6" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="450" y="138" textAnchor="middle" fill="#e4e4ed" fontSize="11" fontFamily="Inter">Verify Agent VC + Check Scope</text>

          <rect x="345" y="160" width="210" height="36" rx="6" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="450" y="183" textAnchor="middle" fill="#e4e4ed" fontSize="11" fontFamily="Inter">Decrypt Credential in Enclave</text>

          <rect x="345" y="205" width="210" height="28" rx="6" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.3)"/>
          <text x="450" y="224" textAnchor="middle" fill="#10b981" fontSize="11" fontFamily="Inter">Inject → Agent Session</text>

          {/* On-chain components */}
          <rect x="330" y="260" width="115" height="50" rx="8" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="387" y="282" textAnchor="middle" fill="#e4e4ed" fontSize="11" fontFamily="Inter">VC Registry</text>
          <text x="387" y="300" textAnchor="middle" fill="#5a5a72" fontSize="9" fontFamily="JetBrains Mono">VCMP Pallet</text>

          <rect x="455" y="260" width="115" height="50" rx="8" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="512" y="282" textAnchor="middle" fill="#e4e4ed" fontSize="11" fontFamily="Inter">Audit Log</text>
          <text x="512" y="300" textAnchor="middle" fill="#5a5a72" fontSize="9" fontFamily="JetBrains Mono">On-chain</text>

          <rect x="330" y="320" width="240" height="50" rx="8" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.2)"/>
          <text x="450" y="342" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="500" fontFamily="Inter">Permission Policy Engine</text>
          <text x="450" y="360" textAnchor="middle" fill="#5a5a72" fontSize="9" fontFamily="JetBrains Mono">per-agent · time · usage · spend</text>

          {/* Third-Party Column */}
          <rect x="670" y="30" width="200" height="360" rx="12" fill="rgba(17,17,25,0.8)" stroke="rgba(42,42,61,0.8)"/>
          <text x="770" y="60" textAnchor="middle" fill="#818cf8" fontSize="12" fontWeight="600" fontFamily="Inter">THIRD-PARTY SERVICES</text>

          {[['Gmail API','google',90],['OpenAI','openai',160],['GitHub','github',230],['Vercel','vercel',300]].map(([name,id,y])=>(
            <g key={id}>
              <rect x="690" y={y} width="160" height="45" rx="8" fill="rgba(26,26,40,0.9)" stroke="rgba(42,42,61,1)"/>
              <text x="770" y={y+20} textAnchor="middle" fill="#e4e4ed" fontSize="12" fontWeight="500" fontFamily="Inter">{name}</text>
              <text x="770" y={y+36} textAnchor="middle" fill="#5a5a72" fontSize="9" fontFamily="JetBrains Mono">Scoped Access</text>
            </g>
          ))}

          {/* Arrows */}
          <line x1="210" y1="112" x2="330" y2="133" stroke="url(#accentGrad)" strokeWidth="2" markerEnd="url(#arrowhead)"/>
          <line x1="210" y1="187" x2="330" y2="285" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="4 4"/>
          <line x1="555" y1="220" x2="690" y2="180" stroke="url(#greenGrad)" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
          <line x1="555" y1="220" x2="690" y2="112" stroke="url(#greenGrad)" strokeWidth="1.5" strokeDasharray="4 4"/>
          <line x1="555" y1="220" x2="690" y2="252" stroke="url(#greenGrad)" strokeWidth="1.5" strokeDasharray="4 4"/>
          <line x1="555" y1="220" x2="690" y2="322" stroke="url(#greenGrad)" strokeWidth="1.5" strokeDasharray="4 4"/>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#818cf8"/>
            </marker>
            <marker id="arrowhead2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="#10b981"/>
            </marker>
          </defs>

          {/* Labels on arrows */}
          <text x="260" y="105" textAnchor="middle" fill="#818cf8" fontSize="9" fontFamily="JetBrains Mono">request credential</text>
          <text x="625" y="195" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="JetBrains Mono">inject scoped key</text>
        </svg>
      </div>
    </section>
  )
}

// ─── Demo Section ───
function DemoSection({ s }) {
  const [tab, setTab] = useState('dashboard')
  return (
    <section className="section container" id="demo">
      <div className="section-header">
        <div className="section-label">{s.demoLabel}</div>
        <h2 className="section-title">{s.demoTitle}</h2>
      </div>
      <div className="demo-window">
        <div className="demo-titlebar">
          <div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/>
          <div className="demo-titlebar-text">AgentVault — agent@hanwencheng.com</div>
        </div>
        <div className="demo-tabs" style={{ padding:'0 24px' }}>
          <button className={`demo-tab${tab==='dashboard'?' active':''}`} onClick={()=>setTab('dashboard')}>{s.demoTab1}</button>
          <button className={`demo-tab${tab==='audit'?' active':''}`} onClick={()=>setTab('audit')}>{s.demoTab2}</button>
          <button className={`demo-tab${tab==='terminal'?' active':''}`} onClick={()=>setTab('terminal')}>{s.demoTab3}</button>
        </div>
        <div className="demo-body">
          {tab==='dashboard' && <DashboardDemo />}
          {tab==='audit' && <AuditDemo />}
          {tab==='terminal' && <TerminalDemo />}
        </div>
      </div>
    </section>
  )
}

function DashboardDemo() {
  const agents = [
    { name:'Claude Agent', email:'claude@hanwencheng.com', avatar:'🤖', bg:'var(--accent-glow)', status:'active', scopes:['gmail:read','openai:chat','vercel:deploy'], accesses:1247, lastUsed:'2 min ago', spend:'$34.20 / $50' },
    { name:'Cursor Copilot', email:'cursor@hanwencheng.com', avatar:'⚡', bg:'var(--yellow-dim)', status:'active', scopes:['github:push','openai:code','npm:publish'], accesses:892, lastUsed:'Just now', spend:'$12.80 / $30' },
    { name:'Devin Agent', email:'devin@hanwencheng.com', avatar:'🔧', bg:'var(--green-dim)', status:'pending', scopes:['aws:ec2','github:read'], accesses:0, lastUsed:'Never', spend:'$0 / $100' },
  ]
  return (
    <div className="dash-layout">
      <div className="dash-sidebar">
        <div className="dash-sidebar-item active"><span className="icon">🤖</span>Agents</div>
        <div className="dash-sidebar-item"><span className="icon">🔑</span>Credentials</div>
        <div className="dash-sidebar-item"><span className="icon">📋</span>Policies</div>
        <div className="dash-sidebar-item"><span className="icon">📊</span>Audit Log</div>
        <div className="dash-sidebar-item"><span className="icon">⚙️</span>Settings</div>
      </div>
      <div className="dash-main">
        <div className="dash-header">
          <h3>My Agents</h3>
          <button className="btn btn-primary" style={{ padding:'8px 16px', fontSize:13 }}>+ New Agent</button>
        </div>
        {agents.map((a,i)=>(
          <div className="agent-card" key={i}>
            <div className="agent-card-header">
              <div className="agent-card-identity">
                <div className="agent-avatar" style={{ background:a.bg }}>{a.avatar}</div>
                <div>
                  <h4>{a.name}</h4>
                  <p>{a.email}</p>
                </div>
              </div>
              <div className={`dash-badge ${a.status}`}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'currentColor', display:'inline-block' }}/> {a.status}
              </div>
            </div>
            <div className="agent-scopes">
              {a.scopes.map((sc,j)=><span className="scope-tag" key={j}>{sc}</span>)}
            </div>
            <div className="agent-stats">
              <div className="agent-stat"><strong>{a.accesses.toLocaleString()}</strong> accesses</div>
              <div className="agent-stat">Last: <strong>{a.lastUsed}</strong></div>
              <div className="agent-stat">Spend: <strong>{a.spend}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AuditDemo() {
  const logs = [
    { time:'2026-03-30 14:23:01', agent:'claude', action:'Accessed gmail:read → fetched 3 new emails', status:'granted' },
    { time:'2026-03-30 14:22:45', agent:'cursor', action:'Accessed github:push → committed to main', status:'granted' },
    { time:'2026-03-30 14:22:12', agent:'claude', action:'Accessed openai:chat → 1,200 tokens used', status:'granted' },
    { time:'2026-03-30 14:21:58', agent:'devin', action:'Attempted aws:s3 → scope not authorized', status:'denied' },
    { time:'2026-03-30 14:21:30', agent:'cursor', action:'Accessed openai:code → code completion', status:'granted' },
    { time:'2026-03-30 14:20:15', agent:'claude', action:'Accessed vercel:deploy → deployed preview', status:'granted' },
    { time:'2026-03-30 14:19:42', agent:'claude', action:'Attempted stripe:write → spend limit reached', status:'denied' },
    { time:'2026-03-30 14:18:33', agent:'cursor', action:'Accessed npm:publish → published v2.1.0', status:'granted' },
  ]
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ fontSize:13, color:'var(--text-dim)' }}>Showing 8 of 2,139 events · <span style={{ color:'var(--accent-light)' }}>All on-chain verified ⛓</span></div>
        <div style={{ display:'flex', gap:8 }}>
          <span className="scope-tag" style={{ cursor:'pointer' }}>All agents</span>
          <span className="scope-tag" style={{ cursor:'pointer' }}>Last 24h</span>
        </div>
      </div>
      <div className="audit-log">
        {logs.map((l,i)=>(
          <div className="audit-entry" key={i}>
            <span className="audit-time">{l.time}</span>
            <span className="audit-agent">{l.agent}</span>
            <span className="audit-action">{l.action}</span>
            <span className={`audit-status ${l.status}`}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0)
  const lines = [
    { type:'cmd', prompt:'$', parts:[{t:' agv ',c:'cmd'},{t:'init',c:'str'}] },
    { type:'out', parts:[{t:'✓ AgentVault initialized. Vault ID: 0x7f3a...c912',c:'success'}] },
    { type:'out', parts:[{t:'',c:'output'}] },
    { type:'cmd', prompt:'$', parts:[{t:' agv ',c:'cmd'},{t:'register ',c:'cmd'},{t:'agent@hanwencheng.com',c:'str'}] },
    { type:'out', parts:[{t:'✓ Agent VC created on Heima (tx: 0xab12...ef56)',c:'success'}] },
    { type:'out', parts:[{t:'  Identity: agent@hanwencheng.com',c:'output'}] },
    { type:'out', parts:[{t:'  Owner:    0x7f3a...c912 (hanwen.eth)',c:'output'}] },
    { type:'out', parts:[{t:'',c:'output'}] },
    { type:'cmd', prompt:'$', parts:[{t:' agv ',c:'cmd'},{t:'grant ',c:'cmd'},{t:'agent@hanwencheng.com ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --scope ',c:'flag'},{t:'gmail:read,openai:chat,vercel:deploy ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --limit ',c:'flag'},{t:'$50/mo ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --expires ',c:'flag'},{t:'2026-12-31',c:'str'}] },
    { type:'out', parts:[{t:'✓ Permissions granted. Policy stored in TEE vault.',c:'success'}] },
    { type:'out', parts:[{t:'  Scopes:  gmail:read, openai:chat, vercel:deploy',c:'output'}] },
    { type:'out', parts:[{t:'  Limit:   $50.00/month',c:'output'}] },
    { type:'out', parts:[{t:'  Expires: Dec 31, 2026',c:'output'}] },
    { type:'out', parts:[{t:'',c:'output'}] },
    { type:'cmd', prompt:'$', parts:[{t:' agv ',c:'cmd'},{t:'audit ',c:'cmd'},{t:'--last 5',c:'flag'}] },
    { type:'out', parts:[{t:'  14:23:01  claude   gmail:read       ✓ granted   (on-chain: 0xcd34...)',c:'output'}] },
    { type:'out', parts:[{t:'  14:22:45  cursor   github:push      ✓ granted   (on-chain: 0xef56...)',c:'output'}] },
    { type:'out', parts:[{t:'  14:21:58  devin    aws:s3           ✗ denied    (on-chain: 0x1278...)',c:'error'}] },
    { type:'out', parts:[{t:'  14:20:15  claude   vercel:deploy    ✓ granted   (on-chain: 0x9abc...)',c:'output'}] },
    { type:'out', parts:[{t:'  14:19:42  claude   stripe:write     ✗ denied    (on-chain: 0x5def...)',c:'error'}] },
  ]
  useEffect(()=>{
    if (visibleLines < lines.length) {
      const delay = lines[visibleLines]?.type==='cmd' ? 600 : 120
      const timer = setTimeout(()=>setVisibleLines(v=>v+1), delay)
      return ()=>clearTimeout(timer)
    }
  },[visibleLines])

  return (
    <div className="terminal">
      {lines.slice(0,visibleLines).map((line,i)=>(
        <div className="terminal-line" key={i} style={{ animationDelay:`${i*0.05}s` }}>
          {line.prompt && <span className="prompt">{line.prompt}</span>}
          {line.parts.map((p,j)=><span key={j} className={p.c}>{p.t}</span>)}
        </div>
      ))}
      {visibleLines < lines.length && (
        <div className="terminal-line" style={{ opacity:1 }}>
          <span className="prompt">$</span>
          <span className="terminal-cursor" />
        </div>
      )}
    </div>
  )
}

// ─── 1Password Comparison ───
function CompareSection({ s, lang }) {
  return (
    <section className="section container" id="compare">
      <div className="section-header">
        <div className="section-label">{s.compLabel}</div>
        <h2 className="section-title">{s.compTitle}</h2>
        <p className="section-desc">{s.compDesc}</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        {/* 1Password Mock */}
        <div>
          <div style={{ textAlign:'center', marginBottom:16 }}>
            <h3 style={{ fontSize:18, fontWeight:700 }}>{s.comp1pTitle}</h3>
            <p style={{ fontSize:13, color:'var(--text-dim)' }}>{s.comp1pSub}</p>
          </div>
          <div className="demo-window" style={{ boxShadow:'0 10px 40px rgba(0,0,0,0.3)' }}>
            <div className="demo-titlebar" style={{ background:'#1a1a1a' }}>
              <div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/>
              <div className="demo-titlebar-text">1Password · Unified Access</div>
            </div>
            <div style={{ background:'#ffffff', color:'#111', padding:0, minHeight:400 }}>
              {/* 1P Header */}
              <div style={{ padding:'16px 20px', borderBottom:'1px solid #e5e5e5', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:'linear-gradient(135deg,#ff6b35,#ff3d00)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:16, fontWeight:700 }}>✦</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15 }}>Claude <span style={{ color:'#999', fontSize:11 }}>↗</span></div>
                    <div style={{ fontSize:11, color:'#999' }}>Last Updated March 17, 2026</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', border:'1px solid #ddd', borderRadius:8, fontSize:12, color:'#333' }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e' }}/> Accepted ▾
                </div>
              </div>
              {/* Tabs */}
              <div style={{ display:'flex', gap:0, borderBottom:'1px solid #e5e5e5', padding:'0 20px' }}>
                {['Usage Insights','Tasks 4','Checks','Access Policies','Issues','Managed Instances'].map((tab,i)=>(
                  <div key={i} style={{ padding:'12px 16px', fontSize:12, color:i===0?'#2563eb':'#666', borderBottom:i===0?'2px solid #2563eb':'2px solid transparent', fontWeight:i===0?600:400, cursor:'pointer' }}>{tab}</div>
                ))}
              </div>
              {/* Stats Row */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid #e5e5e5' }}>
                {[
                  {label:'ADOPTION',val:'15% of employees',sub:'👤 28/135 people'},
                  {label:'TOTAL USAGE',val:'4 Interaction Surfaces',sub:'🌐 🅰 📺 🤖'},
                  {label:'ACCESS',val:'4 Repositories',sub:'🐙 💜'},
                  {label:'INTEGRATIONS',val:'8 Connected Services',sub:'🎨 📝 ⚡ +4 more'},
                ].map((s,i)=>(
                  <div key={i} style={{ padding:'16px 20px', borderRight:i<3?'1px solid #e5e5e5':'none' }}>
                    <div style={{ fontSize:10, fontWeight:600, letterSpacing:1, color:'#999', marginBottom:6 }}>{s.label}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#111', marginBottom:4 }}>{s.val}</div>
                    <div style={{ fontSize:11, color:'#666' }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              {/* Sub tabs */}
              <div style={{ display:'flex', gap:0, borderBottom:'1px solid #e5e5e5', padding:'0 20px' }}>
                {['People','Devices','Interaction Surfaces','Repositories','Integrations'].map((tab,i)=>(
                  <div key={i} style={{ padding:'10px 14px', fontSize:12, color:i===4?'#2563eb':'#666', borderBottom:i===4?'2px solid #2563eb':'2px solid transparent', fontWeight:i===4?600:400 }}>{tab}</div>
                ))}
              </div>
              {/* Table */}
              <div style={{ padding:'12px 20px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                  <div style={{ fontSize:12, color:'#666' }}><strong style={{ color:'#111' }}>12</strong> of <strong style={{ color:'#111' }}>12</strong> Connected Services</div>
                </div>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
                  <thead>
                    <tr style={{ borderBottom:'1px solid #e5e5e5' }}>
                      <th style={{ padding:'8px 0', textAlign:'left', color:'#999', fontWeight:500, fontSize:11, background:'transparent' }}>APP</th>
                      <th style={{ padding:'8px 0', textAlign:'left', color:'#999', fontWeight:500, fontSize:11, background:'transparent' }}>TYPE</th>
                      <th style={{ padding:'8px 0', textAlign:'left', color:'#999', fontWeight:500, fontSize:11, background:'transparent' }}>CONNECTIONS</th>
                      <th style={{ padding:'8px 0', textAlign:'left', color:'#999', fontWeight:500, fontSize:11, background:'transparent' }}>LAST USED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {app:'Figma',icon:'🎨',type:'Skill / MCP Server',conn:47,last:'10 mins ago'},
                      {app:'Notion',icon:'📝',type:'Skill / MCP Server',conn:38,last:'1 min ago'},
                      {app:'GitHub',icon:'🐙',type:'Skill / MCP Server',conn:31,last:'Just now'},
                    ].map((r,i)=>(
                      <tr key={i} style={{ borderBottom:'1px solid #f0f0f0' }}>
                        <td style={{ padding:'10px 0', color:'#2563eb', fontWeight:500, background:'transparent' }}>{r.icon} {r.app}</td>
                        <td style={{ padding:'10px 0', color:'#666', background:'transparent' }}>{r.type}</td>
                        <td style={{ padding:'10px 0', color:'#666', background:'transparent' }}>{r.conn}</td>
                        <td style={{ padding:'10px 0', color:'#666', background:'transparent' }}>{r.last}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Limitations overlay */}
              <div style={{ margin:'0 20px 16px', padding:'12px 16px', background:'#fef3c7', borderRadius:8, border:'1px solid #fde68a' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'#92400e', marginBottom:4 }}>⚠ Centralized Limitations</div>
                <div style={{ fontSize:11, color:'#78350f', lineHeight:1.6 }}>
                  Vendor holds all secrets · No on-chain audit trail · No user-sovereign control · Vendor-locked identity · Enterprise pricing only
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AgentVault Mock */}
        <div>
          <div style={{ textAlign:'center', marginBottom:16 }}>
            <h3 style={{ fontSize:18, fontWeight:700 }}>{s.compAvTitle}</h3>
            <p style={{ fontSize:13, color:'var(--text-dim)' }}>{s.compAvSub}</p>
          </div>
          <div className="demo-window" style={{ boxShadow:'0 10px 40px rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.3)' }}>
            <div className="demo-titlebar">
              <div className="demo-dot red"/><div className="demo-dot yellow"/><div className="demo-dot green"/>
              <div className="demo-titlebar-text">AgentVault — hanwen.eth</div>
            </div>
            <div style={{ background:'var(--bg2)', padding:0, minHeight:400 }}>
              {/* AV Header */}
              <div style={{ padding:'16px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:'linear-gradient(135deg,#6366f1,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, fontWeight:700 }}>AV</div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:15 }}>hanwen.eth</div>
                    <div style={{ fontSize:11, color:'var(--text-dim)', fontFamily:'JetBrains Mono' }}>3 agents · TEE vault active</div>
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 14px', background:'var(--green-dim)', borderRadius:8, fontSize:12, color:'var(--green)', fontWeight:600 }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)' }}/> On-chain ⛓
                </div>
              </div>
              {/* Tabs */}
              <div style={{ display:'flex', gap:0, borderBottom:'1px solid var(--border)', padding:'0 20px' }}>
                {['Agent Identities','Credential Vault','Permission Policies','On-chain Audit','TEE Status'].map((tab,i)=>(
                  <div key={i} style={{ padding:'12px 14px', fontSize:12, color:i===0?'var(--accent-light)':'var(--text-dim)', borderBottom:i===0?'2px solid var(--accent)':'2px solid transparent', fontWeight:i===0?600:400, cursor:'pointer' }}>{tab}</div>
                ))}
              </div>
              {/* Stats Row */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid var(--border)' }}>
                {[
                  {label:'AGENTS',val:'3 Active',sub:'2 active · 1 pending', color:'var(--accent-light)'},
                  {label:'CREDENTIALS',val:'12 in TEE Vault',sub:'AES-256 · SGX enclave', color:'var(--green)'},
                  {label:'THIS MONTH',val:'2,139 Accesses',sub:'2,104 granted · 35 denied', color:'var(--yellow)'},
                  {label:'AUDIT TRAIL',val:'100% On-chain',sub:'ZKP verified · immutable', color:'var(--cyan)'},
                ].map((st,i)=>(
                  <div key={i} style={{ padding:'16px 20px', borderRight:i<3?'1px solid var(--border)':'none' }}>
                    <div style={{ fontSize:10, fontWeight:600, letterSpacing:1, color:'var(--text-dim)', marginBottom:6 }}>{st.label}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:st.color, marginBottom:4 }}>{st.val}</div>
                    <div style={{ fontSize:11, color:'var(--text-dim)' }}>{st.sub}</div>
                  </div>
                ))}
              </div>
              {/* Agent list */}
              <div style={{ padding:'16px 20px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                  <div style={{ fontSize:12, color:'var(--text-dim)' }}><strong style={{ color:'var(--text)' }}>3</strong> registered agents</div>
                  <button style={{ padding:'6px 14px', background:'var(--accent)', color:'#fff', border:'none', borderRadius:6, fontSize:12, fontWeight:600, cursor:'pointer' }}>+ Register Agent</button>
                </div>
                {[
                  {name:'claude@hanwencheng.com',vc:'VC: 0xab12...ef56',scopes:['gmail:read','openai:chat','vercel:deploy'],limit:'$50/mo',status:'active',icon:'🤖'},
                  {name:'cursor@hanwencheng.com',vc:'VC: 0xcd34...gh78',scopes:['github:push','openai:code','npm:publish'],limit:'$30/mo',status:'active',icon:'⚡'},
                  {name:'devin@hanwencheng.com',vc:'VC: 0xef56...ij90',scopes:['aws:ec2','github:read'],limit:'$100/mo',status:'pending',icon:'🔧'},
                ].map((a,i)=>(
                  <div key={i} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:'14px 16px', marginBottom:10 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:20 }}>{a.icon}</span>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, fontFamily:'JetBrains Mono' }}>{a.name}</div>
                          <div style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'JetBrains Mono' }}>{a.vc} · Limit: {a.limit}</div>
                        </div>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:12, fontSize:10, fontWeight:600, background:a.status==='active'?'var(--green-dim)':'var(--yellow-dim)', color:a.status==='active'?'var(--green)':'var(--yellow)' }}>
                        <span style={{ width:6, height:6, borderRadius:'50%', background:'currentColor' }}/> {a.status}
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:6, marginTop:10, flexWrap:'wrap' }}>
                      {a.scopes.map((sc,j)=>(
                        <span key={j} style={{ padding:'2px 8px', background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:4, fontSize:10, fontFamily:'JetBrains Mono', color:'var(--text-muted)' }}>{sc}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* Advantages */}
              <div style={{ margin:'0 20px 16px', padding:'12px 16px', background:'rgba(99,102,241,0.08)', borderRadius:8, border:'1px solid rgba(99,102,241,0.2)' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'var(--accent-light)', marginBottom:4 }}>✓ Decentralized Advantages</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.6 }}>
                  User-sovereign control · TEE-encrypted vault · On-chain audit trail · Portable agent identity (VC) · Freemium pricing · Open-source SDK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Comparison Table ───
function CompareTable({ s }) {
  const rows = [
    { f:'Agent-specific identity', av:'Yes (VC-based)', op:'Partial', hv:'No', ca:'Partial' },
    { f:'Decentralized storage', av:'Yes (TEE)', op:'No', hv:'No', ca:'No' },
    { f:'User-sovereign control', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'On-chain audit trail', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'Privacy-preserving logs', av:'Yes (ZKP)', op:'No', hv:'No', ca:'No' },
    { f:'Cross-platform portable', av:'Open standard', op:'Vendor-locked', hv:'Self-hosted', ca:'Vendor-locked' },
    { f:'MCP native support', av:'Yes', op:'Partial', hv:'No', ca:'No' },
    { f:'Credential spend limits', av:'Yes (per-agent)', op:'No', hv:'No', ca:'No' },
    { f:'Enterprise-ready', av:'Roadmap', op:'Yes', hv:'Yes', ca:'Yes' },
    { f:'Pricing', av:'Freemium', op:'Enterprise', hv:'Open source+', ca:'Enterprise' },
  ]
  const cls = (v) => {
    if (v.startsWith('Yes') || v === 'Open standard' || v === 'Freemium') return 'yes'
    if (v === 'No' || v === 'Vendor-locked' || v === 'Enterprise') return 'no'
    return 'partial'
  }
  return (
    <section className="section-sm container">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{s.tblFeature}</th>
              <th style={{ color:'var(--accent-light)' }}>{s.tblAv}</th>
              <th>{s.tbl1p}</th>
              <th>{s.tblHashi}</th>
              <th>{s.tblCyber}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={i}>
                <td style={{ fontWeight:500, color:'var(--text)' }}>{r.f}</td>
                <td className={cls(r.av)}>{r.av}</td>
                <td className={cls(r.op)}>{r.op}</td>
                <td className={cls(r.hv)}>{r.hv}</td>
                <td className={cls(r.ca)}>{r.ca}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

// ─── Market ───
function MarketSection({ s }) {
  const items = [
    { icon:'🔑', t:s.mkt1t, d:s.mkt1d },
    { icon:'💰', t:s.mkt2t, d:s.mkt2d },
    { icon:'📈', t:s.mkt3t, d:s.mkt3d },
    { icon:'🔌', t:s.mkt4t, d:s.mkt4d },
  ]
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.mktLabel}</div>
        <h2 className="section-title">{s.mktTitle}</h2>
      </div>
      <div className="cards-grid">
        {items.map((it,i)=>(
          <div className="card" key={i}>
            <div className="card-icon" style={{ background:'var(--accent-glow)' }}>{it.icon}</div>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Pricing ───
function PricingSection({ s }) {
  return (
    <section className="section container" id="model">
      <div className="section-header">
        <div className="section-label">{s.prcLabel}</div>
        <h2 className="section-title">{s.prcTitle}</h2>
      </div>
      <div className="pricing-grid">
        <div className="price-card">
          <h4>{s.prcFree}</h4>
          <div className="price-amount">$0</div>
          <div className="price-period">{s.prcForever}</div>
          <ul className="price-features">
            <li>1 agent identity</li>
            <li>10 credential slots</li>
            <li>Basic audit logs</li>
          </ul>
        </div>
        <div className="price-card featured">
          <h4>{s.prcPro}</h4>
          <div className="price-amount">$9</div>
          <div className="price-period">{s.prcMonth}</div>
          <ul className="price-features">
            <li>Unlimited agents</li>
            <li>Unlimited credentials</li>
            <li>Full audit history</li>
            <li>Custom policies</li>
            <li>On-chain verification</li>
          </ul>
        </div>
        <div className="price-card">
          <h4>{s.prcTeam}</h4>
          <div className="price-amount">$29</div>
          <div className="price-period">{s.prcSeat}</div>
          <ul className="price-features">
            <li>Shared vaults</li>
            <li>Role-based access</li>
            <li>Team audit dashboard</li>
            <li>Admin controls</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─── Roadmap ───
function RoadmapSection({ s }) {
  const items = [
    { t:s.rd1t, a:s.rd1a, d:s.rd1d },
    { t:s.rd2t, a:s.rd2a, d:s.rd2d },
    { t:s.rd3t, a:s.rd3a, d:s.rd3d },
  ]
  return (
    <section className="section container" id="roadmap">
      <div className="section-header">
        <div className="section-label">{s.rdLabel}</div>
        <h2 className="section-title">{s.rdTitle}</h2>
      </div>
      <div className="timeline">
        {items.map((it,i)=>(
          <div className="timeline-item" key={i}>
            <h4>{it.t}</h4>
            <div className="timeline-amount">{it.a}</div>
            <p>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Risks ───
function RiskSection({ s }) {
  const items = [
    { t:s.rsk1t, d:s.rsk1d },
    { t:s.rsk2t, d:s.rsk2d },
    { t:s.rsk3t, d:s.rsk3d },
    { t:s.rsk4t, d:s.rsk4d },
  ]
  return (
    <section className="section-sm container">
      <div className="section-header">
        <div className="section-label">{s.rskLabel}</div>
      </div>
      <div className="risk-grid">
        {items.map((it,i)=>(
          <div className="risk-card" key={i}>
            <h4>{it.t}</h4>
            <p>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Footer ───
function Footer({ s }) {
  return (
    <footer className="footer">
      <div className="footer-tagline">{s.footTagline}</div>
      <p className="footer-sub">{s.footSub}</p>
      <div className="hero-actions" style={{ marginTop:24 }}>
        <a href="#demo" className="btn btn-primary">View Demo →</a>
        <a href="https://github.com" className="btn btn-ghost" target="_blank" rel="noopener">GitHub</a>
      </div>
      <p style={{ marginTop:40, fontSize:12, color:'var(--text-dim)' }}>
        March 2026 · Built on <a href="https://heima.network" target="_blank" rel="noopener" style={{ color:'var(--accent-light)' }}>Heima Network</a>
      </p>
    </footer>
  )
}
