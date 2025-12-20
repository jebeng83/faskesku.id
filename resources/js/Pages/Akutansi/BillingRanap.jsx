import React from "react";
import BillingPage from "./Billing";
import SidebarKasir from "@/Layouts/SidebarKasir";

export default function BillingRanapPage(props) {
    return (
        <BillingPage
            {...props}
            dataKasirRouteName="pembayaran.ranap"
            billingApiPath="/api/akutansi/billing-ranap"
        />
    );
}

BillingRanapPage.layout = (page) => (
    <SidebarKasir title="Billing Rawat Inap">{page}</SidebarKasir>
);
