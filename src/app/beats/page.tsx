"use client";
import { useQuery } from "@tanstack/react-query";
import { PauseCircle, PlayCircle, PlusCircle } from "lucide-react";
import { audio_service_atom, cart_atom, tag_options } from "@/store/store";
import { useAtom } from "jotai";
import { usePlayerRef } from "@/store/PlayerContext";
import { addToCart } from "@/methods/cartMethods";
import { getBeatsWithTag } from "@/methods/apiMethods";
import { AUDIO_SERVICE, PackType } from "@/types/types";
import { useState } from "react";
import emailjs from "@emailjs/nodejs";
let snippet_url =
	"https://wfstwoduggyzxsxzooom.supabase.co/storage/v1/object/public/snippets//snippet.mp3";
let returnImageUrl = (title: string) => {
	let concurl =
		"https://wfstwoduggyzxsxzooom.supabase.co/storage/v1/object/public/zipped_files//" +
		title +
		".jpg";
	return concurl;
};
let template_id="DrjELARmHMWm26qjV"
emailjs.init({
	publicKey:"DrjELARmHMWm26qjV"
})
let emailtemplate = {
	item:"fadah",
	item_link:"www.google.com"
}
function Page() {
	let [tags, setTags] = useState<string[]>([]);
	let { data, isFetching, isError } = useQuery({
		queryKey: ["beats", tags],
		queryFn: async () => await getBeatsWithTag(tags),
		refetchOnWindowFocus: false,
	});
	let [cart, setCart] = useAtom(cart_atom);
	let [audio_service, setAudioService] = useAtom(audio_service_atom);
	let { audioRef } = usePlayerRef();
	return (
		<div className=" bg-base-200 py-4">
			<div className="container mx-auto flex flex-col gap-2">
				<div className="">
					<h2 className="text-xl">
						Filters: {tags.map((e) => e).join(",")}
					</h2>
					{/* <button
						className="btn btn-primary"
						onClick={() => {}}
					>
						Send Email
					</button> */}
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn  btn-secondary p"
						>
							Filter
						</div>
						<ul
							tabIndex={0}
							className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
						>
							{tag_options.map((tag) => {
								return (
									<li key={"tag_option" + tag}>
										<button
											onClick={() => {
												if (tags.includes(tag)) {
													setTags(() =>
														tags.filter(
															(prev) =>
																tag != prev
														)
													);
													return;
												}
												setTags((prev) => [
													...prev,
													tag,
												]);
											}}
										>
											{tag}
										</button>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="flex gap-2 border-b py-2 mb-4">
					<div className="w-16">Pack</div>
					<div className="w-36 md:w-64">FileName</div>
					<div className="w-16">Snippet</div>
					<div className="w-52 ">Price</div>
					<div className="w-20 ml-auto">Key</div>
					<div className="w-16">Bpm</div>
					<div className="ml-auto pr-2">Cart</div>
				</div>
				{isFetching ? (
					<div className="w-full h-32 justify-center items-center flex text-3xl font-bold">
						loading
					</div>
				) : (
					<>
						{data?.map((e) => {
							return (
								<div
									className="flex gap-2 h-16 items-center"
									key={"beat_" + e.id}
								>
									<div className="h-16 w-16">
										<img
											loading="lazy"
											src={returnImageUrl(e.title)}
											className="w-full h-full"
											alt=""
										/>
									</div>

									<div className="h-16 flex flex-col justify-evenly w-36 md:w-64">
										<h2 className="font-bold">{e.title}</h2>
										<div className="font-bold flex gap-2 capitalize opacity-75 text-sm">
											{e.tags.map((tag, tag_index) => (
												<p
													key={`tags_${e.title}_${tag_index}`}
												>
													{tag}
												</p>
											))}
										</div>
									</div>

									<div className=" flex w-16 gap-2 items-center justify-center">
										<button
											className="btn btn-ghost btn-circle  bg-base-300"
											onClick={() => {
												console.log("title");
												if (audio_service.id == e.id) {
													if (
														audio_service.isPlaying
													) {
														audioRef.current?.pause();
														return;
													}
													audioRef.current?.play();
													return;
												}
												let audioItem: AUDIO_SERVICE = {
													id: e.id,
													title: e.title,
													image_url: returnImageUrl(
														e.title
													),
													url: snippet_url,
													tags: [],
												};

												setAudioService((prev) => {
													let newService = {
														...prev,
														...audioItem,
													};
													return newService;
												});
											}}
										>
											{audio_service.id == e.id ? (
												audio_service.isPlaying ? (
													<PauseCircle className="text-primary" />
												) : (
													<PlayCircle />
												)
											) : (
												<PlayCircle />
											)}
										</button>
									</div>
									<div className="w-48 text-lg font-bold ">
										N 20,000
									</div>
									<div className=" ml-auto flex gap-2 items-center w-20">
										{e.key}
									</div>
									<div className="  flex gap-2 items-center w-16">
										{e.bpm}
									</div>

									<div className="ml-auto">
										<button
											className="btn btn-ghost btn-circle"
											onClick={() => {
												let item: PackType = {
													id: e.id,
													image_url: returnImageUrl(
														e.title
													),
													title: e.title,
													price: Number(
														(
															e.price * 1000
														).toFixed(2)
													),
													description: "",
												};

												// console.log(item);

												addToCart(item, setCart, cart);
											}}
										>
											<PlusCircle />
										</button>
									</div>
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
}

export default Page;
