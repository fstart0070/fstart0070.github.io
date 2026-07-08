import { h } from "../landing-dom.js";
import { renderSectionHead, renderTerminal } from "../landing-components.js";
import { IconArrow, IconStethoscope, IconBolt } from "../landing-icons.js";

export function renderInstallPage({ navigate }) {
  return h(
    "div",
    null,
    renderHero(),
    renderSteps(),
    h("div", { class: "landing-divider" }),
    renderQuickActions(),
    renderTroubleshoot(),
    renderContactCta({ navigate })
  );
}

/* ===========================================================================
 *  Hero
 * =========================================================================== */

function renderHero() {
  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Get started",
      "三步上船 · 5 分钟启航",
      "从 0 到收到舰队第一份决策报告，只需三步——不需要懂任何技术。"
    )
  );
}

/* ===========================================================================
 *  三步上船指南
 * =========================================================================== */

function renderSteps() {
  const steps = [
    {
      no: "01",
      title: "下载舰队",
      tone: "var(--c-cyan)",
      desc:
        "在自家服务器或个人电脑上一键安装；舰队会落到独立目录，不污染原有环境，可一键回滚、彻底卸载。",
      bullets: [
        "支持 Mac / Linux / Windows 主流系统",
        "数据保留在自家服务器，不上传任何外部",
        "可多版本切换、可一键回滚",
        "彻底卸载只需删一个目录",
      ],
    },
    {
      no: "02",
      title: "环境体检",
      tone: "var(--c-violet)",
      desc:
        "DoctorAgent 自动跑一轮全场景体检：网络、数据本地存储、浏览器、配置、磁盘 …… 哪一项不就绪都给你“如何修”指引。",
      bullets: [
        "全套体检覆盖全部启动前置",
        "失败给具体修复指引，不丢“自己上网搜”",
        "全部就绪后给你一句“舰队已就位”",
        "随时再跑一遍验证状态",
      ],
    },
    {
      no: "03",
      title: "唤醒舰队",
      tone: "var(--c-green)",
      desc:
        "PilotAgent 接管：盯 5 家酒店 · 拆解到每一分钱 · 比价对账 · 异常推到经营群——这就是你的第一份决策报告。",
      bullets: [
        "网页仪表盘一键启动 / 立即盯",
        "桌面 App 双击图标即可常驻",
        "命令行一行命令端到端",
        "云端服务可设定时盯价 + 自动汇总",
      ],
    },
  ];

  return h(
    "section",
    { class: "landing-section landing-container" },
    h(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "var(--space-5)",
        },
      },
      ...steps.map((s, i) =>
        h(
          "div",
          {
            class: "landing-card landing-reveal",
            "data-reveal-delay": Math.min(i, 5),
            style: { borderTop: `3px solid ${s.tone}` },
          },
          h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: "var(--space-3)",
                marginBottom: "var(--space-3)",
              },
            },
            h(
              "span",
              {
                style: {
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  color: s.tone,
                },
              },
              s.no
            ),
            h(
              "h3",
              { style: { margin: 0, fontSize: "1.18rem" } },
              s.title
            )
          ),
          h(
            "p",
            {
              style: {
                color: "var(--c-text-muted)",
                fontSize: "0.94rem",
                marginBottom: "var(--space-4)",
              },
            },
            s.desc
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
              },
            },
            ...s.bullets.map((b) =>
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
                  {
                    style: {
                      color: s.tone,
                      marginTop: "5px",
                      fontSize: "0.7em",
                    },
                  },
                  "▶"
                ),
                b
              )
            )
          )
        )
      )
    )
  );
}

/* ===========================================================================
 *  常用业务动作（不写命令行，只写"我想做什么"）
 * =========================================================================== */

function renderQuickActions() {
  const groups = [
    {
      title: "唤醒舰队",
      icon: IconBolt,
      tone: "var(--c-cyan)",
      items: [
        "一键端到端：盯价 + 拆解 + 比价 + 告警 + 洞察",
        "DecomposeAgent 直接出“今晚一晚 1288 元贵在哪”的拆解视图",
        "ChatAgent 自然语言提问：“今晚我哪几家酒店该降价？”",
      ],
    },
    {
      title: "看仪表盘",
      icon: IconArrow,
      tone: "var(--c-violet)",
      items: [
        "网页仪表盘：价格立方体 / 数据通道 / 词表 / 待办队列",
        "桌面 App：双击图标常驻，悬浮窗一眼看异常",
        "周报告自动出：“Beat 8 个、Meet 3 个、Lose 1 个”",
      ],
    },
    {
      title: "自助运维",
      icon: IconStethoscope,
      tone: "var(--c-green)",
      items: [
        "DoctorAgent 一键体检：环境就绪、磁盘、网络全覆盖",
        "切换数据存储位置，一句话指令即可",
        "升级到最新版（保留旧版本可一键回滚）",
      ],
    },
  ];

  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Quick actions",
      "上船后常做的事",
      "舰队的常用业务动作清单——盯价、看仪表盘、自助运维三大类。"
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
      ...groups.map((g, i) =>
        h(
          "div",
          {
            class: "landing-card landing-reveal",
            "data-reveal-delay": Math.min(i, 5),
            style: { borderLeft: `3px solid ${g.tone}` },
          },
          h(
            "h3",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "var(--space-4)",
                fontSize: "1.05rem",
              },
            },
            g.icon(),
            g.title
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
            ...g.items.map((it) =>
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
                  {
                    style: {
                      color: g.tone,
                      marginTop: "5px",
                      fontSize: "0.7em",
                    },
                  },
                  "▶"
                ),
                it
              )
            )
          )
        )
      )
    )
  );
}

/* ===========================================================================
 *  出问题怎么办（终端示意 · 业务化）
 * =========================================================================== */

function renderTroubleshoot() {
  const term = renderTerminal(
    "DoctorAgent · 体检报告示例",
    [
      `<span class="tok-cmd">▶ 启动体检</span>  <span class="tok-arg">全套前置检查</span>`,
      ``,
      `<span style="color:var(--c-green)">✔</span> 操作系统      Mac / Linux / Windows 都已支持`,
      `<span style="color:var(--c-green)">✔</span> 数据本地存储  自家服务器目录 · 已就绪 · 完整数据通道`,
      `<span style="color:var(--c-green)">✔</span> 配置          已完成基础配置 · 数据落到自家目录`,
      `<span style="color:var(--c-green)">✔</span> 模型密钥      已脱敏存储 · 仅本机可读`,
      `<span style="color:var(--c-green)">✔</span> 浏览器引擎    已就绪 · 自动化采集就绪`,
      `<span style="color:var(--c-amber)">⚠</span> 网页仪表盘    端口被占用 — 一句话切端口即可`,
      `<span style="color:var(--c-green)">✔</span> 磁盘空间      12.4 GB 可用 — 充足`,
      `<span style="color:var(--c-green)">✔</span> 外网联通      数据源可达 + AI 服务可达`,
      ``,
      `<span style="color:var(--c-cyan)">汇总</span>：7 项就绪 · 1 项轻微提示 · 0 项错误<span class="landing-terminal__caret"></span>`,
    ]
  );

  return h(
    "section",
    { class: "landing-section landing-container" },
    renderSectionHead(
      "Troubleshoot",
      "出问题怎么办",
      "DoctorAgent 一行命令给你诊断 + 修复指引；不需要懂任何技术。"
    ),
    h(
      "div",
      { class: "landing-reveal", style: { maxWidth: "920px", margin: "0 auto" } },
      term
    )
  );
}

/* ===========================================================================
 *  Final CTA
 * =========================================================================== */

function renderContactCta({ navigate }) {
  return h(
    "section",
    { class: "landing-section landing-container" },
    h(
      "div",
      { class: "landing-cta landing-reveal" },
      h(
        "div",
        { class: "landing-cta__inner" },
        h("span", { class: "landing-section__eyebrow" }, "Need help?"),
        h(
          "h2",
          null,
          "上船后",
          h("span", { class: "landing-text-grad--cool" }, " 任何问题 "),
          "直接问 AI 经营顾问"
        ),
        h(
          "p",
          null,
          "不需要懂技术、不需要查文档。一句自然语言提问，ChatAgent 会给结论 + 数据引用 + 调用成本。"
        ),
        h(
          "div",
          { class: "landing-cta__buttons" },
          h(
            "a",
            {
              href: "#/agents",
              class: "landing-btn landing-btn--primary landing-btn--lg",
              onClick: (e) => {
                e.preventDefault();
                navigate("/agents");
              },
            },
            "看 17 个岗位",
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
            "了解舰队"
          )
        )
      )
    )
  );
}
