import { h } from "../landing-dom.js";
import { renderSectionHead } from "../landing-components.js";
import { AGENTS } from "../landing-agents.js";
import {
  IconBrain,
  IconCube,
  IconDatabase,
  IconLock,
  IconRoute,
  IconStack,
  IconArrow,
  IconMail,
  IconHandshake,
  IconBuilding,
  IconBriefcase,
  IconCode,
  IconCopy,
  IconCheck,
} from "../landing-icons.js";

/** 联系邮箱（全局唯一来源）。
 *  当前为占位符 `$email`，等待正式对外邮箱确定后一行回填即可（footer / 合作卡 / 联系 CTA 全部从此常量取值）。 */
export const CONTACT_EMAIL = "$email";

/** 三类合作叙事（按业务诉求精简过版本）。 */
const PARTNERSHIPS = [
  {
    id: "hotel",
    eyebrow: "Hotel Partner",
    icon: IconBuilding,
    tone: "var(--c-cyan)",
    title: "酒店合作",
    headline: "把舰队部署到酒店总部 / 单店",
    lead:
      "面向酒店集团总部、区域品牌总监、单店收益经理。我们落地一支专属智能体舰队，盯住任意条数的竞品，把价格拆解到每一分钱来路；周会幻灯片直接出结论。",
    points: [
      "面向集团总部 / 区域 / 单店三级权限",
      "专属盯价矩阵 + 周会自动出结论",
      "数据本地存储，不离开酒店私有环境",
    ],
    cta: "聊聊酒店合作",
  },
  {
    id: "enterprise",
    eyebrow: "Enterprise Partner",
    icon: IconBriefcase,
    tone: "var(--c-violet)",
    title: "企业合作",
    headline: "AI 智能体能力对外输出",
    lead:
      "我们把舰队中的“盯价 / 拆解 / 比价 / 异常告警 / 一句话洞察”等能力以智能体岗位的形式对外打包。",
    points: [
      "智能体岗位即可单独采购，按调用量结算",
      "定制行业术语 / 报表口径 / 品牌话术",
    ],
    cta: "聊聊企业合作",
  },
  {
    id: "source",
    eyebrow: "Source Partner",
    icon: IconCode,
    tone: "var(--c-green)",
    title: "源码合作",
    headline: "买断 / 共建 / 私有化授权",
    lead:
      "面向有自研团队、希望把舰队作为自家平台底座的合作方。提供完整源码授权。从此你不是在使用工具，而是在共同打磨一支舰队。",
    points: [
      "完整源码 + 数据模型 + 演进路线",
      "需求优先级共建：你的痛点优先进路线",
      "可基于这套底座做行业垂直产品",
    ],
    cta: "聊聊源码合作",
  },
];

/* ===========================================================================
 *  页面入口
 * =========================================================================== */

export function renderAboutPage({ navigate }) {
  return h(
    "div",
    null,
    renderHero(),
    renderManifesto(),
    h("div", { class: "landing-divider" }),
    renderRoadmap(),
    h("div", { class: "landing-divider" }),
    renderCooperation(),
    renderContact({ navigate })
  );
}

/* ===========================================================================
 *  Hero
 * =========================================================================== */

function renderHero() {
  return h(
    "section",
    { class: "landing-about-hero landing-container" },
    h(
      "span",
      { class: "landing-section__eyebrow landing-anim-fade-in" },
      "About & Cooperation"
    ),
    h(
      "h1",
      {
        style: {
          margin: "var(--space-3) 0",
          fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
        },
      },
      "为什么把工具做成",
      h("br"),
      h("span", { class: "landing-text-grad" }, "一支 AI 智能体舰队")
    ),
    h(
      "p",
      {
        class: "landing-section__lead",
        style: { maxWidth: "720px", marginTop: "var(--space-4)" },
      },
      "酒店收益经理一周扫 12 家酒店、50 多张报表；舰队上线后，3 秒钟给一份决策列表。这是把 AI 当作正式岗位、而不是装饰性插件 —— 设计、契约、可观测性、成本管理都需要重新打造。"
    )
  );
}

/* ===========================================================================
 *  Manifesto
 * =========================================================================== */

function renderManifesto() {
  const items = [
    {
      icon: IconBrain,
      title: "AI 是岗位，不是装饰",
      desc: "凡是涉及理解非结构化数据、自然语言交互、自动决策的能力，默认走智能体岗位；规则只做兜底。",
    },
    {
      icon: IconRoute,
      title: "可观测·可中断·可回放",
      desc: "每一次 AI 决策都落审计；步数 / 时长 / 中断信号 三道闸门防失控；失败可重放复现，关键时刻经得起复盘。",
    },
    {
      icon: IconLock,
      title: "成本可见·缓存优先",
      desc: "幂等问题走智能缓存；每周智能调用消耗按天聚合；AI 决策不烧暗钱，账面看得见每一笔。",
    },
    {
      icon: IconDatabase,
      title: "数据本地存储·四端共舰",
      desc: "数据保留在自家服务器；命令行 / 桌面 / 网页 / 云端 共用同一支舰队，集团总部 / 区域 / 单店都能跑。",
    },
    {
      icon: IconCube,
      title: "结构化结论 > 生成式喷字",
      desc: "凡是要把 AI 输出落到经营决策的，必须给出结构化结论 + 数据引用；不要让 AI 自由发挥再去人肉解读。",
    },
    {
      icon: IconStack,
      title: "数据通道唯一收口",
      desc: "情报的存取走唯一通道，业务和数据完全解耦；换底层不影响业务，关键时刻无需大改大动。",
    },
  ];

  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Manifesto",
      "六条舰队信条",
      "把 AI 当正式岗位，而不是贴在外面的接口 —— 这是 chacha 的核心。"
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
          h("h3", null, it.icon(), it.title),
          h("p", null, it.desc)
        )
      )
    )
  );
}

/* ===========================================================================
 *  Roadmap
 * =========================================================================== */

function renderRoadmap() {
  const phases = [
    {
      phase: "P1 · 已发布",
      tone: "var(--c-green)",
      label: "Foundation",
      points: [
        `${AGENTS.length} 个智能岗位落地（盯市 / 沉淀 / 拆解 / 决策 / 指挥）`,
        "命令行：完整业务命令矩阵 · 一键安装",
        "网页仪表盘：价格立方体 / 数据管道 / 词表运营 / 待抓队列",
        "AI 渐进识别链：规则 → 词表 → 智能匹配 → 大模型四档兜底",
      ],
    },
    {
      phase: "P2 · 已发布",
      tone: "var(--c-cyan)",
      label: "Desktop & Cloud",
      points: [
        "桌面 App：单店 / 单人收益经理直接在桌面跑舰队",
        "云端服务接管定时盯价（替代本地后台）",
        "AI 周看板：成本 + 异常告警 + 比价对账一图四看",
        "AI 经营顾问支持多轮对话 + 工具调用 + 推送经营群",
      ],
    },
    {
      phase: "P3 · 已发布",
      tone: "var(--c-violet)",
      label: "Multi-tenant",
      points: [
        "酒店集团多租户视角（总部 + 区域 + 单店三级权限）",
        "竞品池协作：跨集团对齐 + 比价 + 集体定价决策",
        "开放接入与事件推送（异常告警接经营群 / 钉钉 / 飞书）",
        "向量检索能力升级：从单店本地走向集团共享",
      ],
    },
  ];

  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Roadmap",
      "三阶段产品路线 · 全部已发布",
      "P1 打底盘 / P2 桌面与云 / P3 多租户开放平台 —— 三阶段全部上线，欢迎按需选用。"
    ),
    h(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--space-5)",
        },
      },
      ...phases.map((p, i) =>
        h(
          "div",
          {
            class: "landing-card landing-reveal",
            "data-reveal-delay": Math.min(i, 5),
            style: { borderLeft: `3px solid ${p.tone}` },
          },
          h(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "var(--space-3)",
              },
            },
            h(
              "span",
              {
                class: "landing-chip",
                style: {
                  borderColor: `${p.tone}55`,
                  background: `${p.tone}15`,
                  color: p.tone,
                },
              },
              p.phase
            ),
            h(
              "span",
              {
                style: {
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.74rem",
                  color: "var(--c-text-dim)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                },
              },
              p.label
            )
          ),
          h(
            "ul",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "0.92rem",
                color: "var(--c-text-muted)",
              },
            },
            ...p.points.map((pt) =>
              h(
                "li",
                {
                  style: {
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                  },
                },
                h(
                  "span",
                  { style: { color: p.tone, marginTop: "5px", fontSize: "0.8em" } },
                  "▶"
                ),
                pt
              )
            )
          )
        )
      )
    )
  );
}

/* ===========================================================================
 *  Cooperation —— 三类合作（合并自原 /cooperation 页）
 * =========================================================================== */

function renderCooperation() {
  return h(
    "section",
    {
      class: "landing-section landing-container",
      id: "cooperation",
      style: { scrollMarginTop: "96px" },
    },
    renderSectionHead(
      "Cooperation",
      "三类合作 · 一封邮件起步",
      "酒店、企业、自研团队 —— 三类合作匹配三种诉求。三个工作日内回复。"
    ),
    h(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "var(--space-5)",
        },
      },
      ...PARTNERSHIPS.map((p, i) => renderPartnershipCard(p, i))
    )
  );
}

function renderPartnershipCard(p, idx) {
  return h(
    "article",
    {
      id: `coop-${p.id}`,
      class: "landing-card landing-coop-card landing-reveal",
      "data-reveal-delay": Math.min(idx, 5),
      "data-coop-anchor": p.id,
      style: {
        borderTop: `3px solid ${p.tone}`,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        scrollMarginTop: "96px",
      },
    },
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--space-3)",
          marginBottom: "4px",
        },
      },
      h(
        "span",
        {
          class: "landing-coop-card__icon",
          style: {
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            display: "grid",
            placeItems: "center",
            background: `${p.tone}14`,
            color: p.tone,
            flexShrink: 0,
          },
        },
        p.icon()
      ),
      h(
        "div",
        null,
        h(
          "span",
          {
            class: "landing-section__eyebrow",
            style: {
              fontSize: "0.7rem",
              color: "var(--c-text-dim)",
              letterSpacing: "0.14em",
            },
          },
          p.eyebrow
        ),
        h(
          "h3",
          { style: { margin: "4px 0 0", fontSize: "1.18rem" } },
          p.title
        )
      )
    ),
    h(
      "h4",
      {
        style: {
          margin: 0,
          fontSize: "1rem",
          fontWeight: "600",
          color: "var(--c-text)",
          lineHeight: "1.4",
        },
      },
      p.headline
    ),
    h(
      "p",
      {
        style: {
          color: "var(--c-text-muted)",
          fontSize: "0.92rem",
          lineHeight: "1.65",
          margin: 0,
        },
      },
      p.lead
    ),
    h(
      "ul",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "0.88rem",
          color: "var(--c-text-muted)",
          margin: 0,
          padding: 0,
          listStyle: "none",
        },
      },
      ...p.points.map((pt) =>
        h(
          "li",
          {
            style: {
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            },
          },
          h(
            "span",
            { style: { color: p.tone, marginTop: "5px", fontSize: "0.7em" } },
            "▶"
          ),
          pt
        )
      )
    ),
    h(
      "a",
      {
        href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          `【chacha 合作意向 · ${p.title}】`
        )}`,
        class: "landing-coop-card__cta",
        style: {
          marginTop: "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          height: "40px",
          padding: "0 18px",
          borderRadius: "var(--r-pill)",
          background: `${p.tone}10`,
          color: p.tone,
          border: `1px solid ${p.tone}40`,
          fontSize: "0.9rem",
          fontWeight: 600,
          fontFamily: "var(--font-display)",
          whiteSpace: "nowrap",
          transition:
            "background var(--dur-fast), border-color var(--dur-fast), transform var(--dur-fast)",
        },
      },
      IconMail(),
      p.cta,
      IconArrow()
    )
  );
}

/* ===========================================================================
 *  Contact CTA —— 邮件起步 + 一键复制
 * =========================================================================== */

function renderContact({ navigate }) {
  return h(
    "section",
    { class: "landing-section landing-container" },
    h(
      "div",
      { class: "landing-cta landing-reveal" },
      h(
        "div",
        { class: "landing-cta__inner" },
        h(
          "span",
          {
            class: "landing-section__eyebrow",
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              letterSpacing: "0.08em",
            },
          },
          IconHandshake(),
          "联系我们 · 三个工作日内回复"
        ),
        h(
          "h2",
          null,
          "想聊聊？",
          h("span", { class: "landing-text-grad--cool" }, " 一封自我介绍邮件 "),
          "就好"
        ),
        h(
          "p",
          null,
          "请简单写明：你是谁、想合作哪类（酒店 / 企业 / 源码）、希望解决的问题。"
        ),
        renderEmailRow({ navigate })
      )
    )
  );
}

function renderEmailRow({ navigate }) {
  let copied = false;
  const copyBtn = h(
    "button",
    {
      type: "button",
      class: "landing-btn landing-btn--ghost landing-btn--lg",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(CONTACT_EMAIL);
          copied = true;
          updateCopyBtn();
          setTimeout(() => {
            copied = false;
            updateCopyBtn();
          }, 1800);
        } catch (e) {
          window.prompt("复制邮箱：", CONTACT_EMAIL);
        }
      },
    },
    IconCopy(),
    "复制邮箱"
  );

  function updateCopyBtn() {
    while (copyBtn.firstChild) copyBtn.removeChild(copyBtn.firstChild);
    if (copied) {
      copyBtn.appendChild(IconCheck());
      copyBtn.appendChild(document.createTextNode("已复制"));
      copyBtn.style.color = "var(--c-green)";
      copyBtn.style.borderColor = "var(--c-green)";
    } else {
      copyBtn.appendChild(IconCopy());
      copyBtn.appendChild(document.createTextNode("复制邮箱"));
      copyBtn.style.color = "";
      copyBtn.style.borderColor = "";
    }
  }

  return h(
    "div",
    {
      class: "landing-cta__buttons",
      style: {
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        rowGap: "var(--space-3)",
      },
    },
    h(
      "a",
      {
        href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
          "【chacha 合作意向】"
        )}`,
        class: "landing-btn landing-btn--primary landing-btn--lg",
      },
      IconMail(),
      CONTACT_EMAIL,
      IconArrow()
    ),
    copyBtn,
    h(
      "a",
      {
        href: "#/install",
        class: "landing-btn landing-btn--ghost landing-btn--lg",
        onClick: (e) => {
          e.preventDefault();
          navigate("/install");
        },
      },
      "立即上船"
    )
  );
}
