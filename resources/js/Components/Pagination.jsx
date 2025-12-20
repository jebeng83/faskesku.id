import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({
	links = [],
	from = 0,
	to = 0,
	total = 0,
	className = "px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 dark:border-gray-700",
}) {
	if (!links || links.length === 0) return null;

	return (
		<div className={className}>
			<div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
				<div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
					Menampilkan {from} sampai {to} dari {total} data
				</div>
				<div className="w-full sm:w-auto flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2">
					{links.map((link, index) => (
						<Link
							key={index}
							href={link.url || "#"}
							className={`px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg ${
								link.active
									? "bg-blue-600 text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							} ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
							dangerouslySetInnerHTML={{ __html: link.label }}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
