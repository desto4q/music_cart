"use client"
import { createContext, PropsWithChildren, useContext, useRef } from "react";
interface PLAYER_CONTEXT_VALUE {
	audioRef: React.RefObject<HTMLAudioElement | null>;
}

const playerContext = createContext<PLAYER_CONTEXT_VALUE | null>(null);

interface PLAYER_PROVIDER_PROPS extends PropsWithChildren {}
let PlayerProvider = (props: PLAYER_PROVIDER_PROPS) => {
	let audioRef = useRef<HTMLAudioElement | null>(null);

	let values: PLAYER_CONTEXT_VALUE = {
		audioRef,
	};
	return (
		<playerContext.Provider value={values}>
			{props.children}
		</playerContext.Provider>
	);
};

let usePlayerRef = () => {
	let context = useContext(playerContext);
	if (!context) {
		throw new Error("wrap in PlayerProvider");
	}
	return context;
};

export { PlayerProvider, usePlayerRef };
