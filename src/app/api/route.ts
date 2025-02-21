import { NextRequest, NextResponse } from "next/server";
import Black from "backblaze-b2";
import { decrytpUrlStringApi } from "@/methods/cryptMehtods";

let filename = "2_5273902432814915501.mp3";

let bucket = new Black({
	applicationKey: process.env.NEXT_PUBLIC_BACKKEY as string,
	applicationKeyId:process.env.NEXT_PUBLIC_BACKID as string,
	axios: {
		headers: { Authorization: "Basic XYZ" },
	},
});

let get_tags = async (file_name: string) => {
	try {
		await bucket.authorize();

		let fadah_buck = await bucket.downloadFileByName({
			bucketName: "zipped-fadah",
			fileName: file_name,
			responseType: "arraybuffer",
			onDownloadProgress: (e) => {
				console.log(e);
			},
		});
		// Create a download link
		// Trigger download
		// return fadah_buck.;
		// return new Response(fadah_buck.data, {
		// 	status: 200,
		// 	headers: {
		// 		"Content-Type": "application/octet-stream",
		// 		"Content-Disposition": `attachment; filename="${filename}"`,
		// 	},
		// });
		return new NextResponse(fadah_buck.data);
	} catch (error) {
		console.log(error);
	}
};
// export let GET = async () => {
// 	try {
// 		let resp = await get_tags();
// 		console.log(resp);
// 		return resp
// 	} catch (err) {
// 		console.log(err);
// 		return NextResponse.json("error 404");
// 	}

// 	// console.log(bucketItems.data);
// };

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const id = searchParams.get("id"); // Get query param `id`
	if (id) {
		let decrypted = decrytpUrlStringApi(id as string);
		let fileName = `${decrypted.title.replaceAll(" ", "_")}_${
			decrypted.purchaseType
		}.zip`;
		let resp = await get_tags(fileName);
		return resp;
		// 	return NextResponse.json({
		// 		message: "Hello, world!",
		// 		queryParam: fileName,
		// 	});
	}

	return NextResponse.json(
		{
			message: "no id",
		},
		{ status: 404 }
	);
}
