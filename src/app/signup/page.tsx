"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: "",
		username: "",
	});
	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const onSignup = async () => {
		try {
			setLoading(true);
			const response = await axios.post("/api/users/signup", user);
			toast.success("Sing up successfull...");
			router.push("/login");
		} catch (error: any) {
			console.log("Signup failed", error.message);

			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.email.length > 0 &&
			user.password.length > 0 &&
			user.username.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<div className="border border-sky-500 p-8 flex flex-col gap-2 w-full max-w-md">
				<h1 className="text-3xl mb-3">{loading ? "Signing up..." : "Signup"}</h1>
				<hr />
				<label htmlFor="username">username</label>
				<input
					className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-black"
					id="username"
					type="text"
					value={user.username}
					onChange={(e) =>
						setUser({ ...user, username: e.target.value })
					}
					placeholder="alpesh677"
				/>
				<label htmlFor="email">email</label>
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
				<label htmlFor="password">password</label>
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
					onClick={onSignup}
					disabled={buttonDisabled}
					className="p-2 border border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-blue-800 hover:bg-sky-500 hover:text-black hover:font-semibold text-base font-medium cursor-pointer"
				>
					Signup here
				</button>
				<p className="text-center mt-2">
					Already have an account? &nbsp;
					<Link href="/login" className="font-bold text-lg hover:text-sky-600 underline ">Login here</Link>
				</p>
			</div>
		</div>
	);
}
