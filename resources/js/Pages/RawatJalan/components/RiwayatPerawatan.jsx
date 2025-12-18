import React from 'react';
import RiwayatKunjungan from './RiwayatKunjungan';

export default function RiwayatPerawatan({ token, noRkmMedis, onSelectNoRawat }) {
    return (
        <div className="space-y-4">
            <RiwayatKunjungan 
                token={token} 
                noRkmMedis={noRkmMedis} 
                onSelectNoRawat={onSelectNoRawat}
            />
        </div>
    );
}
