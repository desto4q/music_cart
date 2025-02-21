"use client";
import { useAtom } from "jotai";
import { PauseCircle, PlayCircle, Rewind } from "lucide-react";
import { audio_service_atom } from "../store/store";
import { useEffect, useState } from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { usePlayerRef } from "../store/PlayerContext";

function Player() {
	// let audioRef = useRef<HTMLAudioElement>(null);
	let { audioRef } = usePlayerRef();

	let [audio_service, setAudioService] = useAtom(audio_service_atom);

	let [duration, setDuration] = useState(100);
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			if (audio_service.id != null) {
				audio.play();
			}
		}
	}, [audio_service.id]);
	useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			const handleTimeUpdate = () => {
				// console.log("chaingin");
				setCurrentTime(audio.currentTime);
			};
			const handleDurationUpdate = () => {
				setDuration(audio.duration);
			};
			const handlePlaying = (e: Event) => {
				let playingType = e.type;
				if (playingType == "pause") {
					setAudioService((prev) => {
						return { ...prev, isPlaying: false };
					});
					return;
				}
				setAudioService((prev) => {
					return { ...prev, isPlaying: true };
				});
			};
			audio.addEventListener("play", handlePlaying);
			audio.addEventListener("pause", handlePlaying);
			audio.addEventListener("timeupdate", handleTimeUpdate);
			audio.addEventListener("durationchange", handleDurationUpdate);
			// Cleanup the event listener on component unmount
			return () => {
				audio.removeEventListener("timeupdate", handleTimeUpdate);
				audio.removeEventListener(
					"durationchange",
					handleDurationUpdate
				);
				audio.removeEventListener("play", handlePlaying);
				audio.removeEventListener("pause", handlePlaying);
			};
		}
	}, [audio_service.title]);
	// useEffect(() => {
	// 	console.log(audio_service.title);
	// }, []);

	return (
		<div
			className="fixed duration-200 bottom-0 w-full bg-base-300"
			style={{
				opacity: audio_service.title == null ? 0 : 100,
				pointerEvents: audio_service.title == null ? "none" : "auto",
			}}
		>
			<audio
				id="audio_player"
				ref={audioRef}
				key={audio_service.title}
			>
				<source src={audio_service.url ?? undefined} />
			</audio>
			<div className="container mx-auto h-16 w-full flex items-center gap-2">
				<img
					className="size-12 rounded-md"
					src={audio_service.image_url ?? undefined}
					alt=""
				/>
				<div className="flex flex-col ">
					<h2 className="text-lg font-bold capitalize">
						{audio_service.title}
					</h2>
					<p className="text-sm text-base-content opacity-80">
						afro, fusion, rap
					</p>
				</div>
				<div className="mx-auto flex gap-2 items-center">
					<button
						className="btn btn-circle btn-ghost "
						onClick={() => {
							const audio = audioRef.current;
							if (audio) {
								audio.currentTime = 0;
							}
						}}
					>
						<Rewind />
					</button>
					<div
						className="btn btn-circle btn-ghost "
						onClick={() => {
							if (audioRef.current?.paused) {
								audioRef.current.play();
								return;
							}
							audioRef.current?.pause();
						}}
					>
						{!audio_service.isPlaying ? (
							<PlayCircle />
						) : (
							<PauseCircle />
						)}
					</div>

					<div className=" w-72 flex gap-4 items-center">
						<div className="w-full">
							<Slider
								className="w-fit"
								onChangeComplete={() => {
									console.log("chaging");
								}}
								min={0}
								onChange={(e) => {
									const audio = audioRef.current;
									if (audio) {
										audio.currentTime = Number(e);
									}
								}}
								value={currentTime}
								// value={currentTime.toPrecision(10)}
								max={25}
							/>
						</div>
						<p key={audio_service.title}>
							{duration == 100 ? 25 : duration.toFixed(1)}
							{"s"}
						</p>
						{/* <p>{currentTime}</p>
						 */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Player;
