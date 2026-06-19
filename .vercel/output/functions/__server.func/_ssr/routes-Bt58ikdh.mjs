import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as fmtWhen, d as svc, l as relOverdue, m as useCrm, u as stageLabel } from "./store-tMte_h3I.mjs";
import { i as openLogCallModal, n as PhoneIcon, r as openContactModal } from "./AppShell-CUT35U9r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bt58ikdh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TodayPage() {
	const { db, matchSearch, user } = useCrm();
	const { overdue, todayList, later, callsToday, apptToday, q } = (0, import_react.useMemo)(() => {
		const now = Date.now();
		const today = (/* @__PURE__ */ new Date()).toDateString();
		const q = db.contacts.filter((c) => !c.doNotCall && c.nextCallAt).filter(matchSearch).sort((a, b) => (a.nextCallAt ?? 0) - (b.nextCallAt ?? 0));
		const overdue = q.filter((c) => (c.nextCallAt ?? 0) < now - 6e4);
		const todayList = q.filter((c) => (c.nextCallAt ?? 0) >= now - 6e4 && new Date(c.nextCallAt).toDateString() === today);
		return {
			q,
			overdue,
			todayList,
			later: q.filter((c) => !overdue.includes(c) && !todayList.includes(c)),
			callsToday: db.calls.filter((c) => new Date(c.at).toDateString() === today).length,
			apptToday: db.appointments.filter((a) => a.status === "scheduled" && new Date(a.at).toDateString() === today).length
		};
	}, [db, matchSearch]);
	const pct = q.length ? Math.round(callsToday / (callsToday + overdue.length + todayList.length || 1) * 100) : 0;
	const renderSection = (title, list, cls) => {
		if (!list.length) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sec-h",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "count",
					children: list.length
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "queue stagger",
			children: list.map((c, i) => {
				const o = user(c.owner);
				const isOverdue = cls === "overdue";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `qcard ${cls}`,
					style: { ["--d"]: `${i * .04}s` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spine" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "row1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "who",
										children: c.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "co",
										children: ["· ", c.company]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `pill ${c.service}`,
										children: svc(c.service)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pill stage",
										children: stageLabel(c.stage)
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "num",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneIcon, {}), c.phone]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "when",
										children: isOverdue ? relOverdue(c.nextCallAt) : fmtWhen(c.nextCallAt)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "dot",
										style: { background: o.color }
									}), o.name] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "acts",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn primary sm",
								onClick: () => openLogCallModal(c),
								children: "Log call"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn sm",
								onClick: () => openContactModal(c),
								children: "Open"
							})]
						})
					]
				}, c.id);
			})
		})] }, title);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stats stagger",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stat alarm",
					style: { ["--d"]: "0s" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "k",
							children: "Overdue calls"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "v",
							children: overdue.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: {
								width: overdue.length ? "100%" : 0,
								background: "var(--clay)"
							} })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stat",
					style: { ["--d"]: ".05s" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "k",
							children: "Due today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "v",
							children: todayList.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: {
								width: todayList.length ? "70%" : 0,
								background: "var(--amber)"
							} })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stat",
					style: { ["--d"]: ".1s" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "k",
							children: "Calls logged today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "v",
							children: callsToday
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${pct}%` } })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stat",
					style: { ["--d"]: ".15s" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "k",
							children: "Appointments today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "v",
							children: apptToday
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: {
								width: apptToday ? "80%" : 0,
								background: "var(--teal)"
							} })
						})
					]
				})
			]
		}),
		renderSection("Overdue", overdue, "overdue"),
		renderSection("Due today", todayList, "today"),
		renderSection("Coming up", later, "soon"),
		!q.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Nothing in the queue" }), "No calls scheduled. Open a contact and set a next-call time, or add a new contact."]
		})
	] });
}
//#endregion
export { TodayPage as component };
