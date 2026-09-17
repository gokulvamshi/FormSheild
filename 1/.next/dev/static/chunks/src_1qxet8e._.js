(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/applications/ApplicationTypeSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ApplicationTypeSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.mjs [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ApplicationTypeSelector({ state, category, selected, onSelect, onBack }) {
    _s();
    const [templates, setTemplates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ApplicationTypeSelector.useEffect": ()=>{
            fetch(`/api/templates?state=${state}&category=${category}`).then({
                "ApplicationTypeSelector.useEffect": (res)=>res.json()
            }["ApplicationTypeSelector.useEffect"]).then({
                "ApplicationTypeSelector.useEffect": (data)=>{
                    if (Array.isArray(data)) setTemplates(data);
                }
            }["ApplicationTypeSelector.useEffect"]).finally({
                "ApplicationTypeSelector.useEffect": ()=>setLoading(false)
            }["ApplicationTypeSelector.useEffect"]);
        }
    }["ApplicationTypeSelector.useEffect"], [
        state,
        category
    ]);
    const localApps = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_APPLICATIONS"][category] || [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "btn-ghost mb-4 -ml-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 15
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    "Back"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-label mb-1.5",
                        children: "STEP 3 OF 7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-heading-lg mb-1",
                        children: "Select Application Type"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#6b7280] text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#1f2937]",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_LABELS"][category]
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            " in",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#1f2937]",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_LABELS"][state]
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    1,
                    2,
                    3,
                    4
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card p-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skeleton h-5 w-3/4 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                    lineNumber: 64,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skeleton h-3 w-full rounded"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                    lineNumber: 65,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "skeleton h-3 w-1/2 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                    lineNumber: 66,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                            lineNumber: 63,
                            columnNumber: 15
                        }, this)
                    }, i, false, {
                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                        lineNumber: 62,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    templates.map((t, i)=>{
                        const localInfo = localApps.find((a)=>a.code === t.applicationType);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            initial: {
                                opacity: 0,
                                y: 8
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            transition: {
                                delay: i * 0.06
                            },
                            onClick: ()=>onSelect(t.applicationType, t.id),
                            className: `w-full card card-hover text-left p-5 border-2 transition-all ${selected === t.applicationType ? 'border-[#1a73e8] bg-[#e8f0fe]' : 'border-[#e5e7eb] hover:border-[#1a73e8]'}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "font-semibold text-[15px] text-[#1f2937] mb-1.5",
                                                children: t.displayName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                                lineNumber: 90,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-[#6b7280] leading-relaxed mb-2.5",
                                                children: localInfo?.description || t.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                                lineNumber: 93,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-4 text-xs text-[#9ca3af]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 11
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 25
                                                            }, this),
                                                            t.processingTime
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-[#1a73e8]",
                                                        children: t.fees
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                                lineNumber: 96,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                        lineNumber: 89,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 18,
                                        className: selected === t.applicationType ? 'text-[#1a73e8]' : 'text-[#d1d5db]'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                lineNumber: 88,
                                columnNumber: 17
                            }, this)
                        }, t.id, false, {
                            fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                            lineNumber: 76,
                            columnNumber: 15
                        }, this);
                    }),
                    templates.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card text-center py-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[#9ca3af] mb-2",
                                children: [
                                    "No applications available for this category in ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_LABELS"][state],
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-[#9ca3af]",
                                children: "We're working on adding more. Check back soon!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                        lineNumber: 114,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
                lineNumber: 72,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/applications/ApplicationTypeSelector.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_s(ApplicationTypeSelector, "UVgKo+q9ajPtsEqApNGDfrinfok=");
_c = ApplicationTypeSelector;
var _c;
__turbopack_context__.k.register(_c, "ApplicationTypeSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/applications/ApplicationWizard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ApplicationWizard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.mjs [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$StateSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/applications/StateSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$CategorySelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/applications/CategorySelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$ApplicationTypeSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/applications/ApplicationTypeSelector.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$FollowUpQuestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/applications/FollowUpQuestions.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$DocumentCheck$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/applications/DocumentCheck.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$FormPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/applications/FormPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pdf-generator.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const STEPS = [
    {
        id: 1,
        label: 'State'
    },
    {
        id: 2,
        label: 'Category'
    },
    {
        id: 3,
        label: 'Application'
    },
    {
        id: 4,
        label: 'Questions'
    },
    {
        id: 5,
        label: 'Documents'
    },
    {
        id: 6,
        label: 'Preview'
    },
    {
        id: 7,
        label: 'Download'
    }
];
function ApplicationWizard() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [wizardState, setWizardState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        selectedState: null,
        selectedCategory: null,
        selectedType: null,
        templateId: null,
        applicationId: null,
        followUpAnswers: {},
        documentCheckResults: [],
        generatedFormData: {},
        formFields: [],
        status: 'DRAFT'
    });
    const updateWizard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ApplicationWizard.useCallback[updateWizard]": (updates)=>{
            setWizardState({
                "ApplicationWizard.useCallback[updateWizard]": (prev)=>({
                        ...prev,
                        ...updates
                    })
            }["ApplicationWizard.useCallback[updateWizard]"]);
        }
    }["ApplicationWizard.useCallback[updateWizard]"], []);
    const goNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ApplicationWizard.useCallback[goNext]": ()=>{
            setCurrentStep({
                "ApplicationWizard.useCallback[goNext]": (s)=>Math.min(s + 1, STEPS.length)
            }["ApplicationWizard.useCallback[goNext]"]);
        }
    }["ApplicationWizard.useCallback[goNext]"], []);
    const goBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ApplicationWizard.useCallback[goBack]": ()=>{
            setCurrentStep({
                "ApplicationWizard.useCallback[goBack]": (s)=>Math.max(s - 1, 1)
            }["ApplicationWizard.useCallback[goBack]"]);
        }
    }["ApplicationWizard.useCallback[goBack]"], []);
    const stepContent = {
        1: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$StateSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            selected: wizardState.selectedState,
            onSelect: (state)=>{
                updateWizard({
                    selectedState: state,
                    selectedCategory: null,
                    selectedType: null
                });
                goNext();
            }
        }, void 0, false, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, this),
        2: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$CategorySelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            state: wizardState.selectedState,
            selected: wizardState.selectedCategory,
            onSelect: (cat)=>{
                updateWizard({
                    selectedCategory: cat,
                    selectedType: null
                });
                goNext();
            },
            onBack: goBack
        }, void 0, false, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 78,
            columnNumber: 7
        }, this),
        3: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$ApplicationTypeSelector$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            state: wizardState.selectedState,
            category: wizardState.selectedCategory,
            selected: wizardState.selectedType,
            onSelect: (type, templateId)=>{
                updateWizard({
                    selectedType: type,
                    templateId
                });
                goNext();
            },
            onBack: goBack
        }, void 0, false, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 89,
            columnNumber: 7
        }, this),
        4: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$FollowUpQuestions$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            state: wizardState.selectedState,
            applicationType: wizardState.selectedType,
            templateId: wizardState.templateId,
            answers: wizardState.followUpAnswers,
            onSubmit: (answers, appId)=>{
                updateWizard({
                    followUpAnswers: answers,
                    applicationId: appId
                });
                goNext();
            },
            onBack: goBack
        }, void 0, false, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this),
        5: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$DocumentCheck$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            applicationId: wizardState.applicationId,
            onComplete: (results)=>{
                updateWizard({
                    documentCheckResults: results
                });
                goNext();
            },
            onBack: goBack
        }, void 0, false, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 114,
            columnNumber: 7
        }, this),
        6: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$applications$2f$FormPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            applicationId: wizardState.applicationId,
            onGenerate: (formData, fields)=>{
                updateWizard({
                    generatedFormData: formData,
                    formFields: fields,
                    status: 'READY'
                });
                goNext();
            },
            onBack: goBack
        }, void 0, false, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 124,
            columnNumber: 7
        }, this),
        7: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DownloadStep, {
            applicationId: wizardState.applicationId,
            applicationType: wizardState.selectedType,
            state: wizardState.selectedState,
            onDone: ()=>router.push('/applications')
        }, void 0, false, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 138,
            columnNumber: 7
        }, this)
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-4xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-0",
                    children: STEPS.map((step, index)=>{
                        const isCompleted = currentStep > step.id;
                        const isActive = currentStep === step.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center flex-1 last:flex-none",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('step-circle', isActive && 'active', isCompleted && 'completed'),
                                            children: isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                                lineNumber: 167,
                                                columnNumber: 23
                                            }, this) : isActive ? step.id : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                                                size: 10,
                                                strokeWidth: 2
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                                lineNumber: 171,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                            lineNumber: 159,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-[10px] font-medium whitespace-nowrap', isActive ? 'text-[#1a73e8]' : isCompleted ? 'text-[#1a73e8]' : 'text-[#9ca3af]'),
                                            children: step.label
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                            lineNumber: 174,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                    lineNumber: 158,
                                    columnNumber: 17
                                }, this),
                                index < STEPS.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('step-connector mx-1 mb-5', isCompleted && 'completed')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                    lineNumber: 184,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, step.id, true, {
                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                            lineNumber: 157,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                mode: "wait",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: 20
                    },
                    animate: {
                        opacity: 1,
                        x: 0
                    },
                    exit: {
                        opacity: 0,
                        x: -20
                    },
                    transition: {
                        duration: 0.25
                    },
                    children: stepContent[currentStep]
                }, currentStep, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s(ApplicationWizard, "Q1ItxNgPY68CdZ3HcxfBCJylxCQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ApplicationWizard;
// ─────────────────────────────────────────────────────────────
// Download Step (Step 7)
// ─────────────────────────────────────────────────────────────
function DownloadStep({ applicationId, applicationType, state, onDone }) {
    _s1();
    const [downloading, setDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [downloaded, setDownloaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleDownload = async ()=>{
        setDownloading(true);
        try {
            const res = await fetch(`/api/applications/${applicationId}`);
            const app = await res.json();
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdf$2d$generator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateApplicationPdf"])({
                applicationId,
                applicationType,
                applicationTitle: app.template?.displayName || app.template?.title || applicationType.replace(/_/g, ' '),
                state,
                category: app.template?.category || app.category || 'General',
                formData: app.generatedFormData || {},
                formFields: (app.template?.formTemplate || []).map((f)=>({
                        fieldId: f.fieldId,
                        label: f.label,
                        section: f.section
                    })),
                verifiedDocuments: (app.documentCheckResults || []).map((d)=>({
                        type: d.documentType || d.type || 'Document',
                        name: d.label || d.name || 'Verified Certificate',
                        verified: d.status === 'AVAILABLE' || d.status === 'VERIFIED'
                    })),
                userName: app.user?.name || 'Citizen Applicant'
            });
            doc.save(`FormShield_${applicationType}_${new Date().toISOString().slice(0, 10)}.pdf`);
            setDownloaded(true);
            // Update status
            await fetch(`/api/applications/${applicationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: 'DOWNLOADED'
                })
            });
        } catch (error) {
            console.error('PDF generation error:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally{
            setDownloading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card text-center py-10",
        children: downloaded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                scale: 0.8,
                opacity: 0
            },
            animate: {
                scale: 1,
                opacity: 1
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-20 h-20 rounded-full bg-[#f0fdf4] flex items-center justify-center mx-auto mb-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                        size: 40,
                        className: "text-[#16a34a]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                        lineNumber: 276,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 275,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-heading-lg mb-2 text-[#16a34a]",
                    children: "Application Downloaded! 🎉"
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[#6b7280] mb-6 max-w-md mx-auto",
                    children: "Your completed application form has been saved. Please review it before submitting."
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 279,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-[#f0fdf4] rounded-xl p-5 max-w-lg mx-auto mb-6 text-left",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-[#15803d] mb-3",
                            children: "📋 Next Steps"
                        }, void 0, false, {
                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            className: "space-y-2",
                            children: [
                                'Print the downloaded PDF on A4 paper',
                                'Attach all required original documents',
                                'Sign in the applicant signature section',
                                'Submit at the designated office or online portal',
                                'Keep the acknowledgment slip for future reference'
                            ].map((step, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex items-start gap-2 text-sm text-[#166534]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-[#16a34a] flex-shrink-0",
                                            children: [
                                                i + 1,
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, this),
                                        step
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                    lineNumber: 286,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 282,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onDone,
                    className: "btn-primary",
                    children: [
                        "Back to My Applications ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            size: 15
                        }, void 0, false, {
                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                            lineNumber: 294,
                            columnNumber: 37
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 293,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 274,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-20 h-20 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-4xl",
                        children: "📄"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                        lineNumber: 300,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 299,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-heading-lg mb-2",
                    children: "Your Application is Ready!"
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 302,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[#6b7280] mb-2 max-w-lg mx-auto",
                    children: "Your form has been auto-filled with verified DigiLocker data and is ready for download. Review and download below."
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 303,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-[#9ca3af] mb-8",
                    children: "The PDF will look exactly like the official government form."
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 307,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleDownload,
                            disabled: downloading,
                            className: "btn-primary text-base px-8 py-3",
                            children: downloading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                        lineNumber: 318,
                                        columnNumber: 19
                                    }, this),
                                    "Generating PDF..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                lineNumber: 317,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: "⬇️ Download Application PDF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                                lineNumber: 322,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                            lineNumber: 311,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onDone,
                            className: "btn-secondary",
                            children: "Save & Exit"
                        }, void 0, false, {
                            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
                    lineNumber: 310,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
            lineNumber: 298,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/applications/ApplicationWizard.tsx",
        lineNumber: 272,
        columnNumber: 5
    }, this);
}
_s1(DownloadStep, "Kc/Z5KlBQHD8Jt08orutX/XmZUo=");
_c1 = DownloadStep;
var _c, _c1;
__turbopack_context__.k.register(_c, "ApplicationWizard");
__turbopack_context__.k.register(_c1, "DownloadStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/applications/CategorySelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CategorySelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/categories.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const CATEGORY_COLORS = {
    TRANSPORT_LICENSING: {
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        activeBg: 'bg-blue-50 border-blue-400',
        text: 'text-blue-600'
    },
    LOANS_FINANCE: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        activeBg: 'bg-emerald-50 border-emerald-400',
        text: 'text-emerald-600'
    },
    CERTIFICATES_DOCUMENTS: {
        bg: 'bg-purple-50',
        border: 'border-purple-100',
        activeBg: 'bg-purple-50 border-purple-400',
        text: 'text-purple-600'
    },
    EDUCATION_SCHOLARSHIPS: {
        bg: 'bg-orange-50',
        border: 'border-orange-100',
        activeBg: 'bg-orange-50 border-orange-400',
        text: 'text-orange-600'
    }
};
function CategorySelector({ state, selected, onSelect, onBack }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "btn-ghost mb-4 -ml-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 15
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/CategorySelector.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    "Back"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/CategorySelector.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-label mb-1.5",
                        children: "STEP 2 OF 7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/CategorySelector.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-heading-lg mb-1",
                        children: "Choose Application Category"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/CategorySelector.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#6b7280] text-sm",
                        children: [
                            "Applying in ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#1f2937]",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_LABELS"][state] || state
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/CategorySelector.tsx",
                                lineNumber: 55,
                                columnNumber: 23
                            }, this),
                            ". Select the category that matches your application."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/CategorySelector.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/CategorySelector.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$categories$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORIES"].map((cat, i)=>{
                    const colors = CATEGORY_COLORS[cat.code];
                    const isSelected = selected === cat.code;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                        initial: {
                            opacity: 0,
                            y: 12
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: i * 0.08
                        },
                        onClick: ()=>onSelect(cat.code),
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('card card-hover text-left p-5 border-2 cursor-pointer transition-all', isSelected ? `border-[#1a73e8] bg-[#e8f0fe]` : `border-[#e5e7eb] hover:border-[#1a73e8]`),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start justify-between mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', colors.bg, colors.border, 'border'),
                                        children: cat.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/CategorySelector.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        size: 18,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('mt-1', isSelected ? 'text-[#1a73e8]' : 'text-[#d1d5db]')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/CategorySelector.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/CategorySelector.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-[15px] text-[#1f2937] mb-1.5",
                                children: cat.displayName
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/CategorySelector.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[#6b7280] leading-relaxed",
                                children: cat.description
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/CategorySelector.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this)
                        ]
                    }, cat.code, true, {
                        fileName: "[project]/src/components/applications/CategorySelector.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/applications/CategorySelector.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/applications/CategorySelector.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = CategorySelector;
var _c;
__turbopack_context__.k.register(_c, "CategorySelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/applications/DocumentCheck.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DocumentCheck
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.mjs [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.mjs [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-alert.mjs [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/Toast.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function DocumentCheck({ applicationId, onComplete, onBack }) {
    _s();
    const { showToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const [checkResults, setCheckResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authorizing, setAuthorizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [checked, setChecked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [allMandatoryPresent, setAllMandatoryPresent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [appState, setAppState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [appType, setAppType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const runCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DocumentCheck.useCallback[runCheck]": async ()=>{
            setLoading(true);
            try {
                const res = await fetch(`/api/applications/${applicationId}/check-documents`, {
                    method: 'POST'
                });
                const data = await res.json();
                if (res.ok) {
                    setCheckResults(data.checkResults || []);
                    setAllMandatoryPresent(data.allMandatoryPresent);
                    setAppState(data.state || null);
                    setAppType(data.applicationType || null);
                    setChecked(true);
                } else {
                    showToast(data.error || 'Failed to check document requirements', 'error');
                }
            } catch (error) {
                console.error('Document check error:', error);
                showToast('Network error while verifying documents', 'error');
            } finally{
                setLoading(false);
            }
        }
    }["DocumentCheck.useCallback[runCheck]"], [
        applicationId,
        showToast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DocumentCheck.useEffect": ()=>{
            runCheck();
        }
    }["DocumentCheck.useEffect"], [
        runCheck
    ]);
    // Handle authorizing missing certificates through Setu DigiLocker
    const handleAuthorizeDocument = async (docType)=>{
        setAuthorizing(true);
        try {
            showToast('Creating DigiLocker consent session via Setu Gateway...', 'info');
            const res = await fetch('/api/digilocker/create-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    state: appState,
                    applicationType: appType,
                    docType: docType || undefined,
                    redirectPath: window.location.pathname
                })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                showToast(data.error || 'Failed to initiate DigiLocker session', 'error');
                setAuthorizing(false);
            }
        } catch (err) {
            showToast(err.message || 'Failed to connect to DigiLocker gateway', 'error');
            setAuthorizing(false);
        }
    };
    const available = checkResults.filter((r)=>r.status === 'AVAILABLE');
    const missing = checkResults.filter((r)=>r.status === 'MISSING');
    const needsReview = checkResults.filter((r)=>r.status === 'NEEDS_REVIEW');
    const optionalMissing = checkResults.filter((r)=>r.status === 'OPTIONAL_MISSING');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "btn-ghost mb-4 -ml-2 text-sm cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 15
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    "Back"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-label mb-1.5",
                        children: "STEP 5 OF 7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-heading-lg mb-1",
                        children: "Document Requirements Verification"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#6b7280] text-sm",
                        children: "We cross-check your DigiLocker documents against the strict statutory requirements for this application."
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card py-12 text-center space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            size: 28,
                            className: "text-[#1a73e8] animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-[#1f2937]",
                        children: "Verifying Official Document Records..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[#6b7280] max-w-sm mx-auto",
                        children: "Matching required certificates against your authenticated DigiLocker account."
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    checked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            scale: 0.98
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        className: `rounded-2xl p-5 mb-6 flex items-start gap-4 shadow-sm border ${allMandatoryPresent ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#fffbeb] border-[#fde68a]'}`,
                        children: [
                            allMandatoryPresent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                size: 24,
                                className: "text-[#16a34a] shrink-0 mt-0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                lineNumber: 135,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                size: 24,
                                className: "text-[#d97706] shrink-0 mt-0.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                lineNumber: 137,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-bold text-sm ${allMandatoryPresent ? 'text-[#15803d]' : 'text-[#92400e]'}`,
                                        children: allMandatoryPresent ? 'All Mandatory Documents Verified & Ready!' : `Action Required: ${missing.length} Mandatory Document(s) Missing`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-xs mt-1 leading-relaxed ${allMandatoryPresent ? 'text-[#166534]' : 'text-[#78350f]'}`,
                                        children: allMandatoryPresent ? 'All required certificates are present in your DigiLocker and will be used to auto-populate the official government template.' : 'To avoid application rejection, please authorize the missing certificates through your DigiLocker account.'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this),
                                    !allMandatoryPresent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAuthorizeDocument(),
                                            disabled: authorizing,
                                            className: "btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                    lineNumber: 158,
                                                    columnNumber: 23
                                                }, this),
                                                authorizing ? 'Connecting to DigiLocker...' : 'Authorize Missing Certificates via DigiLocker'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                            lineNumber: 153,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                        lineNumber: 152,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 125,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3 mb-6",
                        children: checkResults.map((result, i)=>{
                            const isAvail = result.status === 'AVAILABLE';
                            const isMiss = result.status === 'MISSING';
                            const isReview = result.status === 'NEEDS_REVIEW';
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    x: -8
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                },
                                transition: {
                                    delay: i * 0.04
                                },
                                className: `p-4 rounded-xl border transition-all ${isAvail ? 'bg-white border-emerald-200 shadow-sm' : isMiss ? 'bg-red-50/50 border-red-200' : isReview ? 'bg-amber-50/50 border-amber-200' : 'bg-gray-50 border-gray-200'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "shrink-0 mt-0.5",
                                                    children: [
                                                        isAvail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            size: 20,
                                                            className: "text-[#16a34a]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                            lineNumber: 193,
                                                            columnNumber: 37
                                                        }, this),
                                                        isMiss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            size: 20,
                                                            className: "text-[#dc2626]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                            lineNumber: 194,
                                                            columnNumber: 36
                                                        }, this),
                                                        isReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                            size: 20,
                                                            className: "text-[#f59e0b]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 38
                                                        }, this),
                                                        !isAvail && !isMiss && !isReview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                            size: 20,
                                                            className: "text-[#9ca3af]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 62
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-bold text-[#1f2937]",
                                                                    children: result.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                                    lineNumber: 201,
                                                                    columnNumber: 27
                                                                }, this),
                                                                result.mandatory ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-bold text-red-700 bg-red-100/80 px-2 py-0.5 rounded-full",
                                                                    children: "MANDATORY"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                                    lineNumber: 203,
                                                                    columnNumber: 29
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full",
                                                                    children: "OPTIONAL"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                                    lineNumber: 207,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-[#6b7280] mt-1",
                                                            children: result.note
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                            lineNumber: 191,
                                            columnNumber: 21
                                        }, this),
                                        isMiss && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleAuthorizeDocument(result.documentType),
                                            disabled: authorizing,
                                            className: "btn-secondary text-xs py-1.5 px-3 shrink-0 flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                    size: 11
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 25
                                                }, this),
                                                "Authorize"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                            lineNumber: 217,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                    lineNumber: 190,
                                    columnNumber: 19
                                }, this)
                            }, result.documentType + i, false, {
                                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                lineNumber: 175,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 168,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 flex-wrap items-center",
                        children: allMandatoryPresent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onComplete(checkResults),
                            className: "btn-primary text-sm py-2.5 px-6 shadow-md cursor-pointer",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                    lineNumber: 239,
                                    columnNumber: 17
                                }, this),
                                "Continue to Form Preview →"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                            lineNumber: 235,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleAuthorizeDocument(),
                                    disabled: authorizing,
                                    className: "btn-primary text-sm py-2.5 px-5 cursor-pointer flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                            lineNumber: 249,
                                            columnNumber: 19
                                        }, this),
                                        authorizing ? 'Connecting...' : 'Authorize on DigiLocker'
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: runCheck,
                                    disabled: loading,
                                    className: "btn-secondary text-sm py-2.5 px-4 cursor-pointer flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                            size: 14,
                                            className: loading ? 'animate-spin' : ''
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                            lineNumber: 257,
                                            columnNumber: 19
                                        }, this),
                                        "Re-check"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onComplete(checkResults),
                                    className: "btn-ghost text-xs text-[#9ca3af] hover:text-[#6b7280] ml-auto cursor-pointer",
                                    children: "Proceed with missing documents"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                                    lineNumber: 260,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                            lineNumber: 243,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/DocumentCheck.tsx",
                lineNumber: 122,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/applications/DocumentCheck.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(DocumentCheck, "1/vLEfPoKpPplmYLeaAcnWP3Rj4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$Toast$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = DocumentCheck;
var _c;
__turbopack_context__.k.register(_c, "DocumentCheck");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/applications/FollowUpQuestions.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FollowUpQuestions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function FollowUpQuestions({ state, applicationType, templateId, answers: initialAnswers, onSubmit, onBack }) {
    _s();
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [answers, setAnswers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAnswers);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FollowUpQuestions.useEffect": ()=>{
            fetch(`/api/templates/${templateId}`).then({
                "FollowUpQuestions.useEffect": (res)=>res.json()
            }["FollowUpQuestions.useEffect"]).then({
                "FollowUpQuestions.useEffect": (data)=>{
                    if (data.followUpQuestions) {
                        setQuestions(data.followUpQuestions);
                    }
                }
            }["FollowUpQuestions.useEffect"]).finally({
                "FollowUpQuestions.useEffect": ()=>setLoading(false)
            }["FollowUpQuestions.useEffect"]);
        }
    }["FollowUpQuestions.useEffect"], [
        templateId
    ]);
    const visibleQuestions = questions.filter((q)=>{
        if (!q.dependsOn) return true;
        const depAnswer = answers[q.dependsOn.questionId];
        return String(depAnswer).includes(q.dependsOn.value);
    });
    const validate = ()=>{
        const newErrors = {};
        for (const q of visibleQuestions){
            if (q.required && (answers[q.id] === undefined || answers[q.id] === '')) {
                newErrors[q.id] = 'This field is required';
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async ()=>{
        if (!validate()) return;
        setSubmitting(true);
        try {
            // Create or update application
            const res = await fetch('/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    state,
                    category: 'TRANSPORT_LICENSING',
                    applicationType
                })
            });
            const app = await res.json();
            // Update follow-up answers
            await fetch(`/api/applications/${app.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    followUpAnswers: answers,
                    status: 'IN_PROGRESS',
                    currentStep: 4
                })
            });
            onSubmit(answers, app.id);
        } catch (error) {
            console.error('Submit follow-up error:', error);
        } finally{
            setSubmitting(false);
        }
    };
    const setAnswer = (id, value)=>{
        setAnswers((prev)=>({
                ...prev,
                [id]: value
            }));
        if (errors[id]) setErrors((e)=>{
            const n = {
                ...e
            };
            delete n[id];
            return n;
        });
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "skeleton h-8 w-64 rounded"
                }, void 0, false, {
                    fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, this),
                [
                    1,
                    2,
                    3
                ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card space-y-2 p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "skeleton h-4 w-48 rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "skeleton h-10 w-full rounded"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 91,
                        columnNumber: 11
                    }, this))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
            lineNumber: 88,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "btn-ghost mb-4 -ml-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 15
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 103,
                        columnNumber: 9
                    }, this),
                    "Back"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-label mb-1.5",
                        children: "STEP 4 OF 7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-heading-lg mb-1",
                        children: "A Few More Details"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#6b7280] text-sm",
                        children: [
                            "Answer these questions to help us customize your application form accurately.",
                            questions.length,
                            " questions — takes about 2 minutes."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 mb-6",
                children: visibleQuestions.map((q, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: 8
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            delay: i * 0.06
                        },
                        className: "card p-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold text-[#1f2937]",
                                        children: [
                                            q.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#dc2626] mr-1",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                                lineNumber: 127,
                                                columnNumber: 32
                                            }, this),
                                            q.question
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this),
                                    q.helperText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 mt-1 text-xs text-[#6b7280]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                size: 11
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                                lineNumber: 132,
                                                columnNumber: 19
                                            }, this),
                                            q.helperText
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                        lineNumber: 131,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this),
                            q.type === 'text' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                className: `form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`,
                                placeholder: q.placeholder || '',
                                value: String(answers[q.id] || ''),
                                onChange: (e)=>setAnswer(q.id, e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this),
                            q.type === 'number' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                className: `form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`,
                                placeholder: q.placeholder || '',
                                value: String(answers[q.id] || ''),
                                onChange: (e)=>setAnswer(q.id, e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this),
                            q.type === 'date' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                className: `form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`,
                                value: String(answers[q.id] || ''),
                                onChange: (e)=>setAnswer(q.id, e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 159,
                                columnNumber: 15
                            }, this),
                            q.type === 'select' && q.options && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: `form-input ${errors[q.id] ? 'border-[#dc2626]' : ''}`,
                                value: String(answers[q.id] || ''),
                                onChange: (e)=>setAnswer(q.id, e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "",
                                        children: "Select an option..."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                        lineNumber: 173,
                                        columnNumber: 17
                                    }, this),
                                    q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: opt,
                                            children: opt
                                        }, opt, false, {
                                            fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                            lineNumber: 175,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 168,
                                columnNumber: 15
                            }, this),
                            q.type === 'radio' && q.options && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 mt-1",
                                children: q.options.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2.5 cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: q.id,
                                                value: opt,
                                                checked: answers[q.id] === opt,
                                                onChange: ()=>setAnswer(q.id, opt),
                                                className: "w-4 h-4 text-[#1a73e8]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                                lineNumber: 184,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm text-[#374151]",
                                                children: opt
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                                lineNumber: 192,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, opt, true, {
                                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                        lineNumber: 183,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 181,
                                columnNumber: 15
                            }, this),
                            errors[q.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "form-error mt-1",
                                children: errors[q.id]
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                lineNumber: 199,
                                columnNumber: 15
                            }, this)
                        ]
                    }, q.id, true, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: submitting,
                        className: "btn-primary",
                        children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                                    lineNumber: 212,
                                    columnNumber: 15
                                }, this),
                                " Saving..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, this) : 'Continue to Document Check →'
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onBack,
                        className: "btn-secondary",
                        children: "Back"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/applications/FollowUpQuestions.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(FollowUpQuestions, "nnU1dJbNBArbagKUWlTUYwZ9PX4=");
_c = FollowUpQuestions;
var _c;
__turbopack_context__.k.register(_c, "FollowUpQuestions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/applications/FormPreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FormPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.mjs [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-line.mjs [app-client] (ecmascript) <export default as Edit3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.mjs [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.mjs [app-client] (ecmascript) <export default as Shield>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function FormPreview({ applicationId, onGenerate, onBack }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [formFields, setFormFields] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingField, setEditingField] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [generated, setGenerated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const generateForm = async ()=>{
        setLoading(true);
        try {
            const res = await fetch(`/api/applications/${applicationId}/generate`, {
                method: 'POST'
            });
            const data = await res.json();
            setFormData(data.filledFormData || {});
            setFormFields(data.formFields || []);
            setGenerated(true);
        } catch (error) {
            console.error('Generate error:', error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FormPreview.useEffect": ()=>{
            generateForm();
        }
    }["FormPreview.useEffect"], [
        applicationId
    ]);
    const sections = formFields.reduce((acc, field)=>{
        const section = field.section || 'Other';
        if (!acc[section]) acc[section] = [];
        acc[section].push(field);
        return acc;
    }, {});
    const filledCount = Object.values(formData).filter(Boolean).length;
    const totalCount = formFields.filter((f)=>f.required).length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onBack,
                className: "btn-ghost mb-4 -ml-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 15
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    "Back"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/FormPreview.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-label mb-1.5",
                        children: "STEP 6 OF 7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-heading-lg mb-1",
                        children: "Review Your Application"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 61,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#6b7280] text-sm",
                        children: [
                            "Fields highlighted in",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block px-2 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8] text-xs font-medium",
                                children: "blue"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            ' ',
                            "were auto-filled from DigiLocker. You can edit any field before downloading."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/FormPreview.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card py-12 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-full bg-[#e8f0fe] flex items-center justify-center mx-auto mb-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            size: 28,
                            className: "text-[#1a73e8] animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/components/applications/FormPreview.tsx",
                            lineNumber: 72,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold text-[#1f2937] mb-2",
                        children: "Auto-filling Your Application..."
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#6b7280]",
                        children: "Extracting data from your DigiLocker documents."
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/FormPreview.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this) : generated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card mb-4 flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between text-xs font-medium mb-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#1a73e8]",
                                                children: "Auto-fill Progress"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                lineNumber: 83,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#6b7280]",
                                                children: [
                                                    filledCount,
                                                    "/",
                                                    totalCount,
                                                    " required fields"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                lineNumber: 84,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-2 bg-[#f3f4f6] rounded-full overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            initial: {
                                                width: 0
                                            },
                                            animate: {
                                                width: `${totalCount > 0 ? filledCount / totalCount * 100 : 0}%`
                                            },
                                            transition: {
                                                duration: 0.8,
                                                ease: 'easeOut'
                                            },
                                            className: "h-full bg-[#1a73e8] rounded-full"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/applications/FormPreview.tsx",
                                            lineNumber: 87,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 text-sm text-[#16a34a] font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        size: 15
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    "DigiLocker Verified"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 mb-5",
                        children: Object.entries(sections).map(([sectionName, fields], sIdx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: sIdx * 0.1
                                },
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-label mb-4 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-1 h-4 bg-[#1a73e8] rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                lineNumber: 112,
                                                columnNumber: 19
                                            }, this),
                                            sectionName
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                        children: fields.map((field)=>{
                                            const value = formData[field.fieldId] || '';
                                            const isAutoFilled = !!value && (field.sourceDocument || field.sourceField);
                                            const isEditing = editingField === field.fieldId;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: field.type === 'textarea' ? 'sm:col-span-2' : '',
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "form-label",
                                                        children: [
                                                            field.required && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#dc2626] mr-1",
                                                                children: "*"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                lineNumber: 124,
                                                                columnNumber: 46
                                                            }, this),
                                                            field.label,
                                                            isAutoFilled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-2 text-[10px] font-bold text-[#1a73e8] bg-[#e8f0fe] px-1.5 py-0.5 rounded",
                                                                children: "AUTO-FILLED"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                lineNumber: 127,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                        lineNumber: 123,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-2",
                                                            children: [
                                                                field.type === 'textarea' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                    className: "form-input flex-1 min-h-[80px] resize-none",
                                                                    value: value,
                                                                    autoFocus: true,
                                                                    onChange: (e)=>setFormData((prev)=>({
                                                                                ...prev,
                                                                                [field.fieldId]: e.target.value
                                                                            }))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                    lineNumber: 137,
                                                                    columnNumber: 33
                                                                }, this) : field.type === 'select' && field.options ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "form-input flex-1",
                                                                    value: value,
                                                                    autoFocus: true,
                                                                    onChange: (e)=>setFormData((prev)=>({
                                                                                ...prev,
                                                                                [field.fieldId]: e.target.value
                                                                            })),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: "",
                                                                            children: "Select..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                            lineNumber: 150,
                                                                            columnNumber: 35
                                                                        }, this),
                                                                        field.options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: o,
                                                                                children: o
                                                                            }, o, false, {
                                                                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                                lineNumber: 151,
                                                                                columnNumber: 61
                                                                            }, this))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                    lineNumber: 144,
                                                                    columnNumber: 33
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text',
                                                                    className: "form-input flex-1",
                                                                    value: value,
                                                                    autoFocus: true,
                                                                    onChange: (e)=>setFormData((prev)=>({
                                                                                ...prev,
                                                                                [field.fieldId]: e.target.value
                                                                            }))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                    lineNumber: 154,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setEditingField(null),
                                                                    className: "btn-primary px-3 py-2 text-xs",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                        size: 13
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                        lineNumber: 166,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                    lineNumber: 162,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 29
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            onClick: ()=>setEditingField(field.fieldId),
                                                            className: `form-input cursor-pointer hover:border-[#1a73e8] flex items-center justify-between group ${isAutoFilled ? 'form-field-autofilled' : !value ? 'border-dashed border-[#fca5a5] bg-[#fef2f2]' : ''}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: value ? '' : 'text-[#d1d5db] text-sm italic',
                                                                    children: value || (field.required ? 'Required — click to enter' : 'Optional — click to enter')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$line$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit3$3e$__["Edit3"], {
                                                                    size: 13,
                                                                    className: "text-[#9ca3af] group-hover:text-[#1a73e8] flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                                    lineNumber: 179,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                            lineNumber: 170,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                        lineNumber: 133,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, field.fieldId, true, {
                                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                                lineNumber: 122,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                        lineNumber: 115,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, sectionName, true, {
                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onGenerate(formData, formFields),
                                className: "btn-primary",
                                children: "Looks Good! Generate PDF →"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: generateForm,
                                className: "btn-ghost",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                                        lineNumber: 203,
                                        columnNumber: 15
                                    }, this),
                                    "Re-generate"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onBack,
                                className: "btn-ghost",
                                children: "Back"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/FormPreview.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/FormPreview.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/FormPreview.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/applications/FormPreview.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(FormPreview, "YecQpccrlTtZIk35fTbpoPrKfiI=");
_c = FormPreview;
var _c;
__turbopack_context__.k.register(_c, "FormPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/applications/StateSelector.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StateSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.mjs [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.mjs [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$states$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/states.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function StateSelector({ selected, onSelect }) {
    _s();
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$states$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ALL_STATES"].filter((s)=>s.displayName.toLowerCase().includes(search.toLowerCase()));
    const supported = filtered.filter((s)=>s.supported);
    const unsupported = filtered.filter((s)=>!s.supported);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-label mb-1.5",
                        children: "STEP 1 OF 7"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-heading-lg mb-1",
                        children: "Select Your State"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[#6b7280] text-sm",
                        children: [
                            "Choose the state where you want to submit your application. We currently support",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#1a73e8]",
                                children: [
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$states$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SUPPORTED_STATES"].length,
                                    " states"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            " with more coming soon."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/StateSelector.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        size: 16,
                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search for your state...",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        className: "form-input pl-9"
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/StateSelector.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            supported.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-label mb-3 flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-2 h-2 rounded-full bg-[#16a34a]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                lineNumber: 52,
                                columnNumber: 13
                            }, this),
                            "FULLY SUPPORTED STATES (",
                            supported.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 51,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6",
                        children: supported.map((state, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.95
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                transition: {
                                    delay: i * 0.04
                                },
                                onClick: ()=>onSelect(state.code),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('card card-hover text-left p-4 cursor-pointer border-2 transition-all', selected === state.code ? 'border-[#1a73e8] bg-[#e8f0fe]' : 'border-[#e5e7eb] hover:border-[#1a73e8]'),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl mb-2",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$states$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_EMOJI"][state.code] || '🏛️'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-semibold text-[#1f2937] leading-tight",
                                        children: state.displayName
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1 mt-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-1.5 h-1.5 rounded-full bg-[#16a34a]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-[#16a34a] font-medium",
                                                children: "Supported"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                                lineNumber: 78,
                                                columnNumber: 19
                                            }, this),
                                            selected === state.code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                size: 11,
                                                className: "ml-auto text-[#1a73e8]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                                lineNumber: 80,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, state.code, true, {
                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/StateSelector.tsx",
                lineNumber: 50,
                columnNumber: 9
            }, this),
            unsupported.length > 0 && !search && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-label mb-3 flex items-center gap-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            "COMING SOON — ",
                            unsupported.length,
                            " MORE STATES"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2",
                        children: unsupported.map((state)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-3 py-2.5 rounded-lg border border-[#e5e7eb] bg-[#f9fafb] opacity-60",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            size: 13,
                                            className: "text-[#9ca3af]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/applications/StateSelector.tsx",
                                            lineNumber: 103,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-[#6b7280]",
                                            children: state.displayName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/applications/StateSelector.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/applications/StateSelector.tsx",
                                    lineNumber: 102,
                                    columnNumber: 17
                                }, this)
                            }, state.code, false, {
                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-[#9ca3af] mt-3 text-center",
                        children: [
                            "Want your state supported sooner?",
                            ' ',
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "mailto:support@formshield.in",
                                className: "text-[#1a73e8] hover:underline",
                                children: "Request it here"
                            }, void 0, false, {
                                fileName: "[project]/src/components/applications/StateSelector.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/applications/StateSelector.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/StateSelector.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this),
            filtered.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center text-[#9ca3af] py-8",
                children: [
                    'No states found for "',
                    search,
                    '"'
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/applications/StateSelector.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/applications/StateSelector.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_s(StateSelector, "xMSft3/sbCidYXUzqinUsZIh+qY=");
_c = StateSelector;
var _c;
__turbopack_context__.k.register(_c, "StateSelector");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/categories.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORIES",
    ()=>CATEGORIES,
    "CATEGORY_APPLICATIONS",
    ()=>CATEGORY_APPLICATIONS
]);
const CATEGORIES = [
    {
        code: 'TRANSPORT_LICENSING',
        displayName: 'Transport & Licensing',
        icon: '🚗',
        description: 'Driving licenses, vehicle registration, and transport permits',
        color: 'blue'
    },
    {
        code: 'LOANS_FINANCE',
        displayName: 'Loans & Finance',
        icon: '💰',
        description: 'Education loans, personal loans, PM schemes, and financial assistance',
        color: 'green'
    },
    {
        code: 'CERTIFICATES_DOCUMENTS',
        displayName: 'Certificates & Documents',
        icon: '📄',
        description: 'Income, caste, domicile, birth, and character certificates',
        color: 'purple'
    },
    {
        code: 'EDUCATION_SCHOLARSHIPS',
        displayName: 'Education & Scholarships',
        icon: '🎓',
        description: 'Scholarships, admissions, and educational assistance programs',
        color: 'orange'
    }
];
const CATEGORY_APPLICATIONS = {
    TRANSPORT_LICENSING: [
        {
            code: 'DL_LEARNERS_PERMIT',
            displayName: "Driving License — Learner's Permit (New)",
            description: 'Apply for a new learner\'s license to start driving practice',
            estimatedTime: '1–7 days'
        },
        {
            code: 'DL_PERMANENT',
            displayName: 'Driving License — Permanent (New)',
            description: 'Apply for a permanent driving license after passing the driving test',
            estimatedTime: '7–30 days'
        },
        {
            code: 'DL_RENEWAL',
            displayName: 'Driving License — Renewal',
            description: 'Renew your existing driving license before or after expiry',
            estimatedTime: '7–15 days'
        },
        {
            code: 'RC_NEW_VEHICLE',
            displayName: 'Vehicle Registration Certificate (RC) — New Vehicle',
            description: 'Register your newly purchased vehicle with the RTO',
            estimatedTime: '7–30 days'
        },
        {
            code: 'RC_TRANSFER_OWNERSHIP',
            displayName: 'Vehicle Registration — Transfer of Ownership',
            description: 'Transfer vehicle registration when buying/selling a used vehicle',
            estimatedTime: '14–30 days'
        }
    ],
    LOANS_FINANCE: [
        {
            code: 'EDUCATION_LOAN',
            displayName: 'Education Loan (SBI/PNB format)',
            description: 'Apply for an education loan for higher studies in India or abroad',
            estimatedTime: '15–30 days'
        },
        {
            code: 'PERSONAL_LOAN',
            displayName: 'Personal Loan Application',
            description: 'Apply for a personal loan from a bank or NBFC',
            estimatedTime: '3–7 days'
        },
        {
            code: 'PM_MUDRA_LOAN',
            displayName: 'PM Mudra Loan (PMMY) Application',
            description: 'Apply for micro, small & medium enterprise loans under PMMY',
            estimatedTime: '7–15 days'
        },
        {
            code: 'PM_AWAS_YOJANA',
            displayName: 'PM Awas Yojana (Housing Loan)',
            description: 'Apply for credit-linked subsidy for housing under PMAY',
            estimatedTime: '30–60 days'
        }
    ],
    CERTIFICATES_DOCUMENTS: [
        {
            code: 'INCOME_CERTIFICATE',
            displayName: 'Income Certificate',
            description: 'Official certificate of annual family income issued by Tahsildar',
            estimatedTime: '7–15 days'
        },
        {
            code: 'CASTE_CERTIFICATE',
            displayName: 'Caste Certificate (SC/ST/OBC)',
            description: 'Official caste certificate for SC, ST, OBC, or EWS categories',
            estimatedTime: '15–30 days'
        },
        {
            code: 'DOMICILE_CERTIFICATE',
            displayName: 'Domicile / Residence Certificate',
            description: 'Certificate proving residence and domicile in the state',
            estimatedTime: '7–21 days'
        },
        {
            code: 'BIRTH_CERTIFICATE',
            displayName: 'Birth Certificate (Delayed Registration)',
            description: 'Register a birth that was not registered within the prescribed period',
            estimatedTime: '30–60 days'
        },
        {
            code: 'CHARACTER_CERTIFICATE',
            displayName: 'Character / Police Verification Certificate',
            description: 'Police verification certificate for employment or other purposes',
            estimatedTime: '15–30 days'
        }
    ],
    EDUCATION_SCHOLARSHIPS: [
        {
            code: 'POST_MATRIC_SCHOLARSHIP',
            displayName: 'Post-Matric Scholarship (State Scholarship)',
            description: 'State government scholarship for SC/ST/OBC students pursuing post-matric education',
            estimatedTime: '30–60 days'
        },
        {
            code: 'CENTRAL_SECTOR_SCHOLARSHIP',
            displayName: 'Central Sector Scholarship (NSP)',
            description: 'Merit-based scholarship from Ministry of Education via National Scholarship Portal',
            estimatedTime: '45–90 days'
        },
        {
            code: 'COLLEGE_ADMISSION',
            displayName: 'University / College Admission Application',
            description: 'Generic application form for university and college admissions',
            estimatedTime: '7–21 days'
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/states.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ALL_STATES",
    ()=>ALL_STATES,
    "STATE_EMOJI",
    ()=>STATE_EMOJI,
    "SUPPORTED_STATES",
    ()=>SUPPORTED_STATES
]);
const SUPPORTED_STATES = [
    {
        code: 'ANDHRA_PRADESH',
        displayName: 'Andhra Pradesh',
        capital: 'Amaravati',
        region: 'South India',
        supported: true
    },
    {
        code: 'TELANGANA',
        displayName: 'Telangana',
        capital: 'Hyderabad',
        region: 'South India',
        supported: true
    },
    {
        code: 'MAHARASHTRA',
        displayName: 'Maharashtra',
        capital: 'Mumbai',
        region: 'West India',
        supported: true
    },
    {
        code: 'TAMIL_NADU',
        displayName: 'Tamil Nadu',
        capital: 'Chennai',
        region: 'South India',
        supported: true
    },
    {
        code: 'KARNATAKA',
        displayName: 'Karnataka',
        capital: 'Bengaluru',
        region: 'South India',
        supported: true
    },
    {
        code: 'KERALA',
        displayName: 'Kerala',
        capital: 'Thiruvananthapuram',
        region: 'South India',
        supported: true
    },
    {
        code: 'UTTAR_PRADESH',
        displayName: 'Uttar Pradesh',
        capital: 'Lucknow',
        region: 'North India',
        supported: true
    },
    {
        code: 'DELHI',
        displayName: 'Delhi (NCT)',
        capital: 'New Delhi',
        region: 'North India',
        supported: true
    }
];
const ALL_STATES = [
    {
        code: 'ANDHRA_PRADESH',
        displayName: 'Andhra Pradesh',
        supported: true
    },
    {
        code: 'ARUNACHAL_PRADESH',
        displayName: 'Arunachal Pradesh',
        supported: false
    },
    {
        code: 'ASSAM',
        displayName: 'Assam',
        supported: false
    },
    {
        code: 'BIHAR',
        displayName: 'Bihar',
        supported: false
    },
    {
        code: 'CHHATTISGARH',
        displayName: 'Chhattisgarh',
        supported: false
    },
    {
        code: 'GOA',
        displayName: 'Goa',
        supported: false
    },
    {
        code: 'GUJARAT',
        displayName: 'Gujarat',
        supported: false
    },
    {
        code: 'HARYANA',
        displayName: 'Haryana',
        supported: false
    },
    {
        code: 'HIMACHAL_PRADESH',
        displayName: 'Himachal Pradesh',
        supported: false
    },
    {
        code: 'JHARKHAND',
        displayName: 'Jharkhand',
        supported: false
    },
    {
        code: 'KARNATAKA',
        displayName: 'Karnataka',
        supported: true
    },
    {
        code: 'KERALA',
        displayName: 'Kerala',
        supported: true
    },
    {
        code: 'MADHYA_PRADESH',
        displayName: 'Madhya Pradesh',
        supported: false
    },
    {
        code: 'MAHARASHTRA',
        displayName: 'Maharashtra',
        supported: true
    },
    {
        code: 'MANIPUR',
        displayName: 'Manipur',
        supported: false
    },
    {
        code: 'MEGHALAYA',
        displayName: 'Meghalaya',
        supported: false
    },
    {
        code: 'MIZORAM',
        displayName: 'Mizoram',
        supported: false
    },
    {
        code: 'NAGALAND',
        displayName: 'Nagaland',
        supported: false
    },
    {
        code: 'ODISHA',
        displayName: 'Odisha',
        supported: false
    },
    {
        code: 'PUNJAB',
        displayName: 'Punjab',
        supported: false
    },
    {
        code: 'RAJASTHAN',
        displayName: 'Rajasthan',
        supported: false
    },
    {
        code: 'SIKKIM',
        displayName: 'Sikkim',
        supported: false
    },
    {
        code: 'TAMIL_NADU',
        displayName: 'Tamil Nadu',
        supported: true
    },
    {
        code: 'TELANGANA',
        displayName: 'Telangana',
        supported: true
    },
    {
        code: 'TRIPURA',
        displayName: 'Tripura',
        supported: false
    },
    {
        code: 'UTTAR_PRADESH',
        displayName: 'Uttar Pradesh',
        supported: true
    },
    {
        code: 'UTTARAKHAND',
        displayName: 'Uttarakhand',
        supported: false
    },
    {
        code: 'WEST_BENGAL',
        displayName: 'West Bengal',
        supported: false
    },
    // Union Territories
    {
        code: 'DELHI',
        displayName: 'Delhi (NCT)',
        supported: true
    },
    {
        code: 'JAMMU_KASHMIR',
        displayName: 'Jammu & Kashmir',
        supported: false
    },
    {
        code: 'LADAKH',
        displayName: 'Ladakh',
        supported: false
    },
    {
        code: 'CHANDIGARH',
        displayName: 'Chandigarh',
        supported: false
    },
    {
        code: 'PUDUCHERRY',
        displayName: 'Puducherry',
        supported: false
    },
    {
        code: 'ANDAMAN',
        displayName: 'Andaman & Nicobar Islands',
        supported: false
    },
    {
        code: 'LAKSHADWEEP',
        displayName: 'Lakshadweep',
        supported: false
    },
    {
        code: 'DNH',
        displayName: 'Dadra & Nagar Haveli and Daman & Diu',
        supported: false
    }
];
const STATE_EMOJI = {
    ANDHRA_PRADESH: '🏛️',
    TELANGANA: '🌿',
    MAHARASHTRA: '🌾',
    TAMIL_NADU: '🎭',
    KARNATAKA: '🌺',
    KERALA: '🌴',
    UTTAR_PRADESH: '🕌',
    DELHI: '🏙️'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/pdf-generator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateApplicationPdf",
    ()=>generateApplicationPdf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.es.min.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
function generateApplicationPdf({ applicationId, applicationType, applicationTitle, state, category, formData, formFields, verifiedDocuments = [], userName = 'Citizen Applicant' }) {
    const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$es$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    const stateName = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STATE_LABELS"][state] || state;
    const categoryName = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CATEGORY_LABELS"][category] || category;
    // Header Banner
    doc.setFillColor(26, 115, 232); // #1a73e8
    doc.rect(0, 0, 210, 30, 'F');
    // Emblem/Brand
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('FORMSHIELD — PRE-SUBMISSION VERIFIED APPLICATION', 14, 13);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Official Form Extract | State: ${stateName} | Dept: ${categoryName} | Generated: ${new Date().toLocaleDateString('en-IN')}`, 14, 22);
    // Verification Badge Bar
    doc.setFillColor(240, 248, 255);
    doc.rect(14, 34, 182, 14, 'F');
    doc.setDrawColor(186, 230, 253);
    doc.setLineWidth(0.5);
    doc.rect(14, 34, 182, 14, 'S');
    doc.setTextColor(3, 105, 161);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text('DIGILOCKER VERIFIED CITIZEN SUBMISSION', 18, 41);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`Ref ID: ${applicationId.toUpperCase()} • Authenticated via Aadhaar/DigiLocker Integration`, 18, 46);
    // Application Details
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(applicationTitle, 14, 56);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text(`Applicant Name: ${userName}  •  Jurisdiction: Government of ${stateName}`, 14, 62);
    // Group fields by section
    const sections = {};
    formFields.forEach((field)=>{
        const sec = field.section || 'General Details';
        if (!sections[sec]) sections[sec] = [];
        const val = formData[field.fieldId] || formData[field.label] || '—';
        sections[sec].push({
            label: field.label,
            value: String(val)
        });
    });
    let yPos = 68;
    // Render Section Tables
    Object.entries(sections).forEach(([secName, fields])=>{
        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 115, 232);
        doc.text(secName.toUpperCase(), 14, yPos);
        yPos += 3;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
            startY: yPos,
            head: [],
            body: fields.map((f)=>[
                    f.label,
                    f.value
                ]),
            styles: {
                fontSize: 8.5,
                cellPadding: 3.5
            },
            columnStyles: {
                0: {
                    fontStyle: 'bold',
                    cellWidth: 70,
                    textColor: [
                        55,
                        65,
                        81
                    ],
                    fillColor: [
                        249,
                        250,
                        251
                    ]
                },
                1: {
                    cellWidth: 112,
                    textColor: [
                        17,
                        24,
                        39
                    ]
                }
            },
            theme: 'grid',
            margin: {
                left: 14,
                right: 14
            }
        });
        const lastY = doc.lastAutoTable?.finalY;
        yPos = (lastY !== undefined ? lastY : yPos + 25) + 6;
    });
    // Attached/Verified Documents Table
    if (verifiedDocuments.length > 0) {
        if (yPos > 230) {
            doc.addPage();
            yPos = 20;
        }
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(22, 101, 52); // Dark Green
        doc.text('VERIFIED DIGILOCKER ATTACHMENTS & CERTIFICATES', 14, yPos);
        yPos += 3;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2d$autotable$2f$dist$2f$jspdf$2e$plugin$2e$autotable$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(doc, {
            startY: yPos,
            head: [
                [
                    'Document Type',
                    'Document Description',
                    'DigiLocker Status'
                ]
            ],
            body: verifiedDocuments.map((d)=>[
                    d.type,
                    d.name,
                    d.verified ? 'Verified (Authentic)' : 'Provided'
                ]),
            styles: {
                fontSize: 8.5,
                cellPadding: 3
            },
            headStyles: {
                fillColor: [
                    240,
                    253,
                    244
                ],
                textColor: [
                    22,
                    101,
                    52
                ],
                fontStyle: 'bold'
            },
            columnStyles: {
                0: {
                    cellWidth: 50
                },
                1: {
                    cellWidth: 92
                },
                2: {
                    cellWidth: 40,
                    textColor: [
                        22,
                        101,
                        52
                    ],
                    fontStyle: 'bold'
                }
            },
            theme: 'grid',
            margin: {
                left: 14,
                right: 14
            }
        });
        const lastY = doc.lastAutoTable?.finalY;
        yPos = (lastY !== undefined ? lastY : yPos + 25) + 6;
    }
    // Legal Declaration
    if (yPos > 235) {
        doc.addPage();
        yPos = 20;
    }
    doc.setFillColor(249, 250, 251);
    doc.rect(14, yPos, 182, 38, 'F');
    doc.setDrawColor(229, 231, 235);
    doc.rect(14, yPos, 182, 38, 'S');
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(55, 65, 81);
    doc.text('SELF-DECLARATION & CITIZEN UNDERTAKING', 18, yPos + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(107, 114, 128);
    const declaration = 'I solemnly declare that all statements made and particulars furnished in this application are true, complete, and correct to the best of my knowledge and belief. I am aware that false statements or willful omission of material facts will lead to immediate rejection, forfeiture of processing fees, and potential prosecution under the Indian Penal Code.';
    doc.text(declaration, 18, yPos + 13, {
        maxWidth: 174
    });
    // Signature areas
    doc.setDrawColor(156, 163, 175);
    doc.line(18, yPos + 32, 75, yPos + 32);
    doc.line(125, yPos + 32, 182, yPos + 32);
    doc.setFontSize(7);
    doc.text('Signature of Applicant / Thumb Impression', 18, yPos + 36);
    doc.text('Date & Place of Submission', 125, yPos + 36);
    // Footer on all pages
    const totalPages = doc.getNumberOfPages();
    for(let i = 1; i <= totalPages; i++){
        doc.setPage(i);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(156, 163, 175);
        doc.text(`FormShield Intelligent Pre-Submission Verification • Application ID: ${applicationId} • Page ${i} of ${totalPages}`, 14, 290);
        doc.text('Legally Accepted Digitally Signed Copy', 150, 290);
    }
    return doc;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1qxet8e._.js.map