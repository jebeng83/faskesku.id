import test from 'node:test';
import assert from 'node:assert/strict';
import { PAY_FULL_LABEL, togglePayFullState, resolveDefaultSelection } from '../billingPayToggle.js';

test('togglePayFullState membalikkan nilai aktif', () => {
    assert.equal(togglePayFullState(true), false);
    assert.equal(togglePayFullState(false), true);
});

test('label bayar penuh sesuai spesifikasi', () => {
    assert.equal(PAY_FULL_LABEL, 'BAYAR CASH / DEBIT / QRIS');
});

test('resolveDefaultSelection memilih default saat nilai kosong', () => {
    assert.equal(resolveDefaultSelection('', 'DEF'), 'DEF');
    assert.equal(resolveDefaultSelection(null, 'DEF'), 'DEF');
    assert.equal(resolveDefaultSelection(undefined, 'DEF'), 'DEF');
});

test('resolveDefaultSelection mempertahankan nilai saat ada pilihan', () => {
    assert.equal(resolveDefaultSelection('AKUN', 'DEF'), 'AKUN');
});
