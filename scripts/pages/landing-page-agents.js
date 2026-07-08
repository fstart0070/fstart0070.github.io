import { h, mount } from "../landing-dom.js";
import { renderSectionHead, renderAgentCard } from "../landing-components.js";
import { AGENT_LAYERS, AGENTS, groupAgentsByLayer } from "../landing-agents.js";

export function renderAgentsPage() {
  let activeLayer = "ALL";
  const grouped = groupAgentsByLayer();

  const grid = h("div", { class: "landing-agents-grid" });
  const tabs = h(
    "div",
    {
      class: "landing-tabs",
      style: { display: "flex", justifyContent: "center", marginBottom: "var(--space-6)" },
    },
    h(
      "button",
      {
        class: "is-active",
        onClick: (e) => switchLayer(e, "ALL"),
        "data-layer": "ALL",
      },
      "全部"
    ),
    ...AGENT_LAYERS.map((l) =>
      h(
        "button",
        {
          onClick: (e) => switchLayer(e, l.id),
          "data-layer": l.id,
        },
        l.name
      )
    )
  );

  function renderGrid() {
    const list =
      activeLayer === "ALL"
        ? AGENTS
        : AGENTS.filter((a) => a.layer === activeLayer);
    mount(grid, list.map((a) => renderAgentCard(a)));
    requestAnimationFrame(() => {
      grid.querySelectorAll(".landing-reveal").forEach((el) =>
        el.classList.add("is-revealed")
      );
    });
  }

  function switchLayer(e, id) {
    activeLayer = id;
    tabs.querySelectorAll("button").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.layer === id);
    });
    renderGrid();
  }

  renderGrid();

  const layerSections = grouped.map((g) =>
    h(
      "div",
      { style: { marginTop: "var(--space-6)" } },
      h(
        "div",
        {
          class: "landing-layer-bar",
          style: { "--layer-tone": g.layer.tone },
        },
        h("span", { class: "landing-layer-bar__index" }, g.layer.code),
        h("span", { class: "landing-layer-bar__name" }, g.layer.name),
        h("p", { class: "landing-layer-bar__lead" }, g.layer.desc)
      ),
      h(
        "div",
        { class: "landing-agents-grid" },
        ...g.agents.map((a) => renderAgentCard(a))
      )
    )
  );

  return h(
    "div",
    null,
    h(
      "section",
      { class: "landing-section landing-container" },
      renderSectionHead(
        "Agent Roster · " + AGENTS.length,
        "智能岗位全员名册",
        `舰队 5 大业务岗位层、${AGENTS.length} 个岗位；每位都有明确的业务职责、输入、输出与可观测代号。`
      ),
      tabs,
      grid
    ),
    h("div", { class: "landing-divider" }),
    h(
      "section",
      { class: "landing-section--tight landing-container" },
      renderSectionHead(
        "Layer View",
        "按业务层查看舰队协作",
        "盯市 → 沉淀 → 拆解 → 决策 → 指挥；上一层产出是下一层的输入，单事务边界保证零脏数据。"
      ),
      ...layerSections
    )
  );
}
