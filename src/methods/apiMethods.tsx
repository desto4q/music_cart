import { supabase } from "../client/client";
import { Beat } from "../types/types";

let getBeats = async () => {
	try {
		let { data, error } = await supabase.from("beats").select("*");

		if (error) {
			throw new Error(JSON.stringify(error));
		}
		return data as Beat[];
	} catch (error) {
		if (error) {
			throw error;
		}
	}
};

let getBeatsWithTag = async (tags: string[]) => {
	try {
		if (tags?.length > 0) {
			let { data, error } = await supabase
				.from("beats")
				.select("*")
				.contains("tags", tags);
			if (error) {
				throw new Error(JSON.stringify(error));
			}
			return data as Beat[];
		}
		let { data, error } = await supabase.from("beats").select("*");
		if (error) {
			throw new Error(JSON.stringify(error));
		}
		return data as Beat[];
	} catch (error) {
		if (error) {
			throw error;
		}
	}
};

export { getBeats, getBeatsWithTag };
