import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as fmtWhen, d as svc, m as useCrm, u as stageLabel } from "./store-CmcNzmGW.mjs";
import { i as openLogCallModal, r as openContactModal } from "./AppShell-nlGmuDyo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contacts-BojD6nRz.js
var import_jsx_runtime = require_jsx_runtime();
function ContactsPage() {
	const { db, matchSearch, user, deleteContact } = useCrm();
	const rows = db.contacts.filter(matchSearch).slice().sort((a, b) => (a.nextCallAt ?? 9e15) - (b.nextCallAt ?? 9e15));
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "empty",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No contacts found" }), "Try a different search, or add a new contact."]
	});
	const now = Date.now();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "tablewrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Company" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Phone" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Service" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Stage" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Owner" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Next call" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
		] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((c, i) => {
			const o = user(c.owner);
			const overdueColor = c.nextCallAt && c.nextCallAt < now ? "var(--clay)" : "var(--ink-soft)";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				style: { ["--d"]: `${Math.min(i, 12) * .02}s` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "nm",
						children: c.name
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.company }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num",
						children: c.phone
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `pill ${c.service}`,
						children: svc(c.service)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pill stage",
						children: stageLabel(c.stage)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "owner-tag",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dot",
							style: { background: o.color }
						}), o.name]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.doNotCall ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "var(--muted)" },
						children: "do not call"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "num",
						style: { color: overdueColor },
						children: fmtWhen(c.nextCallAt)
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						style: {
							textAlign: "right",
							whiteSpace: "nowrap"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn sm",
								onClick: () => openLogCallModal(c),
								children: "Call"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn ghost sm",
								onClick: () => openContactModal(c),
								children: "Edit"
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "del-x",
								onClick: () => deleteContact(c.id),
								title: "Delete contact",
								children: "×"
							})
						]
					})
				]
			}, c.id);
		}) })] })
	});
}
//#endregion
export { ContactsPage as component };
