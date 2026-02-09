import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import LayoutUtama from '@/Pages/LayoutUtama';
import LanjutanRegistrasiSidebar from '@/Components/LanjutanRegistrasiSidebar';
import PatientEditModal from '@/Components/PatientEditModal';

export default function Edit({ patient }) {
    const [isOpen] = useState(true);

    const handleClose = () => {
        router.visit(route('patients.index'));
    };

    return (
        <LayoutUtama title="Registrasi Pasien" left={<LanjutanRegistrasiSidebar title="Registrasi Pasien" menuConfig={{ activeTab: 'pasien' }} />}> 
            <Head title={`Edit Pasien - ${patient?.nm_pasien || ''}`} />
            <PatientEditModal isOpen={isOpen} onClose={handleClose} patient={patient} onSuccess={() => {}} />
        </LayoutUtama>
    );
}
