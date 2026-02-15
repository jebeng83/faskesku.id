import React from "react";
import NewPermintaanLab from "@/Pages/RawatJalan/NewComponen/NewPermintaanLab";

export default function PermintaanLab({ token = "", noRkmMedis = "", noRawat = "" }) {
    return <NewPermintaanLab token={token} noRkmMedis={noRkmMedis} noRawat={noRawat} status="ranap" />;
}
