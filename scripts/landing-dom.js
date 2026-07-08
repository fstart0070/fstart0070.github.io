/**
 * h(tag, props?, ...children) —— 极简 hyperscript。
 *   - props 中以 "on" 开头的键作为事件监听器（onClick → click）
 *   - "class" 等价于 "className"
 *   - "style" 接受对象或字符串
 *   - "html" 注入 innerHTML（仅静态字符串场景使用）
 *   - children 支持 Node / string / number / Array / null / false
 */
export function h(tag, props, ...children) {
  const isSvg = SVG_TAGS.has(tag);
  const el = isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag);

  if (props && typeof props === "object" && !isNode(props)) {
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === "class" || k === "className") {
        el.setAttribute("class", v);
      } else if (k === "style" && typeof v === "object") {
        Object.assign(el.style, v);
      } else if (k === "html") {
        el.innerHTML = String(v);
      } else if (k.startsWith("on") && typeof v === "function") {
        el.addEventListener(k.slice(2).toLowerCase(), v);
      } else if (k === "ref" && typeof v === "function") {
        v(el);
      } else if (k === "data" && typeof v === "object") {
        for (const [dk, dv] of Object.entries(v)) {
          el.dataset[dk] = String(dv);
        }
      } else if (typeof v === "boolean") {
        if (v) el.setAttribute(k, "");
      } else {
        if (isSvg) {
          el.setAttribute(k, String(v));
        } else {
          el.setAttribute(k, String(v));
        }
      }
    }
  } else if (props != null) {
    children.unshift(props);
  }

  appendChildren(el, children);
  return el;
}

const SVG_TAGS = new Set([
  "svg",
  "g",
  "path",
  "circle",
  "rect",
  "line",
  "polyline",
  "polygon",
  "text",
  "defs",
  "linearGradient",
  "radialGradient",
  "stop",
  "filter",
  "feGaussianBlur",
  "feMerge",
  "feMergeNode",
  "feFlood",
  "feComposite",
  "marker",
  "use",
  "ellipse",
]);

function appendChildren(el, children) {
  for (const c of children) {
    if (c == null || c === false) continue;
    if (Array.isArray(c)) {
      appendChildren(el, c);
    } else if (isNode(c)) {
      el.appendChild(c);
    } else {
      el.appendChild(document.createTextNode(String(c)));
    }
  }
}

function isNode(x) {
  return typeof Node !== "undefined" && x instanceof Node;
}

/** 替换容器内容（不重渲染容器自身）。 */
export function mount(container, node) {
  if (!container) return;
  while (container.firstChild) container.removeChild(container.firstChild);
  if (node != null) {
    if (Array.isArray(node)) {
      for (const n of node) if (n != null) container.appendChild(n);
    } else {
      container.appendChild(node);
    }
  }
}

/** 触发滚动入场观察。 */
export function observeReveals(scope = document) {
  const targets = scope.querySelectorAll(".landing-reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-revealed"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-revealed");
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  targets.forEach((t) => io.observe(t));
}

/** 滚到顶（路由切换默认行为）。 */
export function scrollToTop(smooth = false) {
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
}

/** 字符串高亮 helper：把 {x} 标记替换为带 class 的 span（仅文本片段）。 */
export function clx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/**
 * 简易 hover spotlight：跟随鼠标位置的 CSS 变量更新。
 * 用在 .landing-agent-card 上做"光斑跟随"。
 */
export function bindSpotlight(el) {
  if (!el || matchMedia("(pointer: coarse)").matches) return;
  el.addEventListener("pointermove", (ev) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${ev.clientX - r.left}px`);
    el.style.setProperty("--my", `${ev.clientY - r.top}px`);
  });
}
