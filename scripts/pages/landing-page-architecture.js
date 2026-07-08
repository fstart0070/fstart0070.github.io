import { h } from "../landing-dom.js";
import { renderSectionHead, renderTerminal } from "../landing-components.js";
import { AGENT_LAYERS } from "../landing-agents.js";
import {
  IconAcquisition,
  IconPersistence,
  IconCanonical,
  IconAnalytics,
  IconOrchestration,
  IconArrow,
} from "../landing-icons.js";

export function renderArchitecturePage() {
  return h(
    "div",
    null,
    h(
      "section",
      { class: "landing-section landing-container" },
      renderSectionHead(
        "Architecture",
        "舰队的 5 个业务岗位层",
        "盯市 → 沉淀 → 拆解 → 决策 → 指挥。岗位之间界限清晰，上一层产出是下一层的输入。"
      ),
      h(
        "div",
        { class: "landing-arch" },
        renderArchGraph(),
        renderArchSide()
      )
    ),
    h("div", { class: "landing-divider" }),
    renderDataFlowSection(),
    renderPrincipleSection()
  );
}

/* ===========================================================================
 *  SVG 架构图（5 层 · 业务命名）
 * =========================================================================== */

function renderArchGraph() {
  // evergreen 翠绿青色五调色盘，与 AGENT_LAYERS 同步
  const colors = ["#10b981", "#06b6d4", "#0d9488", "#b45309", "#dc2626"];
  const layers = [
    { name: "L1 盯市", sub: "Watchtower" },
    { name: "L2 沉淀", sub: "Archive" },
    { name: "L3 拆解", sub: "Decode" },
    { name: "L4 决策", sub: "Decision" },
    { name: "L5 指挥", sub: "Command" },
  ];

  const W = 760;
  const H = 460;
  const cx = W / 2;
  const cy = H / 2;

  const nodes = layers.map((l, i) => {
    const angle = (i / layers.length) * Math.PI * 2 - Math.PI / 2;
    const r = 175;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    return { ...l, x, y, color: colors[i] };
  });

  const svg = h(
    "svg",
    {
      viewBox: `0 0 ${W} ${H}`,
      "aria-hidden": "true",
      preserveAspectRatio: "xMidYMid meet",
    },
    h(
      "defs",
      null,
      h(
        "radialGradient",
        { id: "core-glow", cx: "50%", cy: "50%", r: "50%" },
        h("stop", { offset: "0%", "stop-color": "#10b981", "stop-opacity": "0.32" }),
        h("stop", { offset: "100%", "stop-color": "#10b981", "stop-opacity": "0" })
      ),
      h(
        "filter",
        { id: "node-glow", x: "-50%", y: "-50%", width: "200%", height: "200%" },
        h("feGaussianBlur", { stdDeviation: "3", result: "blur" }),
        h(
          "feMerge",
          null,
          h("feMergeNode", { in: "blur" }),
          h("feMergeNode", { in: "SourceGraphic" })
        )
      )
    ),
    h("circle", { cx: cx, cy: cy, r: 150, fill: "url(#core-glow)" }),
    h("circle", {
      cx: cx,
      cy: cy,
      r: 90,
      fill: "#ffffff",
      stroke: "rgba(16,185,129,0.55)",
      "stroke-width": "1.5",
      "stroke-dasharray": "3 5",
    }),
    h(
      "text",
      {
        x: cx,
        y: cy - 8,
        "text-anchor": "middle",
        fill: "#1f2937",
        "font-family": "Inter, system-ui, sans-serif",
        "font-size": "20",
        "font-weight": "700",
      },
      "AI Agents"
    ),
    h(
      "text",
      {
        x: cx,
        y: cy + 14,
        "text-anchor": "middle",
        fill: "#047857",
        "font-family": "JetBrains Mono, monospace",
        "font-size": "11",
        "font-weight": "600",
      },
      "盯价 · 拆价 · 定价"
    ),
    h(
      "text",
      {
        x: cx,
        y: cy + 32,
        "text-anchor": "middle",
        fill: "#94a3b8",
        "font-family": "JetBrains Mono, monospace",
        "font-size": "9",
        "letter-spacing": "0.18em",
      },
      "17 AGENTS · 5 LAYERS"
    ),
    ...nodes.flatMap((n, i) => {
      const next = nodes[(i + 1) % nodes.length];
      return [
        h("line", {
          x1: n.x,
          y1: n.y,
          x2: next.x,
          y2: next.y,
          stroke: "rgba(16,185,129,0.22)",
          "stroke-width": "1",
          "stroke-dasharray": "4 4",
        }),
        h("line", {
          x1: cx,
          y1: cy,
          x2: n.x,
          y2: n.y,
          stroke: `${n.color}55`,
          "stroke-width": "1",
        }),
      ];
    }),
    ...nodes.map((n) =>
      h(
        "g",
        { transform: `translate(${n.x},${n.y})`, filter: "url(#node-glow)" },
        h("circle", {
          cx: 0,
          cy: 0,
          r: 32,
          fill: "#ffffff",
          stroke: n.color,
          "stroke-width": "1.8",
        }),
        h("circle", {
          cx: 0,
          cy: 0,
          r: 6,
          fill: n.color,
        }),
        h(
          "text",
          {
            x: 0,
            y: 50,
            "text-anchor": "middle",
            fill: "#1f2937",
            "font-family": "Inter, system-ui, sans-serif",
            "font-size": "13",
            "font-weight": "700",
          },
          n.name
        ),
        h(
          "text",
          {
            x: 0,
            y: 64,
            "text-anchor": "middle",
            fill: "#94a3b8",
            "font-family": "JetBrains Mono, monospace",
            "font-size": "9",
            "letter-spacing": "0.12em",
            "font-weight": "600",
          },
          n.sub.toUpperCase()
        )
      )
    )
  );

  return h(
    "div",
    { class: "landing-arch-graph landing-reveal" },
    svg,
    h(
      "p",
      { class: "landing-arch-graph__caption" },
      "5 层环形 · 顺时针：盯市 → 沉淀 → 拆解 → 决策 → 指挥；中心是 AI Agents 共享底座"
    )
  );
}

/* ===========================================================================
 *  右侧业务旁注
 * =========================================================================== */

function renderArchSide() {
  // 与 renderArchGraph 5 色保持一致（evergreen 翠绿青系）
  const colorMap = {
    "var(--c-cyan)": "#10b981",
    "var(--c-violet)": "#06b6d4",
    "var(--c-green)": "#0d9488",
    "var(--c-amber)": "#b45309",
    "var(--c-rose)": "#dc2626",
  };
  return h(
    "div",
    { class: "landing-arch-side" },
    ...AGENT_LAYERS.map((l, i) =>
      h(
        "div",
        {
          class: "landing-arch-side__item landing-reveal",
          "data-reveal-delay": Math.min(i, 5),
          style: {
            borderLeft: `3px solid ${colorMap[l.tone] || "#10b981"}`,
          },
        },
        h(
          "h4",
          null,
          h("span", { class: "num" }, l.code),
          " ",
          l.name
        ),
        h("p", null, l.desc)
      )
    )
  );
}

/* ===========================================================================
 *  数据流 / 终端示例（业务话术）
 * =========================================================================== */

function renderDataFlowSection() {
  const term = renderTerminal(
    "舰队协作图 · 从盯价到周报",
    [
      `<span class="tok-cmt"># 1. 盯市层（Watchtower）</span>`,
      `<span class="tok-cmd">ScoutAgent</span>   ─► 定时采集 5 家竞品公开报价 ─► <span class="tok-str">原始情报</span>`,
      `<span class="tok-cmd">SignalAgent</span>  ─► 拆字段：房型 / 床型 / 含早 / 取消 / 支付 / 价格档位`,
      ``,
      `<span class="tok-cmt"># 2. 沉淀层（Archive）— 时间轴落地</span>`,
      `<span class="tok-cmd">ArchiveAgent</span> ─► 时间轴落地 · 数据本地存储 · 零脏数据`,
      `<span class="tok-cmd">LineageAgent</span> ─► 房型生命周期：首次见到 / 最近见到 / 上下架探测`,
      ``,
      `<span class="tok-cmt"># 3. 拆解层（Decode）— AI 真正发力</span>`,
      `<span class="tok-cmd">DecodeAgent</span>  ─► \u201c含早大床免费取消\u201d → 5 维可比签名`,
      `<span class="tok-cmd">LexiconAgent</span> ─► 灰区营销标签：AI 渐进识别 + 人工待审`,
      ``,
      `<span class="tok-cmt"># 4. 决策层（Decision）— 量化弹药库</span>`,
      `<span class="tok-cmd">DecomposeAgent</span> ─► 价格立方体：早餐 / 礼遇 / 取消 / 支付 / 房型阶梯`,
      `<span class="tok-cmd">DeltaAgent</span>     ─► 涨跌复盘：上涨 / 下降 / 新上线 / 下架 4 类对账`,
      `<span class="tok-cmd">AnomalyAgent</span>   ─► 异常告警：长期稳定突变价 → 推送经营群`,
      `<span class="tok-cmd">MatchAgent</span>     ─► 跨酒店同质房型 AI 智能配对`,
      `<span class="tok-cmd">BattleAgent</span>    ─► Meet / Beat / Lose 三态决策矩阵`,
      `<span class="tok-cmd">ValueAgent</span>     ─► 多维加权性价比前沿 + \u201c被谁压制\u201d 解释`,
      `<span class="tok-cmd">InsightAgent</span>   ─► 一句话经营结论：周会幻灯片直接用`,
      ``,
      `<span class="tok-cmt"># 5. 指挥层（Command）— 四端共舰</span>`,
      `命令行 / 网页 / 桌面 / 云端  ─► <span class="tok-cmd">PilotAgent</span> 一键端到端 · <span class="tok-cmd">ChatAgent</span> 自然语言对话<span class="landing-terminal__caret"></span>`,
    ]
  );

  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Data flow",
      "舰队协作图",
      "从盯回的原始情报到周会的一句话结论 —— 全程链路可记录、可追踪、可回放。"
    ),
    h(
      "div",
      { class: "landing-reveal", style: { maxWidth: "920px", margin: "0 auto" } },
      term
    )
  );
}

/* ===========================================================================
 *  工程信条
 * =========================================================================== */

function renderPrincipleSection() {
  const items = [
    {
      tag: "Single Duty",
      title: "单一职责 · 分层分岗位",
      desc: "每个智能体只做一件事；上一层产出是下一层的输入；岗位之间界限清晰，避免横向耦合。",
    },
    {
      tag: "AI Native",
      title: "AI 是岗位，不是装饰",
      desc: "把 AI 当成正式岗位上的同事，所有理解 / 对话 / 决策能力统一收口；规则只做兜底。",
    },
    {
      tag: "Local First",
      title: "数据本地存储 · 开箱即用",
      desc: "舰队的所有情报都落地在自家服务器，集团总部 / 区域 / 单店都能跑。",
    },
    {
      tag: "Single Pipe",
      title: "数据通道唯一收口",
      desc: "所有数据读写都经过统一通道，业务和数据完全解耦；换底层不影响业务。",
    },
    {
      tag: "Observability",
      title: "可观测·可中断·可回放",
      desc: "审计每一次 AI 决策；步数 / 时长 / 中断信号 三道闸门防失控；关键时刻经得起复盘。",
    },
    {
      tag: "Cost Aware",
      title: "成本可见 · 缓存优先",
      desc: "幂等调用走智能缓存；每周智能调用消耗按天聚合 —— AI 决策不烧暗钱。",
    },
  ];

  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Principles",
      "舰队信条",
      "六条不可妥协的设计原则，让舰队既快又稳。"
    ),
    h(
      "div",
      { class: "landing-about-grid" },
      ...items.map((it, i) =>
        h(
          "div",
          {
            class: "landing-about-card landing-reveal",
            "data-reveal-delay": Math.min(i, 5),
          },
          h(
            "h3",
            null,
            h("span", { class: "landing-chip landing-chip--violet" }, it.tag),
            " ",
            it.title
          ),
          h("p", null, it.desc)
        )
      )
    )
  );
}
