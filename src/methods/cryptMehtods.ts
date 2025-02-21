import { DOWNLOADTYPE } from "@/types/types";

let encryptString = (text: string) => {
	return Buffer.from(text).toString("base64");
};

let decryptString = (text: string) => {
	return Buffer.from(text, "base64").toString("utf8");
};

let generateUrlString = ({
	expiring,
	title,
	purchaseType,
}: {
	expiring: number;
	title: string;
	purchaseType: DOWNLOADTYPE;
}) => {
	let urlString = `${expiring}_${title}_${purchaseType}`;
	return urlString;
};

let decrytpUrlString = (string: string) => {
	let decryted = decryptString(string);
	let arrayString = decryted.split("_");
	let date: number = Number(arrayString[0]);
	let title: string = arrayString[1];
	let purchaseType: DOWNLOADTYPE = arrayString[2] as DOWNLOADTYPE;
	return { date, title, purchaseType };
};
let decrytpUrlStringApi = (string: string) => {
	let decryted = decryptString(string);
	let arrayString = decryted.split("_");
	let title: string = arrayString[0];
	let purchaseType: DOWNLOADTYPE = arrayString[1] as DOWNLOADTYPE;
	return { title, purchaseType };
};

let generateExpiringDate = (days: number) => {
	let expiringDate = Date.now() + days * 24 * 60 * 60 * 1000;
	return expiringDate;
};

let generateDownloadUrl = ({
	title,
	purchaseType,
}: {
	title: string;
	purchaseType: DOWNLOADTYPE;
}) => {
	let tlLink = encryptString(`${title}_${purchaseType}`);
	let url = `http://localhost:3000/api/?id=${tlLink}`;
	return url;
};
export {
	decryptString,
	encryptString,
	generateUrlString,
	decrytpUrlString,
	generateExpiringDate,
	generateDownloadUrl,
	decrytpUrlStringApi
};
