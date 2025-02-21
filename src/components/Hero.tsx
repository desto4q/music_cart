"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/client/client";

let getHero = async () => {
	try {
		let { data, error } = await supabase
			.from("packs")
			.select("*")
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

export interface IPack {
	id: number;
	description: string;
	image_url: string;
	title: string;
	created_at: string;
	price: number;
	slash_price: number;
}
function Hero() {
	let { data, isFetching } = useQuery<IPack>({
		queryKey: ["new"],
		queryFn: getHero,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	});
	return (
		<div className="min-h-[768px] bg-base-200 py-4 flex items-center">
			<div className="container mx-auto h-full ">
				<>
					{isFetching ? (
						<div className="min-h-[768px] flex items-center justify-center">
							Loading
						</div>
					) : (
						<div className="flex w-full gap-8 md:gap-0  h-full flex-wrap items-center">
							<div className="flex flex-[1_1_50%] min-w-[350px] relative  isolate  h-max md:h-[620px]">
								<img
									className=" object-contain h-[350px] w-[350px] mx-auto my-auto shadow-2xl rounded-lg "
									src={data?.image_url}
									alt=""
								/>
								<img
									className="h-full opacity-50 w-full object-fill absolute  -z-10 blur-lg "
									src={data?.image_url}
									alt=""
								/>
							</div>
							<div className="flex-[1_1_50%] min-w-[350px] h-fit   flex flex-col gap-2 px-4 ">
								<div className="badge badge-success badge-lg ">
									New Arrival
								</div>
								<h2 className="text-2xl font-semibold ">
									{data?.title}
								</h2>
								<p className="text-sm md:text-lg">
									{data?.description}
								</p>
								<a
									href="#"
									className="btn btn-primary btn-lg mt-4"
								>
									Learn More
								</a>
								<div className="h-[100px] w-full p-2 border-primary border rounded-md">
									box
								</div>
							</div>
						</div>
					)}
				</>
			</div>
		</div>
	);
}

export default Hero;
