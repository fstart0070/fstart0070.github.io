import { h } from "../landing-dom.js";
import {
  renderSectionHead,
  renderStat,
  renderAgentCard,
  renderTerminal,
  renderOrbit,
} from "../landing-components.js";
import {
  pickFeaturedAgents,
  AGENTS,
  BUSINESS_CAPABILITIES,
  PAIN_POINTS,
} from "../landing-agents.js";
import {
  IconArrow,
  IconBolt,
  IconLock,
  IconBrain,
  IconCube,
  IconRoute,
  IconDatabase,
  IconSparkles,
  IconStethoscope,
  IconStack,
  icon_by_name,
} from "../landing-icons.js";

export function renderHomePage({ navigate }) {
  return h(
    "div",
    null,
    renderHeroSection({ navigate }),
    renderCapabilitiesSection({ navigate }),
    renderPainPointsSection(),
    renderFlowSection(),
    renderAgentPreviewSection({ navigate }),
    renderHighlightStrip(),
    renderQuickstartTeaser(),
    renderFinalCta({ navigate })
  );
}

/* ===========================================================================
 *  Hero —— 业务命题驱动
 * =========================================================================== */

function renderHeroSection({ navigate }) {
  const featured = pickFeaturedAgents();

  return h(
    "section",
    { class: "landing-hero landing-container" },
    h(
      "span",
      { class: "landing-hero__pill landing-anim-fade-in" },
      h("span", { class: "landing-status-pill__dot" }),
      "AI 持续盯价 · ",
      h("b", null, `${AGENTS.length} 个智能岗位`),
      " · 端云一体"
    ),
    h(
      "h1",
      { class: "landing-hero__title landing-anim-fade-up" },
      "让 AI 替你 ",
      h("em", null, "盯价"),
      " · ",
      h("em", null, "拆价"),
      " · ",
      h("em", null, "定价"),
      h("br"),
      h(
        "span",
        {
          style: {
            fontSize: "0.66em",
            fontWeight: "600",
            color: "var(--c-text-muted)",
            letterSpacing: "-0.01em",
          },
        },
        "酒店收益经理的 AI 智能体舰队"
      )
    ),
    h(
      "p",
      { class: "landing-hero__lead landing-anim-fade-up" },
      "把公开渠道房价情报结构化采集，立方化拆解到每一分钱的来路：",
      h("br", { class: "landing-only-desktop" }),
      h("span", { class: "landing-text-grad--cool" }, "早餐溢价 · 礼遇溢价 · 取消政策 · 支付价差 · 房型阶梯"),
      "。 异常变价立刻告警、同质房型自动比价、一句话出经营结论——给收益经理量化弹药。"
    ),
    h(
      "div",
      { class: "landing-hero__cta landing-anim-fade-up" },
      h(
        "a",
        {
          href: "#/install",
          class: "landing-btn landing-btn--primary landing-btn--lg",
          onClick: (e) => {
            e.preventDefault();
            navigate("/install");
          },
        },
        IconBolt(),
        "5 分钟启动舰队"
      ),
      h(
        "a",
        {
          href: "#/demo",
          class: "landing-btn landing-btn--ghost landing-btn--lg",
          onClick: (e) => {
            e.preventDefault();
            navigate("/demo");
          },
        },
        "看产品界面",
        IconArrow()
      ),
      h(
        "a",
        {
          href: "#/agents",
          class: "landing-btn landing-btn--ghost landing-btn--lg",
          onClick: (e) => {
            e.preventDefault();
            navigate("/agents");
          },
        },
        "17 个智能岗位"
      )
    ),
    renderOrbit(featured),
    h(
      "div",
      { class: "landing-hero__stats landing-reveal", "data-reveal-delay": "1" },
      renderStat("持续", "盯价不漏帧"),
      renderStat("5 维", "套餐可比签名"),
      renderStat("3 秒", "出决策列表"),
      renderStat(`${AGENTS.length}`, "智能岗位")
    )
  );
}

/* ===========================================================================
 *  三大业务能力 —— 价格拆解 / 智能比价 / 辅助定价
 * =========================================================================== */

function renderCapabilitiesSection({ navigate }) {
  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Core Capabilities",
      "三件事，AI 替你搞定",
      "盯价、拆价、定价 —— 把酒店收益经理一周的报表，压缩到 3 秒。"
    ),
    h(
      "div",
      { class: "landing-caps-grid" },
      ...BUSINESS_CAPABILITIES.map((cap, i) => renderCapabilityCard(cap, i, { navigate }))
    )
  );
}

function renderCapabilityCard(cap, idx, { navigate }) {
  const number = String(idx + 1).padStart(2, "0");
  const linkedAgents = (cap.agents || [])
    .map((aid) => AGENTS.find((a) => a.id === aid))
    .filter(Boolean);

  return h(
    "article",
    {
      class: "landing-cap-card landing-reveal",
      "data-reveal-delay": Math.min(idx, 5),
      style: { "--cap-tone": cap.tone },
    },
    h(
      "header",
      { class: "landing-cap-card__head" },
      h("span", { class: "landing-cap-card__num" }, number),
      h(
        "div",
        { class: "landing-cap-card__title-wrap" },
        h("span", { class: "landing-cap-card__eyebrow" }, cap.eyebrow),
        h("h3", { class: "landing-cap-card__title" }, cap.title)
      )
    ),
    h("p", { class: "landing-cap-card__headline" }, cap.headline),
    h("p", { class: "landing-cap-card__lead" }, cap.lead),
    h(
      "ul",
      { class: "landing-cap-card__bullets" },
      ...cap.bullets.map((b) =>
        h(
          "li",
          null,
          h("span", { class: "landing-cap-card__bullet-dot" }),
          h("span", null, b)
        )
      )
    ),
    h(
      "div",
      { class: "landing-cap-card__agents" },
      h("span", { class: "landing-cap-card__agents-label" }, "POWERED BY"),
      ...linkedAgents.map((a) =>
        h(
          "span",
          {
            class: "landing-chip",
            title: a.name,
            style: {
              borderColor: "rgba(120,200,255,0.28)",
            },
          },
          h("span", { class: "landing-chip__dot" }),
          a.name.split(" ")[0]
        )
      )
    ),
    h(
      "a",
      {
        href: "#/agents",
        class: "landing-cap-card__more",
        onClick: (e) => {
          e.preventDefault();
          navigate("/agents");
        },
      },
      "看背后岗位",
      IconArrow()
    )
  );
}

/* ===========================================================================
 *  业务痛点叙事 —— 4 个真实场景
 * =========================================================================== */

function renderPainPointsSection() {
  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Real Scenarios",
      "这 4 个场景每天都在发生",
      "如果其中任意一个让你点头，舰队就值得一试。"
    ),
    h(
      "div",
      { class: "landing-pain-grid" },
      ...PAIN_POINTS.map((p, i) =>
        h(
          "article",
          {
            class: "landing-pain-card landing-reveal",
            "data-reveal-delay": Math.min(i, 5),
            style: { "--pain-tone": p.tone },
          },
          h(
            "div",
            { class: "landing-pain-card__head" },
            h("span", { class: "landing-pain-card__icon" }, icon_by_name(p.icon)),
            h("span", { class: "landing-pain-card__when" }, p.when)
          ),
          h("h4", { class: "landing-pain-card__title" }, p.title),
          h("p", { class: "landing-pain-card__body" }, p.body)
        )
      )
    )
  );
}

/* ===========================================================================
 *  端到端流水线终端演示（业务话术）
 * =========================================================================== */

function renderFlowSection() {
  const terminal = renderTerminal(
    "舰队作战日志 · 一键端到端",
    [
      `<span class="tok-cmd">▶ 启动舰队</span>  <span class="tok-arg">5 家酒店 · 端到端</span>`,
      ``,
      `<span class="tok-cmt">[盯市] ScoutAgent      → 已采集 5 家酒店 · 312 间房型 · 1487 个套餐</span>`,
      `<span class="tok-cmt">[盯市] SignalAgent     → 拆出含早 / 取消 / 支付 / 价格档位 / 行政礼遇 等字段</span>`,
      `<span class="tok-cmt">[沉淀] ArchiveAgent    → 时间轴落地完成 · 可回溯到任意一晚</span>`,
      `<span class="tok-cmt">[沉淀] LineageAgent    → 房型族谱：新上线 4 个 · 下架 2 个 · 改名 1 个</span>`,
      `<span class="tok-cmt">[拆解] DecodeAgent     → 5 维签名命中 96.4% · 灰区标签转 LexiconAgent 兜底</span>`,
      `<span class="tok-cmt">[拆解] LexiconAgent    → \u201c周年庆礼遇\u201d 候选 4 条 · 待人工审核</span>`,
      `<span class="tok-cmt">[决策] DecomposeAgent  → 价格立方 ×5 · 早餐溢价 +120 · 礼遇 +200 · 取消 +80</span>`,
      `<span class="tok-cmt">[决策] AnomalyAgent    → 21 个套餐 · 异常命中 3 条 · ⚠ 立即推送经营群</span>`,
      `<span class="tok-cmt">[决策] BattleAgent     → 我方 vs 竞品：Beat 8 · Meet 3 · Lose 1 · 总部周报已生成</span>`,
      `<span class="tok-cmt">[决策] InsightAgent    → \u201c列「2」稳定 +151 元（10 房型完全一致）\u201d</span>`,
      ``,
      `<span style="color:var(--c-green);font-weight:600">✔ 端到端 38.2 秒 · 17 个岗位全员就位</span><span class="landing-terminal__caret"></span>`,
    ]
  );

  return h(
    "section",
    { class: "landing-section landing-container" },
    h(
      "div",
      { class: "landing-demo" },
      h(
        "div",
        { class: "landing-demo__copy landing-reveal" },
        h(
          "span",
          { class: "landing-section__eyebrow" },
          "End-to-End · 一键启动"
        ),
        h(
          "h3",
          null,
          "一条命令 · ",
          h("span", { class: "landing-text-grad--cool" }, "整支舰队就位")
        ),
        h(
          "p",
          null,
          "盯价 → 解析 → 沉淀 → 拆解 → 比价 → 告警 → 经营洞察 端到端跑通。Web 仪表盘\"立即抓\"按钮、CLI、桌面 App、云端 worker —— 四个入口共用同一支舰队。"
        ),
        h(
          "div",
          { class: "landing-demo__steps" },
          renderFlowStep("01", "盯市层", "ScoutAgent · SignalAgent\u3000──\u3000持续采集公开渠道报价。", true),
          renderFlowStep("02", "沉淀层", "ArchiveAgent · LineageAgent\u3000──\u3000时间轴 + 房型族谱无脏数据。", false),
          renderFlowStep("03", "拆解层", "DecodeAgent · LexiconAgent\u3000──\u3000自然语言→5 维可比签名。", false),
          renderFlowStep("04", "决策层", "DecomposeAgent · AnomalyAgent · BattleAgent · InsightAgent\u3000──\u3000给收益经理量化弹药。", false)
        )
      ),
      terminal
    )
  );
}

function renderFlowStep(num, title, lead, isActive) {
  return h(
    "div",
    {
      class: "landing-demo__step" + (isActive ? " is-active" : ""),
    },
    h("span", { class: "landing-demo__step-num" }, num),
    h(
      "div",
      null,
      h("b", null, title),
      h("span", null, lead)
    )
  );
}

/* ===========================================================================
 *  代表性智能体预览（首页只展示精选 6 个）
 * =========================================================================== */

function renderAgentPreviewSection({ navigate }) {
  const featured = pickFeaturedAgents();
  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Agent Roster",
      "代表性智能岗位",
      "盯价 / 拆价 / 比价 / 定价 / 对话 5 类核心岗位先看一眼，下一站是完整名册。"
    ),
    h(
      "div",
      { class: "landing-agents-grid" },
      ...featured.map((a) => renderAgentCard(a))
    ),
    h(
      "div",
      {
        style: {
          textAlign: "center",
          marginTop: "var(--space-7)",
        },
      },
      h(
        "a",
        {
          href: "#/agents",
          class: "landing-btn landing-btn--ghost",
          onClick: (e) => {
            e.preventDefault();
            navigate("/agents");
          },
        },
        `看完整 ${AGENTS.length} 个岗位`,
        IconArrow()
      )
    )
  );
}

/* ===========================================================================
 *  Highlight Strip —— 6 个一句话亮点（业务化）
 * =========================================================================== */

function renderHighlightStrip() {
  const items = [
    {
      icon: IconBrain,
      title: "AI 是岗位，不是装饰",
      desc: "凡是理解非结构化数据、自然语言交互、自动决策的能力，都交给智能体岗位，让规则只做兜底。",
    },
    {
      icon: IconCube,
      title: "把价格立方化",
      desc: "把一晚房价拆成 6 个预设视图：早餐 / 礼遇 / 取消 / 支付 / 房型阶梯 / 缺口三态，每一分钱都说得清。",
    },
    {
      icon: IconRoute,
      title: "可观测·可中断·可回放",
      desc: "每一次 AI 决策都落审计；步数 / 时长 / 中断信号 三道闸门防失控；关键时刻经得起复盘。",
    },
    {
      icon: IconLock,
      title: "成本看得见",
      desc: "按每一次智能调用计费，周看板按天聚合呈现；AI 决策不烧暗钱，账面看得见每一笔。",
    },
    {
      icon: IconDatabase,
      title: "数据本地存储",
      desc: "默认开箱即用 · 数据保留在自家服务器；集团总部 / 区域 / 单店都能跑。",
    },
    {
      icon: IconStack,
      title: "四端共舰",
      desc: "命令行 / 桌面 App / 网页仪表盘 / 云端服务 —— 四个入口共用同一支舰队。",
    },
  ];

  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Why so different",
      "舰队信条 6 条",
      "舰队既快又稳，靠这 6 条不可妥协的承诺。"
    ),
    h(
      "div",
      { class: "landing-feature-strip landing-reveal" },
      ...items.map((it, i) =>
        h(
          "div",
          {
            class: "landing-feature-strip__item landing-reveal",
            "data-reveal-delay": Math.min(i, 5),
          },
          h("h4", null, it.icon(), it.title),
          h("p", null, it.desc)
        )
      )
    )
  );
}

/* ===========================================================================
 *  Quickstart Teaser
 * =========================================================================== */

function renderQuickstartTeaser() {
  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Get started",
      "三步上船 · 5 分钟启航",
      "从 0 到第一份决策报告，只需三步。"
    ),
    h(
      "div",
      { class: "landing-steps" },
      h(
        "div",
        { class: "landing-steps__item landing-reveal" },
        h("h4", null, "下载舰队"),
        h(
          "p",
          null,
          "一键安装包，自动落到自家服务器；可多版本切换、可一键回滚、可彻底卸载。"
        )
      ),
      h(
        "div",
        { class: "landing-steps__item landing-reveal", "data-reveal-delay": "1" },
        h("h4", null, "环境体检"),
        h(
          "p",
          null,
          "DoctorAgent 自动检查环境就绪情况，失败直接给你“如何修”指引；不需要懂技术。"
        )
      ),
      h(
        "div",
        { class: "landing-steps__item landing-reveal", "data-reveal-delay": "2" },
        h("h4", null, "唤醒舰队"),
        h(
          "p",
          null,
          "PilotAgent 接管：盯 5 家酒店、拆解到每一分钱、把异常推到经营群——这就是你的第一份决策报告。"
        )
      )
    )
  );
}

/* ===========================================================================
 *  Final CTA
 * =========================================================================== */

function renderFinalCta({ navigate }) {
  return h(
    "section",
    { class: "landing-section landing-container" },
    h(
      "div",
      { class: "landing-cta landing-reveal" },
      h(
        "div",
        { class: "landing-cta__inner" },
        h("span", { class: "landing-section__eyebrow" }, "now boarding"),
        h(
          "h2",
          null,
          "让舰队",
          h("span", { class: "landing-text-grad--cool" }, " 替你 "),
          "盯价 · 拆价 · 比价 · 定价"
        ),
        h(
          "p",
          null,
          `${AGENTS.length} 个岗位已就位。一次启动，余下的交给舰队。`
        ),
        h(
          "div",
          { class: "landing-cta__buttons" },
          h(
            "a",
            {
              href: "#/install",
              class: "landing-btn landing-btn--primary landing-btn--lg",
              onClick: (e) => {
                e.preventDefault();
                navigate("/install");
              },
            },
            "立即上船",
            IconArrow()
          ),
          h(
            "a",
            {
              href: "#/about",
              class: "landing-btn landing-btn--ghost landing-btn--lg",
              onClick: (e) => {
                e.preventDefault();
                navigate("/about");
              },
            },
            "谈合作"
          )
        )
      )
    )
  );
}
