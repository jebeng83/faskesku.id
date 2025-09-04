import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function AuthenticatedLayout({ children, title }) {
    return (
        <AppLayout title={title}>
            {children}
        </AppLayout>
    );
}