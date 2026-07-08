import { h, bindSpotlight } from "./landing-dom.js";
import { AGENTS } from "./landing-agents.js";
import {
  IconArrow,
  IconGitHub,
  IconExternal,
  IconMenu,
  IconClose,
  IconCopy,
  icon_by_name,
  IconBolt,
  IconCheck,
} from "./landing-icons.js";

/* ===========================================================================
 *  导航 / Header / Drawer
 * =========================================================================== */

export const NAV = [
  { path: "/", label: "首页" },
  { path: "/demo", label: "产品 Demo" },
  { path: "/agents", label: "智能岗位" },
  { path: "/architecture", label: "架构" },
  { path: "/install", label: "上船" },
  { path: "/about", label: "关于" },
];

export function renderHeader({ currentPath, onNavigate, onOpenDrawer }) {
  const navLinks = NAV.map((n) =>
    h(
      "a",
      {
        href: "#" + n.path,
        class: currentPath === n.path ? "is-active" : "",
        onClick: (e) => {
          e.preventDefault();
          onNavigate(n.path);
        },
      },
      n.label
    )
  );

  return h(
    "div",
    { class: "landing-header__inner" },
    h(
      "a",
      {
        href: "#/",
        class: "landing-header__brand",
        onClick: (e) => {
          e.preventDefault();
          onNavigate("/");
        },
      },
      h(
        "span",
        { class: "landing-header__brand-mark" },
        h(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            style: { color: "var(--c-cyan)" },
          },
          h("circle", { cx: "12", cy: "12", r: "5" }),
          h("path", { d: "M12 3v4M12 17v4M3 12h4M17 12h4" })
        )
      ),
      h(
        "span",
        { class: "landing-header__brand-name" },
        h("b", null, "chacha"),
        h("span", null, "AI 智能体舰队")
      )
    ),
    h("nav", { class: "landing-header__nav" }, ...navLinks),
    h(
      "a",
      {
        href: "#/install",
        class: "landing-header__cta",
        onClick: (e) => {
          e.preventDefault();
          onNavigate("/install");
        },
      },
      "立即上船",
      IconArrow()
    ),
    h(
      "button",
      {
        class: "landing-header__toggle",
        "aria-label": "打开菜单",
        onClick: () => onOpenDrawer(),
      },
      IconMenu()
    )
  );
}

export function renderDrawer({ currentPath, onNavigate, onClose }) {
  const drawer = h(
    "div",
    { class: "landing-drawer", id: "landing-drawer" },
    h("div", {
      class: "landing-drawer__backdrop",
      onClick: () => onClose(),
    }),
    h(
      "aside",
      { class: "landing-drawer__panel" },
      h(
        "div",
        { class: "landing-drawer__header" },
        h(
          "span",
          { class: "landing-header__brand" },
          h(
            "span",
            { class: "landing-header__brand-name" },
            h("b", null, "chacha"),
            h("span", null, "AI 智能体舰队")
          )
        ),
        h(
          "button",
          {
            class: "landing-drawer__close",
            "aria-label": "关闭",
            onClick: () => onClose(),
          },
          IconClose()
        )
      ),
      h(
        "nav",
        { class: "landing-drawer__nav" },
        ...NAV.map((n) =>
          h(
            "a",
            {
              href: "#" + n.path,
              class: currentPath === n.path ? "is-active" : "",
              onClick: (e) => {
                e.preventDefault();
                onNavigate(n.path);
              },
            },
            n.label
          )
        )
      ),
      h(
        "div",
        { class: "landing-drawer__footer" },
        h(
          "a",
          {
            href: "#/install",
            class: "landing-btn landing-btn--primary",
            onClick: (e) => {
              e.preventDefault();
              onNavigate("/install");
            },
          },
          "立即上船",
          IconArrow()
        ),
        h(
          "a",
          {
            class: "landing-btn landing-btn--ghost landing-btn--sm",
            href: "#/about",
            onClick: (e) => {
              e.preventDefault();
              onNavigate("/about");
            },
          },
          "了解舰队"
        )
      )
    )
  );
  return drawer;
}

/* ===========================================================================
 *  Footer
 * =========================================================================== */

export function renderFooter() {
  const year = new Date().getFullYear();
  return h(
    "div",
    null,
    h(
      "div",
      { class: "landing-footer__inner" },
      h(
        "div",
        { class: "landing-footer__intro" },
        h(
          "div",
          { class: "landing-header__brand" },
          h(
            "span",
            { class: "landing-header__brand-mark" },
            h(
              "svg",
              {
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2",
                style: { color: "var(--c-cyan)" },
              },
              h("circle", { cx: "12", cy: "12", r: "5" }),
              h("path", { d: "M12 3v4M12 17v4M3 12h4M17 12h4" })
            )
          ),
          h(
            "span",
            { class: "landing-header__brand-name" },
            h("b", null, "chacha"),
            h("span", null, "AI 智能体舰队")
          )
        ),
        h(
          "p",
          null,
          "酒店收益经理的 AI 智能体舰队。盯价 · 拆价 · 比价 · 定价 —— 把一周的报表压缩到 3 秒。"
        ),
        h(
          "div",
          { class: "landing-status-pill", style: { alignSelf: "flex-start" } },
          h("span", { class: "landing-status-pill__dot" }),
          `${AGENTS.length} 个岗位 · 全员在线`
        )
      ),
      h(
        "div",
        { class: "landing-footer__col" },
        h("h4", null, "业务能力"),
        h(
          "ul",
          null,
          h("li", null, h("a", { href: "#/agents" }, "智能岗位名册")),
          h("li", null, h("a", { href: "#/architecture" }, "5 层协作架构")),
          h("li", null, h("a", { href: "#/install" }, "5 分钟启动"))
        )
      ),
      h(
        "div",
        { class: "landing-footer__col" },
        h("h4", null, "资源"),
        h(
          "ul",
          null,
          h("li", null, h("a", { href: "#/about" }, "舰队信条")),
          h("li", null, h("a", { href: "#/about" }, "产品路线")),
          h(
            "li",
            null,
            h(
              "a",
              {
                href: "#/about",
              },
              "反馈渠道筹备中"
            )
          )
        )
      ),
      h(
        "div",
        { class: "landing-footer__col" },
        h("h4", null, "四端共舰"),
        h(
          "ul",
          null,
          h("li", null, h("a", { href: "#/install" }, "命令行")),
          h("li", null, h("a", { href: "#/install" }, "桌面 App")),
          h("li", null, h("a", { href: "#/install" }, "网页仪表盘")),
          h("li", null, h("a", { href: "#/about" }, "云端服务"))
        )
      )
    ),
    h(
      "div",
      { class: "landing-footer__bar" },
      h("span", null, `© ${year} chacha · MIT License`),
      h(
        "span",
        { class: "landing-footer__status" },
        "v0.2.0 · 数据本地存储 · AI Native"
      )
    )
  );
}

/* ===========================================================================
 *  Agent Card
 * =========================================================================== */

export function renderAgentCard(agent) {
  const card = h(
    "article",
    {
      class: "landing-agent-card landing-reveal",
      style: { "--agent-tone": agent.tone },
    },
    h(
      "div",
      { class: "landing-agent-card__head" },
      h(
        "span",
        { class: "landing-agent-card__icon" },
        icon_by_name(agent.icon)
      ),
      h(
        "div",
        { class: "landing-agent-card__meta" },
        h("span", { class: "landing-agent-card__name" }, agent.name),
        h("span", { class: "landing-agent-card__codename" }, agent.codename)
      )
    ),
    h("p", { class: "landing-agent-card__desc" }, agent.desc),
    h(
      "div",
      { class: "landing-agent-card__tags" },
      ...agent.tags.map((t) => h("span", { class: "landing-chip" }, t))
    ),
    h(
      "dl",
      { class: "landing-agent-card__io" },
      h("dt", null, "input"),
      h("dt", null, "output"),
      h("dd", null, agent.inputs),
      h("dd", null, agent.outputs)
    )
  );
  bindSpotlight(card);
  return card;
}

/* ===========================================================================
 *  Layer Bar
 * =========================================================================== */

export function renderLayerBar(layer, idx) {
  return h(
    "div",
    {
      class: "landing-layer-bar landing-reveal",
      style: { "--layer-tone": layer.tone },
    },
    h("span", { class: "landing-layer-bar__index" }, layer.code),
    h("span", { class: "landing-layer-bar__name" }, layer.name),
    h("p", { class: "landing-layer-bar__lead" }, layer.desc)
  );
}

/* ===========================================================================
 *  通用块
 * =========================================================================== */

export function renderSectionHead(eyebrow, title, lead) {
  return h(
    "header",
    { class: "landing-section__head landing-reveal" },
    eyebrow && h("span", { class: "landing-section__eyebrow" }, eyebrow),
    h(
      "h2",
      { class: "landing-section__title" },
      h("span", { class: "landing-text-grad--cool" }, title)
    ),
    lead && h("p", { class: "landing-section__lead" }, lead)
  );
}

export function renderStat(value, label) {
  return h(
    "div",
    { class: "landing-stat" },
    h("span", { class: "landing-stat__value" }, value),
    h("span", { class: "landing-stat__label" }, label)
  );
}

export function renderTerminal(title, lines) {
  return h(
    "div",
    { class: "landing-terminal" },
    h(
      "div",
      { class: "landing-terminal__head" },
      h(
        "span",
        { class: "landing-terminal__dots" },
        h("i"),
        h("i"),
        h("i")
      ),
      h("span", { class: "landing-terminal__title" }, title)
    ),
    h(
      "div",
      { class: "landing-terminal__body" },
      ...lines.map((line) =>
        h("div", {
          class: "landing-terminal__line",
          html: line,
        })
      )
    )
  );
}

/**
 * 复制按钮 —— 复制 codeText 到剪贴板。
 */
export function renderCopyableCode(codeHtml, plainText) {
  const codeEl = h("pre", { class: "landing-code", html: codeHtml });
  const btn = h(
    "button",
    {
      class: "landing-btn landing-btn--ghost landing-btn--sm",
      style: { position: "absolute", top: "8px", right: "8px" },
      title: "复制",
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(plainText);
          btn.innerHTML = "";
          btn.appendChild(IconCheck());
          btn.append(" 已复制");
          setTimeout(() => {
            btn.innerHTML = "";
            btn.appendChild(IconCopy());
            btn.append(" 复制");
          }, 1600);
        } catch (e) {
        }
      },
    },
    IconCopy(),
    " 复制"
  );
  return h(
    "div",
    { style: { position: "relative" } },
    codeEl,
    btn
  );
}

/* ===========================================================================
 *  Hero Orbit —— 中心枢纽 + 6 节点轨道
 * =========================================================================== */

export function renderOrbit(featuredAgents) {
  const ring = h("div", { class: "landing-orbit__ring" });
  const innerRing = h("div", {
    class: "landing-orbit__ring landing-orbit__ring--inner",
  });
  const center = h(
    "div",
    { class: "landing-orbit__center" },
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          lineHeight: "1",
        },
      },
      h("span", { style: { fontSize: "0.85em" } }, "AI"),
      h(
        "span",
        {
          style: {
            fontSize: "0.42em",
            fontWeight: "600",
            letterSpacing: "0.08em",
          },
        },
        "FLEET"
      )
    )
  );

  const nodes = featuredAgents.slice(0, 6).map((agent, i) => {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const r = 50;
    const x = 50 + Math.cos(angle) * r;
    const y = 50 + Math.sin(angle) * r;
    return h(
      "span",
      {
        class: "landing-orbit__node",
        style: {
          left: x + "%",
          top: y + "%",
          "--node-tone": agent.tone,
        },
        title: agent.name,
      },
      icon_by_name(agent.icon)
    );
  });

  return h(
    "div",
    { class: "landing-orbit landing-anim-fade-in" },
    ring,
    innerRing,
    center,
    ...nodes
  );
}
