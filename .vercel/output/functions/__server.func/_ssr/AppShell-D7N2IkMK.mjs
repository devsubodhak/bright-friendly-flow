import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as SERVICES, f as toDatetimeLocal, i as DISPOSITIONS, m as useCrm, o as STAGES, p as uid, r as DAY, t as APPT_TYPES } from "./store-DYE6C_dQ.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-D7N2IkMK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PhoneIcon = (props) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	width: "13",
	height: "13",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" })
});
var SearchIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	className: "si",
	width: "15",
	height: "15",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "2",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "11",
		cy: "11",
		r: "7"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m21 21-4.3-4.3" })]
});
var TodayIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	className: "ic",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" })
});
var ContactsIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	className: "ic",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "9",
			cy: "7",
			r: "4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" })
	]
});
var ApptIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	className: "ic",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: "3",
		y: "4",
		width: "18",
		height: "18",
		rx: "2"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 2v4M8 2v4M3 10h18" })]
});
var PipelineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	className: "ic",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 3v18h18" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "7",
			y: "12",
			width: "3",
			height: "6"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "12",
			y: "8",
			width: "3",
			height: "10"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "17",
			y: "5",
			width: "3",
			height: "13"
		})
	]
});
var TeamIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	className: "ic",
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: "1.8",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
		cx: "12",
		cy: "8",
		r: "4"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 21a8 8 0 0 1 16 0" })]
});
function Modal({ title, onClose, children, footer }) {
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "scrim",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "modal",
			onMouseDown: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "x",
					onClick: onClose,
					"aria-label": "Close",
					children: "×"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pad",
					children
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { children: footer })
			]
		})
	});
}
function ContactModal({ contact, onClose }) {
	const { db, upsertContact, deleteContact } = useCrm();
	const isNew = !contact;
	const [form, setForm] = (0, import_react.useState)(() => contact ?? {
		id: uid(),
		name: "",
		company: "",
		phone: "",
		email: "",
		service: "web",
		stage: "new",
		owner: db.currentUserId,
		source: "",
		notes: "",
		nextCallAt: null,
		lastDisposition: "",
		doNotCall: false,
		createdAt: Date.now()
	});
	const [err, setErr] = (0, import_react.useState)(false);
	const upd = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const save = () => {
		if (!form.name.trim()) {
			setErr(true);
			return;
		}
		upsertContact({
			...form,
			name: form.name.trim()
		}, isNew);
		onClose();
	};
	const del = () => {
		if (contact && confirm("Delete this contact?")) {
			deleteContact(contact.id);
			onClose();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: isNew ? "New contact" : "Edit contact",
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			!isNew && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn danger",
				style: { marginRight: "auto" },
				onClick: del,
				children: "Delete"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn",
				onClick: onClose,
				children: "Cancel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn primary",
				onClick: save,
				children: isNew ? "Add contact" : "Save changes"
			})
		] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.name,
						onChange: (e) => {
							setErr(false);
							upd("name", e.target.value);
						},
						style: err ? { borderColor: "var(--clay)" } : void 0,
						placeholder: "e.g. Nimal Perera"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Company" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.company,
						onChange: (e) => upd("company", e.target.value),
						placeholder: "e.g. Sunrise Villas"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Phone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "num",
						value: form.phone,
						onChange: (e) => upd("phone", e.target.value),
						placeholder: "07X XXX XXXX"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Email ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							color: "var(--muted)",
							fontWeight: 400
						},
						children: "(optional)"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.email,
						onChange: (e) => upd("email", e.target.value)
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Service needed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.service,
						onChange: (e) => upd("service", e.target.value),
						children: SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.label
						}, s.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Stage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.stage,
						onChange: (e) => upd("stage", e.target.value),
						children: STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.label
						}, s.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Owner" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: form.owner,
						onChange: (e) => upd("owner", e.target.value),
						children: db.users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: u.id,
							children: u.name
						}, u.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "field",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Source" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.source,
						onChange: (e) => upd("source", e.target.value),
						placeholder: "Referral, Facebook, expo…"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Next call" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "num",
					type: "datetime-local",
					value: toDatetimeLocal(form.nextCallAt),
					onChange: (e) => upd("nextCallAt", e.target.value ? new Date(e.target.value).getTime() : null)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.notes,
					onChange: (e) => upd("notes", e.target.value),
					placeholder: "Context, what they want, budget hints…"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "toggle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: form.doNotCall,
					onChange: (e) => upd("doNotCall", e.target.checked)
				}), "Do not call"]
			})
		]
	});
}
var NEEDS_NEXT = [
	"callback",
	"noanswer",
	"busy",
	"notnow"
];
function LogCallModal({ contact, onClose }) {
	const { db, user, saveCall, toast } = useCrm();
	const [dispo, setDispo] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [nextAt, setNextAt] = (0, import_react.useState)("");
	const defaultApptAt = () => {
		const d = new Date(Date.now() + DAY);
		d.setMinutes(0, 0, 0);
		return toDatetimeLocal(d.getTime());
	};
	const [apptType, setApptType] = (0, import_react.useState)(APPT_TYPES[0]);
	const [apptUser, setApptUser] = (0, import_react.useState)(db.currentUserId);
	const [apptAt, setApptAt] = (0, import_react.useState)(defaultApptAt());
	const [apptDur, setApptDur] = (0, import_react.useState)(60);
	const [apptLoc, setApptLoc] = (0, import_react.useState)("");
	const showNext = dispo && NEEDS_NEXT.includes(dispo);
	const showAppt = dispo === "appt";
	const quick = (h) => {
		setNextAt(toDatetimeLocal(Date.now() + h * 36e5));
	};
	const save = () => {
		if (!dispo) {
			toast("Pick how the call went");
			return;
		}
		const nextCallAt = showNext && nextAt ? new Date(nextAt).getTime() : null;
		const appointment = showAppt && apptAt ? {
			userId: apptUser,
			title: apptType,
			type: apptType,
			at: new Date(apptAt).getTime(),
			durationMin: Number(apptDur) || 60,
			location: apptLoc.trim(),
			notes: note.trim()
		} : void 0;
		saveCall({
			contact,
			disposition: dispo,
			note: note.trim(),
			nextCallAt,
			appointment
		});
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		title: `Log call — ${contact.name}`,
		onClose,
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "btn",
			onClick: onClose,
			children: "Cancel"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "btn primary",
			onClick: save,
			children: "Save call"
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					fontSize: 12.5,
					color: "var(--muted)",
					marginBottom: 12
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { fontFamily: "var(--mono)" },
						children: contact.phone
					}),
					" · ",
					contact.company,
					" · owner ",
					user(contact.owner).name
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "How did it go?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chips",
					children: DISPOSITIONS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `chip ${d.tone} ${dispo === d.id ? "sel" : ""}`,
						onClick: () => setDispo(d.id),
						children: d.label
					}, d.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "field",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: note,
					onChange: (e) => setNote(e.target.value),
					placeholder: "What was said, next step…"
				})]
			}),
			showNext && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "subpanel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ttl",
						children: "Schedule the next call"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "chips",
						style: { marginBottom: 10 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "chip",
								onClick: () => quick(3),
								children: "In 3 hours"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "chip",
								onClick: () => quick(24),
								children: "Tomorrow"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "chip",
								onClick: () => quick(72),
								children: "In 3 days"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "chip",
								onClick: () => quick(168),
								children: "Next week"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "num",
						type: "datetime-local",
						value: nextAt,
						onChange: (e) => setNextAt(e.target.value),
						style: {
							width: "100%",
							border: "1px solid var(--line-strong)",
							borderRadius: 7,
							padding: "9px 10px",
							fontFamily: "var(--mono)"
						}
					})
				]
			}),
			showAppt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "subpanel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ttl",
						children: "Book the appointment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: apptType,
								onChange: (e) => setApptType(e.target.value),
								children: APPT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Assign to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: apptUser,
								onChange: (e) => setApptUser(e.target.value),
								children: db.users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: u.id,
									children: u.name
								}, u.id))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Date & time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "num",
								type: "datetime-local",
								value: apptAt,
								onChange: (e) => setApptAt(e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Duration (min)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "num",
								type: "number",
								value: apptDur,
								onChange: (e) => setApptDur(Number(e.target.value))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: apptLoc,
							onChange: (e) => setApptLoc(e.target.value),
							placeholder: "Office, Zoom, site address…"
						})]
					})
				]
			})
		]
	});
}
function Toasts() {
	const { toasts } = useCrm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "toasts",
		children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "toast",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tk" }), t.msg]
		}, t.id))
	});
}
var PAGES = {
	"/": {
		title: "Today's calls",
		crumb: "Calls due and overdue, oldest first"
	},
	"/contacts": {
		title: "Contacts",
		crumb: "Everyone in the pipeline"
	},
	"/appointments": {
		title: "Appointments",
		crumb: "Meetings, shoots and site visits"
	},
	"/pipeline": {
		title: "Pipeline",
		crumb: "Drag a card to move its stage"
	},
	"/team": {
		title: "People & activity",
		crumb: "Who is doing what"
	}
};
var opener = null;
function openContactModal(contact) {
	opener?.({ contact: { contact } });
}
function openLogCallModal(contact) {
	opener?.({ call: { contact } });
}
function AppShell() {
	const { db, isLoading, user, search, setSearch, setCurrentUser } = useCrm();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const page = PAGES[pathname] ?? {
		title: "Univerz CRM",
		crumb: ""
	};
	const [modal, setModal] = (0, import_react.useState)({});
	opener = setModal;
	const { dueBadge, apptBadge } = (0, import_react.useMemo)(() => {
		const now = Date.now();
		const today = (/* @__PURE__ */ new Date()).toDateString();
		return {
			dueBadge: db.contacts.filter((c) => !c.doNotCall && c.nextCallAt && (c.nextCallAt < now || new Date(c.nextCallAt).toDateString() === today)).length,
			apptBadge: db.appointments.filter((a) => a.status === "scheduled" && a.at >= now - 864e5).length
		};
	}, [db]);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "loader-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "loader-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "loader-logo-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-logo-ring" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/src/logo.png",
						alt: "Univerz Logo",
						className: "loader-logo"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "loader-title",
					children: "Univerz CRM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "loader-subtitle",
					children: "Securing Connection"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "loader-bar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "loader-progress" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "loader-status",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "loader-dot" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Syncing database tables…" })]
				})
			]
		})
	});
	const me = user(db.currentUserId);
	const NavLink = ({ to, icon, label, badge }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: pathname === to ? "on" : "",
		children: [
			icon,
			label,
			badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `badge ${badge === 0 ? "zero" : ""}`,
				children: badge
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "side",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mark",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/src/logo.png",
								alt: "Univerz Logo",
								className: "brand-logo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "name",
								children: "Univerz CRM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "sub",
								children: "calls & appointments"
							})] })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "nav",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "group-label",
								children: "Work"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayIcon, {}),
								label: "Today's calls",
								badge: dueBadge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/contacts",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactsIcon, {}),
								label: "Contacts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/appointments",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApptIcon, {}),
								label: "Appointments",
								badge: apptBadge
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/pipeline",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineIcon, {}),
								label: "Pipeline"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "group-label",
								children: "Team"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								to: "/team",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamIcon, {}),
								label: "People & activity"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "whoami",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "avatar",
							style: { background: me.color },
							children: me.initials
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: db.currentUserId,
							onChange: (e) => setCurrentUser(e.target.value),
							title: "Acting as",
							children: db.users.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: u.id,
								children: [
									u.name,
									" — ",
									u.role
								]
							}, u.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "topbar",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: page.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "crumb",
							children: page.crumb
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "search",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchIcon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search name, company or number…"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn primary",
							onClick: () => openContactModal(null),
							children: "+ New contact"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "content",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
			modal.contact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactModal, {
				contact: modal.contact.contact,
				onClose: () => setModal({})
			}),
			modal.call && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogCallModal, {
				contact: modal.call.contact,
				onClose: () => setModal({})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toasts, {})
		]
	});
}
//#endregion
export { openLogCallModal as i, PhoneIcon as n, openContactModal as r, AppShell as t };
