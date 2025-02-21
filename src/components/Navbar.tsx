"use client";
import { useAtomValue } from "jotai";
import { Search, ShoppingCart } from "lucide-react";
import { cartAmount } from "../store/store";
import Link from "next/link";

function Navbar() {
	let cart_amount = useAtomValue(cartAmount);
	return (
		<div className="h-20 flex flex-col justify-center">
			<nav className="container mx-auto flex items-center ">
				<Link
					href={"/"}
					className="btn btn-ghost text-xl font-semibold "
				>
					Logo Here
				</Link>
				<div className="mx-auto  gap-2 hidden md:flex">
					<a
						href="#"
						className="btn btn-ghost btn-w-sm"
					>
						New Packs
					</a>
					<a
						href="#"
						className="btn btn-ghost btn-w-sm"
					>
						All Packs
					</a>
					<Link
						href={"/beats"}
						className="btn btn-ghost btn-w-sm"
					>
						Beats
					</Link>
					<a
						href="#"
						className="btn btn-ghost btn-w-sm"
					>
						Free Packs
					</a>
					{/* <a href="#">All Packs</a>
					<a href="#">Free Packs</a>
					<a href="#">Best Selle</a> */}
				</div>
				<div className="flex items-center gap-4">
					<Link
						className="btn btn-ghost btn-circle"
						href={"#"}
					>
						<Search />
					</Link>
					<Link
						className="btn btn-ghost btn-circle relative "
						href={"/cart"}
					>
						<ShoppingCart />
						{cart_amount > 0 ? (
							<p className="absolute right-0 text-xs top-0 p-1 translate-x-0.5  bg-secondary text-secondary-content aspect-square rounded-full">
								{cart_amount}
							</p>
						) : null}
					</Link>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
