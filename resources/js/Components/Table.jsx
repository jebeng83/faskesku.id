import React from "react";

export default function Table({
	columns = [],
	data = [],
	keyField = "id",
	onRowClick = null,
	className = "",
	emptyMessage = "Tidak ada data",
	emptyIcon = null,
}) {
	return (
		<div
			className={`bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg ${className}`}
		>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
					<thead className="bg-gray-50 dark:bg-gray-700">
						<tr>
							{columns.map((column, index) => (
								<th
									key={index}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
								>
									{column.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
						{data.length === 0 ? (
							<tr>
								<td colSpan={columns.length} className="px-6 py-12 text-center">
									<div className="flex flex-col items-center">
										{emptyIcon && <div className="mb-4">{emptyIcon}</div>}
										<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
											{emptyMessage}
										</h3>
									</div>
								</td>
							</tr>
						) : (
							data.map((row, rowIndex) => (
								<tr
									key={row[keyField] || rowIndex}
									className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
										onRowClick ? "cursor-pointer" : ""
									}`}
									onClick={() => onRowClick && onRowClick(row)}
								>
									{columns.map((column, colIndex) => (
										<td
											key={colIndex}
											className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
										>
											{column.render ? column.render(row) : row[column.key]}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
