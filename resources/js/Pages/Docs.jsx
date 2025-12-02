import React, { useMemo } from "react";
import { usePage } from "@inertiajs/react";
import LayoutDokumentasi from "../Layouts/LayoutDokumentasi";
import dashboardMd from "../../../docs/DokumentasiUser/Dashboard.md?raw";
import masterDataMd from "../../../docs/DokumentasiUser/MasterData.md?raw";

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function renderMarkdown(md) {
    const src = String(md || "").replace(/\r\n?/g, "\n");
    const codeBlocks = [];
    const replaced = src.replace(/```([\s\S]*?)```/g, (_, code) => {
        const idx = codeBlocks.push(code) - 1;
        return `{{CODE_${idx}}}`;
    });
    let html = replaced
        .replace(
            /^###\s+(.*)$/gm,
            '<h3 style="font-weight:600;font-size:1.05rem;margin-top:0.75rem">$1</h3>'
        )
        .replace(
            /^##\s+(.*)$/gm,
            '<h2 style="font-weight:600;font-size:1.2rem;margin-top:1rem">$1</h2>'
        )
        .replace(
            /^#\s+(.*)$/gm,
            '<h1 style="font-weight:700;font-size:1.4rem;margin-top:0.5rem">$1</h1>'
        )
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>")
        .replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );
    const lines = html.split("\n");
    let inList = false;
    const out = [];
    for (const line of lines) {
        if (/^\s*-\s+/.test(line)) {
            if (!inList) {
                out.push(
                    '<ul style="list-style:disc;padding-left:1.25rem;margin:0.25rem 0 0.5rem">'
                );
                inList = true;
            }
            out.push(line.replace(/^\s*-\s+/, "<li>") + "</li>");
        } else {
            if (inList) {
                out.push("</ul>");
                inList = false;
            }
            if (line.trim())
                out.push(
                    '<p style="margin:0.25rem 0 0.5rem;line-height:1.75">' +
                        line +
                        "</p>"
                );
        }
    }
    if (inList) out.push("</ul>");
    html = out.join("\n");
    html = html.replace(/\{\{CODE_(\d+)\}\}/g, (_, i) => {
        const code = codeBlocks[Number(i)] || "";
        return `<pre style="background:#0f172a;color:#e5e7eb;border-radius:0.5rem;padding:0.75rem;overflow:auto"><code>${escapeHtml(
            code
        )}</code></pre>`;
    });
    return html;
}

function SimpleMarkdown({ source }) {
    const html = useMemo(() => renderMarkdown(source), [source]);
    return (
        <div
            className="space-y-4 text-[15px] leading-7 text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

export default function Docs() {
    const { props } = usePage();
    const rawMenu = props?.menu_hierarchy || [];
    const items = useMemo(() => {
        const out = [];
        const pushItem = (m, prefix = "") => {
            const id = `${prefix}${
                m?.id ?? m?.key ?? m?.label ?? m?.name ?? Math.random()
            }`;
            out.push({
                id,
                title: m?.label || m?.name || "Menu",
                description: m?.description || "",
                steps: m?.steps || [],
            });
            if (Array.isArray(m?.children)) {
                m.children.forEach((c, idx) => pushItem(c, `${id}-`));
            }
        };
        if (Array.isArray(rawMenu)) rawMenu.forEach((m) => pushItem(m));
        if (out.length === 0) {
            out.push({
                id: "dashboard",
                title: "Dashboard",
                description: "Panduan umum penggunaan aplikasi.",
                steps: [
                    "Navigasi melalui Top Navbar untuk mengakses modul.",
                    "Gunakan pencarian cepat untuk menemukan fitur.",
                    "Baca setiap langkah di panel kanan untuk detail.",
                ],
            });
            out.push({
                id: "master-data",
                title: "Master Data",
                description:
                    "Pengelolaan data dasar sistem (dokter, poli, obat, tarif, dll).",
                steps: [
                    "Buka menu Master Data di navbar.",
                    "Cari item yang ingin diubah melalui kolom pencarian.",
                    "Tambahkan, edit, atau hapus data sesuai kebutuhan.",
                ],
            });
        }
        return out;
    }, [rawMenu]);

    const section = String(props?.section || "");
    const render = ({ active }) => {
        const title = String(active?.title || "").toLowerCase();
        const md = title.includes("master data") ? masterDataMd : dashboardMd;
        return <SimpleMarkdown source={md} />;
    };

    return (
        <LayoutDokumentasi
            title="Dokumentasi Pengguna"
            items={items}
            render={render}
            initialSelect={section}
        />
    );
}
