import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as svc, m as useCrm, o as STAGES } from "./store-CmcNzmGW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pipeline-XsgpIf1w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PipelinePage() {
	const { db, matchSearch, user, moveStage, deleteContact } = useCrm();
	const dragRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "board",
		children: STAGES.map((st) => {
			const items = db.contacts.filter((c) => c.stage === st.id && matchSearch(c));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col",
				onDragOver: (e) => {
					e.preventDefault();
					e.currentTarget.classList.add("drop");
				},
				onDragLeave: (e) => e.currentTarget.classList.remove("drop"),
				onDrop: (e) => {
					e.preventDefault();
					e.currentTarget.classList.remove("drop");
					if (dragRef.current) moveStage(dragRef.current, st.id);
					dragRef.current = null;
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [st.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "c",
					children: items.length
				})] }), items.map((c) => {
					const o = user(c.owner);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dcard",
						draggable: true,
						onDragStart: (e) => {
							dragRef.current = c.id;
							e.currentTarget.classList.add("dragging");
						},
						onDragEnd: (e) => e.currentTarget.classList.remove("dragging"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "del-x del-card",
								onClick: () => deleteContact(c.id),
								title: "Delete contact",
								children: "×"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dn",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "dco",
								children: c.company
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dfoot",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `pill ${c.service}`,
									children: svc(c.service)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "dot",
									style: { background: o.color },
									title: o.name
								})]
							})
						]
					}, c.id);
				})]
			}, st.id);
		})
	});
}
//#endregion
export { PipelinePage as component };
