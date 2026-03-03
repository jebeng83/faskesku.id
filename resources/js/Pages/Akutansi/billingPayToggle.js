export const PAY_FULL_LABEL = "BAYAR CASH / DEBIT / QRIS";

export const togglePayFullState = (prev) => !prev;

export const resolveDefaultSelection = (currentValue, defaultValue) =>
    currentValue || defaultValue || "";
