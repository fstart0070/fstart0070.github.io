export class LandingRouter {
  constructor(routes, defaultPath = "/") {
    this.routes = routes;
    this.defaultPath = defaultPath;
    this.subscribers = [];
    this._handler = () => this._dispatch();
  }

  start() {
    window.addEventListener("hashchange", this._handler);
    window.addEventListener("popstate", this._handler);
    if (!this._currentHashPath()) {
      this.navigate(this.defaultPath, { replace: true });
    } else {
      this._dispatch();
    }
    return this;
  }

  stop() {
    window.removeEventListener("hashchange", this._handler);
    window.removeEventListener("popstate", this._handler);
  }

  /** 监听路由切换；返回取消函数。 */
  onChange(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter((x) => x !== fn);
    };
  }

  /** 编程式跳转。replace=true 不写历史记录。 */
  navigate(path, { replace = false } = {}) {
    const hash = "#" + (path.startsWith("/") ? path : "/" + path);
    if (replace) {
      const url = location.pathname + location.search + hash;
      history.replaceState(null, "", url);
      this._dispatch();
    } else {
      location.hash = hash;
    }
  }

  current() {
    const path = this._currentHashPath() || this.defaultPath;
    return this._match(path);
  }

  // ---- private ----

  _currentHashPath() {
    const raw = location.hash || "";
    if (!raw.startsWith("#")) return "";
    const p = raw.slice(1);
    return p.startsWith("/") ? p : "";
  }

  _dispatch() {
    const path = this._currentHashPath() || this.defaultPath;
    const matched = this._match(path);
    for (const fn of this.subscribers) {
      try {
        fn(matched);
      } catch (err) {
      }
    }
  }

  _match(path) {
    /* 把 "/about?focus=enterprise" 拆成 pathOnly + 解析后的 params。 */
    const qIdx = path.indexOf("?");
    const pathOnly = qIdx >= 0 ? path.slice(0, qIdx) : path;
    const queryStr = qIdx >= 0 ? path.slice(qIdx + 1) : "";
    const params = {};
    if (queryStr) {
      for (const pair of queryStr.split("&")) {
        if (!pair) continue;
        const eq = pair.indexOf("=");
        const k = eq >= 0 ? pair.slice(0, eq) : pair;
        const v = eq >= 0 ? pair.slice(eq + 1) : "";
        if (!k) continue;
        try {
          params[decodeURIComponent(k)] = decodeURIComponent(v);
        } catch (_e) {
          params[k] = v;
        }
      }
    }
    for (const r of this.routes) {
      if (r.path === pathOnly) {
        return { route: r, path: pathOnly, params };
      }
    }
    const fallback =
      this.routes.find((r) => r.path === this.defaultPath) || this.routes[0];
    return { route: fallback, path: pathOnly, params };
  }
}
