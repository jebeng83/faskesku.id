export const statusRowColorMap = {
    Sudah: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30',
    Selesai: 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30',
    Belum: 'bg-white dark:bg-white hover:bg-gray-50 dark:hover:bg-gray-100',
    Proses: 'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30',
    Batal: 'bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30',
    Pending: 'bg-gray-100 dark:bg-gray-900/30 hover:bg-gray-200/80 dark:hover:bg-gray-900/40',
    'Berkas Diterima': 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30',
    Dirujuk: 'bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30',
    Meninggal: 'bg-gray-100 dark:bg-gray-900/30 hover:bg-gray-200/80 dark:hover:bg-gray-900/40',
    Dirawat: 'bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30',
    'Pulang Paksa': 'bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30',
    default: 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-800 dark:hover:to-gray-700',
};

export const getRowStatusClass = (status) => {
    if (!status) return statusRowColorMap.default;
    return statusRowColorMap[status] || statusRowColorMap.default;
};
