import React from "react";
import { Head } from "@inertiajs/react";
import SidebarRawatInap from "@/Layouts/SidebarRawatInap";
import UGD from "@/Pages/RawatInap/components/ugd";

export default function IGDIndex() {
  return (
    <SidebarRawatInap title="IGD">
      <Head title="IGD" />
      <UGD />
    </SidebarRawatInap>
  );
}

