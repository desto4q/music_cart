
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { AUDIO_SERVICE, PackType, TAGS } from "@/types/types";

let cart_atom = atomWithStorage<PackType[]>("cart", []);

const cartAmount = atom((get) => {
	const cartNumber = get(cart_atom);
	return cartNumber.length;
});

const cart_total_atom = atom((get) => {
	const totalamount = get(cart_atom);
	let amount = totalamount.reduce((acc, item) => acc + (item.price || 0), 0);
	return amount;
});

let audio_service_atom = atom<AUDIO_SERVICE>({
	url: null,
	id: null,
	isPlaying: false,
	title: null,
	image_url: null,
	tags: [],
});

let tag_options: TAGS[] = [
	"mood",
	"chill",
	"lo-fi",
	"hard",
	"drill",
	"west-coast",
	"trap",
	"rap",
];
export {
	cartAmount,
	cart_atom,
	cart_total_atom,
	audio_service_atom,
	tag_options,
};
