import React, { useEffect, useState } from "react";

function DataAlergi({ open = false, onClose = () => {}, jenis = "" }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ kd_alergi: "", nm_alergi: "" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
    load();
  }, [open, jenis]);

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("per_page", "100");
      if (jenis) params.set("kode_jenis", jenis);
      const res = await fetch(`/api/alergi?${params.toString()}`, {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error("Gagal memuat data");
      const js = await res.json();
      const arr = Array.isArray(js?.data) ? js.data : [];
      setItems(arr);
    } catch (e) {
      setError(e?.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ kd_alergi: "", nm_alergi: "" });
  };

  const generateNextKode = async () => {
    setSaving(true);
    setError(null);
    try {
      let res = await fetch("/api/alergi/next-code", {
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      if (res.status === 419) {
        await fetch("/sanctum/csrf-cookie", {
          credentials: "same-origin",
        }).catch(() => {});
        res = await fetch("/api/alergi/next-code", {
          headers: { Accept: "application/json" },
          credentials: "same-origin",
        });
      }
      if (!res.ok) throw new Error("Gagal generate kode");
      const js = await res.json();
      const next = js?.next_code || js?.kode || "";
      if (next) {
        setForm((f) => ({
          ...f,
          kd_alergi: String(next).toUpperCase().trim(),
        }));
      }
    } catch (e) {
      setError(e?.message || "Gagal generate kode");
    } finally {
      setSaving(false);
    }
  };

  const saveNew = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        kd_alergi: String(form.kd_alergi || "").trim(),
        nm_alergi: String(form.nm_alergi || "").trim(),
      };
      if (jenis) payload.kode_jenis = jenis;
      if (!payload.kd_alergi || !payload.nm_alergi) {
        setError("Kode dan nama alergi wajib diisi");
        setSaving(false);
        return;
      }
      const res = await fetch("/api/alergi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      resetForm();
      await load();
    } catch (e) {
      setError(e?.message || "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  const updateItem = async (item) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/alergi/${encodeURIComponent(item.kd_alergi)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "same-origin",
          body: JSON.stringify({
            nm_alergi: String(item.nm_alergi || "").trim(),
          }),
        }
      );
      if (!res.ok) throw new Error("Gagal memperbarui");
      setEditing(null);
      await load();
    } catch (e) {
      setError(e?.message || "Gagal memperbarui");
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/alergi/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      await load();
    } catch (e) {
      setError(e?.message || "Gagal menghapus");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-lg bg-[oklch(14.5%_0_0)] text-[oklch(98.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.6)] shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[oklch(84.1%_0.238_128.85_/_0.35)]">
          <div className="text-sm font-semibold">Master Alergi Pasien</div>
          <button
            type="button"
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.6)] hover:bg-[oklch(14.5%_0_0_/_0.9)]"
          >
            <span className="text-xs">✕</span>
          </button>
        </div>
        <div className="p-4 space-y-4 text-[12px]">
          <form onSubmit={saveNew} className="space-y-2">
            <div className="grid grid-cols-[7rem_1fr_6rem] gap-2 items-center">
              <div className="flex items-center gap-1">
                <span>Kode</span>
              </div>
              <input
                type="text"
                className="h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)]"
                value={form.kd_alergi}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    kd_alergi: e.target.value.toUpperCase(),
                  }))
                }
              />
              <button
                type="button"
                onClick={generateNextKode}
                className="h-8 px-2 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.6)] text-[oklch(84.1%_0.238_128.85)] hover:bg-[oklch(14.5%_0_0_/_0.9)] disabled:opacity-60"
                disabled={saving}
              >
                Auto
              </button>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-2 items-center">
              <span>Nama Alergi</span>
              <input
                type="text"
                className="h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)]"
                value={form.nm_alergi}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nm_alergi: e.target.value }))
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="h-8 px-3 rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] text-xs border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-60"
                disabled={saving}
              >
                Simpan
              </button>
            </div>
          </form>
          <div className="border-t border-[oklch(84.1%_0.238_128.85_/_0.25)] pt-3">
            <div className="text-[11px] mb-2">Daftar Alergi</div>
            <div className="max-h-64 overflow-y-auto divide-y divide-[oklch(84.1%_0.238_128.85_/_0.25)]">
              {loading ? (
                <div className="p-3 text-[11px]">Memuat…</div>
              ) : items.length === 0 ? (
                <div className="p-3 text-[11px]">Belum ada data.</div>
              ) : (
                items.map((it) => (
                  <div
                    key={it.kd_alergi}
                    className="p-2 flex items-center gap-3"
                  >
                    <div className="w-20 text-[11px] font-semibold">
                      {it.kd_alergi}
                    </div>
                    <div className="flex-1">
                      {editing === it.kd_alergi ? (
                        <input
                          value={it.nm_alergi || ""}
                          onChange={(e) =>
                            setItems((arr) =>
                              arr.map((x) =>
                                x.kd_alergi === it.kd_alergi
                                  ? { ...x, nm_alergi: e.target.value }
                                  : x
                              )
                            )
                          }
                          className="w-full h-8 px-2 rounded-md bg-[oklch(14.5%_0_0)] border border-[oklch(84.1%_0.238_128.85_/_0.45)]"
                        />
                      ) : (
                        <div className="text-[11px]">{it.nm_alergi}</div>
                      )}
                    </div>
                    {editing === it.kd_alergi ? (
                      <button
                        type="button"
                        onClick={() => updateItem(it)}
                        className="h-8 px-3 rounded-md bg-[oklch(84.1%_0.238_128.85)] text-[oklch(14.5%_0_0)] text-[11px] border border-[oklch(84.1%_0.238_128.85)] disabled:opacity-60"
                        disabled={saving}
                      >
                        Simpan
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setEditing(it.kd_alergi)}
                        className="h-8 w-8 rounded-md border border-[oklch(84.1%_0.238_128.85_/_0.45)] text-[oklch(84.1%_0.238_128.85)] hover:bg-[oklch(14.5%_0_0_/_0.9)] text-xs"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteItem(it.kd_alergi)}
                      className="h-8 w-8 rounded-md border border-red-500 text-red-500 hover:bg-[oklch(14.5%_0_0_/_0.9)] text-xs disabled:opacity-60"
                      disabled={saving}
                    >
                      Hapus
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
          {error && <div className="text-[11px] text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default DataAlergi;

