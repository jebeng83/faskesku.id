import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCopyFormData } from '../cpptSoapCopy.js';

test('buildCopyFormData tidak menyertakan elemen tombol', () => {
    const now = new Date(2026, 1, 13, 10, 20, 0);
    const row = {
        suhu_tubuh: '36.5',
        keluhan: 'Keluhan',
        button: '<button>Salin</button>',
        buttons: '<button>Salin</button>',
        actions: '<button>Hapus</button>',
    };

    const data = buildCopyFormData(row, now);

    assert.equal(data.jam_rawat, '10:20');
    assert.match(data.tgl_perawatan, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(data.keluhan, 'Keluhan');
    assert.equal(Object.prototype.hasOwnProperty.call(data, 'nip'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(data, 'button'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(data, 'buttons'), false);
    assert.equal(Object.prototype.hasOwnProperty.call(data, 'actions'), false);
});
