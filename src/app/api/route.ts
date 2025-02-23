// import { NextRequest, NextResponse } from "next/server";
// import Black from "backblaze-b2";
// import { decrytpUrlStringApi } from "@/methods/cryptMehtods";


// let bucket = new Black({
// 	applicationKey: process.env.NEXT_PUBLIC_BACKKEY as string,
// 	applicationKeyId: process.env.NEXT_PUBLIC_BACKID as string,
// 	axios: {
// 		headers: { Authorization: "Basic XYZ" },
// 	},
// });
// let get_tags = async (file_name: string) => {
// 	try {
// 		await bucket.authorize();

// 		let fadah_buck = await bucket.downloadFileByName({
// 			bucketName: "zipped-fadah",
// 			fileName: file_name,
// 			responseType: "arraybuffer",
// 			onDownloadProgress: (e) => {
// 				console.log(e);
// 			},
// 		});
// 		return new NextResponse(fadah_buck.data);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// export async function GET(request: NextRequest) {
// 	const searchParams = request.nextUrl.searchParams;
// 	const id = searchParams.get("id"); // Get query param `id`
// 	if (id) {
// 		let decrypted = decrytpUrlStringApi(id as string);
// 		let fileName = `${decrypted.title.replaceAll(" ", "_")}_${
// 			decrypted.purchaseType
// 		}.zip`;
// 		let resp = await get_tags(fileName);
// 		return resp;
	
// 	}
// 	return NextResponse.json(
// 		{
// 			message: "no id",
// 		},
// 		{ status: 404 }
// 	);
// }
import { NextRequest, NextResponse } from "next/server";
import Black from "backblaze-b2";
import { decrytpUrlStringApi } from "@/methods/cryptMehtods";

let bucket = new Black({
	applicationKey: process.env.NEXT_PUBLIC_BACKKEY as string,
	applicationKeyId: process.env.NEXT_PUBLIC_BACKID as string,
	axios: {
		headers: { Authorization: "Basic XYZ" },
	},
});

// Function to download file from Backblaze B2
let get_tags = async (file_name: string) => {
	try {
		await bucket.authorize();

		let fadah_buck = await bucket.downloadFileByName({
			bucketName: "zipped-fadah",
			fileName: file_name,
			responseType: "arraybuffer",
			onDownloadProgress: (e) => console.log(e),
		});

		// ✅ Return a proper NextResponse with headers
		return new NextResponse(fadah_buck.data, {
			status: 200,
			headers: {
				"Content-Type": "application/zip", // Ensure correct MIME type
				"Content-Disposition": `attachment; filename="${file_name}"`, // Force download
			},
		});
	} catch (error) {
		console.error("Error downloading file:", error);
		return new NextResponse(
			JSON.stringify({ message: "Error downloading file" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
};

// API route handler
export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id"); // Get query param `id`

	if (!id) {
		return new NextResponse(
			JSON.stringify({ message: "No ID provided" }),
			{ status: 400, headers: { "Content-Type": "application/json" } }
		);
	}

	try {
		let decrypted = decrytpUrlStringApi(id as string);
		let fileName = `${decrypted.title.replaceAll(" ", "_")}_${decrypted.purchaseType}.zip`;

		let resp = await get_tags(fileName);
		return resp;
	} catch (error) {
		console.error("Decryption error:", error);
		return new NextResponse(
			JSON.stringify({ message: "Decryption failed" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
