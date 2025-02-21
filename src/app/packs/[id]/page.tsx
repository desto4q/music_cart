let expiring_date = 90;
let generate_expiring = (day: number) => {
	return Date.now() + day * 24 * 60 * 60 * 1000;
};
let Page = async ({ params }: { params: Promise<{ id: number }> }) => {
	const id = (await params).id;
	console.log(generate_expiring(expiring_date));
	return <div>Page:{id}</div>;
};

export default Page;
