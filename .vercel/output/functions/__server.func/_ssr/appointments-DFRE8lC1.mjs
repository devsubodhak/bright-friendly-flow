import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as useCrm } from "./store-DhJVG2kc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/appointments-DFRE8lC1.js
var import_jsx_runtime = require_jsx_runtime();
function AppointmentsPage() {
	const { db, matchSearch, contact, user, markApptDone, cancelAppointment, deleteAppointment } = useCrm();
	const list = db.appointments.filter((a) => {
		const c = contact(a.contactId);
		return c ? matchSearch(c) : true;
	}).slice().sort((a, b) => a.at - b.at);
	if (!list.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "empty",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No appointments yet" }), "Book one from a call (choose \"Booked appointment\") or from a contact."]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "queue stagger",
		children: list.map((a, i) => {
			const c = contact(a.contactId) ?? {
				name: "—",
				company: ""
			};
			const o = user(a.userId);
			const d = new Date(a.at);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `appt ${a.status === "done" ? "done" : a.status === "cancelled" ? "cancelled" : ""}`,
				style: { ["--d"]: `${i * .04}s` },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "date",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "d",
							children: d.getDate()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "m",
							children: d.toLocaleDateString([], { month: "short" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ttl",
							children: [
								a.title,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "pill stage",
									children: a.type
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "det",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "num",
									children: [
										d.toLocaleTimeString([], {
											hour: "numeric",
											minute: "2-digit"
										}),
										" · ",
										a.durationMin,
										"min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									c.name,
									" — ",
									c.company
								] }),
								a.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["📍 ", a.location] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "dot",
									style: { background: o.color }
								}), o.name] })
							]
						}),
						a.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "det",
							style: { marginTop: 5 },
							children: a.notes
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							gap: 7,
							alignItems: "center"
						},
						children: [
							a.status === "scheduled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn sm",
									onClick: () => markApptDone(a.id),
									children: "Mark done"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn sm warn",
									onClick: () => cancelAppointment(a.id),
									children: "Cancel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "del-x",
									onClick: () => deleteAppointment(a.id),
									title: "Delete appointment",
									children: "×"
								})
							] }),
							a.status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pill good",
								children: "Done"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "del-x",
								onClick: () => deleteAppointment(a.id),
								title: "Delete appointment",
								children: "×"
							})] }),
							a.status === "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "pill",
								style: {
									background: "var(--amber-wash)",
									color: "var(--amber)"
								},
								children: "Cancelled"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "del-x",
								onClick: () => deleteAppointment(a.id),
								title: "Delete appointment",
								children: "×"
							})] })
						]
					})
				]
			}, a.id);
		})
	});
}
//#endregion
export { AppointmentsPage as component };
