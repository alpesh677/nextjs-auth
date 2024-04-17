"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: "",
	});
	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/login", user);
			toast.success(response?.data?.message);
			router.push("/profile");
		} catch (error: any) {
			// console.log("Login failed", error);
			toast.error("Username or Password is incorrect!!");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<div className="border border-sky-500 p-8 flex flex-col gap-2 w-full max-w-md">
				<h1 className="text-3xl mb-3">{loading ?"Loggin in..." :"Login"}</h1>
				<hr />

				<label htmlFor="email">email :</label>
				<input
					className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-black"
					id="email"
					type="text"
					value={user.email}
					onChange={(e) =>
						setUser({ ...user, email: e.target.value })
					}
					placeholder="abc@gmail.com"
				/>
				<label htmlFor="password">password :</label>
				<input
					className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-black"
					id="password"
					type="password"
					value={user.password}
					onChange={(e) =>
						setUser({ ...user, password: e.target.value })
					}
					placeholder="enter your password"
				/>
				<button
					onClick={onLogin}
					disabled={buttonDisabled}
					className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-800 hover:bg-sky-500 hover:text-black hover:font-semibold text-base font-medium cursor-pointer"
				>
					Login here
				</button>
				<p className="text-center mt-2">
					Don&apos;t have an account? &nbsp;
					<Link href="/signup" className="font-bold text-lg hover:text-sky-600 underline">Signup here</Link>
				</p>
			</div>
		</div>
	);
}
