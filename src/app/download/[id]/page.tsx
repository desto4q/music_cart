"use client";;
import { decrytpUrlString, generateDownloadUrl } from "@/methods/cryptMehtods";
import { useParams } from "next/navigation";

function Page() {
	let params = useParams();
	let id: string = params.id as string;

	let decrypted = decrytpUrlString(id as string);
	if (!id) {
		return <div>Page Not found</div>;
	}
	let expiresAt: any = new Date(decrypted.date); // Convert to Date object if it's a string
	let now: any = new Date();

	let timeDifference = expiresAt - now; // Difference in milliseconds
	let remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert to days

	console.log(`Remaining Days: ${remainingDays}`);

	if (Date.now() > decrypted.date) {
		return (
			<div className="py-4 bg-base-200 min-h-[558px] flex justify-center items-center">
				<h2 className="text-3xl">This Link has Expired</h2>
			</div>
		);
	}

	return (
		<div className="py-4 bg-base-200 min-h-[558px]">
			<div className="container mx-auto justify-center flex flex-col items-center min-h-[558px] gap-2">
				<div className=" flex items-center text-2xl font-bold gap-2 justify-center ">
					<h2>Thanks For Purchasing:</h2>
					<span className="text-primary capitalize ">
						{decrypted.title}
					</span>
				</div>
				<a
					className="btn btn-2xl btn-primary text-2xl "
					href={generateDownloadUrl({
						title: decrypted.title,
						purchaseType: decrypted.purchaseType,
					})}
					download={decrypted.title}
				>
					Download Now
				</a>
				<p>This link expires in {remainingDays} Days</p>
			</div>
		</div>
	);
}

export default Page;
