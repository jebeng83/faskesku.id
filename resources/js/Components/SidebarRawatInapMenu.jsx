import React, { useMemo, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";
import { Gauge, Bed, Activity, Users, Receipt, ChevronDown, ChevronRight, Home } from "lucide-react";

export default function SidebarRawatInapMenu({ title = "Rawat Inap" }) {
  const { url } = usePage();
  const [openRanap, setOpenRanap] = useState(true);

  const items = useMemo(
    () => [
      { label: "Dashboard", href: route("dashboard"), icon: <Gauge className="w-4 h-4" /> },
      { label: "Menu", href: route("rawat-inap.index"), icon: <Home className="w-4 h-4" /> },
      {
        label: "Rawat Inap",
        icon: <Bed className="w-4 h-4" />,
        children: [
          { label: "UGD", href: route("igd.index"), icon: <Activity className="w-4 h-4" /> },
          { label: "Bangsal", href: route("rawat-inap.bangsal"), icon: <Activity className="w-4 h-4" /> },
          { label: "Kamar", href: "/rawat-inap/kamar", icon: <Bed className="w-4 h-4" /> },
          { label: "Set Harga Kamar", href: "/rawat-inap/set-harga-kamar", icon: <Receipt className="w-4 h-4" /> },
          { label: "Setting Kamar Inap", href: "/rawat-inap/setting-kamar-inap", icon: <Activity className="w-4 h-4" /> },
          { label: "Pasien Inap", href: route("rawat-inap.index"), icon: <Users className="w-4 h-4" /> },
        ],
      },
    ],
    []
  );

  const isActive = (href) => {
    try {
      const u = new URL(href, window.location.origin);
      return (url || window.location.pathname).startsWith(u.pathname);
    } catch {
      return (url || window.location.pathname).startsWith(href);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-3 text-white">
      <div className="h-14 flex items-center px-3 gap-2">
        <Bed className="w-5 h-5" />
        <span className="font-semibold truncate">{title}</span>
      </div>
      <nav className="px-2 py-2 space-y-1 text-white/90">
        {items.map((item, idx) => (
          <div key={idx}>
            {!item.children ? (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href) ? "bg-white/20 text-white" : "hover:bg-white/10"
                }`}
              >
                <span className="text-white/90">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ) : (
              <div className="mb-1">
                <button
                  type="button"
                  onClick={() => setOpenRanap((v) => !v)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10"
                >
                  <span className="text-white/90">{item.icon}</span>
                  <span className="text-sm font-semibold flex-1 text-left">{item.label}</span>
                  {openRanap ? (
                    <ChevronDown className="w-4 h-4 text-white/70" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/70" />
                  )}
                </button>
                {openRanap && (
                  <div className="mt-1 ml-2 space-y-1">
                    {item.children.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        href={child.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          isActive(child.href) ? "bg-white/20 text-white" : "hover:bg-white/10"
                        }`}
                      >
                        <span className="text-white/90">{child.icon}</span>
                        <span className="text-sm">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
