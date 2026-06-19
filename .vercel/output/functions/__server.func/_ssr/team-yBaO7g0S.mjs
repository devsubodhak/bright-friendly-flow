import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as fmtWhen, m as useCrm, s as dispoLabel } from "./store-CmcNzmGW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/team-yBaO7g0S.js
var import_jsx_runtime = require_jsx_runtime();
function TeamPage() {
	const { db, user, contact, deleteCall } = useCrm();
	const today = (/* @__PURE__ */ new Date()).toDateString();
	const acts = [...db.calls.map((c) => ({
		id: c.id,
		kind: "call",
		t: c.at,
		txt: `${user(c.userId).name} called ${contact(c.contactId)?.name ?? "—"} — ${dispoLabel(c.disposition)}`
	})), ...db.appointments.map((a) => ({
		id: a.id,
		kind: "appt",
		t: a.at,
		txt: `${user(a.userId).name} has ${a.title} with ${contact(a.contactId)?.name ?? "—"}`
	}))].sort((a, b) => b.t - a.t).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sec-h",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
				"The team (",
				db.users.length,
				" seats)"
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "queue stagger",
			children: db.users.map((u, i) => {
				const owned = db.contacts.filter((c) => c.owner === u.id).length;
				const callsToday = db.calls.filter((c) => c.userId === u.id && new Date(c.at).toDateString() === today).length;
				const appts = db.appointments.filter((a) => a.userId === u.id && a.status === "scheduled").length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "appt",
					style: { ["--d"]: `${i * .04}s` },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "avatar",
							style: {
								background: u.color,
								width: 42,
								height: 42,
								fontSize: 14
							},
							children: u.initials
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ttl",
							children: u.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "det",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: u.role })
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 22,
								textAlign: "right"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "num",
									style: {
										fontSize: 18,
										fontWeight: 600
									},
									children: owned
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: 11,
										color: "var(--muted)"
									},
									children: "contacts"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "num",
									style: {
										fontSize: 18,
										fontWeight: 600
									},
									children: callsToday
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: 11,
										color: "var(--muted)"
									},
									children: "calls today"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "num",
									style: {
										fontSize: 18,
										fontWeight: 600
									},
									children: appts
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: 11,
										color: "var(--muted)"
									},
									children: "appts"
								})] })
							]
						})
					]
				}, u.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sec-h",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent activity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule" })]
		}),
		acts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No activity yet" }), "Start logging calls or scheduling appointments."]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "queue stagger",
			children: acts.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "qcard soon",
				style: { ["--d"]: `${i * .03}s` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "spine" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "row1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.txt })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "meta",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "when",
								children: fmtWhen(a.t)
							})
						})]
					}),
					a.kind === "call" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "acts",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "del-x",
							onClick: () => deleteCall(a.id),
							title: "Remove call log",
							children: "×"
						})
					})
				]
			}, `${a.kind}-${a.id}`))
		})
	] });
}
//#endregion
export { TeamPage as component };
