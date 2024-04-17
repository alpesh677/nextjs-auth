'use client'
import { useRouter } from "next/navigation";
export default function UserProfile({ params }: any) {
	const router = useRouter();
	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2 gap-3">
			<h1 className="border-b text-lg">
				User ID : 
				<span className="bg-orange-600 text-black">{params.id}</span>
			</h1>
			<hr />
			<button type="submit"
				className="w-20 font-medium text-base bg-green-600 text-black py-1 px-2 rounded-lg hover:bg-green-700"
				onClick={()=>router.push("/profile")}
			>
				Go Back
			</button>
		</div>
	);
}
