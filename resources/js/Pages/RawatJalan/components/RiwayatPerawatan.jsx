import React from 'react';
import RiwayatKunjungan from './RiwayatKunjungan';

export default function RiwayatPerawatan({ token, noRkmMedis }) {
    return (
        <div className="space-y-4">
            <RiwayatKunjungan 
                token={token} 
                noRkmMedis={noRkmMedis} 
            />
        </div>
    );
}
