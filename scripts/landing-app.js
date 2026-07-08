import { h, mount, observeReveals, scrollToTop } from "./landing-dom.js";
import { LandingRouter } from "./landing-router.js";
import { LandingParticles } from "./landing-effects.js";
import {
  renderHeader,
  renderDrawer,
  renderFooter,
  NAV,
} from "./landing-components.js";

import { renderHomePage } from "./pages/landing-page-home.js";
import { renderAgentsPage } from "./pages/landing-page-agents.js";
import { renderArchitecturePage } from "./pages/landing-page-architecture.js";
import { renderInstallPage } from "./pages/landing-page-install.js";
import { renderAboutPage } from "./pages/landing-page-about.js";
import { renderDemoPage } from "./pages/landing-page-demo.js";

const ROUTES = [
  { path: "/", title: "首页", render: (ctx) => renderHomePage(ctx) },
  { path: "/demo", title: "产品 Demo", render: (ctx) => renderDemoPage(ctx) },
  { path: "/agents", title: "智能体矩阵", render: (ctx) => renderAgentsPage(ctx) },
  {
    path: "/architecture",
    title: "架构",
    render: (ctx) => renderArchitecturePage(ctx),
  },
  { path: "/install", title: "安装", render: (ctx) => renderInstallPage(ctx) },
  { path: "/about", title: "关于", render: (ctx) => renderAboutPage(ctx) },
  /* 兼容历史外链 #/cooperation —— 仍走 about 页（合作 section 在 about 内）。 */
  { path: "/cooperation", title: "关于", render: (ctx) => renderAboutPage(ctx) },
];

class LandingApp {
  constructor() {
    this.headerEl = document.getElementById("landing-header");
    this.outletEl = document.getElementById("landing-outlet");
    this.footerEl = document.getElementById("landing-footer");
    this.bootEl = document.getElementById("landing-boot");
    this.bgEl = document.querySelector(".landing-bg");
    this.canvasEl = document.getElementById("landing-bg-canvas");

    this.router = new LandingRouter(ROUTES, "/");
    this.particles = null;
    this.drawerEl = null;
    this.currentPath = "/";
  }

  start() {
    this._initViewportFlag();
    this._initBackground();
    this._initHeaderFooter();
    this._initScrollEffects();
    this._initRouter();
    this._hideBoot();
  }

  _initViewportFlag() {
    const apply = () => {
      const w = window.innerWidth || document.documentElement.clientWidth || 0;
      const flag = w <= 900 ? "narrow" : "wide";
      document.body.setAttribute("data-vp", flag);
    };
    apply();
    window.addEventListener("resize", apply, { passive: true });
  }

  // ---- private ----

  _initBackground() {
    if (LandingParticles.shouldEnable()) {
      try {
        this.particles = new LandingParticles(this.canvasEl);
        this.particles.start();
      } catch (e) {
        this.bgEl.classList.add("landing-bg--lite");
      }
    } else {
      this.bgEl.classList.add("landing-bg--lite");
    }
  }

  _initHeaderFooter() {
    this._renderHeader();
    mount(this.footerEl, renderFooter());
  }

  _renderHeader() {
    mount(
      this.headerEl,
      renderHeader({
        currentPath: this.currentPath,
        onNavigate: (p) => this._navigate(p),
        onOpenDrawer: () => this._openDrawer(),
      })
    );
  }

  _initScrollEffects() {
    let ticking = false;
    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const scrolled = window.scrollY > 24;
          this.headerEl.classList.toggle("landing-header--scrolled", scrolled);
          ticking = false;
        });
      },
      { passive: true }
    );
  }

  _initRouter() {
    this.router.onChange((matched) => this._handleRouteChange(matched));
    this.router.start();
  }

  _handleRouteChange(matched) {
    const path = matched.route.path;
    const title = matched.route.title;
    const params = matched.params || {};
    this.currentPath = path;
    document.title = `${title} · chacha · 酒店收益经理的 AI 智能体舰队`;

    this._renderHeader();
    if (this.drawerEl) this._closeDrawer();

    const ctx = {
      navigate: (p) => this._navigate(p),
      currentPath: path,
      params,
    };

    const node = matched.route.render(ctx);
    mount(this.outletEl, h("div", { class: "landing-outlet__page" }, node));

    /* 带 ?focus=xxx 时滚到对应锚点（footer "谈合作" 三链接走这条路径）。 */
    const focus = typeof params.focus === "string" ? params.focus.trim() : "";
    if (focus) {
      this._scrollToCoopAnchor(focus);
    } else {
      scrollToTop(false);
    }
    requestAnimationFrame(() => observeReveals(this.outletEl));
  }

  _scrollToCoopAnchor(focus) {
    /* 等下一帧 DOM mount 完毕再定位；找不到目标就回退到顶部。
     *  注意：合作卡都带 .landing-reveal（transform: translate3d(0, 32px, 0) + opacity:0），
     *  若直接 scrollIntoView 会定位到"位移后"位置 + 滚动中 reveal 触发再"跳"一次，体感很差。
     *  先把 #cooperation 内所有 reveal 节点强制 finalize，再滚动定位。
     *  支持两类锚点：
     *   - focus=cooperation → 跳到整个合作 section 顶部
     *   - focus=hotel | enterprise | source → 跳到对应单卡 */
    requestAnimationFrame(() => {
      const target =
        focus === "cooperation"
          ? document.getElementById("cooperation")
          : document.getElementById(`coop-${focus}`);
      if (!target || typeof target.scrollIntoView !== "function") {
        scrollToTop(false);
        return;
      }
      const coopSection = document.getElementById("cooperation");
      if (coopSection) {
        coopSection
          .querySelectorAll(".landing-reveal:not(.is-revealed)")
          .forEach((el) => {
            el.style.transition = "none";
            el.classList.add("is-revealed");
          });
        requestAnimationFrame(() => {
          coopSection
            .querySelectorAll(".landing-reveal")
            .forEach((el) => (el.style.transition = ""));
        });
      }
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  _navigate(path) {
    this.router.navigate(path);
  }

  _openDrawer() {
    if (this.drawerEl) {
      this._closeDrawer();
      return;
    }
    this.drawerEl = renderDrawer({
      currentPath: this.currentPath,
      onNavigate: (p) => {
        this._closeDrawer();
        setTimeout(() => this._navigate(p), 80);
      },
      onClose: () => this._closeDrawer(),
    });
    document.body.appendChild(this.drawerEl);
    requestAnimationFrame(() => this.drawerEl.classList.add("is-open"));
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", this._onEscClose);
  }

  _closeDrawer = () => {
    if (!this.drawerEl) return;
    this.drawerEl.classList.remove("is-open");
    const el = this.drawerEl;
    this.drawerEl = null;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", this._onEscClose);
    setTimeout(() => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 280);
  };

  _onEscClose = (e) => {
    if (e.key === "Escape") this._closeDrawer();
  };

  _hideBoot() {
    setTimeout(() => {
      this.bootEl.classList.add("landing-boot--hidden");
      setTimeout(() => {
        if (this.bootEl && this.bootEl.parentNode) {
          this.bootEl.parentNode.removeChild(this.bootEl);
        }
      }, 360);
    }, 240);
  }
}

function ready(fn) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    fn();
  }
}

ready(() => {
  const app = new LandingApp();
  app.start();
});
