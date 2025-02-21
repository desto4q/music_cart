"use client"
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/client/client";
import Link from "next/link";
let getPacks = async () => {
	try {
		let { data, error } = await supabase
			.from("packs")
			.select("image_url,title,price,slash_price,id")
			.eq("id", 2)
			.single();

		if (error) {
			throw new Error(error.message);
		}
		return data;
	} catch (err) {
		throw new Error(err as string);
	}
};

function NewPacks() {
	let { data, isFetching } = useQuery<any>({
		queryKey: ["new_packs"],
		queryFn: getPacks,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	let arr = new Array(18).fill((e: number) => e);
	return (
		<div className="py-4">
			<div className="container mx-auto py-8 px-4 bg-base-200 rounded-md flex flex-col">
				<h2 className="text-3xl font-bold mx-auto">New Packs</h2>
				<div className="mt-8 grid grid-cols-[repeat(auto-fit,250px)] gap-2  justify-center">
					{arr.map((e, i) => {
						return (
							<Link
								key={"num_" + i}
								// href={`/product/${data?.id}`}
								href={"#"}
								className="w-[250px] min-h-[250px]"
							>
								<img
									className="w-full rounded-md"
									src={data?.image_url}
									alt=""
								/>
								<div className="flex flex-col gap-2 justify-center text-center mt-2">
									<h3 className="text-xl font-semibold">
										{data?.title}
									</h3>
									<p className="text- font-semibold">
										N{data?.price}
									</p>
									<p className="line-through text-sm text-error">
										N{data?.slash_price}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default NewPacks;
