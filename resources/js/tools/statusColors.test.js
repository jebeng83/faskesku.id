import test from 'node:test';
import assert from 'node:assert/strict';
import { getRowStatusClass, statusRowColorMap } from './statusColors.js';

const expectedMap = {
    Sudah: statusRowColorMap.Sudah,
    Selesai: statusRowColorMap.Selesai,
    Belum: statusRowColorMap.Belum,
    Proses: statusRowColorMap.Proses,
    Batal: statusRowColorMap.Batal,
    Pending: statusRowColorMap.Pending,
    'Berkas Diterima': statusRowColorMap['Berkas Diterima'],
    Dirujuk: statusRowColorMap.Dirujuk,
    Meninggal: statusRowColorMap.Meninggal,
    Dirawat: statusRowColorMap.Dirawat,
    'Pulang Paksa': statusRowColorMap['Pulang Paksa'],
};

test('status row colors mapping returns expected classes', () => {
    Object.entries(expectedMap).forEach(([status, className]) => {
        assert.equal(getRowStatusClass(status), className);
    });
});

test('status row colors mapping falls back to default', () => {
    assert.equal(getRowStatusClass('Tidak Dikenal'), statusRowColorMap.default);
    assert.equal(getRowStatusClass(''), statusRowColorMap.default);
});
