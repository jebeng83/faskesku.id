import React from "react";
import LayoutUtama from "@/Pages/LayoutUtama";
import { BridingMenu } from "@/Layouts/SidebarBriding";

export default function SatuSehat() {
    return (
        <LayoutUtama title="SatuSehat" left={<BridingMenu />}>
            <div />
        </LayoutUtama>
    );
}
