import test from 'node:test';
import assert from 'node:assert/strict';
import { getSamplingStatus } from './samplingStatus.js';

test('prioritas hasil tersedia dibanding sampel', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '2026-03-01',
        tgl_sampel: '2026-03-01',
        tgl_hasil: '2026-03-02'
    });
    assert.equal(result.status, 'Hasil Tersedia');
    assert.equal(result.flags.hasHasil, true);
});

test('mengembalikan sampel diterima saat tgl_sampel valid dan tgl_hasil kosong', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '2026-03-01',
        tgl_sampel: '2026-03-01',
        tgl_hasil: ''
    });
    assert.equal(result.status, 'Sampel Diterima');
    assert.equal(result.flags.hasSampel, true);
});

test('mengembalikan belum sampling saat hanya tgl_permintaan valid', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '2026-03-01',
        tgl_sampel: null,
        tgl_hasil: null
    });
    assert.equal(result.status, 'Belum Sampling');
    assert.equal(result.flags.hasPermintaan, true);
});

test('mengembalikan baru saat semua tanggal kosong', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '',
        tgl_sampel: '',
        tgl_hasil: ''
    });
    assert.equal(result.status, 'Baru');
    assert.equal(result.error, false);
});

test('menganggap placeholder tanggal sebagai kosong', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '0000-00-00',
        tgl_sampel: '0000-00-00',
        tgl_hasil: '0000-00-00'
    });
    assert.equal(result.status, 'Baru');
    assert.equal(result.error, false);
});

test('menganggap tahun awal sebagai kosong', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '0002-11-30',
        tgl_sampel: '0002-11-30',
        tgl_hasil: '0002-11-30'
    });
    assert.equal(result.status, 'Baru');
    assert.equal(result.error, false);
});

test('mengembalikan error saat tgl_hasil tidak valid', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '2026-03-01',
        tgl_sampel: '2026-03-01',
        tgl_hasil: '2026-02-30'
    });
    assert.equal(result.status, 'Tanggal Tidak Valid');
    assert.equal(result.error, true);
});

test('mengembalikan error saat format tanggal tidak sesuai', () => {
    const result = getSamplingStatus({
        tgl_permintaan: '01-03-2026',
        tgl_sampel: '',
        tgl_hasil: ''
    });
    assert.equal(result.status, 'Tanggal Tidak Valid');
    assert.equal(result.error, true);
});
