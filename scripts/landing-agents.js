export const AGENT_LAYERS = [
  {
    id: "L1",
    code: "L1 · Watchtower",
    name: "盯市层",
    tone: "var(--c-cyan)",
    desc: "持续采集公开渠道的在售房价、报价变化、套餐与限时优惠等公开信息。每一次采集都是一帧带审计的快照。",
  },
  {
    id: "L2",
    code: "L2 · Archive",
    name: "沉淀层",
    tone: "var(--c-violet)",
    desc: "时间序列优先：每一帧情报都串到时间轴上。数据本地存储、零脏数据，可回溯到任意一晚。",
  },
  {
    id: "L3",
    code: "L3 · Decode",
    name: "拆解层",
    tone: "var(--c-green)",
    desc: "AI 真正发力的层 —— 把“含早大床免费取消最晚 18 点付到店”翻译成 5 维可比签名，跨房型、跨酒店秒级比价。",
  },
  {
    id: "L4",
    code: "L4 · Decision",
    name: "决策层",
    tone: "var(--c-amber)",
    desc: "价格拆解 + 比价对账 + 异常告警 + 性价比前沿 + 一句话洞察 —— 给收益经理的量化弹药库。",
  },
  {
    id: "L5",
    code: "L5 · Command",
    name: "指挥层",
    tone: "var(--c-rose)",
    desc: "舰队指挥官 + AI 经营顾问。命令行、桌面、网页、云端四个入口共用同一支舰队。",
  },
];

export const AGENTS = [
  // -----------------------------------------------------------------
  // L1 · 盯市层
  // -----------------------------------------------------------------
  {
    id: "scout",
    name: "盯价员 ScoutAgent",
    codename: "agent.scout@v3",
    layer: "L1",
    icon: "spider",
    tone: "var(--c-cyan)",
    desc: "按你设定的节奏，对竞品酒店的公开报价做结构化采集；每一次采集都附完整审计链路，可追溯到任意一次执行明细。",
    inputs: "酒店清单 / 采集计划",
    outputs: "原始情报 + 审计日志",
    tags: ["定时采集", "价格识别", "可回放"],
    module: "ScoutAgent · 盯价舰队",
  },
  {
    id: "signal",
    name: "情报员 SignalAgent",
    codename: "agent.signal@v2",
    layer: "L1",
    icon: "braces",
    tone: "var(--c-cyan)",
    desc: "把“看似一行字”的房价拆成结构化情报：房型、床型、含早、取消政策、支付方式、会员标签、限时折扣等全部分项抽出，让下游能逐项对账。",
    inputs: "原始情报",
    outputs: "结构化房价情报",
    tags: ["拆字段", "会员识别", "支付识别"],
    module: "SignalAgent · 情报解析",
  },

  // -----------------------------------------------------------------
  // L2 · 沉淀层
  // -----------------------------------------------------------------
  {
    id: "archive",
    name: "数据沉淀官 ArchiveAgent",
    codename: "agent.archive@v4",
    layer: "L2",
    icon: "database",
    tone: "var(--c-violet)",
    desc: "把每一帧情报都串到时间轴上，“今晚 vs 上周二 vs 三天前”任意区间一键就出结果；数据本地存储，落地即一致，零半截脏数据。",
    inputs: "结构化情报",
    outputs: "时间序列价格快照",
    tags: ["时间轴", "可回溯", "零脏数据"],
    module: "ArchiveAgent · 价格时间轴",
  },
  {
    id: "lineage",
    name: "房型族谱师 LineageAgent",
    codename: "agent.lineage@v3",
    layer: "L2",
    icon: "layers",
    tone: "var(--c-violet)",
    desc: "维护“我家 + 全部竞品”的房型族谱：行政大床、豪华套房、亲子家庭房 …… 每一种房型自动打上“什么时候上线、什么时候消失”的生命周期；房型悄悄换名也能识别成同一个。",
    inputs: "时间序列快照",
    outputs: "房型 / 套餐生命周期表",
    tags: ["房型谱系", "上线下架探测", "生命周期"],
    module: "LineageAgent · 房型族谱",
  },

  // -----------------------------------------------------------------
  // L3 · 拆解层（AI 真正发力的层）
  // -----------------------------------------------------------------
  {
    id: "decode",
    name: "套餐拆解师 DecodeAgent",
    codename: "agent.decode@v1",
    layer: "L3",
    icon: "atom",
    tone: "var(--c-green)",
    desc: "面对“含双早 行政大床房 免费取消 最晚 18:00 前到店付”这种长串自然语言，把它拆成 5 维可比签名：含早 / 取消政策 / 确认方式 / 支付方式 / 礼遇套餐；跨房型秒级横向比价。",
    inputs: "原始套餐字段",
    outputs: "5 维可比签名",
    tags: ["5 维签名", "跨房型可比", "可溯源"],
    module: "DecodeAgent · 套餐 5 维签名",
  },
  {
    id: "lexicon",
    name: "AI 词典学家 LexiconAgent",
    codename: "agent.lexicon@v4",
    layer: "L3",
    icon: "brain",
    tone: "var(--c-green)",
    desc: "遇到“行政礼遇”“SPA 体验券”“周年庆礼遇”这种灰区营销标签时，AI 渐进识别 + 人工待审双轨；每一次识别都有可信度评分，失败可重放。",
    inputs: "未识别营销标签",
    outputs: "标签翻译候选（带可信度）",
    tags: ["AI 兜底", "可信度评分", "人工待审"],
    module: "LexiconAgent · 营销标签翻译",
  },

  // -----------------------------------------------------------------
  // L4 · 决策层
  // -----------------------------------------------------------------
  {
    id: "decompose",
    name: "价格拆解师 DecomposeAgent",
    codename: "agent.decompose@v5",
    layer: "L4",
    icon: "cube",
    tone: "var(--c-amber)",
    desc: "把“今晚一晚 1288 元”拆成 \u2192 房型阶梯 +800、含双早 +120、行政礼遇 +200、免费取消 +80、支付价差 -28 …… 6 个预设视图一键切换：早餐溢价 / 礼遇溢价 / 房型阶梯 / 跨签名矩阵 / 支付价差 / 缺口三态。",
    inputs: "酒店 + 入住日 + 视角",
    outputs: "拆解矩阵 + 单元格反查",
    tags: ["价格拆解", "早餐溢价", "礼遇溢价"],
    module: "DecomposeAgent · 价格立方体",
  },
  {
    id: "delta",
    name: "涨跌复盘师 DeltaAgent",
    codename: "agent.delta@v2",
    layer: "L4",
    icon: "delta",
    tone: "var(--c-amber)",
    desc: "今晚 vs 昨晚谁涨了？涨多少？哪几个套餐悄悄消失了？哪几个套餐新加了？四类对账：上涨 / 下降 / 新上线 / 下架。涨红、降绿、新蓝、下灰，一眼看完不漏。",
    inputs: "两个时间点的快照",
    outputs: "4 类涨跌对账表",
    tags: ["涨跌榜", "新上下线", "可视化"],
    module: "DeltaAgent · 涨跌复盘",
  },
  {
    id: "anomaly",
    name: "异常告警官 AnomalyAgent",
    codename: "agent.anomaly@v2",
    layer: "L4",
    icon: "alert",
    tone: "var(--c-amber)",
    desc: "竞品在非常规时段悄悄调价 +88 元？过去 14 天稳定不动突然涨 200？智能识别异常立刻告警；最值得告警的恰恰是“长期稳定突然变价”——AnomalyAgent 把它顶格标无穷大。",
    inputs: "酒店 + 入住日 + 阈值",
    outputs: "异常清单（4 类）",
    tags: ["异常预警", "非常规时段变价", "长期稳定突变"],
    module: "AnomalyAgent · 异常告警",
  },
  {
    id: "value",
    name: "性价比裁判官 ValueAgent",
    codename: "agent.value@v1",
    layer: "L4",
    icon: "scale",
    tone: "var(--c-amber)",
    desc: "同价位谁最值？给每个套餐多维度加权打分（早餐 50 元/份、行政礼遇 80 元、可取消 30 元、可信房型 …）+ 二维性价比前沿。被淘汰套餐附“被谁压制”解释，定价时心里有数。",
    inputs: "酒店 + 入住日 + 权重",
    outputs: "性价比前沿 + 压制者解释",
    tags: ["性价比", "前沿排行", "压制者解释"],
    module: "ValueAgent · 性价比裁判",
  },
  {
    id: "match",
    name: "竞品对齐师 MatchAgent",
    codename: "agent.match@v1",
    layer: "L4",
    icon: "compare",
    tone: "var(--c-amber)",
    desc: "比价的前提是“同质”。我家“豪华行政大床”和竞品“高级商务大床”能否对齐？AI 三段式智能配对，给跨酒店比价提供共同标尺。",
    inputs: "我方酒店 + 竞品池",
    outputs: "同质房型对齐对",
    tags: ["竞品对齐", "同质房型", "AI 智能配对"],
    module: "MatchAgent · 竞品对齐",
  },
  {
    id: "battle",
    name: "比价决策官 BattleAgent",
    codename: "agent.battle@v1",
    layer: "L4",
    icon: "stack",
    tone: "var(--c-amber)",
    desc: "今晚我家 vs 竞品全网对账单：Meet（持平）几个、Beat（更便宜）几个、Lose（更贵）几个。红绿灯式三态决策矩阵——总部一眼看完今天该降价、该死扛、还是该跟涨。",
    inputs: "我方 + 对齐后的竞品",
    outputs: "Meet / Beat / Lose 矩阵",
    tags: ["比价决策", "Meet/Beat/Lose", "总部视角"],
    module: "BattleAgent · 比价决策",
  },
  {
    id: "insight",
    name: "经营洞察主笔 InsightAgent",
    codename: "agent.insight@v2",
    layer: "L4",
    icon: "sparkles",
    tone: "var(--c-amber)",
    desc: "总部不爱看图，要的是结论。InsightAgent 自动归纳出 1~3 句中文判断，例如“列「2」稳定 +151 元（10 房型完全一致，极差 1.0）”——上传到周会幻灯片直接用。",
    inputs: "拆解 / 涨跌 / 三态矩阵",
    outputs: "中文一句话经营结论",
    tags: ["一句话洞察", "周会可用", "自动归纳"],
    module: "InsightAgent · 经营洞察",
  },

  // -----------------------------------------------------------------
  // L5 · 指挥层
  // -----------------------------------------------------------------
  {
    id: "pilot",
    name: "舰队指挥官 PilotAgent",
    codename: "agent.pilot@v3",
    layer: "L5",
    icon: "pipeline",
    tone: "var(--c-rose)",
    desc: "一键启动整支舰队：盯价 → 解析 → 沉淀 → 拆解 → 比价 → 告警 → 洞察 端到端跑通。网页“立即抓”按钮、命令行、桌面 App、云端服务 —— 四个入口共用同一支舰队。",
    inputs: "触发模式 + 候选酒店清单",
    outputs: "端到端经营情报",
    tags: ["舰队编排", "一键端到端", "四端共用"],
    module: "PilotAgent · 舰队指挥官",
  },
  {
    id: "chat",
    name: "AI 经营顾问 ChatAgent",
    codename: "agent.chat@v2",
    layer: "L5",
    icon: "chat",
    tone: "var(--c-rose)",
    desc: "自然语言对话顾问：\"今晚我哪几家酒店该降价？\"\"上周二谁的礼遇套餐悄悄涨了？\"\"国庆假期我家比对手贵 80 元，正常吗？\"流式输出 + 结构化结论 + 成本看得见。",
    inputs: "经营问题（自然语言）",
    outputs: "结构化结论 + 数据引用",
    tags: ["AI 顾问", "自然语言提问", "成本可见"],
    module: "ChatAgent · AI 经营顾问",
  },
  {
    id: "doctor",
    name: "环境管家 DoctorAgent",
    codename: "agent.doctor@v2",
    layer: "L5",
    icon: "stethoscope",
    tone: "var(--c-rose)",
    desc: "舰队装得上吗？自动体检环境 + 失败时给“如何修”指引，让从 0 到 1 跑通的成本压到 5 分钟。",
    inputs: "(无)",
    outputs: "体检报告 + 修复指引",
    tags: ["环境自检", "5 分钟启动", "修复指引"],
    module: "DoctorAgent · 环境管家",
  },
  {
    id: "runner",
    name: "Agent 运行时 RunnerAgent",
    codename: "agent.runner@v1",
    layer: "L5",
    icon: "route",
    tone: "var(--c-rose)",
    desc: "所有岗位的共同底座：先想 → 再做 → 看结果 → 反思 主循环；步数 / 时长 / 中断信号 三道闸门防失控；每一步落审计日志，失败可重放、成本可结算。",
    inputs: "目标 + 工具集 + 预算",
    outputs: "执行轨迹 + 最终产物",
    tags: ["可中断", "可回放", "成本可结算"],
    module: "RunnerAgent · Agent 运行时",
  },
];

/** 按 layer 分组聚合：[{layer, agents}]。 */
export function groupAgentsByLayer() {
  const map = new Map();
  for (const layer of AGENT_LAYERS) {
    map.set(layer.id, { layer, agents: [] });
  }
  for (const a of AGENTS) {
    if (map.has(a.layer)) map.get(a.layer).agents.push(a);
  }
  return Array.from(map.values());
}

/** 顶部 hero 用：6 个最能体现"AI 替你盯价 / 拆价 / 定价"的代表性岗位。 */
export function pickFeaturedAgents() {
  const ids = ["scout", "decode", "decompose", "anomaly", "battle", "chat"];
  return ids.map((id) => AGENTS.find((a) => a.id === id)).filter(Boolean);
}

/** 三大业务能力区：每个能力关联 3-4 个 Agent。 */
export const BUSINESS_CAPABILITIES = [
  {
    id: "decompose",
    eyebrow: "Price Decomposition",
    title: "价格拆解",
    headline: "把一晚 1288 元拆解到每一分钱的来路",
    lead:
      "公开渠道的“限时优惠”背后到底打了多少折？早餐、取消政策、支付方式、行政礼遇、房型阶梯，每一项的真实贡献是多少？把价格立方化，你心里才有数。",
    tone: "var(--c-cyan)",
    bullets: [
      "把“含早大床免费取消”翻译成 5 维可比签名",
      "6 个预设视图：早餐溢价 / 礼遇溢价 / 房型阶梯 / 缺口三态 / 支付价差 / 跨签名矩阵",
      "单元格点开反查到具体套餐 + 原始页面",
    ],
    agents: ["decode", "lexicon", "decompose", "insight"],
  },
  {
    id: "compare",
    eyebrow: "Competitive Pricing",
    title: "智能比价",
    headline: "我家 vs 竞品同质房型的红绿灯对账单",
    lead:
      "比价的前提是“同质”。我家“豪华行政大床”和竞品“高级商务大床”能否对齐？对齐后今晚谁更贵？谁触发了限时折扣？谁悄悄上线了新套餐？三态决策矩阵 + 涨跌榜，一眼看完。",
    tone: "var(--c-violet)",
    bullets: [
      "竞品对齐：AI 三段式智能配对",
      "Meet / Beat / Lose 三态决策矩阵：今天该降价、死扛还是跟涨？",
      "涨跌复盘：上涨 / 下降 / 新上线 / 下架 4 类对账，零遗漏",
    ],
    agents: ["match", "battle", "delta"],
  },
  {
    id: "pricing",
    eyebrow: "Revenue Pricing",
    title: "辅助定价",
    headline: "异常告警 + 性价比前沿 + 一句话洞察",
    lead:
      "竞品在非常规时段悄悄涨了 88 元，你想等到第二天上班才发现吗？长期稳定突然变价才是最值得告警的场景。配合多维加权性价比前沿和自动一句话经营结论，给定价决策提供量化弹药。",
    tone: "var(--c-amber)",
    bullets: [
      "异常告警：非常规时段变价、长期稳定突变全部命中",
      "性价比前沿：同价位谁最值 + 被淘汰套餐“被谁压制”解释",
      "经营洞察主笔：自动生成中文结论，周会幻灯片直接用",
    ],
    agents: ["anomaly", "value", "insight"],
  },
];

/** 业务痛点叙事：4 个真实场景。 */
export const PAIN_POINTS = [
  {
    icon: "alert",
    tone: "var(--c-rose)",
    when: "非工作时段",
    title: "竞品悄悄调价，第二天上班才发现",
    body:
      "等你早上喝咖啡的时候，已经被截走 23 个晚上的预订。AnomalyAgent 把“长期稳定突然变价”顶格告警，第一时间推到经营群。",
  },
  {
    icon: "cube",
    tone: "var(--c-cyan)",
    when: "周会前",
    title: "1288 元一晚，到底贵在哪？",
    body:
      "DecomposeAgent 把价格拆成早餐 +120 / 礼遇 +200 / 取消 +80 / 房型阶梯 +800 / 支付价差 -28，每一分钱的来路都说得明明白白。",
  },
  {
    icon: "stack",
    tone: "var(--c-violet)",
    when: "总部决策",
    title: "全网 12 家酒店谁该降、谁该扛？",
    body:
      "BattleAgent 给一份 Meet / Beat / Lose 红绿灯对账单：Beat 8 个继续保住、Meet 3 个观望、Lose 1 个建议跟涨。3 秒出决策，告别一周扫 50 张报表。",
  },
  {
    icon: "chat",
    tone: "var(--c-amber)",
    when: "随口一问",
    title: '"今晚我哪几家酒店该降价？"',
    body:
      "ChatAgent 接住这种自然语言提问，回结构化结论 + 数据引用 + 调用成本。每一次回答都可审计、可重放、可结算。",
  },
];
