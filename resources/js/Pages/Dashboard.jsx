import React from 'react';
import AppLayout from '../Layouts/AppLayout.jsx';

export default function Dashboard() {
    return (
        <AppLayout title="Faskesku">
            <div className="space-y-6 -mt-6 -mx-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400">Selamat datang di SIMRS Faskesku</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Export Data
                        </button>
                    </div>
                </div>

                {/* Summary Cards - Gradient Able Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Orders Received */}
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Orders Received</p>
                                <p className="text-3xl font-bold mt-1">486</p>
                                <p className="text-blue-100 text-xs mt-1">Completed Orders 351</p>
                            </div>
                            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total Sales */}
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Sales</p>
                                <p className="text-3xl font-bold mt-1">1641</p>
                                <p className="text-green-100 text-xs mt-1">This Month 213</p>
                            </div>
                            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Revenue */}
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Revenue</p>
                                <p className="text-3xl font-bold mt-1">$42,562</p>
                                <p className="text-orange-100 text-xs mt-1">This Month $5,032</p>
                            </div>
                            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Total Profit */}
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-pink-100 text-sm font-medium">Total Profit</p>
                                <p className="text-3xl font-bold mt-1">$9,562</p>
                                <p className="text-pink-100 text-xs mt-1">This Month $542</p>
                            </div>
                            <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Unique Visitor Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Unique Visitor</h3>
                        <div className="h-64 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L6 10.5c-.47-.62-1.21-.99-2.01-.99H2.46c-.8 0-1.54.37-2.01.99L0 10.5v9.5h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z"/>
                                    </svg>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Chart akan ditampilkan di sini</p>
                            </div>
                        </div>
                    </div>

                    {/* Customers Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customers</h3>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">826</div>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="text-green-600 text-sm font-medium">8.2%</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
                                    <path d="M7 14l5-5 5 5z"/>
                                </svg>
                            </div>
                            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">82%</span>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">674 New</span>
                                </div>
                                <div className="flex items-center justify-center gap-2 text-sm">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-gray-600 dark:text-gray-400">182 Return</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Subscribers */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                </svg>
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">8.62k</h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">Subscribers</p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs mb-4">Your main list is growing</p>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                                Manage List
                            </button>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg lg:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Feed</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">E</span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-gray-900 dark:text-white text-sm">File Eddie</span>
                                        <span className="text-gray-500 dark:text-gray-500 text-xs">uploaded new files: 2 hours ago</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                        hii @everone Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                    </p>
                                    <div className="flex gap-2">
                                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-xs">
                                            <div className="font-medium text-gray-900 dark:text-white">Old Scooter</div>
                                            <div className="text-gray-500 dark:text-gray-500">PNG-100KB</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-xs">
                                            <div className="font-medium text-gray-900 dark:text-white">Wall Art</div>
                                            <div className="text-gray-500 dark:text-gray-500">PNG-150KB</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 text-xs">
                                            <div className="font-medium text-gray-900 dark:text-white">Microphone</div>
                                            <div className="text-gray-500 dark:text-gray-500">PNG-150KB</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


