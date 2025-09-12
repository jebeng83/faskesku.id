import React from "react";

export default function AddressDisplay({
	selectedWilayah,
	loading = false,
	className = "",
}) {
	if (loading) {
		return (
			<div
				className={`p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border ${className}`}
			>
				<div className="flex items-center gap-2">
					<svg
						className="animate-spin h-4 w-4 text-gray-400"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<span className="text-sm text-gray-500 dark:text-gray-400">
						Memuat alamat...
					</span>
				</div>
			</div>
		);
	}

	if (!selectedWilayah) {
		return (
			<div
				className={`p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 ${className}`}
			>
				<div className="text-sm text-gray-500 dark:text-gray-400">
					Pilih kelurahan/desa untuk melihat alamat lengkap
				</div>
			</div>
		);
	}

	const { village, district, regency, province } = selectedWilayah;

	return (
		<div
			className={`p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 ${className}`}
		>
			<div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
				Alamat yang dipilih:
			</div>
			<div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
				<div className="flex items-center gap-2">
					<span className="font-medium">Kelurahan/Desa:</span>
					<span>{village}</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-medium">Kecamatan:</span>
					<span>{district}</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-medium">Kabupaten/Kota:</span>
					<span>{regency}</span>
				</div>
				<div className="flex items-center gap-2">
					<span className="font-medium">Provinsi:</span>
					<span>{province}</span>
				</div>
			</div>
		</div>
	);
}
