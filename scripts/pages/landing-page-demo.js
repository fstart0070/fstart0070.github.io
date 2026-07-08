import { h } from "../landing-dom.js";
import { renderSectionHead } from "../landing-components.js";
import { IconArrow, IconBolt } from "../landing-icons.js";

const DEMO_ITEMS = [
  {
    id: "price-watch",
    group: "日常经营",
    label: "价格盯守",
    tone: "#10b981",
    img: "public/demo/price-watch.png",
    url: "chacha / 盯价",
    title: "房价一动，你第一个知道",
    desc: "同时盯守多家酒店、多个入住日期的所有套餐价格。系统每 30 分钟自动巡检一轮，异常变动即刻告警——比如截图中经典客房的含早套餐从 ¥1299 涨到 ¥1499（+15.4%），红色告警一目了然。所有变价走势实时绘成趋势图，不用再一个个打开 OTA 页面人工比对。",
    bullets: [
      "110 条告警一屏展示，标红异常涨跌、房型减少等关键变化",
      "点击任意告警，立刻展开该套餐的价格趋势图和变价详情",
      "AI 一键分析：跳过常规波动，33% 以上异常才重点标注",
      "支持多家酒店同时盯守，最新一轮结果自动生成房型矩阵",
    ],
  },
  {
    id: "calendar-alert",
    group: "日常经营",
    label: "远期日历",
    tone: "#0ea5e9",
    img: "public/demo/cal-watch.png",
    url: "chacha / 远期 90 天",
    title: "未来 90 天的每一天，都在你眼皮底下",
    desc: "把未来 90 天铺成一张日历，每一格标出当日最低价与偏离基准的幅度。智能体在后台按日扫描远期档期，一旦你的定价显著低于竞品或历史同期（比如某个国庆前的周五被自动标红），低价告警立刻亮起——收益经理不用再逐日翻 OTA 后台，一屏就能锁定所有「该涨没涨」的日期，把提价窗口从「临期抢救」提前到「远期布局」。",
    bullets: [
      "90 天视图一屏铺开，工作日 / 周末 / 节假日一目了然",
      "智能体自动巡检远期低价：偏离基准超阈值即刻标红，无需人工比对",
      "对标口径可切换：竞品同类房 vs 历史同期，双基准防止误判",
      "点击任一日格：当日全房型报价、竞品对比、变价轨迹逐层下钻",
    ],
  },
  {
    id: "dashboard",
    group: "日常经营",
    label: "数据总览",
    tone: "#06b6d4",
    img: "public/demo/dashboard.png",
    url: "chacha / 仪表盘",
    title: "所有酒店、所有套餐，一屏尽收",
    desc: "系统首页。6 张实时统计卡片告诉你当前沉淀了多少数据——覆盖多少家酒店、跑过多少轮盯价、沉淀多少个房型和套餐、价格分布在哪个带位。选一家酒店展开，每个房型的每个套餐都列得清清楚楚：含不含早、能不能取消、什么付款方式、当前价和门市价各是多少。（截图中的数字为演示数据，实际规模由你接入的酒店范围决定。）",
    bullets: [
      "顶部 6 张统计卡，覆盖酒店数、快照轮次、房型数、套餐数、价格区间实时更新",
      "搜索框按酒店名称或 ID 秒级定位，支持多选批量对比",
      "房型套餐全量展开：含早、取消政策、支付方式一行看完",
      "一键导出 Excel，直接用于经营会汇报",
    ],
  },
  {
    id: "cube",
    group: "深度分析",
    label: "深度分析",
    tone: "#8b5cf6",
    img: "public/demo/cube.png",
    url: "chacha / 深度分析",
    title: "10 个分析视角，把价格拆到底",
    desc: "选一家酒店进入「深度分析」，左侧 10 个预设分析视角（早餐溢价、礼遇差价、房型起价阶梯、跨签名矩阵等）随点随看。截图展示的是「单产品时线分析」：一款含早套餐起拍价 ¥2299、最低探到 ¥1999、最新 ¥2099，价格稳定度 0.45%。每日价格走势一目了然，底部还有逐快照明细表。",
    bullets: [
      "10 个预设视图 + 自由模式，覆盖早餐、礼遇、取消、支付、房型阶梯等维度",
      "价格趋势图 + 逐日明细表双视图，从宏观到细节都能看",
      "性价比 Pareto 前沿、异常预警 z-score、MBL 比对等高级分析",
      "可自定义行列维度和锁定条件，灵活拼出你要的分析矩阵",
    ],
  },
  {
    id: "peers",
    group: "深度分析",
    label: "竞品比价",
    tone: "#f59e0b",
    img: "public/demo/peers.png",
    url: "chacha / peer 比价",
    title: "10 公里内谁在抢你的客人，一目了然",
    desc: "三步操作：选锚点酒店 → 圈定周边竞品（按 1/3/5/10 公里自动筛选）→ 运行矩阵。截图中以三亚美高梅为锚点、10 公里范围筛出 24 家候选，勾选 3 家放入对比池，跑出 3 天 × 4 家的含早最低价矩阵——谁贵谁便宜一格格染色，竞争格局一览无余。",
    bullets: [
      "数据源覆盖 443 座城市、15183 家酒店，竞品池足够大",
      "支持实时最新数据或指定日期范围，7 天跨度一次跑出",
      "对比口径可选：含早最低价、不含早最低价、专享价等",
      "矩阵结果自动染色：你比竞品便宜标绿、贵了标红",
    ],
  },
  {
    id: "pricing",
    group: "AI 辅助",
    label: "AI 定价",
    tone: "#ec4899",
    img: "public/demo/pricing.png",
    url: "chacha / 定价建议",
    title: "AI 推荐 ¥1091，保守、均衡、激进三档任选",
    desc: "选酒店、选日期、选房型——AI 综合分析竞品报价、历史趋势和供需情况，给出推荐价格和合理区间。截图中豪华海景双床房推荐均衡价 ¥1091（置信度 60%），保守策略 ¥1121、激进策略 ¥1052，三档收入指数对比清晰。底部还有数据覆盖度诊断和风险提示，让你知道这个建议靠不靠谱。",
    bullets: [
      "保守 / 均衡 / 激进三档一键切换，收入指数实时对比",
      "合理价区间可视化：滑块直观显示推荐价在什么位置",
      "风险提示透明化：竞品覆盖不足、历史数据有限都会标出",
      "诊断面板：数据覆盖度、异常信号、算法耗时全部可见",
    ],
  },
];

let activeId = "price-watch";

export function renderDemoPage({ navigate }) {
  activeId = "price-watch";

  return h(
    "div",
    null,
    renderDemoHero(),
    renderDemoShowcase({ navigate }),
    renderDemoHighlights(),
    renderDemoCta({ navigate })
  );
}

/* =========================================================================== */

function renderDemoHero() {
  return h(
    "section",
    { class: "landing-hero landing-container landing-demo-hero" },
    renderSectionHead(
      "Product Demo",
      "眼见为实",
      "不用安装、不用注册——先看真实界面截图。从盯价到拆价到比价到定价，收益经理日常工作的每一步都在这里。（下方所有截图与文案中的具体数字均为演示数据，实际酒店数、套餐数、告警条数、价格区间等以你接入的范围为准。）"
    )
  );
}

/* =========================================================================== */

function renderDemoShowcase({ navigate }) {
  const container = h("div", {
    class: "landing-section landing-container",
  });

  const layout = h("div", { class: "landing-demo-layout" });

  const tabsEl = h("nav", { class: "landing-demo-tabs" });
  const viewportWrap = h("div", { class: "landing-demo-browser landing-reveal" });

  let currentGroup = "";
  for (const item of DEMO_ITEMS) {
    if (item.group !== currentGroup) {
      currentGroup = item.group;
      tabsEl.appendChild(
        h("div", { class: "landing-demo-tabs__group-label" }, currentGroup)
      );
    }
    const tab = h(
      "button",
      {
        class:
          "landing-demo-tab" + (item.id === activeId ? " is-active" : ""),
        style: { "--demo-tone": item.tone },
        onClick: () => switchTab(item.id, tabsEl, viewportWrap),
      },
      h("span", { class: "landing-demo-tab__dot" }),
      item.label
    );
    tab.dataset.tabId = item.id;
    tabsEl.appendChild(tab);
  }

  fillBrowser(viewportWrap, DEMO_ITEMS[0]);

  layout.appendChild(tabsEl);
  layout.appendChild(viewportWrap);
  container.appendChild(layout);
  return container;
}

function switchTab(id, tabsEl, viewportWrap) {
  activeId = id;
  const item = DEMO_ITEMS.find((d) => d.id === id);
  if (!item) return;

  tabsEl.querySelectorAll(".landing-demo-tab").forEach((t) => {
    t.classList.toggle("is-active", t.dataset.tabId === id);
  });

  viewportWrap.style.opacity = "0";
  viewportWrap.style.transform = "translateY(8px)";
  setTimeout(() => {
    fillBrowser(viewportWrap, item);
    viewportWrap.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    viewportWrap.style.opacity = "1";
    viewportWrap.style.transform = "translateY(0)";
  }, 150);
}

function fillBrowser(wrap, item) {
  while (wrap.firstChild) wrap.removeChild(wrap.firstChild);

  const dots = h(
    "span",
    { class: "landing-terminal__dots" },
    h("i"),
    h("i"),
    h("i")
  );
  const urlBar = h("span", { class: "landing-demo-browser__url" }, item.url);
  const chrome = h(
    "div",
    { class: "landing-demo-browser__chrome" },
    dots,
    urlBar
  );

  const img = h("img", {
    class: "landing-demo-browser__shot",
    src: item.img,
    alt: item.title,
    loading: "lazy",
  });
  const viewport = h("div", {
    class: "landing-demo-browser__viewport",
    onClick: () => openLightbox(item.img, item.title),
  }, img);

  const bullets = h(
    "ul",
    {
      class: "landing-demo-browser__bullets",
    },
    ...item.bullets.map((b) =>
      h(
        "li",
        null,
        h("span", {
          class: "landing-demo-browser__bullet-dot",
          style: { background: item.tone },
        }),
        b
      )
    )
  );

  const caption = h(
    "div",
    { class: "landing-demo-browser__caption" },
    h("h3", { class: "landing-demo-browser__title" }, item.title),
    h("p", { class: "landing-demo-browser__desc" }, item.desc),
    bullets
  );

  wrap.appendChild(chrome);
  wrap.appendChild(viewport);
  wrap.appendChild(caption);
}

function openLightbox(src, alt) {
  const existing = document.getElementById("demo-lightbox");
  if (existing) existing.remove();

  const backdrop = h("div", { class: "landing-demo-lightbox__backdrop" });
  const bigImg = h("img", {
    class: "landing-demo-lightbox__img",
    src,
    alt,
  });
  const hint = h("span", { class: "landing-demo-lightbox__hint" }, "点击任意位置关闭");

  const overlay = h(
    "div",
    {
      class: "landing-demo-lightbox",
      id: "demo-lightbox",
      onClick: () => closeLightbox(overlay),
    },
    backdrop,
    bigImg,
    hint
  );

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  const onEsc = (e) => {
    if (e.key === "Escape") {
      closeLightbox(overlay);
      document.removeEventListener("keydown", onEsc);
    }
  };
  document.addEventListener("keydown", onEsc);
}

function closeLightbox(el) {
  if (!el) return;
  el.style.opacity = "0";
  el.style.transition = "opacity 0.2s ease";
  document.body.style.overflow = "";
  setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 220);
}

/* =========================================================================== */

function renderDemoHighlights() {
  const highlights = [
    {
      title: "不用懂技术",
      body: "所有功能都是可视化操作。搜酒店、选日期、点按钮——收益经理打开浏览器就能上手，不需要写一行代码。",
    },
    {
      title: "数据自己跑",
      body: "系统 7×24 小时自动采集和分析。打开页面看到的就是最新数据，异常告警自动推送，不用你主动去查。",
    },
    {
      title: "看完就能做决策",
      body: "不止是看报表——拆价格结构、定位异常、对标竞品、AI 出定价建议。从「看到问题」到「做出决策」一站完成。",
    },
  ];

  return h(
    "section",
    { class: "landing-section landing-container" },
    h(
      "div",
      {
        class: "landing-demo-highlights landing-reveal",
        style: {
          background: "var(--c-surface-strong)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--r-lg)",
          backdropFilter: "blur(14px)",
        },
      },
      ...highlights.map((hl) =>
        h(
          "div",
          { class: "landing-demo-highlight" },
          h("div", { class: "landing-demo-highlight__title" }, hl.title),
          h("p", { class: "landing-demo-highlight__body" }, hl.body)
        )
      )
    )
  );
}

/* =========================================================================== */

function renderDemoCta({ navigate }) {
  return h(
    "section",
    { class: "landing-section landing-container" },
    h(
      "div",
      { class: "landing-cta landing-reveal landing-demo-cta" },
      h(
        "div",
        { class: "landing-cta__inner" },
        h(
          "h2",
          { class: "landing-demo-cta__title" },
          "心动不如行动，",
          h("span", { class: "landing-text-grad--cool" }, "5 分钟启动你的舰队")
        ),
        h(
          "p",
          { class: "landing-demo-cta__lead" },
          "以上所有功能，安装后即可体验。数据存在你自己的服务器上，安全可控。"
        ),
        h(
          "div",
          { class: "landing-hero__cta" },
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
            "立即安装"
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
            "了解背后的 AI 岗位",
            IconArrow()
          )
        )
      )
    )
  );
}
