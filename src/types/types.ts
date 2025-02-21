type Beat = {
	id: number;
	created_at: string; // ISO timestamp
	title: string;
	price: number;
	snippet: string; // URL to the snippet
	key: string; // Musical key (e.g., "B Minor")
	bpm: number;
	tags: string[];
	image_url: string; // URL to the image (can be empty)
};

interface PackType {
	id: number;
	title: string;
	image_url: string;
	description: string;
	price: number;
}
interface AUDIO_SERVICE {
	url: null | string;
	id: null | string | number;
	isPlaying?: boolean;
	title: string | null;
	image_url: string | null;
	tags: any[];
}

type DOWNLOADTYPE = "exclusive" | "base";

type TAGS =
	| "trap"
	| "rap"
	| "mood"
	| "lo-fi"
	| "chill"
	| "west-coast"
	| "hard"
	| "drill";

export type { Beat, PackType, AUDIO_SERVICE, TAGS, DOWNLOADTYPE };
