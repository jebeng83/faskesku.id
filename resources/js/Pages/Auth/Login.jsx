import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);
	const [errors, setErrors] = useState({});
	const [processing, setProcessing] = useState(false);

	function submit(e) {
		e.preventDefault();

		// Debug log
		console.log("Form submitted:", { username, password, remember });

		setProcessing(true);
		setErrors({});

		router.post(
			"/login",
			{ username, password, remember },
			{
				onError: (e) => {
					console.error("Login error:", e);
					setErrors(e);
					setProcessing(false);
				},
				onSuccess: () => {
					console.log("Login successful");
					setProcessing(false);
				},
				onFinish: () => {
					setProcessing(false);
				},
			}
		);
	}

	return (
		<div className="min-h-screen relative">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{ backgroundImage: "url('/img/wallpaper.jpg')" }}
			/>
			<div className="absolute inset-0 bg-black/55" />

			<div className="relative z-10 min-h-screen flex items-center justify-center px-4">
				<div className="w-full max-w-md">
					<div className="bg-white/95 dark:bg-gray-800/90 backdrop-blur rounded-xl shadow-xl border border-white/20 dark:border-gray-700 px-6 py-6 sm:px-8 sm:py-8">
						<h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
							Login
						</h1>
						<div className="mt-1 h-0.5 w-24 bg-gray-900/80 dark:bg-white/80" />

						<form className="mt-8 space-y-5" onSubmit={submit}>
							<div>
								<label className="sr-only">Username</label>
								<div className="flex items-center gap-2 border-b border-gray-300 py-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5 text-gray-500"
									>
										<path d="M12 12.75a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM4.5 20.25a7.5 7.5 0 0 1 15 0V21a.75.75 0 0 1-.75.75h-13.5A.75.75 0 0 1 3.75 21v-.75Z" />
									</svg>
									<input
										type="text"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
										placeholder="Username"
										className="w-full bg-transparent placeholder-gray-500 text-gray-900 focus:outline-none"
									/>
								</div>
								{errors.username && (
									<p className="mt-1 text-sm text-red-600">{errors.username}</p>
								)}
							</div>

							<div>
								<label className="sr-only">Password</label>
								<div className="flex items-center gap-2 border-b border-gray-300 py-2">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-5 h-5 text-gray-500"
									>
										<path d="M12 1.5a4.5 4.5 0 0 0-4.5 4.5v3H6.75A2.25 2.25 0 0 0 4.5 11.25v7.5A2.25 2.25 0 0 0 6.75 21h10.5A.75.75 0 0 0 19.5 18.75v-7.5A2.25 2.25 0 0 0 17.25 9H16.5V6A4.5 4.5 0 0 0 12 1.5Zm-3 6V6a3 3 0 1 1 6 0v1.5h-6Z" />
									</svg>
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										placeholder="Password"
										className="w-full bg-transparent placeholder-gray-500 text-gray-900 focus:outline-none"
									/>
								</div>
							</div>

							<div className="flex items-center justify-between text-sm">
								<label className="flex items-center gap-2 text-gray-700">
									<input
										type="checkbox"
										checked={remember}
										onChange={(e) => setRemember(e.target.checked)}
										className="rounded border-gray-400 bg-transparent"
									/>{" "}
									Ingat saya
								</label>
								<a href="#" className="text-blue-600 hover:underline">
									Lupa password?
								</a>
							</div>

							<button
								type="submit"
								className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
							>
								Sign In
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
