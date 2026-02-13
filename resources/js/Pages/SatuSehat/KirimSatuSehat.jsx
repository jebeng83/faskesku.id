import React, { useEffect, useMemo, useRef, useState } from "react";
import LayoutUtama from "@/Pages/LayoutUtama";
import { BridingMenu } from "@/Layouts/SidebarBriding";
import axios from "axios";
import Toaster from "@/Components/ui/Toaster";

function dateToYmd(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
}

export default function KirimSatuSehat() {
    const today = useMemo(() => dateToYmd(new Date()), []);
    const [name, setName] = useState("RAJAL");
    const [tglFrom, setTglFrom] = useState(today);
    const [tglTo, setTglTo] = useState(today);
    const [limitRows, setLimitRows] = useState(200);
    const [intervalSeconds, setIntervalSeconds] = useState(3);

    const [batchId, setBatchId] = useState("");
    const [batch, setBatch] = useState(null);
    const [recentItems, setRecentItems] = useState([]);

    const [items, setItems] = useState([]);
    const [itemsTotal, setItemsTotal] = useState(0);
    const [itemsStatus, setItemsStatus] = useState("");
    const [itemsStart, setItemsStart] = useState(0);
    const [itemsLimit, setItemsLimit] = useState(50);

    const [retryNoRawat, setRetryNoRawat] = useState("");

    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingStart, setLoadingStart] = useState(false);
    const [loadingRefresh, setLoadingRefresh] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [loadingRetry, setLoadingRetry] = useState(false);

    const [toasts, setToasts] = useState([]);
    const addToast = (type = "info", title = "", message = "", duration = 4000) => {
        const id = `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    };
    const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

    const pollRef = useRef(null);

    const [consoleLines, setConsoleLines] = useState([]);
    const [autoScroll, setAutoScroll] = useState(true);
    const consoleBoxRef = useRef(null);
    const seenItemIdsRef = useRef(new Set());

    const fmt = (v) => (v === null || v === undefined ? "" : String(v));

    const nowStamp = () => {
        const iso = new Date().toISOString();
        return iso.replace("T", " ").slice(0, 19) + "Z";
    };

    const appendConsoleLines = (lines) => {
        const list = Array.isArray(lines) ? lines.filter(Boolean).map(String) : [String(lines || "")].filter(Boolean);
        if (!list.length) return;

        setConsoleLines((prev) => {
            const next = [...prev, ...list];
            return next.length > 400 ? next.slice(next.length - 400) : next;
        });
    };

    const formatError = (err, fallback = "Terjadi kesalahan") => {
        const status = err?.response?.status;
        const data = err?.response?.data || {};
        let detail = data?.detail || data?.message || err?.message || fallback;
        const parts = [];
        if (status) parts.push(`Status ${status}`);
        if (data?.batch_id) parts.push(`Batch ${data.batch_id}`);
        if (parts.length) detail = `${detail} (${parts.join(", ")})`;
        return detail;
    };

    async function createBatch() {
        setLoadingCreate(true);
        try {
            const res = await axios.post("/api/satusehat/dispatch/batches", {
                name: name || undefined,
                scope: "rajal",
                tgl_from: tglFrom,
                tgl_to: tglTo,
                limit_rows: Number(limitRows) || 200,
                interval_seconds: Number(intervalSeconds) || 3,
            });

            const id = fmt(res?.data?.batch_id);
            if (!id) {
                addToast("error", "Gagal", "Batch ID tidak valid");
                return;
            }

            setBatchId(id);
            addToast("success", "Batch dibuat", `Batch #${id}`);
            appendConsoleLines([`${nowStamp()} $ dispatch create --scope=rajal --batch=${id}`]);
        } catch (e) {
            addToast("error", "Gagal", formatError(e, "Gagal membuat batch"));
            appendConsoleLines([`${nowStamp()} ! create failed: ${formatError(e, "Gagal membuat batch")}`]);
        } finally {
            setLoadingCreate(false);
        }
    }

    async function startBatch() {
        if (!batchId) return;
        setLoadingStart(true);
        try {
            await axios.post(`/api/satusehat/dispatch/batches/${encodeURIComponent(batchId)}/start`);
            addToast("success", "Diproses", `Batch #${batchId} dimulai`);
            appendConsoleLines([`${nowStamp()} $ dispatch start --batch=${batchId}`]);
            await refreshBatch();
        } catch (e) {
            addToast("error", "Gagal", formatError(e, "Gagal memulai batch"));
            appendConsoleLines([`${nowStamp()} ! start failed: ${formatError(e, "Gagal memulai batch")}`]);
        } finally {
            setLoadingStart(false);
        }
    }

    async function refreshBatch() {
        if (!batchId) return;
        setLoadingRefresh(true);
        try {
            const res = await axios.get(`/api/satusehat/dispatch/batches/${encodeURIComponent(batchId)}`);
            setBatch(res?.data?.batch || null);
            setRecentItems(Array.isArray(res?.data?.recent_items) ? res.data.recent_items : []);
        } catch (e) {
            addToast("error", "Gagal", formatError(e, "Gagal refresh batch"));
            appendConsoleLines([`${nowStamp()} ! refresh failed: ${formatError(e, "Gagal refresh batch")}`]);
        } finally {
            setLoadingRefresh(false);
        }
    }

    async function loadItems(nextStart = itemsStart) {
        if (!batchId) return;
        setLoadingItems(true);
        try {
            const res = await axios.get(`/api/satusehat/dispatch/batches/${encodeURIComponent(batchId)}/items`, {
                params: {
                    start: nextStart,
                    limit: itemsLimit,
                    status: itemsStatus || undefined,
                },
            });
            setItems(Array.isArray(res?.data?.list) ? res.data.list : []);
            setItemsTotal(Number(res?.data?.total || 0));
            setItemsStart(Number(res?.data?.start || 0));
        } catch (e) {
            addToast("error", "Gagal", formatError(e, "Gagal memuat item"));
        } finally {
            setLoadingItems(false);
        }
    }

    async function retryFailed() {
        if (!batchId) return;
        setLoadingRetry(true);
        try {
            const res = await axios.post(`/api/satusehat/dispatch/batches/${encodeURIComponent(batchId)}/retry-failed`, {
                no_rawat: retryNoRawat || undefined,
            });
            addToast("success", "Retry", `Item di-retry: ${fmt(res?.data?.retried_items)}`);
            appendConsoleLines([
                `${nowStamp()} $ dispatch retry-failed --batch=${batchId}${retryNoRawat ? ` --no_rawat=${retryNoRawat}` : ""}`,
            ]);
            await refreshBatch();
            await loadItems(0);
        } catch (e) {
            addToast("error", "Gagal", formatError(e, "Gagal retry"));
            appendConsoleLines([`${nowStamp()} ! retry failed: ${formatError(e, "Gagal retry")}`]);
        } finally {
            setLoadingRetry(false);
        }
    }

    useEffect(() => {
        if (!batchId) {
            seenItemIdsRef.current = new Set();
            setConsoleLines([]);
            return;
        }

        appendConsoleLines([`${nowStamp()} $ dispatch watch --batch=${batchId}`]);
    }, [batchId]);

    useEffect(() => {
        if (!recentItems.length) return;

        const newOnes = recentItems
            .filter((it) => {
                const id = Number(it?.id || 0);
                return id > 0 && !seenItemIdsRef.current.has(id);
            })
            .sort((a, b) => Number(a?.id || 0) - Number(b?.id || 0));

        if (!newOnes.length) return;

        const lines = newOnes.map((it) => {
            const status = fmt(it?.status || "-").toLowerCase();
            const badge = status === "done" ? "OK" : status === "failed" ? "ERR" : status === "processing" ? "RUN" : status;
            const noRawat = fmt(it?.no_rawat || "-");
            const step = fmt(it?.step || "-");
            const attempts = fmt(it?.attempts || "0");
            const updated = fmt(it?.updated_at || nowStamp());
            const err = fmt(it?.last_error || "");

            const base = `${updated} [${badge}] no_rawat=${noRawat} step=${step} attempts=${attempts}`;
            return err ? `${base} error=${err}` : base;
        });

        newOnes.forEach((it) => {
            const id = Number(it?.id || 0);
            if (id > 0) seenItemIdsRef.current.add(id);
        });

        appendConsoleLines(lines);
    }, [recentItems]);

    useEffect(() => {
        if (!autoScroll) return;
        const el = consoleBoxRef.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight;
    }, [consoleLines, autoScroll]);

    useEffect(() => {
        if (pollRef.current) {
            clearInterval(pollRef.current);
            pollRef.current = null;
        }

        const st = fmt(batch?.status || "").toLowerCase();
        if (batchId && (st === "running" || st === "pending")) {
            pollRef.current = setInterval(() => {
                refreshBatch();
            }, 4000);
        }

        return () => {
            if (pollRef.current) {
                clearInterval(pollRef.current);
                pollRef.current = null;
            }
        };
    }, [batchId, batch?.status]);

    useEffect(() => {
        if (!batchId) {
            setBatch(null);
            setRecentItems([]);
            setItems([]);
            setItemsTotal(0);
            return;
        }
        refreshBatch();
        loadItems(0);
        setItemsStart(0);
    }, [batchId]);

    const batchSummary = useMemo(() => {
        const b = batch || {};
        return {
            status: fmt(b.status),
            total: Number(b.total_items || 0),
            done: Number(b.done_items || 0),
            failed: Number(b.failed_items || 0),
            startedAt: fmt(b.started_at),
            finishedAt: fmt(b.finished_at),
            lastError: fmt(b.last_error),
        };
    }, [batch]);

    return (
        <LayoutUtama title="SatuSehat" left={<BridingMenu />}>
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Kirim SatuSehat</h1>
                        <p className="text-xs text-slate-500">Batch kirim data rajal + monitoring retry</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="text-sm font-semibold text-slate-800 mb-3">Buat Batch</div>
                                <div className="grid grid-cols-1 gap-3">
                                    <div>
                                        <label className="block text-xs text-slate-600 mb-1">Nama</label>
                                        <input
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                            placeholder="Contoh: RAJAL"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">Tgl From</label>
                                            <input
                                                type="date"
                                                value={tglFrom}
                                                onChange={(e) => setTglFrom(e.target.value)}
                                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">Tgl To</label>
                                            <input
                                                type="date"
                                                value={tglTo}
                                                onChange={(e) => setTglTo(e.target.value)}
                                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">Limit</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={2000}
                                                value={limitRows}
                                                onChange={(e) => setLimitRows(e.target.value)}
                                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-600 mb-1">Interval (detik)</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={60}
                                                value={intervalSeconds}
                                                onChange={(e) => setIntervalSeconds(e.target.value)}
                                                className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        disabled={loadingCreate}
                                        onClick={createBatch}
                                        className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                                            loadingCreate ? "bg-slate-400" : "bg-indigo-600 hover:bg-indigo-700"
                                        }`}
                                    >
                                        {loadingCreate ? "Memproses..." : "Buat Batch"}
                                    </button>

                                    <div>
                                        <label className="block text-xs text-slate-600 mb-1">Batch ID</label>
                                        <input
                                            value={batchId}
                                            onChange={(e) => setBatchId(e.target.value)}
                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                            placeholder="Isi batch ID untuk monitor"
                                        />
                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                type="button"
                                                disabled={!batchId || loadingStart}
                                                onClick={startBatch}
                                                className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                                                    !batchId || loadingStart
                                                        ? "bg-slate-400"
                                                        : "bg-emerald-600 hover:bg-emerald-700"
                                                }`}
                                            >
                                                {loadingStart ? "Memulai..." : "Start"}
                                            </button>
                                            <button
                                                type="button"
                                                disabled={!batchId || loadingRefresh}
                                                onClick={refreshBatch}
                                                className={`rounded-md px-3 py-2 text-sm font-medium ${
                                                    !batchId || loadingRefresh
                                                        ? "bg-slate-100 text-slate-400"
                                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                }`}
                                            >
                                                {loadingRefresh ? "Refresh..." : "Refresh"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-semibold text-slate-800">Status Batch</div>
                                    <div className="text-xs text-slate-500">#{batchId || "-"}</div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="rounded-lg bg-slate-50 p-3">
                                        <div className="text-[10px] text-slate-500">Status</div>
                                        <div className="text-sm font-semibold text-slate-800">{batchSummary.status || "-"}</div>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 p-3">
                                        <div className="text-[10px] text-slate-500">Total</div>
                                        <div className="text-sm font-semibold text-slate-800">{batchSummary.total}</div>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 p-3">
                                        <div className="text-[10px] text-slate-500">Done</div>
                                        <div className="text-sm font-semibold text-slate-800">{batchSummary.done}</div>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 p-3">
                                        <div className="text-[10px] text-slate-500">Failed</div>
                                        <div className="text-sm font-semibold text-slate-800">{batchSummary.failed}</div>
                                    </div>
                                </div>

                                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="rounded-lg bg-slate-50 p-3">
                                        <div className="text-[10px] text-slate-500">Started</div>
                                        <div className="text-xs text-slate-700 break-all">{batchSummary.startedAt || "-"}</div>
                                    </div>
                                    <div className="rounded-lg bg-slate-50 p-3">
                                        <div className="text-[10px] text-slate-500">Finished</div>
                                        <div className="text-xs text-slate-700 break-all">{batchSummary.finishedAt || "-"}</div>
                                    </div>
                                </div>

                                {batchSummary.lastError ? (
                                    <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 p-3">
                                        <div className="text-[10px] font-medium text-rose-700">Last error</div>
                                        <div className="text-xs text-rose-800 break-all">{batchSummary.lastError}</div>
                                    </div>
                                ) : null}

                                <div className="mt-4 flex flex-col md:flex-row md:items-end gap-2">
                                    <div className="flex-1">
                                        <label className="block text-xs text-slate-600 mb-1">Retry failed (no_rawat opsional)</label>
                                        <input
                                            value={retryNoRawat}
                                            onChange={(e) => setRetryNoRawat(e.target.value)}
                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                            placeholder="Contoh: 2025/04/26/000001"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        disabled={!batchId || loadingRetry}
                                        onClick={retryFailed}
                                        className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                                            !batchId || loadingRetry ? "bg-slate-400" : "bg-rose-600 hover:bg-rose-700"
                                        }`}
                                    >
                                        {loadingRetry ? "Retry..." : "Retry Failed"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-semibold text-slate-800">Aktivitas Terakhir</div>
                                    <div className="text-xs text-slate-500">Top 25</div>
                                </div>

                                <div className="overflow-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-xs text-slate-500 border-b">
                                                <th className="py-2 pr-3">No Rawat</th>
                                                <th className="py-2 pr-3">Step</th>
                                                <th className="py-2 pr-3">Status</th>
                                                <th className="py-2 pr-3">Attempts</th>
                                                <th className="py-2 pr-3">Updated</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentItems.length ? (
                                                recentItems.map((it) => (
                                                    <tr key={it.id} className="border-b last:border-b-0">
                                                        <td className="py-2 pr-3 text-xs text-slate-800 break-all">{fmt(it.no_rawat)}</td>
                                                        <td className="py-2 pr-3 text-xs text-slate-700">{fmt(it.step)}</td>
                                                        <td className="py-2 pr-3 text-xs text-slate-700">{fmt(it.status)}</td>
                                                        <td className="py-2 pr-3 text-xs text-slate-700">{fmt(it.attempts)}</td>
                                                        <td className="py-2 pr-3 text-xs text-slate-600">{fmt(it.updated_at)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="py-3 text-xs text-slate-500" colSpan={5}>
                                                        Belum ada data
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-semibold text-slate-800">Daftar Item</div>
                                    <div className="text-xs text-slate-500">Total: {itemsTotal}</div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-end gap-2 mb-3">
                                    <div className="flex-1">
                                        <label className="block text-xs text-slate-600 mb-1">Filter Status</label>
                                        <select
                                            value={itemsStatus}
                                            onChange={(e) => {
                                                setItemsStatus(e.target.value);
                                                setItemsStart(0);
                                            }}
                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                        >
                                            <option value="">Semua</option>
                                            <option value="pending">pending</option>
                                            <option value="processing">processing</option>
                                            <option value="done">done</option>
                                            <option value="failed">failed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-slate-600 mb-1">Limit</label>
                                        <select
                                            value={itemsLimit}
                                            onChange={(e) => {
                                                setItemsLimit(Number(e.target.value));
                                                setItemsStart(0);
                                            }}
                                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                                        >
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={!batchId || loadingItems}
                                        onClick={() => loadItems(itemsStart)}
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            !batchId || loadingItems
                                                ? "bg-slate-100 text-slate-400"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                    >
                                        {loadingItems ? "Memuat..." : "Muat"}
                                    </button>
                                </div>

                                <div className="overflow-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                            <tr className="text-left text-xs text-slate-500 border-b">
                                                <th className="py-2 pr-3">No Rawat</th>
                                                <th className="py-2 pr-3">Step</th>
                                                <th className="py-2 pr-3">Status</th>
                                                <th className="py-2 pr-3">Attempts</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.length ? (
                                                items.map((it) => (
                                                    <tr key={it.id} className="border-b last:border-b-0">
                                                        <td className="py-2 pr-3 text-xs text-slate-800 break-all">{fmt(it.no_rawat)}</td>
                                                        <td className="py-2 pr-3 text-xs text-slate-700">{fmt(it.step)}</td>
                                                        <td className="py-2 pr-3 text-xs text-slate-700">{fmt(it.status)}</td>
                                                        <td className="py-2 pr-3 text-xs text-slate-700">{fmt(it.attempts)}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="py-3 text-xs text-slate-500" colSpan={4}>
                                                        Belum ada data
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-3 flex items-center justify-between">
                                    <button
                                        type="button"
                                        disabled={!batchId || itemsStart <= 0 || loadingItems}
                                        onClick={() => {
                                            const next = Math.max(0, itemsStart - itemsLimit);
                                            setItemsStart(next);
                                            loadItems(next);
                                        }}
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            !batchId || itemsStart <= 0 || loadingItems
                                                ? "bg-slate-100 text-slate-400"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                    >
                                        Prev
                                    </button>
                                    <div className="text-xs text-slate-500">
                                        {itemsTotal
                                            ? `${itemsStart + 1}-${Math.min(itemsStart + itemsLimit, itemsTotal)} dari ${itemsTotal}`
                                            : "-"}
                                    </div>
                                    <button
                                        type="button"
                                        disabled={!batchId || itemsStart + itemsLimit >= itemsTotal || loadingItems}
                                        onClick={() => {
                                            const next = itemsStart + itemsLimit;
                                            setItemsStart(next);
                                            loadItems(next);
                                        }}
                                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                                            !batchId || itemsStart + itemsLimit >= itemsTotal || loadingItems
                                                ? "bg-slate-100 text-slate-400"
                                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <div className="text-sm font-semibold text-slate-800">Command Prompt</div>
                                <div className="text-xs text-slate-500">Proses pengiriman yang sedang berjalan</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setAutoScroll((v) => !v)}
                                    className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
                                >
                                    Auto-scroll: {autoScroll ? "ON" : "OFF"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        seenItemIdsRef.current = new Set();
                                        setConsoleLines([`${nowStamp()} $ clear`]);
                                    }}
                                    className="rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>

                        <div
                            className="rounded-lg border border-slate-200 bg-slate-950 text-slate-100"
                            style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
                        >
                            <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2">
                                <div className="text-[11px] text-slate-300">batch: {batchId || "-"}</div>
                                <div className="text-[11px] text-slate-400">status: {batchSummary.status || "-"}</div>
                            </div>
                            <div ref={consoleBoxRef} className="h-64 overflow-auto px-3 py-2">
                                {consoleLines.length ? (
                                    consoleLines.map((line, idx) => (
                                        <div key={`${idx}_${line}`} className="text-[12px] leading-5 text-emerald-200 break-all">
                                            {line}
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-[12px] leading-5 text-slate-400">Belum ada output</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Toaster toasts={toasts} onDismiss={removeToast} />
            </div>
        </LayoutUtama>
    );
}
