import React, { useState, useEffect } from 'react'

// ─── i18n ───
const t = {
  en: {
    nav: { paradigm:'Paradigm Shift', product:'Product', compare:'vs 1Password', model:'Business Model', roadmap:'Roadmap' },
    heroTag: 'Agent Runtime Control Layer · Heima Network',
    heroTitle1: 'Agent', heroTitle2: 'Vault',
    heroSub: 'Keys were designed for humans who act occasionally. Agents act continuously. The problem is no longer key storage — it\'s how to control autonomous execution under constraints.',
    heroMeta: 'Business Plan — March 2026',
    btnDemo: 'View Live Demo', btnPlan: 'Read Full Plan',

    // Paradigm Shift
    paraLabel: 'THE PARADIGM SHIFT',
    paraTitle: 'From key storage to execution control',
    paraDesc: 'Human key management is a security problem. Agent key management is a control system problem. This is a fundamental paradigm difference.',
    paraHumanTitle: 'Human Key Management',
    paraHumanSub: 'Identity = Authority = Execution',
    paraHumanModel: 'I hold this key → I can do anything',
    paraAgentTitle: 'Agent Key Management',
    paraAgentSub: 'Identity → Policy → Execution',
    paraAgentModel: 'Agent requests execution → Policy evaluates → TEE injects scoped credential',
    paraH1: 'Possession', paraH1d: 'Key = the permission itself. Hold it, own it.',
    paraH2: 'Static', paraH2d: 'One key → full access. No time/scope limits.',
    paraH3: 'Low frequency', paraH3d: 'Login, sign, transfer — a few times per day.',
    paraH4: 'Trust self', paraH4d: 'Default: I trust myself to use the key correctly.',
    paraH5: 'Confirm each time', paraH5d: '2FA, biometrics — human in the loop.',
    paraA1: 'Execution', paraA1d: 'Agent never holds the key. Only requests execution.',
    paraA2: 'Dynamic', paraA2d: 'Scoped, time-bound, context-aware, spend-limited.',
    paraA3: 'High frequency', paraA3d: 'Hundreds of API calls per minute, autonomously.',
    paraA4: 'Restrict machine', paraA4d: 'Default: distrust agent. LLMs hallucinate, get injected.',
    paraA5: 'Policy-driven', paraA5d: 'Pre-defined rules, auto-enforced. No human confirmation.',

    // Core Problem
    coreLabel: 'WHAT WE ACTUALLY SOLVE',
    coreTitle: 'Not "better key storage" — agent execution control',
    coreDesc: 'We\'re building the operating-system-level permission control for autonomous agents.',
    core1t: 'Dynamic Key Authorization',
    core1d: 'Grant agents scoped, time-bound, usage-limited access. "Use OpenAI for 100 calls today, max $5 spend, only chat completions." Revoke instantly.',
    core1tag: 'DELEGATION',
    core2t: 'Automated Key Lifecycle',
    core2d: 'Keys auto-rotate on expiry. New keys provisioned automatically. Dead credentials cleaned up. Zero human intervention in steady state.',
    core2tag: 'CONSTRAINT',
    core3t: 'Full Audit Trail',
    core3d: 'Every access, every denial, every policy match — on-chain and cryptographically verifiable. Answer: "Why did this agent do this? Was it authorized?"',
    core3tag: 'OBSERVABILITY',
    core4t: 'Multi-API Orchestration Control',
    core4d: 'When agents chain Gmail → Slack → GitHub → Vercel, control the full call graph. Rate limits, dependency rules, human-readable execution reports.',
    core4tag: 'COMPOSABILITY',
    core5t: 'Multi-Agent Permission Isolation',
    core5d: 'Each agent gets its own identity and credential scope. No shared keys, no blast radius. In 1Password you\'d need dozens of separate accounts.',
    core5tag: 'REVOCABILITY',

    // 5 Primitives
    primLabel: 'FIVE NEW PRIMITIVES',
    primTitle: 'What agent credential control actually requires',
    prim1t: 'Delegation', prim1d: 'User → Agent → Sub-agent chains. Revocable, limitable, nestable. The agent acts on your behalf, not as you.',
    prim2t: 'Constraint', prim2d: 'Not "can or can\'t" — under what conditions. Time, scope, spend, context, frequency. The policy is the permission.',
    prim3t: 'Observability', prim3d: 'Behavior logs, decision paths, policy matches. Not just "what balance" but "why this action, was it within policy."',
    prim4t: 'Revocability', prim4d: 'Instant revoke without breaking the system. One agent down, others keep running. Granular, not all-or-nothing.',
    prim5t: 'Composability', prim5d: 'Agent A calls Agent B which uses the Vault. Permission chains must compose cleanly across multi-agent workflows.',

    // Architecture
    archLabel: 'ARCHITECTURE',
    archTitle: 'Agent runtime control flow',

    // Flow
    flowLabel: 'HOW IT WORKS',
    flowTitle: 'From key request to controlled execution',
    flow: [
      { t: 'Agent Requests', d: 'Agent needs a credential — sends request with its VC identity to the vault' },
      { t: 'Policy Evaluates', d: 'TEE checks: scope? time window? spend limit? call frequency? context match?' },
      { t: 'TEE Injects', d: 'If authorized, credential decrypted in enclave and injected into agent session. Never exposed.' },
      { t: 'Action Executes', d: 'Agent calls the API with scoped credential. Operation completes.' },
      { t: 'On-chain Log', d: 'Access event, policy match result, and context logged immutably with ZKP privacy.' },
      { t: 'Auto Lifecycle', d: 'Key approaching expiry? Auto-rotate. Spend limit hit? Auto-deny. Anomaly? Alert owner.' },
    ],

    // Demo
    demoLabel: 'LIVE DEMO',
    demoTitle: 'See AgentVault in action',
    demoTab1: 'Control Dashboard', demoTab2: 'Execution Log', demoTab3: 'Terminal', demoTab4: 'Policy Engine',

    // Compare
    compLabel: 'PARADIGM COMPARISON',
    compTitle: '1Password solves storage. We solve control.',
    compDesc: '1Password Unified Access manages where keys are stored and who can access them. AgentVault manages what agents can do with keys, under what constraints, and why.',
    comp1pTitle: '1Password Unified Access',
    comp1pSub: 'Key Storage + Access Management',
    compAvTitle: 'AgentVault',
    compAvSub: 'Execution Control + Policy Enforcement',

    // Table
    tblFeature: 'Capability', tblAv: 'AgentVault', tbl1p: '1Password', tblHashi: 'HashiCorp', tblCyber: 'CyberArk',

    // Market
    mktLabel: 'MARKET',
    mktTitle: 'The timing is now',
    mkt1t: '1Password Unified Access', mkt1d: 'Launched March 2026 with Anthropic, Cursor, GitHub — validating the problem. But solves storage, not control.',
    mkt2t: '$25B CyberArk Acquisition', mkt2d: 'Palo Alto\'s largest deal. Machine identity is the hottest category in cybersecurity.',
    mkt3t: 'Bessemer 2026 Thesis', mkt3d: '"Securing AI agents" = the defining cybersecurity challenge of 2026. Control > storage.',
    mkt4t: 'MCP Ecosystem Gap', mkt4d: 'Agent-to-service protocol standardizing. The execution control layer is the missing piece.',

    // Insight
    insightLabel: 'THE KEY INSIGHT',

    // Pricing
    prcLabel: 'BUSINESS MODEL',
    prcTitle: 'Simple, scalable pricing',
    prcFree: 'Free', prcPro: 'Pro', prcTeam: 'Team',
    prcForever: 'forever', prcMonth: '/month', prcSeat: '/seat/month',

    // Roadmap
    rdLabel: 'ROADMAP',
    rdTitle: 'From prototype to market leader',
    rd1t: 'Pre-seed', rd1a: '$500K–$800K · Months 0–6', rd1d: 'Core policy engine on Heima testnet. SDK with dynamic authorization + auto-rotation. MCP reference implementation. 500+ developers, 3–5 design partners.',
    rd2t: 'Seed', rd2a: '$2M–$4M · Months 6–18', rd2d: 'Control dashboard + browser extension. Multi-agent orchestration. 10K users, 2K+ MAU. Execution report generation. Audit pallet on mainnet.',
    rd3t: 'Series A', rd3a: '$10M–$15M · Months 18–36', rd3d: '50K+ paying users, $5M+ ARR. Enterprise multi-agent fleet control. SOC 2 certified. Full call-graph visualization.',

    // Risks
    rskLabel: 'RISKS & MITIGATIONS',
    rsk1t: 'TEE Trust Assumptions', rsk1d: 'Side-channel attacks exist. Defense in depth: TEE + encryption at rest + on-chain verification.',
    rsk2t: 'Regulatory Uncertainty', rsk2d: 'On-chain logs may face scrutiny. Privacy-by-design with ZKP, optional off-chain mode.',
    rsk3t: 'Adoption Chicken-and-Egg', rsk3d: 'Open-source SDK, MCP standard compliance, standalone CLI that works without platform integration.',
    rsk4t: 'Incumbent Competition', rsk4d: 'Incumbents solve storage. We solve control — a different layer. Bottom-up adoption in developer segment.',

    // Footer
    footTagline: 'We\'re building the execution control layer for the agentic internet.',
    footSub: 'AgentVault — Your keys. Your policies. Your agents. Your rules.',
  },
  zh: {
    nav: { paradigm:'范式转变', product:'产品', compare:'vs 1Password', model:'商业模式', roadmap:'路线图' },
    heroTag: 'Agent 运行时控制层 · Heima Network',
    heroTitle1: 'Agent', heroTitle2: 'Vault',
    heroSub: '密钥为偶尔行动的人类设计。Agent 持续行动。问题不再是密钥存储——而是如何在约束下控制自主执行。',
    heroMeta: '商业计划书 — 2026 年 3 月',
    btnDemo: '查看演示', btnPlan: '阅读完整方案',

    paraLabel: '范式转变',
    paraTitle: '从密钥存储到执行控制',
    paraDesc: 'Human 密钥管理是安全问题。Agent 密钥管理是控制系统问题。这是根本性的范式差异。',
    paraHumanTitle: 'Human 密钥管理',
    paraHumanSub: 'Identity = Authority = Execution',
    paraHumanModel: '我持有这把 key → 我可以做任何事',
    paraAgentTitle: 'Agent 密钥管理',
    paraAgentSub: 'Identity → Policy → Execution',
    paraAgentModel: 'Agent 请求执行 → 策略评估 → TEE 注入有限凭证',
    paraH1: '持有权', paraH1d: 'Key = 权限本身。拿到即拥有。',
    paraH2: '静态权限', paraH2d: '一把 key → 全部权限。无时间/范围限制。',
    paraH3: '低频操作', paraH3d: '登录、签名、转账——一天几次。',
    paraH4: '信任自己', paraH4d: '默认：我信任自己正确使用 key。',
    paraH5: '每次确认', paraH5d: '2FA、生物识别——人在回路。',
    paraA1: '执行权', paraA1d: 'Agent 永远不持有 key。只请求执行。',
    paraA2: '动态权限', paraA2d: '有范围、有时限、上下文感知、消费限额。',
    paraA3: '高频自动化', paraA3d: '每分钟数百次 API 调用，自主执行。',
    paraA4: '限制机器', paraA4d: '默认：不信任 agent。LLM 会幻觉、被注入。',
    paraA5: '策略驱动', paraA5d: '预定义规则，自动执行。无需人工确认。',

    coreLabel: '我们真正解决的问题',
    coreTitle: '不是"更好的密钥存储"——而是 Agent 执行控制',
    coreDesc: '我们在构建面向自主 Agent 的操作系统级权限控制。',
    core1t: '动态密钥授权',
    core1d: '授予 Agent 有范围、有时限、有用量限制的访问。"使用 OpenAI 今天 100 次调用，最多 $5，仅 chat 补全。" 即时撤销。',
    core1tag: '委托',
    core2t: '自动密钥生命周期',
    core2d: 'Key 到期自动轮换。新 key 自动配置。失效凭证自动清理。稳态运行零人工干预。',
    core2tag: '约束',
    core3t: '全链路审计',
    core3d: '每次访问、每次拒绝、每次策略匹配——链上记录，密码学可验证。回答："为什么这个 agent 做了这个操作？是否授权？"',
    core3tag: '可观测性',
    core4t: '多 API 编排控制',
    core4d: '当 Agent 链式调用 Gmail → Slack → GitHub → Vercel，控制完整调用图。频率限制、依赖规则、人类可读的执行报告。',
    core4tag: '可组合性',
    core5t: '多 Agent 权限隔离',
    core5d: '每个 Agent 拥有独立身份和凭证范围。无共享 key，无爆炸半径。在 1Password 里你需要开几十个独立账户。',
    core5tag: '可撤销性',

    primLabel: '五个新原语',
    primTitle: 'Agent 凭证控制真正需要什么',
    prim1t: '委托 Delegation', prim1d: 'User → Agent → Sub-agent 链。可撤销、可限制、可嵌套。Agent 代你行事，而非成为你。',
    prim2t: '约束 Constraint', prim2d: '不是"能不能"——而是在什么条件下能。时间、范围、消费、上下文、频率。策略即权限。',
    prim3t: '可观测性 Observability', prim3d: '行为日志、决策路径、策略匹配。不只是"余额多少"而是"为什么执行、是否合规"。',
    prim4t: '可撤销性 Revocability', prim4d: '即时撤销不破坏系统。一个 agent 停，其他继续运行。粒度化，非全有或全无。',
    prim5t: '可组合性 Composability', prim5d: 'Agent A 调用 Agent B 再使用 Vault。权限链必须在多 agent 工作流中干净组合。',

    archLabel: '技术架构',
    archTitle: 'Agent 运行时控制流',

    flowLabel: '工作原理',
    flowTitle: '从密钥请求到受控执行',
    flow: [
      { t: 'Agent 请求', d: 'Agent 需要凭证——携带 VC 身份向金库发送请求' },
      { t: '策略评估', d: 'TEE 检查：范围？时间窗口？消费限额？调用频率？上下文匹配？' },
      { t: 'TEE 注入', d: '如果授权，凭证在飞地内解密并注入 agent 会话。永不暴露。' },
      { t: '执行操作', d: 'Agent 使用受限凭证调用 API。操作完成。' },
      { t: '链上日志', d: '访问事件、策略匹配结果、上下文以 ZKP 隐私方式不可篡改记录。' },
      { t: '自动生命周期', d: 'Key 即将到期？自动轮换。消费超限？自动拒绝。异常？通知所有者。' },
    ],

    demoLabel: '产品演示',
    demoTitle: '体验 AgentVault',
    demoTab1: '控制面板', demoTab2: '执行日志', demoTab3: '终端', demoTab4: '策略引擎',

    compLabel: '范式对比',
    compTitle: '1Password 解决存储。我们解决控制。',
    compDesc: '1Password Unified Access 管理 key 存在哪里、谁能访问。AgentVault 管理 agent 能用 key 做什么、在什么约束下、为什么。',
    comp1pTitle: '1Password Unified Access',
    comp1pSub: '密钥存储 + 访问管理',
    compAvTitle: 'AgentVault',
    compAvSub: '执行控制 + 策略执行',

    tblFeature: '能力', tblAv: 'AgentVault', tbl1p: '1Password', tblHashi: 'HashiCorp', tblCyber: 'CyberArk',

    mktLabel: '市场机会',
    mktTitle: '时机正好',
    mkt1t: '1Password Unified Access', mkt1d: '2026 年 3 月发布，与 Anthropic、Cursor、GitHub 合作——验证了问题。但解决的是存储，不是控制。',
    mkt2t: '250 亿美元收购 CyberArk', mkt2d: 'Palo Alto 最大交易。机器身份是网络安全最火的品类。',
    mkt3t: 'Bessemer 2026 投资主题', mkt3d: '"保护 AI Agent 安全"= 2026 年最关键的网络安全挑战。控制 > 存储。',
    mkt4t: 'MCP 生态缺口', mkt4d: 'Agent 到服务的协议正在标准化。执行控制层是缺失的一环。',

    insightLabel: '核心洞察',

    prcLabel: '商业模式',
    prcTitle: '简洁、可扩展的定价',
    prcFree: '免费版', prcPro: 'Pro', prcTeam: '团队版',
    prcForever: '永久', prcMonth: '/月', prcSeat: '/人/月',

    rdLabel: '路线图',
    rdTitle: '从原型到市场领导者',
    rd1t: 'Pre-seed', rd1a: '$50–80 万 · 第 0–6 个月', rd1d: '核心策略引擎在 Heima 测试网运行。SDK 含动态授权 + 自动轮换。MCP 参考实现。500+ 开发者，3–5 个设计合作伙伴。',
    rd2t: 'Seed', rd2a: '$200–400 万 · 第 6–18 个月', rd2d: '控制面板 + 浏览器插件。多 Agent 编排。1 万用户，2,000+ 月活。执行报告生成。审计 pallet 在主网上线。',
    rd3t: 'Series A', rd3a: '$1,000–1,500 万 · 第 18–36 个月', rd3d: '5 万+ 付费用户，$500 万+ ARR。企业多 Agent 舰队控制。SOC 2 认证。完整调用图可视化。',

    rskLabel: '风险与应对',
    rsk1t: 'TEE 信任假设', rsk1d: '侧信道攻击存在。纵深防御：TEE + 静态加密 + 链上验证。',
    rsk2t: '监管不确定性', rsk2d: '链上日志可能面临审查。ZKP 隐私设计优先，可选链下模式。',
    rsk3t: '鸡生蛋问题', rsk3d: '开源 SDK，MCP 标准兼容，独立 CLI 不依赖平台集成即可运行。',
    rsk4t: '巨头竞争', rsk4d: '巨头解决存储，我们解决控制——不同层。开发者群体自下而上采用。',

    footTagline: '我们在构建 Agentic Internet 的执行控制层。',
    footSub: 'AgentVault — 你的密钥。你的策略。你的 Agent。你的规则。',
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
      <ParadigmShift s={s} />
      <div className="divider" />
      <InsightBanner s={s} lang={lang} />
      <div className="divider" />
      <CoreProblems s={s} />
      <div className="divider" />
      <Primitives s={s} />
      <div className="divider" />
      <ArchitectureDiagram s={s} />
      <div className="divider" />
      <FlowSection s={s} />
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
        <a href="#paradigm">{s.nav.paradigm}</a>
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
          <a href="#paradigm" className="btn btn-ghost">{s.btnPlan}</a>
        </div>
        <p style={{ marginTop:24, fontSize:13, color:'var(--text-dim)' }}>{s.heroMeta}</p>
      </div>
    </section>
  )
}

// ─── Paradigm Shift — the core new section ───
function ParadigmShift({ s }) {
  const humanTraits = [
    { icon:'🔑', t:s.paraH1, d:s.paraH1d },
    { icon:'🧊', t:s.paraH2, d:s.paraH2d },
    { icon:'🐢', t:s.paraH3, d:s.paraH3d },
    { icon:'🤝', t:s.paraH4, d:s.paraH4d },
    { icon:'✋', t:s.paraH5, d:s.paraH5d },
  ]
  const agentTraits = [
    { icon:'⚡', t:s.paraA1, d:s.paraA1d },
    { icon:'🎯', t:s.paraA2, d:s.paraA2d },
    { icon:'🚀', t:s.paraA3, d:s.paraA3d },
    { icon:'🔒', t:s.paraA4, d:s.paraA4d },
    { icon:'📋', t:s.paraA5, d:s.paraA5d },
  ]
  return (
    <section className="section container" id="paradigm">
      <div className="section-header">
        <div className="section-label">{s.paraLabel}</div>
        <h2 className="section-title">{s.paraTitle}</h2>
        <p className="section-desc">{s.paraDesc}</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 60px 1fr', gap:0, alignItems:'start', marginTop:40 }}>
        {/* Human side */}
        <div>
          <div className="paradigm-header human">
            <div className="paradigm-icon">👤</div>
            <div>
              <h3>{s.paraHumanTitle}</h3>
              <p className="mono" style={{ fontSize:12, color:'var(--text-dim)', marginTop:4 }}>{s.paraHumanSub}</p>
            </div>
          </div>
          <div className="paradigm-model human-model">
            <p style={{ fontSize:13, fontStyle:'italic', color:'var(--text-muted)' }}>{s.paraHumanModel}</p>
          </div>
          {humanTraits.map((t,i)=>(
            <div className="paradigm-trait" key={i}>
              <span className="paradigm-trait-icon">{t.icon}</span>
              <div>
                <strong>{t.t}</strong>
                <p>{t.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* VS divider */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', paddingTop:60 }}>
          <div style={{ width:2, height:40, background:'var(--border)' }} />
          <div className="vs-badge">VS</div>
          <div style={{ width:2, flex:1, background:'var(--border)', minHeight:200 }} />
        </div>

        {/* Agent side */}
        <div>
          <div className="paradigm-header agent">
            <div className="paradigm-icon agent-icon">🤖</div>
            <div>
              <h3>{s.paraAgentTitle}</h3>
              <p className="mono" style={{ fontSize:12, color:'var(--accent-light)', marginTop:4 }}>{s.paraAgentSub}</p>
            </div>
          </div>
          <div className="paradigm-model agent-model">
            <p style={{ fontSize:13, fontStyle:'italic', color:'var(--accent-light)' }}>{s.paraAgentModel}</p>
          </div>
          {agentTraits.map((t,i)=>(
            <div className="paradigm-trait agent-trait" key={i}>
              <span className="paradigm-trait-icon">{t.icon}</span>
              <div>
                <strong>{t.t}</strong>
                <p>{t.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Insight Banner ───
function InsightBanner({ s, lang }) {
  return (
    <section className="section-sm" id="insight">
      <div className="container">
        <div className="insight-banner">
          <div className="section-label" style={{ marginBottom:16 }}>{s.insightLabel}</div>
          <div className="insight-grid">
            <div className="insight-card human-insight">
              <div style={{ fontSize:40, marginBottom:12 }}>🛡</div>
              <h3>{lang==='zh'?'Human 密钥管理':'Human Key Management'}</h3>
              <div className="insight-eq">=</div>
              <h2>{lang==='zh'?'安全问题':'Security Problem'}</h2>
              <p>{lang==='zh'?'防止被偷':'Prevent theft'}</p>
            </div>
            <div className="insight-vs">→</div>
            <div className="insight-card agent-insight">
              <div style={{ fontSize:40, marginBottom:12 }}>🎛</div>
              <h3>{lang==='zh'?'Agent 密钥管理':'Agent Key Management'}</h3>
              <div className="insight-eq">=</div>
              <h2>{lang==='zh'?'控制系统问题':'Control System Problem'}</h2>
              <p>{lang==='zh'?'防止乱用':'Prevent misuse'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Core Problems We Solve ───
function CoreProblems({ s }) {
  const items = [
    { t:s.core1t, d:s.core1d, tag:s.core1tag, color:'var(--accent)' },
    { t:s.core2t, d:s.core2d, tag:s.core2tag, color:'var(--green)' },
    { t:s.core3t, d:s.core3d, tag:s.core3tag, color:'var(--cyan)' },
    { t:s.core4t, d:s.core4d, tag:s.core4tag, color:'var(--purple)' },
    { t:s.core5t, d:s.core5d, tag:s.core5tag, color:'var(--yellow)' },
  ]
  return (
    <section className="section container" id="product">
      <div className="section-header">
        <div className="section-label">{s.coreLabel}</div>
        <h2 className="section-title">{s.coreTitle}</h2>
        <p className="section-desc">{s.coreDesc}</p>
      </div>
      <div className="core-grid">
        {items.map((it,i)=>(
          <div className="core-card" key={i}>
            <div className="core-card-top">
              <span className="core-tag" style={{ borderColor:it.color, color:it.color }}>{it.tag}</span>
              <div className="core-num" style={{ color:it.color }}>0{i+1}</div>
            </div>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── 5 Primitives ───
function Primitives({ s }) {
  const items = [
    { icon:'🔗', t:s.prim1t, d:s.prim1d },
    { icon:'⚙️', t:s.prim2t, d:s.prim2d },
    { icon:'👁', t:s.prim3t, d:s.prim3d },
    { icon:'✂️', t:s.prim4t, d:s.prim4d },
    { icon:'🧱', t:s.prim5t, d:s.prim5d },
  ]
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.primLabel}</div>
        <h2 className="section-title">{s.primTitle}</h2>
      </div>
      <div className="prim-grid">
        {items.map((it,i)=>(
          <div className="prim-card" key={i}>
            <div style={{ fontSize:28, marginBottom:12 }}>{it.icon}</div>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Architecture (SVG) ───
function ArchitectureDiagram({ s }) {
  return (
    <section className="section container" id="arch">
      <div className="section-header">
        <div className="section-label">{s.archLabel}</div>
        <h2 className="section-title">{s.archTitle}</h2>
      </div>
      <div className="arch-diagram">
        <svg viewBox="0 0 960 480" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.04)" strokeWidth="1"/>
            </pattern>
            <linearGradient id="ag" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#a78bfa"/></linearGradient>
            <linearGradient id="gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient>
            <linearGradient id="yg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
            <marker id="ah" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#818cf8"/></marker>
            <marker id="gh" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#10b981"/></marker>
            <marker id="yh" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#f59e0b"/></marker>
          </defs>
          <rect width="960" height="480" fill="url(#grid)"/>

          {/* Agent Runtimes */}
          <rect x="20" y="20" width="200" height="440" rx="12" fill="rgba(17,17,25,0.8)" stroke="rgba(42,42,61,0.8)"/>
          <text x="120" y="50" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="600">AGENT RUNTIMES</text>

          {[['🤖','Claude Agent','claude@hanwen.com',80],['⚡','Cursor Copilot','cursor@hanwen.com',165],['🔧','Devin Agent','devin@hanwen.com',250],['🔄','Sub-agent','invoked by Claude',335]].map(([icon,name,id,y])=>(
            <g key={id}>
              <rect x="35" y={y} width="170" height="60" rx="8" fill="rgba(26,26,40,0.9)" stroke="rgba(42,42,61,1)"/>
              <text x="60" y={y+25} fill="#e4e4ed" fontSize="11" fontWeight="500">{icon} {name}</text>
              <text x="60" y={y+43} fill="#5a5a72" fontSize="9" fontFamily="JetBrains Mono">{id}</text>
            </g>
          ))}

          {/* Policy Engine (center) */}
          <rect x="280" y="20" width="400" height="440" rx="12" fill="rgba(99,102,241,0.03)" stroke="rgba(99,102,241,0.15)"/>
          <text x="480" y="50" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="600">AGENTVAULT CONTROL LAYER (Heima TEE)</text>

          {/* Policy Engine */}
          <rect x="300" y="70" width="360" height="100" rx="10" fill="rgba(245,158,11,0.05)" stroke="rgba(245,158,11,0.25)" strokeDasharray="6 3"/>
          <text x="480" y="92" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">POLICY ENGINE</text>
          <rect x="310" y="102" width="105" height="28" rx="5" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="362" y="120" textAnchor="middle" fill="#e4e4ed" fontSize="10">Scope Check</text>
          <rect x="425" y="102" width="105" height="28" rx="5" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="477" y="120" textAnchor="middle" fill="#e4e4ed" fontSize="10">Spend Limit</text>
          <rect x="540" y="102" width="105" height="28" rx="5" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="592" y="120" textAnchor="middle" fill="#e4e4ed" fontSize="10">Time Window</text>
          <rect x="310" y="137" width="105" height="28" rx="5" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="362" y="155" textAnchor="middle" fill="#e4e4ed" fontSize="10">Frequency Cap</text>
          <rect x="425" y="137" width="105" height="28" rx="5" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="477" y="155" textAnchor="middle" fill="#e4e4ed" fontSize="10">Context Match</text>
          <rect x="540" y="137" width="105" height="28" rx="5" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="592" y="155" textAnchor="middle" fill="#e4e4ed" fontSize="10">Chain Depth</text>

          {/* TEE Vault */}
          <rect x="300" y="190" width="360" height="70" rx="10" fill="rgba(99,102,241,0.06)" stroke="rgba(99,102,241,0.3)"/>
          <text x="480" y="215" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="600">TEE CREDENTIAL VAULT (Intel SGX Enclave)</text>
          <text x="480" y="235" textAnchor="middle" fill="#5a5a72" fontSize="10">Decrypt → Inject scoped credential → Never expose raw key</text>
          <text x="480" y="250" textAnchor="middle" fill="#5a5a72" fontSize="9" fontFamily="JetBrains Mono">AES-256-GCM · Shielding Key · Remote Attestation</text>

          {/* Auto Lifecycle */}
          <rect x="300" y="280" width="170" height="60" rx="8" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.25)"/>
          <text x="385" y="305" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600">KEY LIFECYCLE</text>
          <text x="385" y="325" textAnchor="middle" fill="#5a5a72" fontSize="9">Auto-rotate · Provision · Cleanup</text>

          {/* Audit */}
          <rect x="490" y="280" width="170" height="60" rx="8" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.25)"/>
          <text x="575" y="305" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="600">ON-CHAIN AUDIT</text>
          <text x="575" y="325" textAnchor="middle" fill="#5a5a72" fontSize="9">ZKP · Selective Disclosure</text>

          {/* VC Registry + Report */}
          <rect x="300" y="360" width="170" height="50" rx="8" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="385" y="385" textAnchor="middle" fill="#e4e4ed" fontSize="11">VC Registry (VCMP)</text>
          <text x="385" y="402" textAnchor="middle" fill="#5a5a72" fontSize="9">Agent identities</text>

          <rect x="490" y="360" width="170" height="50" rx="8" fill="rgba(17,17,25,0.9)" stroke="rgba(42,42,61,1)"/>
          <text x="575" y="385" textAnchor="middle" fill="#e4e4ed" fontSize="11">Execution Reports</text>
          <text x="575" y="402" textAnchor="middle" fill="#5a5a72" fontSize="9">Human-readable call graph</text>

          {/* Third-Party APIs */}
          <rect x="740" y="20" width="200" height="440" rx="12" fill="rgba(17,17,25,0.8)" stroke="rgba(42,42,61,0.8)"/>
          <text x="840" y="50" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="600">THIRD-PARTY APIS</text>

          {[['Gmail API',80],['OpenAI',150],['GitHub',220],['Vercel',290],['Slack',360]].map(([name,y])=>(
            <g key={name}>
              <rect x="755" y={y} width="170" height="45" rx="8" fill="rgba(26,26,40,0.9)" stroke="rgba(42,42,61,1)"/>
              <text x="840" y={y+20} textAnchor="middle" fill="#e4e4ed" fontSize="11" fontWeight="500">{name}</text>
              <text x="840" y={y+36} textAnchor="middle" fill="#5a5a72" fontSize="9">Scoped credential</text>
            </g>
          ))}

          {/* Arrows: Agent → Policy */}
          <line x1="205" y1="110" x2="300" y2="110" stroke="url(#ag)" strokeWidth="2" markerEnd="url(#ah)"/>
          <line x1="205" y1="195" x2="300" y2="150" stroke="url(#ag)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="205" y1="280" x2="300" y2="150" stroke="url(#ag)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="205" y1="365" x2="300" y2="155" stroke="url(#ag)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <text x="252" y="100" textAnchor="middle" fill="#818cf8" fontSize="8" fontFamily="JetBrains Mono">request</text>

          {/* Policy → TEE */}
          <line x1="480" y1="170" x2="480" y2="190" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#yh)"/>

          {/* TEE → APIs */}
          <line x1="660" y1="225" x2="755" y2="102" stroke="url(#gg)" strokeWidth="2" markerEnd="url(#gh)"/>
          <line x1="660" y1="225" x2="755" y2="172" stroke="url(#gg)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="660" y1="225" x2="755" y2="242" stroke="url(#gg)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="660" y1="225" x2="755" y2="312" stroke="url(#gg)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <line x1="660" y1="225" x2="755" y2="382" stroke="url(#gg)" strokeWidth="1.5" strokeDasharray="4 3"/>
          <text x="710" y="200" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="JetBrains Mono">inject scoped key</text>
        </svg>
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
            <div className={`flow-node${i===1?' active':''}`}>
              <h4>{f.t}</h4>
              <p>{f.d}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

// ─── Demo ───
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
          {[['dashboard',s.demoTab1],['audit',s.demoTab2],['terminal',s.demoTab3],['policy',s.demoTab4]].map(([k,v])=>(
            <button key={k} className={`demo-tab${tab===k?' active':''}`} onClick={()=>setTab(k)}>{v}</button>
          ))}
        </div>
        <div className="demo-body">
          {tab==='dashboard' && <DashboardDemo />}
          {tab==='audit' && <AuditDemo />}
          {tab==='terminal' && <TerminalDemo />}
          {tab==='policy' && <PolicyDemo />}
        </div>
      </div>
    </section>
  )
}

function DashboardDemo() {
  const agents = [
    { name:'Claude Agent', email:'claude@hanwencheng.com', avatar:'🤖', bg:'var(--accent-glow)', status:'active', scopes:['gmail:read','openai:chat','vercel:deploy'], accesses:1247, denied:12, lastUsed:'2 min ago', spend:'$34.20 / $50', rotation:'Auto-rotates in 6d' },
    { name:'Cursor Copilot', email:'cursor@hanwencheng.com', avatar:'⚡', bg:'var(--yellow-dim)', status:'active', scopes:['github:push','openai:code','npm:publish'], accesses:892, denied:3, lastUsed:'Just now', spend:'$12.80 / $30', rotation:'Rotated 2h ago' },
    { name:'Devin Agent', email:'devin@hanwencheng.com', avatar:'🔧', bg:'var(--green-dim)', status:'pending', scopes:['aws:ec2','github:read'], accesses:0, denied:0, lastUsed:'Never', spend:'$0 / $100', rotation:'Awaiting first use' },
  ]
  return (
    <div className="dash-layout">
      <div className="dash-sidebar">
        <div className="dash-sidebar-item active"><span className="icon">🎛</span>Control Panel</div>
        <div className="dash-sidebar-item"><span className="icon">📋</span>Policies</div>
        <div className="dash-sidebar-item"><span className="icon">🔑</span>Credentials</div>
        <div className="dash-sidebar-item"><span className="icon">📊</span>Execution Log</div>
        <div className="dash-sidebar-item"><span className="icon">🔄</span>Key Lifecycle</div>
        <div className="dash-sidebar-item"><span className="icon">📈</span>Reports</div>
        <div className="dash-sidebar-item"><span className="icon">⚙️</span>Settings</div>
      </div>
      <div className="dash-main">
        <div className="dash-header">
          <h3>Agent Control Panel</h3>
          <button className="btn btn-primary" style={{ padding:'8px 16px', fontSize:13 }}>+ Register Agent</button>
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
              <div className="agent-stat"><strong>{a.accesses.toLocaleString()}</strong> granted</div>
              <div className="agent-stat" style={{ color:'var(--red)' }}><strong>{a.denied}</strong> denied</div>
              <div className="agent-stat">Spend: <strong>{a.spend}</strong></div>
              <div className="agent-stat" style={{ color:'var(--green)' }}>🔄 {a.rotation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AuditDemo() {
  const logs = [
    { time:'14:23:01', agent:'claude', action:'gmail:read → fetched 3 emails', status:'granted', policy:'scope:gmail:read ✓ freq:< 60/h ✓', chain:'0xab12..ef56' },
    { time:'14:22:45', agent:'cursor', action:'github:push → committed to main', status:'granted', policy:'scope:github:push ✓ branch:main ✓', chain:'0xcd34..gh78' },
    { time:'14:22:12', agent:'claude', action:'openai:chat → 1,200 tokens', status:'granted', policy:'scope:openai:chat ✓ spend:$0.02 < $50 ✓', chain:'0xef56..ij90' },
    { time:'14:21:58', agent:'devin', action:'aws:s3 → list buckets', status:'denied', policy:'scope:aws:s3 ✗ not in granted scopes', chain:'0x1278..kl12' },
    { time:'14:21:30', agent:'claude', action:'gmail→slack→github chain', status:'granted', policy:'chain-depth:3 ≤ max:5 ✓ all scopes ✓', chain:'0x9abc..mn34' },
    { time:'14:20:15', agent:'claude', action:'vercel:deploy → preview build', status:'granted', policy:'scope:vercel:deploy ✓ env:preview ✓', chain:'0x5def..op56' },
    { time:'14:19:42', agent:'claude', action:'stripe:write → create charge', status:'denied', policy:'spend:$50.00 = limit:$50 ✗ limit reached', chain:'0x7gh8..qr78' },
    { time:'14:19:01', agent:'cursor', action:'openai:code → completion', status:'granted', policy:'scope:openai:code ✓ freq:12/min < 30 ✓', chain:'0x3ij4..st90' },
  ]
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <div style={{ fontSize:13, color:'var(--text-dim)' }}>2,139 events · <span style={{ color:'var(--accent-light)' }}>100% on-chain verified ⛓</span> · <span style={{ color:'var(--green)' }}>97.3% grant rate</span></div>
      </div>
      <div className="audit-log">
        <div className="audit-entry" style={{ fontWeight:600, color:'var(--text-dim)', fontSize:11 }}>
          <span>TIME</span><span>AGENT</span><span>ACTION</span><span>POLICY MATCH</span><span>STATUS</span>
        </div>
        {logs.map((l,i)=>(
          <div className="audit-entry" key={i}>
            <span className="audit-time">{l.time}</span>
            <span className="audit-agent">{l.agent}</span>
            <span className="audit-action">{l.action}</span>
            <span style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'JetBrains Mono' }}>{l.policy}</span>
            <span className={`audit-status ${l.status}`}>{l.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PolicyDemo() {
  const policies = [
    { agent:'claude@hanwencheng.com', rules:[
      { scope:'gmail:read', limit:'60 calls/hour', time:'Mon-Fri 9am-6pm', spend:'—', status:'active' },
      { scope:'openai:chat', limit:'1000 calls/day', time:'Always', spend:'$50/month', status:'active' },
      { scope:'vercel:deploy', limit:'10 deploys/day', time:'Always', spend:'—', status:'active' },
    ]},
    { agent:'cursor@hanwencheng.com', rules:[
      { scope:'github:push', limit:'Unlimited', time:'Always', spend:'—', status:'active' },
      { scope:'openai:code', limit:'30 calls/min', time:'Always', spend:'$30/month', status:'active' },
      { scope:'npm:publish', limit:'5/day', time:'Mon-Fri', spend:'—', status:'review' },
    ]},
  ]
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
        <h3 style={{ fontSize:16, fontWeight:700 }}>Active Policies</h3>
        <button className="btn btn-primary" style={{ padding:'8px 16px', fontSize:12 }}>+ New Policy</button>
      </div>
      {policies.map((p,i)=>(
        <div key={i} style={{ marginBottom:20 }}>
          <div style={{ fontSize:13, fontWeight:600, color:'var(--accent-light)', fontFamily:'JetBrains Mono', marginBottom:10 }}>{p.agent}</div>
          <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr>
                  <th style={{ padding:'10px 14px', fontSize:11, background:'var(--surface2)' }}>SCOPE</th>
                  <th style={{ padding:'10px 14px', fontSize:11, background:'var(--surface2)' }}>RATE LIMIT</th>
                  <th style={{ padding:'10px 14px', fontSize:11, background:'var(--surface2)' }}>TIME WINDOW</th>
                  <th style={{ padding:'10px 14px', fontSize:11, background:'var(--surface2)' }}>SPEND CAP</th>
                  <th style={{ padding:'10px 14px', fontSize:11, background:'var(--surface2)' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {p.rules.map((r,j)=>(
                  <tr key={j}>
                    <td style={{ padding:'10px 14px', fontFamily:'JetBrains Mono', color:'var(--text)', background:'transparent' }}>{r.scope}</td>
                    <td style={{ padding:'10px 14px', color:'var(--text-muted)', background:'transparent' }}>{r.limit}</td>
                    <td style={{ padding:'10px 14px', color:'var(--text-muted)', background:'transparent' }}>{r.time}</td>
                    <td style={{ padding:'10px 14px', color:r.spend!=='—'?'var(--yellow)':'var(--text-dim)', background:'transparent' }}>{r.spend}</td>
                    <td style={{ padding:'10px 14px', background:'transparent' }}>
                      <span style={{ padding:'3px 10px', borderRadius:12, fontSize:10, fontWeight:600, background:r.status==='active'?'var(--green-dim)':'var(--yellow-dim)', color:r.status==='active'?'var(--green)':'var(--yellow)' }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, padding:16, marginTop:16 }}>
        <div style={{ fontSize:12, fontWeight:600, color:'var(--text-muted)', marginBottom:8 }}>KEY LIFECYCLE STATUS</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
          <div style={{ padding:12, background:'var(--surface2)', borderRadius:8 }}>
            <div style={{ fontSize:11, color:'var(--text-dim)' }}>OpenAI API Key</div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--green)', marginTop:4 }}>🔄 Rotated 2h ago</div>
            <div style={{ fontSize:10, color:'var(--text-dim)', marginTop:2 }}>Next: in 28 days</div>
          </div>
          <div style={{ padding:12, background:'var(--surface2)', borderRadius:8 }}>
            <div style={{ fontSize:11, color:'var(--text-dim)' }}>GitHub Token</div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--yellow)', marginTop:4 }}>⚠ Expires in 6 days</div>
            <div style={{ fontSize:10, color:'var(--text-dim)', marginTop:2 }}>Auto-rotate scheduled</div>
          </div>
          <div style={{ padding:12, background:'var(--surface2)', borderRadius:8 }}>
            <div style={{ fontSize:11, color:'var(--text-dim)' }}>Vercel Token</div>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--green)', marginTop:4 }}>✓ Valid (54 days left)</div>
            <div style={{ fontSize:10, color:'var(--text-dim)', marginTop:2 }}>No action needed</div>
          </div>
        </div>
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
    { type:'out', parts:[{t:'',c:'output'}] },
    { type:'cmd', prompt:'$', parts:[{t:' agv ',c:'cmd'},{t:'policy create ',c:'cmd'},{t:'claude-daily ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --agent ',c:'flag'},{t:'claude@hanwencheng.com ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --scope ',c:'flag'},{t:'gmail:read,openai:chat,vercel:deploy ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --spend-limit ',c:'flag'},{t:'$50/mo ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --rate-limit ',c:'flag'},{t:'openai:1000/day,gmail:60/hr ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --time-window ',c:'flag'},{t:'"Mon-Fri 9am-6pm" ',c:'str'},{t:'\\',c:'output'}] },
    { type:'out', parts:[{t:'    --auto-rotate ',c:'flag'},{t:'30d',c:'str'}] },
    { type:'out', parts:[{t:'✓ Policy "claude-daily" created and enforced in TEE.',c:'success'}] },
    { type:'out', parts:[{t:'  Auto-rotation: every 30 days',c:'output'}] },
    { type:'out', parts:[{t:'',c:'output'}] },
    { type:'cmd', prompt:'$', parts:[{t:' agv ',c:'cmd'},{t:'audit ',c:'cmd'},{t:'--agent claude ',c:'flag'},{t:'--last 3',c:'str'}] },
    { type:'out', parts:[{t:'  14:23:01  gmail:read       ✓ granted  policy:scope ✓ freq:42/60 < 60/h',c:'output'}] },
    { type:'out', parts:[{t:'  14:22:12  openai:chat      ✓ granted  policy:scope ✓ spend:$34.20 < $50',c:'output'}] },
    { type:'out', parts:[{t:'  14:19:42  stripe:write     ✗ denied   policy:spend = $50/$50 limit hit',c:'error'}] },
    { type:'out', parts:[{t:'',c:'output'}] },
    { type:'cmd', prompt:'$', parts:[{t:' agv ',c:'cmd'},{t:'report ',c:'cmd'},{t:'--agent claude --today',c:'flag'}] },
    { type:'out', parts:[{t:'✓ Execution report generated: ./reports/claude-2026-03-30.html',c:'success'}] },
    { type:'out', parts:[{t:'  Total calls: 247 | Granted: 235 | Denied: 12 | Spend: $34.20',c:'output'}] },
    { type:'out', parts:[{t:'  Call graph: gmail(42) → openai(180) → vercel(13) → stripe(12, denied)',c:'output'}] },
  ]
  useEffect(()=>{
    if (visibleLines < lines.length) {
      const delay = lines[visibleLines]?.type==='cmd' ? 600 : 100
      const timer = setTimeout(()=>setVisibleLines(v=>v+1), delay)
      return ()=>clearTimeout(timer)
    }
  },[visibleLines])

  return (
    <div className="terminal">
      {lines.slice(0,visibleLines).map((line,i)=>(
        <div className="terminal-line" key={i} style={{ animationDelay:`${i*0.03}s` }}>
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

// ─── Comparison ───
function CompareSection({ s, lang }) {
  return (
    <section className="section container" id="compare">
      <div className="section-header">
        <div className="section-label">{s.compLabel}</div>
        <h2 className="section-title">{s.compTitle}</h2>
        <p className="section-desc">{s.compDesc}</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        {/* 1Password */}
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
            <div style={{ background:'#fff', color:'#111', padding:0, minHeight:360 }}>
              <div style={{ padding:'14px 20px', borderBottom:'1px solid #e5e5e5', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#ff6b35,#ff3d00)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, fontWeight:700 }}>✦</div>
                <div><div style={{ fontWeight:700, fontSize:14 }}>Claude Agent</div><div style={{ fontSize:10, color:'#999' }}>Connected Services · Usage Insights</div></div>
              </div>
              <div style={{ padding:'16px 20px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
                  {[['STORAGE','12 keys vaulted','✓'],['SHARING','3 team members','✓'],['EXECUTION CONTROL','—','✗'],['DYNAMIC POLICIES','—','✗'],['SPEND LIMITS','—','✗'],['AUTO-ROTATION','—','✗'],['ON-CHAIN AUDIT','—','✗'],['CALL GRAPH','—','✗']].map(([k,v,s],i)=>(
                    <div key={i} style={{ padding:'10px 12px', background:s==='✓'?'#f0fdf4':'#fef2f2', borderRadius:6, border:`1px solid ${s==='✓'?'#bbf7d0':'#fecaca'}` }}>
                      <div style={{ fontSize:9, fontWeight:600, letterSpacing:1, color:'#888' }}>{k}</div>
                      <div style={{ fontSize:12, fontWeight:600, color:s==='✓'?'#166534':'#991b1b', marginTop:2 }}>{s} {v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ margin:'0 20px 16px', padding:'12px', background:'#fef3c7', borderRadius:8, border:'1px solid #fde68a' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'#92400e' }}>⚠ {lang==='zh'?'存储层解决方案':'Storage-Layer Solution'}</div>
                <div style={{ fontSize:11, color:'#78350f', marginTop:4 }}>{lang==='zh'?'管理 key 存在哪里和谁能访问。不管理 agent 能用 key 做什么、在什么约束下。':'Manages where keys are stored and who can access. Does not manage what agents do with keys, under what constraints.'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* AgentVault */}
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
            <div style={{ background:'var(--bg2)', padding:0, minHeight:360 }}>
              <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#6366f1,#a78bfa)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:12, fontWeight:700 }}>AV</div>
                <div><div style={{ fontWeight:700, fontSize:14 }}>hanwen.eth</div><div style={{ fontSize:10, color:'var(--text-dim)', fontFamily:'JetBrains Mono' }}>3 agents · TEE active · Policy enforced</div></div>
              </div>
              <div style={{ padding:'16px 20px' }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
                  {[['STORAGE','12 keys in TEE','✓','var(--green)'],['DYNAMIC POLICIES','Per-agent rules','✓','var(--green)'],['EXECUTION CONTROL','Real-time enforcement','✓','var(--green)'],['SPEND LIMITS','$50/mo per agent','✓','var(--green)'],['AUTO-ROTATION','30-day cycle active','✓','var(--green)'],['RATE LIMITING','Per-scope, per-agent','✓','var(--green)'],['ON-CHAIN AUDIT','2,139 events, ZKP','✓','var(--green)'],['CALL GRAPH','Multi-API visualization','✓','var(--green)']].map(([k,v,st,c],i)=>(
                    <div key={i} style={{ padding:'10px 12px', background:'rgba(16,185,129,0.06)', borderRadius:6, border:'1px solid rgba(16,185,129,0.2)' }}>
                      <div style={{ fontSize:9, fontWeight:600, letterSpacing:1, color:'var(--text-dim)' }}>{k}</div>
                      <div style={{ fontSize:12, fontWeight:600, color:c, marginTop:2 }}>{st} {v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ margin:'0 20px 16px', padding:'12px', background:'rgba(99,102,241,0.08)', borderRadius:8, border:'1px solid rgba(99,102,241,0.2)' }}>
                <div style={{ fontSize:11, fontWeight:600, color:'var(--accent-light)' }}>✓ {lang==='zh'?'控制层解决方案':'Control-Layer Solution'}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>{lang==='zh'?'管理 agent 能用 key 做什么、在什么约束下、为什么。存储 + 策略 + 执行控制 + 审计。':'Manages what agents do with keys, under what constraints, and why. Storage + Policy + Execution Control + Audit.'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CompareTable({ s }) {
  const rows = [
    { f:'Key storage', av:'Yes (TEE)', op:'Yes', hv:'Yes', ca:'Yes' },
    { f:'Dynamic policy engine', av:'Yes', op:'No', hv:'Partial', ca:'Partial' },
    { f:'Per-agent spend limits', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'Rate limiting (per-scope)', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'Time-window constraints', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'Auto key rotation', av:'Yes', op:'No', hv:'Yes', ca:'Yes' },
    { f:'Multi-agent isolation', av:'Yes (VC-based)', op:'Partial', hv:'No', ca:'Partial' },
    { f:'Delegation chains', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'On-chain audit trail', av:'Yes (ZKP)', op:'No', hv:'No', ca:'No' },
    { f:'Multi-API call graph', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'Execution reports', av:'Yes', op:'No', hv:'No', ca:'No' },
    { f:'User-sovereign control', av:'Yes', op:'No', hv:'Self-hosted', ca:'No' },
    { f:'MCP native support', av:'Yes', op:'Partial', hv:'No', ca:'No' },
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
          <thead><tr>
            <th>{s.tblFeature}</th>
            <th style={{ color:'var(--accent-light)' }}>{s.tblAv}</th>
            <th>{s.tbl1p}</th><th>{s.tblHashi}</th><th>{s.tblCyber}</th>
          </tr></thead>
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

function MarketSection({ s }) {
  const items = [
    { icon:'🔑', t:s.mkt1t, d:s.mkt1d },{ icon:'💰', t:s.mkt2t, d:s.mkt2d },
    { icon:'📈', t:s.mkt3t, d:s.mkt3d },{ icon:'🔌', t:s.mkt4t, d:s.mkt4d },
  ]
  return (
    <section className="section container">
      <div className="section-header">
        <div className="section-label">{s.mktLabel}</div>
        <h2 className="section-title">{s.mktTitle}</h2>
      </div>
      <div className="cards-grid">{items.map((it,i)=>(
        <div className="card" key={i}><div className="card-icon" style={{ background:'var(--accent-glow)' }}>{it.icon}</div><h3>{it.t}</h3><p>{it.d}</p></div>
      ))}</div>
    </section>
  )
}

function PricingSection({ s }) {
  return (
    <section className="section container" id="model">
      <div className="section-header">
        <div className="section-label">{s.prcLabel}</div>
        <h2 className="section-title">{s.prcTitle}</h2>
      </div>
      <div className="pricing-grid">
        <div className="price-card">
          <h4>{s.prcFree}</h4><div className="price-amount">$0</div><div className="price-period">{s.prcForever}</div>
          <ul className="price-features"><li>1 agent identity</li><li>10 credential slots</li><li>Basic policies</li><li>7-day audit log</li></ul>
        </div>
        <div className="price-card featured">
          <h4>{s.prcPro}</h4><div className="price-amount">$9</div><div className="price-period">{s.prcMonth}</div>
          <ul className="price-features"><li>Unlimited agents</li><li>Custom policies</li><li>Auto key rotation</li><li>Full audit history</li><li>Execution reports</li><li>Call graph visualization</li></ul>
        </div>
        <div className="price-card">
          <h4>{s.prcTeam}</h4><div className="price-amount">$29</div><div className="price-period">{s.prcSeat}</div>
          <ul className="price-features"><li>Shared vaults</li><li>Multi-agent fleet control</li><li>Team audit dashboard</li><li>Admin controls</li><li>API access</li></ul>
        </div>
      </div>
    </section>
  )
}

function RoadmapSection({ s }) {
  const items = [{t:s.rd1t,a:s.rd1a,d:s.rd1d},{t:s.rd2t,a:s.rd2a,d:s.rd2d},{t:s.rd3t,a:s.rd3a,d:s.rd3d}]
  return (
    <section className="section container" id="roadmap">
      <div className="section-header"><div className="section-label">{s.rdLabel}</div><h2 className="section-title">{s.rdTitle}</h2></div>
      <div className="timeline">{items.map((it,i)=>(
        <div className="timeline-item" key={i}><h4>{it.t}</h4><div className="timeline-amount">{it.a}</div><p>{it.d}</p></div>
      ))}</div>
    </section>
  )
}

function RiskSection({ s }) {
  const items = [{t:s.rsk1t,d:s.rsk1d},{t:s.rsk2t,d:s.rsk2d},{t:s.rsk3t,d:s.rsk3d},{t:s.rsk4t,d:s.rsk4d}]
  return (
    <section className="section-sm container">
      <div className="section-header"><div className="section-label">{s.rskLabel}</div></div>
      <div className="risk-grid">{items.map((it,i)=>(<div className="risk-card" key={i}><h4>{it.t}</h4><p>{it.d}</p></div>))}</div>
    </section>
  )
}

function Footer({ s }) {
  return (
    <footer className="footer">
      <div className="footer-tagline">{s.footTagline}</div>
      <p className="footer-sub">{s.footSub}</p>
      <div className="hero-actions" style={{ marginTop:24 }}>
        <a href="#demo" className="btn btn-primary">View Demo →</a>
        <a href="#paradigm" className="btn btn-ghost">Read the Paradigm Shift</a>
      </div>
      <p style={{ marginTop:40, fontSize:12, color:'var(--text-dim)' }}>
        March 2026 · Built on <a href="https://heima.network" target="_blank" rel="noopener" style={{ color:'var(--accent-light)' }}>Heima Network</a>
      </p>
    </footer>
  )
}
