import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ActionButtons({
	item,
	viewRoute,
	editRoute,
	onDelete,
	viewTitle = "Lihat Detail",
	editTitle = "Edit",
	deleteTitle = "Hapus",
	className = "flex gap-2",
}) {
	return (
		<div className={className}>
			{viewRoute && (
				<Link
					href={route(viewRoute, item.id)}
					className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
					title={viewTitle}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4 h-4"
					>
						<path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
						<path
							fillRule="evenodd"
							d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
							clipRule="evenodd"
						/>
					</svg>
				</Link>
			)}

			{editRoute && (
				<Link
					href={route(editRoute, item.id)}
					className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
					title={editTitle}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4 h-4"
					>
						<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
						<path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
					</svg>
				</Link>
			)}

			{onDelete && (
				<button
					onClick={() => onDelete(item)}
					className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
					title={deleteTitle}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="w-4 h-4"
					>
						<path
							fillRule="evenodd"
							d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209-.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
