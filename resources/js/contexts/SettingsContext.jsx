import React, { createContext, useContext, useState, useEffect } from 'react';
import { route } from 'ziggy-js';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        nama_instansi: 'Faskesku',
        has_logo: false,
        logo_url: null,
        has_wallpaper: false,
        wallpaper_url: null,
        loading: true,
        error: null
    });

    const fetchActiveSettings = async () => {
        try {
            setSettings(prev => ({ ...prev, loading: true, error: null }));
            
            console.log('Fetching settings from:', route('settings.active'));
            
            const response = await fetch(route('settings.active'), {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                }
            });

            console.log('Response received:', response);
            console.log('Response status:', response?.status);
            console.log('Response ok:', response?.ok);

            if (!response || !response.ok) {
                const errorMsg = response ? `HTTP error! status: ${response.status}` : 'No response received';
                throw new Error(errorMsg);
            }

            const result = await response.json();
            console.log('Settings result:', result);
            
            if (result.success && result.data) {
                setSettings(prev => ({
                    ...prev,
                    nama_instansi: result.data.nama_instansi || 'Faskesku',
                    has_logo: result.data.has_logo || false,
                    logo_url: result.data.logo_url || null,
                    has_wallpaper: result.data.has_wallpaper || false,
                    wallpaper_url: result.data.wallpaper_url || null,
                    loading: false,
                    error: null
                }));
            } else {
                // Use default values if no active setting
                setSettings(prev => ({
                    ...prev,
                    nama_instansi: 'Faskesku',
                    has_logo: false,
                    logo_url: null,
                    has_wallpaper: false,
                    wallpaper_url: null,
                    loading: false,
                    error: null
                }));
            }
        } catch (error) {
            console.error('Error fetching active settings:', error);
            setSettings(prev => ({
                ...prev,
                nama_instansi: 'Faskesku',
                has_logo: false,
                logo_url: null,
                has_wallpaper: false,
                wallpaper_url: null,
                loading: false,
                error: error.message
            }));
        }
    };

    const refreshSettings = () => {
        fetchActiveSettings();
    };

    useEffect(() => {
        fetchActiveSettings();
    }, []);

    const value = {
        settings,
        refreshSettings,
        isLoading: settings.loading,
        error: settings.error
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContext;