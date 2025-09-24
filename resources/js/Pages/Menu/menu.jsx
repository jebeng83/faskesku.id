import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppLayout from '@/Layouts/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { 
    Search, 
    Home, 
    Database, 
    ClipboardList, 
    Hospital, 
    BarChart3, 
    Settings, 
    Users, 
    UserCheck, 
    Stethoscope, 
    UserCog, 
    Shield, 
    Menu as MenuIcon, 
    Cog,
    User,
    ChevronRight,
    Grid3X3,
    Activity
} from 'lucide-react';

export default function MenuDashboard({ auth, menus = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredMenus, setFilteredMenus] = useState([]);

    // Icon mapping for menu items
    const iconMap = {
        'fas fa-tachometer-alt': Home,
        'fas fa-database': Database,
        'fas fa-clipboard-list': ClipboardList,
        'fas fa-hospital': Hospital,
        'fas fa-chart-bar': BarChart3,
        'fas fa-cogs': Settings,
        'fas fa-users': Users,
        'fas fa-user-tie': UserCheck,
        'fas fa-stethoscope': Stethoscope,
        'fas fa-users-cog': UserCog,
        'fas fa-shield-alt': Shield,
        'fas fa-bars': MenuIcon,
        'fas fa-cog': Cog,
        'fas fa-user': User,
        'fas fa-pills': Activity,
        'fas fa-flask': Database,
    };

    // Dashboard menu items based on the image design
    const dashboardMenus = [
        {
            id: 1,
            name: 'Dashboard Rawat Jalan',
            slug: 'dashboard-rawat-jalan',
            icon: 'fas fa-clipboard-list',
            route: 'rawat-jalan.index',
            description: 'Pengelolaan pelayanan rawat jalan',
            is_active: true,
            bgColor: 'bg-blue-50 hover:bg-blue-100',
            iconColor: 'text-blue-600',
            borderColor: 'border-blue-200'
        },
        {
            id: 2,
            name: 'Dashboard Rawat Inap',
            slug: 'dashboard-rawat-inap',
            icon: 'fas fa-hospital',
            route: 'rawat-inap.index',
            description: 'Pengelolaan pelayanan rawat inap',
            is_active: true,
            bgColor: 'bg-green-50 hover:bg-green-100',
            iconColor: 'text-green-600',
            borderColor: 'border-green-200'
        },
        {
            id: 3,
            name: 'Dashboard Farmasi',
            slug: 'dashboard-farmasi',
            icon: 'fas fa-pills',
            route: 'farmasi.dashboard',
            description: 'Pengelolaan farmasi dan obat-obatan',
            is_active: true,
            bgColor: 'bg-red-50 hover:bg-red-100',
            iconColor: 'text-red-600',
            borderColor: 'border-red-200'
        },
        {
            id: 4,
            name: 'Dashboard Laboratorium',
            slug: 'dashboard-laboratorium',
            icon: 'fas fa-flask',
            route: 'laboratorium.dashboard',
            description: 'Pengelolaan laboratorium dan pemeriksaan',
            is_active: true,
            bgColor: 'bg-purple-50 hover:bg-purple-100',
            iconColor: 'text-purple-600',
            borderColor: 'border-purple-200'
        },
        {
            id: 5,
            name: 'Dashboard Manajemen',
            slug: 'dashboard-manajemen',
            icon: 'fas fa-cogs',
            route: 'menus.index',
            description: 'Pengelolaan sistem dan administrasi',
            is_active: true,
            bgColor: 'bg-orange-50 hover:bg-orange-100',
            iconColor: 'text-orange-600',
            borderColor: 'border-orange-200'
        },
        {
            id: 6,
            name: 'Dashboard Laporan',
            slug: 'dashboard-laporan',
            icon: 'fas fa-chart-bar',
            route: 'reports.index',
            description: 'Laporan dan analisis data',
            is_active: true,
            bgColor: 'bg-teal-50 hover:bg-teal-100',
            iconColor: 'text-teal-600',
            borderColor: 'border-teal-200'
        },
        {
            id: 7,
            name: 'Data Pegawai',
            slug: 'data-pegawai',
            icon: 'fas fa-users',
            route: 'pegawai.index',
            description: 'Pengelolaan data kepegawaian',
            is_active: true,
            bgColor: 'bg-indigo-50 hover:bg-indigo-100',
            iconColor: 'text-indigo-600',
            borderColor: 'border-indigo-200'
        }
    ];

    const menuData = dashboardMenus;

    useEffect(() => {
        // Filter menus based on search term
        const filterMenus = (menuList) => {
            return menuList.filter(menu => {
                if (!menu.is_active) return false;
                
                const matchesSearch = menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    menu.description?.toLowerCase().includes(searchTerm.toLowerCase());
                
                return matchesSearch;
            });
        };

        setFilteredMenus(filterMenus(menuData));
    }, [searchTerm]);

    const getIcon = (iconClass) => {
        const IconComponent = iconMap[iconClass] || Grid3X3;
        return <IconComponent className="h-8 w-8" />;
    };

    const handleMenuClick = (menu) => {
        if (menu.route) {
            router.visit(route(menu.route));
        }
    };

    const renderMenuCard = (menu) => {
        return (
            <Link
                key={menu.id}
                href={menu.route ? route(menu.route) : '#'}
                className={`block ${menu.bgColor} border ${menu.borderColor} rounded-xl p-6 transition-all duration-200 hover:shadow-lg hover:scale-105 group`}
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`${menu.iconColor} group-hover:scale-110 transition-transform duration-200`}>
                        {getIcon(menu.icon)}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                            {menu.name}
                        </h3>
                        {menu.description && (
                            <p className="text-sm text-gray-600 mt-2">
                                {menu.description}
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        );
    };

    const totalMenus = menuData.length;
    const activeMenus = filteredMenus.length;

    return (
        <AppLayout title="Menu Dashboard">
            <Head title="Menu Dashboard" />
            
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                                <Grid3X3 className="h-8 w-8 mr-3 text-blue-600" />
                                Menu Dashboard
                            </h1>
                                <p className="mt-2 text-gray-600">
                                    Akses cepat ke semua fitur dan modul aplikasi
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Badge variant="outline" className="text-sm">
                                    <Activity className="h-4 w-4 mr-1" />
                                    {activeMenus} dari {totalMenus} menu
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Cari menu..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full"
                            />
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredMenus.length > 0 ? (
                            filteredMenus.map(menu => renderMenuCard(menu))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Tidak ada menu ditemukan
                                </h3>
                                <p className="text-gray-500">
                                    Coba ubah kata kunci pencarian Anda
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Quick Stats */}
                    {searchTerm === '' && (
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center mb-2">
                                        <Database className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Master Data</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Kelola data dasar sistem
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center mb-2">
                                        <Hospital className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Pelayanan</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Modul pelayanan medis
                                    </p>
                                </CardContent>
                            </Card>
                            
                            <Card className="text-center">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center mb-2">
                                        <BarChart3 className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">Laporan</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Analisis dan statistik
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}