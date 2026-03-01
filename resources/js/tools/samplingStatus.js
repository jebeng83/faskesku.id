export const getSamplingStatus = ({ tgl_permintaan, tgl_sampel, tgl_hasil }) => {
    const normalize = (value) => (value === null || value === undefined ? '' : String(value).trim());
    const isEmpty = (value) => {
        const normalized = normalize(value);
        const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (match && Number(match[1]) < 1900) {
            return true;
        }
        return (
            normalized === '' ||
            normalized === '-' ||
            normalized === '0000-00-00' ||
            normalized === '0000-00-00 00:00:00' ||
            normalized.startsWith('-0001-11-30') ||
            normalized === '1970-01-01' ||
            normalized === '1970-01-01 00:00:00'
        );
    };
    const validateDate = (value) => {
        if (isEmpty(value)) {
            return { valid: false, error: false };
        }
        const normalized = normalize(value);
        const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (!match) {
            return { valid: false, error: true };
        }
        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const date = new Date(Date.UTC(year, month - 1, day));
        const valid = date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
        return { valid, error: !valid };
    };

    const hasilCheck = validateDate(tgl_hasil);
    if (hasilCheck.error) {
        return { status: 'Tanggal Tidak Valid', error: true, flags: { hasPermintaan: false, hasSampel: false, hasHasil: false } };
    }
    if (hasilCheck.valid) {
        return { status: 'Hasil Tersedia', error: false, flags: { hasPermintaan: false, hasSampel: false, hasHasil: true } };
    }

    const sampelCheck = validateDate(tgl_sampel);
    if (sampelCheck.error) {
        return { status: 'Tanggal Tidak Valid', error: true, flags: { hasPermintaan: false, hasSampel: false, hasHasil: false } };
    }
    if (sampelCheck.valid) {
        return { status: 'Sampel Diterima', error: false, flags: { hasPermintaan: false, hasSampel: true, hasHasil: false } };
    }

    const permintaanCheck = validateDate(tgl_permintaan);
    if (permintaanCheck.error) {
        return { status: 'Tanggal Tidak Valid', error: true, flags: { hasPermintaan: false, hasSampel: false, hasHasil: false } };
    }
    if (permintaanCheck.valid) {
        return { status: 'Belum Sampling', error: false, flags: { hasPermintaan: true, hasSampel: false, hasHasil: false } };
    }

    return { status: 'Baru', error: false, flags: { hasPermintaan: false, hasSampel: false, hasHasil: false } };
};
