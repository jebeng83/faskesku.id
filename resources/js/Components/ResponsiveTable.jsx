import React from "react";
import Table from "./Table";

export default function ResponsiveTable({
	columns = [],
	data = [],
	keyField = "id",
	onRowClick = null,
	className = "",
	emptyMessage = "Tidak ada data",
	emptyIcon = null,
	cardClassName = "",
	mobileCardRender = null,
}) {
	// Default mobile card render function
	const defaultMobileCardRender = (item) => (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					{columns.map((column, index) => {
						if (column.hideOnMobile) return null;

						return (
							<div key={index} className="mb-2 last:mb-0">
								<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
									{column.header}:
								</span>
								<div className="mt-1">
									{column.render ? column.render(item) : item[column.key]}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);

	return (
		<>
			{/* Desktop Table View */}
			<div className="hidden md:block">
				<Table
					columns={columns}
					data={data}
					keyField={keyField}
					onRowClick={onRowClick}
					className={className}
					emptyMessage={emptyMessage}
					emptyIcon={emptyIcon}
				/>
			</div>

			{/* Mobile Card View */}
			<div className="md:hidden">
				{data.length === 0 ? (
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
						{emptyIcon && (
							<div className="mb-4 flex justify-center">{emptyIcon}</div>
						)}
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
							{emptyMessage}
						</h3>
					</div>
				) : (
					<div className={`space-y-4 ${cardClassName}`}>
						{data.map((item, index) => (
							<div
								key={item[keyField] || index}
								className={`${onRowClick ? "cursor-pointer" : ""}`}
								onClick={() => onRowClick && onRowClick(item)}
							>
								{mobileCardRender
									? mobileCardRender(item)
									: defaultMobileCardRender(item)}
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
