import React from "react"
import NewResep from "@/Pages/RawatJalan/NewComponen/NewResep"

export default function Resep({ token = "", noRkmMedis = "", noRawat = "", kdPoli = "", onResepSaved = null }) {
  return <NewResep key={noRawat || ""} token={token} noRkmMedis={noRkmMedis} noRawat={noRawat} kdPoli={kdPoli} status="ranap" onResepSaved={onResepSaved} />
}
