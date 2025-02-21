"use client";
import Hero from "@/components/Hero";
import NewPacks from "@/components/NewPacks";
import { decryptString, encryptString } from "@/methods/cryptMehtods";
import { useEffect } from "react";

function page() {
	let string = "iono";
	useEffect(() => {
		// console.log(process.env.NEXT_PUBLIC_SUPAKEY)
		console.log(encryptString(string), "encrypt");
		console.log(decryptString(encryptString(string)), "decypty");
	}, []);
	return (
		<div className="">
			<Hero />
			<NewPacks />
		</div>
	);
}

export default page;
